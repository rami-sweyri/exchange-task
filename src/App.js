import { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import './App.css';
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c965rdqad3icjtt5jl2g"
const finnhubClient = new finnhub.DefaultApi()

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },

};

function App() {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const [exchanges, setExchanges] = useState([])
  const [exchange, setExchange] = useState('')
  const [symbols, setSymbols] = useState([])
  const [symbolName, setSymbolName] = useState('')
  const [symbol, setSymbol] = useState('')

  const [chartData, setChartData] = useState({})

  const [activeLabel, setActiveLabel] = useState('D')

  const labels = [1, 5, 15, 30, 60, 'D', 'W', 'M'];

  const data = {
    labels: labels,
    showLabel: false,
    datasets: [
      {
        label: symbolName,
        data: chartData?.c ?? [
          1.10713,
          1.10288,
          1.10397,
          1.10182
        ],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },

    ],
  };
  useEffect(() => {
    finnhubClient.forexExchanges((error, data, response) => {
      setExchanges(data)
    });
  }, [])

  useEffect(() => {
    if (exchange !== "") {
      finnhubClient.forexSymbols(exchange, (error, data, response) => {
        setSymbols(data)
      });
    }

  }, [exchange])

  console.log({ exchanges, symbols })

  useEffect(() => {

    finnhubClient.forexCandles(symbol, activeLabel, 1590988249, 1591852249, (error, data, response) => {
      setChartData({ data })
    });
  }, [symbol, activeLabel])

  return (
    <div className="flex md:flex-row flex-col items-center justify-center p-6 bg-slate-100 min-h-screen">
      <div className="md:w-4/12 w-full flex flex-col p-6">
        <div className="my-2 w-full">
          <select
            type="text"
            className="w-full px-2 py-3 text-gray-700 rounded border border-neutral-500 hover:border-blue-400 focus:border-blue-400 outline-none appearance-none"
            placeholder="Select Exchange"
            onChange={(e) => setExchange(e.target.value)}
            value={exchange}
          >
            <option value="">Select Exchange</option>
            {
              exchanges?.map?.((item, i) =>
                <option value={item} key={i + item}>
                  {item}
                </option>
              ) ?? ""
            }
          </select>
        </div>
        <div className="my-2 w-full">
          <select
            type="text"
            className="w-full px-2 py-3 text-gray-700 rounded border border-neutral-500 hover:border-blue-400 focus:border-blue-400 outline-none appearance-none"
            placeholder="Select Symbol"
            onChange={(e) => {

              setSymbolName(symbols.find(item => item.symbol === e.target.value)?.displaySymbol)
              setSymbol(e.target.value)




            }}

          >
            <option value="">Select Symbol</option>
            {
              symbols?.map?.((item, i) =>
                <option value={item.symbol} key={i + item}>
                  {item.description}
                </option>
              ) ?? ""
            }
          </select>
        </div>
      </div>
      <div className="md:w-8/12 w-full p-6">

        {symbolName && <div className="flex flex-col gap-2">
          <div className="flex items-center">
            {symbolName.split('/').map(cu =>
              <div class={`currency-flag rounded-full !h-12 bg-center !w-12 mr-2 currency-flag-${cu.toLocaleLowerCase()}`}></div>
            )}

          </div>
          <p className="text-2xl text-gray-600 font-semibold font-mono">
            {symbolName}
          </p>
        </div>}

        <Line
          options={options}
          data={data}

        />
        <div className="flex w-full items-center justify-between mt-3">
          {labels.map(label => <div className={`text-gray-500 cursor-pointer text-sm px-2 py-2 ${activeLabel === label ? 'bg-gray-300 rounded' : ''}`} onClick={() => { setActiveLabel(label) }}>{label}</div>)}
        </div>
      </div>
    </div>
  );
}

export default App;
