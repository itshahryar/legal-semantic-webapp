import { useState, ChangeEvent, FormEvent } from 'react';
import { Search, X, Sparkles } from 'lucide-react';

interface SearchFormProps {
  suggestedSearches: string[];
  onSearch: (query: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ suggestedSearches, onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const [suggestions] = useState<string[]>(suggestedSearches);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
    setQuery("");
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    setShowSuggestions(true);
  };

  const handleClear = () => {
    setQuery("");
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setQuery("");
    setShowSuggestions(false);
  };

  return (
    <div id="search-form" className="w-full max-w-3xl mx-auto px-4 sm:px-0">
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-700 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
          <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="pl-4 sm:pl-5 pr-2 sm:pr-3">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={handleFocus}
              className="flex-1 px-2 sm:px-3 py-3 sm:py-4 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
              placeholder="Search legal documents..."
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 sm:p-3 mr-1 sm:mr-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={!query}
              className="px-4 sm:px-6 py-3 sm:py-4 bg-slate-900 text-white font-medium rounded-r-2xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-1 sm:space-x-2"
            >
              <span className="hidden sm:inline">Search</span>
              <Search className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="mt-3 w-full bg-white rounded-xl shadow-xl border border-slate-200 max-h-80 overflow-y-auto z-10 relative">
            <div className="px-4 sm:px-5 py-2 sm:py-3 border-b border-slate-100 flex items-center space-x-2">
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
              <span className="text-xs sm:text-sm font-semibold text-slate-700">Popular searches</span>
            </div>
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 sm:px-5 py-2 sm:py-3 hover:bg-slate-50 cursor-pointer text-slate-700 text-xs sm:text-sm border-b border-slate-50 last:border-0 transition-colors flex items-start space-x-2 sm:space-x-3"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Search className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-2">{suggestion}</span>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchForm;
