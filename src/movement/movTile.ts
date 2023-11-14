import { Physics } from "phaser";



export type PhysicsIso = Phaser.Physics.Arcade.Body & {
    velocity: {
        x: number;
        y: number;
        z: number;
        setTo: (a: number, b: number, c: number) => void
    }
}

export type ConfigMovement = {
    tileSize: number;
}

export default class Movement3 {
    body: PhysicsIso;
    game: Phaser.Scene;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    movementTime: number = 0;
    config: ConfigMovement;

    constructor(body: PhysicsIso, game: Phaser.Scene, cursors: Phaser.Types.Input.Keyboard.CursorKeys, config: ConfigMovement) {
        this.body = body;
        console.log(body)
        this.game = game;
        this.cursors = cursors;
        this.config = config;
    }

    update() {
    
        let position = this.body.position;
        if (position) {
            if(this.game.time.now - this.movementTime > 200) {
                if (this.cursors.left.isDown) {
                    position.x -= this.config.tileSize;
                    this.movementTime = this.game.time.now;
                } else if (this.cursors.right.isDown) {
                    position.x += this.config.tileSize;
                    this.movementTime = this.game.time.now;
                }
                if (this.cursors.up.isDown) {
                    position.y -= this.config.tileSize;
                    this.movementTime = this.game.time.now;
                } else if (this.cursors.down.isDown) {
                    position.y += this.config.tileSize;
                    this.movementTime = this.game.time.now;
                }
            }
            
        }
    }
}
