import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileText,
  Calculator,
  Receipt,
  BarChart3,
  Users,
  Package,
  ArrowRight,
  Check,
  Clock,
  DollarSign,
  TrendingUp,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';

const HomePage = () => {
  const features = [
    {
      icon: FileText,
      title: 'Smart Quotes',
      description: 'Create professional quotes in minutes with intelligent templates and pricing suggestions.',
    },
    {
      icon: Calculator,
      title: 'Job Cost Tracking',
      description: 'Track costs in real-time and know your profitability on every job before completion.',
    },
    {
      icon: Package,
      title: 'Line Items',
      description: 'Organize labour, materials, equipment, and subcontractor costs with precision.',
    },
    {
      icon: Receipt,
      title: 'Professional Invoices',
      description: 'Send polished invoices instantly and get paid faster with integrated payment options.',
    },
    {
      icon: BarChart3,
      title: 'Margin Insights',
      description: 'See your profit margins at a glance and make data-driven pricing decisions.',
    },
    {
      icon: Users,
      title: 'Client Management',
      description: 'Keep all client information, project history, and communications in one place.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Quote',
      description: 'Build detailed quotes with line items for labour, materials, and more in minutes.',
    },
    {
      number: '02',
      title: 'Convert to Job',
      description: 'When approved, convert quotes to jobs automatically and track costs throughout.',
    },
    {
      number: '03',
      title: 'Get Paid',
      description: 'Generate professional invoices, send them instantly, and get paid with confidence.',
    },
  ];

  const benefits = [
    { label: 'Save 6+ hours/week on admin', icon: Clock },
    { label: 'Increase profit margins by 15%', icon: TrendingUp },
    { label: 'Get paid 2x faster', icon: DollarSign },
  ];

  const testimonials = [
    {
      quote: 'Jobrythm helped us go from messy spreadsheets to professional quotes in days. Our clients love the clarity.',
      author: 'Mike Thompson',
      role: 'Electrician',
      company: 'Thompson Electrical Services',
    },
    {
      quote: 'Finally, I can see my margins in real-time. Game changer for pricing accurately and staying profitable.',
      author: 'Sarah Chen',
      role: 'General Contractor',
      company: 'Chen Construction Ltd',
    },
    {
      quote: 'The invoicing alone has cut our payment delays in half. Plus the time saved on quotes is massive.',
      author: 'James Wilson',
      role: 'Plumber',
      company: 'Wilson Plumbing Co',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for solo contractors',
      features: ['Unlimited quotes', 'Basic job costing', 'Invoice generation', 'Client management'],
    },
    {
      name: 'Pro',
      price: '$79',
      period: '/month',
      description: 'For growing trades businesses',
      features: ['Everything in Starter', 'Advanced margin insights', 'Team collaboration', 'Custom branding', 'Priority support'],
      featured: true,
    },
    {
      name: 'Team',
      price: '$149',
      period: '/month',
      description: 'For larger teams',
      features: ['Everything in Pro', 'Unlimited team members', 'API access', 'Advanced reporting', 'Dedicated support'],
    },
  ];

  const placeholderLogos = [
    'Trade Co',
    'Build Pro',
    'Sparky Electric',
    'Pipeline Plus',
    'Construct Ltd',
    'Renovate Co',
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-50 to-white py-20 lg:py-32">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 leading-tight mb-6">
                Win more work. <br />
                <span className="text-electric-500">Protect your margins.</span>
              </h1>
              <p className="text-xl text-navy-600 mb-8">
                Quoting, job costing, invoicing, and cashflow clarity in one workflow. Built for trades teams who want to grow profitably.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a href="https://app.jobrythm.com/signup">
                  <Button size="lg">Start free</Button>
                </a>
                <Link to="/book-demo">
                  <Button size="lg" variant="outline">Book a demo</Button>
                </Link>
              </div>
              <p className="text-sm text-navy-500">No credit card required</p>
            </motion.div>

            {/* Mock App Screenshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-500">Quote #1247</div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-8 bg-navy-100 rounded-lg animate-pulse"></div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-16 bg-electric-100 rounded-lg"></div>
                      <div className="h-16 bg-electric-100 rounded-lg"></div>
                      <div className="h-16 bg-electric-100 rounded-lg"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-100 rounded w-full"></div>
                      <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-100 rounded w-4/6"></div>
                    </div>
                    <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                      <span className="text-sm text-navy-600">Total</span>
                      <span className="text-2xl font-bold text-navy-900">$12,450</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-navy-900 py-12">
        <Container>
          <div className="text-center mb-8">
            <p className="text-electric-400 font-medium">Built for busy trades teams</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {placeholderLogos.map((logo, index) => (
              <div key={index} className="text-center">
                <div className="text-gray-400 font-semibold opacity-50">{logo}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 lg:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
              Stop losing money to guesswork
            </h2>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Traditional methods leave trades teams stressed and unprofitable. Jobrythm gives you clarity and control.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                problem: 'Quotes take too long',
                solution: 'Create detailed quotes in minutes with smart templates',
              },
              {
                problem: 'Margins are unclear',
                solution: 'See profit margins in real-time on every job',
              },
              {
                problem: 'Invoices are inconsistent',
                solution: 'Generate professional invoices instantly',
              },
            ].map((item, index) => (
              <Card key={index} className="p-8">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                    Problem
                  </span>
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-4">{item.problem}</h3>
                <div className="flex items-start space-x-2 text-electric-600">
                  <ArrowRight className="flex-shrink-0 mt-1" size={20} />
                  <p className="text-navy-700">{item.solution}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-20 lg:py-32 bg-navy-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
              Everything you need to run your trades business
            </h2>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              From quote to payment, Jobrythm keeps you organized and profitable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-8" hover>
                  <div className="w-12 h-12 bg-electric-100 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="text-electric-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">{feature.title}</h3>
                  <p className="text-navy-600">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
              How it works
            </h2>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Simple workflow. Powerful results.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-electric-100 mb-4">{step.number}</div>
                <h3 className="text-2xl font-bold text-navy-900 mb-4">{step.title}</h3>
                <p className="text-navy-600">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-electric-200 -ml-4">
                    <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 text-electric-400" size={24} />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ROI/Benefits Section */}
      <section className="py-20 lg:py-32 bg-electric-500 text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Measurable impact on your business
            </h2>
            <p className="text-xl text-electric-100 max-w-3xl mx-auto">
              Illustrative examples from trades teams using Jobrythm
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center"
                >
                  <Icon className="mx-auto mb-4" size={48} />
                  <p className="text-2xl font-bold">{benefit.label}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
              Loved by trades teams
            </h2>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Fictional testimonials for illustrative purposes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8">
                <p className="text-navy-700 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-navy-900">{testimonial.author}</p>
                  <p className="text-sm text-navy-600">{testimonial.role}</p>
                  <p className="text-sm text-navy-500">{testimonial.company}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 lg:py-32 bg-navy-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Choose the plan that fits your business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`p-8 ${plan.featured ? 'ring-2 ring-electric-500' : ''}`}
              >
                {plan.featured && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-electric-500 text-white rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-navy-900 mb-2">{plan.name}</h3>
                <p className="text-navy-600 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-navy-900">{plan.price}</span>
                  <span className="text-navy-600">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <Check className="text-electric-500 flex-shrink-0 mt-0.5" size={20} />
                      <span className="text-navy-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="https://app.jobrythm.com/signup">
                  <Button
                    fullWidth
                    variant={plan.featured ? 'primary' : 'outline'}
                  >
                    Get started
                  </Button>
                </a>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                View full pricing details
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Final CTA Band */}
      <section className="py-20 lg:py-32 bg-navy-900 text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to win more work and protect your margins?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join hundreds of trades teams who are growing profitably with Jobrythm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://app.jobrythm.com/signup">
                <Button size="lg">Start free today</Button>
              </a>
              <Link to="/book-demo">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-navy-900">
                  Book a demo
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
