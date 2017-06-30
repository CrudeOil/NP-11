/// <reference path="../index.ts" />

namespace Vidya.Graphics {
    export abstract class Base {
        protected canvas: HTMLCanvasElement;

        public constructor(canvas: HTMLCanvasElement) {
            this.canvas = canvas;

            this.onWindowResize();
        }

        private onWindowResize = () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }
}
