			
function Shard (offsetX,offsetY,dirX,dirY,middlepoint,shardTimeToLive){		
		
	this.sprite = new PIXI.Sprite(images.Sprites.shard.texture);
	this.width=16;
	this.height=16;
	this.TTL=shardTimeToLive;
	this.sprite.x= offsetX; 
	this.sprite.y= offsetY;
	this.direction={x:0,y:0};
	
	this.direction.x = (dirX);
	this.direction.y = (dirY);

}