class DrawableObject {

    x; // x position
    y; // y position
    img; // image object
    width;
    height;
    otherDirection = false;
    imageCache = {}; // JSON of image objects
    currentImg = 0; // aktuell zu ladendes image

    /**
    * Die Funktion loadImage(path) ist eine Methode der Klasse DrawableObject
    * Sie wird verwendet, um ein Bild von einem angegebenen Pfad zu laden und es der Eigenschaft img der DrawableObject-Instanz zuzuweisen
    * @param {String} path - Pfad des drawable objects
    */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    };

    /**
    * Die Methode loadImages wird verwendet, um mehrere Bilder aus einem Array von Pfaden zu laden
    * und sie in der Eigenschaft imageCache der DrawableObject-Instanz zu speichern
    * @param {Array<String>} array - Array of image paths
    */
    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    };

    /**
     * Die Funktion draw(ctx) ist eine Methode der Klasse DrawableObject
     * Sie wird verwendet, um ein Bild dem canvas hinzuzufügen
     * @param {*} ctx - 2D context des canvas elements
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // Fügt Bild dem canvas hinzu
    };

    /**
     * Die Methode drawFrame(ctx) wird verwendet, um einen Rahmen um das zeichenbare Objekt auf der Leinwand zu zeichnen
     * @param {*} ctx - 2D context des canvas elements
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof EndBoss || this instanceof Coin || this instanceof Bottle || this instanceof ThrowableObject) {
        ctx.beginPath();
        ctx.lineWidth = '5';
        ctx.strokeStyle = 'blue';
        if (this instanceof Character) {
            ctx.rect(this.x + 30, this.y + 115, this.width * 0.5, this.height * 0.52);
        } else if (this instanceof Chicken) {
            ctx.rect(this.x + 5, this.y, this.width * 0.9, this.height);
        } else if (this instanceof EndBoss) {
            ctx.rect(this.x + 40, this.y + 75, this.width * 0.7, this.height * 0.8);
        } else if (this instanceof Coin) {
            ctx.rect(this.x + 45, this.y + 45, this.width * 0.4, this.height * 0.4);
        } else if (this instanceof Bottle) {
            ctx.rect(this.x + 25, this.y + 10, this.width * 0.6, this.height * 0.8);
        } else if (this instanceof ThrowableObject) {
            ctx.rect(this.x + 10, this.y + 10, this.width * 0.8, this.height * 0.8);
        }
        ctx.stroke();
    }};
}