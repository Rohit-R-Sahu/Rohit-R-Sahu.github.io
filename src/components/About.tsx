import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Medal, Calendar, Award, GraduationCap } from "lucide-react";
import { useTheme } from "../context/ThemeContext"; // Import useTheme

const About = () => {
  const { theme } = useTheme(); // Access the current theme
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const achievements = [
    {
      icon: <Medal className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Experience",
      description: "3+ Years",
    },
    {
      icon: (
        <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      ),
      title: "Projects",
      description: "20+ Completed",
    },
    {
      icon: <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Technologies",
      description: "15+ Mastered",
    },
    {
      icon: (
        <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      ),
      title: "Education",
      description: "Bio Informatics",
    },
  ];

  return (
    <section id="about" className="section mb-20">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="section-title mx-auto">About Me</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mt-4">
            I'm a passionate software developer with expertise in building
            scalable full-stack applications, managing DevOps workflows, and
            implementing CMS solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div variants={itemVariants} className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl  p-6 relative">
              {/* Conditionally set the hero image based on the theme */}
              <img
                src={
                  theme === "dark"
                    ? "/images/hero-bg.svg"
                    : "/images/hero-bg 1.svg"
                }
                alt="Hero Image"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
              Crafting Digital Experiences with Precision
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              I thrive on building seamless systems that connect intuitive user
              interfaces with high-performing APIs, balancing front-end finesse
              with backend reliability.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              Whether working in teams or leading projects independently, I
              focus on performance, clarity, and writing code that's built to
              last.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                  <div className="mb-2">{item.icon}</div>
                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {item.title}
                  </h4>
                  <p className="font-bold text-gray-900 dark:text-white">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
