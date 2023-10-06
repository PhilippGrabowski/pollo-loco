let level1;

function initLevel() {
    level1 = new Level (
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new JumpingChicken(),
            new JumpingChicken(),
            new JumpingChicken(),
        ],
        [
            new Cloud(30),
            new Cloud(800),
            new Cloud(1400),
            new Cloud(2200),
            new Cloud(3500)
        ],
        [
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/air.png', -719),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/1_first_layer/2.png', -719),
    
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/air.png', 0),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/1_first_layer/1.png', 0),
    
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/air.png', 719),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/1_first_layer/2.png', 719),
    
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/air.png', 719*2),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/3_third_layer/1.png', 719*2),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/2_second_layer/1.png', 719*2),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/1_first_layer/1.png', 719*2),
    
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/air.png', 719*3),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/3_third_layer/2.png', 719*3),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/2_second_layer/2.png', 719*3),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/1_first_layer/2.png', 719*3),
    
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/air.png', 719*4),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/3_third_layer/1.png', 719*4),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/2_second_layer/1.png', 719*4),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/1_first_layer/1.png', 719*4),
    
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/air.png', 719*5),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/3_third_layer/2.png', 719*5),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/2_second_layer/2.png', 719*5),
            new BackgroundObject('../pollo_loco/src/img/5_background/layers/1_first_layer/2.png', 719*5)
        ],
        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
        ],
        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ]
    );
}