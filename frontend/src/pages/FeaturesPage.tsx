import { motion } from 'framer-motion';
import { useDomain } from '../contexts/DomainContext';
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
  RefreshCw,
  Wallet,
  Globe,
  UserCheck,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import Seo from '../components/Seo';

const FeaturesPage = () => {
  const { signupUrl } = useDomain();
  const features = [
    {
      icon: FileText,
      title: 'Smart Quotes',
      description: 'Create professional quotes faster than ever',
      benefits: [
        'Recurring job templates for repeat work',
        'Line items by category — labour, materials, equipment, subcontractors',
        'Client-facing PDF generation',
        'Customizable payment terms and notes',
        'Convert accepted quotes to jobs in one click',
      ],
    },
    {
      icon: Calculator,
      title: 'Job Cost Tracking',
      description: 'Know your profitability in real-time',
      benefits: [
        'Track actual costs vs estimated on every job',
        'Real-time profit margin calculations',
        'Cost category breakdowns (Labour, Materials, Equipment, Subcontractors)',
        'Job status workflow: Draft → Quoted → Active → Completed → Invoiced',
        'Historical cost analysis across all jobs',
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
        'Subcontractor cost management',
        'Automatic totals and margin calculations',
      ],
    },
    {
      icon: Receipt,
      title: 'Professional Invoices',
      description: 'Get paid faster with polished invoices',
      benefits: [
        'Branded invoice templates with your logo',
        'Automatic tax and total calculations',
        'Stripe-powered online payments built in',
        'Payment status tracking (Draft → Sent → Paid → Overdue)',
        'PDF generation and email delivery',
      ],
    },
    {
      icon: BarChart3,
      title: 'Margin Insights',
      description: 'Data-driven pricing decisions',
      benefits: [
        'Live profit margin display on every active job',
        'Job profitability comparisons across your history',
        'Revenue and outstanding invoice tracking',
        'Cost vs revenue breakdowns',
        'Dashboard overview of your business health',
      ],
    },
    {
      icon: Users,
      title: 'Client Management',
      description: 'All client information in one place',
      benefits: [
        'Complete client profiles with contact details',
        'Full quote, job, and invoice history per client',
        'Per-job messaging with clients',
        'File and photo attachments per job',
        'Client portal for quotes and invoice review',
      ],
    },
    {
      icon: Wallet,
      title: 'Expense Tracking',
      description: 'Keep every cost accounted for',
      benefits: [
        'Log job-related expenses as they happen',
        'Categorize expenses by type',
        'Attach receipts and photos',
        'Link expenses directly to jobs',
        'Accurate cost reports at job close',
      ],
    },
    {
      icon: Clock,
      title: 'Time Tracking',
      description: 'Capture every billable hour',
      benefits: [
        'Log time entries directly against jobs',
        'Track billable and non-billable hours',
        'Team member time visibility',
        'Time data feeds into job cost calculations',
        'Historical time analysis per job',
      ],
    },
    {
      icon: Calendar,
      title: 'Appointments & Scheduling',
      description: 'Stay organized and on time',
      benefits: [
        'Schedule appointments linked to jobs and clients',
        'Track appointment status (Scheduled, In Progress, Completed, Cancelled)',
        'Team scheduling visibility',
        'On-site visit and inspection tracking',
        'Timeline view of upcoming work',
      ],
    },
    {
      icon: RefreshCw,
      title: 'Recurring Jobs',
      description: 'Automate repeat work effortlessly',
      benefits: [
        'Create templates for regularly scheduled jobs',
        'Set weekly, monthly, or custom recurrence',
        'Auto-generate new jobs from templates',
        'Keep recurring clients on consistent schedules',
        'Reduce admin time on repeat work',
      ],
    },
    {
      icon: UserCheck,
      title: 'Team Management',
      description: 'Run your team from one place',
      benefits: [
        'Invite team members with role-based access',
        'Roles: Owner, Manager, Technician',
        'Assign jobs and track team activity',
        'Company member management',
        'Multi-user access for growing businesses',
      ],
    },
    {
      icon: Globe,
      title: 'Client Portal',
      description: 'Give clients a professional experience',
      benefits: [
        'Clients view their quotes and invoices online',
        'Accept or decline quotes from the portal',
        'Pay invoices online via Stripe',
        'No account required for clients',
        'Branded with your business details',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Reports',
      description: 'Understand your business performance',
      benefits: [
        'Revenue and income reports',
        'Job profitability analysis',
        'Outstanding payments overview',
        'Expense summaries',
        'Custom date range filtering',
      ],
    },
    {
      icon: CheckCircle2,
      title: 'Checklists & Quality Control',
      description: 'Maintain high standards on every job',
      benefits: [
        'Create job-specific checklists',
        'Check off tasks as work progresses',
        'Ensure nothing gets missed on-site',
        'Quality assurance built into the workflow',
        'Attach checklists to any job',
      ],
    },
    {
      icon: MessageSquare,
      title: 'Job Messaging',
      description: 'Keep communication tied to the job',
      benefits: [
        'Send and receive messages per job',
        'Internal team notes',
        'Client communication history',
        'All messages stored with the job',
        'No more scattered emails and texts',
      ],
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Your data is protected',
      benefits: [
        'JWT-based authentication with refresh tokens',
        'Passwords hashed with bcrypt',
        'Rate limiting on all API endpoints',
        'CORS-protected API',
        'Open source — inspect the code yourself',
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
      'Expense tracking',
      'Team collaboration',
      'Mobile access',
      'Recurring jobs',
      'Support',
    ],
    spreadsheets: [
      'Manual entry',
      'Error-prone formulas',
      'Manual creation',
      'Manual calculations',
      'Scattered information',
      'Separate spreadsheet',
      'Email attachments',
      'Limited',
      'Manual copy-paste',
      'None',
    ],
    jobrythm: [
      'Line-item templates',
      'Real-time tracking',
      'One-click generation',
      'Automatic calculations',
      'Centralized profiles',
      'Built-in expense log',
      'Roles & permissions',
      'Mobile-friendly web app',
      'Auto-generated from templates',
      'Email support on all plans',
    ],
  };

  return (
    <div className="bg-navy-900">
      <Seo
        title="Features"
        description="Everything you need to manage a trades business: smart quotes, real-time job costing, line-item tracking, professional invoices, expense tracking, recurring jobs, client portal, team management, and more."
        path="/features"
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
              Everything you need to manage your trades business
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              From quote to payment, Jobrythm streamlines your entire workflow so you can focus on what you do best.
            </p>
            <a href={signupUrl}>
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
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {feature.title}
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">{feature.description}</p>
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-start space-x-3">
                          <CheckCircle2 className="text-electric-500 flex-shrink-0 mt-0.5" size={20} />
                          <span className="text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <Card className="p-8 bg-navy-800">
                      <div className="aspect-video bg-navy-900 rounded-xl flex items-center justify-center">
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
      <section className="py-20 lg:py-32 bg-navy-800">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Spreadsheets vs Jobrythm
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See why modern trades teams are moving beyond spreadsheets
            </p>
          </motion.div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-700">
                    <th className="text-left p-6 text-white font-semibold">Feature</th>
                    <th className="text-center p-6 text-white font-semibold">Spreadsheets</th>
                    <th className="text-center p-6 text-electric-600 font-semibold">Jobrythm</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.categories.map((category, index) => (
                    <tr key={index} className="border-b border-gray-100 last:border-b-0">
                      <td className="p-6 text-white font-medium">{category}</td>
                      <td className="p-6 text-center text-gray-300">{comparison.spreadsheets[index]}</td>
                      <td className="p-6 text-center text-white font-medium bg-electric-50">
                        {comparison.jobrythm[index]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="text-center mt-12">
            <a href={signupUrl}>
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
              <a href={signupUrl}>
                <Button size="lg" variant="secondary">
                  Start free trial
                </Button>
              </a>
              <a href="/book-demo">
                <Button
                  size="lg"
                  className="bg-navy-900 text-electric-600 hover:bg-gray-100"
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
