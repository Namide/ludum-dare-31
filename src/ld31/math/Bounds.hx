package ld31.math;

/**
 * ...
 * @author Namide
 */
class Bounds
{

	public var xMin:Int;
	public var yMin:Int;
	public var xMax:Int;
	public var yMax:Int;
	
	public function new() 
	{
		
	}
	
	public function toString():String
	{
		return "[ x:" + xMin + "/" + xMax + ", y:" + yMin + "/" + yMax +  "]";
	}
}