package ld31.graphic;
import h2d.Bitmap;
import h2d.Tile;
import h3d.col.Bounds;
import h3d.col.Point;
import h3d.mat.Data.MipMap;
import hxd.Res;
import ld31.gameplay.Tilemap;
import ld31.math.Dir;
import tweenx909.EaseX;
import tweenx909.TweenX;

/**
 * ...
 * @author Namide
 */
class Render
{

	public var engine : h3d.Engine;
	public var s3d : h3d.scene.Scene;
	public var s2d : h2d.Scene;

	var _onInit:Void->Void;
	
	public var map:MapObject;
	
	//var _rotTween;
	
	public function new(callb:Void->Void)
	{
		_onInit = callb;
		this.engine = engine = new h3d.Engine();
		//engine.
		engine.onReady = setup;
		engine.init();
	}

	public function rot( dir:Dir )
	{
		var newPos = { x:0, y:0, z:0 };
		
		if ( dir.is( Dir.DIR_UP ) )
			newPos.y = -1;
		else if ( dir.is( Dir.DIR_RIGHT ) )
			newPos.x = 1;
		else if ( dir.is( Dir.DIR_DOWN ) )
			newPos.y = 1;
		else if ( dir.is( Dir.DIR_LEFT ) )
			newPos.x = -1;
		
		TweenX.to( s3d.camera.up, newPos )
				.time( 0.5 )
				.ease( EaseX.circOut );
				//.onFinish( function():Void { sm.sysGraphic.camera2d.display.removeChild( display ); } );
		//s3d.camera.up.set( 0., -1., 0. );
	}
	
	function onResize() {
	}

	function setup() {
		engine.onResized = function() {
			s2d.checkResize();
			onResize();
		};
		s3d = new h3d.scene.Scene();
		s2d = new h2d.Scene();
		s2d.setFixedSize(1280, 720);
		s3d.addPass(s2d);
		
		engine.backgroundColor = 0x000000;
		
		var p = Tilemap.getNeutralPos();
		s3d.camera.zoom = 4;
		s3d.camera.up.set( 0., -1., 0. );
		s3d.camera.pos.set( p.x, p.y, 0.5 * (Tilemap.SIDE_NUM_X + Tilemap.SIDE_NUM_Y) * s3d.camera.zoom );
		s3d.camera.target.set( p.x, p.y );
		//s3d.camera.viewX = (1280 - 720) * 0.5;
		//trace(s3d.camera.viewX);
		//trace(s3d.camera.viewX = 0.5 * ( 1 - 1280 / 720 ));
		//s3d.camera.viewX = 1-1280/720;
		//s3d.camera.viewY = -0.05;
		//s3d.camera.viewX = -0.44;
		
		var bg = new TimerObject( s3d );
		bg.scaleX = Tilemap.SIDE_NUM_X;
		bg.scaleY = Tilemap.SIDE_NUM_Y;
		bg.setPos( Tilemap.getNeutralX(), Tilemap.getNeutralY(), -0.01 );
		
		
		map = new MapObject( s3d );
		_onInit();
		
		
	}
	
	public inline function refresh()
	{
		
		//s2d.checkEvents();
		engine.render(s3d);
		
		
		
	}
	
	var _msg:h2d.Bitmap;
	var _tile:h2d.Tile;
	public function addMsg( num:Int, time:Float = -1.0 )
	{
		if ( _msg != null ) _msg.remove();
		if ( _tile != null ) _tile.dispose();
		
		if ( num == 1 )
			_tile = hxd.Res.p01move.toTile();
		else if ( num == 2 )
			_tile = hxd.Res.p02jump.toTile();
		else if ( num == 3 )
			_tile = hxd.Res.p03add.toTile();
		else if ( num == 4 )
			_tile = hxd.Res.p04enjoy.toTile();
		else
			return;
		
		//_tile.getTexture().mipMap = MipMap.Linear;
		//_tile.getTexture().realloc();
		
		_tile = _tile.center();
		_msg = new h2d.Bitmap(_tile, s2d);
		// move its position
		_msg.x = 1280 * 0.5;
		_msg.y = 720 * 0.7;
		
		if ( time > 0 )
		{
			TweenX.to( 	this, {} )
						.time( 2 )
						.onFinish( function():Void { addMsg(-1); } );
		}
	}

	/*function mainLoop() {
		hxd.Timer.update();
		s2d.checkEvents();
		update(hxd.Timer.tmod);
		s2d.setElapsedTime(Timer.tmod/60);
		s3d.setElapsedTime(Timer.tmod / 60);
		#if debug
		if( hxd.Key.isDown(hxd.Key.CTRL) && hxd.Key.isPressed(hxd.Key.F12) ) {
			var driver = engine.driver;
			var old = driver.logEnable;
			var log = new h3d.impl.LogDriver(driver);
			log.logLines = [];
			@:privateAccess engine.driver = log;
			try {
				engine.render(s3d);
			} catch( e : Dynamic ) {
				log.logLines.push(Std.string(e));
			}
			driver.logEnable = old;
			@:privateAccess engine.driver = driver;
			hxd.File.saveBytes("log.txt", haxe.io.Bytes.ofString(log.logLines.join("\n")));
		} else
		#end
			engine.render(s3d);
	}*/

	/*function update( dt : Float ) {
	}*/
}