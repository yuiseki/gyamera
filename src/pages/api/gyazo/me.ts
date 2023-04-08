// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if ("Gyamera_access_token" in req.cookies) {
    const gyameraAccessToken = req.cookies["Gyamera_access_token"];
    try {
      const gyazoRes = await fetch("https://api.gyazo.com/api/users/me", {
        headers: {
          Authorization: `Bearer ${gyameraAccessToken}`,
        },
      });
      const gyazoJson = await gyazoRes.json();
      res.status(gyazoRes.status).json(gyazoJson);
    } catch (e) {
      console.error(e);
      res.status(400).json({ message: "error" });
    }
  } else {
    res.status(401).json({ message: "error" });
  }
}
