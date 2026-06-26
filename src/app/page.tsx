"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push("/search");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <Hero />
          
          <div className="max-w-3xl mx-auto mb-12 mt-4 relative z-10 text-center">
            <button
              onClick={handleSearchClick}
              className="inline-flex items-center space-x-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl text-sm"
            >
              <span>Start Searching</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

