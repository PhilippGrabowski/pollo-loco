class Status extends DrawableObject {

    collected;
    coinImage = [
    '../pollo_loco/src/img/8_coin/coin_1.png',
    '../pollo_loco/src/img/6_salsa_bottle/salsa_bottle.png',
    '../pollo_loco/src/img/7_statusbars/3_icons/icon_health_endboss.png'
    ];

    constructor (x, y, width, height, collected, index) {
        super().loadImage(this.coinImage[index]);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.collected = collected;
    }
}