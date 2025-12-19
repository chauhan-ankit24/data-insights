import { useState } from "react";
import { Insight } from "insight-sdk";
import {
  trendDataResolver,
  contributorDataResolver,
  dimensionValuesResolver,
} from "./resolvers";

const DemoApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"trend" | "contributor">("trend");

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Insight SDK Demo
          </h1>
          <p className="text-gray-600">
            A powerful React SDK for building data insights and visualizations
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("trend")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "trend"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Trend Insight
            </button>
            <button
              onClick={() => setActiveTab("contributor")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "contributor"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Contributor Insight
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {activeTab === "trend" && (
            <div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Trend Insight
                </h3>
                <p className="text-sm text-blue-800">
                  Visualizes a single metric over time using a line chart.
                  Perfect for tracking KPIs, performance metrics, and
                  time-series data.
                </p>
              </div>

              <Insight
                type="trend"
                metric="Revenue"
                timeGrain="weekly"
                timeRange={100}
                dataResolver={trendDataResolver}
                // refreshInterval={3000}
              />
            </div>
          )}

          {activeTab === "contributor" && (
            <div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-900 mb-2">
                  Contributor Insight
                </h3>
                <p className="text-sm text-green-800">
                  Shows how different dimension values contribute to a metric
                  over time. Uses stacked bar charts to compare contributions
                  across categories.
                </p>
              </div>

              <>
                <Insight
                  type="contributor"
                  metric="Revenue"
                  dimension="location"
                  timeGrain="weekly"
                  // width="800px"
                  // height="500px"
                  timeRange={60}
                  dataResolver={contributorDataResolver}
                  dimensionValuesResolver={dimensionValuesResolver}
                />
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoApp;
