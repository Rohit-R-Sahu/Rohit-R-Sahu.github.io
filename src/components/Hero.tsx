import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, DownloadCloud } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Float,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";

// Simple custom 3D model for the hero section
function CodeSphere({ theme }: { theme: string }) {
  const ref = useRef<THREE.Mesh>(null!);

  // Use colors that match our theme
  const material = new THREE.MeshStandardMaterial({
    color:
      theme === "dark"
        ? new THREE.Color("#6172f9")
        : new THREE.Color("#4249ef"),
    metalness: 0.3,
    roughness: 0.4,
    wireframe: true,
  });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = Math.sin(t / 4) / 4;
    ref.current.rotation.y = Math.sin(t / 2) / 2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={ref} material={material}>
        <icosahedronGeometry args={[2, 3]} />
      </mesh>
    </Float>
  );
}

const TYPING_TEXTS = [
  "Full-Stack Engineer",
  "DevOps Practitioner",
  "Headless CMS Expert",
  "API Architect",
  "FastAPI Developer",
  "Creative Problem Solver",
];


const Hero = () => {
  const { theme } = useTheme();
  const currentTextRef = useRef(0);
  const charIndexRef = useRef(0);
  const textRef = useRef<HTMLSpanElement>(null);
  const isDeleteMode = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const typeText = () => {
      const currentText = TYPING_TEXTS[currentTextRef.current];

      if (!isDeleteMode.current) {
        // Typing mode
        if (charIndexRef.current < currentText.length) {
          if (textRef.current) {
            textRef.current.textContent = currentText.substring(
              0,
              charIndexRef.current + 1
            );
          }
          charIndexRef.current++;
          timeoutRef.current = setTimeout(typeText, 100);
        } else {
          // Finished typing, wait before deleting
          isDeleteMode.current = true;
          timeoutRef.current = setTimeout(typeText, 1500);
        }
      } else {
        // Deleting mode
        if (charIndexRef.current > 0) {
          if (textRef.current) {
            textRef.current.textContent = currentText.substring(
              0,
              charIndexRef.current - 1
            );
          }
          charIndexRef.current--;
          timeoutRef.current = setTimeout(typeText, 50);
        } else {
          // Finished deleting, move to next text
          isDeleteMode.current = false;
          currentTextRef.current =
            (currentTextRef.current + 1) % TYPING_TEXTS.length;
          timeoutRef.current = setTimeout(typeText, 500);
        }
      }
    };

    typeText();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* Background 3D */}
      {/* <div className="canvas-container">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#6172f9" />
          <CodeSphere theme={theme} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div> */}

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 text-gray-900 dark:text-white leading-tight">
            Rohit R. Sahu
          </h1>

          <div className="h-14 flex justify-center items-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium mb-8">
              <span className="mr-2">I'm a</span>
              <span ref={textRef} className="gradient-text"></span>
              <span className="animate-blink text-indigo-600 dark:text-indigo-400">
                |
              </span>
            </h2>
          </div>

          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            Building sleek apps with{" "}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              MERN
            </span>
            ,
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {" "}
              Spring Boot
            </span>
            , &
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {" "}
              FastAPI
            </span>
            . DevOps-savvy. Problem solver. Code meets clarity.
          </p>

          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
            >
              Let's Connect
            </motion.a>
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary"
            >
              View Projects
            </motion.a>
          </div>

          <div className="flex justify-center space-x-6">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <Github size={24} />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a
              href="/resume.pdf"
              whileHover={{ y: -3 }}
              className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              <DownloadCloud size={24} />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <a href="#about" className="text-gray-600 dark:text-gray-400">
            <ChevronDown size={32} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
