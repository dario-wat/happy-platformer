import * as Phaser from 'phaser';

export class DynamicSprite
  extends Phaser.Physics.Arcade.Sprite
  implements Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {

  public body: Phaser.Physics.Arcade.Body;

}