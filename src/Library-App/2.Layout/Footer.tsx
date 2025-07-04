import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
const Footer = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  
  interface IFooterSection {
    id: string,
    title: string,
    links: string[]
  }

  const footerSections: IFooterSection[] = [
    {
      id: 'help',
      title: 'Need Help',
      links: [
        'Contact Us',
        'Track Your Activity',
        'Returns & Refunds',
        "FAQ's",
      ]
    },
    {
      id: 'company',
      title: 'Company',
      links: [
        'About Us',
        'readora Blog',
        'readora stan',
        'Collaboration',
        'Media'
      ]
    },
    {
      id: 'info',
      title: 'More Info',
      links: [
        'Term and Conditions',
        'Privacy Policy',
        'Borrow Policy',
        'Sitemap'
      ]
    },
    {
      id: 'location',
      title: 'Location',
      links: [
        'support@readora.in',
        'House #28, Road #12,',
        'Dhaka – 1209, Bangladesh'
      ]
    }
  ];

  return (
    <footer className="bg-[#3C4242] text-white py-8 md:py-15 w-full lg:min-h-[700px] bottom-0 left-0">
      <div className="mx-8 md:mx-23 ">
        {/* Mobile Accordion Sections */}
        <div className="md:hidden space-y-4">
          {footerSections.map((section) => (
            <div key={section.id} className="border-b border-[#bebcbd] pb-4">
              <button
                onClick={() => toggleSection(section.id)}
                className="flex justify-between items-center w-full text-left text-lg font-medium py-2"
              >
                {section.title}
                {expandedSection === section.id ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {expandedSection === section.id && (
                <div className="mt-3 space-y-3">
                  {section.links.map((link, index) => (
                    <a
                      key={index}
                      href="#"
                      className="block text-gray-300 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {footerSections.map((section) => (
            <div key={section.id}>
              <h3 className="text-[28px] font-bold text-[#F6F6F6] mb-4">{section.title}</h3>
              <div className="space-y-3">
                {section.links.map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-[#F6F6F6] text-base hover:text-gray-500 transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
          
        </div>

        
        <div className='flex flex-col md:flex-row justify-between items-center mt-4 md:mt-8 '>
          <div className='flex gap-x-2.5 mt-17 mb-10 md:mb-0'>
              <div className="bg-white rounded-xl hover:bg-gray-100 transition-colors cursor-pointer w-9 h-9 text-2xl flex items-center justify-center">
                <FaFacebookF color='black'/>
              </div>
              <div className="bg-white rounded-xl hover:bg-gray-100 transition-colors cursor-pointer w-9 h-9 text-2xl flex items-center justify-center">
                <FaInstagram color='black'/>
              </div>
              <div className="bg-white rounded-xl hover:bg-gray-100 transition-colors cursor-pointer w-9 h-9 text-2xl flex items-center justify-center">
                <FaTwitter color='black'/>
              </div>
              <div className="bg-white rounded-xl hover:bg-gray-100 transition-colors cursor-pointer w-9 h-9 text-2xl flex items-center justify-center">
                <FaLinkedin color='black'/>
              </div>
          </div>
          <div></div>
          <div></div>
          <div>
            <h3 className='text-[28px] font-bold text-[#F6F6F6] mb-4'>Download The App </h3>
            <div className='flex flex-col sm:flex-row gap-x-5'>
              <img className='w-[153px]' src="/PlayStore.png" alt="" />
              <img className='w-[153px]' src="/AppStore.png" alt="" />
            </div>
          </div>
        </div>
        

        {/* Popular Categories - Mobile Only */}
        <div className=" mt-8 py-6 border-y border-[#bebcbd]">
          <button
            onClick={() => toggleSection('categories')}
            className="flex justify-between items-center w-full text-left text-lg font-medium py-2"
          >
            Popular Categories
            {expandedSection === 'categories' ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          {expandedSection === 'categories' && (
            <div className="mt-3 space-y-3">
              <NavLink to={'/books'} className="block text-gray-300 hover:text-white transition-colors">All Books</NavLink>
              <NavLink to={'/create-book'} className="block text-gray-300 hover:text-white transition-colors">Add Books</NavLink>
              <NavLink to={'/borrow-summary'} className="block text-gray-300 hover:text-white transition-colors">Borrow Summary</NavLink>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="pb-10 md:pb-0 md:mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          Copyright © 2023 Nifazur Pvt Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;