package ld31.math;

/**
 * ...
 * @author Namide
 */
class Contacts
{

	public var left:Int;
	public var top:Int;
	public var right:Int;
	public var bottom:Int;
	public var on:Int;
	
	public function new() 
	{
		
	}
	
	public function rot( dir:Dir )
	{
		var nc = new Contacts();
		nc.on = on;
		
		if ( dir.is(Dir.DIR_NORMAL) )
		{
			nc.left = left;
			nc.top = top;
			nc.right = right;
			nc.bottom = bottom;
		}
		else if ( dir.is(Dir.DIR_RIGHT) )
		{
			nc.left = bottom;
			nc.top = left;
			nc.right = top;
			nc.bottom = right;
		}
		else if ( dir.is(Dir.DIR_BOTTOM) )
		{
			nc.left = right;
			nc.top = bottom;
			nc.right = left;
			nc.bottom = top;
		}
		else if ( dir.is(Dir.DIR_LEFT) )
		{
			nc.left = top;
			nc.top = right;
			nc.right = bottom;
			nc.bottom = left;
		}
		return nc;
	}
	
}