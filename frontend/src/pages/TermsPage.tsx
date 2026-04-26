import { motion } from 'framer-motion';
import Container from '../components/ui/Container';

const TermsPage = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing or using Jobrythm, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.',
    },
    {
      title: '2. Description of Service',
      content: 'Jobrythm provides a cloud-based software platform for trades businesses to create quotes, track job costs, generate invoices, and manage client relationships. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.',
    },
    {
      title: '3. Account Registration',
      content: 'To use our services, you must register for an account and provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.',
    },
    {
      title: '4. Subscription and Payment',
      subsections: [
        {
          subtitle: 'Fees',
          text: 'Access to certain features of our service requires payment of subscription fees. All fees are non-refundable except as expressly stated in these terms.',
        },
        {
          subtitle: 'Billing',
          text: 'Subscription fees are billed in advance on a monthly or annual basis, depending on your selected plan. You authorize us to charge your payment method for all fees.',
        },
        {
          subtitle: 'Price changes',
          text: 'We reserve the right to change our subscription fees at any time. We will provide at least 30 days\' notice of any fee increase.',
        },
        {
          subtitle: 'Free trial',
          text: 'We may offer a free trial period for new users. At the end of the trial, you will be automatically charged unless you cancel before the trial ends.',
        },
      ],
    },
    {
      title: '5. Acceptable Use',
      content: 'You agree not to: (a) use the service for any illegal purpose; (b) transmit any viruses, malware, or harmful code; (c) attempt to gain unauthorized access to our systems; (d) interfere with or disrupt the service; (e) use the service to spam or harass others; (f) violate any applicable laws or regulations; or (g) reverse engineer, decompile, or disassemble any aspect of the service.',
    },
    {
      title: '6. Your Data',
      subsections: [
        {
          subtitle: 'Ownership',
          text: 'You retain all ownership rights to the data you input into our platform. We do not claim any ownership over your business data.',
        },
        {
          subtitle: 'License',
          text: 'By using our service, you grant us a limited license to use, store, and process your data solely for the purpose of providing the service to you.',
        },
        {
          subtitle: 'Backup and recovery',
          text: 'While we perform regular backups, you are responsible for maintaining your own backups of your data.',
        },
        {
          subtitle: 'Data deletion',
          text: 'If you close your account, we will delete your data within 90 days, except where we are required to retain it for legal compliance.',
        },
      ],
    },
    {
      title: '7. Intellectual Property',
      content: 'The service and its original content, features, and functionality are owned by Jobrythm and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our services without our express written permission.',
    },
    {
      title: '8. Confidentiality',
      content: 'We will maintain the confidentiality of your business data and will not disclose it to third parties except as described in our Privacy Policy or as required by law.',
    },
    {
      title: '9. Service Availability',
      content: 'We strive to provide 99.9% uptime but do not guarantee that the service will be uninterrupted or error-free. We will not be liable for any service interruptions, including those caused by system maintenance, updates, or factors beyond our control.',
    },
    {
      title: '10. Termination',
      content: 'You may cancel your subscription at any time from your account settings. We may terminate or suspend your account immediately, without prior notice, if you breach these terms. Upon termination, your right to use the service will immediately cease.',
    },
    {
      title: '11. Disclaimers',
      content: 'THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.',
    },
    {
      title: '12. Limitation of Liability',
      content: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, JOBRYTHM SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST DATA, OR BUSINESS INTERRUPTION, ARISING OUT OF YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.',
    },
    {
      title: '13. Indemnification',
      content: 'You agree to indemnify and hold harmless Jobrythm and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses arising out of your use of the service, your violation of these terms, or your violation of any rights of another.',
    },
    {
      title: '14. Governing Law',
      content: 'These terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. You agree to submit to the exclusive jurisdiction of the courts located in San Francisco, California.',
    },
    {
      title: '15. Dispute Resolution',
      content: 'Any disputes arising out of or relating to these terms or the service shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association, except that either party may seek injunctive relief in court.',
    },
    {
      title: '16. Changes to Terms',
      content: 'We reserve the right to modify these terms at any time. We will provide notice of material changes by posting the new terms on our website and updating the "Last updated" date. Your continued use of the service after changes become effective constitutes your acceptance of the new terms.',
    },
    {
      title: '17. Entire Agreement',
      content: 'These terms constitute the entire agreement between you and Jobrythm regarding the use of the service and supersede all prior agreements and understandings.',
    },
    {
      title: '18. Contact',
      content: 'If you have any questions about these Terms of Service, please contact us at hello@jobrythm.aricummings.com.',
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
              Terms of Service
            </h1>
            <p className="text-xl text-navy-600">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Terms Content */}
      <section className="py-20 lg:py-32">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="mb-12 p-6 bg-navy-50 rounded-2xl">
              <p className="text-navy-700 mb-0">
                Welcome to Jobrythm. These Terms of Service ("Terms") govern your use of our platform and services. By using Jobrythm, you agree to these terms. Please read them carefully.
              </p>
            </div>

            {sections.map((section, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-2xl font-bold text-navy-900 mb-6">{section.title}</h2>
                {section.subsections ? (
                  <div className="space-y-6">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex}>
                        <h3 className="text-xl font-semibold text-navy-800 mb-3">
                          {subsection.subtitle}
                        </h3>
                        <p className="text-navy-700 leading-relaxed">{subsection.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-navy-700 leading-relaxed">{section.content}</p>
                )}
              </div>
            ))}

            <div className="mt-12 p-6 bg-electric-50 rounded-2xl border border-electric-200">
              <p className="text-navy-700 mb-4">
                <strong>Questions about these terms?</strong>
              </p>
              <p className="text-navy-700 mb-0">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:hello@jobrythm.aricummings.com" className="text-electric-600 hover:text-electric-700 font-medium">
                  hello@jobrythm.aricummings.com
                </a>
              </p>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
};

export default TermsPage;
