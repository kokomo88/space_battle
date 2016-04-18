function Ship(){
	this.sprite = new PIXI.Sprite(images.Sprites.spaceship.texture);
	this.width=167;
	this.height=64;
	this.sprite.x =0;
	this.sprite.y = 600/2-this.height/2;
}