import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';

const NotFoundPage = () => {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto py-20"
        >
          {/* 404 Illustration */}
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-9xl font-bold text-electric-500 mb-4"
            >
              404
            </motion.div>
            <div className="flex justify-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-navy-100 rounded-2xl flex items-center justify-center transform -rotate-6">
                <Search className="text-navy-400" size={32} />
              </div>
              <div className="w-16 h-16 bg-electric-100 rounded-2xl flex items-center justify-center transform rotate-6">
                <Home className="text-electric-600" size={32} />
              </div>
            </div>
          </div>

          {/* Content */}
          <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-6">
            Page not found
          </h1>
          <p className="text-xl text-navy-600 mb-8">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or doesn't exist.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg">
                <Home className="mr-2" size={20} />
                Go to homepage
              </Button>
            </Link>
            <button onClick={() => window.history.back()}>
              <Button size="lg" variant="outline">
                <ArrowLeft className="mr-2" size={20} />
                Go back
              </Button>
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-12 border-t border-gray-200">
            <p className="text-navy-600 mb-4">Looking for something specific?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/features" className="text-electric-600 hover:text-electric-700 font-medium">
                Features
              </Link>
              <span className="text-gray-300">•</span>
              <Link to="/pricing" className="text-electric-600 hover:text-electric-700 font-medium">
                Pricing
              </Link>
              <span className="text-gray-300">•</span>
              <Link to="/about" className="text-electric-600 hover:text-electric-700 font-medium">
                About
              </Link>
              <span className="text-gray-300">•</span>
              <Link to="/contact" className="text-electric-600 hover:text-electric-700 font-medium">
                Contact
              </Link>
              <span className="text-gray-300">•</span>
              <a
                href="https://app.jobrythm.com/signup"
                className="text-electric-600 hover:text-electric-700 font-medium"
              >
                Sign up
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
};

export default NotFoundPage;
