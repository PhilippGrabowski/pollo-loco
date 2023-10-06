class Level {

    enemies;
    clouds;
    backgroundObjects;
    collectableCoins;
    collectableBottles;
    levelStart = 0; // min x Koordinate zu der character sich bewegen kann

    constructor(enemies, clouds, backgroundObjects, collectableCoins, collectableBottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableCoins = collectableCoins;
        this.collectableBottles = collectableBottles;
    };
};