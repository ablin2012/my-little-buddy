export class Food {
    constructor(type, nutritionValue){
        this.type = type;
        this.nutritionValue = nutritionValue;
        this.height = 15;
        this.width = 15;
        this.img = './src/assets/images/apple.png';
        this.posX = 0;
        this.posY = 0;
        this.startingX = 0;
        this.startingY = 0;
    }

    draw(context){
        let base_image = new Image();
        console.log(context);
        console.log(this);
        base_image.src = this.img;
        base_image.onload = function(){
            console.log('after onload', this);
            context.drawImage(base_image, this.posX, this.posY, this.width, this.height);
        }.bind(this);
    }

    resetPos(){
        this.posX = this.startingX;
        this.posY = this.startingY;
    }
}