import { motion } from 'framer-motion';
import {
  FileText,
  Calculator,
  Receipt,
  BarChart3,
  Users,
  Package,
  Clock,
  CheckCircle2,
  TrendingUp,
  Calendar,
  MessageSquare,
  Shield,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';

const FeaturesPage = () => {
  const features = [
    {
      icon: FileText,
      title: 'Smart Quotes',
      description: 'Create professional quotes faster than ever',
      benefits: [
        'Pre-built templates for common job types',
        'Intelligent pricing suggestions based on your history',
        'Drag-and-drop line items',
        'Client-facing PDF generation',
        'Customizable terms and conditions',
      ],
    },
    {
      icon: Calculator,
      title: 'Job Cost Tracking',
      description: 'Know your profitability in real-time',
      benefits: [
        'Track actual costs vs estimated',
        'Real-time margin calculations',
        'Cost category breakdowns',
        'Budget alerts and notifications',
        'Historical cost analysis',
      ],
    },
    {
      icon: Package,
      title: 'Detailed Line Items',
      description: 'Organize every cost with precision',
      benefits: [
        'Labour hours and rates',
        'Material quantities and pricing',
        'Equipment rental tracking',
        'Subcontractor management',
        'Custom cost categories',
      ],
    },
    {
      icon: Receipt,
      title: 'Professional Invoices',
      description: 'Get paid faster with polished invoices',
      benefits: [
        'Branded invoice templates',
        'Automatic calculation and tax',
        'Payment tracking and reminders',
        'Partial payment support',
        'Multiple payment methods',
      ],
    },
    {
      icon: BarChart3,
      title: 'Margin Insights',
      description: 'Data-driven pricing decisions',
      benefits: [
        'Live profit margin displays',
        'Job profitability comparisons',
        'Revenue forecasting',
        'Cost trend analysis',
        'Custom reporting',
      ],
    },
    {
      icon: Users,
      title: 'Client Management',
      description: 'All client information in one place',
      benefits: [
        'Complete client profiles',
        'Project history tracking',
        'Communication logs',
        'Document storage',
        'Client preferences and notes',
      ],
    },
    {
      icon: Clock,
      title: 'Time Tracking',
      description: 'Capture every billable hour',
      benefits: [
        'Mobile time tracking',
        'Job-based timesheets',
        'Overtime calculations',
        'Team time management',
        'Billable vs non-billable hours',
      ],
    },
    {
      icon: Calendar,
      title: 'Schedule Management',
      description: 'Stay organized and on time',
      benefits: [
        'Visual job calendar',
        'Team scheduling',
        'Deadline reminders',
        'Resource allocation',
        'Timeline tracking',
      ],
    },
    {
      icon: MessageSquare,
      title: 'Communication Tools',
      description: 'Keep everyone in the loop',
      benefits: [
        'Client messaging',
        'Team collaboration',
        'Automated notifications',
        'Status updates',
        'File sharing',
      ],
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your data is protected',
      benefits: [
        'Bank-level encryption',
        'Daily backups',
        '99.9% uptime SLA',
        'GDPR compliant',
        'SOC 2 Type II certified',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Growth Analytics',
      description: 'Understand your business performance',
      benefits: [
        'Revenue tracking',
        'Win rate analysis',
        'Customer lifetime value',
        'Top performing services',
        'Growth trends',
      ],
    },
    {
      icon: CheckCircle2,
      title: 'Quality Control',
      description: 'Maintain high standards',
      benefits: [
        'Project checklists',
        'Quality assurance workflows',
        'Photo documentation',
        'Inspection reports',
        'Sign-off tracking',
      ],
    },
  ];

  const comparison = {
    categories: [
      'Create quotes',
      'Track job costs',
      'Generate invoices',
      'Margin insights',
      'Client management',
      'Team collaboration',
      'Mobile access',
      'Automated workflows',
      'Professional branding',
      'Support',
    ],
    spreadsheets: [
      'Manual entry',
      'Error-prone formulas',
      'Manual creation',
      'Manual calculations',
      'Scattered information',
      'Email attachments',
      'Limited',
      'None',
      'DIY formatting',
      'None',
    ],
    jobrythm: [
      'Smart templates',
      'Real-time tracking',
      'One-click generation',
      'Automatic calculations',
      'Centralized profiles',
      'Built-in tools',
      'Full mobile app',
      'Fully automated',
      'Professional templates',
      '24/7 support',
    ],
  };

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
              Everything you need to manage your trades business
            </h1>
            <p className="text-xl text-navy-600 mb-8">
              From quote to payment, Jobrythm streamlines your entire workflow so you can focus on what you do best.
            </p>
            <a href="https://app.jobrythm.com/signup">
              <Button size="lg">Start free trial</Button>
            </a>
          </motion.div>
        </Container>
      </section>

      {/* Feature Sections */}
      <section className="py-20 lg:py-32">
        <Container>
          <div className="space-y-32">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-dense' : ''}`}
                >
                  <div className={!isEven ? 'lg:col-start-2' : ''}>
                    <div className="w-16 h-16 bg-electric-100 rounded-2xl flex items-center justify-center mb-6">
                      <Icon className="text-electric-600" size={32} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
                      {feature.title}
                    </h2>
                    <p className="text-xl text-navy-600 mb-8">{feature.description}</p>
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start space-x-3">
                          <CheckCircle2 className="text-electric-500 flex-shrink-0 mt-0.5" size={20} />
                          <span className="text-navy-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <Card className="p-8 bg-navy-50">
                      <div className="aspect-video bg-white rounded-xl flex items-center justify-center">
                        <Icon className="text-navy-300" size={64} />
                      </div>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Comparison Table */}
      <section className="py-20 lg:py-32 bg-navy-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy-900 mb-6">
              Spreadsheets vs Jobrythm
            </h2>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              See why modern trades teams are moving beyond spreadsheets
            </p>
          </motion.div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left p-6 text-navy-900 font-semibold">Feature</th>
                    <th className="text-center p-6 text-navy-900 font-semibold">Spreadsheets</th>
                    <th className="text-center p-6 text-electric-600 font-semibold">Jobrythm</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.categories.map((category, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-b-0">
                      <td className="p-6 text-navy-900 font-medium">{category}</td>
                      <td className="p-6 text-center text-navy-600">{comparison.spreadsheets[index]}</td>
                      <td className="p-6 text-center text-navy-900 font-medium bg-electric-50">
                        {comparison.jobrythm[index]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="text-center mt-12">
            <a href="https://app.jobrythm.com/signup">
              <Button size="lg">Make the switch today</Button>
            </a>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <Container>
          <Card className="bg-gradient-to-br from-electric-500 to-electric-600 p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to streamline your workflow?
            </h2>
            <p className="text-xl text-electric-100 mb-8 max-w-2xl mx-auto">
              Join trades teams who are saving time and increasing profits with Jobrythm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://app.jobrythm.com/signup">
                <Button size="lg" variant="secondary">
                  Start free trial
                </Button>
              </a>
              <a href="/book-demo">
                <Button
                  size="lg"
                  className="bg-white text-electric-600 hover:bg-gray-100"
                >
                  Book a demo
                </Button>
              </a>
            </div>
          </Card>
        </Container>
      </section>
    </div>
  );
};

export default FeaturesPage;
