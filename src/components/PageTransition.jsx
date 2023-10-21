import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  const Animation = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };
  return (
    <motion.div
      transition={{
        ease: "easeInOut",
        duration: 0.5,
      }}
      variants={Animation}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
