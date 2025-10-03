import { Database } from "lucide-react";

const Footer = () => {
  const footerSections = [
    { title: "Product", links: ["Features", "Pricing", "API Docs", "Integrations"] },
    { title: "Company",  links: ["About Us", "Blog", "Careers", "Contact"] },
    { title: "Resources", links: ["Documentation", "Help Center", "Status", "Terms"] },
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-slate-900 ring-1 ring-slate-800 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-blue-500" />
              </div>
              <span className="text-xl font-bold aurora-text">DatasetPro</span>
            </div>
            <p className="text-slate-400 text-sm">
              Building the future of AI training data, one dataset at a time.
            </p>
          </div>

          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} DatasetPro. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;