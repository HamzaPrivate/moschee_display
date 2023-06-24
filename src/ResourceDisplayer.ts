var imageContainer = document.getElementById("img-container")!;
var broadImg = document.getElementById("broad") as HTMLImageElement;
var narrow1 = document.getElementById("narrow1") as HTMLImageElement;
var narrow2 = document.getElementById("narrow2") as HTMLImageElement;
var video = document.getElementById("vid") as HTMLVideoElement;

const path = "pictures/narrow/";
var narrow1Sources = [`${path}n0.jpeg`, `${path}n1.jpeg`, `${path}n2.jpeg`];
var narrow2Sources = [`${path}n3.jpeg`, `${path}n4.jpeg`, `${path}n5.jpeg`];
var broadSources = [`pictures/broad/b0.jpeg`, `pictures/broad/b1.jpeg`];//broad video sources possible

//2 narrow pictures fit on the display
var narrow1Index = getNewPicIndex(narrow1Sources);
var narrow2Index = getNewPicIndex(narrow2Sources);
var broadIndex = getNewPicIndex(broadSources);

broadImg.addEventListener("click", () => {
    displayNextResource()
})
imageContainer.addEventListener("click", () => {
    displayNextResource()
})

var displayCounter: number = 0;
export function displayNextResource() {
    //2x narrow image, 1x broad or video into repeat
    if (displayCounter < 2) displayDoubleImage();
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

/**
 * 
 * @param indexToExclude current index to the current pic/vid
 * @param pictureGroup the respective array where the pic/vid is stored in
 * @returns 
 */
function getNewPicIndex(pictureGroup: string[], indexToExclude?: number): number {
    if (pictureGroup.length === 1) return indexToExclude || 0;
    let newIndex = Math.floor(Math.random() * pictureGroup.length);
    while (newIndex === indexToExclude) {
        newIndex = Math.floor(Math.random() * pictureGroup.length);
    }
    return newIndex;
}

export function videoComing(): boolean {
    return broadSources[broadIndex].endsWith("mp4");
}

export function displayVideo(): void {
    if (!videoComing()) return;
    imageContainer.style.display = "none";
    broadImg.style.display = "none"
    let vStyle = video.style;
    vStyle.display = "unset"
    vStyle.border = "5px solid";
    vStyle.borderColor = "#926c2f";
    vStyle.boxShadow = "11px 11px 11px #6f4e18";
    vStyle.animationName = "fadeIn";
    vStyle.animationTimingFunction = "ease-in-out";
    vStyle.animationDuration = "1.5s"
    video.src = broadSources[broadIndex];
    broadIndex = getNewPicIndex(broadSources, broadIndex);

}

export function displayBroadImage(): void {
    imageContainer.style.display = "none";
    video.style.display = "none";
    broadImg.src = broadSources[broadIndex];
    let bStyle = broadImg.style;
    bStyle.border = "5px solid";
    bStyle.borderColor = "#926c2f";
    bStyle.boxShadow = "11px 11px 11px #6f4e18";
    bStyle.animationTimingFunction = "ease-in-out";
    bStyle.animationDuration = "1.5s"
    bStyle.display = "unset"
    broadIndex = getNewPicIndex(broadSources, broadIndex);
}

export function displayDoubleImage() {
    video.style.display = "none";
    let bStyle = broadImg.style;
    bStyle.display = "none";
    broadImg.src = "";
    imageContainer.style.display = "flex";
    narrow1.src = narrow1Sources[narrow1Index];
    narrow2.src = narrow2Sources[narrow2Index];
    narrow1Index = getNewPicIndex(narrow1Sources, narrow1Index);
    narrow2Index = getNewPicIndex(narrow2Sources, narrow2Index);
}