import { connectToDb } from "../../../lib/db";
import json2csv from "json2csv";

export default async function download(req, res) {
  try {
    const db = await connectToDb();
    const [contacts] = await db.execute("SELECT * FROM contacts");

    const fields = [
      "name",
      "email",
      "phone",
      "address",
      "timezone",
      "created_at",
    ];
    const csv = json2csv.parse(contacts, { fields });

    res.setHeader("Content-Disposition", "attachment; filename=contacts.csv");
    res.setHeader("Content-Type", "text/csv");
    res.status(200).send(csv);
  } catch (err) {
    res.status(500).json({ error: "Failed to download contacts" });
  }
}
