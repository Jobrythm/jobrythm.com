import { Link } from 'react-router-dom';
import { Mail, Code2 } from 'lucide-react';
import logo from '../../assets/Jobrythm.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Security', href: '/security' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  };

  const socialLinks = [
    { name: 'Email', icon: Mail, href: 'mailto:contact@jobrythm.io' },
    { name: 'GitHub', icon: Code2, href: 'https://github.com/Jobrythm' },
  ];

  return (
    <footer className="bg-navy-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="Jobrythm" className="h-8 w-auto brightness-0 invert" />
            </Link>
            <p className="text-sm text-gray-400 mb-4 max-w-md">
              Win more work. Protect your margins. Quoting, job costing, invoicing, and cashflow clarity in one workflow for trades businesses.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-electric-400 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-electric-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-electric-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-gray-400 hover:text-electric-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">
          <p>
            &copy; {currentYear} Jobrythm by{' '}
            <a
              href="https://beta.artistechendeavors.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-electric-400 transition-colors"
            >
              Artistech Endeavors
            </a>
            {' '}—{' '}
            <a
              href="https://github.com/Jobrythm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-electric-400 transition-colors"
            >
              open source
            </a>
          </p>
          <Link
            to="/admin-page"
            className="text-gray-600 hover:text-gray-400 transition-colors text-xs"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
