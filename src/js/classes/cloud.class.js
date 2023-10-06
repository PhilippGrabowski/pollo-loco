class Cloud extends MoveableObject {

    y = 10;
    width = 720;
    height = 300;
    speed = 0.15;
    images = [
    '../pollo_loco/src/img/5_background/layers/4_clouds/1.png',
    '../pollo_loco/src/img/5_background/layers/4_clouds/2.png'
    ];

    constructor(x) {
        super().loadImage(this.images[Math.round(Math.random())]); // Lädt ein zufälligen img-Pfad aus dem images Array
        this.x = x;
        this.cloudMovement();
    };

    /**
     * Die Funktion cloudMovement() richtet eine setInterval-Funktion ein, die wiederholt die Methode moveLeft() des Cloud-Objekts ungefähr 60 Mal pro Sekunde aufruft
     * Dadurch entsteht der Effekt, dass die Wolke mit einer konstanten Geschwindigkeit nach links bewegt wird
     */
    cloudMovement() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    };
};