import { Calendar, Tag, FileText, ArrowRight } from 'lucide-react';
import { type Document } from '@/app/types/document';
import { sanitizeString } from '@/lib/utils';

interface ResultCardProps {
  metadata: Document["metadata"];
  content: string;
  onClick: () => void;
}

const ResultCard = ({ metadata, content, onClick }: ResultCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
              {metadata.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                <Tag className="h-3 w-3 mr-1" />
                {metadata.topic}
              </span>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                metadata.outcome?.toLowerCase().includes('favor') ? 'bg-emerald-50 text-emerald-700' :
                metadata.outcome?.toLowerCase().includes('against') ? 'bg-red-50 text-red-700' :
                'bg-slate-100 text-slate-700'
              }`}>
                {metadata.outcome}
              </span>
            </div>
          </div>
          <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRight className="h-5 w-5 text-slate-400" />
          </div>
        </div>

        <div className="relative mb-4">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-slate-900 to-slate-600 rounded-full"></div>
          <blockquote className="pl-4 py-3 bg-slate-50 rounded-r-xl border-l-4 border-slate-200">
            <p className="text-slate-700 text-sm leading-relaxed line-clamp-4 italic">
              "{sanitizeString(metadata.pageContent)}"
            </p>
          </blockquote>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="flex items-center space-x-4 text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(metadata.date)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
            <span>View details</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
