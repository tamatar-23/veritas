
import React, { useState } from "react";
import { Search, FileText, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { analyzeFakeNews } from "@/lib/api";
import { useToast } from "@/components/ui/toast";

interface ContentAnalyzerFormProps {
  onAnalysisComplete: (result: any) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (value: boolean) => void;
}

const ContentAnalyzerForm = ({
  onAnalysisComplete,
  isAnalyzing,
  setIsAnalyzing,
}: ContentAnalyzerFormProps) => {
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [headline, setHeadline] = useState("");
  const { toast } = useToast();

  const handleAnalyze = async (type: "url" | "text" | "headline") => {
    // Validate input
    let content = "";
    if (type === "url") {
      content = url;
      if (!content || !content.startsWith("http")) {
        toast({
          title: "Invalid URL",
          description: "Please enter a valid URL starting with http:// or https://",
          variant: "destructive",
        });
        return;
      }
    } else if (type === "text") {
      content = text;
      if (!content || content.trim().length < 20) {
        toast({
          title: "Text too short",
          description: "Please enter at least 20 characters for analysis",
          variant: "destructive",
        });
        return;
      }
    } else if (type === "headline") {
      content = headline;
      if (!content || content.trim().length < 10) {
        toast({
          title: "Headline too short",
          description: "Please enter a full headline for analysis",
          variant: "destructive",
        });
        return;
      }
    }

    try {
      setIsAnalyzing(true);
      const result = await analyzeFakeNews(content, type);
      onAnalysisComplete(result);
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis failed",
        description: "Unable to analyze the content. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 px-4">
      <Tabs defaultValue="url" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="url">URL</TabsTrigger>
          <TabsTrigger value="text">Full Article</TabsTrigger>
          <TabsTrigger value="headline">Headline</TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="url" className="text-sm font-medium text-gray-700">
              Enter news article URL
            </label>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="url"
                  placeholder="https://example.com/news-article"
                  className="pl-10"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <Button 
                onClick={() => handleAnalyze("url")} 
                disabled={isAnalyzing}
                className="whitespace-nowrap"
              >
                <Search className="mr-2 h-4 w-4" />
                Analyze URL
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="text" className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="full-text" className="text-sm font-medium text-gray-700">
              Paste the full article text
            </label>
            <Textarea
              id="full-text"
              placeholder="Paste the article content here..."
              className="min-h-[200px]"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex justify-end">
              <Button 
                onClick={() => handleAnalyze("text")} 
                disabled={isAnalyzing}
              >
                <FileText className="mr-2 h-4 w-4" />
                Analyze Text
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="headline" className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="headline" className="text-sm font-medium text-gray-700">
              Enter news headline
            </label>
            <Input
              id="headline"
              placeholder="Enter the headline you want to check..."
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
            <div className="flex justify-end">
              <Button 
                onClick={() => handleAnalyze("headline")} 
                disabled={isAnalyzing}
              >
                <Search className="mr-2 h-4 w-4" />
                Analyze Headline
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentAnalyzerForm;
