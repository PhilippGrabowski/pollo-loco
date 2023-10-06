class MoveableObject extends DrawableObject {
    
    speed;
    speedY = 0;
    accelerationY = 2;
    health = 100;
    lastHit = 0; // Speichert den Zeitpunkt wenn der Character mit einem Gegner kollidiert
    int = 0; // Zähler für Animationen

    /**
    * Die Methode moveRight() ist eine in der Klasse MoveableObject definierte Funktion
    * Sie wird verwendet, um das Objekt nach rechts zu bewegen, indem die x-Koordinate basierend auf dem aktuellen speed-Wert aktualisiert wird
    * Die x-Koordinate repräsentiert die horizontale Position des Objekts
    * Durch Hinzufügen des speed-Werts zur x-Koordinate wird das Objekt in Richtung der rechten Seite des Bildschirms bewegt
    */
    moveRight() {
        this.x += this.speed;
    };

    /**
    * Die Funktion moveLeft() ist eine Methode, die in der Klasse MoveableObject definiert ist
    * Sie wird verwendet, um das Objekt nach links zu bewegen, indem die x-Koordinate basierend auf dem aktuellen speed-Wert aktualisiert wird
    * Durch Subtrahieren des speed-Werts von der x-Koordinate wird das Objekt in Richtung der linken Seite des Bildschirms bewegt
    */
    moveLeft() {
        this.x -= this.speed;
    };

    /**
    * Die Methode jump(y) ist eine Funktion, die in der Klasse MoveableObject definiert ist
    * Sie wird verwendet, um das Objekt durch Setzen seiner vertikalen Geschwindigkeit (speedY) auf den im Parameter y übergebenen Wert springen zu lassen
    * Zusätzlich setzt sie die Eigenschaft currentImg auf 0, die zur Animation des Objekts verwendet wird
    * @param {Number} y - vertikale Geschwindigkeit für den Sprung
    */
    jump(y) {
        this.speedY = y;
        this.currentImg = 0;
    };

    /**
     * Die Methode applyGravity wird verwendet, um den Effekt der Schwerkraft auf das Objekt MoveableObject zu simulieren
     * Sie nimmt einen Parameter ground entgegen, der die y-Koordinate des Bodenniveaus repräsentiert
     * @param {Number} ground - y-Wert wenn Objekt sich auf dem Boden befindet
     */
    applyGravity(ground) {
        setInterval(() => {
            if (this.isAboveGround(ground) || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelerationY;
            }
        }, 1000 / 25);
    };

    /**
    * Die Methode isAboveGround(ground) überprüft, ob die y-Koordinate des Objekts über dem Bodenniveau liegt
    * Sie nimmt einen Parameter ground entgegen, der die y-Koordinate des Bodenniveaus repräsentiert
    * @param {Number} ground - y-Wert wenn Objekt sich auf dem Boden befindet
    * @returns 
    */
    isAboveGround(ground) {
        return this.y < ground;
    };

    /**
     * Die Methode animation ist eine Funktion, die in der Klasse MoveableObject definiert ist
     * Sie wird verwendet, um das Objekt zu animieren, indem sein Bild basierend auf einem Array von Bildpfaden geändert wird
     * @param {Array<String>} array - Array of image paths
     */
    animation(array) {
        let i = this.currentImg % array.length; // Modulo setzt currentImg wieder auf 0 nachdem das letzte Bild aus dem array geladen wurde
        let path = array[i];
        this.img = this.imageCache[path];
        this.currentImg++;
    };

    /**
     * Die Methode isColliding überprüft, ob das aktuelle Objekt mit einem anderen Objekt kollidiert
     * Sie nimmt einen obj-Parameter entgegen, der das andere Objekt repräsentiert
     * @param {Object} obj - kollidierendes Objekt
     * @param {Number} x - x Frame-Wert
     * @param {Number} y - y Frame-Wert
     * @param {Number} width - x Frame-Breite-Multiplikator
     * @param {Number} height - x Frame-Höhe-Multiplikator
     * @returns 
     */
    isColliding (obj, x, y, width, height) {
        if (this.isCollidingForwards(obj, x, y, height) || this.isCollidingBackwards(obj, x, y, width, height)) {
            return true;
        }
    };

    /**
     * Die Methode isColliding überprüft, ob das aktuelle Objekt mit einem anderen Objekt in der vorwärts Bewegung kollidiert
     * Sie nimmt einen obj-Parameter entgegen, der das andere Objekt repräsentiert
     * @param {Object} obj - kollidierendes Objekt
     * @param {Number} x - x Frame-Wert
     * @param {Number} y - y Frame-Wert
     * @param {Number} width - x Frame-Breite-Multiplikator
     * @param {Number} height - x Frame-Höhe-Multiplikator
     * @returns 
     */
    isCollidingForwards(obj, x, y, height) { 
        return (this.x + 30) + this.width * 0.6 > (obj.x + x) &&
        (this.y + 100) + this.height * 0.6 > obj.y + y &&
        (this.x + 30) < (obj.x + x) && 
        (this.y + 100) < (obj.y + y) + obj.height * height;
    }

    /**
     * Die Methode isColliding überprüft, ob das aktuelle Objekt mit einem anderen Objekt in der rückwärts Bewegung kollidiert
     * Sie nimmt einen obj-Parameter entgegen, der das andere Objekt repräsentiert
     * @param {Object} obj - kollidierendes Objekt
     * @param {Number} x - x Frame-Wert
     * @param {Number} y - y Frame-Wert
     * @param {Number} width - x Frame-Breite-Multiplikator
     * @param {Number} height - x Frame-Höhe-Multiplikator
     * @returns 
     */
    isCollidingBackwards(obj, x, y, width, height) {
        return (obj.x + x) + obj.width * width > (this.x + 30) &&
        (obj.y + y) + obj.height * height > (this.y + 100) &&
        (obj.x + x) < (this.x + 30) &&
        obj.y + y <  (this.y + 100) + this.height * 0.6;
    }

    /**
     * Die Methode hit(damage) wird verwendet, um die Gesundheit des MoveableObject um den angegebenen Schaden zu verringern
     * @param {Number} damage - Schaden
     */
    hit(damage) {
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    };

    /**
    * Die Methode isHurt() überprüft, ob das MoveableObject sich derzeit im verletzten Zustand befindet
    * Sie berechnet die vergangene Zeit seit dem letzten Treffer, indem sie den Zeitstempel lastHit von dem aktuellen Zeitstempel unter Verwendung von new Date().getTime() subtrahiert
    * Das Ergebnis wird durch 1000 geteilt, um es von Millisekunden in Sekunden umzuwandeln
    * Wenn die vergangene Zeit weniger als 0,3 Sekunden beträgt, gibt sie true zurück und zeigt damit an, dass sich das MoveableObject immer noch im verletzten Zustand befindet
    * Andernfalls gibt sie false zurück
    * @returns {Boolean}
    */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // Time in ms
        timePassed = timePassed / 1000;
        return timePassed < .3;
    };

    /* 
    * Die Methode "isDead()" überprüft, ob die Gesundheit des "MoveableObject" gleich 0 ist. Die Methode gibt true zurück, wenn die Gesundheit 0 ist, false sonst
    */
    isDead() {
        return this.health == 0;
    };
};