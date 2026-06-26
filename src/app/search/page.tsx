"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import SearchForm from "@/components/SearchForm";
import ResultCard from "@/components/ResultCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import DocumentView from "@/components/DocumentView";
import { type Document } from "../types/document";

interface SearchResult {
  metadata: Document["metadata"];
  content: string;
}

const suggestedSearches = [
  "Cases about personal freedoms being violated",
  "Cases involving a US President",
  "Cases involving guns",
  "Cases where Nixon was the defendant",
  "How much power does the commerce clause give Congress?",
  "Cases about personal rights or congressional overreach?",
  "Cases involving the ability to pay for an attorney",
  "Cases about the right to remain silent",
  "Landmark cases that shaped freedom of speech laws",
  "Cases where defendant was found with a gun",
  "What cases involved personal rights or congressional overreach?",
  "Cases where the judge expressed grave concern",
];

const runBootstrapProcedure = async () => {
  const response = await fetch("/api/bootstrap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const body = await response.json();
    console.log(body);
    throw new Error(`API request failed with status ${response.status}`);
  }
};

const checkAndBootstrapIndex = async (
  setIsBootstrapping: (isBootstrapping: boolean) => void,
  setIsIndexReady: (isIndexReady: boolean) => void
) => {
  setIsBootstrapping(true);
  await runBootstrapProcedure();
  setIsBootstrapping(false);
  setIsIndexReady(true);
};

const handleSearch = async (
  query: string,
  setResults: (results: SearchResult[]) => void,
  setIsSearching: (isSearching: boolean) => void
) => {
  setIsSearching(true);
  const response = await fetch("/api/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const body = await response.json();
    console.log(body);
    throw new Error(`API request failed with status ${response.status}`);
  }

  const { results } = await response.json();
  setResults(results);
  setIsSearching(false);
};

export default function SearchPage() {
  const [isBootstrapping, setIsBootstrapping] = useState(false);
  const [isIndexReady, setIsIndexReady] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<SearchResult | null>(
    null
  );

  useEffect(() => {
    checkAndBootstrapIndex(setIsBootstrapping, setIsIndexReady);
  }, []);

  const clearResults = () => {
    setQuery("");
    setResults([]);
  };

  if (selectedDocument) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <DocumentView
          document={selectedDocument}
          quote={selectedDocument.metadata.pageContent}
          onBack={() => setSelectedDocument(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-12">
          {isBootstrapping && (
            <LoadingSpinner message="Processing legal documents..." />
          )}
        </div>

        {isIndexReady && !isBootstrapping && (
          <div className="w-full">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Search Legal Documents</h1>
              <p className="text-slate-600">Find relevant cases and precedents using natural language</p>
            </div>
            
            <div className="max-w-3xl mx-auto mb-12 relative z-10">
              <SearchForm
                suggestedSearches={suggestedSearches}
                onSearch={(query: string) => {
                  handleSearch(query, setResults, setIsSearching);
                  setQuery(query);
                }}
              />
            </div>

            {isSearching && (
              <div className="flex justify-center mb-12">
                <LoadingSpinner message="Searching documents..." />
              </div>
            )}

            {results.length > 0 && query && (
              <>
                <div className="flex justify-between items-center mb-8 bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-200">
                  <p className="text-slate-700">
                    Found <span className="font-bold text-slate-900">{results.length}</span> result{results.length > 1 ? "s" : ""}{" "}
                    for{" "}
                    <span className="font-semibold text-slate-900">
                      "{query}"
                    </span>
                  </p>
                  <button
                    onClick={clearResults}
                    className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-lg"
                    aria-label="Clear results"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16">
                  {results.map((result, index) => (
                    <ResultCard
                      key={index}
                      metadata={result.metadata}
                      content={result.content}
                      onClick={() => setSelectedDocument(result)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
