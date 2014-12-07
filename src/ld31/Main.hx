package ld31;

/*import flash.display.StageAlign;
import flash.display.StageScaleMode;
import flash.Lib;*/
import h3d.Engine;
import hxd.Res;

/**
 * ...
 * @author Namide
 */

class Main
{
	static var _game:Game;
	static var _sounds:Sound;
	
	static function main() 
	{
		/*var stage = Lib.current.stage;
		stage.scaleMode = StageScaleMode.NO_SCALE;
		stage.align = StageAlign.TOP_LEFT;*/
		hxd.Res.initEmbed();
		_sounds = new Sound();
		restart();
	}
	
	static function restart()
	{
		if ( _game != null )
		{
			hxd.Key.dispose();
			_game.dispose();
		}
		hxd.Key.initialize();
		_game = new Game( restart, _sounds );
	}
	
}