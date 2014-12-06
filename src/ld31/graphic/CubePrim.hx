package ld31.graphic;

import h3d.col.Point;
import h3d.prim.Polygon;
import h3d.prim.UV;

/**
 * ...
 * @author Namide
 */
class CubePrim extends Polygon
{

	static var _CUBE_PRIM:CubePrim;
	
	public function new()
	{
		var z = 0.5;
		
		var p = [
			new Point(-.5, -.5, -z),
			new Point( .5, -.5, -z),
			new Point(-.5, .5, -z),
			new Point(-.5, -.5, 0),
			new Point( .5, .5, -z),
			new Point( .5, -.5, 0),
			new Point(-.5, .5, 0),
			new Point( .5, .5, 0),
		];
		var idx = new hxd.IndexBuffer();
		idx.push(0); idx.push(1); idx.push(5);
		idx.push(0); idx.push(5); idx.push(3);
		idx.push(1); idx.push(4); idx.push(7);
		idx.push(1); idx.push(7); idx.push(5);
		idx.push(3); idx.push(5); idx.push(7);
		idx.push(3); idx.push(7); idx.push(6);
		idx.push(0); idx.push(6); idx.push(2);
		idx.push(0); idx.push(3); idx.push(6);
		idx.push(2); idx.push(7); idx.push(4);
		idx.push(2); idx.push(6); idx.push(7);
		idx.push(0); idx.push(4); idx.push(1);
		idx.push(0); idx.push(2); idx.push(4);
		super(p, idx);
	}

	override function addUVs() {
		unindex();

		var z = new UV(0, 1);
		var x = new UV(1, 1);
		var y = new UV(0, 0);
		var o = new UV(1, 0);

		uvs = [
			z, x, o,
			z, o, y,
			x, z, y,
			x, y, o,
			x, z, y,
			x, y, o,
			z, o, x,
			z, y, o,
			x, y, z,
			x, o, y,
			z, o, x,
			z, y, o,
		];
	}
	
	static public function getInstance():CubePrim
	{
		if ( _CUBE_PRIM == null ) _CUBE_PRIM = new CubePrim();
		return _CUBE_PRIM;
	}
}