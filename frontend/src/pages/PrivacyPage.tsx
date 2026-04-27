import { motion } from 'framer-motion';
import Container from '../components/ui/Container';

const PrivacyPage = () => {
  const sections = [
    {
      title: '1. Information We Collect',
      content: [
        {
          subtitle: 'Information you provide',
          text: 'We collect information you provide directly to us, including your name, email address, company name, phone number, and payment information when you register for an account, use our services, or communicate with us.',
        },
        {
          subtitle: 'Automatically collected information',
          text: 'When you use our services, we automatically collect certain information about your device and usage, including IP address, browser type, operating system, referral URLs, and pages visited.',
        },
        {
          subtitle: 'Business data',
          text: 'We collect and process the business data you input into our platform, including quotes, invoices, client information, and job details, solely for the purpose of providing our services to you.',
        },
      ],
    },
    {
      title: '2. How We Use Your Information',
      content: [
        {
          subtitle: 'To provide our services',
          text: 'We use your information to operate, maintain, and improve our platform, process transactions, send transactional communications, and provide customer support.',
        },
        {
          subtitle: 'To communicate with you',
          text: 'We may use your information to send you updates about our services, respond to your requests, and provide important notices.',
        },
        {
          subtitle: 'To improve our platform',
          text: 'We analyze usage patterns to understand how our services are used and to improve functionality, develop new features, and enhance user experience.',
        },
      ],
    },
    {
      title: '3. How We Share Your Information',
      content: [
        {
          subtitle: 'Service providers',
          text: 'We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data hosting, and email delivery. These providers are bound by confidentiality obligations.',
        },
        {
          subtitle: 'Legal compliance',
          text: 'We may disclose your information if required by law, subpoena, or other legal process, or if we believe disclosure is necessary to protect our rights or the safety of others.',
        },
        {
          subtitle: 'Business transfers',
          text: 'If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change.',
        },
      ],
    },
    {
      title: '4. Data Security',
      content: [
        {
          subtitle: null,
          text: 'We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. This includes encryption in transit and at rest, access controls, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
        },
      ],
    },
    {
      title: '5. Data Retention',
      content: [
        {
          subtitle: null,
          text: 'We retain your information for as long as your account is active or as needed to provide you services. If you close your account, we will delete or anonymize your information within 90 days, unless we are required to retain it for legal or compliance purposes.',
        },
      ],
    },
    {
      title: '6. Your Rights',
      content: [
        {
          subtitle: 'Access and portability',
          text: 'You have the right to access your personal information and export your data at any time from your account settings.',
        },
        {
          subtitle: 'Correction',
          text: 'You can update or correct your information through your account settings.',
        },
        {
          subtitle: 'Deletion',
          text: 'You may request deletion of your account and personal information by contacting us at contact@jobrythm.io.',
        },
        {
          subtitle: 'Opt-out',
          text: 'You can opt out of marketing communications at any time by clicking the unsubscribe link in emails or updating your preferences in your account settings.',
        },
      ],
    },
    {
      title: '7. Cookies and Tracking',
      content: [
        {
          subtitle: null,
          text: 'We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.',
        },
      ],
    },
    {
      title: '8. International Data Transfers',
      content: [
        {
          subtitle: null,
          text: 'Your information may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction. If you are located outside the United States and choose to provide information to us, we transfer the information to the United States and process it there.',
        },
      ],
    },
    {
      title: '9. Children\'s Privacy',
      content: [
        {
          subtitle: null,
          text: 'Our services are not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If you become aware that a child has provided us with personal information, please contact us.',
        },
      ],
    },
    {
      title: '10. Changes to This Policy',
      content: [
        {
          subtitle: null,
          text: 'We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date. You are advised to review this policy periodically for any changes.',
        },
      ],
    },
    {
      title: '11. Contact Us',
      content: [
        {
          subtitle: null,
          text: 'If you have any questions about this privacy policy or our practices, please contact us at contact@jobrythm.io. Jobrythm is developed and operated by Artistech Endeavors, McMinnville, Oregon.',
        },
      ],
    },
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Policy Content */}
      <section className="py-20 lg:py-32">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="mb-12 p-6 bg-navy-800 rounded-2xl">
              <p className="text-gray-300 mb-0">
                At Jobrythm (developed by Artistech Endeavors, McMinnville, Oregon), we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Jobrythm is open source — you can review the code at github.com/Jobrythm. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access our services.
              </p>
            </div>

            {sections.map((section, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">{section.title}</h2>
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="mb-6">
                    {item.subtitle && (
                      <h3 className="text-xl font-semibold text-navy-800 mb-3">{item.subtitle}</h3>
                    )}
                    <p className="text-gray-300 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            ))}

            <div className="mt-12 p-6 bg-navy-800 rounded-2xl border border-navy-700">
              <p className="text-white font-semibold mb-4">
                Questions or concerns?
              </p>
              <p className="text-gray-300 mb-0">
                If you have any questions or concerns about this privacy policy or our data practices, please contact us at{' '}
                <a href="mailto:contact@jobrythm.io" className="text-electric-400 hover:text-electric-300 font-medium">
                  contact@jobrythm.io
                </a>
              </p>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default PrivacyPage;
