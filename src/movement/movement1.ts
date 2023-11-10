import { Physics } from "phaser";


export type PhysicsIso = Phaser.Physics.Arcade.Body & {
 velocity: {
    x: number;
    y: number;
    z: number;
     setTo: (a: number,b: number,c: number) => void
    }
}
export default class Movement1 {
    body: PhysicsIso;
    game: Phaser.Scene;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(body:  PhysicsIso, game: Phaser.Scene, cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
        this.body = body;
        this.game = game;
        this.cursors = cursors;
    }

    update() {
        if(this.body.velocity) {
            this.body.velocity.setTo(0,0,this.body.velocity.z);
            if (this.cursors.left.isDown) {
                this.body.velocity.setTo(-300,this.body.velocity.y,this.body.velocity.z);
            } else if (this.cursors.right.isDown) {
                this.body.velocity.setTo(300,this.body.velocity.y,this.body.velocity.z);
            }
            if (this.cursors.up.isDown) {
                this.body.velocity.setTo(this.body.velocity.x,-300,this.body.velocity.z);
            } else if (this.cursors.down.isDown) {
                this.body.velocity.setTo(this.body.velocity.x,300,this.body.velocity.z);
            }
        }
    }
}
