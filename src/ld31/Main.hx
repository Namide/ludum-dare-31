package ld31;

/*import flash.display.StageAlign;
import flash.display.StageScaleMode;
import flash.Lib;*/
import h3d.Engine;

/**
 * ...
 * @author Namide
 */

class Main
{
	static var _game:Game;
	
	static function main() 
	{
		/*var stage = Lib.current.stage;
		stage.scaleMode = StageScaleMode.NO_SCALE;
		stage.align = StageAlign.TOP_LEFT;*/
		
		restart();
	}
	
	static function restart()
	{
		if ( _game != null ) _game.dispose();
		
		hxd.Key.initialize();
		hxd.Res.initEmbed();
		_game = new Game( restart );
	}
	
}