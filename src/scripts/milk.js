import { Food } from "./food";

export class Milk extends Food {
    constructor() {
        super('milk', 5);
        this.img = './src/assets/images/milk.png';
        this.posX = 104;
        this.posY = 110;
        this.startingX = 104;
        this.startingY = 110;
    }
}