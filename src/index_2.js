import Phaser, { Game, Scene } from 'phaser';
import IsoPlugin, { IsoPhysics } from 'phaser3-plugin-isometric';

import cubeImg from "./assets/cube.png";
import tileImg from "./assets/tile.png";

import tileImg from "./assets/tile.png";

class IsoCollisionExample extends Scene {
  constructor() {
    const sceneConfig = {
      key: 'IsoCollisionExample',
      mapAdd: { isoPlugin: 'iso', isoPhysics: 'isoPhysics' }
    };
    super(sceneConfig);
  }

  preload() {
    this.load.image('tile', tileImg);
    this.load.image('cube', cubeImg);
    this.load.scenePlugin({
      key: 'IsoPlugin',
      url: IsoPlugin,
      sceneKey: 'iso'
    });

    this.load.scenePlugin({
      key: 'IsoPhysics',
      url: IsoPhysics,
      sceneKey: 'isoPhysics'
    });
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.isoGroup = this.add.group();
    // Let's make a load of tiles on a grid.
    this.isoPhysics.world.gravity.setTo(0, 0, -500);

    this.isoPhysics.projector.origin.setTo(0.5, 0.35);
    this.spawnTiles();
    var cam = this.cameras.main;
    console.log(cam)
  }

  update() {
    var cam = this.cameras.main;

    // Collide cubes against each other
    this.isoPhysics.world.collide(this.isoGroup);

    if (this.cursors.left.isDown)
    {
        console.log("is moving left")
    }
    else if (this.cursors.right.isDown)
    {
        console.log("is moving right")
    }

    if (this.cursors.up.isDown)
    {
        console.log("is moving up")
    }
    else if (this.cursors.down.isDown)
    {
        console.log("is moving down")
    }
  }

  spawnTiles () {
    var tile, cube;
    for (var xx = 0; xx < 256; xx += 40) {
      for (var yy = 0; yy < 256; yy += 40) {
        // Create a tile using the new game.add.isoSprite factory method at the specified position.
        // The last parameter is the group you want to add it to (just like game.add.sprite)
        //cube = this.add.isoSprite(xx, yy, 600, 'cube', this.isoGroup);
        //this.isoPhysics.world.enable(cube);
        tile = this.add.isoSprite(xx, yy, 0, 'tile', this.isoGroup);
        this.isoPhysics.world.enable(tile);
        tile.body.collideWorldBounds = true;
        //cube.body.collideWorldBounds = true;
        tile.setInteractive();
        tile.on('pointerover', function() {
          this.setTint(0x86bfda);
          this.isoZ += 5;
        });

        tile.on('pointerout', function() {
          this.clearTint();
          this.isoZ -= 5;
        });
        //tile.anchor.set(0.5, 0);
      }
    }
  }

}

function resize() {
  var canvas = document.querySelector("canvas");
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio = game.config.width / game.config.height;

  if(windowRatio < gameRatio){
      canvas.style.width = windowWidth + "px";
      canvas.style.height = (windowWidth / gameRatio) + "px";
  } else {
      canvas.style.width = (windowHeight * gameRatio) + "px";
      canvas.style.height = windowHeight + "px";
  }
}

window.onload = function() {
  let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: IsoCollisionExample
  };

  window.game = new Game(config);
  // resize();
  // window.addEventListener("resize", resize, false);
}
