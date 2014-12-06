package ld31.gameplay;
import h3d.scene.Object;
import ld31.gameplay.Tilemap;
import ld31.graphic.PolyominoObject;
import ld31.math.Dir;

/**
 * ...
 * @author Namide
 */
class Polyomino
{

	public var control:PolyominoControl;
	public var graphic:PolyominoObject;
	
	public function new( parent:Object, dir:Dir ) 
	{
		control = new PolyominoControl();
		graphic = new PolyominoObject( control, parent );
		rot( dir );
	}
	
	public function rot( dir:Dir )
	{
		control.updateForm( dir );
		//graphic.setRotate( 0, 0, dir.getRad() );
	}
	
	public function updateGhost( x:Float, y:Float, tm:Tilemap )
	{
		//var px = 
	}
	
}