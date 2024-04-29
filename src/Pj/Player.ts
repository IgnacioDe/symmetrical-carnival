import { AnimatedSprite, Graphics, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { MovePhysics } from "./MovePhysics";
import { Keyboard } from "../Teclado/Keyboard";
import { IHitBox } from "./IHitBox";
import { HEIGTH, WIDTH } from "..";

export class Player extends MovePhysics implements IHitBox{

    private animatedMilei: AnimatedSprite;
    private static readonly GRAVITY = 350;
    private static readonly MOVE_SPEED = 250;
    private static readonly JUMP_SPEED = 300;
    public canJump = true;
    private hitBox: Graphics;

    constructor()
    {
        super();

        this.animatedMilei = new AnimatedSprite(
            [
                Texture.from("./maili/milei.png"),
                Texture.from("./maili/milei2.png"),
                Texture.from("./maili/milei3.png"),
                Texture.from("./maili/milei4.png"),
                Texture.from("./maili/milei5.png")
            ],
            false
        );
        this.animatedMilei.play();
        this.animatedMilei.animationSpeed = 0.15;
        this.animatedMilei.width = 250;
        this.animatedMilei.height = 250;

        this.hitBox = new Graphics();
        this.hitBox.beginFill(0xFF00FF, 0.3);
        this.hitBox.drawRect(0,0,425,450);
        this.hitBox.endFill();
        this.hitBox.x = -25;
        this.hitBox.y = 0;

        this.addChild(this.animatedMilei);
        this.animatedMilei.addChild(this.hitBox);

        this.acceleration.y = Player.GRAVITY;
        Keyboard.down.on("KeyW", this.jump, this);
    }

    public override destroy(options:any){
        super.destroy(options);
        Keyboard.down.off("KeyW", this.jump);
    }

    public override update(deltaMS: number): void 
    {
        super.update(deltaMS/1000);
        this.animatedMilei.update(deltaMS / (1000/60));

        //Fisicas para que choque
        if (this.x > WIDTH) 
            {
                this.x = WIDTH;
            } else if (this.x < 0) 
            {
                this.x = 0;
            }
    
            if (this.y > HEIGTH) 
            {
                this.y = HEIGTH;
                this.speed.y = 0;
                this.canJump = true;
                // this.pj.speed.y = -500 * Math.random(); // para que rebote
            }
    
    
            // para poder hacer que se mueva mas lento aumentanmos el numero del index 
            /* for (let i = 0; i < 15000000; i++) {
                1+1
                //wasting time :p
            } */

        if (Keyboard.state.get("KeyD")) {
            this.speed.x = Player.MOVE_SPEED;
            this.scale.x = 1;
        } else if (Keyboard.state.get("KeyA")) {
            this.speed.x = -Player.MOVE_SPEED;
            this.scale.x = -1;
        }else {
            this.speed.x = 0;
        }

        if (Keyboard.state.get("KeyS")) {
            this.acceleration.y = Player.GRAVITY * 2;
        } else {
            this.acceleration.y = Player.GRAVITY;
        }
        
       /*if (Keyboard.state.get("KeyW")) {
            this.speed.y = -Player.MOVE_SPEED;
        } else if (Keyboard.state.get("KeyS")) {
            this.speed.y = Player.MOVE_SPEED;
        } else {
            this.speed.y = 0;
        }*/

        if (Keyboard.state.get("KeyW")) {
            this.jump();
            if (this.getHitBox().bottom == HEIGTH) {
                this.canJump = true;
            }
        } else {
            this.speed.y = 0;
        }
        
    }

    private jump() {
        if (this.canJump){
            this.canJump = false;
            this.speed.y = -Player.JUMP_SPEED;
        }
    }

    public getHitBox(): Rectangle {
        return this.hitBox.getBounds();
    }

    public separate(overlap: Rectangle, platform: ObservablePoint<any>) {
        if (overlap.width < overlap.height) {

            if (this.x > platform.x) {
                this.x += overlap.width;
            } else if (this.x < platform.x) {
                this.x -= overlap.width;
            }

        } else {

            /*if (this.y > platform.y) {
                this.y -= overlap.height;
                this.speed.y = 0;
                this.canJump = true;
            } else if (this.y < platform.y) {
                this.y += overlap.height;
            }*/
            this.y -= overlap.height;
            this.speed.y = 0;
            this.canJump = true;
        }
    }
}