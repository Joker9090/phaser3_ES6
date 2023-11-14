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
    pxVelocity: number;
    pxForce: number;
}

export default class Movement2{

    body: PhysicsIso;
    game: Phaser.Scene;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    config: ConfigMovement;

    constructor(body: PhysicsIso, game: Phaser.Scene, cursors: Phaser.Types.Input.Keyboard.CursorKeys, config: ConfigMovement) {
        this.body = body;
        console.log(body)
        this.game = game;
        this.cursors = cursors;
        this.config = config;
    }

    update() {
        if (this.body.velocity) {
            let velocity = this.body.velocity;
        
            const xVelocity = this.cursors.left.isDown ? -this.config.pxVelocity : this.cursors.right.isDown ? this.config.pxVelocity : velocity.x;
            const yVelocity = this.cursors.up.isDown ? -this.config.pxVelocity : this.cursors.down.isDown ? this.config.pxVelocity : velocity.y;
        
            
            velocity.setTo(
                velocity.x != 0 ? velocity.x + (velocity.x > 0 ? -this.config.pxForce : this.config.pxForce): xVelocity,
                velocity.y != 0 ? velocity.y + (velocity.y > 0 ? -this.config.pxForce : this.config.pxForce) : yVelocity,
                velocity.z
            );
        }
        
    }
}
