import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

export default function Contact() {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["6361718992"],
      subtext: "Mon-Fri: 9AM - 5PM",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["ravikumarsamyak2005@gmail.com"],
      subtext: "We respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["Hassan district Belur taluk hebbalu post office and village"],
      // subtext: "Plenty of parking available",
    },
    {
      icon: Clock,
      title: "Church Hours",
      details: ["Monday - Thursday", "9:00 AM - 4:00 PM"],
      subtext: "Sunday: 10:00 AM - 12:30 PM",
    },
    {
      icon: Mail,
      title: "Father",
      details: ["Shivu Samuel"],
      subtext: "Pastor",
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "blue" },
    { icon: Twitter, href: "#", label: "Twitter", color: "blue" },
    { icon: Instagram, href: "#", label: "Instagram", color: "pink" },
    { icon: Youtube, href: "#", label: "Youtube", color: "red" },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-church-dark relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-400 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gold-200 max-w-3xl mx-auto">
            We'd love to hear from you! Whether you have a question . we're here
            to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-1 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-church-light/5 border border-gold-500/20 rounded-xl p-6 hover:border-gold-500/40 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center mb-4">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-gold-400 mb-2">
                    {info.title}
                  </h4>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gold-200/80 text-sm">
                      {detail}
                    </p>
                  ))}
                  <p className="text-gold-200/60 text-sm mt-2">
                    {info.subtext}
                  </p>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-church-light/5 border border-gold-500/20 rounded-2xl p-2">
              <div className="bg-gradient-to-br from-church-light/10 to-church-dark/50 rounded-xl h-64 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-gold-500 opacity-50" />
                </div>
                <div className="relative z-10 text-center">
                  <p className="text-gold-300 font-semibold mb-2">Visit Us</p>
                  <p className="text-gold-200/70">
                    Hassan district Belur taluk hebbalu post office and village
                  </p>
                  <button className="mt-4 text-gold-400 hover:text-gold-300 font-semibold flex items-center gap-2 mx-auto">
                    Get Directions
                    <MapPin className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Social Links */}
            {/* <div className="text-center">
              <h4 className="font-display text-xl font-semibold text-gold-400 mb-4">
                Connect With Us
              </h4>
              <div className="flex justify-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className={`w-12 h-12 bg-church-light/5 border border-gold-500/20 rounded-full flex items-center justify-center text-gold-400 transition-all duration-300 group hover:translate-y-[-4px] hover:rotate-x-12 ${
                      social.color === "blue"
                        ? "hover:bg-blue-600 hover:border-blue-600 hover:shadow-[0_10px_30px_rgba(37,99,235,0.5)]"
                        : social.color === "pink"
                          ? "hover:bg-pink-600 hover:border-pink-600 hover:shadow-[0_10px_30px_rgba(219,39,119,0.5)]"
                          : "hover:bg-red-600 hover:border-red-600 hover:shadow-[0_10px_30px_rgba(220,38,38,0.5)]"
                    }`}
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
