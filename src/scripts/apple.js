import { Food } from "./food";

export class Apple extends Food {
    constructor() {
        super('apple', 5);
        this.img = './src/assets/images/apple.png';
        this.x = 715*window.innerWidth/1280;
        this.y = 540*window.innerHeight/689;
    }
}