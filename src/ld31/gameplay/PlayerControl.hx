package ld31.gameplay;
import hxd.Key;
import ld31.Main;
import ld31.math.Contacts;
import ld31.math.Dir;
import ld31.math.Vec2d;

/**
 * ...
 * @author Namide
 */
class PlayerControl
{

	//var _dir:Int = 0;
	
	var _run:Vec2d;
	var _jump:Vec2d;
	var _g:Vec2d;
	var _airSlowler:Float;
	
	public var x:Float;
	public var y:Float;
	
	public var vx:Float;
	public var vy:Float;
	
	public function new() 
	{
		vx = 0;
		vy = 0;
		_run = new Vec2d( 1, 0 );
		_jump = new Vec2d( 0, -5 );
		_g = new Vec2d( 0, 1 );
		_airSlowler = 0.2;
	}
	
	/*public var changeDir( dir )
	{
		_dir = ld31.math.Dir.normDir( dir );
	}*/
	
	public function update( col:Contacts, dir:Dir )
	{
		var r = _run.cloneAndRot( dir );
		var g = _g.cloneAndRot( dir );
		var j = _jump.cloneAndRot( dir );
		var c = col.rot( dir );
		
		
		
		if ( col.bottom != Tilemap.TYPE_EMPTY )
		{
			if ( Key.isDown(Key.LEFT) )
			{
				r.x *= -1;
				r.y *= -1;
				vx = applyMove( vx, r.x, 0.1, true );
				vy = applyMove( vy, r.y, 0.1, true );
			}
			else if ( Key.isDown(Key.RIGHT) )
			{
				vx = applyMove( vx, r.x, 0.1, true );
				vy = applyMove( vy, r.y, 0.1, true );
			}
			if ( Key.isDown(Key.SPACE) )
			{
				vx = applyMove( vx, j.x, 1.0, true );
				vy = applyMove( vy, j.y, 1.0, true );
			}
		}
		else
		{
			r.scale( _airSlowler );
			if ( Key.isDown(Key.LEFT) )
			{
				r.x *= -1;
				r.y *= -1;
				vx = applyMove( vx, r.x, 0.1, true );
				vy = applyMove( vy, r.y, 0.1, true );
			}
			else if ( Key.isDown(Key.RIGHT) )
			{
				vx = applyMove( vx, r.x, 0.1, true );
				vy = applyMove( vy, r.y, 0.1, true );
			}
			
			vx += g.x;
			vy += g.y;
		}
		
		//hxd.Key.isDown(hxd.Key.CTRL) && hxd.Key.isPressed(hxd.Key.F12)
	}
	
	function applyMove( v0:Float, v1:Float, acc:Float = 1.0, maximum:Bool = false ):Float
	{
		if ( v1 > 0 )
		{
			if ( maximum && v0 < v1 ) 
			{
				v0 += v1 * acc;
				if ( v0 > v1 ) v0 = v1;
			}
			else
			{
				v0 += v1 * acc;
			}
		}
		else if ( v1 < 0 )
		{
			if ( maximum && v0 > v1 ) 
			{
				v0 += v1 * acc;
				if ( v0 < v1 ) v0 = v1;
			}
			else
			{
				v0 += v1 * acc;
			}
		}
		return v0;
	}
	
}