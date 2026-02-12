import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    title: "Sunday Worship Service",
    category: "Worship",
    src: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800&h=600&fit=crop",
    description: "Our congregation gathered for praise and worship",
  },
  {
    id: 2,
    title: "Youth Group Meeting",
    category: "Youth",
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
    description: "Youth fellowship and Bible study session",
  },
  {
    id: 3,
    title: "Community Outreach",
    category: "Outreach",
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop",
    description: "Serving our local community with love",
  },
  {
    id: 4,
    title: "Worship Team",
    category: "Worship",
    src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    description: "Leading us in contemporary worship",
  },
  {
    id: 5,
    title: "Kids Ministry",
    category: "Children",
    src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
    description: "Teaching children about God's love",
  },
  {
    id: 6,
    title: "Bible Study",
    category: "Study",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    description: "Deep diving into Scripture together",
  },
  {
    id: 7,
    title: "Church Picnic",
    category: "Fellowship",
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
    description: "Fun fellowship time with our church family",
  },
  {
    id: 8,
    title: "Praise & Worship",
    category: "Worship",
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop",
    description: "Lifting our voices together in praise",
  },
  {
    id: 9,
    title: "Small Group",
    category: "Fellowship",
    src: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&h=600&fit=crop",
    description: "Growing together in small groups",
  },
];

const categories = [
  "All",
  "Worship",
  "Youth",
  "Children",
  "Study",
  "Outreach",
  "Fellowship",
];

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    const newIndex = (lightboxIndex + 1) % filteredImages.length;
    setLightboxIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    const newIndex =
      (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <section
      id="events"
      className="py-20 bg-gradient-to-b from-church-dark to-church-light/5 relative overflow-hidden"
    >

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-40 left-20 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-400 mb-4">
            Church Gallery
          </h2>
          <p className="text-xl text-gold-200 max-w-3xl mx-auto">
            Capture moments from our worship services, events, and community
            activities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-gold text-church-dark"
                  : "border border-gold-500/30 text-gold-400 hover:bg-gold-500/10"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => openLightbox(image, index)}
              >
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gold-500 text-church-dark mb-2">
                      {image.category}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-white mb-1">
                      {image.title}
                    </h3>
                    <p className="text-sm text-gold-200/80 line-clamp-2">
                      {image.description}
                    </p>
                  </div>
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-gold-500/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                  <ZoomIn className="w-5 h-5 text-church-dark" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-12 h-12 bg-gold-500/20 hover:bg-gold-500/40 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6 text-gold-400" />
              </button>

              {/* Navigation */}
              <button
                onClick={prevImage}
                className="absolute left-4 md:left-8 w-12 h-12 bg-gold-500/20 hover:bg-gold-500/40 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-gold-400" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 md:right-8 w-12 h-12 bg-gold-500/20 hover:bg-gold-500/40 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-gold-400" />
              </button>

              {/* Image Container */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full max-h-[70vh] object-contain rounded-lg"
                />
                <div className="mt-6 text-center">
                  <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-gold-500 text-church-dark mb-2">
                    {selectedImage.category}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-gold-400 mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-gold-200/80 max-w-2xl mx-auto">
                    {selectedImage.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
