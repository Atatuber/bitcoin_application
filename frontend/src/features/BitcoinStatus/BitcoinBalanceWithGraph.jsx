import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function BitcoinBalanceWithGraph({ wallets }) {
  const [balance, setBalance] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [timePeriod, setTimePeriod] = useState(30);

  const btcBalances = wallets
    .filter((wallet) => wallet.balance > 0)
    .map((wallet) => wallet.balance)
    .reduce((acc, value) => acc + value, 0);

  const btcToEuros = async (balance) => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Bitcoin price");
      }

      const data = await response.json();
      const btcPriceInEuros = data.bitcoin.eur;

      const balanceInEuros = balance * btcPriceInEuros;
      return balanceInEuros;
    } catch (error) {
      console.error("Error converting BTC to Euros:", error);
      throw error;
    }
  };

  const fetchBitcoinPriceHistory = async (days = 30) => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eur&days=${days}&interval=daily`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Bitcoin price history");
      }

      const data = await response.json();
      const prices = data.prices;

      const labels = prices.map((price) =>
        new Date(price[0]).toLocaleDateString()
      );
      const dataset = prices.map((price) => price[1]);

      setChartData({
        labels,
        datasets: [
          {
            label: "Bitcoin Price (EUR)",
            data: dataset,
            borderColor: "orange",
            backgroundColor: "rgba(255, 165, 0, 0.2)",
            fill: true,
            tension: 0.4,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching Bitcoin price history:", error);
    }
  };

  useEffect(() => {
    const getBalance = async () => {
      const balance = await btcToEuros(btcBalances);
      setBalance(balance);
    };

    getBalance();
    fetchBitcoinPriceHistory(timePeriod);
  }, [btcBalances, timePeriod]);

  const handleTimePeriodChange = (days) => {
    setTimePeriod(days);
    fetchBitcoinPriceHistory(days);
  };

  return (
    <section className="container bg-white rounded-lg shadow-md m-2 p-4 flex flex-col justify-center items-center">
      <div className="flex justify-between text-left w-full">
        <div className="flex flex-col">
          <p className="text-gray-600 font-medium text-lg">
            The balance for all your wallets.
          </p>
          <h1 className="text-4xl font-semibold">€ {balance.toFixed(2)} </h1>
        </div>
        <div className="flex justify-end items-center">
          <button
            onClick={() => handleTimePeriodChange(7)}
            className={`px-4 py-2 mx-1 rounded hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out ${
              timePeriod === 7 ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
          >
            7D
          </button>
          <button
            onClick={() => handleTimePeriodChange(30)}
            className={`px-4 py-2 mx-1 rounded hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out ${
              timePeriod === 30 ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
          >
            30D
          </button>
          <button
            onClick={() => handleTimePeriodChange(90)}
            className={`px-4 py-2 mx-1 rounded hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out ${
              timePeriod === 90 ? "bg-indigo-600 text-white" : "bg-gray-200"
            }`}
          >
            90D
          </button>
        </div>
      </div>
      {!chartData ||
      chartData.labels.length <= 0 ||
      chartData.datasets.length <= 0 ? (
        <p className="text-gray-600">Error loading bitcoin prices.</p>
      ) : (
        <div className="w-full mt-4">
          <h2 className="text-gray-600 font-medium text-lg">Bitcoin prices</h2>
          <Line
            className="w-full max-h-[300px]"
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: true,
                  mode: "index",
                  intersect: false,
                  callbacks: {
                    title: (context) => {
                      return `Date: ${context[0].label}`;
                    },
                    label: (context) => {
                      return `Price: €${context.raw.toFixed(2)}`;
                    },
                  },
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                },
                y: {
                  grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                  },
                },
              },
              elements: {
                point: {
                  radius: 0,
                  hoverRadius: 5,
                },
              },
              interaction: {
                mode: "nearest",
                axis: "x",
              },
            }}
          />
        </div>
      )}
    </section>
  );
}
