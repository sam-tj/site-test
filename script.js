// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector(".progress-bar");
  const updatingBar = event.target.querySelector(".update-bar");
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add("hide");
    event.target.removeEventListener("progress", onProgress);
  } else {
    progressBar.classList.remove("hide");
  }
};
document.querySelector("model-viewer").addEventListener("progress", onProgress);
// modelViewer_val = document.querySelector("model-viewer");
// const orbit = modelViewer_val.getCameraOrbit();
// console.log(orbit);
const modelViewer = document.querySelector("model-viewer");
const startPan = () => {
  const orbit = modelViewer.getCameraOrbit();
  console.log("orbit: " + orbit);
  const cameraTarget = modelViewer.getCameraTarget();
  console.log("cameraTarget: " + cameraTarget);
  console.log(modelViewer);
};

modelViewer.addEventListener(
  "contextmenu",
  (event) => {
    startPan();
  },
  true
);
document.getElementById("reset_view").addEventListener(
  "click",
  (event) => {
    // if (event.touches.length > 2) {
    modelViewer.cameraTarget = "0.5m 0.3266m 1.45m";
    modelViewer.cameraOrbit = "212.49deg 64.84deg 6.03m";
    modelViewer.maxCameraOrbit = "213deg 80deg 6.0m";
    modelViewer.minCameraOrbit = "165deg 64deg 3.0m";
    document.getElementById("login").style.display = "none";
    document.getElementById("teaTime").style.display = "none";
    document.getElementById("model_viewer_window").style.display = "block";
    document.getElementById("about_page").style.display = "none";
    // }
  },
  true
);

document.getElementById("login").addEventListener(
  "click",
  (event) => {
    document.getElementById("model_viewer_window").style.display = "none";
    document.getElementById("about_page").style.display = "block";
  },
  true
);

const annotationClicked = (annotation) => {
  // console.log(annotation.dataset);
  if (annotation.name == "login") {
    modelViewer.cameraTarget = "-1.25m 0.85m 0.529m";
    modelViewer.cameraOrbit = "180deg 53.226deg 0.7m";
    modelViewer.maxCameraOrbit = "182deg 65deg 2.5m";
    modelViewer.minCameraOrbit = "178deg 45deg 0.5m";
    document.getElementById("login").style.display = "block";
  }
  if (annotation.name == "teaTime") {
    modelViewer.cameraTarget = "0.5m 0.35m 1.45m";
    modelViewer.cameraOrbit = "165deg 79.226deg 5.03m";
    modelViewer.maxCameraOrbit = "205deg 90deg 5.1m";
    modelViewer.minCameraOrbit = "160deg 60deg 4.0m";
    document.getElementById("teaTime").style.display = "block";
  }
};

modelViewer.querySelectorAll("button").forEach((hotspot) => {
  hotspot.addEventListener("click", () => annotationClicked(hotspot));
});
