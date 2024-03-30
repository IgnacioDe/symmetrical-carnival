import { AnimatedSprite, Container, Graphics, Texture, Text, NineSlicePlane } from "pixi.js";
import { textures } from "./textures";

export class Scene extends Container {
    constructor() 
    {
        super();
        
        const texts = new textures();

	    texts.x = this.width / 2;
	    texts.y = this.height / 2;
	
	    this.addChild(texts);

        //Nine-Slice Plane
        //const panel = new Sprite("algo.png");
        const panel = new NineSlicePlane(
            Texture.from("./casa_rosada.jpg"),
            40,40,40,40
        );
        this.addChild(panel);
        panel.width = 650;
        panel.height = 365;
        panel.scale.set(2);
        panel.position.x = -5;
        panel.position.y = 0;

        const animatedMilei = new AnimatedSprite(
            [
                Texture.from("./maili/milei.png"),
                Texture.from("./maili/milei2.png"),
                Texture.from("./maili/milei3.png"),
                Texture.from("./maili/milei4.png"),
                Texture.from("./maili/milei5.png")
            ],
            true
        );
        animatedMilei.play();
        animatedMilei.animationSpeed = 0.2;
        animatedMilei.position.set(450,350);
        animatedMilei.width = 350;
        animatedMilei.height = 350;
        this.addChild(animatedMilei);

        //Graph
        const myGraph = new Graphics();
        //tipo de trazo con anchura, color, etc.
       // myGraph.lineStyle({color: 0xFF00FF, width: 10, alpha: 1});
        //1280x720
        //myGraph.moveTo(0,0);
        //myGraph.lineTo(300,500);
        //myGraph.lineTo(300,100);
        //myGraph.lineTo(0,0);

        //myGraph.clear();

        //myGraph.lineStyle({color: 0xFF00FF, width: 10, alpha: 1});
        //myGraph.beginFill(0x00FF00,1);
        //myGraph.drawCircle(0,0,100);
        //myGraph.endFill();
        //myGraph.drawCircle(50,50,100);
        
        //myGraph.position.set(1280/2,720/2);
        this.addChild(myGraph);

        //Text
        const myText = new Text("Hello word", {fontSize: 100, fill: 0xFF0000, fontFamily: "Arial"});
        // myText.text = "Hola mundo";
        myText.position.x = 200;
        myText.angle = 0;
        myText.scale.set(1);
        this.addChild(myText);

    }
}