
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

const LoadingAnalysis = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4">
      <Card className="border shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-center py-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Search className="h-10 w-10 text-blue-600 animate-pulse-slow" />
              </div>
              <h2 className="text-xl font-medium text-gray-700">Analyzing content...</h2>
              <p className="text-gray-500 mt-2">
                Our AI is checking for signs of misinformation
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-10" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>

          <div>
            <Skeleton className="h-4 w-40 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div>
            <Skeleton className="h-4 w-40 mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingAnalysis;
