import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';

interface ChartGridProps {
  charts: any[];
}

export function ChartGrid({ charts }: ChartGridProps) {
  const renderChart = (chart: any) => {
    const commonProps = {
      data: chart.data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chart.type) {
      case 'bar':
      case 'histogram':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={chart.type === 'histogram' ? 'range' : 'name'} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={chart.type === 'histogram' ? 'count' : 'value'} fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" name={chart.xColumn} />
              <YAxis dataKey="y" name={chart.yColumn} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name={chart.title} data={chart.data} fill="#f59e0b" />
            </ScatterChart>
          </ResponsiveContainer>
        );

      default:
        return <div className="text-gray-500">Chart type not supported</div>;
    }
  };

  const handleExport = (chart: any) => {
    // Simple export - in production, you'd use a proper chart export library
    const dataStr = JSON.stringify(chart.data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${chart.id}-data.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (charts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No charts available. Try uploading a different dataset.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {charts.map(chart => (
        <div key={chart.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-900">{chart.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{chart.description}</p>
            </div>
            <button
              onClick={() => handleExport(chart)}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              title="Export chart data"
            >
              <Download className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          {renderChart(chart)}
        </div>
      ))}
    </div>
  );
}
