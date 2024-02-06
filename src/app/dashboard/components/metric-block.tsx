import React from "react";

export interface MetricInterface {
  image_path: string; //url or image path
  value: number;
  metric_name: string;
}

export const metricDummyBottles: MetricInterface = {
  image_path: "assets/bottles.png",
  value: 42,
  metric_name: "bottles",
};

export const metricDummyCans: MetricInterface = {
  image_path: "assets/cans.png",
  value: 16,
  metric_name: "cans",
};

export const metricDummyCompost: MetricInterface = {
  image_path: "assets/food.png",
  value: 22,
  metric_name: "kg",
};

export const metricGoal2: MetricInterface = {
  image_path: "assets/E_PRINT_02.jpg",
  value: 10,
  metric_name: "Events",
};

export const metricGoal13: MetricInterface = {
  image_path: "assets/E_PRINT_13.jpg",
  value: 8,
  metric_name: "Events",
};

export const metricGoal12: MetricInterface = {
  image_path: "assets/E_WEB_12.png",
  value: 3,
  metric_name: "Events",
};

const MetricBlock: React.FC<MetricInterface> = (props) => {
  const image_path = props.image_path;
  const value = props.value;
  const metric_name = props.metric_name;

  return (
    <div className="metric-block flex h-full items-start justify-center">
      <div className="mb-4 flex items-center rounded-md p-4">
        <div className="mr-4">
          <img src={image_path} alt="Metric Image" className="h-16 w-16" />
        </div>
        <div className="flex flex-row justify-between">
          <div className="mt-auto flex items-center">
            <h1 className="mr-2 text-6xl font-bold text-white">{value}</h1>
          </div>
          <div className="mt-auto">
            <h3 className="text-lg text-white">{metric_name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricBlock;
