import styles from "./Stock.module.scss";
import { MinusCircleTwoTone } from "@ant-design/icons";
const Stock = ({
  symbol,
  currentPrice,
  change,
  percentChange,
  stocks,
  setStocks,
}) => {
  const deleteSymbol = () => {
    const newStoks = stocks.filter(function (value) {
      return value.symbol !== symbol;
    });
    setStocks(newStoks);
  };
  return (
    <>
      <div className={styles.parent}>
        <div className={styles.child}>
          <div className={styles.parentContent}>
            <div className={styles.childContentSymbol} id={styles.a}>
              {symbol}
            </div>
            <div className={styles.childContentPriceC}>
              {currentPrice}&nbsp;&nbsp;
            </div>
            <div className={styles.childContentPriceD}>
              <div className={change > 0 ? styles.red : styles.green}>
                {change > 0 ? "+" + change : change}（{percentChange}
                %）
              </div>
            </div>
          </div>
        </div>
        <div className={styles.childContentSymbol}>
          <MinusCircleTwoTone
            twoToneColor="#eb2f96"
            style={{ fontSize: "26px" }}
            onClick={() => deleteSymbol()}
          />
        </div>
      </div>
      <div className={styles.parent}>
        <div className={styles.empty}></div>
        <div className={styles.empty}></div>
      </div>
    </>
  );
};

export default Stock;
