let canvas;
let world;
let win = false;
let gameOver = false;
let keyboard = new Keyboard();
let intervalIds = [];
let gameAudio = new Audio('../pollo_loco/src/audio/game_music.wav');
gameAudio.volume = 0.2;
let battleAudio = new Audio('../pollo_loco/src/audio/battle.mp3');
battleAudio.volume = 0.4;
let winAudio = new Audio('../pollo_loco/src/audio/win.wav');
winAudio.volume = 0.4;
let coinAudio = new Audio('../pollo_loco/src/audio/collect_coin.mp3');
let bottleAudio = new Audio('../pollo_loco/src/audio/collect_bottle.wav');
let bottleThrowAudio = new Audio('../pollo_loco/src/audio/throw.mp3');
let bottleSmashAudio = new Audio('../pollo_loco/src/audio/glass_shatter.mp3');
let characterWalkingAudio = new Audio('../pollo_loco/src/audio/walking.mp3');
let characterJumpAudio = new Audio('../pollo_loco/src/audio/jump.mp3');
let characterHurtAudio = new Audio('../pollo_loco/src/audio/hurt.mp3');
let characterDeadAudio = new Audio('../pollo_loco/src/audio/dead_character.mp3');
let deadChickenAudio = new Audio('../pollo_loco/src/audio/dead_chicken.mp3');
let endBossAlertAudio = new Audio('../pollo_loco/src/audio/alert.wav');
let endBossWalkAudio = new Audio('../pollo_loco/src/audio/walk.wav');
let endBossHurtAudio = new Audio('../pollo_loco/src/audio/endBoss_hurt.mp3');
let endBossDeadAudio = new Audio('../pollo_loco/src/audio/endBoss_dead.wav');
let allAudios = [coinAudio, bottleAudio, bottleThrowAudio, bottleSmashAudio, characterWalkingAudio, characterJumpAudio, characterHurtAudio, characterDeadAudio, 
deadChickenAudio, endBossAlertAudio, endBossWalkAudio, endBossHurtAudio, endBossDeadAudio];

/**
* Die Funktion initialisiert eine Leinwand und erstellt eine neue Instanz der Klasse "World"
*/
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
};

/**
* Die Funktion "startGame" initialisiert das Spiellevel, blendet den Startbildschirm aus, spielt die Spielmusik ab und initialisiert das Spiel
*/
function startGame() {
    initLevel();
    document.getElementById('start_screen').classList.add('d-none');
    gameAudio.play();
    init();
}

/**
* Diese Funktion lädt die Seite neu
*/
function restart() {
    location.reload();
}

/**
* Die Funktion "playOutro" entfernt die 'd-none' Klasse von den Elementen "end_screen" und dem Element mit der angegebenen "imgId"
* @param {String} imgId - Der Parameter imgId ist die ID des Bild-Elements, das im Abspann angezeigt werden soll
*/
function playOutro(imgId) {
    document.getElementById('end_screen').classList.remove('d-none');
    document.getElementById(imgId).classList.remove('d-none');
}

/**
* Die Funktion setStoppableInterval erstellt ein setInterval, das gestoppt werden kann, indem die Intervall-ID in einem Array gespeichert wird
* @param {Function} fn - Der Parameter fn ist eine Funktion, die in regelmäßigen Abständen, wie durch das angegebene Zeitintervall festgelegt, ausgeführt wird
* @param {Number} time - Der Parameter time ist die Intervall-Dauer in Millisekunden. Er bestimmt, wie oft die Funktion fn ausgeführt wird
*/
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/**
* Die Funktion "stopGame" stoppt das Spiel, löscht alle Intervalle und spielt einen Abspann mit der angegebenen Bild-ID ab
* @param {String} imgId - Der Parameter imgId ist die ID des Bild-Elements, das im Abspann angezeigt werden soll
*/
function stopGame(imgId) {
    //intervalIds.forEach(clearInterval);
    gameOver = true;
    clearAllIntervals();
    playOutro(imgId);
}

/**
* Diese Funktion löscht alle Intervalle
*/
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/* 
* Diese Funktion fügt dem "window"-Objekt einen Event-Listener für das 'keydown'-Ereignis hinzu
* Wenn eine Taste gedrückt wird, wird die entsprechende Variable auf true gesetzt
*/
window.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'ArrowUp':
            keyboard.up = true;
        break;
        case 'ArrowDown':
            keyboard.down = true;
        break;
        case 'ArrowLeft':
            keyboard.left = true;
        break;
        case 'ArrowRight':
            keyboard.right = true;
        break;
        case 'KeyB':
            keyboard.b = true;
        break;
        default:
            return;
    };
});

/* 
* Diese Funktion fügt dem "window"-Objekt einen Event-Listener für das 'keyup'-Ereignis hinzu
* Wenn eine Taste gedrückt wird, wird die entsprechende Variable auf false zurückgesetzt
*/
window.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'ArrowUp':
            keyboard.up = false;
        break;
        case 'ArrowDown':
            keyboard.down = false;
        break;
        case 'ArrowLeft':
            keyboard.left = false;
        break;
        case 'ArrowRight':
            keyboard.right = false;
        break;
        case 'KeyB':
            keyboard.b = false;
        break;
        default:
            return;
    };
});

