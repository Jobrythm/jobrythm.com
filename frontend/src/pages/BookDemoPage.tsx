import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import { useDomain } from '../contexts/DomainContext';

const BookDemoPage = () => {
  const { signupUrl } = useDomain();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    teamSize: '',
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

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.teamSize) {
      newErrors.teamSize = 'Team size is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // TODO: Send to backend when available
      console.log('Demo booking submission:', formData);
      setSubmitted(true);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const teamSizeOptions = [
    '1 (just me)',
    '2-5',
    '6-10',
    '11-25',
    '26-50',
    '50+',
  ];

  return (
    <div className="bg-navy-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-800 to-navy-900 py-20 lg:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="w-16 h-16 bg-electric-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="text-electric-600" size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              See Jobrythm in action
            </h1>
            <p className="text-xl text-gray-300">
              Book a personalized demo and discover how Jobrythm can transform your trades business.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Form Section */}
      <section className="py-20 lg:py-32 -mt-20">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 md:p-8 lg:p-12">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="text-green-600" size={40} />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Demo booked!</h2>
                  <p className="text-xl text-gray-300 mb-2">
                    Thank you for your interest in Jobrythm.
                  </p>
                  <p className="text-gray-300 max-w-md">
                    We'll follow up within 1 business day to schedule your personalized demo.
                  </p>
                  <div className="mt-8">
                    <a href="/">
                      <Button>Return to home</Button>
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-4">Book your demo</h2>
                    <p className="text-gray-300">
                      Fill out the form below and we'll be in touch to schedule a time that works for you.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
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
                        <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
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

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-electric-500`}
                          placeholder="+1 (555) 123-4567"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                          Company *
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.company ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-electric-500`}
                          placeholder="Your Company Name"
                        />
                        {errors.company && (
                          <p className="text-red-500 text-sm mt-1">{errors.company}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="teamSize" className="block text-sm font-medium text-white mb-2">
                        Team Size *
                      </label>
                      <select
                        id="teamSize"
                        name="teamSize"
                        value={formData.teamSize}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.teamSize ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-electric-500`}
                      >
                        <option value="">Select team size</option>
                        {teamSizeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.teamSize && (
                        <p className="text-red-500 text-sm mt-1">{errors.teamSize}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                        Message (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-electric-500"
                        placeholder="Tell us about your business and what you'd like to see in the demo..."
                      />
                    </div>

                    <div className="bg-navy-800 p-4 rounded-lg">
                      <p className="text-sm text-gray-300">
                        <strong>What to expect:</strong> We'll follow up within 1 business day to schedule your 30-minute personalized demo at a time that works for you.
                      </p>
                    </div>

                    <Button type="submit" size="lg" fullWidth>
                      Book demo
                    </Button>

                    <p className="text-center text-sm text-gray-300">
                      Prefer to try it yourself first?{' '}
                      <a
                        href={signupUrl}
                        className="text-electric-600 hover:text-electric-700 font-medium"
                      >
                        Start your free trial
                      </a>
                    </p>
                  </form>
                </>
              )}
            </Card>
          </motion.div>
        </Container>
      </section>

      {/* What You'll Learn */}
      {!submitted && (
        <section className="py-20 lg:py-32 bg-navy-800">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                What you'll learn in the demo
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We'll customize the demo to focus on what matters most to your business
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Quote Creation',
                  description: 'See how fast you can create professional quotes with smart templates and pricing.',
                },
                {
                  title: 'Job Cost Tracking',
                  description: 'Learn how to track real-time costs and margins so you always know your profitability.',
                },
                {
                  title: 'Invoicing & Payment',
                  description: 'Discover how to generate invoices instantly and get paid faster with integrated tracking.',
                },
              ].map((item, index) => (
                <Card key={index} className="p-8 text-center">
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
};

export default BookDemoPage;
