// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, Heart, Hands, Send } from "lucide-react";

// export default function PrayerRequest() {
//   const [prayerRequests, setPrayerRequests] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     request: "",
//     isAnonymous: false,
//   });
//   const [submitted, setSubmitted] = useState(false);

//   // Load prayer requests from localStorage on mount
//   useEffect(() => {
//     const saved = localStorage.getItem("prayerRequests");
//     if (saved) {
//       setPrayerRequests(JSON.parse(saved));
//     } else {
//       // Default demo prayer requests
//       const defaults = [
//         {
//           id: 1,
//           name: "Sarah M.",
//           request:
//             "Please pray for my brother's recovery from surgery. May God give him strength and healing.",
//           date: new Date().toISOString(),
//           prayers: 12,
//           isAnonymous: false,
//         },
//         {
//           id: 2,
//           name: "Anonymous",
//           request:
//             "Praying for peace and guidance during this difficult season in our family.",
//           date: new Date().toISOString(),
//           prayers: 8,
//           isAnonymous: true,
//         },
//         {
//           id: 3,
//           name: "Michael T.",
//           request:
//             "Please lift up our church leadership as they make important decisions for our community.",
//           date: new Date().toISOString(),
//           prayers: 15,
//           isAnonymous: false,
//         },
//       ];
//       setPrayerRequests(defaults);
//       localStorage.setItem("prayerRequests", JSON.stringify(defaults));
//     }
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newRequest = {
//       id: Date.now(),
//       name: formData.isAnonymous ? "Anonymous" : formData.name || "Anonymous",
//       request: formData.request,
//       date: new Date().toISOString(),
//       prayers: 0,
//       isAnonymous: formData.isAnonymous,
//     };

//     const updatedRequests = [newRequest, ...prayerRequests];
//     setPrayerRequests(updatedRequests);
//     localStorage.setItem("prayerRequests", JSON.stringify(updatedRequests));

//     setSubmitted(true);
//     setFormData({ name: "", email: "", request: "", isAnonymous: false });

//     // Reset success message after 3 seconds
//     setTimeout(() => {
//       setSubmitted(false);
//       setShowForm(false);
//     }, 3000);
//   };

//   const addPrayer = (id) => {
//     const updated = prayerRequests.map((prayer) =>
//       prayer.id === id ? { ...prayer, prayers: prayer.prayers + 1 } : prayer,
//     );
//     setPrayerRequests(updated);
//     localStorage.setItem("prayerRequests", JSON.stringify(updated));
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   return (
//     <section
//       id="prayer"
//       className="py-20 bg-gradient-to-b from-church-dark to-church-light/5 relative overflow-hidden"
//     >
//       {/* Background Elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
//         <div className="absolute top-40 right-20 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-40 left-20 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl"></div>
//       </div>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12"
//         >
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <Hands className="w-8 h-8 text-gold-400" />
//             <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-400">
//               Prayer Requests
//             </h2>
//           </div>
//           <p className="text-xl text-gold-200 max-w-3xl mx-auto">
//             "Cast all your anxiety on Him because He cares for you."
//             <span className="block mt-2 text-lg text-gold-400/70">
//               - 1 Peter 5:7
//             </span>
//           </p>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setShowForm(true)}
//             className="mt-8 inline-flex items-center gap-2 bg-gradient-gold text-church-dark px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform duration-300 glow-gold"
//           >
//             <Send className="w-5 h-5" />
//             Submit Prayer Request
//           </motion.button>
//         </motion.div>

//         {/* Prayer Requests Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {prayerRequests.map((prayer, index) => (
//             <motion.div
//               key={prayer.id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: index * 0.1 }}
//               className="bg-church-light/5 border border-gold-500/20 rounded-2xl p-6 hover:border-gold-500/40 transition-all duration-300 group"
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div className="flex items-center gap-2">
//                   <Heart className="w-5 h-5 text-gold-400" />
//                   <span className="font-semibold text-gold-300">
//                     {prayer.name}
//                   </span>
//                 </div>
//                 <span className="text-xs text-gold-400/50">
//                   {formatDate(prayer.date)}
//                 </span>
//               </div>

//               <p className="text-gold-200/80 mb-4 leading-relaxed">
//                 "{prayer.request}"
//               </p>

//               <div className="flex items-center justify-between pt-4 border-t border-gold-500/10">
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => addPrayer(prayer.id)}
//                   className="flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors"
//                 >
//                   <Heart className="w-5 h-5" />
//                   <span className="font-medium">{prayer.prayers} Praying</span>
//                 </motion.button>

//                 <span className="text-xs text-gold-400/50">
//                   {prayer.prayers > 0
//                     ? `${prayer.prayers} ${prayer.prayers === 1 ? "person" : "people"} praying`
//                     : "Be the first to pray"}
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Stats */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//           className="mt-12 flex flex-wrap justify-center gap-8"
//         >
//           <div className="text-center">
//             <div className="font-display text-4xl font-bold text-gold-400">
//               {prayerRequests.length}
//             </div>
//             <div className="text-gold-200/60 text-sm">Total Requests</div>
//           </div>
//           <div className="text-center">
//             <div className="font-display text-4xl font-bold text-gold-400">
//               {prayerRequests.reduce((acc, p) => acc + p.prayers, 0)}
//             </div>
//             <div className="text-gold-200/60 text-sm">Prayers Offered</div>
//           </div>
//           <div className="text-center">
//             <div className="font-display text-4xl font-bold text-gold-400">
//               {prayerRequests.filter((p) => p.prayers > 0).length}
//             </div>
//             <div className="text-gold-200/60 text-sm">Being Prayed For</div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Prayer Request Form Modal */}
//       <AnimatePresence>
//         {showForm && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
//             onClick={() => setShowForm(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="bg-gradient-to-b from-church-dark to-church-light/10 border border-gold-500/30 rounded-2xl p-8 max-w-lg w-full relative"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Close Button */}
//               <button
//                 onClick={() => setShowForm(false)}
//                 className="absolute top-4 right-4 w-10 h-10 bg-gold-500/10 hover:bg-gold-500/20 rounded-full flex items-center justify-center transition-colors"
//               >
//                 <X className="w-5 h-5 text-gold-400" />
//               </button>

//               {submitted ? (
//                 // Success Message
//                 <motion.div
//                   initial={{ scale: 0.8, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   className="text-center py-8"
//                 >
//                   <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
//                     <Heart className="w-10 h-10 text-church-dark" />
//                   </div>
//                   <h3 className="font-display text-2xl font-bold text-gold-400 mb-2">
//                     Prayer Submitted!
//                   </h3>
//                   <p className="text-gold-200/70">
//                     Thank you for sharing. Our church family is lifting you up
//                     in prayer.
//                   </p>
//                 </motion.div>
//               ) : (
//                 // Form
//                 <>
//                   <h3 className="font-display text-2xl font-bold text-gold-400 mb-2">
//                     Submit Prayer Request
//                   </h3>
//                   <p className="text-gold-200/60 text-sm mb-6">
//                     Your request will be visible to all and our community will
//                     pray for you.
//                   </p>

//                   <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                       <label className="block text-gold-200 text-sm mb-2">
//                         Your Name (optional)
//                       </label>
//                       <input
//                         type="text"
//                         value={formData.name}
//                         onChange={(e) =>
//                           setFormData({ ...formData, name: e.target.value })
//                         }
//                         className="w-full bg-church-light/5 border border-gold-500/20 rounded-lg px-4 py-3 text-white placeholder-gold-400/30 focus:outline-none focus:border-gold-500/50 transition-colors"
//                         placeholder="Enter your name"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-gold-200 text-sm mb-2">
//                         Your Request <span className="text-red-400">*</span>
//                       </label>
//                       <textarea
//                         required
//                         value={formData.request}
//                         onChange={(e) =>
//                           setFormData({ ...formData, request: e.target.value })
//                         }
//                         rows={5}
//                         className="w-full bg-church-light/5 border border-gold-500/20 rounded-lg px-4 py-3 text-white placeholder-gold-400/30 focus:outline-none focus:border-gold-500/50 transition-colors resize-none"
//                         placeholder="Share your prayer request..."
//                       />
//                     </div>

//                     <label className="flex items-center gap-3 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={formData.isAnonymous}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             isAnonymous: e.target.checked,
//                           })
//                         }
//                         className="w-5 h-5 rounded border-gold-500/30 bg-church-light/5 text-gold-500 focus:ring-gold-500/50"
//                       />
//                       <span className="text-gold-200/70 text-sm">
//                         Submit anonymously
//                       </span>
//                     </label>

//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       type="submit"
//                       className="w-full bg-gradient-gold text-church-dark py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300 glow-gold flex items-center justify-center gap-2"
//                     >
//                       <Send className="w-5 h-5" />
//                       Submit Prayer Request
//                     </motion.button>
//                   </form>
//                 </>
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }
