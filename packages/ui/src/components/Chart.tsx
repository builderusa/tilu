import React from 'react';
import { cn } from '../utils/cn';

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface ChartProps {
  data: ChartData[];
  type: 'bar' | 'line' | 'pie';
  className?: string;
  height?: number;
  title?: string;
  showLegend?: boolean;
}

export const Chart: React.FC<ChartProps> = ({
  data,
  type,
  className,
  height = 300,
  title,
  showLegend = true,
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const renderBarChart = () => (
    <div className="flex items-end space-x-2 h-full">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div
            className="w-full bg-blue-500 rounded-t"
            style={{
              height: `${(item.value / maxValue) * 80}%`,
              backgroundColor: item.color || colors[index % colors.length],
            }}
          />
          <span className="text-xs mt-2 text-center">{item.label}</span>
          <span className="text-xs text-gray-500">{item.value}</span>
        </div>
      ))}
    </div>
  );

  const renderLineChart = () => (
    <div className="relative h-full">
      <svg width="100%" height="100%" className="overflow-visible">
        <polyline
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          points={data.map((item, index) => 
            `${(index / (data.length - 1)) * 100},${100 - (item.value / maxValue) * 80}`
          ).join(' ')}
        />
        {data.map((item, index) => (
          <circle
            key={index}
            cx={`${(index / (data.length - 1)) * 100}%`}
            cy={`${100 - (item.value / maxValue) * 80}%`}
            r="4"
            fill="#3B82F6"
          />
        ))}
      </svg>
      <div className="flex justify-between mt-2">
        {data.map((item, index) => (
          <div key={index} className="text-xs text-center">
            <div>{item.label}</div>
            <div className="text-gray-500">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPieChart = () => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    return (
      <div className="flex items-center justify-center h-full">
        <svg width="200" height="200" className="transform -rotate-90">
          {data.map((item, index) => {
            const percentage = item.value / total;
            const angle = percentage * 360;
            const x1 = 100 + 80 * Math.cos((currentAngle * Math.PI) / 180);
            const y1 = 100 + 80 * Math.sin((currentAngle * Math.PI) / 180);
            const x2 = 100 + 80 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
            const y2 = 100 + 80 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
            const largeArc = angle > 180 ? 1 : 0;
            
            const pathData = [
              `M 100 100`,
              `L ${x1} ${y1}`,
              `A 80 80 0 ${largeArc} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');
            
            currentAngle += angle;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={item.color || colors[index % colors.length]}
              />
            );
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className={cn('bg-white p-4 rounded-lg border', className)}>
      {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
      <div style={{ height }}>
        {type === 'bar' && renderBarChart()}
        {type === 'line' && renderLineChart()}
        {type === 'pie' && renderPieChart()}
      </div>
      {showLegend && (
        <div className="flex flex-wrap gap-4 mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: item.color || colors[index % colors.length] }}
              />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
