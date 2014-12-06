package ld31.math;

import h2d.col.Point;

/**
 * ...
 * @author Namide
 */
class Vec2d extends Point
{

	public function new(x=0., y=0.) 
	{
		super(x, y);
	}
	
	public function cloneAndRot( dir:Dir ):Vec2d
	{
		var n = new Vec2d();
		if ( dir.is(Dir.DIR_UP) ) {
			n.x = x;
			n.y = y;
		}
		else if ( dir.is(Dir.DIR_RIGHT) )
		{
			n.x = -y;
			n.y = x;
		}
		else if ( dir.is(Dir.DIR_DOWN) )
		{
			n.x = -x;
			n.y = -y;
		}
		else if ( dir.is(Dir.DIR_LEFT) )
		{
			n.x = y;
			n.y = -x;
		}
		return n;
	}
	
}