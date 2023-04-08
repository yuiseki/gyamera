export const getVideoFrameAsDataUrl = (videoElement: HTMLVideoElement) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context) {
    canvas.width = videoElement.width;
    canvas.height = videoElement.height;
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/png");
    console.info("dataUrl.length:", dataUrl.length);
    return dataUrl;
  }
};
