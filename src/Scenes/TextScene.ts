import { Container } from "pixi.js";

export class TextScene extends Container {
    private t : Text;

    constructor() {
        super();
        // const tStyle = new TextStyle({fontSize : 150,})

        this.t = new Text("Texto Ejemplo");
        this.t;

        //this.addChild(this.t);
    }
}