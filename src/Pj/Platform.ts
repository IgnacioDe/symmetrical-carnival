import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitBox } from "./IHitBox";

export class Platform extends Container implements IHitBox{

    private hitBox: Graphics;
    private spr: Sprite;

    constructor(){
        super();

        this.spr = Sprite.from("./suelo.png");
        this.spr.scale.set(0.5,0.5);
        
        this.hitBox = new Graphics();
        this.hitBox.beginFill(0x00FFFF, 0.3);
        this.hitBox.drawRect(0,0,1080,245);
        this.hitBox.endFill();

        this.addChild(this.spr);
        this.spr.addChild(this.hitBox);
    }

    public getHitBox(): Rectangle{
        return this.hitBox.getBounds();
    }
}