import React, { useEffect, useState } from "react";
import styles from "./Stock.module.scss";
import { format } from "date-fns";
import { Input, Button } from "antd";
import ShowSingleSymbol from "../../components/ShowSingleSymbol";
const Stocks = () => {
  const dateTimeNow = new Date();
  const resultDateTime = format(dateTimeNow, "p");
  const priceC = 0;
  const priceD = 0;
  const priceDp = 0;
  const temp = [{ symbol: "APPL", c: 111, d: 111, dp: 111 }];
  const initialSymbols = ["APPL", "TSLA", "AMZN", "FB"];
  const [symbols, setSymbols] = useState(initialSymbols);
  const [symbolList, setSymbolInfo] = useState(temp);
  const [tempSymbol, setTempSymbol] = useState("");

  const handleChange = (event) => {
    //event.target.value
    //event.target.name
    console.log("handleChange里面的symbols=:", symbols);
    setTempSymbol(event.target.value);
  };

  useEffect(() => {
    const updateSymbols = (data) => {
      console.log("数据data:", data);
      const arrangeResult = arrange(data); // 排序处理
      setSymbolInfo(arrangeResult);
    };
    const arrange = (data) => {
      // 这是一个排序函数
      let tmpList = [];
      for (var symbolOne of symbols) {
        for (var a of data) {
          if (a.symbol === symbolOne) {
            tmpList = tmpList.concat(a);
          }
        }
      }
      return tmpList;
    };
    const getData = async () => {
      try {
        const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}finhub`);
        const body = {
          symbol: symbols,
        };
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const status = await response.status;
        const data = await response.json();
        if (status === 200) {
          updateSymbols(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const timer = setInterval(() => {
      getData();
    }, 5000);
    // getData();
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [symbols]);

  const addSymbol = () => {
    console.log("tempSymbol=:", tempSymbol);
    if (tempSymbol.length != 0) {
      symbols.push(tempSymbol);
    }
  };

  console.log("列表是symbols=:", symbols);

  return (
    <div className={styles.main}>
      <div className={styles.watchlist}>My Stock Wathchlist</div>
      <div>Updated at {resultDateTime}</div>
      <div className={styles.parent}>
        <div className={styles.child}>
          {" "}
          <div className={styles.input_section}>
            <div className={styles.input}>
              <Input placeholder="Basic usage" onChange={handleChange} />
            </div>
            <div>
              <Button type="primary" size="large" onClick={() => addSymbol()}>
                Add
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.child}>2</div>
      </div>
      <div className={styles.main}>
        <div>
          {symbolList.map((item, index) => {
            return (
              <ShowSingleSymbol
                symbolOne={item}
                symbols={symbols}
                key={index}
                sets={setSymbols}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stocks;
