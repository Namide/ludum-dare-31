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
	var _friction:Float;
	
	public var x:Float;
	public var y:Float;
	
	public var vx:Float;
	public var vy:Float;
	
	public function new() 
	{
		vx = 0;
		vy = 0;
		_run = new Vec2d( 0.1, 0 );
		_jump = new Vec2d( 0, -0.2 );
		_g = new Vec2d( 0, 0.02 );
		_friction = 0.7;
		_airSlowler = 0.2;
	}
	
	/*public var changeDir( dir )
	{
		_dir = ld31.math.Dir.normDir( dir );
	}*/
	
	public function updateCollides( c:Contacts )
	{
		// COLLIDES
		if ( c.top != Tilemap.TYPE_EMPTY && y - Math.round(y) <= 0 )
		{
			if ( vy < 0 ) vy = 0;
			y = Math.round(y);
		}
		if ( c.bottom != Tilemap.TYPE_EMPTY && y - Math.round(y) >= 0 )
		{
			if ( vy > 0 ) vy = 0;
			y = Math.round(y);
		}
		if ( c.left != Tilemap.TYPE_EMPTY && x - Math.round(x) <= 0 )
		{
			if ( vx < 0 ) vx = 0;
			x = Math.round(x);
		}
		if ( c.right != Tilemap.TYPE_EMPTY && x - Math.round(x) >= 0 )
		{
			if ( vx > 0 ) vx = 0;
			x = Math.round(x);
		}
	}
	
	public function updateControls( col:Contacts, dir:Dir )
	{
		var r = _run.cloneAndRot( dir );
		var g = _g.cloneAndRot( dir );
		var j = _jump.cloneAndRot( dir );
		var c = col.rot( dir );
		
		//trace(g);
		
		var onGround = false;
		if ( c.bottom != Tilemap.TYPE_EMPTY )
		{
			if ( dir.is( Dir.DIR_UP ) )
			{
				if ( y - Math.round(y) >= 0 )
					onGround = true;
			}
			else if ( dir.is( Dir.DIR_RIGHT ) )
			{
				if ( x - Math.round(x) <= 0 )
					onGround = true;
			}
			else if ( dir.is( Dir.DIR_DOWN ) )
			{
				if ( y - Math.round(y) <= 0 )
					onGround = true;
			}
			else if ( dir.is( Dir.DIR_LEFT ) )
			{
				if ( x - Math.round(x) >= 0 )
					onGround = true;
			}
		}
		
		
		// FRICTION
		if ( dir.is( Dir.DIR_LEFT ) || dir.is( Dir.DIR_RIGHT ) )
			vy *= _friction;
		else
			vx *= _friction;
		
		
		// CONTROLS
		if ( onGround )
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