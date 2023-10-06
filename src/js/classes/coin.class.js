class Coin extends MoveableObject {

    width = 150;
    height = 150;
    imagesCoin = [
    '../pollo_loco/src/img/8_coin/coin_1.png',
    '../pollo_loco/src/img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage(this.imagesCoin[0]);
        this.loadImages(this.imagesCoin);
        this.x = 500 + Math.random() * 2500;
        this.y = 340 - Math.random() * 250;
        this.coinsAnimation();
    }

    /**
    * Löst pulsierende Coin-Animation aus
    */
    coinsAnimation() {
        setInterval(() => {
            this.animation(this.imagesCoin)
        }, 300);
    }
}