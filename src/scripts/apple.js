import { Food } from "./food";

export class Apple extends Food {
    constructor() {
        super('apple', 5);
        this.img = './src/assets/images/apple.png';
        this.posX = 144;
        this.posY = 110;
        this.startingX = 144;
        this.startingY = 110;
    }
}