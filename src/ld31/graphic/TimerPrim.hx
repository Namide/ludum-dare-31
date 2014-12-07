package ld31.graphic;

import h3d.col.Point;
import h3d.prim.Polygon;
import h3d.prim.UV;

/**
 * ...
 * @author Namide
 */
class TimerPrim extends Polygon
{

	static var _TIMER_PRIM:TimerPrim;
	
	public function new()
	{
		var z = 0.5;
		
		var p = [
			new Point(-.5, -.5, 0),
			new Point( .0, .0, 0),
			new Point(-.5, .5, 0),
			new Point( .5, -.5, 0),
			new Point( .5, .5, 0),
		];
		var idx = new hxd.IndexBuffer();
		idx.push(0); idx.push(1); idx.push(2);
		idx.push(3); idx.push(4); idx.push(1);
		super(p, idx);
	}

	override function addUVs() {
		unindex();

		var z = new UV(0, 1);
		var x = new UV(1, 1);
		var y = new UV(0, 0);
		var o = new UV(1, 0);

		uvs = [
			x, z, y,
			x, y, o,
		];
	}
	
	static public function getInstance():TimerPrim
	{
		if ( _TIMER_PRIM == null ) _TIMER_PRIM = new TimerPrim();
		return _TIMER_PRIM;
	}
}