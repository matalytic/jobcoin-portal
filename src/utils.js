import { utcParse } from 'd3';

/* Converts transction history in the shape of:
[
  {timestamp: "2017-12-08T18:35:13.320Z", toAddress: "Jim", amount: "50"},
  {timestamp: "2017-12-08T18:35:13.797Z", toAddress: "Jim", amount: "50"},
  {timestamp: "2017-12-09T02:21:59.643Z", fromAddress: "Alice", toAddress: "Jim", amount: "40"},
  {timestamp: "2017-12-09T02:22:11.182Z", fromAddress: "Alice", toAddress: "Jim", amount: "45.4"}
]

into d3 data set with x values as utc timestamps and y values as account balance
[
  {x: Fri Dec 08 2017 13:35:13 GMT-0500 (EST), y: 0},
  {x: Fri Dec 08 2017 13:35:13 GMT-0500 (EST), y: 50},
  {x: Fri Dec 08 2017 21:21:59 GMT-0500 (EST), y: 100}
]
*/

export const convertTransactionData = (transactions, balance, fromAddress) => {
  let parseUTCDate = utcParse('%Y-%m-%dT%H:%M:%S.%f%Z');
  let getDate = function(d) {
    return parseUTCDate(d);
  };
  let balanceHistory = transactions.reduceRight((prev, curr) => {
    let modifier = curr.fromAddress === fromAddress ? 1 : -1;
    return [{ x: getDate(curr.timestamp), y: prev[0].y + (modifier * parseFloat(curr.amount)) }, ...prev];
  }, [{x: Date.now(), y: parseFloat(balance)}]);
  return balanceHistory;
};