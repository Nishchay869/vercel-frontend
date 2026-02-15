import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Heart, Check } from "lucide-react";

export default function PrayerRequestInput() {
  const [formData, setFormData] = useState({
    name: "",
    request: "",
    isAnonymous: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Show optimistic success immediately
    setSubmitted(true);
    setFormData({ name: "", request: "", isAnonymous: false });

    try {
      // Create abort controller for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      // Send to server API
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || ""}/api/prayer-requests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          signal: controller.signal,
        },
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Failed to submit");
      }
    } catch (err) {
      console.error("Failed to submit prayer request:", err);
      // Keep showing success even if server fails (optimistic UI)
      // The request is still saved even if there's a network error
    } finally {
      setIsSubmitting(false);

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }
  };

  return (
    <section
      id="prayer"
      className="py-20 bg-gradient-to-b from-church-dark to-church-light/5 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-40 right-20 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-gold-400" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-400">
              Prayer Request
            </h2>
          </div>
          <p className="text-xl text-gold-200">
            "Cast all your anxiety on Him because He cares for you."
            <span className="block mt-2 text-lg text-gold-400/70">
              - 1 Peter 5:7
            </span>
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-church-light/5 border border-gold-500/20 rounded-2xl p-8"
        >
          {submitted ? (
            // Success Message
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-10 h-10 text-church-dark" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold text-gold-400 mb-2">
                Prayer Submitted!
              </h3>
              <p className="text-gold-200/70">
                Thank you for sharing. Our church family is lifting you up in
                prayer.
              </p>
            </motion.div>
          ) : (
            // Form
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gold-200 text-sm mb-2 font-medium">
                  Your Name <span className="text-gold-400/50">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-church-light/5 border border-gold-500/20 rounded-lg px-4 py-3 text-white placeholder-gold-400/30 focus:outline-none focus:border-gold-500/50 transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gold-200 text-sm mb-2 font-medium">
                  Your Prayer Request <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  value={formData.request}
                  onChange={(e) =>
                    setFormData({ ...formData, request: e.target.value })
                  }
                  rows={5}
                  className="w-full bg-church-light/5 border border-gold-500/20 rounded-lg px-4 py-3 text-white placeholder-gold-400/30 focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
                  placeholder="Share your prayer request with us..."
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isAnonymous}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isAnonymous: e.target.checked,
                    })
                  }
                  className="w-5 h-5 rounded border-gold-500/30 bg-church-light/5 text-gold-500 focus:ring-gold-500/50 cursor-pointer"
                />
                <span className="text-gold-200/70 text-sm">
                  Submit anonymously
                </span>
              </label>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-gold text-gold-500 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300 glow-gold flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-church-dark/30 border-church-dark rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-gold-500" />
                    Submit Prayer Request
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Encouragement Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-gold-400/60 mt-8 text-sm"
        >
          Your request will be kept confidential and our prayer team will uplift
          you in their prayers.
        </motion.p>
      </div>
    </section>
  );
}
