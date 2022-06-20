import { Food } from "./food";

export class Carrot extends Food {
    constructor() {
        super('carrot', 5);
        this.img = './src/assets/images/eggplant.png';
        this.posX = 124;
        this.posY = 110;
        this.startingX = 124;
        this.startingY = 110;
    }
}