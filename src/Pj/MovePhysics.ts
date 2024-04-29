import { Container, Point } from "pixi.js";

export class MovePhysics extends Container {
    public speed : Point = new Point();
    public acceleration: Point = new Point();

    public update(deltaSecons:number) {
        this.x += this.speed.x * deltaSecons + 1/2 * this.acceleration.x * Math.pow(deltaSecons,2);
        this.y += this.speed.y * deltaSecons + 1/2 * this.acceleration.y * Math.pow(deltaSecons,2);

        this.speed.x += this.acceleration.x * deltaSecons;
        this.speed.y += this.acceleration.y * deltaSecons;
    }

}