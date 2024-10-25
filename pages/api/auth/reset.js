import { connectToDb } from "../../../lib/db";
import { sendResetEmail } from "../../../utils/email";
import jwt from "jsonwebtoken";

export default async function reset(req, res) {
  const { email } = req.body;
  try {
    const db = await connectToDb();
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0)
      return res.status(404).json({ error: "User not found" });

    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    await sendResetEmail(email, resetToken);

    res.status(200).json({ message: "Password reset email sent." });
  } catch (err) {
    res.status(500).json({ error: "Password reset failed" });
  }
}
