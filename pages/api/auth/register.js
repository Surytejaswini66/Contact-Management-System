import { registerUser } from "../../../controllers/authController";

export default function handler(req, res) {
  if (req.method === "POST") {
    return registerUser(req, res);
  } else {
    res.status(404).json({ message: "Not Found" });
  }
}
