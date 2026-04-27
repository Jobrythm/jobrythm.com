import { motion } from 'framer-motion';
import { Shield, Lock, Server, Eye, CheckCircle2, Code2 } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import { useDomain } from '../contexts/DomainContext';

const SecurityPage = () => {
  const { signupUrl } = useDomain();
  const securityFeatures = [
    {
      icon: Lock,
      title: 'bcrypt Password Hashing',
      description: 'All passwords are hashed using bcrypt before storage. Plain-text passwords are never stored or logged.',
    },
    {
      icon: Shield,
      title: 'JWT Authentication',
      description: 'Session management uses signed JSON Web Tokens with short-lived access tokens and refresh token rotation.',
    },
    {
      icon: Server,
      title: 'HTTP Security Headers',
      description: 'Helmet.js enforces a strict Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, and more on every response.',
    },
    {
      icon: Eye,
      title: 'Rate Limiting',
      description: 'Authentication endpoints are rate-limited to 10 requests per minute per IP. All other API endpoints allow up to 100 requests per minute.',
    },
    {
      icon: Code2,
      title: 'Input Validation',
      description: 'Every API request is validated with Zod schema checks before reaching the database, preventing malformed or malicious input.',
    },
    {
      icon: CheckCircle2,
      title: 'SQL Injection Protection',
      description: 'TypeORM with parameterized queries is used throughout. Raw SQL is never constructed from user input.',
    },
  ];

  const dataProtection = [
    {
      title: 'What we collect',
      items: [
        'Business information (company name, address, etc.)',
        'User account data (name, email, hashed password)',
        'Usage data (features used, actions taken)',
        'Payment information (processed by Stripe — we never store card data)',
      ],
    },
    {
      title: 'How we protect it',
      items: [
        'bcrypt-hashed passwords (never stored in plain text)',
        'JWT-based auth with refresh token rotation',
        'Zod input validation on all API routes',
        'Helmet.js HTTP security headers (CSP, HSTS, etc.)',
        'CORS policy restricts origins to allowed domains',
        'Rate limiting on all API and auth endpoints',
      ],
    },
    {
      title: 'Your rights',
      items: [
        'Export your data at any time from account settings',
        'Delete your account and associated data',
        'Control who has access to your business data',
        'Contact us about data concerns at any time',
      ],
    },
  ];

  const techStack = [
    { label: 'Backend', value: 'TypeScript + Node.js + Express' },
    { label: 'Database', value: 'PostgreSQL via TypeORM' },
    { label: 'Auth', value: 'JWT + bcrypt' },
    { label: 'Payments', value: 'Stripe (PCI DSS compliant)' },
    { label: 'Infrastructure', value: 'Docker + Nginx' },
    { label: 'Source Code', value: 'Open source on GitHub' },
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
              <Shield className="text-electric-600" size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Your data is secure with us
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Jobrythm is built with security practices at every layer — and because the code is open source, you can verify that yourself.
            </p>
            <a
              href="https://github.com/Jobrythm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-electric-400 hover:text-electric-300 transition-colors font-medium"
            >
              <Code2 size={18} />
              View source on GitHub
            </a>
          </motion.div>
        </Container>
      </section>

      {/* Security Features */}
      <section className="py-20 lg:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Security built into the platform
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real protections, not just checkboxes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => {
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

      {/* Data Protection */}
      <section className="py-20 lg:py-32 bg-navy-800">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Data protection
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transparency about how we handle your data
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {dataProtection.map((section, index) => (
              <Card key={index} className="p-8">
                <h3 className="text-xl font-bold text-white mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <CheckCircle2 className="text-electric-500 flex-shrink-0 mt-0.5" size={20} />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Tech Stack */}
      <section className="py-20 lg:py-32">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Open source infrastructure
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Jobrythm is fully open source. Both the marketing site and the application backend are publicly available on GitHub under the Jobrythm organization. You can inspect every line of security-relevant code.
                </p>
                <p>
                  The application is containerized with Docker and served behind an Nginx reverse proxy. The backend is a TypeScript/Express API backed by PostgreSQL.
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="text-electric-500 flex-shrink-0 mt-0.5" size={20} />
                    <span>CORS policy restricts cross-origin requests to allowed domains</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="text-electric-500 flex-shrink-0 mt-0.5" size={20} />
                    <span>Helmet.js sets security headers on every HTTP response</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="text-electric-500 flex-shrink-0 mt-0.5" size={20} />
                    <span>Stripe handles all payment data — no card numbers touch our servers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="text-electric-500 flex-shrink-0 mt-0.5" size={20} />
                    <span>PostgreSQL with TypeORM parameterized queries prevents SQL injection</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="text-electric-500 flex-shrink-0 mt-0.5" size={20} />
                    <span>Docker container isolation for each service</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Tech Stack</h3>
                <div className="space-y-4">
                  {techStack.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-navy-700 last:border-0">
                      <span className="text-gray-400 text-sm font-medium">{item.label}</span>
                      <span className="text-white text-sm font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4">
                  <a
                    href="https://github.com/Jobrythm/jobrythm-fullstack"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-electric-400 hover:text-electric-300 transition-colors text-sm font-medium"
                  >
                    <Code2 size={16} />
                    Inspect the app source code
                  </a>
                </div>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Security Practices */}
      <section className="py-20 lg:py-32 bg-navy-800">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Security practices
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              What we do to keep the platform and your data safe
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8">
              <h3 className="text-xl font-bold text-white mb-4">Platform security</h3>
              <ul className="space-y-3">
                {[
                  'Regular dependency updates and security patches',
                  'Code is publicly reviewable on GitHub',
                  'Input validation on every API endpoint (Zod)',
                  'Parameterized database queries (no raw SQL)',
                  'Rate limiting on authentication endpoints',
                  'HTTP security headers via Helmet.js',
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle2 className="text-electric-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold text-white mb-4">Account security</h3>
              <ul className="space-y-3">
                {[
                  'bcrypt password hashing (never stored in plain text)',
                  'JWT access tokens with expiration',
                  'Refresh token rotation',
                  'Session invalidation on logout',
                  'Secure password reset procedures',
                  'CORS restrictions on API access',
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle2 className="text-electric-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* Contact for Security */}
      <section className="py-20 lg:py-32">
        <Container>
          <Card className="bg-gradient-to-br from-electric-500 to-electric-600 p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Found a security issue?
            </h2>
            <p className="text-xl text-electric-100 mb-8 max-w-2xl mx-auto">
              If you discover a vulnerability, please disclose it responsibly. Email us and we'll respond promptly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:contact@jobrythm.com">
                <Button size="lg" variant="secondary">
                  contact@jobrythm.com
                </Button>
              </a>
              <a href={signupUrl}>
                <Button
                  size="lg"
                  className="bg-navy-900 text-electric-600 hover:bg-gray-100"
                >
                  Start free trial
                </Button>
              </a>
            </div>
          </Card>
        </Container>
      </section>
    </div>
  );
};

export default SecurityPage;
