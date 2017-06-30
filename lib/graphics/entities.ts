/// <reference path="../index.ts" />

namespace Vidya.Graphics {
    export class Entities extends Vidya.Graphics.Base {
        public constructor(canvas: HTMLCanvasElement) {
            super(canvas);
        }

        public clear(ctx: CanvasRenderingContext2D): void {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }

        public draw(ctx: CanvasRenderingContext2D, entities: Array<Vidya.Entity.Base>): void {
            for (var i = 0; i < entities.length; i++) {
                entities[i].draw(ctx);
            }
        }
    }
}
