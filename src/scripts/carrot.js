import { Food } from "./food";

export class Carrot extends Food {
    constructor(window) {
        super('carrot', 5);
        this.img = './src/assets/images/eggplant.png';
        this.x = 520*window.innerWidth/1280;
        this.y = 500*window.innerHeight/689;
    }
}