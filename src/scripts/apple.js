import { Food } from "./food";

export class Apple extends Food {
    constructor() {
        super('apple', 5);
        this.img = './src/assets/images/apple.png';
        this.x = 720*window.innerWidth/1280;
        this.y = 500*window.innerHeight/689;
    }
}