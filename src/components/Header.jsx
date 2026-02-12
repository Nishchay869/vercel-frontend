import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Cross, Lock } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import "./header.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    !!localStorage.getItem("adminToken"),
  );
  const location = useLocation();

  const mobileMenuRef = useRef(null);
  const menuItemsRef = useRef([]);
  const backdropRef = useRef(null);

  useEffect(() => {
    // Check admin auth status on mount and route changes
    setIsAdminLoggedIn(!!localStorage.getItem("adminToken"));
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Open animation
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        visibility: "visible",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(backdropRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.fromTo(
        menuItemsRef.current,
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.1,
          ease: "power2.out",
        },
      );
    } else {
      // Close animation
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.2,
        ease: "power2.in",
      });

      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Ministries", href: "#ministries" },
    { name: "Gallery", href: "#events" },
    { name: "Prayer Request", href: "#prayer" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-transparent backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            <div className="flex items-center space-x-3 flex-shrink-0">
              <Cross className="w-8 h-8 text-gold-500 cross-animation" />
              <span className="font-display text-xl font-semibold text-gold-400">
                The Horeb Telugu Assembly Church
              </span>
            </div>

            {/* Desktop/Tablet Navigation */}
            <div className="nav-bar hidden md:flex ml-auto">
              <nav className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gold-200 hover:text-gold-400 transition-colors duration-300 font-medium relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                ))}

                {/* Admin Login Button */}
                {isAdminLoggedIn ? (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors duration-300 font-medium"
                  >
                    <Lock size={18} />
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors duration-300 font-medium"
                  >
                    <Lock size={18} />
                    Admin
                  </Link>
                )}
              </nav>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gold-400 ml-auto"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop with Blur */}
      <div
        ref={backdropRef}
        className="mobile-menu-backdrop"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div ref={mobileMenuRef} className="mobile-menu">
        <div className="px-4 py-6 space-y-4">
          {navItems.map((item, index) => (
            <a
              key={item.name}
              ref={(el) => (menuItemsRef.current[index] = el)}
              href={item.href}
              className="block text-gold-200 text-center hover:text-gold-400 transition-colors duration-300 font-medium py-3 text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}

          {/* Admin Link in Mobile Menu */}
          {isAdminLoggedIn ? (
            <Link
              to="/admin/dashboard"
              className="flex items-center justify-center gap-2 text-gold-400 hover:text-gold-300 transition-colors duration-300 font-medium py-3 text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Lock size={20} />
              Dashboard
            </Link>
          ) : (
            <Link
              to="/admin"
              className="flex items-center justify-center gap-2 text-gold-400 hover:text-gold-300 transition-colors duration-300 font-medium py-3 text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Lock size={20} />
              Admin
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
