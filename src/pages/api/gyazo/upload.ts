// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if ("Gyamera_access_token" in req.cookies) {
    const gyameraAccessToken = req.cookies["Gyamera_access_token"];
    const { imagedata, collectionId } = req.body;
    console.info(imagedata.length);
    const imagebuffer = Buffer.from(imagedata.split(",")[1], "base64");
    console.info(imagebuffer.length);

    const formData = new FormData();
    formData.append("imagedata", new Blob([imagebuffer]), "image.png");
    formData.append("access_token", gyameraAccessToken ?? "");
    formData.append("referer_url", "https://gyamera.yuiseki.net/");
    formData.append("title", "Gyamera");
    formData.append("collection_id", collectionId);

    try {
      const gyazoRes = await fetch("https://upload.gyazo.com/api/upload", {
        method: "POST",
        body: formData,
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