/**
* Die Funktion "loadMobileControlEvents" ist dafür verantwortlich, Touch-Start- und Touch-End-Ereignisse für mobile Geräte zu laden
*/
function loadMobileControlEvents() {
    touchStartEvents();
    touchEndEvents();
}

/**
* Die Funktion fügt Touch-Start-Event-Listener zu bestimmten Schaltflächen hinzu
* und setzt entsprechende Tastatur-Eigenschaften auf "true", wenn die Schaltflächen berührt werden
*/
function touchStartEvents() {
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.right = true;
    });
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.left = true;
    });
    document.getElementById('btnUp').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.up = true;
    });
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.b = true;
    });
}

/**
* Die Funktion fügt Touch-End-Event-Listener zu bestimmten Schaltflächen hinzu
* und setzt entsprechende Tastatur-Eigenschaften auf "false", wenn die Schaltflächen berührt werden
*/
function touchEndEvents() {
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.right = false;
    });
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.left = false;
    });
    document.getElementById('btnUp').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.up = false;
    });
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.b = false;
    });
}

/**
* Diese Funktion spielt die Audio wieder ab sobald sie abgelaufen ist
*/
gameAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

/**
* Die Funktion wechselt zwischen dem Vollbild- und dem Beenden-des-Vollbildmodus und aktualisiert das Symbol entsprechend
*/
function toggleFullscreen() {
    let fullscreenIcon = document.getElementById('fullscreen_option');
    if (fullscreenIcon.classList.contains('bx-fullscreen')) {
        openFullScreen();
        toggleTwoClasses(fullscreenIcon, 'bx-fullscreen', 'bx-exit-fullscreen');
    } else {
        exitFullScreen();
        toggleTwoClasses(fullscreenIcon, 'bx-fullscreen', 'bx-exit-fullscreen');
    }
}

/**
* Diese Funktion wechselt zum Vollbildmodus
*/
function openFullScreen() {
    let content = document.getElementById('content');
    if (content.requestFullscreen) {
        content.requestFullscreen();
    } else if (content.mozRequestFullScreen) {
        content.mozRequestFullScreen();
    } else if (content.webkitRequestFullscreen) {
        content.webkitRequestFullscreen();
    } else if (content.msRequestFullscreen) {
        content.msRequestFullscreen();
    }
}

/**
* Diese Funktion beendet den Vollbildmodus
*/
function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

/**
* Die Funktion "mute" schaltet den Stummschaltungsstatus eines Audiogeräts um, indem sie die Lautstärkepegel anpasst
*/
function mute() {
    let muteIcon = document.getElementById('mute_control');
    if (muteIcon.classList.contains('bx-volume-full')) {
        adjustOnVolume(muteIcon, 0, 0, 0, 0);
    } else {
        adjustOnVolume(muteIcon, 0.2, 0.4, 0.4, 1);
    }
}

/**
* @param {Number} vol1 - Die Lautstärke für die Spielmusik
* Die Funktion passt die Lautstärke verschiedener Audio-Elemente an und wechselt das Stummschaltungs-Symbol
* @param {Number} vol2 - Der Parameter "vol2" repräsentiert den Lautstärkepegel für die Kampf-Audio (battleAudio)
* @param {Number} vol3 - Der Parameter "vol3" repräsentiert den Lautstärkepegel für die Sieges-Audio (winAudio)
* @param {Number} vol4 - Der Parameter "vol4" ist die Lautstärke für ein bestimmtes Audio-Element aus dem allAudios array 
*/
function adjustOnVolume(icon, vol1, vol2, vol3, vol4) {
    gameAudio.volume = vol1;
    battleAudio.volume = vol2;
    winAudio.volume = vol3;
    changeAudioVolume(vol4);
    toggleTwoClasses(icon, 'bx-volume-full', 'bx-volume-mute');
}

/**
* Die Funktion ändert die Lautstärke aller Audio-Elemente aus dem allAudios array.
* @param {Number} volume - Der Parameter "volume" ist eine Zahl, die den gewünschten Lautstärkepegel für das Audio repräsentiert
* Er sollte einen Wert zwischen 0 und 1 haben, wobei 0 stummgeschaltet ist und 1 die maximale Lautstärke darstellt
*/
function changeAudioVolume(volume) {
    allAudios.forEach((audio) => {
        audio.volume = volume;
    });
}

/**
* Die Funktion wechselt zwischen zwei Klassen auf einem gegebenen Element
* @param element - Das HTML-Element, auf dem die Klassen umgeschalten werden
* @param class1 - Die erste Klasse, die auf dem Element umgeschaltet werden soll
* @param class2 - Die zweite Klasse, die auf dem Element umgeschaltet werden soll
*/
function toggleTwoClasses(element, class1, class2) {
    element.classList.toggle(class1);
    element.classList.toggle(class2);
}

/**
* Diese Funktion blendet eine Aufforderung ein, den Screen zu drehen, wenn die Bildschirmhöhe größer als die Bildschirmbreite
* und die Bildschirmbreite kleiner 1000 ist
*/
window.addEventListener("resize", function () {
    if(window.innerHeight > window.innerWidth && window.innerWidth < 1000){
        document.getElementById('rotate-device').style.display = 'flex';
    } else {
        document.getElementById('rotate-device').style.display = 'none';
    }
});
