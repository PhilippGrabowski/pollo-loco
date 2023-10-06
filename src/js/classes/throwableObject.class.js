class ThrowableObject extends MoveableObject {

    width = 80;
    height = 80;
    ground = 430 - this.height;
    throwDirection;
    hitsEnemy = false; // Merker das der Wurf einer Flasche den Gegner getroffen hat
    isSplashed = false; // Merker um zerplatzte Flasche aus dem canvas zu löschen
    world; // Eigenschaft um auf das keyboard zuzugreifen
    imagesBottleRotation = [
    '../pollo_loco/src/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    '../pollo_loco/src/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    '../pollo_loco/src/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    '../pollo_loco/src/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    imagesBottleSplash = [
    '../pollo_loco/src/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    '../pollo_loco/src/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    '../pollo_loco/src/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    '../pollo_loco/src/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    '../pollo_loco/src/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    '../pollo_loco/src/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, throwDirection) {
        super().loadImage('../pollo_loco/src/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.imagesBottleRotation);
        this.loadImages(this.imagesBottleSplash);
        this.x = x;
        this.y = y;
        this.throwDirection = throwDirection;
        this.applyGravity(this.ground);
        this.throw();
        this.loadAnimations();
    };

    /**
    * Die Methode throw() ist dafür verantwortlich, eine Flasche zu werfen
    */
    throw() {
        bottleThrowAudio.play();
        this.speedY = 30;
        setInterval(() => {
            if (this.isThrown()) {
                this.x = (this.throwDirection) ? this.x - 10 : this.x + 10;
            }
        }, 50);
    }

    /**
    * Die Funktion überprüft, ob der Wert von "y" kleiner ist als der Wert von "ground" und somit die Flasche noch in der Luft befindet
    * @returns {Boolean}
    */
    isThrown() {
        return this.y < this.ground;
    }

    /**
    * Die Funktion "loadAnimation" ruft verschiedene Animationsfunktionen für das Werfen und Zerplatzen der Flasche auf
    */
    loadAnimations() {
        this.throwAnimation();
        this.splashAnimation();
    }

    /**
    * Die Funktion "throwAnimation" löst die Animation einer sich rotierenden und geworfenen Flasche aus
    */
    throwAnimation() {
        setInterval(() => {
            if (this.isThrown()) {
                this.animation(this.imagesBottleRotation);
            }
        }, 50);
    }

    /**
    * Die Funktion "splashAnimation" löst einen Sound und die Animation des Zerplatzens der Flasche aus
    */
    splashAnimation() {
        setInterval(() => {
            if ((this.y >= this.ground || this.hitsEnemy) && this.int < 3) {
                bottleSmashAudio.play();
                this.animation(this.imagesBottleSplash);
                this.int++;
            } else if (this.int >= 3) {
                this.isSplashed = true;
            }
        }, 100);
    }
}