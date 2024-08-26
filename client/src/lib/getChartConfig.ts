import { ChartConfiguration } from "chart.js";

export const getChartConfig = (chartData: any) => {
    const chartConfig: ChartConfiguration = {
        type: "bar",
        data: chartData,
        options: {
            scales: {
                x: {
                    grid: {
                        display: false,
                    },
                },
                y: {
                    beginAtZero: true,
                }
            }
        }
    };
    return chartConfig
}