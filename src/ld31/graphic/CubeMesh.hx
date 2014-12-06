package ld31.graphic;

import h3d.mat.MeshMaterial;
import h3d.scene.Mesh;
import ld31.gameplay.Tilemap;

/**
 * ...
 * @author Namide
 */
class CubeMesh extends Mesh
{

	static var _matN:MeshMaterial;
	static var _matR:MeshMaterial;
	static var _matG:MeshMaterial;
	static var _matB:MeshMaterial;
	
	public function new( type:Int, ?parent ) 
	{
		super(new CubePrim(), getMat(type), parent);
		
	}
	
	static function getMat( type:Int ):MeshMaterial
	{
		if ( type == Tilemap.TYPE_R )
		{
			if ( _matR == null )
			{
				_matR = new MeshMaterial();
				_matR.color.setColor(0xff0099); 
			}
			return _matR;
		}
		else if ( type == Tilemap.TYPE_G )
		{
			if ( _matG == null )
			{
				_matG = new MeshMaterial();
				_matG.color.setColor(0x99ff00); 
			}
			return _matG;
		}
		else if ( type == Tilemap.TYPE_B )
		{
			if ( _matB == null )
			{
				_matB = new MeshMaterial();
				_matB.color.setColor(0x0099ff); 
			}
			return _matB;
		}
		
		if ( _matN == null )
		{
			_matN = new MeshMaterial();
			_matN.color.setColor(0x666666); 
		}
		return _matN;
	}
	
	
}