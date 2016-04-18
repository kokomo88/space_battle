function Rocket(ship){
	this.width=39;
	this.height=10;
	this.sprite = new PIXI.Sprite(images.Sprites.rocket.texture);
	this.sprite.x=ship.x+ship.width;
	this.sprite.y=ship.y+ship.height/2-this.height/2;
}