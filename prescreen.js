


function PreScreen(){
	PIXI.Container.call(this);
	screens.stage.addChild(loadingText);
	loadingText.x =800/2-10;
	loadingText.y =600/2-10;
	screens.renderer.render(screens.stage);
}
PreScreen.prototype.Initialize = function (){
	var loader = new PIXI.loaders.Loader();
	loader
    .add('enemy',"./img/spship2.png") 
    .add('spaceship',"./img/spship1.png") 
    .add('rocket',"img/sprocket3_2.png") 
    .add('background',"img/spacebattleback.png") 
    .add('game1',"img/game1.png") 
    .add('game2',"img/game2.png") 
    .add('game3',"img/game3.png") 
    .add('exit',"img/exit.png") 
    .add('title',"./img/title.png") 
    .add('shard',"img/shard.png") 
    .add('midground',"img/spacebattleback2.png") 
	.on("progress", this.progressHandler)
	.load(this.setup);
}
PreScreen.prototype.progressHandler = function (loader, resource) {
	loadingText.text = Math.floor(loader.progress)+'%';
	 screens.renderer.render(screens.stage);
}

PreScreen.prototype.setup = function(loader, resources) {
	//loading images
	images = new ImageBank();
	images.initialize(resources);

	
	//initialize
	screens.initialize();
}