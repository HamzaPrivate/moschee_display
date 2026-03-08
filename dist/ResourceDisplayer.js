"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPictures = exports.displayDoubleImage = exports.displayBroadImage = exports.displayVideo = exports.videoComing = exports.displayNextResource = void 0;
var imageContainer = document.getElementById("narrow-img-container");
var broadImg = document.getElementById("broad");
var narrow1 = document.getElementById("narrow1");
var narrow2 = document.getElementById("narrow2");
var video = document.getElementById("vid");
const path = "pictures/narrow/";
var narrow1Sources = [];
var narrow2Sources = [];
var broadSources = [];
//2 narrow pictures fit on the display
var narrow1Index = getNewPicIndex(narrow1Sources);
var narrow2Index = getNewPicIndex(narrow2Sources);
var broadIndex = getNewPicIndex(broadSources);
broadImg === null || broadImg === void 0 ? void 0 : broadImg.addEventListener("click", () => {
    console.log("clicked");
    displayNextResource();
});
imageContainer.addEventListener("click", () => {
    displayNextResource();
});
/**
 *
 * Displays the next resource based on the value of the displayCounter variable.
 * The function alternates between displaying two narrow images and one broad image or video in a repeated manner.
 */
var displayCounter = 0;
function displayNextResource() {
    displayDoubleImage();
    // TODO1 UNCOMMENT IF BROAD IMAGES NEEDED
    //2x narrow image, 1x broad or video into repeat
    // if (displayCounter < 2) displayDoubleImage();
    // else if (displayCounter == 2) {
    //   if (videoComing()) {
    //     displayVideo();
    //   } else {
    // displayBroadImage();
    //   }
    //   displayCounter = 0;
    //   return;
    // }
    // displayCounter++;
}
exports.displayNextResource = displayNextResource;
/**
 *
 * @param indexToExclude current index to the current pic/vid
 * @param pictureGroup the respective array where the pic/vid is stored in
 * @returns
 */
function getNewPicIndex(pictureGroup, indexToExclude) {
    if (pictureGroup.length === 0)
        return 0; // Handle empty arrays
    if (pictureGroup.length === 1)
        return indexToExclude || 0;
    let newIndex = Math.floor(Math.random() * pictureGroup.length);
    while (newIndex === indexToExclude) {
        newIndex = Math.floor(Math.random() * pictureGroup.length);
    }
    return newIndex;
}
/**
 * Checks if the current source of the broad image ends with ".mp4" to determine if a video is available.
 * @returns A boolean value indicating whether a video is available.
 */
function videoComing() {
    var _a;
    return broadSources.length > 0 && ((_a = broadSources[broadIndex]) === null || _a === void 0 ? void 0 : _a.endsWith("mp4"));
}
exports.videoComing = videoComing;
/**
 * Displays a video in the video element while hiding the image container and broad image.
 * If the video is not available, the function will return early.
 */
function displayVideo() {
    if (!videoComing())
        return;
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
    broadIndex = getNewPicIndex(broadSources, broadIndex);
}
exports.displayVideo = displayVideo;
/**
 * Displays a broad image in the image container while hiding the video and other elements.
 */
function displayBroadImage() {
    if (broadSources.length === 0)
        return;
    imageContainer.style.display = "none";
    // video.style.display = "none";
    broadImg.src = broadSources[broadIndex];
    let bStyle = broadImg.style;
    bStyle.display = "unset";
    broadIndex = getNewPicIndex(broadSources, broadIndex);
}
exports.displayBroadImage = displayBroadImage;
/**
 * Displays a double image in the image container while hiding the video and other elements.
 */
function displayDoubleImage() {
    if (narrow1Sources.length === 0 || narrow2Sources.length === 0)
        return; // Safety check
    // video.style.display = "none";
    if (broadImg) {
        broadImg.style.display = "none";
        broadImg.src = "";
    }
    imageContainer.style.display = "flex";
    narrow1.src = narrow1Sources[narrow1Index];
    narrow2.src = narrow2Sources[narrow2Index];
    narrow1Index = getNewPicIndex(narrow1Sources, narrow1Index);
    narrow2Index = getNewPicIndex(narrow2Sources, narrow2Index);
}
exports.displayDoubleImage = displayDoubleImage;
function fetchPictures() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://storage.googleapis.com/storage/v1/b/ikre/o?prefix=pictures/";
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
            // Each file/object is in data.items
            const urlsArr = data.items
                .map((item) => `https://storage.googleapis.com/ikre/${item.name}`)
                .filter((u) => u.endsWith(".png") ||
                u.endsWith(".jpg") ||
                u.endsWith(".jpeg") ||
                u.endsWith(".webp"));
            if (!urlsArr || urlsArr.length <= 0) {
                console.log("No pics in cloud");
                return;
            }
            else {
                narrow1Sources = [];
                narrow2Sources = [];
                broadSources = [];
            }
            for (let i = 0; i < urlsArr.length; i++) {
                // Create image element to check dimensions
                // TODO1 UNCOMMENT IF BROAD IMAGES NEEDED
                const img = document.createElement("img");
                img.src = urlsArr[i];
                img.onload = () => {
                    // if (img.naturalWidth > img.naturalHeight) {
                    //   broadSources.push(urlsArr[i]);
                    // }
                    // else {
                    if (narrow1Sources.length <= narrow2Sources.length) {
                        narrow1Sources.push(urlsArr[i]);
                    }
                    else {
                        narrow2Sources.push(urlsArr[i]);
                    }
                    // }
                    displayDoubleImage();
                    // displayBroadImage();
                    document
                        .querySelectorAll("img")
                        .forEach((el) => (el.style.display = "unset"));
                };
            }
            displayDoubleImage();
            console.log(urlsArr); // Array of direct image URLs
            console.log(narrow1Sources); // Array of direct image URLs
            console.log(narrow2Sources); // Array of direct image URLs
        });
    });
}
exports.fetchPictures = fetchPictures;
