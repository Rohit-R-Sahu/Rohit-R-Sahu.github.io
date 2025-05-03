import { motion } from 'framer-motion';
import { Code, Terminal, Server, Database, ArrowDownCircle } from 'lucide-react';

const Loader = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.5
      }
    }
  };

  const icons = [
    <Code size={20} key="code" />,
    <Terminal size={20} key="terminal" />,
    <Server size={20} key="server" />,
    <Database size={20} key="database" />
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        className="flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-8 relative" variants={logoVariants}>
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 flex items-center justify-center">
            <span className="text-white text-3xl font-bold">RS</span>
          </div>
          <motion.div
            className="absolute -right-2 -bottom-2 bg-white dark:bg-gray-800 rounded-full shadow-lg p-2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            <div className="w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold"><ArrowDownCircle/></span>
            </div>
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center"
          variants={textVariants}
        >
          You are about to visit <br /> Rohit's Portfolio
        </motion.h1>

        <motion.div className="flex space-x-2" variants={containerVariants}>
          {icons.map((icon, index) => (
            <motion.div
              key={index}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center"
              variants={itemVariants}
              animate={{
                y: [0, -8, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                },
              }}
            >
              <span className="text-indigo-600 dark:text-indigo-400">
                {icon}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mt-8 text-gray-600 dark:text-gray-400"
          variants={textVariants}
        >
          Loading ...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Loader;