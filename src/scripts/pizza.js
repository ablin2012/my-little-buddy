import { Food } from "./food";

export class Pizza extends Food {
    constructor() {
        super('pizza', 5);
        this.img = './src/assets/images/pizza.png';
        this.x = 670*window.innerWidth/1280;
        this.y = 500*window.innerHeight/689;
    }
}