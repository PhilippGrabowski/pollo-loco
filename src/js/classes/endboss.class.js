class EndBoss extends MoveableObject {

    width = 250;
    height = 400;
    speed = 2;
    isMoving = false;
    jumpAttackCounter = 0;
    world; // Eigenschaft um auf das keyboard zuzugreifen
    imagesWalk = ['../pollo_loco/src/img/4_enemie_boss_chicken//1_walk/G1.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//1_walk/G2.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//1_walk/G3.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//1_walk/G4.png'];
    imagesAlert = ['../pollo_loco/src/img/4_enemie_boss_chicken//2_alert/G5.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//2_alert/G6.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//2_alert/G7.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//2_alert/G8.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//2_alert/G9.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//2_alert/G10.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//2_alert/G11.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//2_alert/G12.png'];
    imagesAttack = ['../pollo_loco/src/img/4_enemie_boss_chicken//3_attack/G13.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//3_attack/G14.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//3_attack/G15.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//3_attack/G16.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//3_attack/G17.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//3_attack/G18.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//3_attack/G19.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//3_attack/G20.png'];
    imagesHurt = ['../pollo_loco/src/img/4_enemie_boss_chicken//4_hurt/G21.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//4_hurt/G22.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//4_hurt/G23.png'];
    imagesDead = ['../pollo_loco/src/img/4_enemie_boss_chicken//5_dead/G24.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//5_dead/G25.png',
    '../pollo_loco/src/img/4_enemie_boss_chicken//5_dead/G26.png'];

    constructor() {
        super().loadImage(this.imagesWalk[3]);
        this.loadImages(this.imagesWalk);
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imagesAttack);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesDead);
        this.x = 4250;
        this.y = 450 - this.height;
        this.loadAnimations();
    };

    /**
    * Die Funktion "loadAnimations" lädt verschiedene Animationen für verschiedene Aktionen (Intro, laufen, attackieren, sterben; verletzt werden)
    */
    loadAnimations() {
        this.entryAnimation();
        this.walkAnimation();
        this.alertAnimation();
        this.attackAnimation();
        this.hurtAnimation();
        this.deadAnimation();
    }

    /**
     * Die Funktion entryAnimation() ist verantwortlich für die Animation des Eintritts des Endboss-Charakters in das Spiel
     */
    entryAnimation() {
        let interval = setInterval(() => {
            if (this.world.character.meetsEndBoss && this.x > 3600) {
                this.endBossWalkIn();
            } else if (this.world.character.meetsEndBoss && this.x <= 3600) {
                this.endBossStoppsforCharacter(interval);
            }
        }, 1000 / 60);
    };

    /**
    * Die Funktion "endBossWalkIn" lässt den Charakter im Spiel nach links gehen, während eine Leerlaufanimation abgespielt wird und der Spielaudio pausiert wird
    */
    endBossWalkIn() {
        this.world.character.loadImage(this.world.character.imagesIdle[0]);
        gameAudio.pause();
        this.moveLeft();
        this.isMoving = true;
    }

    /**
    * Die Funktion stoppt den Endboss vor dem Character und beendet die Walk-Audio
    * @param interval - Intervall Timer
    */
    endBossStoppsforCharacter(interval) {
        endBossWalkAudio.pause();
        this.isMoving = false;
        this.loadImage(this.imagesWalk[1]);
        this.int++;
        clearInterval(interval);
    }

    /**
   * Die Funktion "walkAnimation" spielt eine Gehaudio ab und animiert ein Bild, wenn sich der Endboss bewegt
   */
    walkAnimation() {
        setInterval(() => {
            if (this.isMoving) {
                endBossWalkAudio.play();
                this.animation(this.imagesWalk);
            }
        }, 300);
    }

    /**
    * Die Funktion "alertAnimation()" setzt ein Intervall, das überprüft, ob eine Variable "int" zwischen 0 und 9 liegt. Wenn dies der Fall ist
    * lässt es den Endboss aufschreien und setzt Einstellungen für die Battleanimation (Character kann sich wieder bewegen, setzt speed des Endbosses auf 40)
    */
    alertAnimation() {
        let interval = setInterval(() => {
            if (this.int > 0 && this.int < 9) {
               this.endBossAlerts();
               this.endBossReadyforAttack(interval);
            }
        }, 300);
    }

    /**
    * Die Funktion "endBossAlerts" spielt die Alert-Audio ab, als auch die Alert-Animation
    */
    endBossAlerts() {
        endBossAlertAudio.play();
        this.animation(this.imagesAlert);
        this.int++;
    }

    /**
     * The function "endBossReadyforAttack" überprüft, ob die Variable "int" gleich 9 ist. Wenn dies der Fall ist, setzt sie die Battle Einstellungen
     * @param interval - Intervall- Timer
     */
    endBossReadyforAttack(interval) {
        if (this.int == 9) {
            this.loadImage(this.imagesWalk[1]);
            this.world.character.meetsEndBoss = false;
            this.speed = 40;
            battleAudio.play();
            clearInterval(interval);
        }
    }

    /**
     * Die Funktion "attackAnimation" lässt den Endboss attackieren und spielt dessen Animation ab
     */
    attackAnimation() {
        setInterval(() => {
            if (this.int == 9 && !this.isHurt() && !this.isDead()) {
                this.animation(this.imagesAttack);
                if (this.jumpAttackCounter > 4 && this.jumpAttackCounter < 8) {
                    this.moveLeft();
                } else if (this.jumpAttackCounter == 8) {
                    this.jumpAttackCounter = -1;
                }
                this.jumpAttackCounter++
            }
        }, 100);
    }

    /**
     * Die Funktion "hurtAnimation" spielt die Hurt-Audio ab und ändert die Animation des Endboss, wenn er verletzt ist und seine Gesundheit über 10 liegt.
     */
    hurtAnimation() {
        setInterval(() => {
            if (this.isHurt() && this.health > 10) {
                endBossHurtAudio.play();
                this.animation(this.imagesHurt);
            }
        }, 100);
    }

    /**
     * Die Funktion "deadAnimation" überprüft, ob der Endboss tot ist. Wenn dies der Fall ist, ändert sie die Kampfeinstellungen, 
     * spielt eine Todesanimation ab, erhöht einen Zähler, der die Game Over-Animation auslöst
     */
    deadAnimation() {
        setInterval(() => {
            if (this.isDead()) {
                this.changeBattleSettings();
                this.animation(this.imagesDead);
                this.int++;
                this.gameOverAnimation();
            }
        }, 200);
    }

    /**
     * Die Funktion "changeBattleSettings" überprüft, ob eine Variable namens "int" gleich 9 ist
     * Wenn dies der Fall ist, pausiert sie den Kampf-Ton und spielt einen Ton für den besiegten Endboss ab. Danach setzt sie die Variable "int" auf 0
     */
    changeBattleSettings() {
        if (this.int == 9) {
            battleAudio.pause();
            endBossDeadAudio.play();
            this.int = 0;
        }
    }

    /**
     * Die Funktion "gameOverAnimation" überprüft, ob eine Variable "int" gleich 5 ist
     * Wenn dies der Fall ist, lädt sie ein bestimmtes Bild, spielt einen Sieg-Ton ab und beendet dann das Spiel mit einer 'win_game'-Meldung
     */
    gameOverAnimation() {
        if (this.int == 5) {
            this.loadImage(this.imagesDead[2]);
            winAudio.play();
            stopGame('win_game');
        }
    }
}