import { useState } from 'react';
import { AnalysisResult } from '../App';
import { ChartGrid } from './ChartGrid';
import { InsightsPanel } from './InsightsPanel';
import { ChatPanel } from './ChatPanel';
import { DataPreview } from './DataPreview';
import { BarChart3, MessageSquare, Table, Lightbulb } from 'lucide-react';

interface DashboardProps {
  result: AnalysisResult;
  csvData: any[];
}

type Tab = 'charts' | 'chat' | 'data' | 'insights';

export function Dashboard({ result, csvData }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('charts');

  const tabs = [
    { id: 'charts' as Tab, label: 'Charts', icon: BarChart3 },
    { id: 'insights' as Tab, label: 'Insights', icon: Lightbulb },
    { id: 'chat' as Tab, label: 'Chat', icon: MessageSquare },
    { id: 'data' as Tab, label: 'Data', icon: Table },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Total Rows</div>
          <div className="text-2xl font-bold text-gray-900">{result.rowCount.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Columns</div>
          <div className="text-2xl font-bold text-gray-900">{result.columnCount}</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Charts Generated</div>
          <div className="text-2xl font-bold text-gray-900">{result.charts.length}</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="text-sm text-gray-600 mb-1">Data Quality</div>
          <div className="text-2xl font-bold text-green-600">Good</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-3 font-medium transition-colors
                    ${activeTab === tab.id
                      ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'charts' && <ChartGrid charts={result.charts} />}
          {activeTab === 'insights' && <InsightsPanel insights={result.insights} profile={result.profile} />}
          {activeTab === 'chat' && <ChatPanel csvData={csvData} profile={result.profile} />}
          {activeTab === 'data' && <DataPreview data={result.preview} profile={result.profile} />}
        </div>
      </div>
    </div>
  );
}
