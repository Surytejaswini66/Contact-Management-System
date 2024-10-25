import { authenticate } from "../../../middlewares/authMiddleware";
import { connectToDb } from "../../../lib/db";
import { validateContact } from "../../../utils/validate";
import moment from "moment-timezone";

export default async function handler(req, res) {
  authenticate(req, res, async () => {
    const db = await connectToDb();

    if (req.method === "GET") {
      const { filter, sort, timezone, startDate, endDate } = req.query;

      let query = "SELECT * FROM contacts WHERE (name LIKE ? OR email LIKE ?)";
      const params = [`%${filter}%`, `%${filter}%`];

      if (startDate && endDate) {
        query += " AND created_at BETWEEN ? AND ?";
        params.push(startDate, endDate);
      }

      if (sort) {
        query += ` ORDER BY ${sort}`;
      }

      const [contacts] = await db.execute(query, params);

      const transformedContacts = contacts.map((contact) => {
        contact.created_at = moment
          .tz(contact.created_at, "UTC")
          .tz(timezone)
          .format();
        return contact;
      });

      res.status(200).json({ contacts: transformedContacts });
    }
  });
}
