/// <reference path="../index.ts" />

namespace Vidya.Entity {
    export class ISpriteSetting {
        imageName: string;
    }

    export class Sprite extends Vidya.Entity.Base {
        private image: Vidya.Graphics.IImage;

        // sprite height and width
        private sw: number;
        private sh: number;

        private animation: string;
        private index: number;

        // time in milliseconds between frames
        private frameRateDelta: number;

        public constructor(pos: Vidya.Physics.Point, image: Vidya.Graphics.IImage) {
            super(pos);
            this.image = image;

            this.sw = this.image.width / this.image.xseg;
            this.sh = this.image.height / this.image.yseg;

            if (!('idle' in this.image.animationSets)) {
                throw new Error(`Idle animation not set for sprite`);
            }else{
                this.animation = 'idle';
                this.index = this.image.animationSets['idle'].startRandom ? Math.floor(Math.random()*this.image.animationSets['idle'].endIndex) : this.image.animationSets['idle'].startIndex;
                this.frameRateDelta = this.image.animationSets['idle'].frameRate * 100;
            }
        }

        public draw(ctx: CanvasRenderingContext2D): void {
            ctx.drawImage(
                this.image.bitmap,
                (this.index%this.image.xseg*this.sw),
                (this.index-this.index%this.image.xseg)/this.image.xseg*this.sh,
                this.sw,
                this.sh,
                this.pos.x,
                this.pos.y,
                this.sw,
                this.sh
            );
            this.index++;
            if (this.index > this.image.animationSets[this.animation].endIndex) {
                this.index = this.image.animationSets[this.animation].startIndex;
            }
        }
    }
}
