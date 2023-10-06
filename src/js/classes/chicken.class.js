class Chicken extends MoveableObject {

    y = 360;
    width = 60;
    height = 65;
    moving; // Intervall für Moving-Left
    movingAnimation; // Intervall für Animation Moving-Left
    imagesWalk = [
    '../pollo_loco/src/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    '../pollo_loco/src/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    '../pollo_loco/src/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    imagesDead = ['../pollo_loco/src/img/3_enemies_chicken/chicken_small/2_dead/dead.png'];

    constructor() {
        super().loadImage(this.imagesWalk[0]);
        this.loadImages(this.imagesWalk);
        this.loadImages(this.imagesDead);
        this.x = 700 + Math.random() * 1200;
        this.speed = 0.5 + Math.random() * 0.8;
        this.chickenMovement();
        this.walkAnimation();
    };

    /**
    * Die Funktion chickenMovement() ist dafür verantwortlich, das Hühnerobjekt kontinuierlich nach links zu bewegen
    */
    chickenMovement() {
        if (!this.isDead()) {
            this.moving = setInterval(() => {
                this.moveLeft();
            }, 1000 / 60);
        }
    };

    /**
    * Die Funktion "chickenIsAttacked" stoppt die Bewegung und Animation des Huhns, spielt einen besiegt Ton ab und setzt die Gesundheit des Huhns auf 0
    * Anschließend wird ein Bild aus dem imagesDead geladen
    */
    chickenIsAttacked() {
        clearInterval(this.moving);
        clearInterval(this.movingAnimation);
        deadChickenAudio.play();
        this.health = 0;
        this.loadImage(this.imagesDead[0]);
    }

    /**
    * Die Funktion walkAnimation löst es die Walk Animation aus
    */
    walkAnimation() {
        this.movingAnimation = setInterval(() => {
            this.animation(this.imagesWalk);
        }, 300);
    }
}