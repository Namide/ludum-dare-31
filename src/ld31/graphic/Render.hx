package ld31.graphic;
import h3d.col.Bounds;
import h3d.col.Point;
import ld31.gameplay.Tilemap;

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
	
	public function new(callb:Void->Void)
	{
		_onInit = callb;
		this.engine = engine = new h3d.Engine();
		engine.onReady = setup;
		engine.init();
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
		s3d.addPass(s2d);
		
		
		engine.backgroundColor = 0xFFFFFFFF;
		
		var p = Tilemap.getNeutralPos();
		s3d.camera.zoom = 4;
		s3d.camera.up.set( 0., -1., 0. );
		s3d.camera.pos.set( p.x, p.y, Tilemap.SIDE_NUM * s3d.camera.zoom );
		s3d.camera.target.set( p.x, p.y );
		
		//s3d.camera.fovY = 150;
		
		
		//( 0, 0, -Math.PI * 0.5 );
		//s3d.camera.orthoBounds
		//s3d.camera.rightHanded = true;
		
		
		
		_onInit();
		/*hxd.Timer.skip();
		mainLoop();
		hxd.System.setLoop(mainLoop);*/
		hxd.Key.initialize();
	}
	
	public inline function refresh()
	{
		
		//s2d.checkEvents();
		engine.render(s3d);
		
		
		
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