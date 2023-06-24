"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayDoubleImage = exports.displayBroadImage = exports.displayVideo = exports.videoComing = exports.getNewIndeces = exports.displayNextResource = void 0;
var imageContainer = document.getElementById("img-container");
var broadImg = document.getElementById("broad");
var narrow1 = document.getElementById("narrow1");
var narrow2 = document.getElementById("narrow2");
var video = document.getElementById("vid");
const path = "pictures/narrow/";
var narrowSources = [`${path}n0.jpeg`, `${path}n1.jpeg`, `${path}n2.jpeg`, `${path}n3.jpeg`, `${path}n4.jpeg`, `${path}n5.jpeg`];
var broadSources = [`pictures/broad/b0.jpeg`, `pictures/broad/b1.jpeg`]; //broad video sources possible
//2 narrow pictures fit on the display
var narrowIndeces = getNewIndeces(narrowSources, 2);
var broadIndex = getNewIndeces(narrowSources, 1)[0];
broadImg.addEventListener("click", () => {
    displayNextResource();
});
imageContainer.addEventListener("click", () => {
    displayNextResource();
});
var displayCounter = 0;
function displayNextResource() {
    //2x narrow image, 1x broad or video into repeat
    if (displayCounter < 2)
        displayDoubleImage();
    else if (displayCounter == 2) {
        if (videoComing()) {
            displayVideo();
        }
        else {
            displayBroadImage();
        }
        displayCounter = 0;
        return;
    }
    displayCounter++;
}
exports.displayNextResource = displayNextResource;
/**
 *
 * @param indecesToExclude current indeces to the current resources which we dont want to display again
 * @param resourceGroup the respective array where the resources are stored in
 * @returns an array with new indeces depending on how many are needed
 */
function getNewIndeces(resourceGroup, numberOfneededIndeces, indecesToExclude) {
    if (resourceGroup.length === 1)
        return indecesToExclude !== null && indecesToExclude !== void 0 ? indecesToExclude : [0];
    let results = [];
    let newIndex = Math.floor(Math.random() * resourceGroup.length);
    for (let i = 0; i < numberOfneededIndeces; i++) {
        if (indecesToExclude) {
            while (newIndex === indecesToExclude[i]) {
                newIndex = Math.floor(Math.random() * resourceGroup.length);
            }
            indecesToExclude[i + 1] = newIndex;
        }
        else {
            newIndex = Math.floor(Math.random() * resourceGroup.length);
        }
        results.push(newIndex);
    }
    return results;
}
exports.getNewIndeces = getNewIndeces;
function videoComing() {
    return broadSources[broadIndex].endsWith("mp4");
}
exports.videoComing = videoComing;
function displayVideo() {
    imageContainer.style.display = "none";
    broadImg.style.display = "none";
    let vStyle = video.style;
    vStyle.display = "unset";
    vStyle.border = "5px solid";
    vStyle.borderColor = "#926c2f";
    vStyle.boxShadow = "11px 11px 11px #6f4e18";
    vStyle.animationName = "fadeIn";
    vStyle.animationTimingFunction = "ease-in-out";
    vStyle.animationDuration = "1.5s";
    video.src = broadSources[broadIndex];
    broadIndex = getNewIndeces(broadSources, 1, [broadIndex])[0];
}
exports.displayVideo = displayVideo;
function displayBroadImage() {
    imageContainer.style.display = "none";
    video.style.display = "none";
    broadImg.src = broadSources[broadIndex];
    let bStyle = broadImg.style;
    bStyle.border = "5px solid";
    bStyle.borderColor = "#926c2f";
    bStyle.boxShadow = "11px 11px 11px #6f4e18";
    bStyle.animationName = "fadeIn";
    bStyle.animationTimingFunction = "ease-in-out";
    bStyle.animationDuration = "1.5s";
    bStyle.display = "unset";
    broadIndex = getNewIndeces(broadSources, 1, [broadIndex])[0];
}
exports.displayBroadImage = displayBroadImage;
function displayDoubleImage() {
    video.style.display = "none";
    let bStyle = broadImg.style;
    bStyle.display = "none";
    bStyle.border = "0px";
    bStyle.boxShadow = "";
    broadImg.src = "";
    imageContainer.style.display = "flex";
    const indeces = getNewIndeces(narrowSources, 2, narrowIndeces);
    console.log(indeces[0], indeces[1]);
    narrow1.src = narrowSources[indeces[0]];
    narrow2.src = narrowSources[indeces[1]];
}
exports.displayDoubleImage = displayDoubleImage;
