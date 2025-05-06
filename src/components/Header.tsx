
import React from "react";
import { Shield, AlertTriangle } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Veritas</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Fake News Detector</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            <span className="text-muted-foreground">Fight misinformation, one article at a time</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
