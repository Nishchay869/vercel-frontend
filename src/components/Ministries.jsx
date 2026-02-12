import React from "react";
import { motion } from "framer-motion";
import {
  Baby,
  Heart,
  Users,
  GraduationCap,
  HelpingHand,
  Music,
  Sun,
} from "lucide-react";

const ministries = [
  {
    category: "Children",
    icon: Baby,
    color: "from-pink-400 to-pink-600",
    programs: [
      {
        name: "Sunday School",
        age: "Ages 3-12",
        description: "Age-appropriate Bible lessons and activities",
      },
      {
        name: "Kids Church",
        age: "Ages 6-12",
        description: "Interactive worship and learning during services",
      },
      {
        name: "AWANA",
        age: "Ages 3-12",
        description: "Wednesday evening Bible club",
      },
    ],
  },
  {
    category: "Youth",
    icon: Sun,
    color: "from-yellow-400 to-orange-500",
    programs: [
      {
        name: "Youth Group",
        age: "Grades 6-12",
        description: "Friday night fun, faith, and fellowship",
      },
      {
        name: "Student Discipleship",
        age: "Grades 6-12",
        description: "Deep study and mentorship",
      },
      {
        name: "Summer Camp",
        age: "Grades 6-12",
        description: "Week-long adventure with God",
      },
    ],
  },
  {
    category: "Adults",
    icon: Users,
    color: "from-blue-400 to-blue-600",
    programs: [
      {
        name: "Small Groups",
        age: "All Adults",
        description: "Fellowship and study in home settings",
      },
      {
        name: "Men's Ministry",
        age: "Men 18+",
        description: "Discipleship and service opportunities",
      },
      {
        name: "Women's Ministry",
        age: "Women 18+",
        description: "Bible study and women's events",
      },
    ],
  },
  {
    category: "Music & Arts",
    icon: Music,
    color: "from-purple-400 to-purple-600",
    programs: [
      {
        name: "Worship Team",
        age: "All Ages",
        description: "Lead worship in services",
      },
      {
        name: "Choir",
        age: "Adults",
        description: "Traditional and contemporary choir",
      },
      {
        name: "Drama Ministry",
        age: "All Ages",
        description: "Creative worship through drama",
      },
    ],
  },
  {
    category: "Outreach",
    icon: HelpingHand,
    color: "from-green-400 to-green-600",
    programs: [
      {
        name: "Food Pantry",
        age: "Volunteers",
        description: "Serving our community's needs",
      },
      {
        name: "Missions",
        age: "All Ages",
        description: "Local and global mission opportunities",
      },
      {
        name: "Service Days",
        age: "All Ages",
        description: "Quarterly community service events",
      },
    ],
  },
  {
    category: "Marriage & Family",
    icon: Heart,
    color: "from-red-400 to-red-600",
    programs: [
      {
        name: "Marriage Retreats",
        age: "Married Couples",
        description: "Strengthening marriages together",
      },
      {
        name: "Parenting Classes",
        age: "Parents",
        description: "Biblical guidance for raising kids",
      },
      {
        name: "Family Events",
        age: "All Families",
        description: "Fun activities for the whole family",
      },
    ],
  },
];

export default function Ministries() {
  return (
    <section
      id="ministries"
      className="py-20 bg-church-dark relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gold-400 mb-4">
            Ministries & Programs
          </h2>
          <p className="text-xl text-gold-200 max-w-3xl mx-auto">
            Find your place to grow, serve, and connect with others in your
            stage of life.
          </p>
        </motion.div>

        {/* Ministries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((ministry, index) => (
            <motion.div
              key={ministry.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-church-light/5 border border-gold-500/20 rounded-2xl overflow-hidden hover:border-gold-500/40 transition-all duration-300 group"
            >
              <div className={`bg-gradient-to-r ${ministry.color} p-6`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <ministry.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {ministry.category}
                  </h3>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {ministry.programs.map((program, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gold-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-shrink">
                      <h4 className="font-semibold text-gold-300">
                        {program.name}
                      </h4>
                      <p className="text-sm text-gold-200/70 mb-1">
                        {program.age}
                      </p>
                      <p className="text-sm text-gold-200/60">
                        {program.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
