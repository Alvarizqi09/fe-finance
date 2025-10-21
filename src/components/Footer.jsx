import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-emerald-50 to-teal-50 border-t border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold text-primary mb-2">Finance App</h3>
            <p className="text-sm text-gray-600 text-center md:text-left">
              Manage your finances with ease and track your income & expenses
              efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a
                  href="/dashboard"
                  className="hover:text-primary transition-colors"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/income"
                  className="hover:text-primary transition-colors"
                >
                  Income
                </a>
              </li>
              <li>
                <a
                  href="/expense"
                  className="hover:text-primary transition-colors"
                >
                  Expense
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-sm font-semibold text-gray-800 mb-3">
              Connect With Us
            </h4>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="mailto:contact@financeapp.com"
                className="text-gray-600 hover:text-primary transition-colors"
                aria-label="Email"
              >
                <MdEmail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-emerald-100 pt-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="text-sm text-gray-600 text-center sm:text-left">
              © {currentYear} Finance App. All rights reserved.
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              Made with <FaHeart className="text-red-500" size={14} /> by Your
              Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
