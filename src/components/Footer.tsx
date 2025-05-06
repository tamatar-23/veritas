
import React from "react";
import { Link } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            TruthShield uses AI to help identify potentially misleading information.
            Always verify with multiple reliable sources.
          </p>
          <div className="mt-4 flex justify-center items-center space-x-2">
            <Link className="h-4 w-4 text-gray-500" />
            <a href="https://www.snopes.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
              Snopes
            </a>
            <span className="text-gray-400">|</span>
            <a href="https://www.factcheck.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
              FactCheck.org
            </a>
            <span className="text-gray-400">|</span>
            <a href="https://www.politifact.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm">
              PolitiFact
            </a>
          </div>
          <p className="mt-6 text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} TruthShield. This tool is for educational purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
