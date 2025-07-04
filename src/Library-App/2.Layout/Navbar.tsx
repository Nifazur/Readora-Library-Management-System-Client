import { useState } from 'react';
import { Menu, X, BookOpen, Plus, FileText } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'All Books', path: '/books', icon: BookOpen },
    { name: 'Add Book', path: '/create-book', icon: Plus },
    { name: 'Borrow Summary', path: '/borrow-summary', icon: FileText }
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className=" mx-auto px-4 sm:px-6 lg:px-23">
        <div className="flex justify-between items-center h-18">
          
          <div className="flex items-center">
            <NavLink to={'/'} className="flex-shrink-0 flex items-center">
              <img src='/logo.png' className="h-[180px] w-[180px] mr-2" />
            </NavLink>
          </div>


          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <NavLink
                    to={link.path}
                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {link.name}
                  </NavLink>
                );
              })}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>


        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <NavLink
                    to={link.path}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent className="h-4 w-4 mr-3" />
                    {link.name}
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;