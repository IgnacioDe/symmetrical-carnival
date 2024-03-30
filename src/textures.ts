import { Container, Sprite } from "pixi.js";

export class textures extends Container {
    constructor(){
        super();
        // const gato = Sprite.from("gato.png");
        const pj = Sprite.from("./maili/milei.png");

        //gato.anchor.set(0.5);
        pj.anchor.set(0.5);
        
        pj.scale.set(0.15,0.15);
        pj.position.set(650,330);
        //gato.scale.set(0.5,0.5);
        //gato.position.set(650,350);
        
        pj.angle = 45;
        //gato.angle = 0;
    
        this.addChild(pj);
        //this.addChild(gato);
    }
}