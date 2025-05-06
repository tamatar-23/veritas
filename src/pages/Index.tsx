
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentAnalyzerForm from "@/components/ContentAnalyzerForm";
import LoadingAnalysis from "@/components/LoadingAnalysis";
import AnalysisResult from "@/components/AnalysisResult";
import InfoSection from "@/components/InfoSection";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysisComplete = (result: any) => {
    setAnalysisResult(result);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="absolute top-4 right-4">
            <ThemeToggle />
          </div>
          
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Detect Fake News & Misinformation
            </h1>
            <p className="text-muted-foreground md:text-lg">
              Enter a news article, headline, or URL to analyze its credibility.
              Our AI will check for signs of misinformation and provide fact-checking resources.
            </p>
          </div>

          <ContentAnalyzerForm 
            onAnalysisComplete={handleAnalysisComplete} 
            isAnalyzing={isAnalyzing}
            setIsAnalyzing={setIsAnalyzing}
          />

          {isAnalyzing && <LoadingAnalysis />}
          
          {!isAnalyzing && analysisResult && (
            <AnalysisResult result={analysisResult} />
          )}

          {!isAnalyzing && !analysisResult && <InfoSection />}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
