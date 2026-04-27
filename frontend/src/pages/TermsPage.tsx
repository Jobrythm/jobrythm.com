import { motion } from 'framer-motion';
import Container from '../components/ui/Container';
import Seo from '../components/Seo';

const TermsPage = () => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing or using Jobrythm, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.',
    },
    {
      title: '2. Description of Service',
      content: 'Jobrythm is a cloud-based software platform for trades businesses to create quotes, track job costs, generate invoices, and manage client relationships. Jobrythm is developed and operated by Artistech Endeavors (beta.artistechendeavors.com), an independent software company based in McMinnville, Oregon. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.',
    },
    {
      title: '3. Open Source',
      content: 'The source code for Jobrythm is publicly available on GitHub (github.com/Jobrythm). You are welcome to inspect, fork, and contribute to the codebase under the terms of the applicable open source license. Using the hosted service (app.jobrythm.aricummings.com) is subject to these Terms regardless of whether you have reviewed the source code.',
    },
    {
      title: '4. Account Registration',
      content: 'To use our services, you must register for an account and provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.',
    },
    {
      title: '5. Free Trial',
      content: 'New users may access a free trial of Jobrythm without providing payment information. The trial allows you to evaluate the service before subscribing. We reserve the right to modify or discontinue the free trial at any time.',
    },
    {
      title: '6. Subscription and Payment',
      subsections: [
        {
          subtitle: 'Fees',
          text: 'Access to the full feature set of Jobrythm requires payment of a subscription fee. Subscription fees are listed on our Pricing page.',
        },
        {
          subtitle: 'Billing',
          text: 'Subscription fees are billed in advance on a monthly or annual basis, depending on your selected plan. You authorize us to charge your payment method for all fees.',
        },
        {
          subtitle: 'No Refunds',
          text: 'All subscription payments are final and non-refundable. We do not issue refunds or credits for any partial subscription periods, unused features, or cancelled accounts. If you cancel, your access continues until the end of your current billing period.',
        },
        {
          subtitle: 'Price changes',
          text: 'We reserve the right to change our subscription fees at any time. We will provide at least 30 days\' notice of any fee increase via the email address on your account.',
        },
      ],
    },
    {
      title: '7. Acceptable Use',
      content: 'You agree not to: (a) use the service for any illegal purpose; (b) transmit any viruses, malware, or harmful code; (c) attempt to gain unauthorized access to our systems; (d) interfere with or disrupt the service; (e) use the service to spam or harass others; (f) violate any applicable laws or regulations.',
    },
    {
      title: '8. Your Data',
      subsections: [
        {
          subtitle: 'Ownership',
          text: 'You retain all ownership rights to the data you input into the platform. We do not claim any ownership over your business data.',
        },
        {
          subtitle: 'License',
          text: 'By using our service, you grant us a limited license to use, store, and process your data solely for the purpose of providing the service to you.',
        },
        {
          subtitle: 'Backup',
          text: 'While we perform regular backups, you are responsible for maintaining your own backups of your data.',
        },
        {
          subtitle: 'Deletion',
          text: 'If you close your account, we will delete your data within 90 days, except where we are required to retain it for legal compliance.',
        },
      ],
    },
    {
      title: '9. Documentation',
      content: 'Jobrythm provides documentation to help you get the most out of the platform. There is no formal training program. Support is provided through documentation and via email at contact@jobrythm.io.',
    },
    {
      title: '10. Intellectual Property',
      content: 'The Jobrythm name, logo, and any proprietary features not covered by the open source license are owned by Artistech Endeavors. The underlying source code is available under its respective open source license. You may not use the Jobrythm name or logo without prior written permission.',
    },
    {
      title: '11. Confidentiality',
      content: 'We will maintain the confidentiality of your business data and will not disclose it to third parties except as described in our Privacy Policy or as required by law.',
    },
    {
      title: '12. Service Availability',
      content: 'We strive to maintain high availability but do not guarantee that the service will be uninterrupted or error-free. We will not be liable for any service interruptions caused by system maintenance, updates, or factors beyond our control.',
    },
    {
      title: '13. Termination',
      content: 'You may cancel your subscription at any time from your account settings. We may terminate or suspend your account immediately, without prior notice, if you breach these terms. Upon termination, your right to use the service will immediately cease. No refunds will be issued for the remaining subscription period.',
    },
    {
      title: '14. Disclaimers',
      content: 'THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.',
    },
    {
      title: '15. Limitation of Liability',
      content: 'TO THE MAXIMUM EXTENT PERMITTED BY LAW, ARTISTECH ENDEAVORS AND ITS DEVELOPER SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOST DATA, OR BUSINESS INTERRUPTION, ARISING OUT OF YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM.',
    },
    {
      title: '16. Indemnification',
      content: 'You agree to indemnify and hold harmless Artistech Endeavors and its developer from any claims, damages, losses, liabilities, and expenses arising out of your use of the service, your violation of these terms, or your violation of any rights of another.',
    },
    {
      title: '17. Governing Law',
      content: 'These terms shall be governed by and construed in accordance with the laws of the State of Oregon, without regard to its conflict of law provisions. You agree to submit to the exclusive jurisdiction of the courts located in Yamhill County, Oregon.',
    },
    {
      title: '18. Changes to Terms',
      content: 'We reserve the right to modify these terms at any time. We will provide notice of material changes by posting the updated terms on this page and updating the "Last updated" date. Your continued use of the service after changes become effective constitutes your acceptance of the new terms.',
    },
    {
      title: '19. Entire Agreement',
      content: 'These terms constitute the entire agreement between you and Artistech Endeavors regarding the use of the service and supersede all prior agreements and understandings.',
    },
    {
      title: '20. Contact',
      content: 'If you have any questions about these Terms of Service, please contact us at contact@jobrythm.io.',
    },
  ];

  return (
    <div className="bg-navy-900">
      <Seo
        title="Terms of Service"
        description="The Jobrythm terms of service governing your use of our quoting, job costing, and invoicing platform."
        path="/terms"
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
              Terms of Service
            </h1>
            <p className="text-xl text-gray-300">
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
            <div className="mb-12 p-6 bg-navy-800 rounded-2xl">
              <p className="text-gray-300 mb-0">
                Welcome to Jobrythm. These Terms of Service ("Terms") govern your use of our platform and services. Jobrythm is developed and operated by Artistech Endeavors, based in McMinnville, Oregon. By using Jobrythm, you agree to these terms. Please read them carefully.
              </p>
            </div>

            {sections.map((section, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-2xl font-bold text-white mb-6">{section.title}</h2>
                {section.subsections ? (
                  <div className="space-y-6">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex}>
                        <h3 className="text-xl font-semibold text-navy-800 mb-3">
                          {subsection.subtitle}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">{subsection.text}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-300 leading-relaxed">{section.content}</p>
                )}
              </div>
            ))}

            <div className="mt-12 p-6 bg-navy-800 rounded-2xl border border-navy-700">
              <p className="text-white font-semibold mb-4">
                Questions about these terms?
              </p>
              <p className="text-gray-300 mb-0">
                If you have any questions about these Terms of Service, please contact us at{' '}
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

export default TermsPage;
