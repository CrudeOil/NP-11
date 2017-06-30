var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var Vidya;
(function (Vidya) {
    class Game {
        constructor(stage, settings) {
            this.refresh = () => {
                this.physics.applyPhysics(this.entities);
                this.backgroundGraphics.clear();
                this.entityGraphics.clear(this.entityCanvas.getContext('2d'));
                this.hudGraphics.clear();
                this.backgroundGraphics.draw();
                this.entityGraphics.draw(this.entityCanvas.getContext('2d'), this.entities);
                this.hudGraphics.draw();
                requestAnimationFrame(this.refresh);
            };
            this.backgroundCanvas = document.createElement('canvas');
            this.entityCanvas = document.createElement('canvas');
            this.hudCanvas = document.createElement('canvas');
            stage.appendChild(this.entityCanvas);
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
                let entity;
                var w = 10;
                var h = 10;
                var n = w * h;
                for (var i = 0; i < n; i++) {
                    entity = new Vidya.Entity.Sprite(new Vidya.Physics.Point(Math.floor(Math.random() * this.entityCanvas.clientWidth), Math.floor(Math.random() * this.entityCanvas.clientHeight)), this.images['test']);
                    entity.setGravityEnabled(false);
                    this.entities.push(entity);
                }
                requestAnimationFrame(this.refresh);
            });
        }
    }
    Game.framerateDelta = 12;
    Vidya.Game = Game;
})(Vidya || (Vidya = {}));
var Vidya;
(function (Vidya) {
    var Graphics;
    (function (Graphics) {
        class Base {
            constructor(canvas) {
                this.onWindowResize = () => {
                    this.canvas.width = window.innerWidth;
                    this.canvas.height = window.innerHeight;
                };
                this.canvas = canvas;
                this.onWindowResize();
            }
        }
        Graphics.Base = Base;
    })(Graphics = Vidya.Graphics || (Vidya.Graphics = {}));
})(Vidya || (Vidya = {}));
var Vidya;
(function (Vidya) {
    var Graphics;
    (function (Graphics) {
        function loadImages(images) {
            var promise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let imageBitmaps = {};
                for (var imageName in images) {
                    imageBitmaps[imageName] = yield getImageBitmap(images[imageName].url);
                }
                resolve(imageBitmaps);
            }));
            return promise;
        }
        Graphics.loadImages = loadImages;
        function getImageBitmap(imgUrl) {
            var promise = new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();
                request.onload = () => {
                    createImageBitmap(request.response)
                        .then((imageBitmap) => {
                        resolve(imageBitmap);
                    });
                };
                request.responseType = 'blob';
                request.open('GET', imgUrl);
                request.send();
            });
            return promise;
        }
        Graphics.getImageBitmap = getImageBitmap;
    })(Graphics = Vidya.Graphics || (Vidya.Graphics = {}));
})(Vidya || (Vidya = {}));
var Vidya;
(function (Vidya) {
    var Graphics;
    (function (Graphics) {
        class Background extends Vidya.Graphics.Base {
            constructor(canvas) {
                super(canvas);
            }
            clear() {
            }
            draw() {
            }
        }
        Graphics.Background = Background;
    })(Graphics = Vidya.Graphics || (Vidya.Graphics = {}));
})(Vidya || (Vidya = {}));
var Vidya;
(function (Vidya) {
    var Graphics;
    (function (Graphics) {
        class Entities extends Vidya.Graphics.Base {
            constructor(canvas) {
                super(canvas);
            }
            clear(ctx) {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
            draw(ctx, entities) {
                for (var i = 0; i < entities.length; i++) {
                    entities[i].draw(ctx);
                }
            }
        }
        Graphics.Entities = Entities;
    })(Graphics = Vidya.Graphics || (Vidya.Graphics = {}));
})(Vidya || (Vidya = {}));
var Vidya;
(function (Vidya) {
    var Graphics;
    (function (Graphics) {
        class Hud extends Vidya.Graphics.Base {
            clear() {
                throw new Error("Method not implemented.");
            }
            draw() {
                throw new Error("Method not implemented.");
            }
        }
        Graphics.Hud = Hud;
    })(Graphics = Vidya.Graphics || (Vidya.Graphics = {}));
})(Vidya || (Vidya = {}));
var Vidya;
(function (Vidya) {
    class Physics {
        constructor(physicsSettings) {
            this.gravity = physicsSettings.gravity;
        }
        applyPhysics(entities) {
            for (var i = 0; i < entities.length; i++) {
                if (entities[i].getGravityEnabled()) {
                    entities[i].addVelocity(this.gravity.x, this.gravity.y);
                    entities[i].move(entities[i].getVelocity());
                }
            }
        }
    }
    Vidya.Physics = Physics;
    (function (Physics) {
        class Point {
            constructor(x = 0, y = 0) {
                this.x = x;
                this.y = y;
            }
        }
        Physics.Point = Point;
        class Vector2D extends Point {
            constructor(...args) {
                super(...args);
                this.magnitude = () => {
                    Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
                };
            }
        }
        Physics.Vector2D = Vector2D;
        class Box {
            constructor(x1, y1, w, h) {
                this.p1 = new Vidya.Physics.Point(x1, y1);
                this.p2 = new Vidya.Physics.Point(x1 + w, y1);
                this.p3 = new Vidya.Physics.Point(x1 + w, y1 + h);
                this.p4 = new Vidya.Physics.Point(x1, y1 + h);
            }
        }
        Physics.Box = Box;
    })(Physics = Vidya.Physics || (Vidya.Physics = {}));
})(Vidya || (Vidya = {}));
var Vidya;
(function (Vidya) {
    var Entity;
    (function (Entity) {
        class Base {
            constructor(pos) {
                this.pos = pos;
                this.v = new Vidya.Physics.Vector2D();
                this.mass = 1;
                this.collisionEnabled = false;
                this.gravityEnabled = false;
            }
            addVelocity(x, y) {
                this.v.x += x;
                this.v.y += y;
            }
            move(d) {
                this.pos.x += d.x;
                this.pos.y += d.y;
            }
            setGravityEnabled(gravityEnabled) {
                this.gravityEnabled = gravityEnabled;
            }
            getGravityEnabled() {
                return this.gravityEnabled;
            }
            getVelocity() {
                return this.v;
            }
        }
        Entity.Base = Base;
    })(Entity = Vidya.Entity || (Vidya.Entity = {}));
})(Vidya || (Vidya = {}));
var Vidya;
(function (Vidya) {
    var Entity;
    (function (Entity) {
        class ISpriteSetting {
        }
        Entity.ISpriteSetting = ISpriteSetting;
        class Sprite extends Vidya.Entity.Base {
            constructor(pos, image) {
                super(pos);
                this.image = image;
                this.sw = this.image.width / this.image.xseg;
                this.sh = this.image.height / this.image.yseg;
                if (!('idle' in this.image.animationSets)) {
                    throw new Error(`Idle animation not set for sprite`);
                }
                else {
                    this.animation = 'idle';
                    this.index = this.image.animationSets['idle'].startRandom ? Math.floor(Math.random() * this.image.animationSets['idle'].endIndex) : this.image.animationSets['idle'].startIndex;
                    this.frameRateDelta = this.image.animationSets['idle'].frameRate * 100;
                }
            }
            draw(ctx) {
                ctx.drawImage(this.image.bitmap, (this.index % this.image.xseg * this.sw), (this.index - this.index % this.image.xseg) / this.image.xseg * this.sh, this.sw, this.sh, this.pos.x, this.pos.y, this.sw, this.sh);
                this.index++;
                if (this.index > this.image.animationSets[this.animation].endIndex) {
                    this.index = this.image.animationSets[this.animation].startIndex;
                }
            }
        }
        Entity.Sprite = Sprite;
    })(Entity = Vidya.Entity || (Vidya.Entity = {}));
})(Vidya || (Vidya = {}));
var Vidya;
(function (Vidya) {
    var Entity;
    (function (Entity) {
        class Player extends Vidya.Entity.Sprite {
            constructor(playerSettings, playerImage) {
                super(playerSettings.pos, playerImage);
            }
            draw(ctx) {
                throw new Error("Method not implemented.");
            }
        }
        Entity.Player = Player;
    })(Entity = Vidya.Entity || (Vidya.Entity = {}));
})(Vidya || (Vidya = {}));
var Game;
(function (Game) {
    class Controls {
    }
    Game.Controls = Controls;
})(Game || (Game = {}));
//# sourceMappingURL=game.js.map