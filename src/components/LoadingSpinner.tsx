import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message: string;
}

const LoadingSpinner = ({ message }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center space-x-3 bg-white px-6 py-4 rounded-2xl shadow-lg border border-slate-200">
      <Loader2 className="h-5 w-5 text-slate-900 animate-spin" />
      <p className="text-slate-700 font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
