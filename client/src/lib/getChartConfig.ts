import { ChartConfiguration, ChartTypeRegistry } from "chart.js";

export const getChartConfig = (chartData: any, type: keyof ChartTypeRegistry) => {
    const chartConfig: ChartConfiguration = {
        type: type,
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