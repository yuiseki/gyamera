export const getRandomCamera = async () => {
  const mediaDeviceList = await navigator.mediaDevices.enumerateDevices();
  const cameraDeviceList = mediaDeviceList.filter(
    (m) => m.kind === "videoinput"
  );
  const camera =
    cameraDeviceList[Math.floor(Math.random() * cameraDeviceList.length)];
  console.info("camera:", camera);
  return camera;
};
