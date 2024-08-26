import { Chart } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import { getChartConfig } from "../../lib/getChartConfig";

ChartJS.register(...registerables);

interface IProps {
  chartData: any;
}

const ChartRenderer = ({ chartData }: IProps) => {
  const chartConfig = getChartConfig(chartData);

  return (
    <div className="w-full p-4 md:p-10">
      <Chart
        type="bar"
        data={chartConfig?.data}
        options={chartConfig?.options}
      />
    </div>
  );
};

export default ChartRenderer;
