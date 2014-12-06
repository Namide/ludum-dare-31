package ld31.gameplay;
import ld31.math.Contacts;
import ld31.math.Dir;
import ld31.math.Vec2d;

/**
 * ...
 * @author Namide
 */
class Tilemap
{

	public inline static var SIDE_NUM:Int = 7;
	
	public inline static var TYPE_EMPTY:Int = 0;
	public inline static var TYPE_NEUTRAL:Int = 1;
	public inline static var TYPE_R:Int = 2;
	public inline static var TYPE_G:Int = 3;
	public inline static var TYPE_B:Int = 4;
	public inline static var TYPE_PLAYER:Int = 5;
	
	var _staticTypes:Array<Array<Int>>;
	
	public function new() 
	{
		_staticTypes = getEmtpyGrid();
	}
	
	static inline public function getNeutralX():Int
	{
		return Math.floor(SIDE_NUM * 0.5);
	}
	static inline public function getNeutralY():Int
	{
		return Math.floor(SIDE_NUM * 0.5);
	}
	
	static public function getNeutralPos():Vec2d
	{
		var m:Int = Math.floor(SIDE_NUM * 0.5);
		return new Vec2d( m, m );
	}
	
	static function getEmtpyGrid()
	{
		var a:Array<Array<Int>> = [];
		for ( i in 0...SIDE_NUM )
		{
			a[i] = [];
			for ( j in 0...SIDE_NUM )
				a[i][j] = TYPE_EMPTY;
		}
		var m:Int = Math.floor(SIDE_NUM * 0.5);
		a[m][m] = TYPE_NEUTRAL;
		return a;
	}
	
	/*public function getReversed( dir:Int )
	{
		dir = Dir.normDir( dir );
		
		var a = getEmtpyGrid();
		for ( i in 0...a.length )
			for ( j in 0...a[i].length )
				a[i][j] = get( i, j, dir );
		
		return a;
	}*/
	
	public function getCol( x:Int, y:Int ):Contacts
	{
		var c = new Contacts();
		c.on = 		get( x, y );
		c.top = 	get( x, y-1 );
		c.right = 	get( x+1, y );
		c.bottom = 	get( x, y+1 );
		c.left = 	get( x-1, y );
		return c;
	}
	
	public inline function get( x:Int, y:Int):Int
	{
		var rep:Int;
		if ( x > -1 && y > -1 && x < SIDE_NUM && y < SIDE_NUM )
			rep = _staticTypes[x][y];
		else
			rep = TYPE_EMPTY;
		
		return rep;
		//dir = Dir.normDir( dir );
		/*var nx:Int, ny:Int;
		if ( dir == 1 )
		{
			nx = y;
			ny = SIDE_NUM - x;
		}
		else if ( dir == 2 )
		{
			nx = x;
			ny = -y;
		}
		else if ( dir == 3 )
		{
			nx = SIDE_NUM - y;
			ny = x;
		}
		else
		{
			nx = x;
			ny = y;
		}*/
		
	}
	
}