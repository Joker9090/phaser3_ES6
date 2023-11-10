import { Physics, Game, Scene, GameObjects } from "phaser";

type GameObjectsIsoSprite = GameObjects.Sprite & {
  isoX: number;
  isoY: number;
  isoZ: number;

  body: Physics.Arcade.Body;

  isPlayer?: boolean,
  isTileGreen?: boolean,
  isJump?: boolean,
}

type IsoAdd = GameObjects.GameObjectFactory & {
      isoSprite: (x:number,y:number,z:number,text:string,group: Phaser.GameObjects.Group | undefined) => GameObjectsIsoSprite;
}

type ConfObject = {
    [key:string]: (a: string, b: number, c: number, that: MapManager) => void;
}

export default class MapManager {

    game: Scene;
    mapFile: string;
    rows: string[];
    posOfAnchor: [number, number];
    distanceOfTiles: { width: number; height: number };
  
  constructor(map: string, game: Scene) {
    console.log('BARTO game mapManager: ', map, game);
    this.game = game;
    this.mapFile = map;
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

  drawMap(isoGroup: Phaser.GameObjects.Group, conf: ConfObject = {}) {
    // tile and object should be GameObjects.IsoSprite types but IsoSprite is not defined
    let tile: GameObjectsIsoSprite, cube: GameObjectsIsoSprite;
    const self = this;

    this.iterateMapRows((a: string, b: number, c: number) => {
      if (a === "1") {
        if (conf["1"] && typeof conf["1"] == "function") {
          const tile = conf["1"](a, b, c, self);
          console.log("BARTO tile, 1",tile)
        } else {
          tile = (self.game.add as IsoAdd).isoSprite(
            self.setPosFromAnchor(b, c).x,
            self.setPosFromAnchor(b, c).y,
            2100,
            'tile',
            isoGroup
          );
          self.game.isoPhysics.world.enable(tile);
          tile.body.collideWorldBounds = true;
          tile.body.immovable = true;
          console.log("BARTO tile, 2",tile)

         
        }
      }

      if (a === "3") {
        if (conf["3"] && typeof conf["3"] == "function") {
          conf["3"](a, b, c, this);
        } else {

          console.log('player', self.setPosFromAnchor(b, c))
          cube = (self.game.add as IsoAdd).isoSprite(self.setPosFromAnchor(b, c).x, self.setPosFromAnchor(b, c).y, 2150, 'cube', isoGroup);
          // cube.setScale(2);
          self.game.isoPhysics.world.enable(cube);
          cube.isoZ += 10;
          cube.body.collideWorldBounds = true;
          cube.isPlayer = true;
          cube.body.bounce.set(1, 1);
        }
      }

      if (a === "4") {
        if (conf["4"] && typeof conf["4"] == "function") {
          conf["4"](a, b, c, this);
        } else {
          tile = (self.game.add as IsoAdd).isoSprite(
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
          conf["5"](a, b, c, this);
        } else {
          tile = (self.game.add as IsoAdd).isoSprite(
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
          conf["9"](a, b, c, this);
        } else {
          tile = (self.game.add as IsoAdd).isoSprite(
            self.setPosFromAnchor(b, c).x,
            self.setPosFromAnchor(b, c).y,
            0,
            'tile',
            isoGroup
          );
          console.log("BARTO", tile)

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
