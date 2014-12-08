package ld31.graphic;

import hxsl.Shader;

/**
 * ...
 * @author Namide
 */
class GhostShader extends Shader
{
	
	static var SRC = {

		@global var global : {
			var time : Float;
		};

		var output : {
			var color : Vec4;
		};

		var pixelColor : Vec4;
		var white : Vec4;

		@param var color : Vec4;

		function __init__() {
			pixelColor = color;
			white = vec4(1.0, 1.0, 1.0, 1.0);
		}

		function fragment() {
			
			var min = 0.35;
			var max = 0.65;
			
			var f = sin(global.time * 7) * 0.5 + 0.5;
			f = f * (max - min) + min;
			
			output.color = pixelColor * f + white * (1-f);
		}

	};

	public function new() {
		super();
	}

}
