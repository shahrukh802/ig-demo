import { Chart } from "react-chartjs-2";
import { Chart as ChartJS, ChartTypeRegistry, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import { getChartConfig } from "../../lib/getChartConfig";

ChartJS.register(...registerables);

interface IProps {
  chartData: any;
  type: keyof ChartTypeRegistry;
}

const ChartRenderer = ({ chartData, type }: IProps) => {
  const chartConfig = getChartConfig(chartData, type);
  return (
    <>
      {chartConfig.data && (
        <Chart
          type={chartConfig.type}
          data={chartConfig?.data}
          options={chartConfig?.options}
        />
      )}
    </>
  );
};

export default ChartRenderer;
