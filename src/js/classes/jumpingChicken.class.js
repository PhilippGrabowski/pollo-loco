class JumpingChicken extends Chicken {

    y = 315;
    width = 100;
    height = 110;
    imagesWalk = [
    '../pollo_loco/src/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    '../pollo_loco/src/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    '../pollo_loco/src/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    imagesDead = ['../pollo_loco/src/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
    deadChickenAudio = new Audio('../pollo_loco/src/audio/dead_jumping_chicken.wav');
    ground = 430 - this.height;

    constructor() {
        super().loadImage(this.imagesWalk[0]);
        this.loadImages(this.imagesWalk);
        this.x = 1900 + Math.random() * 2400;
        this.speed = 0.6 + Math.random() * 0.8;
        this.speedY = 15 + Math.random() * 20;
        this.applyGravity(this.ground);
        this.jumpingChickenMovement(this.speedY);
    };

    /**
    * Die Funktion chickenMovement() lässt das Hühnerobjekt kontinuierlich nach links zu bewegen und entsprechend des y parameters in die Höhe springen
    */
    jumpingChickenMovement(y) {
        setInterval(() => {
            if (!this.isAboveGround(this.ground)) {
                this.jump(y);
                this.moveLeft();
            }
        }, 1000 / 60);
    };
}