/// <reference path="../index.ts" />


namespace Vidya.Entity {
    export interface IPlayerSettings {
        pos: Vidya.Physics.Point,
        imageName: string
    }

    export class Player extends Vidya.Entity.Sprite {
        constructor(playerSettings: IPlayerSettings, playerImage: Vidya.Graphics.IImage) {
            super(playerSettings.pos, playerImage);
            this.gravityEnabled = false;
        }
    }
}
