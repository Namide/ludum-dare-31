package ld31;
import hxd.Timer;
import ld31.gameplay.PlayerControl;
import ld31.gameplay.PolyominoControl;
import ld31.gameplay.Tilemap;
import ld31.graphic.CubeMesh;
import ld31.graphic.PlayerMesh;
import ld31.graphic.Render;
import ld31.math.Dir;

/**
 * ...
 * @author Namide
 */
class Game
{
	var _t:Float;
	var _dt:Float;
	var _frameTime:Float = 1/50;
	
	
	var _dir:Dir;
	
	
	var _tm:Tilemap;
	var _graphic:Render;
	var _playerControl:PlayerControl;
	
	var _playerMesh:PlayerMesh;
	
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
		var n = new CubeMesh( Tilemap.TYPE_NEUTRAL, _graphic.s3d );
		n.x = p.x;
		n.y = p.y;
		
		//		PLAYER
		_playerControl.x = p.x;
		_playerControl.y = p.y - 1;
		_playerMesh = new PlayerMesh( _graphic.s3d );
		_playerMesh.scale( 0.5 );
		
		hxd.System.setLoop(mainLoop);
		
		
		
		//var pol = new PolyominoControl( 3 );
		//pol.updateForm( new Dir(2) );
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
			
			var newDir = Dir.getDir( _playerControl.x, _playerControl.y );
			if ( !_dir.is( newDir.get() ) )
			{
				_dir = newDir;
				_graphic.rot( _dir );
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
	
}