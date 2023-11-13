import { Physics } from "phaser";

export type PhysicsIso = Phaser.Physics.Arcade.Body & {
    velocity: {
        x: number;
        y: number;
        z: number;
        setTo: (a: number, b: number, c: number) => void
    }
}

export default class Movement2{

    body: PhysicsIso;
    game: Phaser.Scene;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(body: PhysicsIso, game: Phaser.Scene, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        this.body = body;
        console.log(body)
        this.game = game;
        this.cursors = cursors;
    }

    update() {
        if (this.body.velocity) {
            let velocity = this.body.velocity;
        
            const xVelocity = this.cursors.left.isDown ? -300 : this.cursors.right.isDown ? 300 : velocity.x;
            const yVelocity = this.cursors.up.isDown ? -300 : this.cursors.down.isDown ? 300 : velocity.y;
        
            velocity.setTo(
                velocity.x != 0 ? velocity.x + (velocity.x > 0 ? -5 : 5): xVelocity,
                velocity.y != 0 ? velocity.y + (velocity.y > 0 ? -5 : 5) : yVelocity,
                velocity.z
            );
        }
        
    }
}
