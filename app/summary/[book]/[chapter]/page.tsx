"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

interface SummaryData {
  summary: string;
  takeaways: string[];
  reference: string;
}

export default function SummaryPage() {
  const params = useParams();
  const router = useRouter();
  const book = params.book as string;
  const chapter = params.chapter as string;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<SummaryData | null>(null);

  // Format book name from slug (e.g., "1-corinthians" -> "1 Corinthians")
  const formatBookName = (slug: string): string => {
    return slug
      .split("-")
      .map((word, index) => {
        // Handle numbers
        if (/^\d+$/.test(word)) {
          return word;
        }
        // Capitalize first letter
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  const bookName = formatBookName(book);

  // Helper to clean summary text (remove JSON artifacts)
  const cleanSummary = (text: string): string => {
    if (!text) return "";
    // Remove JSON structure if present
    let cleaned = text.replace(/^["']|["']$/g, ''); // Remove surrounding quotes
    cleaned = cleaned.replace(/\\n/g, '\n'); // Convert escaped newlines
    cleaned = cleaned.replace(/\\"/g, '"'); // Convert escaped quotes
    // If it looks like raw JSON, try to extract the summary value
    const jsonMatch = cleaned.match(/"summary"\s*:\s*"([^"]+(?:\\.[^"]*)*)"/);
    if (jsonMatch) {
      cleaned = jsonMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
    }
    return cleaned;
  };

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            book: bookName,
            chapter: parseInt(chapter),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to generate summary");
        }

        const result = await response.json();
        
        // Check if the response contains an error (e.g., API key not configured)
        if (result.error && !result.summary) {
          throw new Error(result.error);
        }
        
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (book && chapter) {
      fetchSummary();
    }
  }, [book, chapter, bookName]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-pastel-cream-50 via-pastel-blue-50 to-pastel-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pastel-lavender-100 dark:border-gray-700 p-6 md:p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-pastel-lavender-200 dark:bg-gray-700 rounded-xl w-1/3"></div>
              <div className="h-4 bg-pastel-blue-200 dark:bg-gray-700 rounded-xl w-1/4"></div>
              <div className="space-y-2 mt-8">
                <div className="h-4 bg-pastel-pink-100 dark:bg-gray-700 rounded-xl"></div>
                <div className="h-4 bg-pastel-pink-100 dark:bg-gray-700 rounded-xl w-5/6"></div>
                <div className="h-4 bg-pastel-pink-100 dark:bg-gray-700 rounded-xl w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    const isCreditsError = error.includes("Insufficient API credits") || error.includes("credits");
    
    return (
      <main className="min-h-screen bg-gradient-to-br from-pastel-cream-50 via-pastel-blue-50 to-pastel-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pastel-lavender-100 dark:border-gray-700 p-6 md:p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-500 dark:text-red-400 mb-4">Error</h2>
              <div className="text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <p>{error}</p>
                {isCreditsError && (
                  <p className="text-sm mt-4 p-4 bg-pastel-pink-50 dark:bg-yellow-900/20 rounded-xl border border-pastel-pink-200 dark:border-yellow-800">
                    💡 Tip: You need to add credits to your OpenRouter account to use this feature. Visit{" "}
                    <a 
                      href="https://openrouter.ai/settings/credits" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-pastel-blue-600 dark:text-blue-400 underline hover:text-pastel-blue-700 dark:hover:text-blue-300 font-medium"
                    >
                      OpenRouter Settings
                    </a>{" "}
                    to add credits.
                  </p>
                )}
              </div>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-gradient-to-r from-pastel-lavender-500 to-pastel-blue-500 hover:from-pastel-lavender-600 hover:to-pastel-blue-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Go Back Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pastel-cream-50 via-pastel-blue-50 to-pastel-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 animate-slide-up">
          <Link
            href="/"
            className="inline-flex items-center text-pastel-lavender-600 hover:text-pastel-lavender-700 dark:text-pastel-lavender-400 dark:hover:text-pastel-lavender-300 font-medium mb-4 transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            <span className="ml-1">Back to Home</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-pastel-lavender-600 via-pastel-pink-600 to-pastel-blue-600 bg-clip-text text-transparent mb-2">
            {bookName} Chapter {chapter}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Based on King James Version (KJV)</p>
        </div>

        {/* Summary Section */}
        {data && (
          <>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pastel-lavender-100 dark:border-gray-700 p-6 md:p-10 mb-8 animate-scale-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-12 bg-gradient-to-b from-pastel-lavender-400 via-pastel-pink-400 to-pastel-blue-400 rounded-full"></div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Summary</h2>
              </div>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 text-base md:text-lg">
                  {cleanSummary(data.summary).split('\n\n').map((paragraph: string, index: number) => (
                    paragraph.trim() && (
                      <p key={index} className="mb-4 last:mb-0 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        {paragraph.trim()}
                      </p>
                    )
                  ))}
                </div>
              </div>
            </div>

            {/* Practical Takeaways */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pastel-lavender-100 dark:border-gray-700 p-6 md:p-10 mb-8 animate-scale-in">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-12 bg-gradient-to-b from-pastel-mint-400 via-pastel-blue-400 to-pastel-lavender-400 rounded-full"></div>
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">
                  Practical Takeaways
                </h2>
              </div>
              <div className="space-y-5">
                {data.takeaways.map((takeaway, index) => (
                  <div 
                    key={index} 
                    className="flex gap-5 p-5 rounded-xl bg-gradient-to-r from-pastel-lavender-50 via-pastel-pink-50 to-pastel-blue-50 dark:from-gray-700/50 dark:to-gray-700/50 border-l-4 border-pastel-lavender-400 dark:border-pastel-lavender-500 hover:shadow-lg transition-all duration-200 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-pastel-lavender-500 via-pastel-pink-500 to-pastel-blue-500 dark:from-pastel-lavender-600 dark:to-pastel-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
                        {index + 1}
                      </div>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-base md:text-lg pt-1.5 flex-1">
                      {takeaway}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Another Button */}
            <div className="text-center animate-fade-in">
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-gradient-to-r from-pastel-lavender-500 via-pastel-pink-500 to-pastel-blue-500 hover:from-pastel-lavender-600 hover:via-pastel-pink-600 hover:to-pastel-blue-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Generate Another Chapter
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
