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
  // 时间
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

  // 从接口拿数据
  const [stocks, setStocks] = useState([]);
  const token = process.env.REACT_APP_TOKEN;
  const fetStock = async (singleStockSymbol) => {
    const url = new URL(
      `https://finnhub.io/api/v1/quote?symbol=${singleStockSymbol}&token=${token}`
    );
    const { data } = await axios(url.href);
    console.log("用axois抓到的数据包：", data);
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
    }, 5000); //这里是定时

    // 切记一定要在渲染结束后清除timer，否则背后还是会有旧的线程一直在执行，这意味着每五秒有一个新的线程在定时哦。
    // 那么就导致一直越来越多的线程并这么恶性循环下去。效果就是无法实现每5秒的效果，很傻的。而且内存会被占满。
    // 所以切记切记，定时记得要清零
    // 为啥选择return的时候，是因为return后就渲染结束会销毁组件，所以这时机做cleanInterval最好。
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  });

  const handleAddStock = (singleStockSymbol) => {
    const newStock = toStockMultiFactos(singleStockSymbol, {});
    setStocks([...stocks, newStock]); //目的是为了拼接，这里使用了...展开
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
