package ld31.gameplay;
import h3d.scene.Object;
import ld31.gameplay.Tilemap;
import ld31.graphic.MapObject;
import ld31.graphic.PolyominoObject;
import ld31.math.Dir;
//import tweenx909.EaseX;
//import tweenx909.TweenX;

/**
 * ...
 * @author Namide
 */
class Polyomino
{

	public var control:PolyominoControl;
	public var graphicFinal:PolyominoObject;
	public var graphicGhost:PolyominoObject;
	
	var _dir:Dir;
	
	var _xi:Int;
	var _yi:Int;
	
	var _sitPlace:Array<Int>;
	var _dirSitPlace:Int;
	var _sitTime:Bool;
	public var onSitting:Void->Void;
	
	public function new( parent:Object, dir:Dir ) 
	{
		control = new PolyominoControl();
		
		graphicFinal = new PolyominoObject( control, parent );
		graphicFinal.visible = false;
		
		graphicGhost = new PolyominoObject( control, parent, true );
		
		_sitTime = false;
		rot( dir );
	}
	
	public function fixToTilemap( tm:Tilemap, mm:MapObject )
	{
		tm.addPolyomino( control.form, _sitPlace[0], _sitPlace[1], mm );
		graphicGhost.visible = false;
		graphicGhost.remove();
		
		graphicFinal.visible = false;
		graphicFinal.remove();
	}
	
	public function rot( dir:Dir )
	{
		if ( _sitTime ) return;
		
		_dir = dir;
		_xi = 
		_yi = -100;
	}
	
	public function sit()
	{
		if ( _sitTime || _sitPlace == null ) return;
		
		_sitTime = true;
		graphicFinal.visible = true;
		
		var x0:Int = _sitPlace[0];
		var y0:Int = _sitPlace[1];
		
		var dir = new Dir(_dirSitPlace);
		if 		( dir.is(Dir.DIR_UP) )		y0 -= Tilemap.SIDE_NUM_Y;
		else if ( dir.is(Dir.DIR_RIGHT) )	x0 += Tilemap.SIDE_NUM_X;
		else if ( dir.is(Dir.DIR_DOWN) )	y0 += Tilemap.SIDE_NUM_Y;
		else if ( dir.is(Dir.DIR_LEFT) )	x0 -= Tilemap.SIDE_NUM_X;
		
		graphicFinal.setPos( x0, y0, 0 );
		
		/*TweenX.to( graphicFinal, {x:_sitPlace[0], y:_sitPlace[1]} )
				.time( Game.POLYOMINO_TIME_SIT )
				.onFinish( onSitting );*/
		motion.Actuate.tween (graphicFinal, Game.POLYOMINO_TIME_SIT, {x:_sitPlace[0], y:_sitPlace[1]} ).onComplete( onSitting );
	}
	
	public function updateGhost( x:Float, y:Float, tm:Tilemap )
	{
		if ( _sitTime )
			return;
		
		var xi = Math.round( x - (control.form[0].length-1) * 0.5 );
		var yi = Math.round( y - (control.form.length-1) * 0.5 );
		
		_xi = xi;
		_yi = yi;
		
		_sitPlace = tm.getPosPolContact( control.form, _dir, xi, yi );
		_dirSitPlace = _dir.get();
		
		if ( _sitPlace == null )
			graphicGhost.visible = false;
		else
		{
			if ( !graphicGhost.visible )
				graphicGhost.visible = true;
				
			graphicGhost.setPos( _sitPlace[0], _sitPlace[1], 0 );
		}
	}
}