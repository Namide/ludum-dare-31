package ld31;
import hxd.Timer;
import ld31.gameplay.PlayerControl;
import ld31.gameplay.Polyomino;
import ld31.gameplay.PolyominoControl;
import ld31.gameplay.Tilemap;
import ld31.graphic.CubeMesh;
import ld31.graphic.PlayerMesh;
import ld31.graphic.PolyominoObject;
import ld31.graphic.Render;
import ld31.math.Dir;

/**
 * ...
 * @author Namide
 */
class Game
{
	
	public static inline var POLYOMINO_TIME_SIT:Float = 1;
	
	var _t:Float;
	var _dt:Float;
	var _frameTime:Float = 1/100;
	
	
	var _dir:Dir;
	
	
	var _tm:Tilemap;
	var _graphic:Render;
	var _playerControl:PlayerControl;
	
	var _playerMesh:PlayerMesh;
	
	var _pol:Polyomino;
	
	public function new() 
	{
		_tm = new Tilemap();
		_playerControl = new PlayerControl();
		_graphic = new Render( start );
	}
	
	public function start()
	{
		_dt = 0.;
		_t = haxe.Timer.stamp();
		_dir = new Dir();
		
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
		_playerMesh = new PlayerMesh( _graphic.s3d );
		_playerMesh.scale( 0.5 );
		
		hxd.System.setLoop(mainLoop);
		
		
		createPolyomino();
	}
	
	public function changeDir(newDir:Dir)
	{
		_dir = newDir;
		_graphic.rot( _dir );
		_pol.rot( _dir );
	}
	
	public function mainLoop()
	{
		var dt = haxe.Timer.stamp() - _t;
		_t += dt;
		_dt += dt;
		
		while ( _dt >= _frameTime )
		{
			var col = _tm.getCol( Math.round(_playerControl.x), Math.round(_playerControl.y) );
			_playerControl.updateCollides( col );
			
			if ( _pol != null ) _pol.updateGhost( _playerControl.x, _playerControl.y, _tm );
			
			var newDir = Dir.getDir( _playerControl.x, _playerControl.y, _tm, _dir );
			if ( !_dir.is( newDir.get() ) )
			{
				changeDir( newDir );
			}
			
			if ( _dt/_frameTime<=2 )
			{
				_playerMesh.x = _playerControl.x;
				_playerMesh.y = _playerControl.y;
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
		trace(_dir);
		_pol = new Polyomino( _graphic.s3d, _dir );
		_pol.onSitting = sitPolyomino;
		_playerControl.onAction = _pol.sit;
	}
	
	public function sitPolyomino()
	{
		_pol = null;
		createPolyomino();
	}
	
}