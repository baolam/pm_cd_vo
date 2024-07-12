const xlsx = require("xlsx");
// const path = require("path");

const FILE = __dirname + "/matches.xlsx";
const workbook = xlsx.readFile(FILE);
const worksheet = workbook.Sheets["tran_dau"];
const rows = worksheet["G1"].v;
const matches = xlsx.utils.sheet_to_json(worksheet, {
  raw: true,
  range: `A3:E${3 + rows}`,
});

console.log(matches);
