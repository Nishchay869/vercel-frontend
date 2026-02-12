import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Heart, Users, Award, ArrowRight } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Biblical Teaching",
    description:
      "Sound doctrine rooted in Scripture, taught with clarity and relevance for today's world.",
  },
  {
    icon: Heart,
    title: "Authentic Worship",
    description:
      "Spirit-filled worship that honors God and transforms hearts through contemporary and traditional elements.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "A welcoming family where everyone belongs, grows, and serves together in love.",
  },
  {
    icon: Award,
    title: "Discipleship",
    description:
      "Intentional growth through small groups, classes, and mentoring relationships.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-20 bg-church-dark relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl"></div>
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
            Welcome Home
          </h2>
          <p className="text-xl text-gold-200 max-w-3xl mx-auto">
            At The Horeb Telugu Assembly Church, we believe that every person matters to
            God and should feel welcome in His house.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-gold/10 border border-gold-500/30 rounded-2xl p-8 md:p-12 mb-16 text-center"
        >
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-gold-300 mb-4">
            Our Mission
          </h3>
          <p className="text-lg md:text-xl text-gold-100 leading-relaxed">
            "To love God, love people, and make disciples of Jesus Christ
            through authentic community, biblical teaching, and compassionate
            service."
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-church-light/5 border border-gold-500/20 rounded-xl p-6 hover:border-gold-500/40 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-gradient-gold rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-display text-xl font-semibold text-gold-400 mb-2">
                {feature.title}
              </h4>
              <p className="text-gold-200 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="#services"
            className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors duration-300 font-semibold"
          >
            Explore Our Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
