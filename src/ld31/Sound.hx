package ld31;

/**
 * ...
 * @author Namide
 */
class Sound
{

	var _mutted:Bool;
	
	//var _music:hxd.res.Sound;
	
	var _numSample:Int;
	var _samples:Array<hxd.res.Sound>;
	
	public function new() 
	{
		/*_music = hxd.Res.music002;
		_music.loop = true;
		_music.play();*/
		
		_mutted = false;
		
		_samples = [];
		_samples.push( hxd.Res.sound001 );
		_samples.push( hxd.Res.sound002 );
		_samples.push( hxd.Res.sound003 );
		_samples.push( hxd.Res.sound004 );
		_samples.push( hxd.Res.sound005 );
		_samples.push( hxd.Res.sound006 );
		_samples.push( hxd.Res.sound007 );
		_samples.push( hxd.Res.sound008 );
		_samples.push( hxd.Res.sound009 );
		_samples.push( hxd.Res.sound010 );
		_samples.push( hxd.Res.sound011 );
		_samples.push( hxd.Res.sound012 );
		_numSample = 0;
	}
	
	public function playStopAll()
	{
		_mutted != _mutted;
		/*if ( _mutted )
			_music.stop();
		else
			_music.play();*/
	}
	
	public function playSound()
	{
		_numSample = (_numSample+1) % _samples.length;
		if ( !_mutted )
			_samples[_numSample].play();
	}
	
}