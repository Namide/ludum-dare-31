package ld31.graphic;

import h3d.mat.MeshMaterial;
import h3d.scene.Mesh;
import ld31.gameplay.Tilemap;
import ld31.graphic.OutShader;

/**
 * ...
 * @author Namide
 */
class CubeMesh extends Mesh
{

	static var _MAT_BLACK:MeshMaterial;
	static public function getMatBlack()
	{
		if ( _MAT_BLACK == null )
		{
			_MAT_BLACK = new MeshMaterial();
			_MAT_BLACK.color.setColor(0x000000); 
		}
		return _MAT_BLACK;
	}
	
	static var _MAT_R:MeshMaterial;
	static public function getMatR()
	{
		if ( _MAT_R == null )
		{
			_MAT_R = new MeshMaterial();
			_MAT_R.color.setColor(0xff0099); 
		}
		return _MAT_R;
	}
	
	static var _MAT_G:MeshMaterial;
	static public function getMatG()
	{
		if ( _MAT_G == null )
		{
			_MAT_G = new MeshMaterial();
			_MAT_G.color.setColor(0x99ff00); 
		}
		return _MAT_G;
	}
	
	static var _MAT_B:MeshMaterial;
	static public function getMatB()
	{
		if ( _MAT_B == null )
		{
			_MAT_B = new MeshMaterial();
			_MAT_B.color.setColor(0x0099ff); 
		}
		return _MAT_B;
	}
	
	static var _MAT_OUT:MeshMaterial;
	static public function getMatOut()
	{
		if ( _MAT_OUT == null )
		{
			_MAT_OUT = new MeshMaterial();
			_MAT_OUT.mainPass.addShader( new OutShader() );
			_MAT_OUT.color.setColor(0x9900ff); 
		}
		return _MAT_OUT;
	}
	
	static var _MAT_R_G:MeshMaterial;
	static public function getMatRG()
	{
		if ( _MAT_R_G == null )
		{
			_MAT_R_G = new MeshMaterial();
			_MAT_R_G.mainPass.addShader( new GhostShader() );
			_MAT_R_G.color.setColor(0xff0099); 
		}
		return _MAT_R_G;
	}
	
	static var _MAT_G_G:MeshMaterial;
	static public function getMatGG()
	{
		if ( _MAT_G_G == null )
		{
			_MAT_G_G = new MeshMaterial();
			_MAT_G_G.mainPass.addShader( new GhostShader() );
			_MAT_G_G.color.setColor(0x99ff00); 
		}
		return _MAT_G_G;
	}
	
	static var _MAT_B_G:MeshMaterial;
	static public function getMatBG()
	{
		if ( _MAT_B_G == null )
		{
			_MAT_B_G = new MeshMaterial();
			_MAT_B_G.mainPass.addShader( new GhostShader() );
			_MAT_B_G.color.setColor(0x0099ff); 
		}
		return _MAT_B_G;
	}
	
	
	public function new( type:Int, ?parent, ghost:Bool = false ) 
	{
		super(new CubePrim(), getMat(type, ghost), parent);
	}
	
	static function getMat( type:Int, ghost:Bool ):MeshMaterial
	{
		if ( type == Tilemap.TYPE_R && ghost ) return getMatRG();
		if ( type == Tilemap.TYPE_R ) return getMatR();
		
		if ( type == Tilemap.TYPE_G && ghost ) return getMatGG();
		if ( type == Tilemap.TYPE_G ) return getMatG();
		
		if ( type == Tilemap.TYPE_B && ghost ) return getMatBG();
		if ( type == Tilemap.TYPE_B ) return getMatB();
		
		return getMatBlack();
	}
	
	
}