import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Users, Music, Coffee, BookOpen } from "lucide-react";

const services = [
  {
    day: "Sunday",
    times: [
      {
        time: "8:00 AM",
        name: "Traditional Service",
        icon: Music,
        description: "Classic hymns and traditional liturgy",
      },
      {
        time: "10:30 AM",
        name: "Contemporary Service",
        icon: Music,
        description: "Modern worship and relevant teaching",
      },
    ],
    icon: Clock,
    color: "from-gold-500 to-gold-600",
  },
  {
    day: "Wednesday",
    times: [
      {
        time: "7:00 PM",
        name: "Bible Study",
        icon: BookOpen,
        description: "Deep dive into Scripture",
      },
    ],
    icon: Users,
    color: "from-blue-500 to-blue-600",
  },
  {
    day: "Friday",
    times: [
      {
        time: "7:00 PM",
        name: "Youth Group",
        icon: Coffee,
        description: "Fun, faith, and fellowship for teens",
      },
    ],
    icon: Coffee,
    color: "from-purple-500 to-purple-600",
  },
];

const amenities = [
  {
    icon: Coffee,
    name: "Nursery Available",
    description: "Safe care for little ones",
  },
  {
    icon: Coffee,
    name: "Refreshments",
    description: "Coffee and snacks after services",
  },
  {
    icon: Users,
    name: "Accessibility",
    description: "Wheelchair accessible facility",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-b from-church-dark to-church-light/10 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D49B00' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
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
            Join Us for Worship
          </h2>
          <p className="text-xl text-gold-200 max-w-3xl mx-auto">
            Experience authentic worship, biblical teaching, and community every
            week.
          </p>
        </motion.div>

        {/* Services Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.day}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-church-light/5 border border-gold-500/20 rounded-2xl overflow-hidden hover:border-gold-500/40 transition-all duration-300"
            >
              <div className={`bg-gradient-to-r ${service.color} p-4`}>
                <div className="flex items-center justify-center gap-3">
                  <service.icon className="w-6 h-6 text-white" />
                  <h3 className="text-xl font-semibold text-white">
                    {service.day}
                  </h3>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {service.times.map((timeSlot, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gold-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <timeSlot.icon className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gold-300">
                        {timeSlot.time} - {timeSlot.name}
                      </h4>
                      <p className="text-sm text-gold-200/70">
                        {timeSlot.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Service Times Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-gold/10 border border-gold-500/30 rounded-2xl p-8 mb-16"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-gold-400" />
              <div>
                <p className="text-gold-300 font-semibold">Sunday Services</p>
                <p className="text-gold-200">8:00 AM & 10:30 AM</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-gold-500/30"></div>
            <div className="flex items-center gap-3">
              <MapPin className="w-8 h-8 text-gold-400" />
              <div>
                <p className="text-gold-300 font-semibold">Location</p>
                <p className="text-gold-200">
                  123 Grace Street, Cityville, ST 12345
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Amenities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="font-display text-2xl font-semibold text-gold-400 text-center mb-8">
            What to Expect
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-church-light/5 px-6 py-3 rounded-full border border-gold-500/20"
              >
                <amenity.icon className="w-5 h-5 text-gold-400" />
                <span className="text-gold-200">{amenity.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
