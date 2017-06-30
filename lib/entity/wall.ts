/// <reference path="../index.ts" />


namespace Vidya.Entity {
    export class Wall extends Vidya.Entity.Base {
        private width: number;
        private height: number;

        constructor(pos: Vidya.Physics.Point, width: number, height: number) {
            super(pos);
            
            this.width = width;
            this.height = height;

            this.boundingBox = new Vidya.Physics.Box(pos.x, pos.y, pos.x+width, pos.y+height);

            this.gravityEnabled = false;
        }

        public draw(ctx: CanvasRenderingContext2D): void {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        }
    }
}
