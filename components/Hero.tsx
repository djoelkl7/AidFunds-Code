import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const Hero: React.FC = () => {
  return (
    <section 
      id="home"
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center py-20"
      style={{ backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 text-center text-white px-4 sm:px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4"
        >
          The Future of <span className="text-primary-purple">Finance</span> is Here
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-300"
        >
          Experience seamless, secure, and smart investing with our revolutionary platform. We empower your financial journey with cutting-edge technology and expert insights.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link 
            to="/signup"
            className="inline-block bg-primary-purple text-white font-bold px-6 py-3 sm:px-8 sm:py-4 rounded-lg text-base sm:text-lg hover:bg-primary-purple-dark transition duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
