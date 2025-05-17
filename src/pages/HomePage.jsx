
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Download, Play, Info, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const whatsNewItems = [
  { text: "Mobile Support Added - Play select versions on your phone!" },
  { text: "Expanded version list for both PC and Mobile." },
  { text: "Fixed Major Bugs." },
];

const HomePage = () => {
  return (
    <motion.main
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="flex-grow hero-pattern-dynamic"
    >
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Play Minecraft Anywhere with Eaglercraft
            </h1>
            
            <div className="bg-card bg-opacity-80 dark:bg-opacity-60 p-6 rounded-lg shadow-xl mb-10 backdrop-blur-sm border border-border">
              <p className="text-muted-foreground text-lg mb-4">
                Eaglercraft is a browser-based version of Minecraft that allows you to play the game directly in your web browser without any installations.
              </p>
              <p className="text-muted-foreground text-lg">
                Choose to download the client for offline play or jump straight into the action online!
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/downloads">
                  <button className="minecraft-btn green w-full md:w-auto px-8 py-4 text-lg">
                    <Download className="inline-block mr-2 h-5 w-5" />
                    Downloads
                  </button>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/online">
                  <button className="minecraft-btn blue w-full md:w-auto px-8 py-4 text-lg">
                    <Play className="inline-block mr-2 h-5 w-5" />
                    Play Online
                  </button>
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="bg-card bg-opacity-80 dark:bg-opacity-60 p-6 rounded-lg shadow-xl backdrop-blur-sm border border-border text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-foreground mb-2 flex items-center">
                <Info className="mr-2 h-6 w-6 text-primary" />
                What's New
              </h2>
              <h3 className="text-xl font-medium text-primary mb-3 ml-1 flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Update 1
              </h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-2">
                {whatsNewItems.map((item, index) => (
                  <li key={index}>
                    {item.text}
                  </li>
                ))}
              </ul>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </motion.main>
  );
};

export default HomePage;
