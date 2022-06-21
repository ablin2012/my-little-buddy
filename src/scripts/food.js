export class Food {
    constructor(type, nutritionValue){
        this.type = type;
        this.nutritionValue = nutritionValue;
        this.height = 50;
        this.width = 50;
        this.img = './src/assets/images/apple.png';
        this.x = 0;
        this.y = 0;
        this.startingX = 0;
        this.startingY = 0;
    }

    draw(context){
        let base_image = new Image();
        base_image.src = this.img;
        base_image.onload = function(){
            context.drawImage(base_image, this.x, this.y, this.width, this.height);
        }.bind(this);
    }
}