import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';

export interface AnalysisResult {
  profile: any;
  charts: any[];
  insights: string;
  preview: any[];
  rowCount: number;
  columnCount: number;
}

function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [csvData, setCsvData] = useState<any[] | null>(null);

  const handleAnalysisComplete = (result: AnalysisResult, data: any[]) => {
    setAnalysisResult(result);
    setCsvData(data);
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setCsvData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header onReset={handleReset} showReset={!!analysisResult} />
      
      <main className="container mx-auto px-4 py-8">
        {!analysisResult ? (
          <FileUpload onAnalysisComplete={handleAnalysisComplete} />
        ) : (
          <Dashboard 
            result={analysisResult} 
            csvData={csvData || []} 
          />
        )}
      </main>
    </div>
  );
}

export default App;
