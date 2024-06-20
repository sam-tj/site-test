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
  dataPrint();
  // console.log(modelViewer);
};

function dataPrint() {
  console.log("--------------------");
  const orbit = modelViewer.getCameraOrbit();
  console.log("orbit: " + orbit);
  const cameraTarget = modelViewer.getCameraTarget();
  console.log("cameraTarget: " + cameraTarget);
  const cameraFieldOfView = modelViewer.getFieldOfView();
  console.log("cameraFieldOfView: " + cameraFieldOfView);
}

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
    modelViewer.cameraTarget = "0.650m 0.178m 1.450m";

    modelViewer.cameraOrbit = "3.664142324173232rad 1.3962634015954636rad 6.0m";
    modelViewer.minCameraOrbit = "2.878267294859932rad 1.1292184887220118rad 6.0m";
    modelViewer.maxCameraOrbit = "3.824369271897301rad 1.548860494666006rad 6.0001m";
    modelViewer.minFieldOfView = "45deg";
    modelViewer.maxFieldOfView = "55deg";

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
    // document.getElementById("teaTime").style.display = "block";
  }
  if (annotation.name == "skyView") {
    modelViewer.cameraTarget = "0.6642386734445549m 1.3084799392279403m 1.4503990786472942m";
    modelViewer.fieldOfView = "18deg";
    modelViewer.minFieldOfView = "15deg";
    modelViewer.maxFieldOfView = "30deg";

    modelViewer.minCameraOrbit = "2.792526803190927rad 1.5506241796612912rad 1.5m";
    modelViewer.maxCameraOrbit = "3.5779249665883754rad 1.669902962712161rad 4m";
  }
};

modelViewer.querySelectorAll("button").forEach((hotspot) => {
  hotspot.addEventListener("click", () => annotationClicked(hotspot));
});
