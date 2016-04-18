//screens.js
function ScreenHandler(){
	this.width = 800;
	this.height = 600;
	this.splashScreen;
	this.mainScreen;
	this.gameScreen;
	this.gameOverScreen;
	this.fadeScreen;

	this.game;
	
	//FadeInFadeOut
	this.previous;
	this.current;
	this.fadeTime = 0;
	this.lastStart = 0;
	this.fadeAnimation = false;
	
	//measure time
	this.previousTimestamp = new Date().getTime();
    this.currentTimestamp = new Date().getTime();
	this.lastRefresh = 0;
	this.elapsedTime=0;
	
	//canvas
	this.renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x000000});
	document.body.appendChild(this.renderer.view);
	this.stage = new PIXI.Container();
	this.initialize.bind(this);
}
ScreenHandler.prototype.initialize = function (){
	//screens
	this.splashScreen = new PIXI.Container();
	this.mainScreen = new PIXI.Container();
	this.gameScreen = new PIXI.Container();
	
	//init FaderScreen
	var fadeScreenCover = this.rectangle(0, 0, this.width, this.height, 0x000000, 0x000000, 0);
	this.fadeScreen = new PIXI.Container();
	this.fadeScreen.addChild(fadeScreenCover);
	this.fadeScreen.alpha=0;
	
	//gameOverScreen
	this.gameOverScreen = new PIXI.Container();
	var gameOverBackground = this.rectangle(0, 0, this.width, this.height, 0x000000, 0x000000, 0);
	gameOverBackground.alpha=0.8;
	this.gameOverScreen.addChild(gameOverBackground);
	
	
	//set visibility
	this.mainScreen.visible=false;
	this.gameScreen.visible=false;
	this.splashScreen.visible=true;
	this.gameOverScreen.visible=false;
	
	//adding all the screens
	this.stage.addChild(this.splashScreen);
	this.stage.addChild(this.mainScreen);
	this.stage.addChild(this.gameScreen);
	this.stage.addChild(this.gameOverScreen);
	this.stage.addChild(this.fadeScreen);
	
	this.stage.removeChild(loadingText);
	
	//initialize the screens
	this.initializeSplashScreen();
	this.initializeMainScreen();
	this.initializeGameScreen();
	
	
	this.current=this.splashScreen;
	this.animate();
}
ScreenHandler.prototype.startGame = function(){
	this.changeScreens(this.gameScreen);
	this.initializeGameScreen();
}
ScreenHandler.prototype.initializeGameScreen = function(){
	//initialize background
	var boundback = this.gobackToMainScreen.bind(this);
	this.gameScreen.background = new PIXI.extras.TilingSprite(images.TililngSprites.background.texture,800,600);
	this.gameScreen.addChild(this.gameScreen.background); 
	this.gameScreen.midground = new PIXI.extras.TilingSprite(images.TililngSprites.midground.texture,800,200);;
	this.gameScreen.addChild(this.gameScreen.midground); 

	//creating back to main menu button
	var exitBtn = this.createButton(350,300,100,40,images.Sprites.exit.texture,boundback);
	this.gameOverScreen.addChild(exitBtn);
	
	//create new game
	this.game = new Game();
	this.game.ship = new Ship();
	
	this.game.initGame();
	this.gameScreen.addChild(this.game.scoreText);
	
	this.gameScreen.addChild(this.game.ship.sprite);
	this.game.ready=true;

}
ScreenHandler.prototype.gobackToMainScreen = function(){
	this.changeScreens(this.mainScreen);
	this.game.ready=false;
	this.gameOverScreen.visible = false;
}
ScreenHandler.prototype.initializeSplashScreen = function (){
	//create logo
	var logo = new PIXI.Sprite(images.Sprites.title.texture);
	this.splashScreen.addChild(logo);
	logo.x=100;
	logo.y=75;
}
ScreenHandler.prototype.initializeMainScreen = function (){
	//creating Buttons
	var boundStart = this.startGame.bind(this);
	var boundExit = this.startGame.bind(this);
	var gameButton1 = this.createButton(350,300,100,40,images.Sprites.game1.texture,boundStart);
	var gameButton2 = this.createButton(350,350,100,40,images.Sprites.game2.texture,boundStart);
	var gameButton3 = this.createButton(350,400,100,40,images.Sprites.game3.texture,boundStart);
	var exitButton = this.createButton(350,450,100,40,images.Sprites.exit.texture,boundExit);

	var smallLogo = new PIXI.Sprite(images.Sprites.title.texture);
	this.mainScreen.addChild(smallLogo);
	smallLogo.scale.x = smallLogo.scale.y-=0.5;
	smallLogo.x=250;
	smallLogo.y=75;

	this.mainScreen.addChild(gameButton1);
	this.mainScreen.addChild(gameButton2);
	this.mainScreen.addChild(gameButton3);
	this.mainScreen.addChild(gameButton3);
	this.mainScreen.addChild(exitButton);
}
ScreenHandler.prototype.changeScreens = function (screen){
	this.fadeTime =0;
	this.previous=this.current;
	this.current = screen;
	this.fadeAnimation = true;
	this.fader(0);
	
}
ScreenHandler.prototype.fader = function (time){
	this.fadeTime+=time;
	if (this.fadeTime<500){
		this.fadeOut(time);
	}
	else if(this.fadeTime>=500 && this.fadeTime<1000){
		this.previous.visible=false;
		this.current.visible=true;
		this.fadeIn(time);
	}
	else{
		this.fadeAnimation=false;
		this.previous.visible=false;
		this.current.visible=true;
	}
}

