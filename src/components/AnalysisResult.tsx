
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Check, X, AlertTriangle, Info, Share, Flag } from "lucide-react";

type CredibilityRating = "high" | "medium" | "low";

interface FactCheckSource {
  name: string;
  url: string;
}

interface AnalysisResultProps {
  result: {
    credibility: CredibilityRating;
    score: number;
    title?: string;
    source?: string;
    explanation: string;
    factChecks?: FactCheckSource[];
    warnings: string[];
    relatedArticles?: {
      title: string;
      source: string;
      url: string;
    }[];
  };
}

const CredibilityBadge = ({ rating }: { rating: CredibilityRating }) => {
  const config = {
    high: {
      label: "Likely Credible",
      color: "bg-trust-high text-white",
      icon: <Check className="h-4 w-4" />,
    },
    medium: {
      label: "Potentially Misleading",
      color: "bg-trust-medium text-white",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
    low: {
      label: "Likely False",
      color: "bg-trust-low text-white",
      icon: <X className="h-4 w-4" />,
    },
  };

  const { label, color, icon } = config[rating];

  return (
    <Badge className={`${color} px-3 py-1 text-sm font-medium flex items-center space-x-1`}>
      {icon}
      <span>{label}</span>
    </Badge>
  );
};

const AnalysisResult = ({ result }: AnalysisResultProps) => {
  // Scale score from 0-1 to 0-100 for progress bar
  const scorePercent = Math.round(result.score * 100);

  const getProgressColor = (score: number) => {
    if (score >= 70) return "bg-trust-high";
    if (score >= 40) return "bg-trust-medium";
    return "bg-trust-low";
  };

  const handleShare = () => {
    // In a real implementation, this would open a share dialog
    // or copy results to clipboard
    alert("Sharing functionality would be implemented here");
  };

  const handleReport = () => {
    // In a real implementation, this would allow users to report incorrect analysis
    alert("Reporting functionality would be implemented here");
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4 animate-fade-in">
      <Card className="border-t-4 shadow-md" style={{ borderTopColor: result.credibility === "high" ? "#34D399" : result.credibility === "medium" ? "#FBBF24" : "#EF4444" }}>
        <CardHeader className="pb-2">
          <div className="flex flex-wrap justify-between items-start gap-2">
            <div>
              <CardTitle className="text-xl">{result.title || "Content Analysis"}</CardTitle>
              {result.source && (
                <CardDescription>Source: {result.source}</CardDescription>
              )}
            </div>
            <CredibilityBadge rating={result.credibility} />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Credibility Score</span>
              <span className="font-semibold">{scorePercent}/100</span>
            </div>
            <Progress
              value={scorePercent}
              className={`h-2 ${getProgressColor(scorePercent)}`}
            />
          </div>

          <div>
            <h3 className="text-md font-semibold mb-2 flex items-center">
              <Info className="h-4 w-4 mr-2 text-blue-600" />
              Analysis
            </h3>
            <p className="text-gray-700">{result.explanation}</p>
          </div>

          {result.warnings && result.warnings.length > 0 && (
            <div>
              <h3 className="text-md font-semibold mb-2 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
                Warning Signs
              </h3>
              <ul className="space-y-1">
                {result.warnings.map((warning, index) => (
                  <li key={index} className="text-gray-700 text-sm flex items-start">
                    <span className="text-amber-500 mr-2">•</span>
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.factChecks && result.factChecks.length > 0 && (
            <div>
              <h3 className="text-md font-semibold mb-2">Fact Check Sources</h3>
              <ul className="space-y-2">
                {result.factChecks.map((source, index) => (
                  <li key={index}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm inline-flex items-center"
                    >
                      {source.name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {result.relatedArticles && result.relatedArticles.length > 0 && (
            <div>
              <h3 className="text-md font-semibold mb-2">Related Articles from Trusted Sources</h3>
              <ul className="space-y-2">
                {result.relatedArticles.map((article, index) => (
                  <li key={index} className="text-sm">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {article.title}
                    </a>
                    <span className="text-gray-500 text-xs ml-1">({article.source})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>

        <Separator />

        <CardFooter className="flex justify-between pt-4">
          <div className="text-xs text-gray-500">
            Analysis powered by AI. Results may not be 100% accurate.
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share className="h-4 w-4 mr-1" />
              Share
            </Button>
            <Button variant="ghost" size="sm" onClick={handleReport}>
              <Flag className="h-4 w-4 mr-1" />
              Report Issue
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AnalysisResult;
