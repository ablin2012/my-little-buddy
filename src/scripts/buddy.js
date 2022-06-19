export class Buddy {
    constructor(name){
        this.name = name;
        this.hungerLevel = 100;
        this.happyLevel = 100;
        this.exp = 0;
        this.level = 1;
    }

    // functions to alter progress bars
    expGain(points){
        this.exp += points;
    }

    hungerGain(points){
        this.hungerLevel += points;
    }

    happyGain(points){
        this.happyLevel += points;
    }

    hungerDrain(){
        setInterval(() =>{
            this.hungerLevel -= 2;
        }, 5000);
    }

    happyDrain(){
        setInterval(() =>{
            this.happyLevel -= 5;
        }, 5000);
    }

    // level-up logic
    levelUp(){
        if (this.exp === 100) {
            this.level += 1;
            this.exp = 0;
        }
    }

    // death logic
    isBuddyDead(){
        if (this.happyLevel === 0 || this.hungerLevel === 0) {
            return true;
        } else {
            return false;
        }
    }
}