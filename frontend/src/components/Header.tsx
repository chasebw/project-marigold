import { Flower2, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  showReset: boolean;
}

export function Header({ onReset, showReset }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-orange-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-orange-400 to-yellow-500 p-2 rounded-lg">
            <Flower2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Marigold</h1>
            <p className="text-sm text-gray-600">AI Data Analyst Assistant</p>
          </div>
        </div>
        
        {showReset && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            New Analysis
          </button>
        )}
      </div>
    </header>
  );
}
