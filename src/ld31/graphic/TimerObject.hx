package ld31.graphic;

import h3d.mat.MeshMaterial;
import h3d.scene.Mesh;
import h3d.scene.Object;
import hxd.Math;

/**
 * ...
 * @author Namide
 */
class TimerObject extends Object
{	
	public function new(?parent:Object) 
	{
		super(parent);
		
		var prim = new TimerPrim();
		
		var c1 = new MeshMaterial();
		c1.color.setColor( 0xFFFFFF );
		
		var c2 = new MeshMaterial();
		c2.color.setColor( 0xCCCCCC );
		
		var m1:Mesh = new Mesh( prim, c1, this );
		var m2:Mesh = new Mesh( prim, c2, this );
		m2.setRotate( .0, .0, hxd.Math.PI * 0.5 ); 
	}
	
}