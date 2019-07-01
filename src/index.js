import Phaser, { Game, Scene } from 'phaser';
import IsoPlugin, { IsoPhysics } from 'phaser3-plugin-isometric';
import MapManager from './maps/mapManager.js';

import cubeImg from "./assets/cube.png";
import tileImg from "./assets/tile.png";

import * as map1 from "./maps/map_1.mp";
import * as map1b from "./maps/map_1_b.mp";
import * as map1Pos from "./maps/map_1_pos.mp";

class IsoCollisionExample extends Scene {
  constructor() {
    const sceneConfig = {
      key: 'IsoCollisionExample',
      mapAdd: { isoPlugin: 'iso', isoPhysics: 'isoPhysics' }
    };
    super(sceneConfig);
    this.actualMap = null;
    this.actualMapB = null;
    this.actualMapPos = null;
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
    this.isoPhysics.world.setBounds(-1024, -1024, 1024 * 2, 1024 * 2);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.isoGroup = this.add.group();
    // Let's make a load of tiles on a grid.
    this.isoPhysics.world.gravity.setTo(0, 0, -500);

    this.isoPhysics.projector.origin.setTo(0.5, 0.3);
    //console.log(this.isoPhysics.projector)
    this.spawnTiles();
    window.showLog = false;
  }

  update() {

    // Collide cubes against each other
    const self = this;
    //this.isoPhysics.world.collide(this.isoGroup);
    if (this.player) {
      this.isoPhysics.world.collide(this.player, this.isoGroup, (a, b) => {
        if (a.isPlayer && b.isJump) self.player.body.velocity.setTo(self.player.body.velocity.x,self.player.body.velocity.y,500);
      })
      this.player.body.velocity.setTo(0,0,this.player.body.velocity.z);
      if (this.cursors.left.isDown) {
          this.player.body.velocity.setTo(-300,this.player.body.velocity.y,this.player.body.velocity.z);
      } else if (this.cursors.right.isDown) {
          this.player.body.velocity.setTo(300,this.player.body.velocity.y,this.player.body.velocity.z);
      }
      if (this.cursors.up.isDown) {
          this.player.body.velocity.setTo(this.player.body.velocity.x,-300,this.player.body.velocity.z);
      } else if (this.cursors.down.isDown) {
          this.player.body.velocity.setTo(this.player.body.velocity.x,300,this.player.body.velocity.z);
      }

    }

  }

  drawPlayer() {
    const self = this;
    this.actualMapPos = new MapManager(map1Pos, this);
    this.actualMapPos.drawMap(this.isoGroup);
    this.isoGroup.getChildren().map(item => {
      self.player = item;
      var cam = self.cameras.main;
      console.log(cam)
      window.player = self.player;
      self.player.setDepth(1);
      if (self.player.isPlayer) cam.startFollow(self.player, true);
      window.cam = cam;
      //cam.setBackgroundColor('#123122')
    })
  }

  spawnTiles () {
    this.drawPlayer();
    const self = this;
    console.log('map1');
    console.log(map1);
    console.log('map1b');
    console.log(map1b);

    this.actualMap = new MapManager(map1, this);
    const conf = {
      "1": (a, b, c, that) => {
        let tile;
        tile = that.game.add.isoSprite(
          that.setPosFromAnchor(b, c).x,
          that.setPosFromAnchor(b, c).y,
          2100,
          'tile',
          self.isoGroup
        );
        that.game.isoPhysics.world.enable(tile);
        tile.body.collideWorldBounds = true;
        tile.body.immovable = true;
        tile.body.allowGravity = false;
      }
    }
    this.actualMap.drawMap(this.isoGroup, conf)

    this.actualMapB = new MapManager(map1b, this);
    const confb = {
      "1": (a, b, c, that) => {
        let tile;
        tile = that.game.add.isoSprite(
          that.setPosFromAnchor(b, c).x,
          that.setPosFromAnchor(b, c).y,
          2000,
          'tile',
          self.isoGroup
        );
        tile.setTint(0x86bffa);
        that.game.isoPhysics.world.enable(tile);
        tile.body.collideWorldBounds = true;
        tile.body.immovable = true;
        tile.body.allowGravity = false;
      }
    }
    this.actualMapB.drawMap(this.isoGroup, confb)
    //  for (var xx = 0; xx < 256; xx += 40) {
      //  for (var yy = 0; yy < 256; yy += 40) {
        // Create a tile using the new game.add.isoSprite factory method at the specified position.
        // The last parameter is the group you want to add it to (just like game.add.sprite)

        //  tile = this.add.isoSprite(xx, yy, 0, 'tile', this.isoGroup);
        //  this.isoPhysics.world.enable(tile);
        //  tile.body.collideWorldBounds = true;
        //  tile.setInteractive();
        //  tile.on('pointerover', function() {
        //    this.setTint(0x86bfda);
        //    this.isoZ += 5;
        //  });

        //  tile.on('pointerout', function() {
        //    this.clearTint();
        //    this.isoZ -= 5;
        //  });
        //tile.anchor.set(0.5, 0);
      //  }
    //  }
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
