import { Physics, Game, Scene, GameObjects } from "phaser";


// @ts-ignore
import IsoPlugin, { IsoPhysics } from 'phaser3-plugin-isometric';
type IsoGame = {
    add: {
        isoSprite: any;
    }
}
declare module 'phaser' {
  interface Scene {
    isoPhysics: typeof IsoPhysics;
    game: Game extends IsoGame
    //isoSprite(): void;
  }
}


type ConfObject = {
    "1"?: (a: string, b: string, c: string, that: MapManager) => void;
    "3"?: (a: string, b: string, c: string, that: MapManager) => void;
    "4"?: (a: string, b: string, c: string, that: MapManager) => void;
    "5"?: (a: string, b: string, c: string, that: MapManager) => void;
    "9"?: (a: string, b: string, c: string, that: MapManager) => void;
}

type Map = {
    default: string;
}

export default class MapManager {

    game: Scene;
    mapFile: string;
    rows: string[];
    posOfAnchor: [number, number];
    distanceOfTiles: { width: number; height: number };
  
  constructor(map: Map, game: Scene) {
    console.log('game mapManager: ', game);
    this.game = game;
    this.mapFile = map.default;
    this.rows = [];
    this.posOfAnchor = [0, 0];
    this.distanceOfTiles = { width: 40, height: 40 };
    this.initMapParser();

    this.drawMap = this.drawMap.bind(this);
    this.setPosFromAnchor = this.setPosFromAnchor.bind(this);
  }

  initMapParser() {
    this.rows = this.mapFile.split('\n');
    this.iterateMapRows();
  }

  iterateMapRows(fn?: Function) {
    let blocks;
    for (let row_i = 0; row_i < this.rows.length; row_i += 1) {
      blocks = this.rows[row_i].split(' ');
      for (let block_i = 0; block_i < blocks.length; block_i += 1) {
        if (blocks[block_i] === "2") this.posOfAnchor = [row_i, block_i];
        if (typeof fn === "function") fn(blocks[block_i], row_i, block_i);
      }
    }
  }

  setPosFromAnchor(rowI: number, blockI: number) {
    return {
      x: (this.posOfAnchor[0] + blockI) * this.distanceOfTiles.width,
      y: (this.posOfAnchor[1] + rowI) * this.distanceOfTiles.height
    };
  }

  drawMap(isoGroup: [], conf: ConfObject = {}) {
    // tile and object should be GameObjects.IsoSprite types but IsoSprite is not defined
    let tile: any, cube: any;
    const self = this;

    this.iterateMapRows((a: string, b: number, c: number) => {
      if (a === "1") {
        if (conf["1"] && typeof conf["1"] == "function") {
          conf["1"](a, b.toString(), c.toString(), this);
        } else {
          tile = self.game.add.isoSprite(
            self.setPosFromAnchor(b, c).x,
            self.setPosFromAnchor(b, c).y,
            2100,
            'tile',
            isoGroup
          );
          self.game.isoPhysics.world.enable(tile);
          tile.body.collideWorldBounds = true;
          tile.body.immovable = true;

          tile.setInteractive();
          tile.on('pointerover', () => {
            tile.setTint(0x86bfda);
            tile.isoZ += 5;
          });

          tile.on('pointerout', () => {
            tile.clearTint();
            tile.isoZ -= 5;
          });
        }
      }

      if (a === "3") {
        if (conf["3"] && typeof conf["3"] == "function") {
          conf["3"](a, b.toString(), c.toString(), this);
        } else {

          console.log('player', self.setPosFromAnchor(b, c))
          cube = self.game.add.isoSprite(self.setPosFromAnchor(b, c).x, self.setPosFromAnchor(b, c).y, 2150, 'cube', isoGroup);
          // cube.setScale(2);
          self.game.isoPhysics.world.enable(cube);
          cube.isoZ += 10;
          cube.body.collideWorldBounds = true;
          cube.isPlayer = true;
          cube.body.bounce.set(1, 1, 0.2);
        }
      }

      if (a === "4") {
        if (conf["4"] && typeof conf["4"] == "function") {
          conf["4"](a, b.toString(), c.toString(), this);
        } else {
          tile = self.game.add.isoSprite(
            self.setPosFromAnchor(b, c).x,
            self.setPosFromAnchor(b, c).y,
            2500,
            'tile',
            isoGroup
          );

          self.game.isoPhysics.world.enable(tile);
          tile.body.collideWorldBounds = true;
          tile.body.immovable = true;
          tile.body.allowGravity = false;
          tile.isTileGreen = true;
        
          tile.setTint(0x4EC624);
        }
      }

      if (a === "5") {
        if (conf["5"] && typeof conf["5"] == "function") {
          conf["5"](a, b.toString(), c.toString(), this);
        } else {
          tile = self.game.add.isoSprite(
            self.setPosFromAnchor(b, c).x,
            self.setPosFromAnchor(b, c).y,
            2100,
            'tile',
            isoGroup
          );

          self.game.isoPhysics.world.enable(tile);
          tile.body.collideWorldBounds = true;
          tile.body.immovable = true;
          tile.body.allowGravity = false;
          tile.isJump = true;
        
          tile.setTint(0xB62121);
        }
      }

      if (a === "9") {
        if (conf["9"] && typeof conf["9"] == "function") {
          conf["9"](a, b.toString(), c.toString(), this);
        } else {
          tile = self.game.add.isoSprite(
            self.setPosFromAnchor(b, c).x,
            self.setPosFromAnchor(b, c).y,
            0,
            'tile',
            isoGroup
          );

          self.game.isoPhysics.world.enable(tile);
          tile.body.collideWorldBounds = true;
          tile.body.allowGravity = false;
          tile.setTint(0x8ffffa);
          tile.isJump = true;

        }
      }
      
    });

  }
}
