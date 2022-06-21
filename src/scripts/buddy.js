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
            this.levelUp();
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

    passiveExpGain(){
        if (this.exp < 100) {
            this.exp += 2/this.level;
        } else if (this.happyLevel > 100 || this.happyLevel + 20/this.level > 100) {
            this.exp = 100;
        }
        this.levelUp();
    }

    hungerDrain(){
        if (this.hungerLevel > 0) {
            this.hungerLevel -= 0.1;
        } else {
            this.hungerLevel = 0;
        }
    }

    happyDrain(){
        if (this.happyLevel > 0) {
            this.happyLevel -= 0.2;
        } else {
            this.happyLevel = 0;
        }
    }

    // level-up logic
    levelUp(){
        if (this.exp >= 100) {
            this.level += 1;
            this.exp = 0;
        }
    }

    // death logic
    isBuddyDead(){
        if (this.happyLevel === 0 || this.hungerLevel === 0) {
            alert("pig is dead");
            return true;
        } else {
            return false;
        }
    }
}