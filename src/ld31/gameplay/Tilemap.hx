package ld31.gameplay;
import hxd.Math;
import ld31.math.Bounds;
import ld31.math.Contacts;
import ld31.math.Dir;
import ld31.math.Vec2d;

/**
 * ...
 * @author Namide
 */
class Tilemap
{

	public inline static var SIDE_NUM_X:Int = 14;
	public inline static var SIDE_NUM_Y:Int = 14;
	
	public inline static var TYPE_EMPTY:Int = 0;
	public inline static var TYPE_NEUTRAL:Int = 1;
	public inline static var TYPE_R:Int = 2;
	public inline static var TYPE_G:Int = 3;
	public inline static var TYPE_B:Int = 4;
	public inline static var TYPE_PLAYER:Int = 5;
	
	var _staticTypes:Array<Array<Int>>;
	
	public var bounds:Bounds;
	
	public function new() 
	{
		_staticTypes = getEmtpyGrid();
		bounds = new Bounds();
		updateBB();
	}
	
	function updateBB()
	{
		bounds.xMin = 100;
		bounds.yMin = 100;
		bounds.xMax = -100;
		bounds.yMax = -100;
		
		for ( j in 0...SIDE_NUM_Y )
			for ( i in 0...SIDE_NUM_X )
			{
				if ( get(i, j) != TYPE_EMPTY )
				{
					if ( j < bounds.yMin ) bounds.yMin = j;
					if ( i < bounds.xMin ) bounds.xMin = i;
					if ( j > bounds.yMax ) bounds.yMax = j;
					if ( i > bounds.xMax ) bounds.xMax = i;
				}
				
			}
		
		trace( bounds );
	}
	
	static inline public function getNeutralX():Int
	{
		return Math.floor(SIDE_NUM_X * 0.5);
	}
	static inline public function getNeutralY():Int
	{
		return Math.floor(SIDE_NUM_Y * 0.5);
	}
	
	static public function getNeutralPos():Vec2d
	{
		var mX:Int = getNeutralX();
		var mY:Int = getNeutralY();
		return new Vec2d( mX, mY );
	}
	
	static function getEmtpyGrid()
	{
		var a:Array<Array<Int>> = [];
		for ( i in 0...SIDE_NUM_X )
		{
			a[i] = [];
			for ( j in 0...SIDE_NUM_Y )
				a[i][j] = TYPE_EMPTY;
		}
		var mX:Int = getNeutralX();
		var mY:Int = getNeutralY();
		a[mX][mY] = TYPE_NEUTRAL;
		a[mX][mY+1] = TYPE_NEUTRAL;
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
	
	public function getPosPolContact( form:Array<Array<Int>>, dir:Dir, x:Int, y:Int  ):Array<Int>
	{
		if ( dir.is(Dir.DIR_UP) )
		{
			for ( j in -form.length...SIDE_NUM_Y )
				if ( hasPolContact( form, x, j ) )
					return [x, j-1];
		}
		else if ( dir.is(Dir.DIR_DOWN) )
		{
			var j = SIDE_NUM_Y-1;
			var min = -form.length-1;
			while ( --j > min )
				if ( hasPolContact( form, x, j ) )
					return [x, j+1];
			/*for ( j in SIDE_NUM_Y... -form.length )
				if ( hasPolContact( form, x, j ) )
					return [x, j+1];*/
		}
		else if ( dir.is(Dir.DIR_LEFT) )
		{
			for ( i in -form[0].length...SIDE_NUM_X )
				if ( hasPolContact( form, i, y ) )
					return [i-1, y];
		}
		else if ( dir.is(Dir.DIR_RIGHT) )
		{
			var i = SIDE_NUM_X-1;
			var min = -form[0].length-1;
			while ( --i > min )
				if ( hasPolContact( form, i, y ) )
					return [i + 1, y];
			
			/*for ( i in SIDE_NUM_X...-form[0].length )
				if ( hasPolContact( form, i, y ) )
					return [i+1, y];*/
		}
		
		return null;
	}
	
	function hasPolContact( form:Array<Array<Int>>, x:Int, y:Int ):Bool
	{
		for ( j in y...(y+form.length) )
		{
			if ( j > -1 && j < _staticTypes.length )
				for ( i in x...(x+form[0].length) )
				{
					if ( i > -1 && i < _staticTypes[j].length )
						if ( _staticTypes[j][i] != TYPE_EMPTY && form[j-y][i-x] != 0 )
							return true;
				}
			
		}
		return false;
	}
	
	public function addPolyomino( form:Array<Array<Int>>, x:Int, y:Int )
	{
		for ( j in y...(y+form.length) )
		{
			if ( j > -1 && j < _staticTypes.length )
				for ( i in x...(x+form[0].length) )
				{
					if ( i > -1 && i < _staticTypes[j].length )
						if ( _staticTypes[j][i] == TYPE_EMPTY && form[j - y][i - x] != 0 )
						{
							trace("ok");
							_staticTypes[j][i] = form[j-y][i-x];
						}
				}
			
		}
		updateBB();
	}
	
	/*public function hasPolContact( form:Array<Array<Int>>, dir:Dir, x:Int, y:Int ):Bool
	{
		if ( dir.is(Dir.DIR_UP) || dir.is(Dir.DIR_DOWN) )
			return hasPolContactVertical( form, x );
		else
			return hasPolContactHorizontal( form, y );
		
		return false;
	}
	
	function hasPolContactVertical( form:Array<Array<Int>>, x:Int ):Bool
	{
		var iMin:Int = x;
		var iMax:Int = x + form[0].length;
		iMin = (iMin < 0) ? 0 : iMin;
		iMax = (iMax > SIDE_NUM) ? SIDE_NUM : iMax;
		
		if ( iMin > SIDE_NUM || iMax < 0 || iMax - iMin < 0 ) return false;
		
		for ( j in 0...SIDE_NUM )
			for ( i in iMin...iMax )
			{
				if ( _staticTypes[j][i] != TYPE_EMPTY ) return true;
			}
		return false;
	}
	
	function hasPolContactHorizontal( form:Array<Array<Int>>, y:Int ):Bool
	{
		var jMin:Int = y;
		var jMax:Int = y + form.length;
		jMin = (jMin < 0) ? 0 : jMin;
		jMax = (jMax > SIDE_NUM) ? SIDE_NUM : jMax;
		
		if ( jMin > SIDE_NUM || jMax < 0 || jMax - jMin < 0 ) return false;
		
		for ( j in jMin...jMax )
			for ( i in 0...SIDE_NUM )
			{
				if ( _staticTypes[j][i] != TYPE_EMPTY ) return true;
			}
		return false;
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
		if ( x > -1 && y > -1 && x < SIDE_NUM_X && y < SIDE_NUM_Y )
			rep = _staticTypes[y][x];
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