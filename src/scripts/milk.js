import { Food } from "./food";

export class Milk extends Food {
    constructor() {
        super('milk', 5);
        this.img = './src/assets/images/milk.png';
        this.x = 620*window.innerWidth/1280;
        this.y = 500*window.innerHeight/689;
    }
}