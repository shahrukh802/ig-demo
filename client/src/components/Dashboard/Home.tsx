import { useCallback, useEffect, useState } from "react";
import { getData } from "../../services/ApiService";
import ChartRenderer from "../DataVisualization/Chart";
import { Loader } from "../ui/Loader";
import ReportsBar from "../ui/ReportsBar";

const Home = () => {
  const [chartData, setChartData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const getChartdata = useCallback(() => {
    setLoading(true);
    getData()
      .then((response) => {
        setChartData(response?.data);
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
    <div className="flex items-center w-full h-full justify-center mx-auto p-4 md:p-6 2xl:p-10">
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
        <div className="flex flex-col w-full h-full dark:text-white">
          <ReportsBar chartData={chartData} />

          <div className="mt-5 rounded-sm border border-stroke bg-white py-6 px-6 shadow-md dark:border-strokedark dark:bg-boxdark">
            <ChartRenderer chartData={chartData?.chart_data} type="bar" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
