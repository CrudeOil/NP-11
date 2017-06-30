/// <reference path="./index.ts" />


namespace Vidya {
    export interface IGameSettings {
        physicsSettings: Vidya.Physics.IPhysicsSettings,
        playerSettings: Vidya.Entity.IPlayerSettings,
        images: {[name: string]: Vidya.Graphics.IImage}
    }

    export class Game {
        private static framerateDelta = 12;

        private backgroundCanvas: HTMLCanvasElement;
        private mapCanvas: HTMLCanvasElement;
        private entityCanvas: HTMLCanvasElement;
        private hudCanvas: HTMLCanvasElement;

        private backgroundGraphics: Vidya.Graphics.Background;
        private entityGraphics: Vidya.Graphics.Entities;
        private hudGraphics: Vidya.Graphics.Hud;

        private physics: Vidya.Physics;

        private images: {[name: string]: Vidya.Graphics.IImage};

        private entities: Array<Vidya.Entity.Base>;

        private player: Vidya.Entity.Player;

        public constructor(stage: HTMLDivElement, settings: Vidya.IGameSettings) {
            this.backgroundCanvas = <HTMLCanvasElement>document.createElement('canvas');
            this.entityCanvas = <HTMLCanvasElement>document.createElement('canvas');
            this.hudCanvas = <HTMLCanvasElement>document.createElement('canvas');
            
            // stage.appendChild(this.backgroundCanvas);
            stage.appendChild(this.entityCanvas);
            // stage.appendChild(this.hudCanvas);

            this.backgroundGraphics = new Vidya.Graphics.Background(this.backgroundCanvas);
            this.entityGraphics = new Vidya.Graphics.Entities(this.entityCanvas);
            this.hudGraphics = new Vidya.Graphics.Background(this.hudCanvas);

            this.physics = new Vidya.Physics(settings.physicsSettings);

            this.images = settings.images;

            this.entities = [];

            Vidya.Graphics.loadImages(this.images)
            .then((imageBitmaps) => {
                for (var imageName in imageBitmaps) {
                    this.images[imageName].bitmap = imageBitmaps[imageName];
                }

                var player = new Vidya.Entity.Player(settings.playerSettings, this.images[settings.playerSettings.imageName]);
                this.entities.push(player);

                var wall = new Vidya.Entity.Wall(new Vidya.Physics.Point(10, 300), 500, 20);
                this.entities.push(wall);

                requestAnimationFrame(this.refresh);
            });
        }

        private refresh = (): void => {
            this.physics.applyPhysics(this.entities);

            this.backgroundGraphics.clear();
            this.entityGraphics.clear(this.entityCanvas.getContext('2d'));
            this.hudGraphics.clear();

            this.backgroundGraphics.draw();
            this.entityGraphics.draw(this.entityCanvas.getContext('2d'), this.entities);
            this.hudGraphics.draw();

            requestAnimationFrame(this.refresh);
        }
    }
}
