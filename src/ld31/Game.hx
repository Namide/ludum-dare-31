package ld31;
import ld31.gameplay.PlayerControl;
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

	var _time:UInt;
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
		_time = 0;
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
	}
	
	public function mainLoop()
	{
		var col = _tm.getCol( Math.round(_playerControl.x), Math.round(_playerControl.y) );
		_playerControl.update( col, _dir );
		_playerControl.x += _playerControl.vx;
		_playerControl.y += _playerControl.vy;
		
		_playerMesh.x = _playerControl.x;
		_playerMesh.y = _playerControl.y;
		
		_graphic.refresh();
	}
	
}