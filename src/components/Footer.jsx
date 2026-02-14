import React from "react";
import { motion } from "framer-motion";
import {
  Cross,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Heart,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Ministries", href: "#ministries" },
    { name: "Events", href: "#events" },
    { name: "Contact", href: "#contact" },
  ];

  const serviceTimes = [
    { name: "Sunday Traditional", time: "8:00 AM" },
    { name: "Sunday Contemporary", time: "10:30 AM" },
    { name: "Wednesday Bible Study", time: "7:00 PM" },
    { name: "Friday Youth Group", time: "7:00 PM" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ];

  return (
    <footer className="bg-church-dark border-t border-gold-500/20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <Cross className="w-10 h-10 text-gold-500 cross-animation" />
              <div>
                <h3 className="font-display text-xl font-semibold text-gold-400">
                  The Horeb Telugu Assembly Church
                </h3>
                <p className="text-gold-200/60 text-sm mt-3">
                  "Where Faith Meets Family"
                </p>
              </div>
            </div>
            <p className="text-gold-200/70 mb-6 leading-relaxed">
              A welcoming family where everyone belongs, grows, and serves
              together in love.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-display text-lg font-semibold text-gold-400 mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gold-200/70 hover:text-gold-400 transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full group-hover:bg-gold-400 transition-colors"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Service Times */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-display text-lg font-semibold text-gold-400 mb-6">
              Service Times
            </h4>
            <ul className="space-y-3">
              {serviceTimes.map((service, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-gold-200/70"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span>
                    {service.name}
                  </span>
                  <span className="text-gold-400 font-medium">
                    {service.time}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-display text-lg font-semibold text-gold-400 mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gold-200/70">
                <MapPin className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <span>
                  123 Grace Street
                  <br />
                  Cityville, ST 12345
                </span>
              </li>
              <li className="flex items-center gap-3 text-gold-200/70">
                <Phone className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gold-200/70">
                <Mail className="w-5 h-5 text-gold-500 flex-shrink-0" />
                <span>info@gracecommunity.church</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gold-200/60 text-sm">
              © {currentYear} The Horeb Telugu Assembly Church. All rights
              reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a
                href="#"
                className="text-gold-200/60 hover:text-gold-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gold-200/60 hover:text-gold-400 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gold-200/60 hover:text-gold-400 transition-colors"
              >
                Statement of Faith
              </a>
            </div>
            <p className="text-gold-200/60 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-gold-500 fill-current" />{" "}
              for His glory
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
