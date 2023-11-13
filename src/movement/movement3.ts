import { Physics } from "phaser";



export type PhysicsIso = Phaser.Physics.Arcade.Body & {
    velocity: {
        x: number;
        y: number;
        z: number;
        setTo: (a: number, b: number, c: number) => void
    }
}
export default class Movement3 {
    body: PhysicsIso;
    game: Phaser.Scene;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    movementTime: number = 0;
    tileSize: number = 40;

    constructor(body: PhysicsIso, game: Phaser.Scene, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        this.body = body;
        console.log(body)
        this.game = game;
        this.cursors = cursors;
    }

    update() {
    
        let position = this.body.position;
        if (position) {
            if(this.game.time.now - this.movementTime > 200) {
                if (this.cursors.left.isDown) {
                    position.x -= this.tileSize;
                    this.movementTime = this.game.time.now;
                } else if (this.cursors.right.isDown) {
                    position.x += this.tileSize;
                    this.movementTime = this.game.time.now;
                }
                if (this.cursors.up.isDown) {
                    position.y -= this.tileSize;
                    this.movementTime = this.game.time.now;
                } else if (this.cursors.down.isDown) {
                    position.y += this.tileSize;
                    this.movementTime = this.game.time.now;
                }
            }
            
        }
    }
}
