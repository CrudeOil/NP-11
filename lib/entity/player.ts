/// <reference path="../index.ts" />


namespace Vidya.Entity {
    export interface IPlayerSettings {
        pos: Vidya.Physics.Point
    }

    export class Player extends Vidya.Entity.Sprite {
        constructor(playerSettings: IPlayerSettings, playerImage: Vidya.Graphics.IImage) {
            super(playerSettings.pos, playerImage);
        }

        public draw(ctx: CanvasRenderingContext2D): void {
            throw new Error("Method not implemented.");
        }
    }
}
