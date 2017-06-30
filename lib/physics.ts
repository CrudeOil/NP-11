/// <reference path="./index.ts" />

namespace Vidya {
    export class Physics {
        private gravity: Vidya.Physics.Vector2D;

        public constructor(physicsSettings: Vidya.Physics.IPhysicsSettings) {
            this.gravity = physicsSettings.gravity;
        }

        public applyPhysics(entities: Array<Vidya.Entity.Base>): void {
            for (var i = 0; i < entities.length; i++) {
                if (entities[i].getGravityEnabled()) {
                    entities[i].addVelocity(this.gravity.x, this.gravity.y);
                    entities[i].move(entities[i].getVelocity());
                }
            }
        }
    }

    export namespace Physics {

        export interface IPhysicsSettings {
            gravity: Vidya.Physics.Vector2D;
        }

        export class Point {
            public x: number;
            public y: number;

            public constructor(x = 0, y = 0) {
                this.x = x;
                this.y = y;
            }
        }

        export class Vector2D extends Point {
            public magnitude = () => {
                Math.sqrt(this.x**2+this.y**2);
            }
        }

        export class Box {
            p1: Vidya.Physics.Point;
            p2: Vidya.Physics.Point;
            p3: Vidya.Physics.Point;
            p4: Vidya.Physics.Point;

            public constructor(x1: number, y1: number, w: number, h: number) {
                this.p1 = new Vidya.Physics.Point(x1, y1);
                this.p2 = new Vidya.Physics.Point(x1+w, y1);
                this.p3 = new Vidya.Physics.Point(x1+w, y1+h);
                this.p4 = new Vidya.Physics.Point(x1, y1+h);
            }
        }
    }
}
