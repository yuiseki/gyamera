// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.body;

  const formData = new FormData();
  formData.append("client_id", process.env.GYAZO_OAUTH_CLIENT_ID ?? "");
  formData.append("client_secret", process.env.GYAZO_OAUTH_CLIENT_SECRET ?? "");
  formData.append("redirect_uri", "https://gyamera.yuiseki.net/");
  formData.append("code", code);
  formData.append("grant_type", "authorization_code");

  try {
    const gyazoRes = await fetch("https://api.gyazo.com/oauth/token", {
      method: "POST",
      body: formData,
    });
    const gyazoJson = await gyazoRes.json();

    res.status(gyazoRes.status).json(gyazoJson);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "error" });
  }
}
