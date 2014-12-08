package ld31.gameplay;
import h2d.col.Point;
import haxe.Timer;
import hxd.Key;
import hxd.Math;
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
	var _run:Vec2d;
	var _jump:Vec2d;
	var _g:Vec2d;
	var _airSlowler:Float;
	var _friction:Float;
	
	var _lastTOnGround:Float;
	
	public var x:Float;
	public var y:Float;
	
	public var vx:Float;
	public var vy:Float;
	
	public var onAction:Void->Void;
	public var onRestart:Void->Void;
	public var blockControls:Bool;
	
	public function new() 
	{
		vx = 0;
		vy = 0;
		_run = new Vec2d( 0.3, 0 );
		_jump = new Vec2d( 0, -0.3 );
		_g = new Vec2d( 0, 0.02 );
		_friction = 0.7;
		_airSlowler = 0.2;
		_lastTOnGround = haxe.Timer.stamp();
		blockControls = false;
	}
	
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
		
		
		// AVOID SUPERPOSE
		if ( col.on != Tilemap.TYPE_EMPTY ||
			(
				c.top != Tilemap.TYPE_EMPTY &&
				c.right != Tilemap.TYPE_EMPTY &&
				c.bottom != Tilemap.TYPE_EMPTY &&
				c.left != Tilemap.TYPE_EMPTY
			) ) 
		{
			var decal = new Point( j.x, j.y );
			decal.normalize();
			x += decal.x;
			y += decal.y;
		}
		
		
		// FRICTION
		if ( dir.isHorizontal() )
			vy *= _friction;
		else
			vx *= _friction;			
		
		
		// CONTROLS
		if ( onGround )
		{
			if (!blockControls)
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
			
			_lastTOnGround = haxe.Timer.stamp();
		}
		else
		{
			if (!blockControls)
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
			}
			
			// AVOID ORBITAL
			var fG = (haxe.Timer.stamp() - _lastTOnGround);
			if ( fG > 0.5 )
			{
				return restartPos();
			}
			
			vx += g.x;
			vy += g.y;
			
		}
		
		if ( !blockControls && hxd.Key.isDown( hxd.Key.DOWN ) && onAction != null )
			onAction();
		
	}
	
	function restartPos()
	{
		x = Tilemap.getNeutralX();
		y = Tilemap.getNeutralY();
		vx = 0;
		vy = 0;
		_lastTOnGround = haxe.Timer.stamp();
		if ( onRestart != null ) onRestart();
	}
	
	function applyMove( v0:Float, v1:Float, acc:Float = 1.0, maximum:Bool = false ):Float
	{
		if ( v1 > 0 )
		{
			if ( maximum && v0 < v1 ) 
			{
				v0 += v1 * acc;
				if ( v0 > v1 )
					v0 = v1;
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
				if ( v0 < v1 )
					v0 = v1;
			}
			else
			{
				v0 += v1 * acc;
			}
		}
		return v0;
	}
	
}