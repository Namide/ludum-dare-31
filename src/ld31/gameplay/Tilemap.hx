package ld31.gameplay;
import h3d.Engine;
import hxd.Math;
import ld31.graphic.MapObject;
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

	public var score:Int;
	public var squareIn:Int;
	public var squareOut:Int;
	public var squareMax:Int;
	
	
	public inline static var SIDE_NUM_X:Int = 13;
	public inline static var SIDE_NUM_Y:Int = 13;
	inline static var _MARGIN:Int = 5;
	
	public inline static var TYPE_EMPTY:Int = 0;
	public inline static var TYPE_NEUTRAL:Int = 1;
	public inline static var TYPE_R:Int = 2;
	public inline static var TYPE_G:Int = 3;
	public inline static var TYPE_B:Int = 4;
	public inline static var TYPE_PLAYER:Int = 5;
	public inline static var TYPE_OUT:Int = 6;
	
	var _staticTypes:Array<Array<Int>>;
	
	public var bounds:Bounds;
	
	public function new() 
	{
		_staticTypes = getEmtpyGrid();
		squareMax = SIDE_NUM_X * SIDE_NUM_Y - 1;
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
		for ( i in 0...SIDE_NUM_X+2*_MARGIN )
		{
			a[i] = [];
			for ( j in 0...SIDE_NUM_Y+2*_MARGIN )
				a[i][j] = TYPE_EMPTY;
		}
		var mX:Int = getNeutralX()+_MARGIN;
		var mY:Int = getNeutralY()+_MARGIN;
		a[mX][mY] = TYPE_NEUTRAL;
		return a;
	}
	
	public function getPosPolContact( form:Array<Array<Int>>, dir:Dir, x:Int, y:Int  ):Array<Int>
	{
		if ( dir.is(Dir.DIR_UP) )
		{
			var min = -(form.length+_MARGIN);
			for ( j in min...SIDE_NUM_Y+_MARGIN )
				if ( hasPolContact( form, x, j ) )
					return [x, j-1];
		}
		else if ( dir.is(Dir.DIR_DOWN) )
		{
			var j = SIDE_NUM_Y+_MARGIN;
			var min = -(form.length+_MARGIN);
			while ( --j > min )
				if ( hasPolContact( form, x, j ) )
					return [x, j+1];
		}
		else if ( dir.is(Dir.DIR_LEFT) )
		{
			var min = -(form[0].length+_MARGIN);
			for ( i in -form[0].length...SIDE_NUM_X+_MARGIN )
				if ( hasPolContact( form, i, y ) )
					return [i-1, y];
		}
		else if ( dir.is(Dir.DIR_RIGHT) )
		{
			var i = SIDE_NUM_X+_MARGIN;
			var min = -(form[0].length+_MARGIN);
			while ( --i > min )
				if ( hasPolContact( form, i, y ) )
					return [i + 1, y];
		}
		
		return null;
	}
	
	function hasPolContact( form:Array<Array<Int>>, x:Int, y:Int ):Bool
	{
		for ( j in y...(y+form.length) )
		{
			for ( i in x...(x+form[0].length) )
			{
				if ( get( i, j ) != TYPE_EMPTY && form[j-y][i-x] != 0 )
					return true;
			}
		}
		return false;
	}
	
	public inline function addSquare( squareIn:Int = 0, squareOut:Int = 0 )
	{
		this.squareIn += squareIn;
		this.squareOut += squareOut;
		this.score += squareIn * 10 + squareOut;
		//squareMax = squareIn + squareOut;
	}
	
	public function addPolyomino( form:Array<Array<Int>>, x:Int, y:Int, mm:MapObject )
	{
		for ( j in y...(y+form.length) )
		{
			for ( i in x...(x+form[0].length) )
			{
				if ( get( i, j ) == TYPE_EMPTY && form[j-y][i-x] != 0 )
				{
					set( i, j, form[j - y][i - x], mm );
				}
			}
		}
		updateBB();
	}
	
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
	
	public inline function set( x:Int, y:Int, type:Int, mm:MapObject )
	{
		if ( isInArea(x, y) )
		{
			addSquare( 1, 0 );
			mm.addSquare( type, x, y );
		}
		else
		{
			addSquare( 0, 1 );
			mm.addSquare( Tilemap.TYPE_OUT, x, y );
		}
		
		x += _MARGIN;
		y += _MARGIN;
		
		if ( x > -1 && y > -1 && x < _staticTypes[0].length && y < _staticTypes.length )
			_staticTypes[y][x] = type;
		
	}
	
	public inline function isInArea( x:Int, y:Int ):Bool
	{
		return x > -1 && y > -1 && x < SIDE_NUM_X && y < SIDE_NUM_Y;
	}
	
	public inline function get( x:Int, y:Int):Int
	{
		x += _MARGIN;
		y += _MARGIN;
		
		var rep:Int;
		if ( x > -1 && y > -1 && x < _staticTypes[0].length && y < _staticTypes.length )
			rep = _staticTypes[y][x];
		else
			rep = TYPE_EMPTY;
		
		return rep;
	}
	
}