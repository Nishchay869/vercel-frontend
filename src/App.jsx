import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Hero3D from "./components/Hero3D";
import Header from "./components/Header";
import About from "./components/About";
import Services from "./components/Services";
import Ministries from "./components/Ministries";
import Events from "./components/Events";
import PrayerRequestInput from "./components/PrayerRequestInput";
import Comments from "./components/Comments";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Lenis from "lenis";

// Protected Route component for admin dashboard
function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("adminToken");

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("adminToken"),
  );

  useEffect(() => {
    // Immediately reset scroll position before anything else
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Force scroll to top after a short delay to ensure it sticks
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gold-500 mx-auto mb-4"></div>
              <p className="text-gold-400 font-serif text-xl">Loading...</p>
            </div>
          </div>
        }
      >
        <Hero3D />
      </Suspense>
      <About />
      <Services />
      <Ministries />
      <Events />
      <PrayerRequestInput />
      <Comments />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-church-dark text-white">
        <Routes>
          {/* Main website routes */}
          <Route path="/*" element={<AppContent />} />

          {/* Admin routes */}
          <Route
            path="/admin"
            element={<AdminLogin setIsAuthenticated={() => {}} />}
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
