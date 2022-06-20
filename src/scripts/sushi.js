import { Food } from "./food";

export class Sushi extends Food {
    constructor() {
        super('sushi', 5);
        this.img = './src/assets/images/sushi.png';
        this.posX = 184;
        this.posY = 110;
        this.startingX = 184;
        this.startingY = 110;
    }
}