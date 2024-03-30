import { Container, Sprite, Text } from "pixi.js";

export class interacts extends Container {
    constructor() {
        super();
        const dialog = new Container();
        dialog.x = 100;
        dialog.y = 50;

        const background = Sprite.from("window");
        dialog.addChild(background);

        const buttonMouse = Sprite.from("Button Default Mouse");
        buttonMouse.anchor.set(0.5);
        buttonMouse.x = background.width / 2 - buttonMouse.width * 0.6;
        buttonMouse.y = background.height + 20;
        buttonMouse.on("mousedown", this.onMouseDown, this);
        buttonMouse.on("mouseup", this.onMouseUp, this);
        buttonMouse.interactive = true;
        dialog.addChild(buttonMouse);
        
        const buttonTouch = Sprite.from("Button Default Touch");
        buttonTouch.anchor.set(0.5);
        buttonTouch.x = background.width / 2 + buttonTouch.width * 0.6;
        buttonTouch.y = buttonMouse.y;

        const buttonPointer = Sprite.from("Button Default Ponter");
        buttonPointer.anchor.set(0.5);
        buttonPointer.x = background.width / 2;
        buttonPointer.y = buttonMouse.y + 200;
        dialog.addChild(buttonPointer);

        const lastKeyPressed = new Text("Wait...", {fontSize: 48});
        lastKeyPressed.anchor.set(0.5);
        lastKeyPressed.x = background.width / 2;
        lastKeyPressed.y = buttonPointer.y + 175;
        dialog.addChild(lastKeyPressed);

        this.addChild(dialog);
    }

    private onMouseDown(): void {
        console.log("mouse down");
    }

    private onMouseUp(): void {
        console.log("mouse up");
    }
}