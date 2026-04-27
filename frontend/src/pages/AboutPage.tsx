import { motion } from 'framer-motion';
import { Target, Heart, Zap, Shield, Code2, ExternalLink } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import Seo from '../components/Seo';
import { useDomain } from '../contexts/DomainContext';

const AboutPage = () => {
  const { signupUrl } = useDomain();
  const values = [
    {
      icon: Target,
      title: 'Clarity',
      description: 'Every trades business deserves clear insight into their profitability and operations.',
    },
    {
      icon: Heart,
      title: 'Craftsmanship',
      description: 'Software built with the same care and attention to detail that our users bring to their work.',
    },
    {
      icon: Shield,
      title: 'Reliability',
      description: 'Trades teams depend on this daily. That trust is taken seriously and reflected in rock-solid software.',
    },
    {
      icon: Zap,
      title: 'Momentum',
      description: 'Speed matters in trades. Jobrythm helps you move faster without sacrificing quality or accuracy.',
    },
  ];

  return (
    <div className="bg-navy-900">
      <Seo
        title="About"
        description="Jobrythm is built for trades businesses by a developer who gives a damn — practical software that helps contractors win more work and protect their margins."
        path="/about"
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
              Built for trades. By a developer who gives a damn.
            </h1>
            <p className="text-xl text-gray-300">
              Jobrythm is an open source project built to help trades businesses win more work, protect their margins, and grow profitably.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-32">
        <Container size="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              The mission
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Every day, skilled trades people pour their expertise into their work. But too often, poor tools and messy workflows eat away at their time and profits. Trades businesses deserve software that's as reliable and well-crafted as the work they deliver.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              Jobrythm exists to give trades teams clarity and control over their business — from the first quote to the final payment.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Open Source */}
      <section className="py-20 lg:py-32 bg-navy-800">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-electric-100 rounded-2xl flex items-center justify-center mb-6">
                <Code2 className="text-electric-600" size={28} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Fully open source
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                Jobrythm is open source. Both the marketing site and the application backend are publicly available on GitHub. You can inspect the code, report issues, or contribute.
              </p>
              <p className="text-gray-300 leading-relaxed mb-8">
                Transparency isn't just a feature — it's a foundation. You should know exactly what software you're trusting with your business data.
              </p>
              <a
                href="https://github.com/Jobrythm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-electric-400 hover:text-electric-300 transition-colors font-semibold"
              >
                <Code2 size={18} />
                View on GitHub
                <ExternalLink size={14} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <Card className="p-6">
                <h3 className="font-bold text-white mb-2">jobrythm-fullstack</h3>
                <p className="text-gray-300 text-sm mb-3">The application backend — TypeScript, Express, PostgreSQL, JWT auth, Stripe payments, PDF generation.</p>
                <a
                  href="https://github.com/Jobrythm/jobrythm-fullstack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-electric-400 hover:text-electric-300 transition-colors text-sm"
                >
                  github.com/Jobrythm/jobrythm-fullstack <ExternalLink size={12} />
                </a>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold text-white mb-2">jobrythm.io</h3>
                <p className="text-gray-300 text-sm mb-3">This marketing site — React, TypeScript, Vite, Tailwind, Strapi CMS, Docker.</p>
                <a
                  href="https://github.com/Jobrythm/jobrythm.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-electric-400 hover:text-electric-300 transition-colors text-sm"
                >
                  github.com/Jobrythm/jobrythm.com <ExternalLink size={12} />
                </a>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Core values
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The principles behind every design and engineering decision
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-8 text-center" hover>
                  <div className="w-16 h-16 bg-electric-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-electric-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Developer Section */}
      <section className="py-20 lg:py-32 bg-navy-800">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              The team
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center">
              <div className="w-24 h-24 bg-electric-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Code2 className="text-electric-600" size={40} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">Ari Cummings</h3>
              <p className="text-electric-400 font-medium mb-4">Sole Developer — McMinnville, Oregon</p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Software developer based in McMinnville, Oregon. Built Jobrythm from scratch under the Artistech Endeavors banner. Not a contractor — just a developer who saw a real problem in the trades industry and built a real solution for it.
              </p>
              <div className="flex justify-center gap-6">
                <a
                  href="https://aricummings.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-electric-400 hover:text-electric-300 transition-colors font-medium"
                >
                  aricummings.com <ExternalLink size={14} />
                </a>
                <a
                  href="https://beta.artistechendeavors.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-electric-400 hover:text-electric-300 transition-colors font-medium"
                >
                  Artistech Endeavors <ExternalLink size={14} />
                </a>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <Container>
          <Card className="bg-gradient-to-br from-electric-500 to-electric-600 p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to give it a try?
            </h2>
            <p className="text-xl text-electric-100 mb-8 max-w-2xl mx-auto">
              Free trial available. No demo needed — just sign up and start.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={signupUrl} className="block w-full sm:w-auto">
                <Button size="lg" variant="secondary" fullWidth>
                  Start free trial
                </Button>
              </a>
              <a href="/contact" className="block w-full sm:w-auto">
                <Button
                  size="lg"
                  fullWidth
                  className="bg-navy-900 text-electric-600 hover:bg-gray-100"
                >
                  Get in touch
                </Button>
              </a>
            </div>
          </Card>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;
