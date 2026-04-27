import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import Seo from '../components/Seo';
import { useDomain } from '../contexts/DomainContext';

const ContactPage = () => {
  const { signupUrl } = useDomain();

  return (
    <div className="bg-navy-900">
      <Seo
        title="Contact"
        description="Get in touch with the Jobrythm team. We're here to answer questions about quoting, job costing, invoicing, and how Jobrythm fits your trades business."
        path="/contact"
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-800 to-navy-900 py-20 lg:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get in touch
            </h1>
            <p className="text-xl text-gray-300">
              Have questions? Email us and we'll get back to you.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Info */}
      <section className="py-20 lg:py-32">
        <Container size="sm">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 bg-electric-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="text-electric-600" size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">Email</h2>
                    <p className="text-gray-300 mb-3">
                      For all questions, support requests, and feedback — email us directly.
                    </p>
                    <a
                      href="mailto:contact@jobrythm.io"
                      className="text-electric-400 hover:text-electric-300 transition-colors font-semibold text-lg"
                    >
                      contact@jobrythm.io
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 bg-electric-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-electric-600" size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2">Location</h2>
                    <p className="text-gray-300">
                      McMinnville, Oregon, USA
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Jobrythm is built by{' '}
                      <a
                        href="https://beta.artistechendeavors.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-electric-400 hover:text-electric-300 transition-colors"
                      >
                        Artistech Endeavors
                      </a>
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-8 text-center">
                <h2 className="text-xl font-bold text-white mb-3">Ready to try it?</h2>
                <p className="text-gray-300 mb-6">
                  Start your free trial — no demo needed. The product speaks for itself.
                </p>
                <a href={signupUrl}>
                  <Button size="lg">Start free trial</Button>
                </a>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ContactPage;
