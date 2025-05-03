import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  demoUrl: string;
  githubUrl: string;
  category: string;
};

// Sample data for projects
const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with user authentication, product management, cart functionality, and payment processing.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    category: 'Full Stack',
  },
  {
    id: 2,
    title: 'Task Management System',
    description: 'A comprehensive project management tool with task tracking, team collaboration, and analytics dashboard.',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tech: ['React', 'TypeScript', 'Firebase', 'CSS', 'Redux'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    category: 'Frontend',
  },
  {
    id: 3,
    title: 'Real-time Chat Application',
    description: 'A chat platform with real-time messaging, user presence indicators, and file sharing capabilities.',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tech: ['React', 'Socket.io', 'Node.js', 'Express', 'MongoDB'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    category: 'Full Stack',
  },
  {
    id: 4,
    title: 'Content Management System',
    description: 'A custom CMS built for content creators with markdown support, media management, and scheduling features.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tech: ['Next.js', 'PostgreSQL', 'GraphQL', 'Tailwind CSS'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    category: 'CMS',
  },
  {
    id: 5,
    title: 'Banking API',
    description: 'A secure banking API with transaction processing, account management, and authentication features.',
    image: 'https://images.pexels.com/photos/2007/design-document-word-text.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tech: ['Java', 'Spring Boot', 'MySQL', 'JUnit', 'Docker'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    category: 'Backend',
  },
  {
    id: 6,
    title: 'DevOps Pipeline',
    description: 'A CI/CD pipeline setup for automating testing, building, and deployment of microservices.',
    image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tech: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Terraform'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    category: 'DevOps',
  },
];

const CATEGORIES = ['All', 'Full Stack', 'Frontend', 'Backend', 'CMS', 'DevOps'];

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="card group h-full flex flex-col"
    >
      <div className="relative overflow-hidden rounded-t-2xl h-48">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full flex justify-between items-center">
            <div className="flex space-x-2">
              {project.tech.slice(0, 3).map((tech, index) => (
                <span 
                  key={index} 
                  className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-white"
                >
                  {tech}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-white">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{project.description}</p>
        
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <a 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 font-medium flex items-center hover:underline"
          >
            Live Demo <ArrowUpRight size={16} className="ml-1" />
          </a>
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  
  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(project => project.category === activeCategory);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  return (
    <section id="projects" className="section">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="section-title mx-auto">Featured Projects</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mt-4">
            Explore a selection of my recent work across various domains and technologies.
          </p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category 
                  ? 'bg-indigo-600 text-white dark:bg-indigo-500' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.1 * index }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          variants={itemVariants}
          className="text-center mt-12"
        >
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            View More Projects <Github size={16} className="ml-2" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;