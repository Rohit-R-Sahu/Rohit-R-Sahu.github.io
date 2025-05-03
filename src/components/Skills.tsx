import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const skillCategories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'TypeScript', level: 88 },
      { name: 'CSS/SCSS', level: 90 },
      { name: 'Tailwind', level: 92 },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 88 },
      { name: 'Java/Spring', level: 80 },
      { name: 'Python/FastAPI', level: 78 },
      { name: 'GraphQL', level: 75 },
    ],
  },
  {
    name: 'Database',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'MySQL', level: 80 },
      { name: 'Redis', level: 75 },
      { name: 'Firebase', level: 78 },
    ],
  },
  {
    name: 'DevOps',
    skills: [
      { name: 'Docker', level: 82 },
      { name: 'Kubernetes', level: 75 },
      { name: 'CI/CD', level: 80 },
      { name: 'AWS', level: 78 },
      { name: 'Azure', level: 72 },
    ],
  },
];

const SkillBar = ({ skill, inView }: { skill: { name: string; level: number }; inView: boolean }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <motion.div
          className="h-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${skill.level}%` : 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section id="skills" className="section bg-gray-50 dark:bg-gray-800/50">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="section-title mx-auto">Skills & Expertise</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mt-4">
            I've worked with a diverse range of technologies across multiple domains,
            allowing me to approach problems with a comprehensive perspective.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              className="card p-6"
            >
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                <span className="inline-block w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full mr-2"></span>
                {category.name}
              </h3>
              <div>
                {category.skills.map((skill) => (
                  <SkillBar key={skill.name} skill={skill} inView={isInView} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center gradient-text">Technology Experience</h3>
              
              <div className="flex flex-wrap justify-center gap-4">
                {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Java', 'Spring Boot', 
                  'Python', 'FastAPI', 'SQL', 'NoSQL', 'Docker', 'Kubernetes', 'Git', 
                  'AWS', 'MongoDB', 'PostgreSQL', 'Redux', 'GraphQL', 'Azure', 'Next.js',
                  'Express', 'Tailwind CSS', 'Jest', 'CI/CD', 'REST API'].map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;