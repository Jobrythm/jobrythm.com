import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, HelpCircle, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import Seo from '../components/Seo';
import { useDomain } from '../contexts/DomainContext';

const PricingPage = () => {
  const { signupUrl } = useDomain();
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      monthlyPrice: 14,
      annualPrice: 9,
      description: 'Solo traders & freelancers',
      features: [
        'Up to 15 jobs',
        'Quotes & invoices (with PDF)',
        '1 user',
        'Job costing & line items',
        'Client management',
        'Expense tracking',
        'Mobile-friendly web app',
        'Email support',
      ],
      notIncluded: [
        'Client portal',
        'Recurring jobs',
        'Team collaboration',
      ],
    },
    {
      name: 'Professional',
      monthlyPrice: 29,
      annualPrice: 24,
      description: 'Small teams',
      features: [
        'Unlimited jobs',
        'Quotes & invoices (with PDF)',
        'Up to 3 users',
        'Client portal',
        'Recurring job templates',
        'Advanced margin insights & reports',
        'Time tracking & appointments',
        'Priority support',
      ],
      notIncluded: [
        'Team collaboration',
      ],
      featured: true,
    },
    {
      name: 'Business',
      monthlyPrice: 59,
      annualPrice: 49,
      description: 'Growing businesses',
      features: [
        'Everything in Professional',
        'Up to 10 users',
        'Team management with roles',
        'Role-based permissions',
        'Advanced integrations',
        'Dedicated support',
        'Custom onboarding',
      ],
      notIncluded: [],
    },
  ];

  const faqs = [
    {
      question: 'How does the free trial work?',
      answer: 'All plans come with a 14-day free trial. No credit card required. You can explore all features during the trial period and decide which plan is right for you.',
    },
    {
      question: 'Can I switch plans later?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. When you upgrade, you\'ll be charged the prorated difference. When you downgrade, your account will be credited.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and offer invoice billing for annual Team plans.',
    },
    {
      question: 'Do you offer discounts for annual billing?',
      answer: 'Yes! Save up to 36% by choosing annual billing. The discount is automatically applied when you toggle to annual pricing.',
    },
    {
      question: 'What happens when I exceed my team member limit?',
      answer: 'Starter and Pro plans have team member limits. If you need to add more team members, you\'ll be prompted to upgrade to the next tier or Team plan for unlimited members.',
    },
    {
      question: 'Is training included?',
      answer: 'All plans include access to our comprehensive help center and video tutorials. Pro and Team plans include live onboarding sessions and priority support.',
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely. There are no long-term contracts or cancellation fees. You can cancel your subscription at any time from your account settings.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 30-day money-back guarantee for annual plans. Monthly plans can be cancelled at any time with no further charges.',
    },
  ];

  const featureComparison = [
    {
      category: 'Core Features',
      features: [
        { name: 'Jobs', starter: 'Up to 15', pro: 'Unlimited', team: 'Unlimited' },
        { name: 'Quotes & invoices (with PDF)', starter: true, pro: true, team: true },
        { name: 'Job costing & line items', starter: true, pro: true, team: true },
        { name: 'Client management', starter: true, pro: true, team: true },
        { name: 'Expense tracking', starter: true, pro: true, team: true },
        { name: 'Mobile-friendly web app', starter: true, pro: true, team: true },
      ],
    },
    {
      category: 'Advanced Features',
      features: [
        { name: 'Client portal', starter: false, pro: true, team: true },
        { name: 'Recurring job templates', starter: false, pro: true, team: true },
        { name: 'Margin insights & reports', starter: false, pro: true, team: true },
        { name: 'Time tracking & appointments', starter: false, pro: true, team: true },
        { name: 'Checklists & quality control', starter: false, pro: true, team: true },
      ],
    },
    {
      category: 'Team & Collaboration',
      features: [
        { name: 'Users', starter: '1', pro: 'Up to 3', team: 'Up to 10' },
        { name: 'Team management', starter: false, pro: false, team: true },
        { name: 'Role-based permissions', starter: false, pro: false, team: true },
      ],
    },
    {
      category: 'Support',
      features: [
        { name: 'Email support', starter: true, pro: true, team: true },
        { name: 'Priority support', starter: false, pro: true, team: true },
        { name: 'Dedicated support', starter: false, pro: false, team: true },
        { name: 'Custom onboarding', starter: false, pro: false, team: true },
      ],
    },
  ];

  return (
    <div className="bg-navy-900">
      <Seo
        title="Pricing"
        description="Simple, transparent pricing for trades businesses of every size. No hidden fees — pay for the seats and features you actually use."
        path="/pricing"
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
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Choose the plan that fits your business. All plans include a 14-day free trial.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`font-medium ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  isAnnual ? 'bg-electric-500' : 'bg-gray-300'
                }`}
                aria-label="Toggle billing frequency"
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-navy-900 transition-transform ${
                    isAnnual ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`font-medium ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
                Annual
                <span className="ml-2 text-sm text-electric-600 font-semibold">Save up to 36%</span>
              </span>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 -mt-32">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`p-8 h-full flex flex-col ${
                    plan.featured ? 'ring-2 ring-electric-500 shadow-xl' : ''
                  }`}
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
                    <span className="text-5xl font-bold text-white">
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-300">/month</span>
                    {isAnnual && (
                      <div className="mt-2 text-sm text-gray-300">
                        Billed annually (${plan.annualPrice * 12}/year)
                      </div>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="text-electric-500 flex-shrink-0 mt-0.5" size={20} />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, featureIndex) => (
                      <li key={`not-${featureIndex}`} className="flex items-start space-x-3 opacity-40">
                        <X className="text-gray-400 flex-shrink-0 mt-0.5" size={20} />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a href={signupUrl}>
                    <Button
                      fullWidth
                      variant={plan.featured ? 'primary' : 'outline'}
                      size="lg"
                    >
                      Start free trial
                    </Button>
                  </a>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-300 mb-4">Need help choosing?</p>
            <a href="/contact">
              <Button variant="outline">Contact sales</Button>
            </a>
          </div>
        </Container>
      </section>

      {/* Feature Comparison Matrix */}
      <section className="py-20 lg:py-32 bg-navy-800">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Compare all features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See exactly what's included in each plan
            </p>
          </motion.div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy-700 bg-navy-900 text-white">
                    <th className="text-left p-6 font-semibold">Features</th>
                    <th className="text-center p-6 font-semibold">Starter</th>
                    <th className="text-center p-6 font-semibold">Professional</th>
                    <th className="text-center p-6 font-semibold">Business</th>
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((category, categoryIndex) => (
                    <>
                      <tr key={`category-${categoryIndex}`} className="bg-navy-800">
                        <td colSpan={4} className="p-4 font-bold text-white">
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature, featureIndex) => (
                        <tr key={featureIndex} className="border-b border-gray-100">
                          <td className="p-4 text-gray-300">{feature.name}</td>
                          <td className="p-4 text-center">
                            {typeof feature.starter === 'boolean' ? (
                              feature.starter ? (
                                <Check className="text-electric-500 mx-auto" size={20} />
                              ) : (
                                <X className="text-gray-300 mx-auto" size={20} />
                              )
                            ) : (
                              <span className="text-gray-300">{feature.starter}</span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {typeof feature.pro === 'boolean' ? (
                              feature.pro ? (
                                <Check className="text-electric-500 mx-auto" size={20} />
                              ) : (
                                <X className="text-gray-300 mx-auto" size={20} />
                              )
                            ) : (
                              <span className="text-gray-300">{feature.pro}</span>
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {typeof feature.team === 'boolean' ? (
                              feature.team ? (
                                <Check className="text-electric-500 mx-auto" size={20} />
                              ) : (
                                <X className="text-gray-300 mx-auto" size={20} />
                              )
                            ) : (
                              <span className="text-gray-300">{feature.team}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Frequently asked questions
            </h2>
            <p className="text-xl text-gray-300">
              Have a question? We're here to help.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <summary className="flex items-start justify-between cursor-pointer bg-navy-900 p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                  <span className="font-semibold text-white pr-8">{faq.question}</span>
                  <HelpCircle className="flex-shrink-0 text-electric-500 group-open:rotate-180 transition-transform" size={24} />
                </summary>
                <div className="mt-4 p-6 bg-navy-800 rounded-2xl">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </motion.details>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-300 mb-4">Still have questions?</p>
            <a href="/contact">
              <Button variant="outline">Contact us</Button>
            </a>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-navy-900 text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join trades teams who are growing profitably with Jobrythm. No credit card required.
            </p>
            <a href={signupUrl}>
              <Button size="lg">Start your free trial</Button>
            </a>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default PricingPage;
