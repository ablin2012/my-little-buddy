import { Food } from "./food";

export class Pizza extends Food {
    constructor() {
        super('pizza', 5);
        this.img = './src/assets/images/pizza.png';
        this.x = 665*window.innerWidth/1280;
        this.y = 540*window.innerHeight/689;
    }
}