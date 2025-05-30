import PropTypes from 'prop-types';

// Human-friendly pollutant info
const POLLUTANT_INFO = {
  pm2_5: {
    label: "PM2.5",
    fullname: "Fine Particulate Matter",
    desc: "Tiny particles that can enter deep into the lungs.",
    unit: "μg/m³",
    maxValue: 50
  },
  pm10: {
    label: "PM10",
    fullname: "Coarse Particulate Matter",
    desc: "Larger particles that can cause respiratory issues.",
    unit: "μg/m³",
    maxValue: 100
  },
  co: {
    label: "CO",
    fullname: "Carbon Monoxide",
    desc: "A colorless, odorless gas that reduces oxygen delivery.",
    unit: "mg/m³",
    maxValue: 10
  },
  no2: {
    label: "NO₂",
    fullname: "Nitrogen Dioxide",
    desc: "A gas that irritates airways and worsens asthma.",
    unit: "μg/m³",
    maxValue: 200
  },
  so2: {
    label: "SO₂",
    fullname: "Sulfur Dioxide",
    desc: "A gas that can cause respiratory problems.",
    unit: "μg/m³",
    maxValue: 200
  },
  o3: {
    label: "O₃",
    fullname: "Ozone",
    desc: "A gas that can cause chest pain and coughing.",
    unit: "μg/m³",
    maxValue: 200
  }
};

// Helper for pollutant color
function getPollutantColor(name, value) {
  if (name === 'pm2_5' || name === 'pm10') {
    if (value <= 50) return 'bg-green-500';
    if (value <= 100) return 'bg-yellow-500';
    if (value <= 150) return 'bg-orange-500';
    return 'bg-red-600';
  }
  if (name === 'co' || name === 'no2' || name === 'so2' || name === 'o3') {
    if (value <= 50) return 'bg-green-500';
    if (value <= 100) return 'bg-yellow-500';
    if (value <= 200) return 'bg-orange-500';
    return 'bg-red-600';
  }
  return 'bg-gray-400';
}

const PollutantBreakdown = ({ pollutants }) => {
  // Filter out invalid entries
  const validPollutants = (pollutants || []).filter(
    p => p && typeof p.value === 'number'
  );

  return (
    <div className="p-6 card">
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
        Pollutant Breakdown
      </h2>
      {validPollutants.length === 0 ? (
        <div className="py-4 text-center text-gray-500">
          No pollutant data available
        </div>
      ) : (
        <div className="space-y-5">
          {validPollutants.map((pollutant) => {
            // Normalize name for info lookup
            const safeName = pollutant.name.replace('.', '_');
            const info = POLLUTANT_INFO[safeName] || {};
            const value = typeof pollutant.value === 'number' ? pollutant.value : 0;
            const maxValue = info.maxValue || 100;

            return (
              <div
                key={pollutant.name}
                className="flex flex-col gap-1 p-3 rounded-lg sm:flex-row sm:items-center sm:justify-between bg-gray-50 dark:bg-dark-800"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-gray-800 dark:text-gray-100">
                      {info.label || pollutant.label || pollutant.name}
                    </span>
                    <span className="text-base text-gray-500 dark:text-gray-400">
                      {info.fullname}
                    </span>
                  </div>
                  <div className="mt-1 text-base font-medium text-gray-600 dark:text-gray-300">
                    {info.desc}
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-2 sm:mt-0 sm:ml-4 min-w-[150px]">
                  <div className="w-24 h-2 overflow-hidden bg-gray-200 rounded-full dark:bg-dark-700">
                    <div
                      className={`h-2 ${getPollutantColor(safeName, value)} rounded-full`}
                      style={{ width: `${Math.min((value / maxValue) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="font-mono text-lg font-semibold text-gray-700 dark:text-gray-200">
                    {typeof value === "number" ? value.toFixed(1) : "-"} {info.unit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

PollutantBreakdown.propTypes = {
  pollutants: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
      label: PropTypes.string
    })
  )
};

export default PollutantBreakdown;
