"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ALL_BOOKS, getChapterCount } from "@/lib/bible-data";
import { getBookTheme } from "@/lib/book-themes";

type Screen = "books" | "chapters";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("books");
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const router = useRouter();

  const maxChapters = selectedBook ? getChapterCount(selectedBook) : 0;
  const chapters = useMemo(() => {
    if (!maxChapters) return [];
    return Array.from({ length: maxChapters }, (_, i) => i + 1);
  }, [maxChapters]);

  const handleGenerate = () => {
    if (selectedBook && selectedChapter && selectedChapter > 0 && selectedChapter <= maxChapters) {
      const bookSlug = selectedBook.toLowerCase().replace(/\s+/g, "-");
      router.push(`/summary/${bookSlug}/${selectedChapter}`);
    }
  };

  const handleBookClick = (bookName: string) => {
    setSelectedBook(bookName);
    setSelectedChapter(null);
    setScreen("chapters");
  };

  const handleChapterClick = (chapter: number) => {
    setSelectedChapter(chapter);
  };

  const handleBack = () => {
    setScreen("books");
    setSelectedChapter(null);
  };

  const isGenerateDisabled = !selectedBook || !selectedChapter || selectedChapter < 1 || selectedChapter > maxChapters;

  const oldTestamentBooks = ALL_BOOKS.slice(0, 39);
  const newTestamentBooks = ALL_BOOKS.slice(39);

  // Book Selection Screen
  if (screen === "books") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-white dark:bg-gray-900 overflow-x-hidden">
        <div className="w-full max-w-7xl mx-auto animate-fade-in">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8 animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-2 bg-gradient-to-r from-pastel-lavender-500 via-pastel-pink-500 to-pastel-blue-500 bg-clip-text text-transparent">
              TheLight
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
              From Scripture to Life
            </p>
          </div>

          {/* Old Testament Row */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-5 text-center">
              Old Testament
            </h2>
            <div className="relative group flex justify-center">
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth snap-x snap-mandatory">
                {oldTestamentBooks.map((book, index) => {
                  const theme = getBookTheme(book.name);
                  return (
                    <button
                      key={book.name}
                      onClick={() => handleBookClick(book.name)}
                      className={`
                        relative flex-shrink-0 w-40 md:w-44 h-auto min-h-[3.5rem] md:min-h-[4rem] rounded-lg
                        transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl
                        bg-gradient-to-br ${theme.gradient.join(" ")} text-white
                        shadow-lg animate-float-in snap-center
                        flex items-center justify-center p-3 md:p-4 overflow-hidden
                        group/item border border-white/20
                      `}
                      style={{ 
                        animationDelay: `${index * 0.01}s`,
                        animationFillMode: 'both'
                      }}
                    >
                      {/* Subtle Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_60%)]"></div>
                      </div>
                      
                      {/* Book Name - Elegant typography with proper wrapping */}
                      <div className="text-center font-semibold text-base md:text-lg leading-tight relative z-10 px-2 break-words hyphens-auto">
                        {book.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* New Testament Row */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-5 text-center">
              New Testament
            </h2>
            <div className="relative group flex justify-center">
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth snap-x snap-mandatory">
                {newTestamentBooks.map((book, index) => {
                  const theme = getBookTheme(book.name);
                  return (
                    <button
                      key={book.name}
                      onClick={() => handleBookClick(book.name)}
                      className={`
                        relative flex-shrink-0 w-40 md:w-44 h-auto min-h-[3.5rem] md:min-h-[4rem] rounded-lg
                        transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl
                        bg-gradient-to-br ${theme.gradient.join(" ")} text-white
                        shadow-lg animate-float-in snap-center
                        flex items-center justify-center p-3 md:p-4 overflow-hidden
                        group/item border border-white/20
                      `}
                      style={{ 
                        animationDelay: `${index * 0.01}s`,
                        animationFillMode: 'both'
                      }}
                    >
                      {/* Subtle Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_60%)]"></div>
                      </div>
                      
                      {/* Book Name - Elegant typography with proper wrapping */}
                      <div className="text-center font-semibold text-base md:text-lg leading-tight relative z-10 px-2 break-words hyphens-auto">
                        {book.name}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-500 animate-fade-in">
            <p>Free • No signup required • Based on King James Version</p>
          </div>
        </div>
      </main>
    );
  }

  // Chapter Selection Screen
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-white dark:bg-gray-900">
      <div className="w-full max-w-6xl mx-auto animate-slide-left">
        {/* Header with Back Button */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <span className="text-xl">←</span>
            <span className="font-semibold">Back</span>
          </button>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-serif font-bold bg-gradient-to-r from-pastel-lavender-600 via-pastel-pink-600 to-pastel-blue-600 bg-clip-text text-transparent">
              {selectedBook}
            </h1>
            <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1">
              Select a chapter (1-{maxChapters})
            </p>
          </div>
        </div>

        {/* Chapter Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3 md:gap-4 mb-8">
          {chapters.map((chapter, index) => {
            const isSelected = selectedChapter === chapter;
            return (
              <button
                key={chapter}
                onClick={() => handleChapterClick(chapter)}
                className={`
                  relative aspect-square rounded-xl font-bold text-lg md:text-xl
                  transition-all duration-200 transform hover:scale-110
                  ${isSelected 
                    ? 'bg-gradient-to-br from-pastel-mint-400 via-pastel-blue-400 to-pastel-lavender-400 text-white scale-110 shadow-2xl ring-4 ring-pastel-lavender-300 z-10' 
                    : 'bg-white/90 dark:bg-gray-700/90 text-gray-800 dark:text-gray-200 shadow-lg hover:shadow-xl'
                  }
                  animate-float-in flex items-center justify-center
                `}
                style={{ 
                  animationDelay: `${index * 0.005}s`,
                  animationFillMode: 'both'
                }}
              >
                {chapter}
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-pastel-mint-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Generate Button */}
        {selectedChapter && (
          <div className="text-center animate-scale-in">
            <button
              onClick={handleGenerate}
              className="px-12 py-4 bg-gradient-to-r from-pastel-lavender-500 via-pastel-pink-500 to-pastel-blue-500 hover:from-pastel-lavender-600 hover:via-pastel-pink-600 hover:to-pastel-blue-600 text-white font-semibold rounded-xl transition-all duration-200 text-lg md:text-xl shadow-lg hover:shadow-xl transform hover:scale-[1.05] active:scale-[0.98]"
            >
              Generate Summary
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
