const { createClient } = require("redis");

let host = "localhost";
let port = 6380;
const client = createClient();
client
  .connect(host, port)
  .then(() => {
    console.log(" Redis connected");
  })
  .catch((err) => {
    console.log("err is ", err);
  });

client.zAdd('leaderBoard', [
  {
    score: 45,
    value: "mandeep",
  },
  {
      value: "Ranjeet",
    score: 89
  },
  {
      value: "nikhil",
    score: 78
  },
  {
      value: "Manu",
    score: 88
  },
  {
    value: "sumit",
    score: 56
  },
  {
      value: "amit",
    score: 96
  }
]);

console.log('checking redis line 42')

// Get all of the values/scores from the sorted set using
// the scan approach:
// https://redis.io/commands/zscan
// for (const memberWithScore of client.zScanIterator('mysortedset')) {
//   console.log(memberWithScore);
// }

client.quit();

module.exports = client;
