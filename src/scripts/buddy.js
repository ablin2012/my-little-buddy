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
        if (this.exp < 100) {
            this.exp += points;
        }
        if (this.exp > 100) {
            this.exp = 100;
        }

    }

    hungerGain(points){
        if (this.hungerLevel < 100) {
            this.hungerLevel += points;
        }
        if (this.hungerLevel > 100) {
            this.hungerLevel = 100;
        }
    }

    happyGain(points){
        if (this.happyLevel < 100) {
            this.happyLevel += points;
        }
        if (this.happyLevel > 100) {
            this.happyLevel = 100;
        }
    }

    hungerDrain(){
        if (this.hungerLevel > 1) {
            this.hungerLevel -= 1;
        }
    }

    happyDrain(){
        if (this.happyLevel > 2) {
            this.happyLevel -= 2;
        }
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