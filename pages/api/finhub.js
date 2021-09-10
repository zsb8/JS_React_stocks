/* eslint-disable import/no-anonymous-default-export */
export default async (req, res) => {
  try {
    const { method } = req;
    switch (req.method) {
      case "POST": {
        let results = [];
        const payload = req.body;
        const { symbol } = payload;
        await Promise.all(
          symbol.map(async (value, i) => {
            console.log(value);
            console.log("i:", i);
            let aList = [];
            const url = new URL(
              `https://finnhub.io/api/v1/quote?symbol=${value}&token=c034fr748v6v2t3i0k60`
            );
            const response = await fetch(url, { method: "GET" });
            const stock = await response.json();
            console.log("stock.c=:", stock.c);
            stock.symbol = value;
            aList[0] = stock;
            results = results.concat(aList);
            console.log("执行%s完毕", value);
          })
        );
        if (results) {
          res.statusCode = 200;
          res.json(results);
        } else {
          res.statusCode = 404;
          res.json({ error: "availableTime not found" });
        }
        break;
      }
      default: {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error");
  }
};
