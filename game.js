function Game(){
	this.enemies=[];
	this.rockets=[];
	this.shards=[];
	this.ship;
	this.score=0;
	this.time;
	this.scoreText ;
	this.ready=false;
}
Game.prototype.initGame = function(){
	this.scoreText = new PIXI.Text('0',scoreStyle);
	this.scoreText.text='0';
	this.score = 0;
	
};
Game.prototype.destroyElements = function(arr,container){
	for (var i=arr.length-1;i>=0;i--){
		container.removeChild(arr[i]);
		arr.splice(i,1);
	}
}
Game.prototype.createNewSpaceship = function (){
	var enemy = new Enemy();
	return enemy;
}
Game.prototype.createNewRocket = function(ship){
	var rocket = new Rocket(ship);
	gameScreen.addChild(rocket);
	rockets.push(rocket);
}
// works only with rectangles
Game.prototype.detectCollision = function (a,b){
	return(a.x <= b.x + b.width &&
            b.x <= a.x + a.width &&
            a.y <= b.y + b.height &&
            b.y <= a.y + a.height);
}
Game.prototype.updateScore = function (){
	this.scoreText.text = this.score;
}
Game.prototype.explodeEnemyShip = function (enemy){
	var middlePoint={x:0,y:0};
	middlePoint.x = enemy.sprite.x+enemy.width/2;
	middlePoint.y = enemy.sprite.y+enemy.height/2;
	var width = 16;
	var height = 16;
	var shardTimeToLive=500;
	//creating shards
	for (var i=-1;i<1;i++){
		for(var j=-2;j<2;j++){
			var offsetX= middlePoint.x+ j*width; 
			var offsetY= middlePoint.y+ i*height;
			
			var dirX = (offsetX+width/2)-middlePoint.x;
			var dirY = (offsetY+height/2)-middlePoint.y;
		
			var shard = new Shard(offsetX,offsetY,dirX,dirY,middlePoint,shardTimeToLive);
			screens.gameScreen.addChild(shard.sprite);
			this.shards.push(shard);
		}
	}
	for (i=0;i<2;i++){
			var offsetX= enemy.sprite.x+enemy.width/2-width/2 ;
			var offsetY= enemy.sprite.y+enemy.height/2-height*i;
			var dirX = (offsetX+width/2)-middlePoint.x;
			var dirY = (offsetY+height/2)-middlePoint.y;
			var shard = new Shard(offsetX,offsetY,dirX,dirY,middlePoint,shardTimeToLive);
			screens.gameScreen.addChild(shard.sprite);
			this.shards.push(shard);
	}
}