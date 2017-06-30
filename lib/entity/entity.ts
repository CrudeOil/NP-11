/// <reference path="../index.ts" />

namespace Vidya.Entity {
    export abstract class Base {
        protected pos: Vidya.Physics.Point;
        protected v: Vidya.Physics.Vector2D;
        protected mass: number;

        protected boundingBox: Vidya.Physics.Box;
        protected collisionEnabled: boolean;
        protected gravityEnabled: boolean;

        public constructor(pos: Vidya.Physics.Point) {
            this.pos = pos;
            this.v = new Vidya.Physics.Vector2D();
            this.mass = 1;

            this.collisionEnabled = false;
            this.gravityEnabled = false;
        }

        public abstract draw(ctx: CanvasRenderingContext2D): void;

        public addVelocity(x: number, y: number) {
            this.v.x += x;
            this.v.y += y;
        }

        public move (d: Vidya.Physics.Point) {
            this.pos.x += d.x;
            this.pos.y += d.y;
        }

        public setGravityEnabled(gravityEnabled: boolean) {
            this.gravityEnabled = gravityEnabled;
        }

        public getGravityEnabled(): boolean {
            return this.gravityEnabled;
        }

        public getVelocity() {
            return this.v;
        }
    }
}
