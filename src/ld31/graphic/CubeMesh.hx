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
	
	static var _matRG:MeshMaterial;
	static var _matGG:MeshMaterial;
	static var _matBG:MeshMaterial;
	
	public function new( type:Int, ?parent, ghost:Bool = false ) 
	{
		super(new CubePrim(), getMat(type, ghost), parent);
	}
	
	static function getMat( type:Int, ghost:Bool ):MeshMaterial
	{
		if ( type == Tilemap.TYPE_R )
		{
			if ( ghost )
			{
				if ( _matRG == null )
				{
					_matRG = new MeshMaterial();
					_matRG.mainPass.addShader( new GhostShader() );
					_matRG.color.setColor(0xff0099); 
				}
				return _matRG;
			}
			
			if ( _matR == null )
			{
				_matR = new MeshMaterial();
				_matR.color.setColor(0xff0099); 
			}
			return _matR;
		}
		else if ( type == Tilemap.TYPE_G )
		{
			if ( ghost )
			{
				if ( _matGG == null )
				{
					_matGG = new MeshMaterial();
					_matGG.mainPass.addShader( new GhostShader() );
					_matGG.color.setColor(0x99ff00); 
				}
				return _matGG;
			}
			
			if ( _matG == null )
			{
				_matG = new MeshMaterial();
				//_matG.mainPass.addShader( new GhostShader() );
				_matG.color.setColor(0x99ff00); 
			}
			return _matG;
		}
		else if ( type == Tilemap.TYPE_B )
		{
			if ( ghost )
			{
				if ( _matBG == null )
				{
					_matBG = new MeshMaterial();
					_matBG.mainPass.addShader( new GhostShader() );
					_matBG.color.setColor(0x0099ff); 
				}
				return _matBG;
			}
			
			if ( _matB == null )
			{
				_matB = new MeshMaterial();
				//_matB.mainPass.addShader( new GhostShader() );
				_matB.color.setColor(0x0099ff); 
			}
			return _matB;
		}
		
		if ( _matN == null )
		{
			_matN = new MeshMaterial();
			_matN.color.setColor(0x000000); 
		}
		return _matN;
	}
	
	
}