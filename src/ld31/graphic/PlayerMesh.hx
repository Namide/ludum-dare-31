package ld31.graphic;

import h3d.mat.MeshMaterial;
import h3d.prim.GeoSphere;
import h3d.scene.Mesh;

/**
 * ...
 * @author Namide
 */
class PlayerMesh extends Mesh
{

	public function new(?parent) 
	{
		var prim = new GeoSphere(2);
		var mat = new MeshMaterial();
		mat.color.setColor( 0x000000 );
		
		super(prim, mat, parent);
	}
	
}