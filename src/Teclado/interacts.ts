import { Container, Sprite, Text, Texture } from "pixi.js";
import { Button } from "./Button";
import { Keyboard } from "./Keyboard";

export class interacts extends Container {

    private buttonPointer : Button;
    private lastKeyPressed : Text;

    constructor() {
        super();
        const dialog = new Container();
        dialog.x = 100;
        dialog.y = 50;

        const background = Sprite.from("window");
        dialog.addChild(background);

        this.buttonPointer = new Button(
            Texture.from("texture example def"), 
            Texture.from("texture example down"), 
            Texture.from("texture example over"), 
            );
        this.buttonPointer.on("buttonClick", this.onButtonClick, this);
        this.buttonPointer.x = background.width / 2 - this.buttonPointer.width * 0.6;
        this.buttonPointer.y = background.height + 20;
        dialog.addChild(this.buttonPointer);

        this.lastKeyPressed = new Text("Wait...", {fontSize: 48});
        this.lastKeyPressed.anchor.set(0.5);
        this.lastKeyPressed.x = background.width / 2;
        this.lastKeyPressed.y = this.buttonPointer.y + 175;
        //dialog.addChild(this.lastKeyPressed);

        this.addChild(dialog);

        Keyboard.down.on("KeyS", this.onKeyPress, this);
        Keyboard.up.on("KeyW", this.onKeyDespress, this);
    }

    private onButtonClick(): void{
        console.log("my new button clicked!", Keyboard.state.get("KeyA"));
    }

    private onKeyPress(): void{
        console.log("Down activated");
    }

    private onKeyDespress(): void{
        console.log("Down desactivated");
    }
}