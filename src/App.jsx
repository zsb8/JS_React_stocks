import React, { useState, useEffect } from "react";
import Stock from "./components/Stock/Stock";
import axios from "axios";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { toStockMultiFactos } from "./utils/toStockMultiFactos";
import StockInput from "./components/StockInput/StockInput";
import styles from "./App.module.scss";
import "./App.css";

function App() {
  const getTime = () => {
    const today = new Date();
    const timeZone = "America/Montreal11111111111111";
    const resultDateTime = format(
      utcToZonedTime(today, timeZone),
      "yyyy-MM-dd HH:mm:ss"
    );
    return resultDateTime;
  };
  const [updateTime, setUpdateTime] = useState("");

  const [stocks, setStocks] = useState([]);
  const token = process.env.REACT_APP_TOKEN;
  const fetStock = async (singleStockSymbol) => {
    const url = new URL(
      `https://finnhub.io/api/v1/quote?symbol=${singleStockSymbol}&token=${token}`
    );
    const { data } = await axios(url.href);
    const stockDate = toStockMultiFactos(singleStockSymbol, data);
    return stockDate;
  };

  useEffect(() => {
    const timer = setInterval(async () => {
      const data = await Promise.all(
        stocks.map((stock) => fetStock(stock.symbol))
      );
      setStocks(data);
      setUpdateTime(getTime);
    }, 5000);
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  });

  const handleAddStock = (singleStockSymbol) => {
    const newStock = toStockMultiFactos(singleStockSymbol, {});
    setStocks([...stocks, newStock]);
  };
  return (
    <div className={styles.main}>
      <div className={styles.watchlist}>My Stock Wathchlist</div>
      <div>Updated at {updateTime}</div>
      <div className={styles.parent}>
        <div className={styles.child}>
          <StockInput onAdd={handleAddStock} />
        </div>
        <div className={styles.child}></div>
      </div>
      <div className={styles.main}>
        <div className={styles.empty}></div>
        <div>
          {stocks.map((stock) => {
            const { symbol, currentPrice, change, percentChange } = stock;
            return (
              <Stock
                key={symbol}
                symbol={symbol}
                currentPrice={currentPrice}
                change={change}
                percentChange={percentChange}
                stocks={stocks}
                setStocks={setStocks}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
