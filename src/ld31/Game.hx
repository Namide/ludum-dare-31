package ld31;
import hxd.Key;
import hxd.Timer;
import ld31.gameplay.PlayerControl;
import ld31.gameplay.Polyomino;
import ld31.gameplay.PolyominoControl;
import ld31.gameplay.Tilemap;
import ld31.graphic.CubeMesh;
import ld31.graphic.CubePrim;
import ld31.graphic.PlayerMesh;
import ld31.graphic.PolyominoObject;
import ld31.graphic.Render;
import ld31.math.Dir;
import tweenx909.EaseX;
import tweenx909.TweenX;

/**
 * ...
 * @author Namide
 */
class Game
{
	
	public static inline var POLYOMINO_TIME_SIT:Float = 0.25;
	
	var _t:Float;
	var _dt:Float;
	var _frameTime:Float = 1/100;
	
	
	var _dir:Dir;
	var _lastDirChange:Float;
	
	
	var _tm:Tilemap;
	var _graphic:Render;
	var _playerControl:PlayerControl;
	
	var _playerMesh:PlayerMesh;
	
	var _pol:Polyomino;
	var _msgNum:Int;
	
	var _restart:Void->Void;
	
	public function new( restart ) 
	{
		_tm = new Tilemap();
		_playerControl = new PlayerControl();
		_graphic = new Render( start );
		_restart = restart;
	}
	
	public function start()
	{
		_dt = 0.;
		_t = haxe.Timer.stamp();
		_dir = new Dir();
		_lastDirChange = _t;
		
		var p = Tilemap.getNeutralPos();
		
		//		NEUTRAL
		for ( i in 0...Tilemap.SIDE_NUM_X )
			for ( j in 0...Tilemap.SIDE_NUM_Y )
			{
				if ( _tm.get(i, j) == Tilemap.TYPE_NEUTRAL )
				{
					var n = new CubeMesh( Tilemap.TYPE_NEUTRAL, _graphic.s3d );
					n.x = i;
					n.y = j;
				}
			}
		
		
		//		PLAYER
		_playerControl.x = p.x;
		_playerControl.y = p.y - 1;
		_playerControl.onRestart = orbital;
		_playerMesh = new PlayerMesh( _graphic.s3d );
		_playerMesh.scale( 0.5 );
		
		hxd.System.setLoop(mainLoop);
		
		
		
		initAnimPlayer();
		
		_msgNum = 0;
		updateMsg();
	}
	
	function updateMsg()
	{
		if ( _msgNum == 0 )
		{
			_msgNum++;
			_graphic.addMsg( _msgNum );
		}
		else if ( _msgNum == 1 )
		{
			if ( hxd.Key.isDown(Key.LEFT) || Key.isDown(Key.RIGHT) )
			{
				_msgNum++;
				_graphic.addMsg( _msgNum );
			}
		}
		else if ( _msgNum == 2 )
		{
			if ( hxd.Key.isDown(Key.SPACE) )
			{
				_msgNum++;
				_graphic.addMsg( _msgNum );
				createPolyomino();
			}
		}
		else if ( _msgNum == 3 )
		{
			if ( hxd.Key.isDown(Key.DOWN) )
			{
				_msgNum++;
				_graphic.addMsg( _msgNum, 2.0 );
				_graphic.changeScore();
			}
		}
		else if ( _msgNum == 4 )
		{
			_msgNum++;
			//_graphic.addMsg( _msgNum, 2.0 );
		}
		
		if ( Key.isReleased( Key.F11 ) ) _graphic.engine.fullScreen = true; // F
		if ( Key.isReleased( Key.ENTER ) ) _restart(); // R
	}
	
	function orbital()
	{
		initAnimPlayer();
	}
	
	function initAnimPlayer()
	{
		_playerMesh.z = 50;
		_playerControl.blockControls = true;
		TweenX.to( _playerMesh, {z:0} )
				.time( 0.5 )
				.ease( EaseX.circIn )
				.onFinish( function():Void { _playerControl.blockControls = false; } );
	}
	
	public function changeDir(newDir:Dir)
	{
		_dir = newDir;
		_graphic.rot( _dir );
		if ( _pol != null ) _pol.rot( _dir );
		
		// AVOID ORBITAL
		//_playerControl.vx = 0.0;
		//_playerControl.vy = 0.2;
	}
	
	public function mainLoop()
	{
		updateMsg();
		
		var dt = haxe.Timer.stamp() - _t;
		_t += dt;
		_dt += dt;
		
		while ( _dt >= _frameTime )
		{
			var col = _tm.getCol( Math.round(_playerControl.x), Math.round(_playerControl.y) );
			_playerControl.updateCollides( col );
			
			if ( _pol != null )
				_pol.updateGhost( _playerControl.x, _playerControl.y, _tm/*, _playerControl.blockControls*/ );
			
			var newDir = Dir.getDir( _playerControl.x, _playerControl.y, _tm, _dir );
			if ( !_dir.is( newDir.get() ) && (haxe.Timer.stamp() - _lastDirChange) > 0.2 )
			{
				_lastDirChange = haxe.Timer.stamp();
				changeDir( newDir );
			}
			
			if ( _dt/_frameTime<=2 )
			{
				_playerMesh.x = _playerControl.x;
				_playerMesh.y = _playerControl.y;
				//if ( Math.random() < 0.01 ) trace( _playerControl.x, _playerControl.y, _playerMesh.x, _playerMesh.y );
				_graphic.refresh();
			}
			
			_playerControl.updateControls( col, _dir );
			_playerControl.x += _playerControl.vx;
			_playerControl.y += _playerControl.vy;
			
			_dt -= _frameTime;
		}
		
	}
	
	public function createPolyomino()
	{
		_pol = new Polyomino( _graphic.s3d, _dir );
		_pol.onSitting = sitPolyomino;
		_playerControl.onAction = _pol.sit;
	}
	
	public function sitPolyomino()
	{
		_pol.fixToTilemap( _tm, _graphic.map );
		_pol = null;
		createPolyomino();
		_graphic.changeScore( _tm );
		
		if ( _tm.squareIn + _tm.squareOut >= _tm.squareMax )
			finish(); 
	}
	
	function finish()
	{
		_playerControl.blockControls = true;
		if ( _tm.squareIn >= Tilemap.SIDE_NUM_X * Tilemap.SIDE_NUM_Y - 1 )
		{
			_graphic.addMsg( 6 );
		}
		else
		{
			_graphic.addMsg( 5 );
		}
	}
	
	public function dispose()
	{
		hxd.System.setLoop(function() { } );
		/*_graphic.s2d.dispose();
		_graphic.s3d.dispose();
		_graphic.engine.dispose();
		CubeMesh.DISPOSE();
		CubePrim.DISPOSE();*/
		TweenX.clear();
		_graphic.s3d.remove();
		_graphic.s2d.remove();
	}
	
}