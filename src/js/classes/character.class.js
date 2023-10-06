class Character extends MoveableObject {

    x = 20;
    y = 160;
    width = 135;
    height = 270;
    ground = 430 - this.height;
    speed = 5;
    idleInt = 0; // Zähler für Idle-Animationen
    longIdle = false;
    throwBottle = false;
    meetsEndBoss = false;
    world; // Eigenschaft um auf das keyboard zuzugreifen
    imagesWalk = [
    '../pollo_loco/src/img/2_character_pepe/2_walk/W-21.png',
    '../pollo_loco/src/img/2_character_pepe/2_walk/W-22.png',
    '../pollo_loco/src/img/2_character_pepe/2_walk/W-23.png',
    '../pollo_loco/src/img/2_character_pepe/2_walk/W-24.png',
    '../pollo_loco/src/img/2_character_pepe/2_walk/W-25.png',
    '../pollo_loco/src/img/2_character_pepe/2_walk/W-26.png'
    ];
    imagesIdle = [
    '../pollo_loco/src/img/2_character_pepe/1_idle/idle/I-1.png',
    '../pollo_loco/src/img/2_character_pepe/1_idle/idle/I-2.png',
    '../pollo_loco/src/img/2_character_pepe/1_idle/idle/I-3.png',
    '../pollo_loco/src/img/2_character_pepe/1_idle/idle/I-4.png',
    '../pollo_loco/src/img/2_character_pepe/1_idle/idle/I-5.png',
    '../pollo_loco/src/img/2_character_pepe/1_idle/idle/I-6.png',
    '../pollo_loco/src/img/2_character_pepe/1_idle/idle/I-7.png',
    '../pollo_loco/src/img/2_character_pepe/1_idle/idle/I-8.png',
    '../pollo_loco/src/img/2_character_pepe/1_idle/idle/I-9.png',
    '../pollo_loco/src/img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    imagesLongIdle = [
    '../pollo_loco/src/img/2_character_pepe/1_idle/long_idle/I-11.png',
    '../pollo_loco/src/img/2_character_pepe/1_idle/long_idle/I-12.png',
    '../pollo_loco/src/img/2_character_pepe/1_idle/long_idle/I-13.png',
    '../pollo_loco/src/img/2_character_pepe/1_idle/long_idle/I-14.png',
    '../pollo_loco/src/img/2_character_pepe/1_idle/long_idle/I-15.png',
    '../pollo_loco/src/img/2_character_pepe/1_idle/long_idle/I-16.png',
    '../pollo_loco/src/img/2_character_pepe/1_idle/long_idle/I-17.png',
    '../pollo_loco/src/img/2_character_pepe/1_idle/long_idle/I-18.png',
    '../pollo_loco/src/img/2_character_pepe/1_idle/long_idle/I-19.png',
    '../pollo_loco/src/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    imagesJump = [
    '../pollo_loco/src/img/2_character_pepe/3_jump/J-34.png',
    '../pollo_loco/src/img/2_character_pepe/3_jump/J-35.png',
    '../pollo_loco/src/img/2_character_pepe/3_jump/J-36.png',
    '../pollo_loco/src/img/2_character_pepe/3_jump/J-37.png',
    '../pollo_loco/src/img/2_character_pepe/3_jump/J-38.png'
    ];
    imagesHurt = [
    '../pollo_loco/src/img/2_character_pepe/4_hurt/H-41.png',
    '../pollo_loco/src/img/2_character_pepe/4_hurt/H-42.png',
    '../pollo_loco/src/img/2_character_pepe/4_hurt/H-43.png'
    ]
    imagesDead = [
    '../pollo_loco/src/img/2_character_pepe/5_dead/D-51.png',
    '../pollo_loco/src/img/2_character_pepe/5_dead/D-52.png',
    '../pollo_loco/src/img/2_character_pepe/5_dead/D-53.png',
    '../pollo_loco/src/img/2_character_pepe/5_dead/D-54.png',
    '../pollo_loco/src/img/2_character_pepe/5_dead/D-55.png',
    '../pollo_loco/src/img/2_character_pepe/5_dead/D-56.png',
    '../pollo_loco/src/img/2_character_pepe/5_dead/D-57.png'
    ];

    constructor() {
        super().loadImage(this.imagesIdle[0]);
        this.loadImages(this.imagesWalk);
        this.loadImages(this.imagesJump);
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesLongIdle);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.applyGravity(this.ground);
        this.characterMovement();
        this.characterAnimation();
    };

    /**
     * Die Funktion characterMovement() steuert die Bewegung eines Charakters in einem Spiel basierend auf Tastatureingaben,
     * einschließlich des Gehens nach links oder rechts und Springens
     */
    characterMovement() {
        setInterval(() => {
            characterWalkingAudio.pause();
            if (this.moveRightConditions()) {
                this.characterMovesRight();
            } else if (this.moveLeftConditions()) {
                this.characterMovesLeft();
            }
            if (this.jumpConditions()) {
                this.characterJumps();
            }
            this.world.cameraX = -this.x + 100;
        }, 1000 / 60);
    }

    /**
    * Die Funktion moveRightConditions() gibt true zurück, wenn die rechte Pfeiltaste gedrückt wird,
    * der Charakter nicht tot, nicht beim Endboss ist und das Spiel nicht vorbei ist
    * @returns {Boolean}
    */
    moveRightConditions() {
        return this.world.keyboard.right && !this.isDead() && !this.meetsEndBoss && !gameOver;
    }

    /**
     * Diese Funktion bewegt den Charakter nach rechts und ändert die Geh-Einstellungen
     */
    characterMovesRight() {
        this.moveRight();
        this.changeWalkSettings(false);
    }

    /**
    * Die Funktion moveLeftConditions() gibt true zurück, wenn die linke Pfeiltaste gedrückt wird, die x-Position des Charakters größer ist als der Level-Anfang,
    * der Charakter nicht tot, nicht beim Endboss ist und das Spiel nicht vorbei ist
    * @returns {Boolean}
    */
    moveLeftConditions() {
        return this.world.keyboard.left && this.x > this.world.level.levelStart && !this.isDead() && !this.meetsEndBoss && !gameOver;
    }

    /**
     * Diese Funktion bewegt den Charakter nach links und ändert die Geh-Einstellungen
     */
    characterMovesLeft() {
        this.moveLeft();
        this.changeWalkSettings(true);
    }

    /**
    * Die Funktion jumpConditions() gibt true zurück, wenn der Charakter auf dem Boden, nicht tot, nicht beim Endboss ist und das Spiel nicht vorbei ist
    * @returns {Boolean}
    */
    jumpConditions() {
        return this.world.keyboard.up && !this.isAboveGround(this.ground) && !this.isDead() && !this.meetsEndBoss && !gameOver;
    }

    /**
     * Diese Funktion lässt den character springen und spielt eine audio ab
     */
    characterJumps() {
        this.jump(30);
        characterJumpAudio.play();
    }

    /**
    * Die Funktion ändert die Geh-Einstellungen basierend auf einem booleschen Wert und spielt Audio ab, wenn sich der Charakter nicht über dem Boden befindet
    * @param {Boolean} boolean - boolescher Wert, der die Richtung des Gehens bestimmt
    * Wenn er auf "true" gesetzt ist, bedeutet dies, dass die Gehrichtung in die entgegengesetzte Richtung gesetzt wird (links)
    * Wenn er auf "false" gesetzt ist, bedeutet dies, dass die Gehrichtung auf die aktuelle Richtung gesetzt wird (rechts)
    */
    changeWalkSettings(boolean) {
        this.otherDirection = boolean;
        if (!this.isAboveGround(this.ground)) {
            characterJumpAudio.pause();
            characterWalkingAudio.play();
        };
    }

    /**
    * Die Funktion überprüft, ob der Character auf ein Chicken Objekt gesprungen ist
    * @param obj - Chicken Objekt
    * @returns
    */
    isJumpOn(obj) {
        if ((this.x + 30) + this.width * 0.6 > (obj.x + 5) + obj.width * 0.25 && 
            (this.y + 100) + this.height * 0.6 >= obj.y &&
            (this.y + 100) + this.height * 0.6 < obj.y + obj.height * 0.5 &&
            (this.x + 30) < (obj.x + 5) + obj.width * 0.5 && 
            (this.y + 100) < obj.y) {
            return true;
        }
    }

    /**
    * Die Funktion "characterAnimation" ruft verschiedene Animationsfunktionen für das Gehen, Springen, Schlafen, Verletztwerden und Sterben auf
    */
    characterAnimation() {
        this.walkAnimation();
        this.jumpAnimation();
        this.idleAnimation();
        this.hurtAnimation();
        this.deadAnimation();
    }

    /**
     * Überprüft in einem festgelegten Intervall, ob sich der Charakter nicht über dem Boden befindet und ob er sich nach links oder rechts bewegt
     * Wenn dies der Fall ist, löst es die Walk Animation aus
     */
    walkAnimation() {
        setInterval(() => {
            if (this.walkAnimationConditions()) {
                this.animation(this.imagesWalk);
            }
        }, 100);
    }

    /**
    * Die Funktion walkAnimationConditions() gibt true zurück, wenn die rechte oder linke Pfeiltaste gedrückt ist,
    * der Charakter auf dem Boden, nicht verletzt, nicht tot, nicht beim Endboss ist und das Spiel nicht vorbei ist
    * @returns {Boolean}
    */
    walkAnimationConditions() {
        return !this.isAboveGround(this.ground) && (this.world.keyboard.right || this.world.keyboard.left) && !this.isDead() && !this.meetsEndBoss && !gameOver;
    }

    /**
    * Die Funktion "jumpAnimation" überprüft kontinuierlich, ob sich der Charakter über dem Boden befindet und nicht tot ist, und führt dann eine Sprunganimation durch
    */
    jumpAnimation() {
        setInterval(() => {
            if (this.isAboveGround(this.ground) && !this.isDead()) {
                this.animation(this.imagesJump);
            }
        }, 250);
    }

    /**
    * Die Funktion idleAnimation überprüft, ob die Bedingungen für die Ruheposition erfüllt sind und setzt entweder den Charakter in eine Ruheposition
    * oder ändert die Einstellungen für die Ruheposition
    */
    idleAnimation() {
        setInterval(() => {
            if (this.idleConditions()) {
                this.characterRests();
            } else {
                this.changeIdleSettings();
            }
        }, 250)
    }

    /**
    * Die Funktion idleConditions() gibt true zurück, wenn weder die rechte, noch die linke Pfeiltaste gedrückt ist, keine Flasche geworfen wurde,
    * der Charakter auf dem Boden, nicht tot, nicht beim Endboss und das Spiel nicht vorbei ist
    * @returns {Boolean}
    */
    idleConditions() {
        return !this.isDead() && !this.meetsEndBoss && !this.isAboveGround(this.ground) && !this.world.keyboard.right && !this.world.keyboard.left && !this.throwBottle && !gameOver;
    }

    /**
    * Die Funktion characterRests überprüft, ob sich der Charakter in einem langen Ruhezustand befindet, und spielt die entsprechende Animation ab
    */
    characterRests() {
        if (!this.longIdle) {
            this.animation(this.imagesIdle);
            this.setLongIdle();
        } else {
            this.animation(this.imagesLongIdle);
        }
    }

    /**
     * Die Funktion "setLongIdle" erhöht den idleInt Zähler um +1 und setzt longIdle auf "true", wenn der Zähler 8 erreicht
     */
    setLongIdle() {
        this.idleInt++;
        if (this.idleInt == 8) {
            this.longIdle = true;
        }
    }

    /**
     * Die Funktion setzt den idleInt Zähler auf 0 und longIdle auf "false"
     */
    changeIdleSettings() {
        this.idleInt = 0;
        this.longIdle = false;
    }

    /**
    * Die Funktion "hurtAnimation" überprüft wiederholt, ob das Objekt verletzt ist, und löst eine spezifische Animation aus, wenn dies der Fall ist
    */
    hurtAnimation() {
        setInterval(() => {
            if (this.isHurt()) {
                characterHurtAudio.play();
                this.animation(this.imagesHurt);
            }
        }, 100);
    }

    /**
    * Die Funktion "deadAnimation" animiert den Tod des Charakters, indem sie seine Position und sein Bild ändert
    */
    deadAnimation() {
        setInterval(() => {
            if (this.isDead()) {
                characterHurtAudio.pause();
                gameAudio.pause();
                if (this.int == 50) {
                    stopGame('lose_game');
                }
                this.characterFalls();
                this.int++;
            }
        }, 50);
    }

    /**
    * Die Funktion "characterFalls" behandelt die Fall-Animation des Charakters wenn er besiegt wurde
    */
    characterFalls() {
        if (this.int < 2) {
            characterDeadAudio.play();
            this.speedY = 15;
        } else if (this.int < 6) {
            this.x -= 10;
            this.animation(this.imagesDead);
        } else {
            this.loadImage('../pollo_loco/src/img/2_character_pepe/5_dead/D-56.png');
            this.y += 10;
        }
    }
};