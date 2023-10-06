class Bottle extends MoveableObject {

    y = 350;
    width = 80;
    height = 80;
    imagesBottle = ['../pollo_loco/src/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'];

    constructor() {
        super().loadImage(this.imagesBottle[0]);
        this.x = 500 + Math.random() * 2500;
    }
}