ScreenHandler.prototype.fadeOut = function(time){
	if (this.fadeScreen.alpha+0.002*time<1){
		this.fadeScreen.alpha+=0.002*time;
	}
	else{
		this.fadeScreen.alpha=1;
	}
}
ScreenHandler.prototype.fadeIn = function(time){
	if (this.fadeScreen.alpha-0.002*time>0){
		this.fadeScreen.alpha-=0.002*time;
	}
	else{
		this.fadeScreen.alpha=0;
	}
}

ScreenHandler.prototype.rectangle = function(x, y, width, height, backgroundColor, borderColor, borderWidth) {
    var box = new PIXI.Graphics();
    box.beginFill(backgroundColor);
    box.lineStyle(borderWidth, borderColor);
    box.drawRect(0, 0, width - borderWidth, height - borderWidth);
    box.endFill();
    box.position.x = x + borderWidth / 2;
    box.position.y = y + borderWidth / 2;
    return box;
}

ScreenHandler.prototype.createButton= function(x,y, width,height,texture,func){
	var gameButtonContainer = new PIXI.Container();
	gameButtonContainer.interactive=true;
	gameButtonContainer.x=x;
	gameButtonContainer.y=y;
	btn = new PIXI.Sprite(texture,width,height);
	gameButtonContainer.addChild(btn);
	gameButtonContainer.on('mousedown', func);
	return gameButtonContainer;
}

ScreenHandler.prototype.animate =  function() {
	var boundLoop = this.animate.bind(this);
    requestAnimationFrame(boundLoop);
	//refresh time
	this.previousTimestamp = this.currentTimestamp;
    this.currentTimestamp = new Date().getTime();
	this.lastRefresh = this.currentTimestamp - this.previousTimestamp;
	this.elapsedTime += this.currentTimestamp - this.previousTimestamp;
	
	//fade animation
	if (this.fadeAnimation){
		this.fader(this.lastRefresh);
	}
	//splashscreen
	if(this.splashScreen.visible){
		this.elapsedTime += this.currentTimestamp - this.previousTimestamp;
		if (this.elapsedTime>2000){ 
			if(!this.fadeAnimation){
				this.changeScreens(this.mainScreen);
			}
		}
	}
	//gameScreen
	if(this.gameScreen.visible && this.game.ready ){
		var ship = this.game.ship.sprite;
		var rockets = this.game.rockets;
		var enemies = this.game.enemies;
		var shards = this.game.shards;
		
		this.elapsedTime += this.currentTimestamp - this.previousTimestamp;
		this.lastStart += this.currentTimestamp - this.previousTimestamp;
		//create new an enemy every 2 seconds
		if (this.lastStart>2000){ 
			this.lastStart=0;
			var enemy = this.game.createNewSpaceship();
			this.game.enemies.push(enemy);
			this.gameScreen.addChild(enemy.sprite);
		}
		
		//moving background and midground
		this.gameScreen.background.tilePosition.x -= 1;
		this.gameScreen.midground.tilePosition.x -= 0.5;
		
		//Keyboard handling
		if (Key.isDown(Key.UP)) { if(ship.y>1){ship.y-=5;}}
		if (Key.isDown(Key.DOWN)){if(ship.y<536)ship.y+=5;}
		if (Key.isDown(Key.LEFT)) { if(ship.x>1){ship.x-=5;}}
		if (Key.isDown(Key.RIGHT)){if(ship.x<734)ship.x+=5;}
		if (Key.isPressed(Key.SPACE)){var rocket = new Rocket(ship);this.gameScreen.addChild(rocket.sprite);rockets.push(rocket);}
		
		//detect collision, rockets, enemies
		for (var i in rockets){
			var rocket = rockets[i].sprite;
			if (rocket.x<(850)){
				rocket.x+=2;
				for (var k in enemies){
					var enemy = enemies[k];

					if (this.game.detectCollision(enemy.sprite,rocket)){
						this.game.explodeEnemyShip(enemy);
						this.gameScreen.removeChild(enemies[k].sprite);
						enemies.splice(k,1);
						this.gameScreen.removeChild(rockets[i].sprite);
						rockets.splice(i,1);
						this.game.score+=10;
						this.game.updateScore();
						
					}
				}
			}
			else {
				rockets.splice(i,1);
			}
		}
		//detect collision, enemies, player
		for (var i in enemies){
			var enemy = enemies[i];
			if (enemy.sprite.x>((-1)*enemy.width)){
				enemy.sprite.x-=1;
				enemy.sprite.y+=enemy.moveShip();
				if (this.game.detectCollision(ship,enemy.sprite)){
					this.gameOverScreen.visible=true;
					this.game.explodeEnemyShip(enemy);
					this.game.explodeEnemyShip(this.game.ship);
					this.gameScreen.removeChild(enemies[i].sprite);
					this.gameScreen.removeChild(this.game.ship.sprite);
					this.game.ship.sprite.x = this.game.ship.sprite.y = -500;
					enemies.splice(i,1);
				}
				
			}
			else {
				this.gameScreen.removeChild(enemies[i].sprite);
				enemies.splice(i,1);
			}
		}
		//moving exploded ship shards
		for (var i in shards){
			var shard = shards[i];
			shard.TTL-=this.currentTimestamp - this.previousTimestamp;
			if (shard.TTL>0){
				d = Math.sqrt(shard.direction.x*shard.direction.x+shard.direction.y*shard.direction.y);
				shard.sprite.x+= shard.direction.x/d;
				shard.sprite.y+= shard.direction.y/d;
			}
			else {
				this.gameScreen.removeChild(shards[i].sprite);
				shards.splice(i,1);
				
			}
		}

	}
    // render the container
    this.renderer.render(this.stage);
}
