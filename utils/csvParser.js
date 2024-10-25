import csv from "csv-parser";
import fs from "fs";

export function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const contacts = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        contacts.push(row);
      })
      .on("end", () => {
        resolve(contacts);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}
