package ld31.math;
import hxd.Math;
import ld31.gameplay.Tilemap;

/**
 * ...
 * @author Namide
 */
class Dir
{
	var _dir:Int;
	
	public static var DIR_UP:Int = 0;
	public static var DIR_LEFT:Int = 3;
	public static var DIR_RIGHT:Int = 1;
	public static var DIR_DOWN:Int = 2;
	
	public function new( dir:Int = 0 ) 
	{
		set( dir );
	}
	
	public inline function set( dir:Int )
	{
		_dir = normDir( dir );
	}
	
	public inline function is( dir:Int ):Bool
	{
		return _dir == dir;
	}
	
	public inline function isHorizontal():Bool
	{
		return (is(Dir.DIR_LEFT ) || is( Dir.DIR_RIGHT));
	}
	
	public inline function get():Int
	{
		return _dir;
	}
	
	public function getRad():Float
	{
		if ( is(DIR_UP) ) 			return 0.;
		else if ( is(DIR_DOWN) ) 	return hxd.Math.PI;
		else if ( is(DIR_LEFT) ) 	return -hxd.Math.PI*0.5;
		else if ( is(DIR_RIGHT) ) 	return hxd.Math.PI*0.5;
		return 0.;
	}
	
	public function left()
	{
		_dir = normDir( _dir-1 );
	}
	
	public function right()
	{
		_dir = normDir( _dir + 1 );
	}
	
	static inline function normDir( dir:Int ):Int
	{
		return (dir<0) ? ((dir%4)+4) : (dir%4);
	}
	
	public static function getDir( playerX:Float, playerY:Float, tm:Tilemap, lastDir:Dir = null ):Dir
	{
		var playerSize:Float = 1;//0.25;
		
		if ( lastDir.is( Dir.DIR_UP ) || lastDir.is( Dir.DIR_DOWN ) )
		{
			if ( playerX + playerSize < tm.bounds.xMin ) return new Dir( Dir.DIR_LEFT );
			if ( playerX - playerSize > tm.bounds.xMax ) return new Dir( Dir.DIR_RIGHT );
		}
		
		if ( lastDir.is( Dir.DIR_LEFT ) || lastDir.is( Dir.DIR_RIGHT ) )
		{
			if ( playerY + playerSize < tm.bounds.yMin ) return new Dir( Dir.DIR_UP );
			if ( playerY - playerSize > tm.bounds.yMax ) return new Dir( Dir.DIR_DOWN );
		}
		
		return lastDir;
		
		/*var d:Dir = new Dir();
		var x = playerX - Tilemap.getNeutralX();
		var y = playerY - Tilemap.getNeutralY();
		
		
		if ( y > 0 && y >= hxd.Math.abs(x) )
		{
			d.set( DIR_DOWN );
		}
		else if ( y < 0 && y <= -hxd.Math.abs(x) )
		{
			d.set( DIR_UP );
		}
		else if ( x >= 0 && x >= hxd.Math.abs(y) )
		{
			d.set( DIR_RIGHT );
		}
		else if ( x <= 0 && x <= -hxd.Math.abs(y) )
		{
			d.set( DIR_LEFT );
		}
		
		return d;*/
	}
	
	public function toString():String
	{
		var d = "";
		if ( is(DIR_UP) ) d = "up";
		else if ( is(DIR_DOWN) ) d = "down";
		else if ( is(DIR_LEFT) ) d = "left";
		else if ( is(DIR_RIGHT) ) d = "right";
		
		return "{dir:"+ d +"}";
	}
	
}