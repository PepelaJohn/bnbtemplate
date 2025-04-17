import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, headers } = req;
  const token = headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    switch (method) {
      case "GET":
        const { id } = req.query;

        if (id) {
          // Get single booking
          const response = await axios.get(`${baseUrl}/api/bookings/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return res.status(200).json(response.data);
        } else {
          // Get all bookings for user
          const response = await axios.get(`${baseUrl}/api/bookings`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          return res.status(200).json(response.data);
        }

      case "POST":
        // Create new booking
        const bookingResponse = await axios.post(
          `${baseUrl}/api/bookings`,
          req.body,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        return res.status(201).json(bookingResponse.data);

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error("Booking API Error:", error);
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "Internal Server Error";
    return res.status(status).json({ message });
  }
}
