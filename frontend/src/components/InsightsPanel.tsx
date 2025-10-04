import { Lightbulb, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface InsightsPanelProps {
  insights: string;
  profile: any;
}

export function InsightsPanel({ insights, profile }: InsightsPanelProps) {
  const numericColumns = profile.columns.filter((c: any) => c.type === 'numeric');
  const categoricalColumns = profile.columns.filter((c: any) => c.type === 'categorical');
  const missingDataColumns = profile.columns.filter((c: any) => c.missingPercent > 5);

  return (
    <div className="space-y-6">
      {/* Main Insights */}
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-6 border border-orange-200">
        <div className="flex items-start gap-3">
          <div className="bg-orange-500 p-2 rounded-lg">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">Key Insights</h3>
            <p className="text-gray-700 leading-relaxed">{insights}</p>
          </div>
        </div>
      </div>

      {/* Column Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Numeric Columns */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <h4 className="font-semibold text-gray-900">Numeric Columns</h4>
          </div>
          <div className="space-y-2">
            {numericColumns.map((col: any) => (
              <div key={col.name} className="text-sm">
                <div className="font-medium text-gray-700">{col.name}</div>
                {col.stats && (
                  <div className="text-gray-600 text-xs">
                    Range: {col.stats.min?.toFixed(2)} - {col.stats.max?.toFixed(2)} | 
                    Avg: {col.stats.mean?.toFixed(2)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Categorical Columns */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <h4 className="font-semibold text-gray-900">Categorical Columns</h4>
          </div>
          <div className="space-y-2">
            {categoricalColumns.map((col: any) => (
              <div key={col.name} className="text-sm">
                <div className="font-medium text-gray-700">{col.name}</div>
                <div className="text-gray-600 text-xs">
                  {col.uniqueCount} unique values
                  {col.topValues && col.topValues[0] && (
                    <> | Top: {col.topValues[0].value}</>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Data Quality */}
      {missingDataColumns.length > 0 && (
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Data Quality Notes</h4>
              <p className="text-sm text-gray-700 mb-2">
                The following columns have missing values:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                {missingDataColumns.map((col: any) => (
                  <li key={col.name}>
                    <span className="font-medium">{col.name}</span>: {col.missingPercent.toFixed(1)}% missing
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Column Details Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900">Column Details</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Column</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Type</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Unique</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">Missing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {profile.columns.map((col: any) => (
                <tr key={col.name} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-gray-900">{col.name}</td>
                  <td className="px-4 py-2 text-gray-600">
                    <span className={`px-2 py-1 rounded text-xs ${
                      col.type === 'numeric' ? 'bg-blue-100 text-blue-700' :
                      col.type === 'categorical' ? 'bg-green-100 text-green-700' :
                      col.type === 'datetime' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {col.type}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-600">{col.uniqueCount}</td>
                  <td className="px-4 py-2 text-gray-600">{col.missingPercent.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
