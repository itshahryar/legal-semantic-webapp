import { useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, Tag, Scale } from 'lucide-react';
import { sanitizeString } from '@/lib/utils';

interface DocumentViewProps {
  document: {
    metadata: {
      title: string;
      plaintiff: string;
      defendant: string;
      date: string;
      topic: string;
      outcome: string;
      pageContent: string;
    };
    content: string;
  };
  quote: string;
  onBack: () => void;
}

export default function DocumentView({ document, quote, onBack }: DocumentViewProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const highlight = contentRef.current.querySelector('.highlight');
      if (highlight) {
        highlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [quote]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button 
            onClick={onBack} 
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors mb-4 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to search</span>
          </button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 mb-4">{document.metadata.title}</h1>
              
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                  <Tag className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">{document.metadata.topic}</span>
                </div>
                <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg ${
                  document.metadata.outcome?.toLowerCase().includes('favor') ? 'bg-emerald-50' :
                  document.metadata.outcome?.toLowerCase().includes('against') ? 'bg-red-50' :
                  'bg-slate-100'
                }`}>
                  <Scale className="h-4 w-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">{document.metadata.outcome}</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-100 rounded-lg">
                  <Calendar className="h-4 w-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">{formatDate(document.metadata.date)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8" ref={contentRef}>
          <div 
            className="prose prose-slate max-w-none text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: sanitizeString(document.metadata.pageContent) }} 
          />
        </div>
      </div>
    </div>
  );
}
