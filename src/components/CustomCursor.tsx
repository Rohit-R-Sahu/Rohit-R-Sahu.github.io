import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const mobileDevice = window.innerWidth <= 768;
    if (mobileDevice) return;

    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mouseenter', onMouseEnter);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    const onLinkHoverStart = () => {
      setLinkHovered(true);
    };

    const onLinkHoverEnd = () => {
      setLinkHovered(false);
    };

    addEventListeners();

    // Add event listeners to all links and buttons
    const links = document.querySelectorAll('a, button, .btn, [role="button"]');
    links.forEach((link) => {
      link.addEventListener('mouseenter', onLinkHoverStart);
      link.addEventListener('mouseleave', onLinkHoverEnd);
    });

    return () => {
      removeEventListeners();
      links.forEach((link) => {
        link.removeEventListener('mouseenter', onLinkHoverStart);
        link.removeEventListener('mouseleave', onLinkHoverEnd);
      });
    };
  }, []);

  // Don't render on mobile devices
  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null;
  }

  const cursorVariants = {
    default: {
      x: position.x - 12,
      y: position.y - 12,
      height: 24,
      width: 24,
      backgroundColor: 'rgba(97, 114, 249, 0.4)',
      border: '1px solid rgba(97, 114, 249, 0.8)',
      transition: {
        type: 'spring',
        mass: 0.3,
        stiffness: 800,
        damping: 50,
      },
    },
    hover: {
      x: position.x - 16,
      y: position.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(97, 114, 249, 0.6)',
      border: '1px solid #6172f9',
      transition: {
        type: 'spring',
        mass: 0.3,
        stiffness: 800,
        damping: 50,
      },
    },
    clicked: {
      x: position.x - 12,
      y: position.y - 12,
      height: 24,
      width: 24,
      backgroundColor: 'rgba(97, 114, 249, 0.8)',
      scale: 0.8,
      transition: {
        type: 'spring',
        mass: 0.3,
        stiffness: 800,
        damping: 50,
      },
    },
    hidden: {
      opacity: 0,
    },
  };

  const dots = Array.from({ length: 5 });
  
  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 rounded-full mix-blend-difference"
      variants={cursorVariants}
      animate={
        hidden ? 'hidden' : clicked ? 'clicked' : linkHovered ? 'hover' : 'default'
      }
    >
      {linkHovered && (
        <div className="absolute inset-0 flex items-center justify-center">
          {dots.map((_, index) => (
            <motion.div
              key={index}
              className="w-1 h-1 rounded-full bg-white mx-0.5"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CustomCursor;