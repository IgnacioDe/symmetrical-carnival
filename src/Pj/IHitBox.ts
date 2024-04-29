import { Rectangle } from "pixi.js";

export interface IHitBox {
    getHitBox():Rectangle;
}

export function checkCollision(objA:IHitBox, objB:IHitBox): Rectangle | null {

    const rA = objA.getHitBox();
    const rB = objB.getHitBox();

    const rightmostLeft = Math.max(rA.left, rB.left);//rA.left < rB.left ? rB.left : rA.left;
    const leftmostRigth = Math.min(rA.right, rB.right);//rA.right > rB.right ? rB.right : rA.right;
    const bottommostTop = Math.max(rA.top, rB.top);//rA.top < rB.top ? rB.top : rA.top;
    const topmostBottom = Math.min(rA.bottom, rB.bottom);//rA.bottom < rB.bottom ? rB.bottom : rA.bottom;

    const makeSenseHorizontal = rightmostLeft < leftmostRigth;
    const makeSenseVertical = bottommostTop < topmostBottom;

    if ( makeSenseHorizontal && makeSenseVertical) 
    {
        const rec = new Rectangle();
        rec.x = rightmostLeft;
        rec.y = bottommostTop;
        rec.width = leftmostRigth - rightmostLeft;
        rec.height = topmostBottom - bottommostTop;
        return rec;
    } else {
        return null;
    }
    
}