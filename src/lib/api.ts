
// This is a mock API service for the fake news detector
// In a real application, this would connect to an actual AI model or API

type ContentType = "url" | "text" | "headline";
type CredibilityRating = "high" | "medium" | "low";

interface FactCheckSource {
  name: string;
  url: string;
}

interface AnalysisResult {
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
}

// Mock delays to simulate API call
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const analyzeFakeNews = async (
  content: string,
  type: ContentType
): Promise<AnalysisResult> => {
  // In a real implementation, this would call an API or ML model
  // For now, we'll simulate with random results with a delay
  await delay(2000 + Math.random() * 1000);

  // Generate a pseudo-random score based on content
  const contentHash = content
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // This creates a somewhat random but deterministic score
  // between 0.1 and 0.95 based on the content
  const baseScore = (contentHash % 85 + 10) / 100;
  
  // Make the score slightly type-dependent
  let score: number;
  if (type === "headline") {
    // Headlines are harder to verify, so we lower the score slightly
    score = Math.max(0.1, baseScore - 0.1);
  } else if (type === "url") {
    // URLs can be more reliably checked against known sources
    score = Math.min(0.95, baseScore + 0.05);
  } else {
    // Full text provides more context
    score = baseScore;
  }

  // Determine credibility rating
  let credibility: CredibilityRating;
  if (score >= 0.7) {
    credibility = "high";
  } else if (score >= 0.4) {
    credibility = "medium";
  } else {
    credibility = "low";
  }

  // Mock explanations based on credibility
  const explanations = {
    high: [
      "This content appears to be from a reputable source and contains verified information. The article cites credible sources and presents balanced reporting.",
      "The information presented is consistent with reporting from multiple credible news outlets. The article provides context and avoids sensationalism.",
      "The content follows journalistic standards, properly attributes sources, and presents facts that can be independently verified.",
    ],
    medium: [
      "While some information appears accurate, the content contains unverified claims or presents information in a potentially misleading way.",
      "The article mixes factual reporting with opinion or speculation, making it difficult to separate fact from interpretation.",
      "The content may be presenting a one-sided view of events without adequate context or alternative perspectives.",
    ],
    low: [
      "This content contains multiple red flags for misinformation, including unverified claims, emotional manipulation, and lack of credible sources.",
      "The article appears designed to provoke emotional reactions rather than inform, using sensationalist language and making claims that contradict established facts.",
      "The information presented conflicts with reporting from multiple credible sources and lacks evidence to support its claims.",
    ],
  };

  // Select a random explanation based on credibility
  const explanationIndex = contentHash % 3;
  const explanation = explanations[credibility][explanationIndex];

  // Generate mock warnings
  const allWarnings = [
    "Uses emotionally charged language designed to provoke outrage",
    "Makes claims without citing credible sources",
    "Contains logical fallacies or misleading arguments",
    "Presents opinions as facts without clarification",
    "Information contradicts established expert consensus",
    "Uses misleading headlines that don't match the content",
    "Contains outdated information presented as current",
    "Lacks context that would significantly change interpretation",
    "Uses manipulated images or media out of context",
    "Cites anonymous or unverifiable sources",
  ];

  // Select warnings based on the score (lower scores get more warnings)
  const numWarnings = credibility === "high" ? 0 : credibility === "medium" ? 2 : 4;
  const warnings: string[] = [];
  
  for (let i = 0; i < numWarnings; i++) {
    const index = (contentHash + i * 13) % allWarnings.length;
    warnings.push(allWarnings[index]);
  }

  // Mock fact check sources
  const factCheckSources = [
    { name: "Snopes Fact Check", url: "https://www.snopes.com/" },
    { name: "PolitiFact", url: "https://www.politifact.com/" },
    { name: "FactCheck.org", url: "https://www.factcheck.org/" },
    { name: "Reuters Fact Check", url: "https://www.reuters.com/fact-check/" },
    { name: "AP Fact Check", url: "https://apnews.com/hub/ap-fact-check" },
  ];

  // Only include fact checks for medium and low credibility
  const factChecks = credibility !== "high" 
    ? [
        factCheckSources[(contentHash % 5)],
        factCheckSources[((contentHash + 7) % 5)],
      ]
    : undefined;

  // Mock related articles
  const allRelatedArticles = [
    {
      title: "Understanding the Facts Behind the Recent Claims",
      source: "Reuters",
      url: "https://www.reuters.com/",
    },
    {
      title: "Experts Weigh In On Viral News Story",
      source: "Associated Press",
      url: "https://www.ap.org/",
    },
    {
      title: "Fact vs Fiction: Analyzing Recent Events",
      source: "The New York Times",
      url: "https://www.nytimes.com/",
    },
    {
      title: "In-depth: What Really Happened According to Sources",
      source: "The Washington Post",
      url: "https://www.washingtonpost.com/",
    },
    {
      title: "Context Matters: The Full Story Behind Viral Claims",
      source: "NPR",
      url: "https://www.npr.org/",
    },
  ];

  // Include 2-3 related articles
  const numRelatedArticles = 2 + (contentHash % 2);
  const relatedArticles = [];
  
  for (let i = 0; i < numRelatedArticles; i++) {
    const index = (contentHash + i * 11) % allRelatedArticles.length;
    relatedArticles.push(allRelatedArticles[index]);
  }

  let mockTitle, mockSource;

  if (type === "url") {
    const urlParts = content.split('/');
    const domain = urlParts[2] || "example.com";
    mockSource = domain.replace('www.', '');
    mockTitle = "Article from " + mockSource;
  } else if (type === "headline") {
    mockTitle = content;
    // Extract a mock source from content if possible
    const sourceWords = ["Times", "Post", "News", "Daily", "Journal"];
    const contentWords = content.split(' ');
    const sourceIndex = contentWords.findIndex(word => 
      sourceWords.some(sw => word.includes(sw))
    );
    mockSource = sourceIndex >= 0 ? contentWords[sourceIndex] : "Unknown source";
  } else {
    // For full text, use first few words as title
    const firstWords = content.split(' ').slice(0, 5).join(' ');
    mockTitle = firstWords + "...";
    mockSource = "Unknown source";
  }

  return {
    credibility,
    score,
    title: mockTitle,
    source: mockSource,
    explanation,
    factChecks,
    warnings,
    relatedArticles: credibility === "low" ? relatedArticles : undefined,
  };
};
