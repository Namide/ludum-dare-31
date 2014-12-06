package ld31.gameplay;
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
	
	public var form:Array<Array<Int>>;
	
	public function new( id:Int = -1, color:Int = -1, dir:Dir = null ) 
	{
		this.id = (id < 0) ? Math.ceil(Math.random() * POLYOMINOS.length ) : id;
		this.color = (color < 0) ? Math.ceil(Math.random() * 3) : color;
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