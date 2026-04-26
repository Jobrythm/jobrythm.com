import { motion } from 'framer-motion';
import { Shield, Lock, Server, Eye, CheckCircle2, FileCheck } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import { useDomain } from '../contexts/DomainContext';

const SecurityPage = () => {
  const { signupUrl } = useDomain();
  const securityFeatures = [
    {
      icon: Lock,
      title: 'Bank-Level Encryption',
      description: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256) using industry-leading standards.',
    },
    {
      icon: Server,
      title: 'Secure Infrastructure',
      description: 'Hosted on enterprise-grade cloud infrastructure with 99.9% uptime SLA and automated failover.',
    },
    {
      icon: Eye,
      title: 'Privacy First',
      description: 'Your data is yours. We never sell or share your information with third parties.',
    },
    {
      icon: Shield,
      title: 'Regular Security Audits',
      description: 'Third-party penetration testing and security audits conducted quarterly.',
    },
    {
      icon: FileCheck,
      title: 'Compliance',
      description: 'GDPR compliant and working toward SOC 2 Type II certification.',
    },
    {
      icon: CheckCircle2,
      title: 'Daily Backups',
      description: 'Automated daily backups with point-in-time recovery and 30-day retention.',
    },
  ];

  const dataProtection = [
    {
      title: 'What we collect',
      items: [
        'Business information (company name, address, etc.)',
        'User account data (name, email, password)',
        'Usage data (features used, actions taken)',
        'Payment information (processed by Stripe, not stored by us)',
      ],
    },
    {
      title: 'How we protect it',
      items: [
        'Encrypted database storage',
        'Secure API communication',
        'Role-based access controls',
        'Multi-factor authentication available',
        'Regular security updates',
      ],
    },
    {
      title: 'Your rights',
      items: [
        'Export your data at any time',
        'Delete your account and data',
        'Control who has access to your data',
        'Receive notifications of any security incidents',
      ],
    },
  ];

  const certifications = [
    'GDPR Compliant',
    'SOC 2 Type II (in progress)',
    'PCI DSS Compliant (via Stripe)',
    'ISO 27001 Alignment',
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
            <p className="text-xl text-gray-300">
              We take security seriously. Your business data is protected with enterprise-grade security measures.
            </p>
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
              Enterprise-grade security
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built with security at every layer
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

      {/* Infrastructure */}
      <section className="py-20 lg:py-32">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Built on reliable infrastructure
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Jobrythm is hosted on enterprise-grade cloud infrastructure with multiple availability zones for redundancy and high availability.
                </p>
                <p>
                  Our infrastructure includes:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="text-electric-500 flex-shrink-0 mt-0.5" size={20} />
                    <span>99.9% uptime SLA with automated monitoring</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="text-electric-500 flex-shrink-0 mt-0.5" size={20} />
                    <span>Automatic failover and disaster recovery</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="text-electric-500 flex-shrink-0 mt-0.5" size={20} />
                    <span>DDoS protection and web application firewall</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="text-electric-500 flex-shrink-0 mt-0.5" size={20} />
                    <span>Real-time system health monitoring</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="text-electric-500 flex-shrink-0 mt-0.5" size={20} />
                    <span>24/7 security monitoring and incident response</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-navy-900 text-white">
                <h3 className="text-2xl font-bold mb-4">Certifications & Compliance</h3>
                <div className="grid grid-cols-2 gap-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="bg-navy-900/10 rounded-lg p-4 text-center">
                      <CheckCircle2 className="text-electric-400 mx-auto mb-2" size={24} />
                      <p className="text-sm font-medium">{cert}</p>
                    </div>
                  ))}
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
              Security best practices
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We follow industry standards to keep your data safe
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8">
              <h3 className="text-xl font-bold text-white mb-4">For our platform</h3>
              <ul className="space-y-3">
                {[
                  'Regular security updates and patches',
                  'Code reviews and security testing',
                  'Penetration testing by third parties',
                  'Employee security training',
                  'Incident response procedures',
                  'Background checks for all staff',
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle2 className="text-electric-500 flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-bold text-white mb-4">For you</h3>
              <ul className="space-y-3">
                {[
                  'Strong password requirements',
                  'Multi-factor authentication (MFA)',
                  'Session timeout controls',
                  'Activity logs and audit trails',
                  'Granular permission controls',
                  'Secure password reset procedures',
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
              Have security questions?
            </h2>
            <p className="text-xl text-electric-100 mb-8 max-w-2xl mx-auto">
              We're happy to answer any questions about our security practices and compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact">
                <Button size="lg" variant="secondary">
                  Contact security team
                </Button>
              </a>
              <a href={signupUrl}>
                <Button
                  size="lg"
                  className="bg-navy-900 text-electric-600 hover:bg-gray-100"
                >
                  Start secure trial
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
