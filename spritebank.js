function ImageBank(){
	this.Sprites={};
	this.TililngSprites={};

}
ImageBank.prototype.addNewObject = function(key,obj){
	var newObj = new Object();
	newObj[key] = obj;
	return obj;
}
ImageBank.prototype.addNewSprite = function(key,obj){
	this.Sprites[key]=obj;
}
ImageBank.prototype.addNewTililngSprite = function(key,obj){
	this.TililngSprites[key]=obj;
}

ImageBank.prototype.initialize = function(resources){
	//load  images
	this.addNewSprite('enemy',new PIXI.Sprite(resources.enemy.texture));
	this.addNewSprite('spaceship',new PIXI.Sprite(resources.spaceship.texture));
	this.addNewSprite('game1',new PIXI.Sprite(resources.game1.texture));
	this.addNewSprite('game2',new PIXI.Sprite(resources.game2.texture));
	this.addNewSprite('game3',new PIXI.Sprite(resources.game3.texture));
	this.addNewSprite('exit',new PIXI.Sprite(resources.exit.texture));
	this.addNewSprite('title',new PIXI.Sprite(resources.title.texture));
	this.addNewSprite('title',new PIXI.Sprite(resources.title.texture));
	this.addNewSprite('shard',new PIXI.Sprite(resources.shard.texture));
	this.addNewSprite('rocket',new PIXI.Sprite(resources.rocket.texture));
	this.addNewTililngSprite('background',new PIXI.extras.TilingSprite(resources.background.texture,800,600));
	this.addNewTililngSprite('midground',new PIXI.extras.TilingSprite(resources.midground.texture,800,200));
}