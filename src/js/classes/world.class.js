class World {
    character = new Character();
    endBoss = new EndBoss();
    level = level1;
    ctx;
    canvas;
    keyboard;
    cameraX = 0;
    characterHealth = new StatusBar(20, false, 0);
    endBossHealth = new StatusBar(500, true, 1);
    coinStatus = new Status(-10, 30, 120, 120, 0, 0);
    bottleStatus = new Status(100, 55, 80, 60, 5, 1);
    endBossStatus = new Status(653, 12, 50, 50, 0, 2)
    throwableObjects = [];
    firstCollision = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    };

    /**
    * Rendert die Spielwelt auf der Leinwand (canvas)
    */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Canvas wird gelöscht
        
        this.ctx.translate(this.cameraX, 0); // Verschiebt Kamera entlang der x-Achse enstprechend dem cameraX Wert
        this.addObjectsToWorld(this.level.backgroundObjects);
        this.addObjectsToWorld(this.level.clouds);
        this.addObjectsToWorld(this.throwableObjects);
        this.addObjectToWorld(this.character);
        this.addObjectsToWorld(this.level.enemies);
        this.addObjectToWorld(this.endBoss);
        this.addObjectsToWorld(this.level.collectableCoins);
        this.addObjectsToWorld(this.level.collectableBottles);
        
        this.ctx.translate(-this.cameraX, 0);
        this.addObjectToWorld(this.characterHealth);
        this.addObjectToWorld(this.coinStatus);
        this.addObjectToWorld(this.bottleStatus);
        this.ctx.font = 'normal 100 25px san-serif';
        this.ctx.strokeStyle = 'rgb(255,206,22)';
        this.ctx.strokeText(`x ${this.coinStatus.collected}`, 75, 100);
        this.ctx.strokeText(`x ${this.bottleStatus.collected}`, 160, 100);

        if (this.character.meetsEndBoss || this.endBoss.int > 0) {
            this.addObjectToWorld(this.endBossHealth);
            this.addObjectToWorld(this.endBossStatus);
        }

        let self = this;
        requestAnimationFrame(function() { // Draw Funktion wird immer wieder aufgerufen
            self.draw();
        });
    };

    /**
    * Die Funktion setWorld() setzt die world-Eigenschaft des character-Objekts auf die aktuelle Instanz der Klasse World
    * Dadurch hat das character-Objekt Zugriff auf die World-Instanz sowie deren Eigenschaften und Methoden
    */
    setWorld() {
        this.character.world = this;
        this.endBoss.world = this;
    };

    /**
    * Die Funktion addObjectsToWorld ist eine Methode der Klasse World
    * Sie nimmt ein Array von Objekten als Parameter entgegen und fügt jedes Objekt der Welt hinzu, indem die Methode addObjectToWorld für jedes Objekt
    * im Array aufgerufen wird. Dadurch können mehrere Objekte gleichzeitig zur Welt hinzugefügt werden
    * @param {Object} object
    */
    addObjectsToWorld(object) {
        object.forEach(o => {
            this.addObjectToWorld(o);
        });
    };

    /**
     * Die Funktion addObjectToWorld ist eine Methode der Klasse World
     * Sie nimmt ein moveableObject als Parameter entgegen und fügt es der Welt hinzu, indem sie die Methoden draw und drawFrame des moveableObject aufruft, 
     * um es auf der Leinwand zu zeichnen
     * @param {Object} moveableObject 
     */
    addObjectToWorld(moveableObject) {
        if (moveableObject.otherDirection) {
            this.flipImage(moveableObject);
        };
        moveableObject.draw(this.ctx);
        //moveableObject.drawFrame(this.ctx);
        if (moveableObject.otherDirection) {
            this.flipImageBacking(moveableObject);
        };
    };

    /**
     * Die Funktion flipImage kippt das Bild eines beweglichen Objekts horizontal
     * Dies geschieht, indem der aktuelle Zustand des Leinwandkontextes mithilfe der save-Methode gespeichert wird
     * Anschließend verschiebt sie den Leinwandkontext um die Breite des beweglichen Objekts, wodurch der Ursprung effektiv an den rechten Rand des Objekts verschoben wird
     * Danach skaliert sie den Leinwandkontext in der x-Achse mit -1, was das Bild horizontal spiegelt
     * Schließlich aktualisiert sie die x-Koordinate des beweglichen Objekts, indem sie sie mit -1 multipliziert, 
     * damit es nach dem Spiegeln des Bildes an der richtigen Position erscheint
     * @param {Object} moveableObject 
     */
    flipImage(moveableObject) {
        this.ctx.save();
        this.ctx.translate(moveableObject.width, 0);
        this.ctx.scale(-1, 1);
        moveableObject.x = moveableObject.x * -1;
    };

    /**
    * Die Funktion flipImageBacking stellt den Leinwandkontext nach dem horizontalen Spiegeln des Bildes eines beweglichen Objekts wieder her
    * Sie setzt die x-Koordinate des beweglichen Objekts auf ihren ursprünglichen Wert zurück, indem sie sie mit -1 multipliziert
    * Anschließend stellt sie den Leinwandkontext mit der restore-Methode in seinen vorherigen Zustand zurück
    * Dadurch wird sichergestellt, dass nachfolgende Zeichenoperationen nicht von dem gespiegelten Bild beeinflusst werden
    * @param {Object} moveableObject 
    */
    flipImageBacking(moveableObject) {
        moveableObject.x = moveableObject.x * -1;
        this.ctx.restore();
    };

    /**
     * Die run Funktion richtet zwei Intervalle ein, um kontinuierlich nach Kollisionen zu suchen, geplatzte Flaschen zu löschen,
     * die Position des Charakters zu erkennen und nach geworfenen Flaschen zu suchen
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.deleteSplashedBottles();
            this.detectCharacterPosition();
        }, 60);
        setInterval(() => {
            this.checkThrowObject();
        }, 100);
    }

    /* 
    * Die Funktion checkCollisions() ist dafür verantwortlich, verschiedene Arten von Kollisionen in der Spielwelt zu überprüfen
    */
    checkCollisions() {
        this.checkChickenCollisions();
        this.checkEndBossCollision();
        this.checkCoinCollision();
        this.checkBottleCollision()
    };

    /**
    * Die Funktion "checkChickenCollisions" überprüft Kollisionen zwischen dem Charakter, den geworfenen Flaschen und den Hühnern
    * @param {Object} enemy - Chicken Objekte
    */
    checkChickenCollisions() {
        this.level.enemies.forEach((enemy) => {
            this.characterAttacksChicken(enemy);
            this.chickenAttacksCharacter(enemy);
            this.bottleHitsChicken(enemy);
        });
    }

    /**
    * Die Funktion "characterAttacksChicken" überprüft, ob der Charakter auf einen feindlichen Huhn springt
    * Wenn ja, greift es das Huhn an und entfernt es nach einer Verzögerung aus dem Level
    * @param {Object} enemy - Chicken Objekte
    */
    characterAttacksChicken(enemy) {
        if (this.character.isJumpOn(enemy) && !this.character.isHurt() && this.firstCollision == 0) {
            this.firstCollision++;
            enemy.chickenIsAttacked();
            this.character.jump(20);
            setTimeout(() => {
                this.deleteObject(this.level.enemies, enemy);
                this.firstCollision = 0;
            }, 500);
        }
    }

    /**
    * Die Funktion überprüft, ob der Charakter mit einem Feind kollidiert, und wenn ja, verletzt es den Character
    * @param enemy - Chicken Objekte
    */
    chickenAttacksCharacter(enemy) {
        if (this.character.isColliding(enemy, 5, 0, 1, 1) && this.firstCollision == 0) {
            this.characterIsAttacked(1);
        }
    }

    /**
    * Die Funktion "bottleHitsChicken" überprüft, ob eine Flasche mit einem feindlichen Huhn kollidiert
    * Wenn ja, löst sie einen Angriff auf das Huhn aus und entfernt den Feind nach einer Verzögerung aus dem Level
    * @param enemy - Chicken Objekte
    */
    bottleHitsChicken(enemy) {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(enemy, 15, 15, 0.5, 0.5) && this.firstCollision == 0) {
                this.firstCollision++;
                enemy.chickenIsAttacked();
                bottle.hitsEnemy = true;
                setTimeout(() => {
                    this.deleteObject(this.level.enemies, enemy);
                    this.firstCollision = 0;
                }, 500);
            }
        })
    }

    /**
    * Die Funktion "checkEndBossCollision" überprüft Kollisionen zwischen dem Endboss und dem Charakter sowie Kollisionen zwischen Flaschen und dem Endboss
    */
    checkEndBossCollision() {
        this.checkEndBossHitsCharacter();
        this.checkBottleHitsEndBoss();
    }

    /**
    * Die Funktion überprüft, ob der Charakter mit dem Endboss kollidiert
    * Wenn ja, ruft sie die Funktion "characterIsAttacked" mit einem Schadenswert von 100 auf, welches den Character auf einen Schlag besiegt
    */
    checkEndBossHitsCharacter() {
        if (this.character.isColliding(this.endBoss, 40, 75, 0.7, 0.8)) {
            this.characterIsAttacked(100);
        }
    }

    /**
    * Die Funktion überprüft, ob eine Flasche mit dem Endboss kollidiert, und reduziert dessen Gesundheit, wenn dies der Fall ist
    */
    checkBottleHitsEndBoss() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isColliding(this.endBoss, 20, 100, 0.8, 0.7) && this.firstCollision == 0) {
                this.firstCollision++;
                this.endBoss.hit(4);
                this.endBossHealth.setPercentage(this.endBoss.health);
                bottle.hitsEnemy = true;
                this.firstCollision = 0;
            }
        });
    }

    /**
    * Die Funktion "characterIsAttacked" aktualisiert die Gesundheit eines Charakters und setzt den Gesundheitsprozentsatz
    * @param damage - Hinzugefügter Schaden
    */
    characterIsAttacked(damage) {
        this.character.hit(damage);
        this.characterHealth.setPercentage(this.character.health);
    }

    /**
    * Die Funktion überprüft Kollisionen zwischen dem Charakter und sammelbaren Münzen, spielt einen Sound ab, aktualisiert den Münzenstatus 
    * und entfernt die Münze aus dem Level
    */
    checkCoinCollision() {
        this.level.collectableCoins.forEach((coin) => {
            if (this.character.isColliding(coin, 45, 45, 0.4, 0.4) && this.firstCollision == 0) {
                coinAudio.play();
                this.firstCollision++;
                this.coinStatus.collected++;
                this.deleteObject(this.level.collectableCoins, coin);
                this.firstCollision = 0;
            }
        });
    }

    /**
    * Die Funktion überprüft Kollisionen zwischen dem Charakter und sammelbaren Flaschen, spielt einen Sound ab, aktualisiert den Flaschenstatus 
    * und entfernt die Flasche aus dem Level
    */
    checkBottleCollision() {
        this.level.collectableBottles.forEach((bottle) => {
            if (this.character.isColliding(bottle, 25, 10, 0.6, 0.8) && this.firstCollision == 0) {
                bottleAudio.play();
                this.firstCollision++;
                this.bottleStatus.collected++;
                this.deleteObject(this.level.collectableBottles, bottle);
                this.firstCollision = 0;
            }
        });
    }

    /**
    * Die Funktion deleteSplashedBottles() löscht alle Flaschen, die zerplatzt sind
    */
    deleteSplashedBottles() {
        this.throwableObjects.forEach((bottle) => {
            if(bottle.isSplashed) {
                this.deleteObject(this.throwableObjects, bottle);
                this.character.throwBottle = false;
            }
        });
    }

    /**
    * Die Funktion erkennt, ob die x-Position des Charakters größer oder gleich 3330 ist
    * und setzt eine Variable auf true, die angibt, dass der Charakter den Endboss getroffen hat
    */
    detectCharacterPosition() {
        if (this.character.x >= 3330 && this.endBoss.int == 0) {
            this.character.meetsEndBoss = true;
        }
    }

    /**
    * Die Funktion checkThrowObject() überprüft, ob die Taste 'b' gedrückt wurde und der Charakter mindestens eine Flasche gesammelt hat
    * Wenn alle Bedingungen erfüllt sind, wird die Eigenschaft throwBottle des Charakters auf true gesetzt,
    * die Anzahl der gesammelten Flaschen um eins verringert und ein neues ThrowableObject an der Position des Charakters mit der entsprechenden Richtung erstellt
    */
    checkThrowObject() {
        if (this.keyboard.b && this.bottleStatus.collected > 0 && !this.character.meetsEndBoss) {
            this.character.throwBottle = true;
            this.character.loadImage(this.character.imagesIdle[0]);
            this.bottleStatus.collected--;
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 50, this.character.otherDirection);
            this.throwableObjects.push(bottle);
        }
    }

    /**
     * Diese Funktion löscht Objekte aus einem Array
     * @param {Array<Object>} array - Array mit Objekten
     * @param {Object} object - zu löschendes Objekt
     */
    deleteObject(array, object) {
        array.splice(array.indexOf(object), 1);
    }
};