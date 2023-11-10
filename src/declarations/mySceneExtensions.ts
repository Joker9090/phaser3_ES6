// mySceneExtensions.ts
import { Scene, Game } from 'phaser';

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
