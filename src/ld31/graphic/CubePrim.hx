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
		var p = [
			new Point(-.5, -.5, 0),
			new Point( .5, -.5, 0),
			new Point(-.5, .5, 0),
			new Point( .5, .5, 0)
		];
		var idx = new hxd.IndexBuffer();
		idx.push(0); idx.push(1); idx.push(2);
		idx.push(2); idx.push(1); idx.push(3);
		
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
			x, y, o
		];
	}
	
	static public function getInstance():CubePrim
	{
		if ( _CUBE_PRIM == null ) _CUBE_PRIM = new CubePrim();
		return _CUBE_PRIM;
	}
	
	public static function DISPOSE()
	{
		_CUBE_PRIM = null;
	}
}