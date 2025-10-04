import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileSpreadsheet, Loader2 } from 'lucide-react';
import axios from 'axios';
import Papa from 'papaparse';
import { AnalysisResult } from '../App';

interface FileUploadProps {
  onAnalysisComplete: (result: AnalysisResult, data: any[]) => void;
}

export function FileUpload({ onAnalysisComplete }: FileUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      // Parse CSV locally first
      const text = await file.text();
      const parseResult = Papa.parse(text, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
      });

      // Upload to backend for analysis
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post<AnalysisResult>('/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      onAnalysisComplete(response.data, parseResult.data);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze file');
    } finally {
      setLoading(false);
    }
  }, [onAnalysisComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024 // 50MB
  });

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          Transform Your Data Into Insights
        </h2>
        <p className="text-lg text-gray-600">
          Upload a CSV file and let AI analyze it for you
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
          transition-all duration-200
          ${isDragActive 
            ? 'border-orange-500 bg-orange-50 scale-105' 
            : 'border-gray-300 bg-white hover:border-orange-400 hover:bg-orange-50/50'
          }
          ${loading ? 'pointer-events-none opacity-60' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-4">
          {loading ? (
            <>
              <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />
              <p className="text-lg font-medium text-gray-700">Analyzing your data...</p>
            </>
          ) : (
            <>
              <div className="bg-gradient-to-br from-orange-400 to-yellow-500 p-4 rounded-full">
                {isDragActive ? (
                  <FileSpreadsheet className="w-12 h-12 text-white" />
                ) : (
                  <Upload className="w-12 h-12 text-white" />
                )}
              </div>
              
              <div>
                <p className="text-lg font-medium text-gray-700 mb-1">
                  {isDragActive ? 'Drop your CSV file here' : 'Drag & drop your CSV file'}
                </p>
                <p className="text-sm text-gray-500">
                  or click to browse (max 50MB)
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-orange-500 font-semibold mb-1">📊 Auto Charts</div>
          <p className="text-sm text-gray-600">Automatically generated visualizations</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-orange-500 font-semibold mb-1">💡 AI Insights</div>
          <p className="text-sm text-gray-600">Smart analysis and recommendations</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-orange-500 font-semibold mb-1">💬 Chat Interface</div>
          <p className="text-sm text-gray-600">Ask questions about your data</p>
        </div>
      </div>
    </div>
  );
}
