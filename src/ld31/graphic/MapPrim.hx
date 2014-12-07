package ld31.graphic;

import h3d.anim.Animation;
import h3d.col.Point;
import h3d.Engine;
import h3d.prim.Polygon;

/**
 * ...
 * @author Namide
 */
class MapPrim extends Polygon
{

	public function new() 
	{
		super( [] );
	}
	
	public function addSquare( x:Int, y:Int )
	{
		var iP = points.length;
		
		points.push( new Point(x-.5, y-.5, 0) );
		points.push( new Point(x+.5, y-.5, 0) );
		points.push( new Point(x-.5, y+.5, 0) );
		points.push( new Point(x+.5, y+.5, 0) );
		
		if ( idx == null) idx = new hxd.IndexBuffer();
		idx.push(iP); 	idx.push(iP+1); idx.push(iP+2);
		idx.push(iP+2); idx.push(iP+1); idx.push(iP+3);
		
		alloc( Engine.getCurrent() );
	}
	
}