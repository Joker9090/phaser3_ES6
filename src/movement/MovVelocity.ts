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
}

export default class Movement1 {
    body: PhysicsIso;
    game: Phaser.Scene;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    config: ConfigMovement;

    constructor(body: PhysicsIso, game: Phaser.Scene, cursors: Phaser.Types.Input.Keyboard.CursorKeys, config: ConfigMovement) {
        this.body = body;
        this.game = game;
        this.cursors = cursors;
        this.config = config;
        console.log('config: ', config)
    }

    update() {
        let velocity = this.body.velocity;
        if (velocity) {
            velocity.setTo(0, 0, this.body.velocity.z);

            const xVelocity = this.cursors.left.isDown ? -this.config.pxVelocity : this.cursors.right.isDown ? this.config.pxVelocity : velocity.x;
            const yVelocity = this.cursors.up.isDown ? -this.config.pxVelocity : this.cursors.down.isDown ? this.config.pxVelocity : velocity.y;
            
            velocity.setTo( xVelocity, yVelocity, velocity.z );
        }
    }
}
