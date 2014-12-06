package ld31.math;

/**
 * ...
 * @author Namide
 */
class Dir
{

	var _dir:Int;
	
	public static var DIR_NORMAL:Int = 0;
	public static var DIR_LEFT:Int = 3;
	public static var DIR_RIGHT:Int = 1;
	public static var DIR_BOTTOM:Int = 2;
	
	public function new( dir:Int = 0 ) 
	{
		_dir = normDir( dir );
	}
	
	public inline function is( dir:Int ):Bool
	{
		return _dir == dir;
	}
	
	public inline function get():Int
	{
		return _dir;
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
		return (dir<0) ? ((dir%3)+4) : (dir%3);
	}
	
}