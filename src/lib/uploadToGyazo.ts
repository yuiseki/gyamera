export const uploadToGyazo = async (
  imageDataUrl: string,
  collectionId: string
) => {
  return fetch("/api/gyazo/upload", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      imagedata: imageDataUrl,
      collectionId: collectionId,
    }),
  });
};
