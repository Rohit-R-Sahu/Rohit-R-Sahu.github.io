import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Medal, Calendar, Award, GraduationCap } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const achievements = [
    {
      icon: <Medal className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Experience",
      description: "3+ Years"
    },
    {
      icon: <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Projects",
      description: "20+ Completed"
    },
    {
      icon: <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Technologies",
      description: "15+ Mastered"
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      title: "Education",
      description: "Computer Science"
    }
  ];

  return (
    <section id="about" className="section">
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
            I'm a passionate software developer with expertise in building scalable full-stack applications,
            managing DevOps workflows, and implementing CMS solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 p-6 relative">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800')] bg-cover bg-center opacity-90 rounded-2xl"></div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-600/10 dark:bg-indigo-400/10 rounded-full"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-500/10 dark:bg-primary-400/10 rounded-full"></div>
            </div>
            
            {/* Floating badges */}
            <motion.div 
              className="absolute top-6 -right-6 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <span className="text-sm font-medium">Full Stack Developer</span>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-10 -left-6 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <span className="text-sm font-medium">DevOps Expert</span>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
              Crafting Digital Experiences with Precision
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              I specialize in building robust web applications with modern technologies like React, Node.js, Spring Boot, and FastAPI. 
              I'm passionate about creating clean, efficient code and delivering exceptional user experiences.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              With a background in both front-end and back-end development, I bring a holistic perspective to every project. 
              I'm dedicated to continuous learning and staying updated with the latest industry trends and best practices.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {achievements.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                  <div className="mb-2">{item.icon}</div>
                  <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400">{item.title}</h4>
                  <p className="font-bold text-gray-900 dark:text-white">{item.description}</p>
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