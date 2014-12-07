package ld31;

/*import flash.display.StageAlign;
import flash.display.StageScaleMode;
import flash.Lib;*/

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
		
		hxd.Key.initialize();
		_game = new Game();
	}
	
}