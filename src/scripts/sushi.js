import { Food } from "./food";

export class Sushi extends Food {
    constructor() {
        super('sushi', 5);
        this.img = './src/assets/images/sushi.png';
        this.x = 565*window.innerWidth/1280;
        this.y = 540*window.innerHeight/689;
    }
}