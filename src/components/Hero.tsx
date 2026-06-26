import { BookOpen, Scale, Gavel } from 'lucide-react';

const Hero = () => {
  return (
    <div id="hero-section" className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="absolute inset-0 bg-grid-slate-200/[0.4] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
            <Scale className="h-4 w-4" />
            <span>AI-Powered Legal Research</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-3 tracking-tight leading-tight">
            Intelligent Legal Document
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 leading-tight">
              Search & Analysis
            </span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-10">
            <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="bg-blue-50 p-2 rounded-lg mb-3">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1 text-sm">Extensive Database</h3>
              <p className="text-xs text-slate-600 text-center">Access landmark Supreme Court cases and legal precedents</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="bg-emerald-50 p-2 rounded-lg mb-3">
                <Gavel className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1 text-sm">Case Analysis</h3>
              <p className="text-xs text-slate-600 text-center">Understand verdicts, topics, and legal outcomes</p>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="bg-purple-50 p-2 rounded-lg mb-3">
                <Scale className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1 text-sm">Semantic Search</h3>
              <p className="text-xs text-slate-600 text-center">Find relevant cases using natural language queries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
