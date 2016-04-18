var style={font : '24px Arial', fill : '#FFFFFF', align : 'center'};
var scoreStyle = {
    font : 'bold 72px Arial',
    fill : '#231F20',
    stroke : '#F8E300',
    strokeThickness : 5,
    dropShadow : true,
    wordWrap : false,
};
var screens;
var sprites;
var images;
loadingText = new PIXI.Text('0%',style);

/*var renderer = PIXI.autoDetectRenderer(this.width, this.height,{backgroundColor : 0x000000});
document.body.appendChild(this.renderer.view);
var stage = new PIXI.Container();*/