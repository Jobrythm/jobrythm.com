import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDomain } from '../contexts/DomainContext';
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
  AlertCircle,
  Smartphone,
  HelpCircle,
  ChevronDown,
  Monitor,
} from 'lucide-react';
import { useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import Seo from '../components/Seo';

const HomePage = () => {
  const { signupUrl, demoUrl } = useDomain();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const features = [
    {
      icon: FileText,
      title: 'Quick Quotes',
      description: 'Build professional quotes with line items in minutes — not hours. Templates save you time on every repeat job.',
    },
    {
      icon: Calculator,
      title: 'Real-Time Job Costing',
      description: 'Track labour, materials, and equipment costs live. Know your margins before the job is done.',
    },
    {
      icon: Package,
      title: 'Line Item Categories',
      description: 'Organize every cost clearly — labour, materials, equipment, subcontractors. No more guessing where money went.',
    },
    {
      icon: Receipt,
      title: 'Instant Invoices',
      description: 'Convert a quote to an invoice in one click. Send it as a PDF or by email, and track payment status.',
    },
    {
      icon: BarChart3,
      title: 'Margin Dashboard',
      description: 'See your profit margin on every active job. Price more confidently and stop leaving money on the table.',
    },
    {
      icon: Users,
      title: 'Client & Job History',
      description: 'All your clients, quotes, and jobs in one place. Pull up any job history in seconds.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Create a Quote',
      description: 'Add line items for labour, materials, and more. Takes minutes, not half a morning.',
    },
    {
      number: '02',
      title: 'Win the Job',
      description: "Send the quote as a PDF. When it's approved, convert it to a job automatically.",
    },
    {
      number: '03',
      title: 'Invoice & Get Paid',
      description: "Generate a professional invoice in one click. Track what's paid and what's overdue.",
    },
  ];

  const benefits = [
    { label: 'Save hours/week on admin', icon: Clock },
    { label: 'Know your margins in real time', icon: TrendingUp },
    { label: 'Get paid faster', icon: DollarSign },
  ];

  const painPoints = [
    {
      problem: 'Quoting in spreadsheets or on paper',
      solution: 'Professional quotes with line items in minutes — built-in templates speed up repeat jobs.',
      icon: FileText,
    },
    {
      problem: 'Chasing unpaid invoices manually',
      solution: 'See every invoice status at a glance. Know who owes you, how much, and for how long.',
      icon: AlertCircle,
    },
    {
      problem: 'Paying $100+/month for software you half-use',
      solution: 'Jobrythm starts at $14/month. Pay for what you actually need, nothing more.',
      icon: DollarSign,
    },
    {
      problem: 'No idea if a job is actually profitable',
      solution: 'Track costs in real time and see your margin on every job before you finish it.',
      icon: BarChart3,
    },
    {
      problem: 'Jumping between apps to manage one job',
      solution: 'Clients, quotes, jobs, and invoices live in one place. One login. One workflow.',
      icon: Package,
    },
    {
      problem: 'Software too complex for a small team',
      solution: 'No training required. Most contractors are quoting their first job within 10 minutes.',
      icon: Users,
    },
  ];

  const testimonials = [
    {
      quote: 'I went from re-typing the same quote in Excel every time to having it done in 5 minutes. Massive time saver.',
      author: 'Mike T.',
      role: 'Electrician',
      company: 'Thompson Electrical',
    },
    {
      quote: 'Finally I can see whether a job was profitable or not. I was flying blind before — now I actually know my numbers.',
      author: 'Sarah C.',
      role: 'General Contractor',
      company: 'Chen Construction',
    },
    {
      quote: 'The invoicing alone cut my payment delays in half. Clients take it more seriously when it looks professional.',
      author: 'James W.',
      role: 'Plumber',
      company: 'Wilson Plumbing Co.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$14',
      period: '/month',
      description: 'Solo traders & freelancers',
      features: ['Up to 15 active jobs', 'Quotes & invoices', '1 user', 'Job costing & line items', 'Client management', 'Mobile-friendly'],
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/month',
      description: 'Small teams (up to 3 users)',
      features: ['Unlimited jobs', 'Quotes & invoices', 'Up to 3 users', 'Advanced margin insights', 'Priority support', 'Advanced reporting'],
      featured: true,
    },
    {
      name: 'Business',
      price: '$59',
      period: '/month',
      description: 'Growing businesses',
      features: ['Everything in Professional', 'Up to 10 users', 'Team collaboration', 'API access', 'Dedicated support'],
    },
  ];

  // TODO: Replace with real screenshots when available.
  // Place screenshot images in /public/screenshots/ (e.g. screenshot-jobs.png, screenshot-quote.png, screenshot-invoice.png)
  // Then swap out the placeholder divs below for <img> tags.
  const screenshots = [
    {
      title: 'Jobs Dashboard',
      description: 'See every active job, its status, and your outstanding invoices at a glance.',
      icon: Monitor,
      placeholder: 'screenshot-jobs.png',
    },
    {
      title: 'Quote Builder',
      description: 'Add line items by category. Totals calculate automatically. Send as a PDF in one click.',
      icon: FileText,
      placeholder: 'screenshot-quote.png',
    },
    {
      title: 'Invoice & Payment Tracking',
      description: "Know exactly what's paid, what's pending, and what's overdue — no chasing required.",
      icon: Receipt,
      placeholder: 'screenshot-invoice.png',
    },
  ];

  const faqs = [
    {
      question: 'Do I still need QuickBooks?',
      answer: 'Not necessarily. Jobrythm handles quoting, job management, and invoicing end-to-end. If you\'re using QuickBooks purely for invoicing and job tracking, Jobrythm likely covers everything you need at a lower cost. If you use QuickBooks for payroll or complex accounting, you can run both side-by-side.',
    },
    {
      question: 'Can I export my data?',
      answer: 'Yes. You can export your jobs, quotes, and invoices as PDFs at any time. Full data export (CSV) is available — your data is always yours.',
    },
    {
      question: 'Can my clients pay online?',
      answer: 'Stripe-powered payments are built in. Clients can pay directly from their invoice. You get paid faster and spend less time chasing.',
    },
    {
      question: 'How long does setup take?',
      answer: 'Most contractors are quoting their first job within 10 minutes of signing up. No training required, no implementation consultant needed.',
    },
    {
      question: 'Does it work on mobile?',
      answer: 'Yes. Jobrythm is mobile-friendly. Access your jobs, quotes, and invoices from your phone or tablet on site.',
    },
    {
      question: 'Who do I contact for support?',
      answer: 'Email support is included on all plans. Professional plan users get priority response. Because Jobrythm is built and maintained by a single developer, you\'re often talking directly to the person who built it.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes. All plans come with a 14-day free trial. No credit card required to start.',
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
    <div className="bg-navy-900">
      <Seo
        title="Jobrythm — Job management for contractors. Cheaper. Faster. Simple."
        description="Quotes to invoices in minutes. Jobrythm is the affordable job management app for contractors and tradespeople — starting at $14/month. No bloat, no nonsense."
        path="/"
        rawTitle
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-800 to-navy-900 py-20 lg:py-32">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-electric-500/10 border border-electric-500/30 text-electric-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                Built by a single developer · Open source · From $14/month
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Quotes to invoices.<br />
                <span className="text-electric-500">No bloat. No nonsense.</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Jobrythm is the simple, affordable job management app built for contractors and tradespeople. Create quotes, track jobs, send invoices, and get paid — without the $100/month price tag.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a href={signupUrl}>
                  <Button size="lg">Try the app</Button>
                </a>
                <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline">Book a demo</Button>
                </a>
              </div>
              <p className="text-sm text-gray-400">14-day free trial · No credit card required</p>
            </motion.div>

            {/* Mock App Screenshot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-navy-900 rounded-2xl shadow-2xl p-6 border border-navy-700">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-navy-700">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-xs text-gray-500">Quote #1247 — Bathroom Reno</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Labour (8 hrs)</span>
                      <span className="text-white">$960</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Materials</span>
                      <span className="text-white">$2,300</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Equipment hire</span>
                      <span className="text-white">$450</span>
                    </div>
                    <div className="pt-3 border-t border-navy-700 flex justify-between items-center">
                      <span className="text-gray-300 font-medium">Total</span>
                      <span className="text-2xl font-bold text-white">$3,710</span>
                    </div>
                    <div className="flex justify-between items-center bg-electric-500/10 rounded-lg px-3 py-2">
                      <span className="text-electric-400 text-sm">Estimated margin</span>
                      <span className="text-electric-400 font-bold">34%</span>
                    </div>
                    <div className="pt-2">
                      <div className="w-full bg-electric-500 text-white text-sm font-medium py-2 rounded-lg text-center">
                        Send Quote →
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Social Proof Bar */}
      <section className="bg-navy-900 py-12 border-b border-navy-800">
        <Container>
          <div className="text-center mb-8">
            <p className="text-electric-400 font-medium">Trusted by contractors and tradespeople</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {placeholderLogos.map((logo, index) => (
              <div key={index} className="text-center">
                <div className="text-gray-400 font-semibold opacity-50">{logo}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-600 mt-4">Placeholder logos — replace with real customers</p>
        </Container>
      </section>

      {/* Problem → Solution Section */}
      <section className="py-20 lg:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Sound familiar?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              These are the problems Jobrythm was built to solve.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {painPoints.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-6 h-full">
                    <div className="flex items-start space-x-3 mb-4">
                      <span className="inline-block px-2 py-0.5 bg-red-900/50 text-red-400 rounded text-xs font-medium flex-shrink-0 mt-0.5">
                        Problem
                      </span>
                      <p className="text-white font-semibold">{item.problem}</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-electric-500/20 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon className="text-electric-400" size={14} />
                      </div>
                      <p className="text-gray-300 text-sm">{item.solution}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-20 lg:py-32 bg-navy-800">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Everything you need. Nothing you don't.
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Jobrythm covers the full job lifecycle — from the first quote to the final payment — without the complexity of enterprise software.
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
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              How it works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Three steps. That's it.
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
                <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
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

      {/* Screenshots Section */}
      {/* TODO: Add real screenshots to /public/screenshots/ and replace the placeholder cards below.
          Files expected: screenshot-jobs.png, screenshot-quote.png, screenshot-invoice.png
          Suggested dimensions: 1280×800px (16:10 ratio works well at this card size). */}
      <section className="py-20 lg:py-32 bg-navy-800">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              See it in action
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Clean, fast, and built for the way contractors actually work.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {screenshots.map((screen, index) => {
              const Icon = screen.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    {/* Placeholder area — replace with <img src={`/screenshots/${screen.placeholder}`} ... /> */}
                    <div className="bg-navy-900 h-48 flex flex-col items-center justify-center border-b border-navy-700">
                      <Icon className="text-navy-600 mb-3" size={40} />
                      <p className="text-navy-600 text-xs font-mono">{screen.placeholder}</p>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2">{screen.title}</h3>
                      <p className="text-gray-300 text-sm">{screen.description}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <a href={signupUrl}>
              <Button size="lg">Try it free — no credit card needed</Button>
            </a>
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
              Built by one developer. For real contractors.
            </h2>
            <p className="text-xl text-electric-100 max-w-3xl mx-auto">
              Jobrythm is open-source software built and maintained by a single developer. No bloated team, no VC pressure — just practical software that solves real problems, fast.
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
                  className="bg-navy-900/10 backdrop-blur-sm rounded-2xl p-8 text-center"
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              What contractors say
            </h2>
            {/* TODO: Replace with real customer testimonials */}
            <p className="text-sm text-gray-500 italic">Illustrative testimonials — replace with real customer quotes</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8">
                <p className="text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-white">{testimonial.author}</p>
                  <p className="text-sm text-gray-300">{testimonial.role}</p>
                  <p className="text-sm text-gray-400">{testimonial.company}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 lg:py-32 bg-navy-800">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              No hidden fees. No annual lock-in. Cancel anytime.
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
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-300 mb-6">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-300">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <Check className="text-electric-500 flex-shrink-0 mt-0.5" size={20} />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href={signupUrl}>
                  <Button
                    fullWidth
                    variant={plan.featured ? 'primary' : 'outline'}
                  >
                    Try free for 14 days
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

      {/* FAQ Section */}
      <section className="py-20 lg:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Common questions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Straight answers to the things contractors ask most.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="bg-navy-800 border border-navy-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left text-white font-semibold hover:bg-navy-700/50 transition-colors"
                    aria-expanded={openFaq === index}
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle size={18} className="text-electric-400 flex-shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-gray-400 flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4 text-gray-300 leading-relaxed border-t border-navy-700 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-gray-400 mb-4">Still have questions?</p>
            <Link to="/contact">
              <Button variant="outline">Contact us</Button>
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
              Ready to simplify your workflow?
            </h2>
            <p className="text-xl text-gray-300 mb-2">
              Start free. No credit card required. Be quoting your first job in under 10 minutes.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Starts at $14/month. Built and supported by a single developer who actually responds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={signupUrl}>
                <Button size="lg">Try the app free</Button>
              </a>
              <a href={demoUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-navy-900 hover:text-white">
                  Book a demo
                </Button>
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
              <Smartphone size={16} />
              <span>Mobile-friendly · Works on any device</span>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
