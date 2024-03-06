import { Application, Loader, Sprite } from 'pixi.js'

const app = new Application<HTMLCanvasElement>({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1280,
	height: 720
});

window.addEventListener("resize", ()=>{
	const scaleX = window.innerWidth / app.screen.width;
	const scaleY = window.innerHeight / app.screen.height;
	const scale = Math.min(scaleX, scaleY);

	const gameWindth = Math.round(app.screen.width * scale);
	const gameHeight = Math.round(app.screen.height * scale);

	const margenHorizontal = Math.floor((window.innerWidth - gameWindth) / 2);
	const margenVerticval = Math.floor((window.innerHeight - gameHeight) / 2);

	app.view.style.width = gameWindth + "px";
	app.view.style.height = gameHeight + "px";

	app.view.style.marginLeft = margenHorizontal + "px";
	app.view.style.marginRight = margenHorizontal + "px";

	app.view.style.marginTop = margenVerticval + "px";
	app.view.style.marginBottom = margenVerticval + "px";
 	
});
window.dispatchEvent(new Event("resize"));

Loader.shared.add({url: "clampy.png", name: "Image"});

Loader.shared.onComplete.add(()=> {
	const image: Sprite = Sprite.from("Image");

	image.x = 0;
	image.y = 0;

	app.stage.addChild(image);
});

const clampy: Sprite = Sprite.from("clampy.png");

clampy.anchor.set(0.5);

clampy.x = app.screen.width / 2;
clampy.y = app.screen.height / 2;

app.stage.addChild(clampy);