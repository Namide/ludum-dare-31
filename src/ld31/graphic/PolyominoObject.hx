package ld31.graphic;

import h3d.scene.Mesh;
import h3d.scene.Object;
import ld31.gameplay.PolyominoControl;

/**
 * ...
 * @author Namide
 */
class PolyominoObject extends Object
{

	public function new(pc:PolyominoControl,?parent:Object, ghost:Bool = false) 
	{
		super(parent);
		
		var f = pc.form;
		for ( j in 0...f.length )
			for ( i in 0...f[j].length )
			{
				if ( f[j][i] == 0 ) continue;
				var c:Mesh = new CubeMesh( pc.color, this, ghost );
				c.x = i;
				c.y = j;
			}
		
	}
	
}