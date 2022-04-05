import { useState } from 'react';
import './App.css';
const finnhub = require('finnhub');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = "c963nuaad3icjtt5i9v0"
const finnhubClient = new finnhub.DefaultApi()
function App() {

  const [exchanges, setExchanges] = useState([])
  const [exchange, setExchange] = useState('')

  finnhubClient.forexExchanges((error, data, response) => {
    setExchanges(data)
  });
  console.log({ exchanges })

  return (
    <div className="flex items-center justify-center p-6 bg-slate-100 min-h-screen">
      <div className="w-4/12 flex flex-col">
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
              exchanges.map((exchange, i) =>
                <option value={exchange} key={i + exchange}>
                  {exchange}
                </option>
              )
            }
          </select>
        </div>
        <div className="my-2 w-full">
          <input
            type="text"
            className="w-full px-2 py-3 text-gray-700 rounded border border-neutral-500 hover:border-blue-400 focus:border-blue-400 outline-none appearance-none"
            placeholder="Select Symbol"

          />
        </div>
      </div>
      <div className="w-8/12"></div>
    </div>
  );
}

export default App;
