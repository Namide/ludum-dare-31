package ld31.gameplay;
import h2d.col.Point;
import haxe.Timer;
import hxd.Key;
import hxd.Math;
import ld31.Main;
import ld31.math.Contacts;
import ld31.math.Dir;
import ld31.math.Vec2d;
/*
class Orbital
{
	//var _x:Float;
	//var _y:Float;
	var _d:Float;
	var _a:Float;
	var _v:Float;
	var _t:Float;
	
	public function new( pc:PlayerControl, t:Float )
	{
		var p = new Point( pc.x, pc.y );
		p = p.sub( Tilemap.getNeutralPos() );
		
		_v = getV( p, new Point( pc.x + pc.vx, pc.y + pc.vy ).sub( Tilemap.getNeutralPos() ) );
		trace(_v);
		
		_a = hxd.Math.atan2( p.y, p.x );
		_d = p.length();
		_t = t;
	}
	
	public inline function getV( p1:Point, p2:Point ):Float
	{
		var a1 = hxd.Math.atan2( p1.y, p1.x );
		var a2 = hxd.Math.atan2( p2.y, p2.x );
		var v = a2 - a1;
		if ( hxd.Math.abs(v) < 0.1 )
		{
			v = (v < 0)? -0.1:0.1;
		}
		return v;
	}
	
	public function update ( pc:PlayerControl, t:Float )
	{
		var newT = (t - _t);
		
		var p = new Point();
		_a += _v;
		p.x = _d * Math.cos( _a );
		p.y = _d * Math.sin( _a );
		
		p = p.add( Tilemap.getNeutralPos() );
		
		pc.x = p.x;
		pc.y = p.y;
		pc.vx = 0;
		pc.vy = 0;
		_d *= 0.99;
	}
}
*/

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
	//var _maxXV:Float;
	
	var _lastTOnGround:Float;
	//var _orbital:Orbital;
	
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
		//_maxXV = 0.3;
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
		
		//if ( Math.random() < 0.01 ) trace( c );
	}
	
	public function updateControls( col:Contacts, dir:Dir )
	{
		//var orbital = false;
		
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
		
		
		
		
		/*if ( 	col.on != Tilemap.TYPE_EMPTY ||
				c.top != Tilemap.TYPE_EMPTY ||
				c.right != Tilemap.TYPE_EMPTY ||
				c.bottom != Tilemap.TYPE_EMPTY ||
				c.left != Tilemap.TYPE_EMPTY )
		{
			_lastTOnGround = haxe.Timer.stamp();
			_orbital = null;
		}*/
			
		
		
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
			//r.scale( _airSlowler );
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
			if ( fG > 0.5 /*&& _orbital == null*/ )
			{
				/*var p = Tilemap.getNeutralPos();
				x += (p.x - x) * fG;
				y += (p.y - y) * fG;*/
				//_orbital = new Orbital( this, haxe.Timer.stamp());
				return restartPos();
			}
			
			vx += g.x;
			vy += g.y;
			
		}
		
		/*if ( dir.isHorizontal() )
			vy = (vy<-_maxXV) ? -_maxXV : (vy>_maxXV) ? _maxXV : vy;
		else
			vx = (vx<-_maxXV) ? -_maxXV : (vx>_maxXV) ? _maxXV : vx;*/
		
		
		
		//if (Math.random() < 0.1) trace( x, y, vx, vy );
		//trace(vx, vy);
		
		if ( !blockControls && hxd.Key.isDown( hxd.Key.DOWN ) && onAction != null )
			onAction();
		
		
		//hxd.Key.isDown(hxd.Key.CTRL) && hxd.Key.isPressed(hxd.Key.F12)
		
		/*if ( hxd.Math.abs( x ) > Tilemap.SIDE_NUM_X ||
			 hxd.Math.abs( y ) > Tilemap.SIDE_NUM_X )
		{
			return restartPos();
		}*/
		
		/*if ( _orbital != null )
		{
			_orbital.update( this, haxe.Timer.stamp() );
		}*/
		
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