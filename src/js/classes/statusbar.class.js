class StatusBar extends DrawableObject {

    percentage = 100;
    healthBar;
    healthBarBlue = [
    '../pollo_loco/src/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    '../pollo_loco/src/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    '../pollo_loco/src/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    '../pollo_loco/src/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    '../pollo_loco/src/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    '../pollo_loco/src/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];
    healthBarOrange = [
    '../pollo_loco/src/img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
    '../pollo_loco/src/img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
    '../pollo_loco/src/img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
    '../pollo_loco/src/img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
    '../pollo_loco/src/img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
    '../pollo_loco/src/img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'
    ];

    constructor(x, boolean) {
        super();
        this.x = x;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.otherDirection = boolean;
        this.changeBarColor();
        this.setPercentage(100);
    }

    /**
    * Die Funktion ändert die Farbe der HealthBar basierend auf der otherDirection Eigenschaft
    */
    changeBarColor() {
        this.healthBar = (this.otherDirection) ? this.healthBarOrange : this.healthBarBlue;
        this.loadImages(this.healthBar);
    }

    /**
     * Die Funktion setzt den Prozentwert und aktualisiert die HealthBar basierend auf dem neuen Prozentwert
     * @param {Number} percentage - Health- Prozentwert
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.healthBar[this.resolveImageIndex()];
        this.img = this.imageCache[path]
    }

    /**
     * Die Funktion resolveImageIndex() gibt einen Bildindex zurück, der auf einem gegebenen Prozentwert basiert
     * @returns {Number} - Index
     */
    resolveImageIndex() {
        if (this.percentage > 80) {
            return 5;
        } else if (this.percentage > 60) {
            return 4;
        } else if (this.percentage > 40) {
            return 3;
        } else if (this.percentage > 20) {
            return 2;
        } else if (this.percentage > 0) {
            return 1;
        } else {
            return 0;
        }
    }
}