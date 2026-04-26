import { motion } from 'framer-motion';
import { Target, Heart, Zap, Shield } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';

const AboutPage = () => {
  const values = [
    {
      icon: Target,
      title: 'Clarity',
      description: 'We believe every trade business deserves clear insight into their profitability and operations.',
    },
    {
      icon: Heart,
      title: 'Craftsmanship',
      description: 'We build software with the same care and attention to detail that our customers bring to their work.',
    },
    {
      icon: Shield,
      title: 'Reliability',
      description: 'Trades teams depend on us daily. We take that trust seriously and deliver rock-solid software.',
    },
    {
      icon: Zap,
      title: 'Momentum',
      description: 'Speed matters in trades. We help you move faster without sacrificing quality or accuracy.',
    },
  ];

  const team = [
    {
      name: 'Alex Richardson',
      role: 'Founder & CEO',
      bio: 'Former contractor with 15+ years in the trades. Built Jobrythm to solve the problems he faced daily.',
      placeholder: true,
    },
    {
      name: 'Sarah Martinez',
      role: 'Head of Product',
      bio: 'Ex-construction software expert passionate about building tools that trades teams actually love to use.',
      placeholder: true,
    },
    {
      name: 'James Chen',
      role: 'Lead Engineer',
      bio: 'Full-stack developer focused on creating fast, reliable software for mission-critical business operations.',
      placeholder: true,
    },
    {
      name: 'Emma Thompson',
      role: 'Customer Success',
      bio: 'Dedicated to ensuring every customer gets maximum value from Jobrythm and loves using it daily.',
      placeholder: true,
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
              Built by trades people, for trades people
            </h1>
            <p className="text-xl text-navy-600">
              We're on a mission to help trades businesses win more work, protect their margins, and grow profitably.
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
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Our mission
            </h2>
            <p className="text-xl text-navy-700 leading-relaxed mb-8">
              Every day, skilled trades people pour their expertise into their work. But too often, poor tools and messy workflows eat away at their time and profits. We believe trades businesses deserve software that's as reliable and well-crafted as the work they deliver.
            </p>
            <p className="text-xl text-navy-700 leading-relaxed">
              Jobrythm exists to give trades teams clarity and control over their business operations—from the first quote to the final payment. We're here to help you focus on what you do best while we handle the rest.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Why We Built This */}
      <section className="py-20 lg:py-32 bg-navy-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Why we built Jobrythm
            </h2>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Born from real frustrations and built with deep trades industry knowledge
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">The problem</h3>
              <p className="text-navy-700 leading-relaxed">
                Our founder spent years running an electrical contracting business, fighting with spreadsheets, losing track of costs, and wondering if jobs were actually profitable. The tools available were either too complex, too expensive, or built for industries that didn't understand the unique challenges of trades work.
              </p>
            </Card>
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">The solution</h3>
              <p className="text-navy-700 leading-relaxed">
                We built Jobrythm to be the tool we wished we'd had—simple enough to use daily, powerful enough to run a growing business, and affordable for teams of all sizes. It's designed specifically for how trades businesses actually work, not how software companies think they should work.
              </p>
            </Card>
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
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Our values
            </h2>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              The principles that guide everything we build
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
                  <h3 className="text-xl font-bold text-navy-900 mb-3">{value.title}</h3>
                  <p className="text-navy-600">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-32 bg-navy-50">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
              Meet the team
            </h2>
            <p className="text-xl text-navy-600 max-w-3xl mx-auto">
              Placeholder profiles for illustrative purposes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="w-32 h-32 bg-navy-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-4xl text-navy-400">👤</span>
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-1">{member.name}</h3>
                <p className="text-sm text-electric-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-navy-600">{member.bio}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <Container>
          <Card className="bg-gradient-to-br from-electric-500 to-electric-600 p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join us in building the future of trades business software
            </h2>
            <p className="text-xl text-electric-100 mb-8 max-w-2xl mx-auto">
              We're always looking for feedback from trades professionals. Let's build something great together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://app.jobrythm.com/signup">
                <Button size="lg" variant="secondary">
                  Try Jobrythm free
                </Button>
              </a>
              <a href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-electric-600 hover:bg-gray-100"
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
