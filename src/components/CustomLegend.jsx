import React from "react";

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor:
                entry.payload && entry.payload.fill
                  ? entry.payload.fill
                  : entry.color,
            }}
          />
          <span className="text-sm text-gray-700 font-medium">
            {entry.value || entry.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
