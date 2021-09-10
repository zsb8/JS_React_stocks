import styles from "./ShowSingleSymbol.module.scss";
import { MinusCircleTwoTone } from "@ant-design/icons";
const ShowSingleSymbol = ({ symbolOne, symbols, sets }) => {
  const symbol = symbolOne.symbol;
  const c = symbolOne.c;
  const d = symbolOne.d;
  const dp = symbolOne.dp;
  const deleteSymbol = () => {
    let tmpList = [];
    for (const sym of symbols) {
      if (sym != symbol) {
        tmpList = tmpList.concat(sym);
      }
    }
    console.log("tmpList:", tmpList);
    sets(tmpList);
  };
  return (
    <>
      <div className={styles.parent}>
        <div className={styles.child}>
          <div className={styles.parentContent}>
            <div className={styles.childContentSymbol} id={styles.a}>
              {symbol}
            </div>
            <div className={styles.childContentPriceC}>{c}&nbsp;&nbsp;</div>
            <div className={styles.childContentPriceD}>
              <div className={d > 0 ? styles.red : styles.green}>
                {d > 0 ? "+" + d : "-" + d}（{dp}
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
    </>
  );
};
export default ShowSingleSymbol;
