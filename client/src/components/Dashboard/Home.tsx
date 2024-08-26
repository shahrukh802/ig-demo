import React, { useCallback, useEffect, useState } from "react";
import { getData } from "../../services/ApiService";
import ChartRenderer from "../DataVisualization/Chart";
import { Loader } from "../ui/Loader";

const Home = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const getChartdata = useCallback(() => {
    getData()
      .then((response) => {
        setChartData(response?.data?.chart_data);
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(
          error?.response?.data?.detail
            ? error?.response?.data?.detail
            : error?.detail
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [chartData]);

  useEffect(() => {
    getChartdata();
  }, []);

  return (
    <div className="flex items-center w-full h-full mx-auto justify-center">
      {loading ? (
        <Loader />
      ) : errorMessage ? (
        <div
          className="mb-4 rounded-lg bg-red-200 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-500"
          role="alert"
        >
          {errorMessage}
        </div>
      ) : (
        <ChartRenderer chartData={chartData} />
      )}
    </div>
  );
};

export default Home;
