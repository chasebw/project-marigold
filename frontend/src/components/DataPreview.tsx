interface DataPreviewProps {
  data: any[];
  profile: any;
}

export function DataPreview({ data, profile }: DataPreviewProps) {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No data to preview
      </div>
    );
  }

  const columns = profile.columns.map((c: any) => c.name);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Data Preview (First 10 rows)</h3>
        <span className="text-sm text-gray-600">
          Showing {data.length} of {profile.totalRows} rows
        </span>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-700 w-12">#</th>
              {columns.map((col: string) => (
                <th key={col} className="px-4 py-2 text-left font-medium text-gray-700">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-500 font-mono text-xs">{i + 1}</td>
                {columns.map((col: string) => (
                  <td key={col} className="px-4 py-2 text-gray-900">
                    {row[col] !== null && row[col] !== undefined 
                      ? String(row[col]) 
                      : <span className="text-gray-400 italic">null</span>
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
