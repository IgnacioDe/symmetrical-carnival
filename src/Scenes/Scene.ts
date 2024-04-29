import { Container, Texture, TilingSprite } from "pixi.js";
import { IScene } from "../Scenes/IScene";
import { Player } from "../Pj/Player";
import { Platform } from "../Pj/Platform";
import { checkCollision } from "../Pj/IHitBox";
import { HEIGTH, WIDTH } from "..";
// import { sound } from "@pixi/sound";

export class Scene extends Container implements IScene {
    private pj: Player;
    private suelo : Platform[];
    private world : Container;
    private background : TilingSprite;
    private timePass : number = 0;

    constructor() 
    {
        super();

        //sound.play("sonido_ejemplo");

        this.world = new Container();

        this.background = new TilingSprite(Texture.from("nubes.jpg"), WIDTH, HEIGTH);
        this.addChild(this.background);

        this.suelo = [];

        let suelo0 = new Platform();
        suelo0.position.set(0,HEIGTH);
        this.addChild(suelo0);
        this.world.addChild(suelo0);
        this.suelo.push(suelo0);

        suelo0 = new Platform();
        suelo0.position.set(500,HEIGTH);
        this.addChild(suelo0);
        this.world.addChild(suelo0);
        this.suelo.push(suelo0);

        suelo0 = new Platform();
        suelo0.position.set(1000,HEIGTH);
        this.addChild(suelo0);
        this.world.addChild(suelo0);
        this.suelo.push(suelo0);

        suelo0 = new Platform();
        suelo0.position.set(1500,HEIGTH);
        this.addChild(suelo0);
        this.world.addChild(suelo0);
        this.suelo.push(suelo0);

        // Ticker.shared.add(this.update,this);
        this.pj = new Player();
        this.addChild(this.pj);

        this.addChild(this.world);

    }

    public update(deltaTime:number, _deltaFrame:number){
        this.timePass += deltaTime;

        if ( 2) {
            this.timePass = 0;
            const suelo0 = new Platform();
            suelo0.position.set(WIDTH,HEIGTH);
            this.addChild(suelo0);
            this.world.addChild(suelo0);
            this.suelo.push(suelo0);
        }

        this.pj.update(deltaTime);
        // console.log(deltaFrame,Ticker.shared.FPS); // nos dara los frame´s y FPS

        for (let camino of this.suelo) {
            const overlap = checkCollision(this.pj, camino);

            if (overlap != null) {
                
                this.pj.separate(overlap, camino.position);

            }

            if (camino.getHitBox().right < 0) {
                camino.destroy();
                const suelo0 = new Platform();
                suelo0.position.set(this.suelo[-1].getHitBox().height,HEIGTH);
                this.addChild(suelo0);
                this.world.addChild(suelo0);
                this.suelo.push(suelo0);
            }
        }

        this.suelo = this.suelo.filter((elem) => !elem.destroyed);

        this.world.x = -this.pj.x * this.worldTransform.a + WIDTH/4;
        this.background.tilePosition.x = this.world.x * 0.5;

        this.world.y = -this.pj.y * this.worldTransform.d + HEIGTH/2;
    }
}

//this.aniamtedMilei.tint = 0xFF0000; // color rojo (usar para cuando reciba daño)