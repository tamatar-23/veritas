
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InfoSection = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">1</span>
                <span>Enter a news article URL, headline, or paste the full text</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">2</span>
                <span>Our AI analyzes the content for signs of misinformation</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">3</span>
                <span>Review the credibility score and explanation</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-100 text-blue-800 font-medium rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">4</span>
                <span>Check fact-check links and trusted sources</span>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Spotting Fake News</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Check the source's credibility and track record</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Look for emotionally charged language or sensational claims</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Verify if other reputable news sources are reporting the same story</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Check if the article cites credible sources or experts</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Be wary of content that confirms your existing beliefs too easily</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InfoSection;
