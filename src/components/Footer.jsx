import { Database } from 'lucide-react';

// Footer Component
const Footer = () => {
  const footerSections = [
    { title: "Product", links: ["Features", "Pricing", "API Docs", "Integrations"] },
    { title: "Company",  links: ["About Us", "Blog", "Careers", "Contact"] },
    { title: "Resources", links: ["Documentation", "Help Center", "Status", "Terms"] },
  ];

  return (
    <footer className="bg-[#f8f7f2] border-t border-[#d1caca]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#03ef62] rounded-xl flex items-center justify-center shadow-lg shadow-[#03ef62]/20">
                <Database className="w-5 h-5 text-[#333333]" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-[#333333]">DatasetPro</span>
            </div>
            <p className="text-[#5c5c5c] text-sm leading-relaxed">
              Building the future of AI training data, one dataset at a time.
            </p>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-[#333333] font-bold mb-4 text-sm uppercase tracking-wider">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-[#5c5c5c] hover:text-[#03ef62] transition-colors duration-200 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#d1caca]/80 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#7a7a7a] text-sm">
              © {new Date().getFullYear()} DatasetPro. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-[#5c5c5c] hover:text-[#03ef62] text-sm transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-[#5c5c5c] hover:text-[#03ef62] text-sm transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
