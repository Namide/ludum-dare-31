package ld31.graphic;
import h2d.Bitmap;
import h2d.Font;
import h2d.Text;
import h2d.Tile;
import h3d.col.Bounds;
import h3d.col.Point;
import h3d.Engine;
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
		this.engine = new h3d.Engine();
		engine.onReady = setup;		
		engine.init();
	}

	public function dispose()
	{
		engine.onReady = null;
		engine.onResized = null;
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
	}
	
	var _font:h2d.Font;
	var _score:h2d.Text;
	public function changeScore( tm:Tilemap = null )
	{
		if ( _font == null )
		{
			_font = hxd.Res.MontserratBold.toFont();
			
			var title = new h2d.Text(_font, s2d);
			title.textColor = 0xFFFFFF;
			title.text = "POLYFILL";
			title.setPos( 32, 32 );
			
			var fontRegular = hxd.Res.MontserratRegular.toFont();
			var author = new h2d.Text(fontRegular, s2d);
			author.textColor = 0xff0099;
			author.textAlign = Align.Right;
			author.text = "a game by Namide\n(Damien Doussaud)\nwww.namide.com";
			author.setPos( 1024 - (author.textWidth + 32), 720 - (author.textHeight + 32) );
			
		}
		else if ( _score == null )
		{
			_score = new h2d.Text(_font, s2d);
			_score.textColor = 0xFFFFFF;
			_score.textAlign = Align.Right;
			_score.maxWidth = 256;
			_score.setPos( 1024 - (_score.maxWidth+32) , 32 );
		}

		if ( _score != null && tm != null )
		{
			var s = Std.string(tm.score) + "pts\n";
			var prc = Math.floor(100 * (tm.squareIn + tm.squareOut) / tm.squareMax);
			s += prc + "%";
			_score.text = Std.string(s);
		}
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
		s2d.setFixedSize(1024, 720);
		
		s3d.addPass(s2d);
		
		engine.backgroundColor = 0x000000;
		
		var p = Tilemap.getNeutralPos();
		s3d.camera.zoom = 4;
		s3d.camera.up.set( 0., -1., 0. );
		s3d.camera.pos.set( p.x, p.y, 0.5 * (Tilemap.SIDE_NUM_X + Tilemap.SIDE_NUM_Y) * s3d.camera.zoom );
		s3d.camera.target.set( p.x, p.y );
		
		var bg = new TimerObject( s3d );
		bg.scaleX = Tilemap.SIDE_NUM_X;
		bg.scaleY = Tilemap.SIDE_NUM_Y;
		bg.setPos( Tilemap.getNeutralX(), Tilemap.getNeutralY(), -0.01 );
		
		
		map = new MapObject( s3d );
		_onInit();
	}
	
	public inline function refresh()
	{
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
		else if ( num == 5 )
			_tile = hxd.Res.p05end1.toTile();
		else if ( num == 6 )
			_tile = hxd.Res.p06end2.toTile();
		else
			return;
		
		_tile = _tile.center();
		_msg = new h2d.Bitmap(_tile, s2d);
		_msg.x = 1024 * 0.5;
		_msg.y = 720 * 0.7;
		
		if ( time > 0 )
		{
			TweenX.to( 	this, {} )
						.time( 2 )
						.onFinish( function():Void { addMsg(-1); } );
		}
	}
}