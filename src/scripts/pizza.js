import { Food } from "./food";

export class Pizza extends Food {
    constructor() {
        super('pizza', 5);
        this.img = './src/assets/images/pizza.png';
        this.posX = 164;
        this.posY = 110;
        this.startingX = 164;
        this.startingY = 110;
    }
}