export const loadExactCameraToVideoElement = async (
  cameraDeviceId: string,
  videoElement: HTMLVideoElement
) => {
  console.info("cameraDeviceId:", cameraDeviceId);
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: { exact: cameraDeviceId },
      },
      audio: false,
    });
    videoElement.srcObject = stream;
    videoElement.dataset.cameraDeviceId = cameraDeviceId;
    videoElement.dataset.mediaStreamId = stream.id;
    videoElement.addEventListener("canplay", (e) => {
      videoElement.height = videoElement.videoHeight;
      videoElement.width = videoElement.videoWidth;
    });
    videoElement.play();
  } catch (e) {
    console.error("error:", e);
  }
};
