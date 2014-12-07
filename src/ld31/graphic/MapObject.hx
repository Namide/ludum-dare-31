package ld31.graphic;

import h3d.Engine;
import h3d.scene.Mesh;
import h3d.scene.Object;
import ld31.gameplay.Tilemap;

/**
 * ...
 * @author Namide
 */
class MapObject extends Object
{

	var rM:Mesh;
	var gM:Mesh;
	var bM:Mesh;
	var outM:Mesh;
	
	var rP:MapPrim;
	var gP:MapPrim;
	var bP:MapPrim;
	var outP:MapPrim;
	
	public function new(?parent) 
	{
		super(parent);
		
		rP = new MapPrim();
		rM = new Mesh( rP, CubeMesh.getMatR(), parent );
		
		gP = new MapPrim();
		gM = new Mesh( gP, CubeMesh.getMatG(), parent );
		
		bP = new MapPrim();
		bM = new Mesh( bP, CubeMesh.getMatB(), parent );
		
		outP = new MapPrim();
		outM = new Mesh( outP, CubeMesh.getMatOut(), parent );
	}
	
	public function addSquare( type:Int, x:Int, y:Int )
	{
		
		
		if 		( type == Tilemap.TYPE_R )
			rP.addSquare( x, y );
			
		else if ( type == Tilemap.TYPE_G )
			gP.addSquare( x, y );
			
		else if ( type == Tilemap.TYPE_B )
			bP.addSquare( x, y );
			
		else if ( type == Tilemap.TYPE_OUT )
			outP.addSquare( x, y );
	}
	
}