import { Application, Ticker } from "pixi.js";
import { interacts } from "./Teclado/interacts";
import { Keyboard } from "./Teclado/Keyboard";
import { Scene } from "./Scenes/Scene";

export const WIDTH = 1920;
export const HEIGTH = 1080;

const app = new Application<HTMLCanvasElement>({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: WIDTH,
	height: HEIGTH,
});

Keyboard.initialize();

window.addEventListener("resize", ()=>{
	const scaleX = window.innerWidth / app.screen.width;
	const scaleY = window.innerHeight / app.screen.height;
	const scale = Math.min(scaleX, scaleY);

	const gameWindth = Math.round(app.screen.width * scale);
	const gameHeight = Math.round(app.screen.height * scale);

	const margenHorizontal = Math.floor((window.innerWidth - gameWindth)/2);
	const margenVerticval = Math.floor((window.innerHeight - gameHeight)/2);

	app.view.style.width = gameWindth + "px";
	app.view.style.height = gameHeight + "px";

	app.view.style.marginLeft = margenHorizontal + "px";
	app.view.style.marginRight = margenHorizontal + "px";

	app.view.style.marginTop = margenVerticval + "px";
	app.view.style.marginBottom = margenVerticval + "px";
 	
});
window.dispatchEvent(new Event("resize"));
 

const texture = async () => {
	const myScene = new Scene();
	const myInteract = new interacts();
	app.stage.addChild(myScene);
	app.stage.addChild(myInteract);
	Ticker.shared.add(function (deltaFrame) {
		myScene.update(Ticker.shared.deltaMS, deltaFrame)
	});
}

texture();