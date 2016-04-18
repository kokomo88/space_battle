function Enemy(){
	this.sprite = new PIXI.Sprite(images.Sprites.enemy.texture);
	this.sprite.x = 800;
	this.width = 167;
	this.height = 64;
	this.sprite.y = Util.randomInt(0,534);
	this.direction = Util.randomInt(0,534);
}
Enemy.prototype.moveShip = function(){
	var direction = this.direction;
	var position = this.sprite.y;
	
	if (direction<position){ //moving UP
		if (position-1<=direction){
			this.direction=Util.randomInt(0,534);
		}
		return -1;
	}
	if (direction>position){ //moving Down
		if (position+1>=direction){
			this.direction=Util.randomInt(0,534);
		}
		return 1;
	}
	//default
	return (direction<position)?-1:1;
}