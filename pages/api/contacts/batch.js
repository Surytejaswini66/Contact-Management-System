import formidable from "formidable";
import { parseCSV } from "../../../utils/csvParser";
import { connectToDb } from "../../../lib/db";

export default async function batch(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "File upload error" });

    const filePath = files.file.path;
    const contacts = await parseCSV(filePath);

    const db = await connectToDb();
    await db.beginTransaction();

    try {
      for (const contact of contacts) {
        await db.execute(
          "INSERT INTO contacts (name, email, phone, address, timezone) VALUES (?, ?, ?, ?, ?)",
          [
            contact.name,
            contact.email,
            contact.phone,
            contact.address,
            contact.timezone,
          ]
        );
      }
      await db.commit();
      res.status(201).json({ message: "Batch contacts added successfully" });
    } catch (err) {
      await db.rollback();
      res.status(500).json({ error: "Batch processing failed" });
    }
  });
}
