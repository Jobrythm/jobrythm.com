import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Log to console since there's no backend
      console.log('Contact form submission:', formData);
      setSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', company: '', message: '' });
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@jobrythm.aricummings.com',
      link: 'mailto:hello@jobrythm.aricummings.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Office',
      content: 'San Francisco, CA',
      link: null,
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-50 to-white py-20 lg:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 mb-6">
              Get in touch
            </h1>
            <p className="text-xl text-navy-600">
              Have questions? We're here to help. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 lg:py-32 -mt-20">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-electric-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="text-electric-600" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-navy-900 mb-1">{info.title}</h3>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-navy-600 hover:text-electric-500 transition-colors"
                            >
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-navy-600">{info.content}</p>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}

              {/* Additional CTAs */}
              <Card className="p-6 bg-navy-900 text-white">
                <h3 className="font-semibold mb-2">Looking to get started?</h3>
                <p className="text-gray-300 mb-4 text-sm">
                  Start your free trial or book a demo with our team.
                </p>
                <div className="space-y-3">
                  <a href="https://app.jobrythm.com/signup" className="block">
                    <Button fullWidth size="sm">Start free trial</Button>
                  </a>
                  <a href="/book-demo" className="block">
                    <Button
                      fullWidth
                      size="sm"
                      className="bg-white text-navy-900 hover:bg-gray-100"
                    >
                      Book a demo
                    </Button>
                  </a>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-navy-900 mb-6">Send us a message</h2>

                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="text-green-600" size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-navy-900 mb-2">Message sent!</h3>
                    <p className="text-navy-600">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-navy-900 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.name ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-electric-500`}
                          placeholder="John Smith"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-navy-900 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-electric-500`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-navy-900 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-500"
                        placeholder="Your Company Name"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-navy-900 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.message ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-electric-500`}
                        placeholder="Tell us how we can help..."
                      />
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                      )}
                    </div>

                    <Button type="submit" size="lg" fullWidth>
                      Send message
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ContactPage;
