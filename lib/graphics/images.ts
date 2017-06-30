/// <reference path="../index.ts" />

namespace Vidya.Graphics {
    export interface IAnimation {
        startIndex: number,
        endIndex: number,
        frameRate: number,
        startRandom: boolean
    }

    export interface IImage {
        bitmap: ImageBitmap,
        width: number,
        height: number,
        xseg: number,
        yseg: number,
        url: string,
        animationSets: {[name: string]: IAnimation}
    }

    export function loadImages(images: {[name: string]: IImage}): Promise<{[name: string]: ImageBitmap}> {
        var promise = new Promise<{[name: string]: ImageBitmap}>(async (resolve, reject) => {
            let imageBitmaps: {[name: string]: ImageBitmap} = {};

            for (var imageName in images) {
                imageBitmaps[imageName] = await getImageBitmap(images[imageName].url)
            }

            resolve(imageBitmaps);
        });
        return promise;
    }

    export function getImageBitmap(imgUrl: string): Promise<ImageBitmap> {
        var promise = new Promise<ImageBitmap>((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.onload = () => {
                createImageBitmap(<Blob>request.response)
                .then((imageBitmap: ImageBitmap) => {
                    resolve(imageBitmap);
                })
            }
            request.responseType = 'blob';
            request.open('GET', imgUrl);
            request.send();
        });
        return promise;
    }
}
