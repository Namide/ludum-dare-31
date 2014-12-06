package ld31.gameplay;
import h2d.col.Point;
import ld31.math.Dir;

/**
 * ...
 * @author Namide
 */
class PolyominoControl
{

	static var POLYOMINOS:Array<Array<Array<Int>>> = 
		[
			[
				[1]
			]
			,
			
			[
				[1,1]
			],
			
			[
				[1],
				[1]
			],
			
			[
				[1,1],
				[1,0]
			],
			
			[
				[1,1],
				[0,1]
			],
			
			[
				[0,1],
				[1,1]
			],
			
			[
				[1,1,1]
			],
			
			[
				[1],
				[1],
				[1]
			]
			
		];
	
	public var id:Int;
	public var color:Int;
	public var center:h2d.col.Point;
	
	public var form:Array<Array<Int>>;
	
	public function new( id:Int = -1, color:Int = -1, dir:Dir = null ) 
	{
		this.id = (id < 0) ? Math.floor(Math.random() * POLYOMINOS.length ) : id;
		
		if ( color < 0 )
		{
			var col = Math.floor(Math.random() * 3);
			if ( col == 0 ) 		this.color = Tilemap.TYPE_R;
			else if ( col == 1 )	this.color = Tilemap.TYPE_G;
			else 					this.color = Tilemap.TYPE_B;
		}
		else
		{
			this.color = color;
		}
		
		if ( dir == null ) dir = new Dir();
		updateForm(dir);
	}
	
	public function updateForm( dir:Dir )
	{
		var original = POLYOMINOS[id];
		
		var newYL = ( dir.is(Dir.DIR_UP) 	|| dir.is(Dir.DIR_DOWN) ) ? original.length : original[0].length;
		var newXL = ( dir.is(Dir.DIR_UP) || dir.is(Dir.DIR_DOWN) ) ? original[0].length : original.length;
		
		var oldXL = original[0].length - 1;
		var oldYL = original.length - 1;
		
		form = [];
		for ( j in 0...newYL)
		{
			form[j] = [];
			for ( i in 0...newXL )
			{
				if 		( dir.is(Dir.DIR_UP) ) 		form[j][i] = original[j][i];
				else if ( dir.is(Dir.DIR_RIGHT) )	form[j][i] = original[oldYL-i][j];
				else if ( dir.is(Dir.DIR_DOWN) )	form[j][i] = original[oldYL-j][oldXL-i];
				else if ( dir.is(Dir.DIR_LEFT) )	form[j][i] = original[oldYL-i][j];
			}
		}
		
		center = new h2d.col.Point( newXL*0.5, newYL*0.5 );
	}
	
	public function toString():String
	{
		var s = "{polyomino:\n";
		for ( j in 0...form.length )
		{
			for ( i in 0...form[j].length )
			{
				s += (form[j][i] > 0) ? "#" : " ";
			}
			s += "\n";
		}
		s += "}";
		return s;
	}
	
}