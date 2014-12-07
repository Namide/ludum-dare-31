(function () { "use strict";
var $hxClasses = {},$estr = function() { return js.Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw "Invalid date format : " + s;
	}
};
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
$hxClasses["Lambda"] = Lambda;
Lambda.__name__ = ["Lambda"];
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = $iterator(it)();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = $iterator(it)();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
};
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
};
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,push: function(item) {
		var x = [item,this.h];
		this.h = x;
		if(this.q == null) this.q = x;
		this.length++;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l[0] == v) {
				if(prev == null) this.h = l[1]; else prev[1] = l[1];
				if(this.q == l) this.q = prev;
				this.length--;
				return true;
			}
			prev = l;
			l = l[1];
		}
		return false;
	}
	,iterator: function() {
		return { h : this.h, hasNext : function() {
			return this.h != null;
		}, next : function() {
			if(this.h == null) return null;
			var x = this.h[0];
			this.h = this.h[1];
			return x;
		}};
	}
	,__class__: List
};
var IMap = function() { };
$hxClasses["IMap"] = IMap;
IMap.__name__ = ["IMap"];
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + field])) return o[tmp](); else return o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
Reflect.isEnumValue = function(v) {
	return v != null && v.__enum__ != null;
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	return c > 8 && c < 14 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return HxOverrides.substr(s,r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return HxOverrides.substr(s,0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2;
		var _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e1 ) {
		return false;
	}
	return true;
};
Type.allEnums = function(e) {
	return e.__empty_constructs__;
};
var format = {};
format.png = {};
format.png.Color = $hxClasses["format.png.Color"] = { __ename__ : true, __constructs__ : ["ColGrey","ColTrue","ColIndexed"] };
format.png.Color.ColGrey = function(alpha) { var $x = ["ColGrey",0,alpha]; $x.__enum__ = format.png.Color; $x.toString = $estr; return $x; };
format.png.Color.ColTrue = function(alpha) { var $x = ["ColTrue",1,alpha]; $x.__enum__ = format.png.Color; $x.toString = $estr; return $x; };
format.png.Color.ColIndexed = ["ColIndexed",2];
format.png.Color.ColIndexed.toString = $estr;
format.png.Color.ColIndexed.__enum__ = format.png.Color;
format.png.Color.__empty_constructs__ = [format.png.Color.ColIndexed];
format.png.Chunk = $hxClasses["format.png.Chunk"] = { __ename__ : true, __constructs__ : ["CEnd","CHeader","CData","CPalette","CUnknown"] };
format.png.Chunk.CEnd = ["CEnd",0];
format.png.Chunk.CEnd.toString = $estr;
format.png.Chunk.CEnd.__enum__ = format.png.Chunk;
format.png.Chunk.CHeader = function(h) { var $x = ["CHeader",1,h]; $x.__enum__ = format.png.Chunk; $x.toString = $estr; return $x; };
format.png.Chunk.CData = function(b) { var $x = ["CData",2,b]; $x.__enum__ = format.png.Chunk; $x.toString = $estr; return $x; };
format.png.Chunk.CPalette = function(b) { var $x = ["CPalette",3,b]; $x.__enum__ = format.png.Chunk; $x.toString = $estr; return $x; };
format.png.Chunk.CUnknown = function(id,data) { var $x = ["CUnknown",4,id,data]; $x.__enum__ = format.png.Chunk; $x.toString = $estr; return $x; };
format.png.Chunk.__empty_constructs__ = [format.png.Chunk.CEnd];
format.png.Reader = function(i) {
	this.i = i;
	i.set_bigEndian(true);
	this.checkCRC = true;
};
$hxClasses["format.png.Reader"] = format.png.Reader;
format.png.Reader.__name__ = ["format","png","Reader"];
format.png.Reader.prototype = {
	read: function() {
		var _g = 0;
		var _g1 = [137,80,78,71,13,10,26,10];
		while(_g < _g1.length) {
			var b = _g1[_g];
			++_g;
			if(this.i.readByte() != b) throw "Invalid header";
		}
		var l = new List();
		while(true) {
			var c = this.readChunk();
			l.add(c);
			if(c == format.png.Chunk.CEnd) break;
		}
		return l;
	}
	,readHeader: function(i) {
		i.set_bigEndian(true);
		var width = i.readInt32();
		var height = i.readInt32();
		var colbits = i.readByte();
		var color = i.readByte();
		var color1;
		switch(color) {
		case 0:
			color1 = format.png.Color.ColGrey(false);
			break;
		case 2:
			color1 = format.png.Color.ColTrue(false);
			break;
		case 3:
			color1 = format.png.Color.ColIndexed;
			break;
		case 4:
			color1 = format.png.Color.ColGrey(true);
			break;
		case 6:
			color1 = format.png.Color.ColTrue(true);
			break;
		default:
			throw "Unknown color model " + color + ":" + colbits;
		}
		var compress = i.readByte();
		var filter = i.readByte();
		if(compress != 0 || filter != 0) throw "Invalid header";
		var interlace = i.readByte();
		if(interlace != 0 && interlace != 1) throw "Invalid header";
		return { width : width, height : height, colbits : colbits, color : color1, interlaced : interlace == 1};
	}
	,readChunk: function() {
		var dataLen = this.i.readInt32();
		var id = this.i.readString(4);
		var data = this.i.read(dataLen);
		var crc = this.i.readInt32();
		if(this.checkCRC) {
			var c = new haxe.crypto.Crc32();
			var _g = 0;
			while(_g < 4) {
				var i = _g++;
				c["byte"](HxOverrides.cca(id,i));
			}
			c.update(data,0,data.length);
			if(c.get() != crc) throw "CRC check failure";
		}
		switch(id) {
		case "IEND":
			return format.png.Chunk.CEnd;
		case "IHDR":
			return format.png.Chunk.CHeader(this.readHeader(new haxe.io.BytesInput(data)));
		case "IDAT":
			return format.png.Chunk.CData(data);
		case "PLTE":
			return format.png.Chunk.CPalette(data);
		default:
			return format.png.Chunk.CUnknown(id,data);
		}
	}
	,__class__: format.png.Reader
};
format.png.Tools = function() { };
$hxClasses["format.png.Tools"] = format.png.Tools;
format.png.Tools.__name__ = ["format","png","Tools"];
format.png.Tools.getHeader = function(d) {
	var $it0 = d.iterator();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		switch(c[1]) {
		case 1:
			var h = c[2];
			return h;
		default:
		}
	}
	throw "Header not found";
};
format.png.Tools.getPalette = function(d) {
	var $it0 = d.iterator();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		switch(c[1]) {
		case 3:
			var b = c[2];
			return b;
		default:
		}
	}
	return null;
};
format.png.Tools.filter = function(data,x,y,stride,prev,p,numChannels) {
	if(numChannels == null) numChannels = 4;
	var b;
	if(y == 0) b = 0; else b = data.b[p - stride];
	var c;
	if(x == 0 || y == 0) c = 0; else c = data.b[p - stride - numChannels];
	var k = prev + b - c;
	var pa = k - prev;
	if(pa < 0) pa = -pa;
	var pb = k - b;
	if(pb < 0) pb = -pb;
	var pc = k - c;
	if(pc < 0) pc = -pc;
	if(pa <= pb && pa <= pc) return prev; else if(pb <= pc) return b; else return c;
};
format.png.Tools.extract32 = function(d,bytes) {
	var h = format.png.Tools.getHeader(d);
	var bgra;
	if(bytes == null) bgra = haxe.io.Bytes.alloc(h.width * h.height * 4); else bgra = bytes;
	var data = null;
	var fullData = null;
	var $it0 = d.iterator();
	while( $it0.hasNext() ) {
		var c = $it0.next();
		switch(c[1]) {
		case 2:
			var b = c[2];
			if(fullData != null) fullData.add(b); else if(data == null) data = b; else {
				fullData = new haxe.io.BytesBuffer();
				fullData.add(data);
				fullData.add(b);
				data = null;
			}
			break;
		default:
		}
	}
	if(fullData != null) data = fullData.getBytes();
	if(data == null) throw "Data not found";
	data = format.tools.Inflate.run(data);
	var r = 0;
	var w = 0;
	{
		var _g = h.color;
		switch(_g[1]) {
		case 2:
			var pal = format.png.Tools.getPalette(d);
			if(pal == null) throw "PNG Palette is missing";
			var alpha = null;
			try {
				var $it1 = d.iterator();
				while( $it1.hasNext() ) {
					var t = $it1.next();
					switch(t[1]) {
					case 4:
						switch(t[2]) {
						case "tRNS":
							var data1 = t[3];
							alpha = data1;
							throw "__break__";
							break;
						default:
						}
						break;
					default:
					}
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
			if(alpha != null && alpha.length < 1 << h.colbits) {
				var alpha2 = haxe.io.Bytes.alloc(1 << h.colbits);
				alpha2.blit(0,alpha,0,alpha.length);
				alpha2.fill(alpha.length,alpha2.length - alpha.length,255);
				alpha = alpha2;
			}
			var width = h.width;
			var stride = Math.ceil(width * h.colbits / 8) + 1;
			if(data.length < h.height * stride) throw "Not enough data";
			var vr;
			var vg;
			var vb;
			var va = 255;
			if(h.colbits == 8) {
				var _g2 = 0;
				var _g1 = h.height;
				while(_g2 < _g1) {
					var y = _g2++;
					var f = data.get(r++);
					switch(f) {
					case 0:
						var _g11 = 0;
						while(_g11 < width) {
							var x = _g11++;
							var c1 = data.get(r++);
							vr = pal.b[c1 * 3];
							vg = pal.b[c1 * 3 + 1];
							vb = pal.b[c1 * 3 + 2];
							if(alpha != null) va = alpha.b[c1];
							bgra.set(w++,vb);
							bgra.set(w++,vg);
							bgra.set(w++,vr);
							bgra.set(w++,va);
						}
						break;
					case 1:
						var cr = 0;
						var cg = 0;
						var cb = 0;
						var ca = 0;
						var _g12 = 0;
						while(_g12 < width) {
							var x1 = _g12++;
							var c2 = data.get(r++);
							vr = pal.b[c2 * 3];
							vg = pal.b[c2 * 3 + 1];
							vb = pal.b[c2 * 3 + 2];
							if(alpha != null) va = alpha.b[c2];
							cb += vb;
							bgra.set(w++,cb);
							cg += vg;
							bgra.set(w++,cg);
							cr += vr;
							bgra.set(w++,cr);
							ca += va;
							bgra.set(w++,ca);
							bgra.set(w++,va);
						}
						break;
					case 2:
						var stride1;
						if(y == 0) stride1 = 0; else stride1 = width * 4;
						var _g13 = 0;
						while(_g13 < width) {
							var x2 = _g13++;
							var c3 = data.get(r++);
							vr = pal.b[c3 * 3];
							vg = pal.b[c3 * 3 + 1];
							vb = pal.b[c3 * 3 + 2];
							if(alpha != null) va = alpha.b[c3];
							bgra.b[w] = vb + bgra.b[w - stride1] & 255;
							w++;
							bgra.b[w] = vg + bgra.b[w - stride1] & 255;
							w++;
							bgra.b[w] = vr + bgra.b[w - stride1] & 255;
							w++;
							bgra.b[w] = va + bgra.b[w - stride1] & 255;
							w++;
						}
						break;
					case 3:
						var cr1 = 0;
						var cg1 = 0;
						var cb1 = 0;
						var ca1 = 0;
						var stride2;
						if(y == 0) stride2 = 0; else stride2 = width * 4;
						var _g14 = 0;
						while(_g14 < width) {
							var x3 = _g14++;
							var c4 = data.get(r++);
							vr = pal.b[c4 * 3];
							vg = pal.b[c4 * 3 + 1];
							vb = pal.b[c4 * 3 + 2];
							if(alpha != null) va = alpha.b[c4];
							cb1 = vb + (cb1 + bgra.b[w - stride2] >> 1) & 255;
							bgra.set(w++,cb1);
							cg1 = vg + (cg1 + bgra.b[w - stride2] >> 1) & 255;
							bgra.set(w++,cg1);
							cr1 = vr + (cr1 + bgra.b[w - stride2] >> 1) & 255;
							bgra.set(w++,cr1);
							cr1 = va + (ca1 + bgra.b[w - stride2] >> 1) & 255;
							bgra.set(w++,ca1);
						}
						break;
					case 4:
						var stride3 = width * 4;
						var cr2 = 0;
						var cg2 = 0;
						var cb2 = 0;
						var ca2 = 0;
						var _g15 = 0;
						while(_g15 < width) {
							var x4 = _g15++;
							var c5 = data.get(r++);
							vr = pal.b[c5 * 3];
							vg = pal.b[c5 * 3 + 1];
							vb = pal.b[c5 * 3 + 2];
							if(alpha != null) va = alpha.b[c5];
							cb2 = format.png.Tools.filter(bgra,x4,y,stride3,cb2,w,null) + vb & 255;
							bgra.set(w++,cb2);
							cg2 = format.png.Tools.filter(bgra,x4,y,stride3,cg2,w,null) + vg & 255;
							bgra.set(w++,cg2);
							cr2 = format.png.Tools.filter(bgra,x4,y,stride3,cr2,w,null) + vr & 255;
							bgra.set(w++,cr2);
							ca2 = format.png.Tools.filter(bgra,x4,y,stride3,ca2,w,null) + va & 255;
							bgra.set(w++,ca2);
						}
						break;
					default:
						throw "Invalid filter " + f;
					}
				}
			} else if(h.colbits < 8) {
				var req = h.colbits;
				var mask = (1 << req) - 1;
				var _g21 = 0;
				var _g16 = h.height;
				while(_g21 < _g16) {
					var y1 = _g21++;
					var f1 = data.get(r++);
					var bits = 0;
					var nbits = 0;
					var v;
					switch(f1) {
					case 0:
						var _g17 = 0;
						while(_g17 < width) {
							var x5 = _g17++;
							var c6;
							if(nbits < req) {
								bits = bits << 8 | data.get(r++);
								nbits += 8;
							}
							v = bits >>> nbits - req & mask;
							nbits -= req;
							c6 = v;
							vr = pal.b[c6 * 3];
							vg = pal.b[c6 * 3 + 1];
							vb = pal.b[c6 * 3 + 2];
							if(alpha != null) va = alpha.b[c6];
							bgra.set(w++,vb);
							bgra.set(w++,vg);
							bgra.set(w++,vr);
							bgra.set(w++,va);
						}
						break;
					case 1:
						var cr3 = 0;
						var cg3 = 0;
						var cb3 = 0;
						var ca3 = 0;
						var _g18 = 0;
						while(_g18 < width) {
							var x6 = _g18++;
							var c7;
							if(nbits < req) {
								bits = bits << 8 | data.get(r++);
								nbits += 8;
							}
							v = bits >>> nbits - req & mask;
							nbits -= req;
							c7 = v;
							vr = pal.b[c7 * 3];
							vg = pal.b[c7 * 3 + 1];
							vb = pal.b[c7 * 3 + 2];
							if(alpha != null) va = alpha.b[c7];
							cb3 += vb;
							bgra.set(w++,cb3);
							cg3 += vg;
							bgra.set(w++,cg3);
							cr3 += vr;
							bgra.set(w++,cr3);
							ca3 += va;
							bgra.set(w++,ca3);
							bgra.set(w++,va);
						}
						break;
					case 2:
						var stride4;
						if(y1 == 0) stride4 = 0; else stride4 = width * 4;
						var _g19 = 0;
						while(_g19 < width) {
							var x7 = _g19++;
							var c8;
							if(nbits < req) {
								bits = bits << 8 | data.get(r++);
								nbits += 8;
							}
							v = bits >>> nbits - req & mask;
							nbits -= req;
							c8 = v;
							vr = pal.b[c8 * 3];
							vg = pal.b[c8 * 3 + 1];
							vb = pal.b[c8 * 3 + 2];
							if(alpha != null) va = alpha.b[c8];
							bgra.b[w] = vb + bgra.b[w - stride4] & 255;
							w++;
							bgra.b[w] = vg + bgra.b[w - stride4] & 255;
							w++;
							bgra.b[w] = vr + bgra.b[w - stride4] & 255;
							w++;
							bgra.b[w] = va + bgra.b[w - stride4] & 255;
							w++;
						}
						break;
					case 3:
						var cr4 = 0;
						var cg4 = 0;
						var cb4 = 0;
						var ca4 = 0;
						var stride5;
						if(y1 == 0) stride5 = 0; else stride5 = width * 4;
						var _g110 = 0;
						while(_g110 < width) {
							var x8 = _g110++;
							var c9;
							if(nbits < req) {
								bits = bits << 8 | data.get(r++);
								nbits += 8;
							}
							v = bits >>> nbits - req & mask;
							nbits -= req;
							c9 = v;
							vr = pal.b[c9 * 3];
							vg = pal.b[c9 * 3 + 1];
							vb = pal.b[c9 * 3 + 2];
							if(alpha != null) va = alpha.b[c9];
							cb4 = vb + (cb4 + bgra.b[w - stride5] >> 1) & 255;
							bgra.set(w++,cb4);
							cg4 = vg + (cg4 + bgra.b[w - stride5] >> 1) & 255;
							bgra.set(w++,cg4);
							cr4 = vr + (cr4 + bgra.b[w - stride5] >> 1) & 255;
							bgra.set(w++,cr4);
							cr4 = va + (ca4 + bgra.b[w - stride5] >> 1) & 255;
							bgra.set(w++,ca4);
						}
						break;
					case 4:
						var stride6 = width * 4;
						var cr5 = 0;
						var cg5 = 0;
						var cb5 = 0;
						var ca5 = 0;
						var _g111 = 0;
						while(_g111 < width) {
							var x9 = _g111++;
							var c10;
							if(nbits < req) {
								bits = bits << 8 | data.get(r++);
								nbits += 8;
							}
							v = bits >>> nbits - req & mask;
							nbits -= req;
							c10 = v;
							vr = pal.b[c10 * 3];
							vg = pal.b[c10 * 3 + 1];
							vb = pal.b[c10 * 3 + 2];
							if(alpha != null) va = alpha.b[c10];
							cb5 = format.png.Tools.filter(bgra,x9,y1,stride6,cb5,w,null) + vb & 255;
							bgra.set(w++,cb5);
							cg5 = format.png.Tools.filter(bgra,x9,y1,stride6,cg5,w,null) + vg & 255;
							bgra.set(w++,cg5);
							cr5 = format.png.Tools.filter(bgra,x9,y1,stride6,cr5,w,null) + vr & 255;
							bgra.set(w++,cr5);
							ca5 = format.png.Tools.filter(bgra,x9,y1,stride6,ca5,w,null) + va & 255;
							bgra.set(w++,ca5);
						}
						break;
					default:
						throw "Invalid filter " + f1;
					}
				}
			} else throw h.colbits + " indexed bits per pixel not supported";
			break;
		case 0:
			var alpha1 = _g[2];
			if(h.colbits != 8) throw "Unsupported color mode";
			var width1 = h.width;
			var stride7;
			stride7 = (alpha1?2:1) * width1 + 1;
			if(data.length < h.height * stride7) throw "Not enough data";
			var _g22 = 0;
			var _g112 = h.height;
			while(_g22 < _g112) {
				var y2 = _g22++;
				var f2 = data.get(r++);
				switch(f2) {
				case 0:
					if(alpha1) {
						var _g3 = 0;
						while(_g3 < width1) {
							var x10 = _g3++;
							var v1 = data.get(r++);
							bgra.set(w++,v1);
							bgra.set(w++,v1);
							bgra.set(w++,v1);
							bgra.set(w++,data.get(r++));
						}
					} else {
						var _g31 = 0;
						while(_g31 < width1) {
							var x11 = _g31++;
							var v2 = data.get(r++);
							bgra.set(w++,v2);
							bgra.set(w++,v2);
							bgra.set(w++,v2);
							bgra.set(w++,255);
						}
					}
					break;
				case 1:
					var cv = 0;
					var ca6 = 0;
					if(alpha1) {
						var _g32 = 0;
						while(_g32 < width1) {
							var x12 = _g32++;
							cv += data.get(r++);
							bgra.set(w++,cv);
							bgra.set(w++,cv);
							bgra.set(w++,cv);
							ca6 += data.get(r++);
							bgra.set(w++,ca6);
						}
					} else {
						var _g33 = 0;
						while(_g33 < width1) {
							var x13 = _g33++;
							cv += data.get(r++);
							bgra.set(w++,cv);
							bgra.set(w++,cv);
							bgra.set(w++,cv);
							bgra.set(w++,255);
						}
					}
					break;
				case 2:
					var stride8;
					if(y2 == 0) stride8 = 0; else stride8 = width1 * 4;
					if(alpha1) {
						var _g34 = 0;
						while(_g34 < width1) {
							var x14 = _g34++;
							var v3 = data.get(r++) + bgra.b[w - stride8];
							bgra.set(w++,v3);
							bgra.set(w++,v3);
							bgra.set(w++,v3);
							bgra.set(w++,data.get(r++) + bgra.b[w - stride8]);
						}
					} else {
						var _g35 = 0;
						while(_g35 < width1) {
							var x15 = _g35++;
							var v4 = data.get(r++) + bgra.b[w - stride8];
							bgra.set(w++,v4);
							bgra.set(w++,v4);
							bgra.set(w++,v4);
							bgra.set(w++,255);
						}
					}
					break;
				case 3:
					var cv1 = 0;
					var ca7 = 0;
					var stride9;
					if(y2 == 0) stride9 = 0; else stride9 = width1 * 4;
					if(alpha1) {
						var _g36 = 0;
						while(_g36 < width1) {
							var x16 = _g36++;
							cv1 = data.get(r++) + (cv1 + bgra.b[w - stride9] >> 1) & 255;
							bgra.set(w++,cv1);
							bgra.set(w++,cv1);
							bgra.set(w++,cv1);
							ca7 = data.get(r++) + (ca7 + bgra.b[w - stride9] >> 1) & 255;
							bgra.set(w++,ca7);
						}
					} else {
						var _g37 = 0;
						while(_g37 < width1) {
							var x17 = _g37++;
							cv1 = data.get(r++) + (cv1 + bgra.b[w - stride9] >> 1) & 255;
							bgra.set(w++,cv1);
							bgra.set(w++,cv1);
							bgra.set(w++,cv1);
							bgra.set(w++,255);
						}
					}
					break;
				case 4:
					var stride10 = width1 * 4;
					var cv2 = 0;
					var ca8 = 0;
					if(alpha1) {
						var _g38 = 0;
						while(_g38 < width1) {
							var x18 = _g38++;
							cv2 = format.png.Tools.filter(bgra,x18,y2,stride10,cv2,w,null) + data.get(r++) & 255;
							bgra.set(w++,cv2);
							bgra.set(w++,cv2);
							bgra.set(w++,cv2);
							ca8 = format.png.Tools.filter(bgra,x18,y2,stride10,ca8,w,null) + data.get(r++) & 255;
							bgra.set(w++,ca8);
						}
					} else {
						var _g39 = 0;
						while(_g39 < width1) {
							var x19 = _g39++;
							cv2 = format.png.Tools.filter(bgra,x19,y2,stride10,cv2,w,null) + data.get(r++) & 255;
							bgra.set(w++,cv2);
							bgra.set(w++,cv2);
							bgra.set(w++,cv2);
							bgra.set(w++,255);
						}
					}
					break;
				default:
					throw "Invalid filter " + f2;
				}
			}
			break;
		case 1:
			var alpha3 = _g[2];
			if(h.colbits != 8) throw "Unsupported color mode";
			var width2 = h.width;
			var stride11;
			stride11 = (alpha3?4:3) * width2 + 1;
			if(data.length < h.height * stride11) throw "Not enough data";
			var _g23 = 0;
			var _g113 = h.height;
			while(_g23 < _g113) {
				var y3 = _g23++;
				var f3 = data.get(r++);
				switch(f3) {
				case 0:
					if(alpha3) {
						var _g310 = 0;
						while(_g310 < width2) {
							var x20 = _g310++;
							bgra.set(w++,data.b[r + 2]);
							bgra.set(w++,data.b[r + 1]);
							bgra.set(w++,data.b[r]);
							bgra.set(w++,data.b[r + 3]);
							r += 4;
						}
					} else {
						var _g311 = 0;
						while(_g311 < width2) {
							var x21 = _g311++;
							bgra.set(w++,data.b[r + 2]);
							bgra.set(w++,data.b[r + 1]);
							bgra.set(w++,data.b[r]);
							bgra.set(w++,255);
							r += 3;
						}
					}
					break;
				case 1:
					var cr6 = 0;
					var cg6 = 0;
					var cb6 = 0;
					var ca9 = 0;
					if(alpha3) {
						var _g312 = 0;
						while(_g312 < width2) {
							var x22 = _g312++;
							cb6 += data.b[r + 2];
							bgra.set(w++,cb6);
							cg6 += data.b[r + 1];
							bgra.set(w++,cg6);
							cr6 += data.b[r];
							bgra.set(w++,cr6);
							ca9 += data.b[r + 3];
							bgra.set(w++,ca9);
							r += 4;
						}
					} else {
						var _g313 = 0;
						while(_g313 < width2) {
							var x23 = _g313++;
							cb6 += data.b[r + 2];
							bgra.set(w++,cb6);
							cg6 += data.b[r + 1];
							bgra.set(w++,cg6);
							cr6 += data.b[r];
							bgra.set(w++,cr6);
							bgra.set(w++,255);
							r += 3;
						}
					}
					break;
				case 2:
					var stride12;
					if(y3 == 0) stride12 = 0; else stride12 = width2 * 4;
					if(alpha3) {
						var _g314 = 0;
						while(_g314 < width2) {
							var x24 = _g314++;
							bgra.b[w] = data.b[r + 2] + bgra.b[w - stride12] & 255;
							w++;
							bgra.b[w] = data.b[r + 1] + bgra.b[w - stride12] & 255;
							w++;
							bgra.b[w] = data.b[r] + bgra.b[w - stride12] & 255;
							w++;
							bgra.b[w] = data.b[r + 3] + bgra.b[w - stride12] & 255;
							w++;
							r += 4;
						}
					} else {
						var _g315 = 0;
						while(_g315 < width2) {
							var x25 = _g315++;
							bgra.b[w] = data.b[r + 2] + bgra.b[w - stride12] & 255;
							w++;
							bgra.b[w] = data.b[r + 1] + bgra.b[w - stride12] & 255;
							w++;
							bgra.b[w] = data.b[r] + bgra.b[w - stride12] & 255;
							w++;
							bgra.set(w++,255);
							r += 3;
						}
					}
					break;
				case 3:
					var cr7 = 0;
					var cg7 = 0;
					var cb7 = 0;
					var ca10 = 0;
					var stride13;
					if(y3 == 0) stride13 = 0; else stride13 = width2 * 4;
					if(alpha3) {
						var _g316 = 0;
						while(_g316 < width2) {
							var x26 = _g316++;
							cb7 = data.b[r + 2] + (cb7 + bgra.b[w - stride13] >> 1) & 255;
							bgra.set(w++,cb7);
							cg7 = data.b[r + 1] + (cg7 + bgra.b[w - stride13] >> 1) & 255;
							bgra.set(w++,cg7);
							cr7 = data.b[r] + (cr7 + bgra.b[w - stride13] >> 1) & 255;
							bgra.set(w++,cr7);
							ca10 = data.b[r + 3] + (ca10 + bgra.b[w - stride13] >> 1) & 255;
							bgra.set(w++,ca10);
							r += 4;
						}
					} else {
						var _g317 = 0;
						while(_g317 < width2) {
							var x27 = _g317++;
							cb7 = data.b[r + 2] + (cb7 + bgra.b[w - stride13] >> 1) & 255;
							bgra.set(w++,cb7);
							cg7 = data.b[r + 1] + (cg7 + bgra.b[w - stride13] >> 1) & 255;
							bgra.set(w++,cg7);
							cr7 = data.b[r] + (cr7 + bgra.b[w - stride13] >> 1) & 255;
							bgra.set(w++,cr7);
							bgra.set(w++,255);
							r += 3;
						}
					}
					break;
				case 4:
					var stride14 = width2 * 4;
					var cr8 = 0;
					var cg8 = 0;
					var cb8 = 0;
					var ca11 = 0;
					if(alpha3) {
						var _g318 = 0;
						while(_g318 < width2) {
							var x28 = _g318++;
							cb8 = format.png.Tools.filter(bgra,x28,y3,stride14,cb8,w,null) + data.b[r + 2] & 255;
							bgra.set(w++,cb8);
							cg8 = format.png.Tools.filter(bgra,x28,y3,stride14,cg8,w,null) + data.b[r + 1] & 255;
							bgra.set(w++,cg8);
							cr8 = format.png.Tools.filter(bgra,x28,y3,stride14,cr8,w,null) + data.b[r] & 255;
							bgra.set(w++,cr8);
							ca11 = format.png.Tools.filter(bgra,x28,y3,stride14,ca11,w,null) + data.b[r + 3] & 255;
							bgra.set(w++,ca11);
							r += 4;
						}
					} else {
						var _g319 = 0;
						while(_g319 < width2) {
							var x29 = _g319++;
							cb8 = format.png.Tools.filter(bgra,x29,y3,stride14,cb8,w,null) + data.b[r + 2] & 255;
							bgra.set(w++,cb8);
							cg8 = format.png.Tools.filter(bgra,x29,y3,stride14,cg8,w,null) + data.b[r + 1] & 255;
							bgra.set(w++,cg8);
							cr8 = format.png.Tools.filter(bgra,x29,y3,stride14,cr8,w,null) + data.b[r] & 255;
							bgra.set(w++,cr8);
							bgra.set(w++,255);
							r += 3;
						}
					}
					break;
				default:
					throw "Invalid filter " + f3;
				}
			}
			break;
		}
	}
	return bgra;
};
format.tools = {};
format.tools.Adler32 = function() {
	this.a1 = 1;
	this.a2 = 0;
};
$hxClasses["format.tools.Adler32"] = format.tools.Adler32;
format.tools.Adler32.__name__ = ["format","tools","Adler32"];
format.tools.Adler32.read = function(i) {
	var a = new format.tools.Adler32();
	var a2a = i.readByte();
	var a2b = i.readByte();
	var a1a = i.readByte();
	var a1b = i.readByte();
	a.a1 = a1a << 8 | a1b;
	a.a2 = a2a << 8 | a2b;
	return a;
};
format.tools.Adler32.prototype = {
	update: function(b,pos,len) {
		var a1 = this.a1;
		var a2 = this.a2;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var p = _g1++;
			var c = b.b[p];
			a1 = (a1 + c) % 65521;
			a2 = (a2 + a1) % 65521;
		}
		this.a1 = a1;
		this.a2 = a2;
	}
	,equals: function(a) {
		return a.a1 == this.a1 && a.a2 == this.a2;
	}
	,__class__: format.tools.Adler32
};
format.tools.Huffman = $hxClasses["format.tools.Huffman"] = { __ename__ : true, __constructs__ : ["Found","NeedBit","NeedBits"] };
format.tools.Huffman.Found = function(i) { var $x = ["Found",0,i]; $x.__enum__ = format.tools.Huffman; $x.toString = $estr; return $x; };
format.tools.Huffman.NeedBit = function(left,right) { var $x = ["NeedBit",1,left,right]; $x.__enum__ = format.tools.Huffman; $x.toString = $estr; return $x; };
format.tools.Huffman.NeedBits = function(n,table) { var $x = ["NeedBits",2,n,table]; $x.__enum__ = format.tools.Huffman; $x.toString = $estr; return $x; };
format.tools.Huffman.__empty_constructs__ = [];
format.tools.HuffTools = function() {
};
$hxClasses["format.tools.HuffTools"] = format.tools.HuffTools;
format.tools.HuffTools.__name__ = ["format","tools","HuffTools"];
format.tools.HuffTools.prototype = {
	treeDepth: function(t) {
		switch(t[1]) {
		case 0:
			return 0;
		case 2:
			throw "assert";
			break;
		case 1:
			var b = t[3];
			var a = t[2];
			var da = this.treeDepth(a);
			var db = this.treeDepth(b);
			return 1 + (da < db?da:db);
		}
	}
	,treeCompress: function(t) {
		var d = this.treeDepth(t);
		if(d == 0) return t;
		if(d == 1) switch(t[1]) {
		case 1:
			var b = t[3];
			var a = t[2];
			return format.tools.Huffman.NeedBit(this.treeCompress(a),this.treeCompress(b));
		default:
			throw "assert";
		}
		var size = 1 << d;
		var table = new Array();
		var _g = 0;
		while(_g < size) {
			var i = _g++;
			table.push(format.tools.Huffman.Found(-1));
		}
		this.treeWalk(table,0,0,d,t);
		return format.tools.Huffman.NeedBits(d,table);
	}
	,treeWalk: function(table,p,cd,d,t) {
		switch(t[1]) {
		case 1:
			var b = t[3];
			var a = t[2];
			if(d > 0) {
				this.treeWalk(table,p,cd + 1,d - 1,a);
				this.treeWalk(table,p | 1 << cd,cd + 1,d - 1,b);
			} else table[p] = this.treeCompress(t);
			break;
		default:
			table[p] = this.treeCompress(t);
		}
	}
	,treeMake: function(bits,maxbits,v,len) {
		if(len > maxbits) throw "Invalid huffman";
		var idx = v << 5 | len;
		if(bits.exists(idx)) return format.tools.Huffman.Found(bits.get(idx));
		v <<= 1;
		len += 1;
		return format.tools.Huffman.NeedBit(this.treeMake(bits,maxbits,v,len),this.treeMake(bits,maxbits,v | 1,len));
	}
	,make: function(lengths,pos,nlengths,maxbits) {
		var counts = new Array();
		var tmp = new Array();
		if(maxbits > 32) throw "Invalid huffman";
		var _g = 0;
		while(_g < maxbits) {
			var i = _g++;
			counts.push(0);
			tmp.push(0);
		}
		var _g1 = 0;
		while(_g1 < nlengths) {
			var i1 = _g1++;
			var p = lengths[i1 + pos];
			if(p >= maxbits) throw "Invalid huffman";
			counts[p]++;
		}
		var code = 0;
		var _g11 = 1;
		var _g2 = maxbits - 1;
		while(_g11 < _g2) {
			var i2 = _g11++;
			code = code + counts[i2] << 1;
			tmp[i2] = code;
		}
		var bits = new haxe.ds.IntMap();
		var _g3 = 0;
		while(_g3 < nlengths) {
			var i3 = _g3++;
			var l = lengths[i3 + pos];
			if(l != 0) {
				var n = tmp[l - 1];
				tmp[l - 1] = n + 1;
				bits.set(n << 5 | l,i3);
			}
		}
		return this.treeCompress(format.tools.Huffman.NeedBit(this.treeMake(bits,maxbits,0,1),this.treeMake(bits,maxbits,1,1)));
	}
	,__class__: format.tools.HuffTools
};
format.tools.Inflate = function() { };
$hxClasses["format.tools.Inflate"] = format.tools.Inflate;
format.tools.Inflate.__name__ = ["format","tools","Inflate"];
format.tools.Inflate.run = function(bytes) {
	return format.tools.InflateImpl.run(new haxe.io.BytesInput(bytes));
};
format.tools._InflateImpl = {};
format.tools._InflateImpl.Window = function(hasCrc) {
	this.buffer = haxe.io.Bytes.alloc(65536);
	this.pos = 0;
	if(hasCrc) this.crc = new format.tools.Adler32();
};
$hxClasses["format.tools._InflateImpl.Window"] = format.tools._InflateImpl.Window;
format.tools._InflateImpl.Window.__name__ = ["format","tools","_InflateImpl","Window"];
format.tools._InflateImpl.Window.prototype = {
	slide: function() {
		if(this.crc != null) this.crc.update(this.buffer,0,32768);
		var b = haxe.io.Bytes.alloc(65536);
		this.pos -= 32768;
		b.blit(0,this.buffer,32768,this.pos);
		this.buffer = b;
	}
	,addBytes: function(b,p,len) {
		if(this.pos + len > 65536) this.slide();
		this.buffer.blit(this.pos,b,p,len);
		this.pos += len;
	}
	,addByte: function(c) {
		if(this.pos == 65536) this.slide();
		this.buffer.b[this.pos] = c & 255;
		this.pos++;
	}
	,getLastChar: function() {
		return this.buffer.b[this.pos - 1];
	}
	,available: function() {
		return this.pos;
	}
	,checksum: function() {
		if(this.crc != null) this.crc.update(this.buffer,0,this.pos);
		return this.crc;
	}
	,__class__: format.tools._InflateImpl.Window
};
format.tools._InflateImpl.State = $hxClasses["format.tools._InflateImpl.State"] = { __ename__ : true, __constructs__ : ["Head","Block","CData","Flat","Crc","Dist","DistOne","Done"] };
format.tools._InflateImpl.State.Head = ["Head",0];
format.tools._InflateImpl.State.Head.toString = $estr;
format.tools._InflateImpl.State.Head.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.Block = ["Block",1];
format.tools._InflateImpl.State.Block.toString = $estr;
format.tools._InflateImpl.State.Block.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.CData = ["CData",2];
format.tools._InflateImpl.State.CData.toString = $estr;
format.tools._InflateImpl.State.CData.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.Flat = ["Flat",3];
format.tools._InflateImpl.State.Flat.toString = $estr;
format.tools._InflateImpl.State.Flat.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.Crc = ["Crc",4];
format.tools._InflateImpl.State.Crc.toString = $estr;
format.tools._InflateImpl.State.Crc.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.Dist = ["Dist",5];
format.tools._InflateImpl.State.Dist.toString = $estr;
format.tools._InflateImpl.State.Dist.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.DistOne = ["DistOne",6];
format.tools._InflateImpl.State.DistOne.toString = $estr;
format.tools._InflateImpl.State.DistOne.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.Done = ["Done",7];
format.tools._InflateImpl.State.Done.toString = $estr;
format.tools._InflateImpl.State.Done.__enum__ = format.tools._InflateImpl.State;
format.tools._InflateImpl.State.__empty_constructs__ = [format.tools._InflateImpl.State.Head,format.tools._InflateImpl.State.Block,format.tools._InflateImpl.State.CData,format.tools._InflateImpl.State.Flat,format.tools._InflateImpl.State.Crc,format.tools._InflateImpl.State.Dist,format.tools._InflateImpl.State.DistOne,format.tools._InflateImpl.State.Done];
format.tools.InflateImpl = function(i,header,crc) {
	if(crc == null) crc = true;
	if(header == null) header = true;
	this["final"] = false;
	this.htools = new format.tools.HuffTools();
	this.huffman = this.buildFixedHuffman();
	this.huffdist = null;
	this.len = 0;
	this.dist = 0;
	if(header) this.state = format.tools._InflateImpl.State.Head; else this.state = format.tools._InflateImpl.State.Block;
	this.input = i;
	this.bits = 0;
	this.nbits = 0;
	this.needed = 0;
	this.output = null;
	this.outpos = 0;
	this.lengths = new Array();
	var _g = 0;
	while(_g < 19) {
		var i1 = _g++;
		this.lengths.push(-1);
	}
	this.window = new format.tools._InflateImpl.Window(crc);
};
$hxClasses["format.tools.InflateImpl"] = format.tools.InflateImpl;
format.tools.InflateImpl.__name__ = ["format","tools","InflateImpl"];
format.tools.InflateImpl.run = function(i,bufsize) {
	if(bufsize == null) bufsize = 65536;
	var buf = haxe.io.Bytes.alloc(bufsize);
	var output = new haxe.io.BytesBuffer();
	var inflate = new format.tools.InflateImpl(i);
	while(true) {
		var len = inflate.readBytes(buf,0,bufsize);
		output.addBytes(buf,0,len);
		if(len < bufsize) break;
	}
	return output.getBytes();
};
format.tools.InflateImpl.prototype = {
	buildFixedHuffman: function() {
		if(format.tools.InflateImpl.FIXED_HUFFMAN != null) return format.tools.InflateImpl.FIXED_HUFFMAN;
		var a = new Array();
		var _g = 0;
		while(_g < 288) {
			var n = _g++;
			a.push(n <= 143?8:n <= 255?9:n <= 279?7:8);
		}
		format.tools.InflateImpl.FIXED_HUFFMAN = this.htools.make(a,0,288,10);
		return format.tools.InflateImpl.FIXED_HUFFMAN;
	}
	,readBytes: function(b,pos,len) {
		this.needed = len;
		this.outpos = pos;
		this.output = b;
		if(len > 0) while(this.inflateLoop()) {
		}
		return len - this.needed;
	}
	,getBits: function(n) {
		while(this.nbits < n) {
			this.bits |= this.input.readByte() << this.nbits;
			this.nbits += 8;
		}
		var b = this.bits & (1 << n) - 1;
		this.nbits -= n;
		this.bits >>= n;
		return b;
	}
	,getBit: function() {
		if(this.nbits == 0) {
			this.nbits = 8;
			this.bits = this.input.readByte();
		}
		var b = (this.bits & 1) == 1;
		this.nbits--;
		this.bits >>= 1;
		return b;
	}
	,getRevBits: function(n) {
		if(n == 0) return 0; else if(this.getBit()) return 1 << n - 1 | this.getRevBits(n - 1); else return this.getRevBits(n - 1);
	}
	,resetBits: function() {
		this.bits = 0;
		this.nbits = 0;
	}
	,addBytes: function(b,p,len) {
		this.window.addBytes(b,p,len);
		this.output.blit(this.outpos,b,p,len);
		this.needed -= len;
		this.outpos += len;
	}
	,addByte: function(b) {
		this.window.addByte(b);
		this.output.b[this.outpos] = b & 255;
		this.needed--;
		this.outpos++;
	}
	,addDistOne: function(n) {
		var c = this.window.getLastChar();
		var _g = 0;
		while(_g < n) {
			var i = _g++;
			this.addByte(c);
		}
	}
	,addDist: function(d,len) {
		this.addBytes(this.window.buffer,this.window.pos - d,len);
	}
	,applyHuffman: function(h) {
		switch(h[1]) {
		case 0:
			var n = h[2];
			return n;
		case 1:
			var b = h[3];
			var a = h[2];
			return this.applyHuffman(this.getBit()?b:a);
		case 2:
			var tbl = h[3];
			var n1 = h[2];
			return this.applyHuffman(tbl[this.getBits(n1)]);
		}
	}
	,inflateLengths: function(a,max) {
		var i = 0;
		var prev = 0;
		while(i < max) {
			var n = this.applyHuffman(this.huffman);
			switch(n) {
			case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:case 8:case 9:case 10:case 11:case 12:case 13:case 14:case 15:
				prev = n;
				a[i] = n;
				i++;
				break;
			case 16:
				var end = i + 3 + this.getBits(2);
				if(end > max) throw "Invalid data";
				while(i < end) {
					a[i] = prev;
					i++;
				}
				break;
			case 17:
				i += 3 + this.getBits(3);
				if(i > max) throw "Invalid data";
				break;
			case 18:
				i += 11 + this.getBits(7);
				if(i > max) throw "Invalid data";
				break;
			default:
				throw "Invalid data";
			}
		}
	}
	,inflateLoop: function() {
		var _g = this.state;
		switch(_g[1]) {
		case 0:
			var cmf = this.input.readByte();
			var cm = cmf & 15;
			var cinfo = cmf >> 4;
			if(cm != 8) throw "Invalid data";
			var flg = this.input.readByte();
			var fdict = (flg & 32) != 0;
			if(((cmf << 8) + flg) % 31 != 0) throw "Invalid data";
			if(fdict) throw "Unsupported dictionary";
			this.state = format.tools._InflateImpl.State.Block;
			return true;
		case 4:
			var calc = this.window.checksum();
			if(calc == null) {
				this.state = format.tools._InflateImpl.State.Done;
				return true;
			}
			var crc = format.tools.Adler32.read(this.input);
			if(!calc.equals(crc)) throw "Invalid CRC";
			this.state = format.tools._InflateImpl.State.Done;
			return true;
		case 7:
			return false;
		case 1:
			this["final"] = this.getBit();
			var _g1 = this.getBits(2);
			switch(_g1) {
			case 0:
				this.len = this.input.readUInt16();
				var nlen = this.input.readUInt16();
				if(nlen != 65535 - this.len) throw "Invalid data";
				this.state = format.tools._InflateImpl.State.Flat;
				var r = this.inflateLoop();
				this.resetBits();
				return r;
			case 1:
				this.huffman = this.buildFixedHuffman();
				this.huffdist = null;
				this.state = format.tools._InflateImpl.State.CData;
				return true;
			case 2:
				var hlit = this.getBits(5) + 257;
				var hdist = this.getBits(5) + 1;
				var hclen = this.getBits(4) + 4;
				var _g2 = 0;
				while(_g2 < hclen) {
					var i = _g2++;
					this.lengths[format.tools.InflateImpl.CODE_LENGTHS_POS[i]] = this.getBits(3);
				}
				var _g21 = hclen;
				while(_g21 < 19) {
					var i1 = _g21++;
					this.lengths[format.tools.InflateImpl.CODE_LENGTHS_POS[i1]] = 0;
				}
				this.huffman = this.htools.make(this.lengths,0,19,8);
				var lengths = new Array();
				var _g3 = 0;
				var _g22 = hlit + hdist;
				while(_g3 < _g22) {
					var i2 = _g3++;
					lengths.push(0);
				}
				this.inflateLengths(lengths,hlit + hdist);
				this.huffdist = this.htools.make(lengths,hlit,hdist,16);
				this.huffman = this.htools.make(lengths,0,hlit,16);
				this.state = format.tools._InflateImpl.State.CData;
				return true;
			default:
				throw "Invalid data";
			}
			break;
		case 3:
			var rlen;
			if(this.len < this.needed) rlen = this.len; else rlen = this.needed;
			var bytes = this.input.read(rlen);
			this.len -= rlen;
			this.addBytes(bytes,0,rlen);
			if(this.len == 0) if(this["final"]) this.state = format.tools._InflateImpl.State.Crc; else this.state = format.tools._InflateImpl.State.Block;
			return this.needed > 0;
		case 6:
			var rlen1;
			if(this.len < this.needed) rlen1 = this.len; else rlen1 = this.needed;
			this.addDistOne(rlen1);
			this.len -= rlen1;
			if(this.len == 0) this.state = format.tools._InflateImpl.State.CData;
			return this.needed > 0;
		case 5:
			while(this.len > 0 && this.needed > 0) {
				var rdist;
				if(this.len < this.dist) rdist = this.len; else rdist = this.dist;
				var rlen2;
				if(this.needed < rdist) rlen2 = this.needed; else rlen2 = rdist;
				this.addDist(this.dist,rlen2);
				this.len -= rlen2;
			}
			if(this.len == 0) this.state = format.tools._InflateImpl.State.CData;
			return this.needed > 0;
		case 2:
			var n = this.applyHuffman(this.huffman);
			if(n < 256) {
				this.addByte(n);
				return this.needed > 0;
			} else if(n == 256) {
				if(this["final"]) this.state = format.tools._InflateImpl.State.Crc; else this.state = format.tools._InflateImpl.State.Block;
				return true;
			} else {
				n -= 257;
				var extra_bits = format.tools.InflateImpl.LEN_EXTRA_BITS_TBL[n];
				if(extra_bits == -1) throw "Invalid data";
				this.len = format.tools.InflateImpl.LEN_BASE_VAL_TBL[n] + this.getBits(extra_bits);
				var dist_code;
				if(this.huffdist == null) dist_code = this.getRevBits(5); else dist_code = this.applyHuffman(this.huffdist);
				extra_bits = format.tools.InflateImpl.DIST_EXTRA_BITS_TBL[dist_code];
				if(extra_bits == -1) throw "Invalid data";
				this.dist = format.tools.InflateImpl.DIST_BASE_VAL_TBL[dist_code] + this.getBits(extra_bits);
				if(this.dist > this.window.available()) throw "Invalid data";
				if(this.dist == 1) this.state = format.tools._InflateImpl.State.DistOne; else this.state = format.tools._InflateImpl.State.Dist;
				return true;
			}
			break;
		}
	}
	,__class__: format.tools.InflateImpl
};
var h2d = {};
h2d.Sprite = function(parent) {
	this.matA = 1;
	this.matB = 0;
	this.matC = 0;
	this.matD = 1;
	this.absX = 0;
	this.absY = 0;
	this.posChanged = true;
	this.x = 0;
	this.posChanged = true;
	this.y = 0;
	this.posChanged = true;
	this.scaleX = 1;
	this.posChanged = true;
	this.scaleY = 1;
	this.posChanged = true;
	this.rotation = 0;
	this.posChanged = false;
	this.visible = true;
	this.childs = [];
	this.filters = [];
	if(parent != null) parent.addChild(this);
};
$hxClasses["h2d.Sprite"] = h2d.Sprite;
h2d.Sprite.__name__ = ["h2d","Sprite"];
h2d.Sprite.prototype = {
	getBounds: function(relativeTo,out) {
		if(out == null) out = new h2d.col.Bounds();
		if(relativeTo != null) relativeTo.syncPos();
		this.syncPos();
		this.getBoundsRec(relativeTo,out);
		if(out.xMax <= out.xMin || out.yMax <= out.yMin) {
			this.addBounds(relativeTo,out,-1,-1,2,2);
			out.xMax = out.xMin = (out.xMax + out.xMin) * 0.5;
			out.yMax = out.yMin = (out.yMax + out.yMin) * 0.5;
		}
		return out;
	}
	,getBoundsRec: function(relativeTo,out) {
		var n = this.childs.length;
		if(n == 0) {
			out.xMin = 1e20;
			out.yMin = 1e20;
			out.xMax = -1e20;
			out.yMax = -1e20;
			return;
		}
		if(this.posChanged) {
			this.calcAbsPos();
			var _g = 0;
			var _g1 = this.childs;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.posChanged = true;
			}
			this.posChanged = false;
		}
		if(n == 1) {
			var c1 = this.childs[0];
			if(c1.visible) c1.getBounds(relativeTo,out); else {
				out.xMin = 1e20;
				out.yMin = 1e20;
				out.xMax = -1e20;
				out.yMax = -1e20;
			}
			return;
		}
		var xmin = Math.POSITIVE_INFINITY;
		var ymin = Math.POSITIVE_INFINITY;
		var xmax = Math.NEGATIVE_INFINITY;
		var ymax = Math.NEGATIVE_INFINITY;
		var _g2 = 0;
		var _g11 = this.childs;
		while(_g2 < _g11.length) {
			var c2 = _g11[_g2];
			++_g2;
			if(!c2.visible) continue;
			c2.getBoundsRec(relativeTo,out);
			if(out.xMin < xmin) xmin = out.xMin;
			if(out.yMin < ymin) ymin = out.yMin;
			if(out.xMax > xmax) xmax = out.xMax;
			if(out.yMax > ymax) ymax = out.yMax;
		}
		out.xMin = xmin;
		out.yMin = ymin;
		out.xMax = xmax;
		out.yMax = ymax;
	}
	,addBounds: function(relativeTo,out,dx,dy,width,height) {
		if(width <= 0 || height <= 0) return;
		if(relativeTo == null) {
			var x;
			var y;
			out.addPos(dx * this.matA + dy * this.matC + this.absX,dx * this.matB + dy * this.matD + this.absY);
			out.addPos((dx + width) * this.matA + dy * this.matC + this.absX,(dx + width) * this.matB + dy * this.matD + this.absY);
			out.addPos(dx * this.matA + (dy + height) * this.matC + this.absX,dx * this.matB + (dy + height) * this.matD + this.absY);
			out.addPos((dx + width) * this.matA + (dy + height) * this.matC + this.absX,(dx + width) * this.matB + (dy + height) * this.matD + this.absY);
			return;
		}
		if(relativeTo == this) {
			if(out.xMin > dx) out.xMin = dx;
			if(out.yMin > dy) out.yMin = dy;
			if(out.xMax < dx + width) out.xMax = dx + width;
			if(out.yMax < dy + height) out.yMax = dy + height;
			return;
		}
		var det = 1 / (relativeTo.matA * relativeTo.matD - relativeTo.matB * relativeTo.matC);
		var rA = relativeTo.matD * det;
		var rB = -relativeTo.matB * det;
		var rC = -relativeTo.matC * det;
		var rD = relativeTo.matA * det;
		var rX = this.absX - relativeTo.absX;
		var rY = this.absY - relativeTo.absY;
		var x1;
		var y1;
		x1 = dx * this.matA + dy * this.matC + rX;
		y1 = dx * this.matB + dy * this.matD + rY;
		out.addPos(x1 * rA + y1 * rC,x1 * rB + y1 * rD);
		x1 = (dx + width) * this.matA + dy * this.matC + rX;
		y1 = (dx + width) * this.matB + dy * this.matD + rY;
		out.addPos(x1 * rA + y1 * rC,x1 * rB + y1 * rD);
		x1 = dx * this.matA + (dy + height) * this.matC + rX;
		y1 = dx * this.matB + (dy + height) * this.matD + rY;
		out.addPos(x1 * rA + y1 * rC,x1 * rB + y1 * rD);
		x1 = (dx + width) * this.matA + (dy + height) * this.matC + rX;
		y1 = (dx + width) * this.matB + (dy + height) * this.matD + rY;
		out.addPos(x1 * rA + y1 * rC,x1 * rB + y1 * rD);
	}
	,getScene: function() {
		var p = this;
		while(p.parent != null) p = p.parent;
		if((p instanceof h2d.Scene)) return p; else return null;
	}
	,addChild: function(s) {
		this.addChildAt(s,this.childs.length);
	}
	,addChildAt: function(s,pos) {
		if(pos < 0) pos = 0;
		if(pos > this.childs.length) pos = this.childs.length;
		var p = this;
		while(p != null) {
			if(p == s) throw "Recursive addChild";
			p = p.parent;
		}
		if(s.parent != null) {
			var old = s.allocated;
			s.allocated = false;
			s.parent.removeChild(s);
			s.allocated = old;
		}
		this.childs.splice(pos,0,s);
		if(!this.allocated && s.allocated) s.onDelete();
		s.parent = this;
		s.posChanged = true;
		if(this.allocated) {
			if(!s.allocated) s.onAlloc(); else s.onParentChanged();
		}
	}
	,onParentChanged: function() {
	}
	,onAlloc: function() {
		this.allocated = true;
		var _g = 0;
		var _g1 = this.childs;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.onAlloc();
		}
	}
	,onDelete: function() {
		this.allocated = false;
		var _g = 0;
		var _g1 = this.childs;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.onDelete();
		}
	}
	,removeChild: function(s) {
		if(HxOverrides.remove(this.childs,s)) {
			if(s.allocated) s.onDelete();
			s.parent = null;
		}
	}
	,remove: function() {
		if(this.parent != null) this.parent.removeChild(this);
	}
	,draw: function(ctx) {
	}
	,sync: function(ctx) {
		var changed = this.posChanged;
		if(changed) {
			this.calcAbsPos();
			this.posChanged = false;
		}
		this.lastFrame = ctx.frame;
		var p = 0;
		var len = this.childs.length;
		while(p < len) {
			var c = this.childs[p];
			if(c == null) break;
			if(c.lastFrame != ctx.frame) {
				if(changed) c.posChanged = true;
				c.sync(ctx);
			}
			if(this.childs[p] != c) {
				p = 0;
				len = this.childs.length;
			} else p++;
		}
	}
	,syncPos: function() {
		if(this.parent != null) this.parent.syncPos();
		if(this.posChanged) {
			this.calcAbsPos();
			var _g = 0;
			var _g1 = this.childs;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.posChanged = true;
			}
			this.posChanged = false;
		}
	}
	,calcAbsPos: function() {
		if(this.parent == null) {
			var cr;
			var sr;
			if(this.rotation == 0) {
				cr = 1.;
				sr = 0.;
				this.matA = this.scaleX;
				this.matB = 0;
				this.matC = 0;
				this.matD = this.scaleY;
			} else {
				cr = Math.cos(this.rotation);
				sr = Math.sin(this.rotation);
				this.matA = this.scaleX * cr;
				this.matB = this.scaleX * sr;
				this.matC = this.scaleY * -sr;
				this.matD = this.scaleY * cr;
			}
			this.absX = this.x;
			this.absY = this.y;
		} else {
			if(this.rotation == 0) {
				this.matA = this.scaleX * this.parent.matA;
				this.matB = this.scaleX * this.parent.matB;
				this.matC = this.scaleY * this.parent.matC;
				this.matD = this.scaleY * this.parent.matD;
			} else {
				var cr1 = Math.cos(this.rotation);
				var sr1 = Math.sin(this.rotation);
				var tmpA = this.scaleX * cr1;
				var tmpB = this.scaleX * sr1;
				var tmpC = this.scaleY * -sr1;
				var tmpD = this.scaleY * cr1;
				this.matA = tmpA * this.parent.matA + tmpB * this.parent.matC;
				this.matB = tmpA * this.parent.matB + tmpB * this.parent.matD;
				this.matC = tmpC * this.parent.matA + tmpD * this.parent.matC;
				this.matD = tmpC * this.parent.matB + tmpD * this.parent.matD;
			}
			this.absX = this.x * this.parent.matA + this.y * this.parent.matC + this.parent.absX;
			this.absY = this.x * this.parent.matB + this.y * this.parent.matD + this.parent.absY;
		}
	}
	,emitTile: function(ctx,tile) {
		if(h2d.Sprite.nullDrawable == null) h2d.Sprite.nullDrawable = new h2d.Drawable(null);
		ctx.beginDrawBatch(h2d.Sprite.nullDrawable,tile.innerTex);
		var ax = this.absX + tile.dx * this.matA + tile.dy * this.matC;
		var ay = this.absY + tile.dx * this.matB + tile.dy * this.matD;
		var buf = ctx.buffer;
		var pos = ctx.bufPos;
		while(buf.length < pos + 32) buf.push(0.);
		var key = pos++;
		buf[key] = ax;
		var key1 = pos++;
		buf[key1] = ay;
		var key2 = pos++;
		buf[key2] = tile.u;
		var key3 = pos++;
		buf[key3] = tile.v;
		var key4 = pos++;
		buf[key4] = 1.;
		var key5 = pos++;
		buf[key5] = 1.;
		var key6 = pos++;
		buf[key6] = 1.;
		var key7 = pos++;
		buf[key7] = 1.;
		var tw = tile.width;
		var th = tile.height;
		var dx1 = tw * this.matA;
		var dy1 = tw * this.matB;
		var dx2 = th * this.matC;
		var dy2 = th * this.matD;
		var key8 = pos++;
		buf[key8] = ax + dx1;
		var key9 = pos++;
		buf[key9] = ay + dy1;
		var key10 = pos++;
		buf[key10] = tile.u2;
		var key11 = pos++;
		buf[key11] = tile.v;
		var key12 = pos++;
		buf[key12] = 1.;
		var key13 = pos++;
		buf[key13] = 1.;
		var key14 = pos++;
		buf[key14] = 1.;
		var key15 = pos++;
		buf[key15] = 1.;
		var key16 = pos++;
		buf[key16] = ax + dx2;
		var key17 = pos++;
		buf[key17] = ay + dy2;
		var key18 = pos++;
		buf[key18] = tile.u;
		var key19 = pos++;
		buf[key19] = tile.v2;
		var key20 = pos++;
		buf[key20] = 1.;
		var key21 = pos++;
		buf[key21] = 1.;
		var key22 = pos++;
		buf[key22] = 1.;
		var key23 = pos++;
		buf[key23] = 1.;
		var key24 = pos++;
		buf[key24] = ax + dx1 + dx2;
		var key25 = pos++;
		buf[key25] = ay + dy1 + dy2;
		var key26 = pos++;
		buf[key26] = tile.u2;
		var key27 = pos++;
		buf[key27] = tile.v2;
		var key28 = pos++;
		buf[key28] = 1.;
		var key29 = pos++;
		buf[key29] = 1.;
		var key30 = pos++;
		buf[key30] = 1.;
		var key31 = pos++;
		buf[key31] = 1.;
		ctx.bufPos = pos;
	}
	,drawFilters: function(ctx) {
		var bounds = ctx.tmpBounds;
		var total_xMin = 1e20;
		var total_yMin = 1e20;
		var total_xMax = -1e20;
		var total_yMax = -1e20;
		var maxExtent = -1.;
		var _g = 0;
		var _g1 = this.filters;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			f.sync(ctx,this);
			if(f.autoBounds) {
				if(f.boundsExtend > maxExtent) maxExtent = f.boundsExtend;
			} else {
				f.getBounds(this,bounds);
				if(bounds.xMin < total_xMin) total_xMin = bounds.xMin;
				if(bounds.xMax > total_xMax) total_xMax = bounds.xMax;
				if(bounds.yMin < total_yMin) total_yMin = bounds.yMin;
				if(bounds.yMax > total_yMax) total_yMax = bounds.yMax;
			}
		}
		if(maxExtent >= 0) {
			this.getBounds(this,bounds);
			bounds.xMin -= maxExtent;
			bounds.yMin -= maxExtent;
			bounds.xMax += maxExtent;
			bounds.yMax += maxExtent;
			if(bounds.xMin < total_xMin) total_xMin = bounds.xMin;
			if(bounds.xMax > total_xMax) total_xMax = bounds.xMax;
			if(bounds.yMin < total_yMin) total_yMin = bounds.yMin;
			if(bounds.yMax > total_yMax) total_yMax = bounds.yMax;
		}
		var xMin = Math.floor(total_xMin + 1e-10);
		var yMin = Math.floor(total_yMin + 1e-10);
		var width = Math.ceil(total_xMax - xMin - 1e-10);
		var height = Math.ceil(total_yMax - yMin - 1e-10);
		if(width <= 0 || height <= 0) return;
		var t = ctx.textures.allocTarget("filterTemp",ctx,width,height,false);
		ctx.pushTarget(t,xMin,yMin);
		ctx.engine.clear(0);
		var oldA = this.matA;
		var oldB = this.matB;
		var oldC = this.matC;
		var oldD = this.matD;
		var oldX = this.absX;
		var oldY = this.absY;
		this.matA = 1;
		this.matB = 0;
		this.matC = 0;
		this.matD = 1;
		this.absX = 0;
		this.absY = 0;
		var _g2 = 0;
		var _g11 = this.childs;
		while(_g2 < _g11.length) {
			var c = _g11[_g2];
			++_g2;
			c.posChanged = true;
		}
		this.draw(ctx);
		var _g3 = 0;
		var _g12 = this.childs;
		while(_g3 < _g12.length) {
			var c1 = _g12[_g3];
			++_g3;
			c1.drawRec(ctx);
		}
		this.matA = oldA;
		this.matB = oldB;
		this.matC = oldC;
		this.matD = oldD;
		this.absX = oldX;
		this.absY = oldY;
		ctx.flush();
		var $final = h2d.Tile.fromTexture(t);
		var _g4 = 0;
		var _g13 = this.filters;
		while(_g4 < _g13.length) {
			var f1 = _g13[_g4];
			++_g4;
			$final = f1.draw(ctx,$final);
		}
		ctx.popTarget();
		$final.dx += xMin;
		$final.dy += yMin;
		this.emitTile(ctx,$final);
		ctx.flush();
	}
	,drawRec: function(ctx) {
		if(!this.visible) return;
		if(this.posChanged) {
			this.calcAbsPos();
			var _g = 0;
			var _g1 = this.childs;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.posChanged = true;
			}
			this.posChanged = false;
		}
		if(this.filters.length > 0) this.drawFilters(ctx); else {
			this.draw(ctx);
			var _g2 = 0;
			var _g11 = this.childs;
			while(_g2 < _g11.length) {
				var c1 = _g11[_g2];
				++_g2;
				c1.drawRec(ctx);
			}
		}
	}
	,set_x: function(v) {
		this.posChanged = true;
		return this.x = v;
	}
	,set_y: function(v) {
		this.posChanged = true;
		return this.y = v;
	}
	,__class__: h2d.Sprite
	,__properties__: {set_y:"set_y",set_x:"set_x"}
};
h2d.Drawable = function(parent) {
	h2d.Sprite.call(this,parent);
	this.blendMode = h2d.BlendMode.Alpha;
	this.color = new h3d.Vector(1,1,1,1);
};
$hxClasses["h2d.Drawable"] = h2d.Drawable;
h2d.Drawable.__name__ = ["h2d","Drawable"];
h2d.Drawable.__super__ = h2d.Sprite;
h2d.Drawable.prototype = $extend(h2d.Sprite.prototype,{
	emitTile: function(ctx,tile) {
		if(tile == null) tile = new h2d.Tile(null,0,0,5,5);
		ctx.beginDrawBatch(this,tile.innerTex);
		var ax = this.absX + tile.dx * this.matA + tile.dy * this.matC;
		var ay = this.absY + tile.dx * this.matB + tile.dy * this.matD;
		var buf = ctx.buffer;
		var pos = ctx.bufPos;
		while(buf.length < pos + 32) buf.push(0.);
		var key = pos++;
		buf[key] = ax;
		var key1 = pos++;
		buf[key1] = ay;
		var key2 = pos++;
		buf[key2] = tile.u;
		var key3 = pos++;
		buf[key3] = tile.v;
		var key4 = pos++;
		buf[key4] = this.color.x;
		var key5 = pos++;
		buf[key5] = this.color.y;
		var key6 = pos++;
		buf[key6] = this.color.z;
		var key7 = pos++;
		buf[key7] = this.color.w;
		var tw = tile.width;
		var th = tile.height;
		var dx1 = tw * this.matA;
		var dy1 = tw * this.matB;
		var dx2 = th * this.matC;
		var dy2 = th * this.matD;
		var key8 = pos++;
		buf[key8] = ax + dx1;
		var key9 = pos++;
		buf[key9] = ay + dy1;
		var key10 = pos++;
		buf[key10] = tile.u2;
		var key11 = pos++;
		buf[key11] = tile.v;
		var key12 = pos++;
		buf[key12] = this.color.x;
		var key13 = pos++;
		buf[key13] = this.color.y;
		var key14 = pos++;
		buf[key14] = this.color.z;
		var key15 = pos++;
		buf[key15] = this.color.w;
		var key16 = pos++;
		buf[key16] = ax + dx2;
		var key17 = pos++;
		buf[key17] = ay + dy2;
		var key18 = pos++;
		buf[key18] = tile.u;
		var key19 = pos++;
		buf[key19] = tile.v2;
		var key20 = pos++;
		buf[key20] = this.color.x;
		var key21 = pos++;
		buf[key21] = this.color.y;
		var key22 = pos++;
		buf[key22] = this.color.z;
		var key23 = pos++;
		buf[key23] = this.color.w;
		var key24 = pos++;
		buf[key24] = ax + dx1 + dx2;
		var key25 = pos++;
		buf[key25] = ay + dy1 + dy2;
		var key26 = pos++;
		buf[key26] = tile.u2;
		var key27 = pos++;
		buf[key27] = tile.v2;
		var key28 = pos++;
		buf[key28] = this.color.x;
		var key29 = pos++;
		buf[key29] = this.color.y;
		var key30 = pos++;
		buf[key30] = this.color.z;
		var key31 = pos++;
		buf[key31] = this.color.w;
		ctx.bufPos = pos;
	}
	,__class__: h2d.Drawable
});
h2d.Bitmap = function(tile,parent) {
	h2d.Drawable.call(this,parent);
	this.tile = tile;
};
$hxClasses["h2d.Bitmap"] = h2d.Bitmap;
h2d.Bitmap.__name__ = ["h2d","Bitmap"];
h2d.Bitmap.__super__ = h2d.Drawable;
h2d.Bitmap.prototype = $extend(h2d.Drawable.prototype,{
	getBoundsRec: function(relativeTo,out) {
		h2d.Drawable.prototype.getBoundsRec.call(this,relativeTo,out);
		if(this.tile != null) this.addBounds(relativeTo,out,this.tile.dx,this.tile.dy,this.tile.width,this.tile.height);
	}
	,draw: function(ctx) {
		this.emitTile(ctx,this.tile);
	}
	,__class__: h2d.Bitmap
});
h2d.BlendMode = $hxClasses["h2d.BlendMode"] = { __ename__ : true, __constructs__ : ["None","Alpha","Add","SoftAdd","Multiply","Erase","Screen"] };
h2d.BlendMode.None = ["None",0];
h2d.BlendMode.None.toString = $estr;
h2d.BlendMode.None.__enum__ = h2d.BlendMode;
h2d.BlendMode.Alpha = ["Alpha",1];
h2d.BlendMode.Alpha.toString = $estr;
h2d.BlendMode.Alpha.__enum__ = h2d.BlendMode;
h2d.BlendMode.Add = ["Add",2];
h2d.BlendMode.Add.toString = $estr;
h2d.BlendMode.Add.__enum__ = h2d.BlendMode;
h2d.BlendMode.SoftAdd = ["SoftAdd",3];
h2d.BlendMode.SoftAdd.toString = $estr;
h2d.BlendMode.SoftAdd.__enum__ = h2d.BlendMode;
h2d.BlendMode.Multiply = ["Multiply",4];
h2d.BlendMode.Multiply.toString = $estr;
h2d.BlendMode.Multiply.__enum__ = h2d.BlendMode;
h2d.BlendMode.Erase = ["Erase",5];
h2d.BlendMode.Erase.toString = $estr;
h2d.BlendMode.Erase.__enum__ = h2d.BlendMode;
h2d.BlendMode.Screen = ["Screen",6];
h2d.BlendMode.Screen.toString = $estr;
h2d.BlendMode.Screen.__enum__ = h2d.BlendMode;
h2d.BlendMode.__empty_constructs__ = [h2d.BlendMode.None,h2d.BlendMode.Alpha,h2d.BlendMode.Add,h2d.BlendMode.SoftAdd,h2d.BlendMode.Multiply,h2d.BlendMode.Erase,h2d.BlendMode.Screen];
h2d.Interactive = function() { };
$hxClasses["h2d.Interactive"] = h2d.Interactive;
h2d.Interactive.__name__ = ["h2d","Interactive"];
h2d.Interactive.__super__ = h2d.Drawable;
h2d.Interactive.prototype = $extend(h2d.Drawable.prototype,{
	onAlloc: function() {
		this.scene = this.getScene();
		if(this.scene != null) this.scene.addEventTarget(this);
		h2d.Drawable.prototype.onAlloc.call(this);
	}
	,draw: function(ctx) {
		if(this.backgroundColor != null) this.emitTile(ctx,h2d.Tile.fromColor(this.backgroundColor,this.width | 0,this.height | 0,(this.backgroundColor >>> 24) / 255,{ fileName : "Interactive.hx", lineNumber : 36, className : "h2d.Interactive", methodName : "draw"}));
	}
	,getBoundsRec: function(relativeTo,out) {
		h2d.Drawable.prototype.getBoundsRec.call(this,relativeTo,out);
		if(this.backgroundColor != null) this.addBounds(relativeTo,out,0,0,this.width | 0,this.height | 0);
	}
	,onParentChanged: function() {
		if(this.scene != null) {
			this.scene.removeEventTarget(this);
			this.scene.addEventTarget(this);
		}
	}
	,calcAbsPos: function() {
		h2d.Drawable.prototype.calcAbsPos.call(this);
		if(this.scene != null && this.scene.currentOver == this) {
			var stage = hxd.Stage.getInstance();
			var e = new hxd.Event(hxd.EventKind.EMove,stage.get_mouseX(),stage.get_mouseY());
			this.scene.onEvent(e);
		}
	}
	,onDelete: function() {
		if(this.scene != null) {
			this.scene.removeEventTarget(this);
			if(this.scene.currentOver == this) {
				this.scene.currentOver = null;
				hxd.System.setCursor(hxd.Cursor.Default);
			}
			if(this.scene.currentFocus == this) this.scene.currentFocus = null;
		}
		h2d.Drawable.prototype.onDelete.call(this);
	}
	,__class__: h2d.Interactive
});
h2d.Layers = function(parent) {
	h2d.Sprite.call(this,parent);
	this.layers = [];
	this.layerCount = 0;
};
$hxClasses["h2d.Layers"] = h2d.Layers;
h2d.Layers.__name__ = ["h2d","Layers"];
h2d.Layers.__super__ = h2d.Sprite;
h2d.Layers.prototype = $extend(h2d.Sprite.prototype,{
	addChild: function(s) {
		this.addChildAt(s,0);
	}
	,addChildAt: function(s,layer) {
		if(s.parent == this) {
			var old = s.allocated;
			s.allocated = false;
			this.removeChild(s);
			s.allocated = old;
		}
		while(layer >= this.layerCount) this.layers[this.layerCount++] = this.childs.length;
		h2d.Sprite.prototype.addChildAt.call(this,s,this.layers[layer]);
		var _g1 = layer;
		var _g = this.layerCount;
		while(_g1 < _g) {
			var i = _g1++;
			this.layers[i]++;
		}
	}
	,removeChild: function(s) {
		var _g1 = 0;
		var _g = this.childs.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(this.childs[i] == s) {
				this.childs.splice(i,1);
				if(s.allocated) s.onDelete();
				s.parent = null;
				var k = this.layerCount - 1;
				while(k >= 0 && this.layers[k] > i) {
					this.layers[k]--;
					k--;
				}
				break;
			}
		}
	}
	,__class__: h2d.Layers
});
var h3d = {};
h3d.impl = {};
h3d.impl.RenderContext = function() {
	if(h3d.Engine.CURRENT == null) throw "no current context, please do this operation after engine init/creation";
	this.engine = h3d.Engine.CURRENT;
	this.frame = 0;
	this.time = 0.;
	this.elapsedTime = 1. / hxd.Stage.getInstance().getFrameRate();
};
$hxClasses["h3d.impl.RenderContext"] = h3d.impl.RenderContext;
h3d.impl.RenderContext.__name__ = ["h3d","impl","RenderContext"];
h3d.impl.RenderContext.prototype = {
	__class__: h3d.impl.RenderContext
};
h2d.RenderContext = function(s2d) {
	this.tmpBounds = new h2d.col.Bounds();
	h3d.impl.RenderContext.call(this);
	this.s2d = s2d;
	var this1;
	this1 = new Array(0);
	this.buffer = this1;
	this.bufPos = 0;
	this.manager = new h3d.shader.Manager(["output.position","output.color"]);
	this.pass = new h3d.mat.Pass("",null);
	this.pass.depth(true,h3d.mat.Compare.Always);
	this.pass.set_culling(h3d.mat.Face.None);
	this.baseShader = new h3d.shader.Base2d();
	this.baseShader.priority = 100;
	this.baseShader.zValue__ = 0.;
	this.baseShaderList = new hxsl.ShaderList(this.baseShader);
	this.targetsStack = [];
	this.textures = new h3d.impl.TextureCache();
};
$hxClasses["h2d.RenderContext"] = h2d.RenderContext;
h2d.RenderContext.__name__ = ["h2d","RenderContext"];
h2d.RenderContext.__super__ = h3d.impl.RenderContext;
h2d.RenderContext.prototype = $extend(h3d.impl.RenderContext.prototype,{
	begin: function() {
		this.texture = null;
		this.currentObj = null;
		this.bufPos = 0;
		this.stride = 0;
		this.baseShader.set_pixelAlign(false);
		this.baseShader.halfPixelInverse__.set(0.5 / this.engine.width,0.5 / this.engine.height,null,null);
		this.baseShader.viewport__.set(-this.s2d.width * 0.5,-this.s2d.height * 0.5,2 / this.s2d.width,-2 / this.s2d.height);
		this.baseShaderList.next = null;
		this.initShaders(this.baseShaderList);
		this.engine.selectMaterial(this.pass);
		this.textures.begin(this);
	}
	,initShaders: function(shaders) {
		this.currentShaders = shaders;
		this.compiledShader = this.manager.compileShaders(shaders);
		if(this.buffers == null) this.buffers = new h3d.shader.Buffers(this.compiledShader); else this.buffers.grow(this.compiledShader);
		this.manager.fillGlobals(this.buffers,this.compiledShader);
		this.engine.selectShader(this.compiledShader);
		this.engine.uploadShaderBuffers(this.buffers,0);
	}
	,end: function() {
		this.flush();
		this.texture = null;
		this.currentObj = null;
		this.baseShaderList.next = null;
		if(this.targetsStack.length != 0) throw "Missing popTarget()";
	}
	,pushTarget: function(t,startX,startY,width,height) {
		if(height == null) height = -1;
		if(width == null) width = -1;
		if(startY == null) startY = 0;
		if(startX == null) startX = 0;
		this.flush();
		this.engine.setTarget(t);
		this.initShaders(this.baseShaderList);
		if(width < 0) if(t == null) width = this.s2d.width; else width = t.width;
		if(height < 0) if(t == null) height = this.s2d.height; else height = t.height;
		this.baseShader.halfPixelInverse__.set(0.5 / (t == null?this.engine.width:t.width),0.5 / (t == null?this.engine.height:t.height),null,null);
		this.baseShader.viewport__.set(-width * 0.5 - startX,-height * 0.5 - startY,2 / width,-2 / height);
		this.targetsStack.push({ t : t, x : startX, y : startY, w : width, h : height});
	}
	,popTarget: function(restore) {
		if(restore == null) restore = true;
		this.flush();
		var tinf = this.targetsStack.pop();
		if(tinf == null) throw "Too many popTarget()";
		if(!restore) return;
		tinf = this.targetsStack[this.targetsStack.length - 1];
		var t;
		if(tinf == null) t = null; else t = tinf.t;
		var startX;
		if(tinf == null) startX = 0; else startX = tinf.x;
		var startY;
		if(tinf == null) startY = 0; else startY = tinf.y;
		var width;
		if(tinf == null) width = this.s2d.width; else width = tinf.w;
		var height;
		if(tinf == null) height = this.s2d.height; else height = tinf.h;
		this.engine.setTarget(t);
		this.initShaders(this.baseShaderList);
		this.baseShader.halfPixelInverse__.set(0.5 / (t == null?this.engine.width:t.width),0.5 / (t == null?this.engine.height:t.height),null,null);
		this.baseShader.viewport__.set(-width * 0.5 - startX,-height * 0.5 - startY,2 / width,-2 / height);
	}
	,flush: function() {
		if(this.bufPos == 0) return;
		this.beforeDraw();
		var nverts = this.bufPos / this.stride | 0;
		var tmp = new h3d.Buffer(nverts,this.stride,[h3d.BufferFlag.Quads,h3d.BufferFlag.Dynamic,h3d.BufferFlag.RawFormat],{ fileName : "RenderContext.hx", lineNumber : 110, className : "h2d.RenderContext", methodName : "flush"});
		tmp.uploadVector(this.buffer,0,nverts);
		this.engine.renderQuadBuffer(tmp,null,null);
		tmp.dispose();
		this.bufPos = 0;
		this.texture = null;
	}
	,beforeDraw: function() {
		if(this.texture == null) this.texture = h3d.mat.Texture.fromColor(16711935,null,{ fileName : "RenderContext.hx", lineNumber : 119, className : "h2d.RenderContext", methodName : "beforeDraw"});
		this.baseShader.texture__ = this.texture;
		this.texture.set_filter(this.currentObj.filter?h3d.mat.Filter.Linear:h3d.mat.Filter.Nearest);
		this.texture.set_wrap(this.currentObj.tileWrap?h3d.mat.Wrap.Repeat:h3d.mat.Wrap.Clamp);
		this.pass.setBlendMode(this.currentObj.blendMode);
		this.manager.fillParams(this.buffers,this.compiledShader,this.currentShaders);
		this.engine.selectMaterial(this.pass);
		this.engine.uploadShaderBuffers(this.buffers,1);
		this.engine.uploadShaderBuffers(this.buffers,2);
	}
	,beginDrawBatch: function(obj,texture) {
		this.beginDraw(obj,texture,false);
	}
	,beginDraw: function(obj,texture,isRelative) {
		var stride = 8;
		if(this.currentObj != null && (texture != this.texture || stride != this.stride || obj.blendMode != this.currentObj.blendMode || obj.filter != this.currentObj.filter)) this.flush();
		var shaderChanged = false;
		var paramsChanged = false;
		var objShaders = obj.shaders;
		var curShaders = this.currentShaders.next;
		while(objShaders != null && curShaders != null) {
			var s = objShaders.s;
			var t = curShaders.s;
			objShaders = objShaders.next;
			curShaders = curShaders.next;
			if(s == t) continue;
			paramsChanged = true;
			s.updateConstants(this.manager.globals);
			if(s.instance != t.instance) shaderChanged = true;
		}
		if(objShaders != null || curShaders != null || this.baseShader.isRelative__ != isRelative) shaderChanged = true;
		if(shaderChanged) {
			this.flush();
			this.baseShader.set_isRelative(isRelative);
			this.baseShader.updateConstants(this.manager.globals);
			this.baseShaderList.next = obj.shaders;
			this.initShaders(this.baseShaderList);
		} else if(paramsChanged) {
			this.flush();
			if(this.currentShaders != this.baseShaderList) throw "!";
			this.currentShaders.next = obj.shaders;
		}
		this.texture = texture;
		this.stride = stride;
		this.currentObj = obj;
	}
	,__class__: h2d.RenderContext
});
h3d.IDrawable = function() { };
$hxClasses["h3d.IDrawable"] = h3d.IDrawable;
h3d.IDrawable.__name__ = ["h3d","IDrawable"];
h3d.IDrawable.prototype = {
	__class__: h3d.IDrawable
};
h2d.Scene = function() {
	h2d.Layers.call(this,null);
	var e;
	if(h3d.Engine.CURRENT == null) throw "no current context, please do this operation after engine init/creation";
	e = h3d.Engine.CURRENT;
	this.ctx = new h2d.RenderContext(this);
	this.width = e.width;
	this.height = e.height;
	this.interactive = new Array();
	this.pushList = new Array();
	this.eventListeners = new Array();
	this.stage = hxd.Stage.getInstance();
	this.posChanged = true;
};
$hxClasses["h2d.Scene"] = h2d.Scene;
h2d.Scene.__name__ = ["h2d","Scene"];
h2d.Scene.__interfaces__ = [h3d.IDrawable];
h2d.Scene.__super__ = h2d.Layers;
h2d.Scene.prototype = $extend(h2d.Layers.prototype,{
	setFixedSize: function(w,h) {
		this.width = w;
		this.height = h;
		this.fixedSize = true;
		this.posChanged = true;
	}
	,checkResize: function() {
		if(this.fixedSize) return;
		var engine;
		if(h3d.Engine.CURRENT == null) throw "no current context, please do this operation after engine init/creation";
		engine = h3d.Engine.CURRENT;
		if(this.width != engine.width || this.height != engine.height) {
			this.width = engine.width;
			this.height = engine.height;
			this.posChanged = true;
		}
	}
	,onAlloc: function() {
		this.stage.addEventTarget($bind(this,this.onEvent));
		h2d.Layers.prototype.onAlloc.call(this);
	}
	,onDelete: function() {
		this.stage.removeEventTarget($bind(this,this.onEvent));
		h2d.Layers.prototype.onDelete.call(this);
	}
	,onEvent: function(e) {
		if(this.pendingEvents != null) this.pendingEvents.push(e);
	}
	,addEventTarget: function(i) {
		var level;
		var i1 = i;
		var lv = 0;
		while(i1 != null) {
			i1 = i1.parent;
			lv++;
		}
		level = lv;
		var _g1 = 0;
		var _g = this.interactive.length;
		while(_g1 < _g) {
			var index = _g1++;
			var i11 = i;
			var i2 = this.interactive[index];
			var lv1 = level;
			var lv2;
			var i3 = i2;
			var lv3 = 0;
			while(i3 != null) {
				i3 = i3.parent;
				lv3++;
			}
			lv2 = lv3;
			var p1 = i11;
			var p2 = i2;
			while(lv1 > lv2) {
				i11 = p1;
				p1 = p1.parent;
				lv1--;
			}
			while(lv2 > lv1) {
				i2 = p2;
				p2 = p2.parent;
				lv2--;
			}
			while(p1 != p2) {
				i11 = p1;
				p1 = p1.parent;
				i2 = p2;
				p2 = p2.parent;
			}
			if((function($this) {
				var $r;
				var id = -1;
				{
					var _g11 = 0;
					var _g2 = p1.childs.length;
					while(_g11 < _g2) {
						var k = _g11++;
						if(p1.childs[k] == i11) {
							id = k;
							break;
						}
					}
				}
				$r = id;
				return $r;
			}(this)) > (function($this) {
				var $r;
				var id1 = -1;
				{
					var _g12 = 0;
					var _g3 = p2.childs.length;
					while(_g12 < _g3) {
						var k1 = _g12++;
						if(p2.childs[k1] == i2) {
							id1 = k1;
							break;
						}
					}
				}
				$r = id1;
				return $r;
			}(this))) {
				this.interactive.splice(index,0,i);
				return;
			}
		}
		this.interactive.push(i);
	}
	,removeEventTarget: function(i) {
		var _g1 = 0;
		var _g = this.interactive.length;
		while(_g1 < _g) {
			var k = _g1++;
			if(this.interactive[k] == i) {
				this.interactive.splice(k,1);
				break;
			}
		}
	}
	,render: function(engine) {
		this.ctx.engine = engine;
		this.ctx.frame++;
		this.ctx.time += this.ctx.elapsedTime;
		this.sync(this.ctx);
		if(this.childs.length == 0) return;
		this.ctx.begin();
		this.drawRec(this.ctx);
		this.ctx.end();
	}
	,sync: function(ctx) {
		if(!this.allocated) this.onAlloc();
		if(!this.fixedSize && (this.width != ctx.engine.width || this.height != ctx.engine.height)) {
			this.width = ctx.engine.width;
			this.height = ctx.engine.height;
			this.posChanged = true;
		}
		h2d.Layers.prototype.sync.call(this,ctx);
	}
	,__class__: h2d.Scene
});
h2d.Tile = function(tex,x,y,w,h,dx,dy) {
	if(dy == null) dy = 0;
	if(dx == null) dx = 0;
	this.innerTex = tex;
	this.x = x;
	this.y = y;
	this.width = w;
	this.height = h;
	this.dx = dx;
	this.dy = dy;
	if(tex != null) this.setTexture(tex);
};
$hxClasses["h2d.Tile"] = h2d.Tile;
h2d.Tile.__name__ = ["h2d","Tile"];
h2d.Tile.fromColor = function(color,width,height,alpha,allocPos) {
	if(alpha == null) alpha = 1.;
	if(height == null) height = 1;
	if(width == null) width = 1;
	var t = new h2d.Tile(h3d.mat.Texture.fromColor(color,alpha,allocPos),0,0,1,1);
	t.width = width;
	t.height = height;
	return t;
};
h2d.Tile.fromTexture = function(t) {
	return new h2d.Tile(t,0,0,t.width,t.height);
};
h2d.Tile.prototype = {
	setTexture: function(tex) {
		this.innerTex = tex;
		if(tex != null) {
			this.u = this.x / tex.width;
			this.v = this.y / tex.height;
			this.u2 = (this.x + this.width) / tex.width;
			this.v2 = (this.y + this.height) / tex.height;
		}
	}
	,sub: function(x,y,w,h,dx,dy) {
		if(dy == null) dy = 0;
		if(dx == null) dx = 0;
		return new h2d.Tile(this.innerTex,this.x + x,this.y + y,w,h,dx,dy);
	}
	,center: function() {
		return this.sub(0,0,this.width,this.height,-(this.width >> 1),-(this.height >> 1));
	}
	,dispose: function() {
		if(this.innerTex != null) this.innerTex.dispose();
		this.innerTex = null;
	}
	,__class__: h2d.Tile
};
h2d.col = {};
h2d.col.Bounds = function() {
	this.xMin = 1e20;
	this.yMin = 1e20;
	this.xMax = -1e20;
	this.yMax = -1e20;
};
$hxClasses["h2d.col.Bounds"] = h2d.col.Bounds;
h2d.col.Bounds.__name__ = ["h2d","col","Bounds"];
h2d.col.Bounds.prototype = {
	addPos: function(x,y) {
		if(x < this.xMin) this.xMin = x;
		if(x > this.xMax) this.xMax = x;
		if(y < this.yMin) this.yMin = y;
		if(y > this.yMax) this.yMax = y;
	}
	,__class__: h2d.col.Bounds
};
h2d.col.Point = function(x,y) {
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.x = x;
	this.y = y;
};
$hxClasses["h2d.col.Point"] = h2d.col.Point;
h2d.col.Point.__name__ = ["h2d","col","Point"];
h2d.col.Point.prototype = {
	normalize: function() {
		var k = this.x * this.x + this.y * this.y;
		if(k < 1e-10) k = 0; else k = 1. / Math.sqrt(k);
		this.x *= k;
		this.y *= k;
	}
	,__class__: h2d.col.Point
};
h2d.filter = {};
h2d.filter.Filter = function() {
	this.boundsExtend = 0.;
	this.autoBounds = true;
};
$hxClasses["h2d.filter.Filter"] = h2d.filter.Filter;
h2d.filter.Filter.__name__ = ["h2d","filter","Filter"];
h2d.filter.Filter.prototype = {
	sync: function(ctx,s) {
	}
	,getBounds: function(s,bounds) {
		s.getBounds(s,bounds);
		bounds.xMin -= this.boundsExtend;
		bounds.yMin -= this.boundsExtend;
		bounds.xMax += this.boundsExtend;
		bounds.yMax += this.boundsExtend;
	}
	,draw: function(ctx,input) {
		return input;
	}
	,__class__: h2d.filter.Filter
};
h3d.BufferFlag = $hxClasses["h3d.BufferFlag"] = { __ename__ : true, __constructs__ : ["Dynamic","Triangles","Quads","Managed","RawFormat","NoAlloc"] };
h3d.BufferFlag.Dynamic = ["Dynamic",0];
h3d.BufferFlag.Dynamic.toString = $estr;
h3d.BufferFlag.Dynamic.__enum__ = h3d.BufferFlag;
h3d.BufferFlag.Triangles = ["Triangles",1];
h3d.BufferFlag.Triangles.toString = $estr;
h3d.BufferFlag.Triangles.__enum__ = h3d.BufferFlag;
h3d.BufferFlag.Quads = ["Quads",2];
h3d.BufferFlag.Quads.toString = $estr;
h3d.BufferFlag.Quads.__enum__ = h3d.BufferFlag;
h3d.BufferFlag.Managed = ["Managed",3];
h3d.BufferFlag.Managed.toString = $estr;
h3d.BufferFlag.Managed.__enum__ = h3d.BufferFlag;
h3d.BufferFlag.RawFormat = ["RawFormat",4];
h3d.BufferFlag.RawFormat.toString = $estr;
h3d.BufferFlag.RawFormat.__enum__ = h3d.BufferFlag;
h3d.BufferFlag.NoAlloc = ["NoAlloc",5];
h3d.BufferFlag.NoAlloc.toString = $estr;
h3d.BufferFlag.NoAlloc.__enum__ = h3d.BufferFlag;
h3d.BufferFlag.__empty_constructs__ = [h3d.BufferFlag.Dynamic,h3d.BufferFlag.Triangles,h3d.BufferFlag.Quads,h3d.BufferFlag.Managed,h3d.BufferFlag.RawFormat,h3d.BufferFlag.NoAlloc];
h3d.Buffer = function(vertices,stride,flags,allocPos) {
	this.id = h3d.Buffer.GUID++;
	this.vertices = vertices;
	this.flags = 0;
	this.allocPos = allocPos;
	if(flags != null) {
		var _g = 0;
		while(_g < flags.length) {
			var f = flags[_g];
			++_g;
			this.flags |= 1 << f[1];
		}
	}
	if((this.flags & 1 << h3d.BufferFlag.Quads[1]) != 0 || (this.flags & 1 << h3d.BufferFlag.Triangles[1]) != 0) this.flags |= 1 << h3d.BufferFlag.Managed[1];
	if(!((this.flags & 1 << h3d.BufferFlag.NoAlloc[1]) != 0)) ((function($this) {
		var $r;
		if(h3d.Engine.CURRENT == null) throw "no current context, please do this operation after engine init/creation";
		$r = h3d.Engine.CURRENT;
		return $r;
	}(this))).mem.allocBuffer(this,stride);
};
$hxClasses["h3d.Buffer"] = h3d.Buffer;
h3d.Buffer.__name__ = ["h3d","Buffer"];
h3d.Buffer.ofFloats = function(v,stride,flags,allocPos) {
	var nvert = v.length / stride | 0;
	var b = new h3d.Buffer(nvert,stride,flags,allocPos);
	b.uploadVector(v,0,nvert);
	return b;
};
h3d.Buffer.prototype = {
	isDisposed: function() {
		return this.buffer == null || this.buffer.vbuf == null;
	}
	,dispose: function() {
		if(this.buffer != null) {
			this.buffer.freeBuffer(this);
			this.buffer = null;
			if(this.next != null) this.next.dispose();
		}
	}
	,uploadVector: function(buf,bufPos,vertices) {
		var cur = this;
		while(vertices > 0) {
			if(cur == null) throw "Too many vertices";
			var count;
			if(vertices > cur.vertices) count = cur.vertices; else count = vertices;
			cur.buffer.uploadVertexBuffer(cur.position,count,buf,bufPos);
			bufPos += count * this.buffer.stride;
			vertices -= count;
			cur = cur.next;
		}
	}
	,__class__: h3d.Buffer
};
h3d.Camera = function(fovY,zoom,screenRatio,zNear,zFar,rightHanded) {
	if(rightHanded == null) rightHanded = false;
	if(zFar == null) zFar = 4000.;
	if(zNear == null) zNear = 0.02;
	if(screenRatio == null) screenRatio = 1.333333;
	if(zoom == null) zoom = 1.;
	if(fovY == null) fovY = 60.;
	this.viewY = 0.;
	this.viewX = 0.;
	this.fovY = fovY;
	this.zoom = zoom;
	this.screenRatio = screenRatio;
	this.zNear = zNear;
	this.zFar = zFar;
	this.rightHanded = rightHanded;
	this.pos = new h3d.Vector(2,3,4);
	this.up = new h3d.Vector(0,0,1);
	this.target = new h3d.Vector(0,0,0);
	this.m = new h3d.Matrix();
	this.mcam = new h3d.Matrix();
	this.mproj = new h3d.Matrix();
	this.update();
};
$hxClasses["h3d.Camera"] = h3d.Camera;
h3d.Camera.__name__ = ["h3d","Camera"];
h3d.Camera.prototype = {
	getInverseViewProj: function() {
		if(this.minv == null) this.minv = new h3d.Matrix();
		if(this.needInv) {
			this.minv.inverse(this.m);
			this.needInv = false;
		}
		return this.minv;
	}
	,update: function() {
		this.makeCameraMatrix(this.mcam);
		this.makeFrustumMatrix(this.mproj);
		this.m.multiply(this.mcam,this.mproj);
		this.needInv = true;
	}
	,makeCameraMatrix: function(m) {
		var az;
		if(this.rightHanded) az = this.pos.sub(this.target); else az = this.target.sub(this.pos);
		az.normalize();
		var ax = this.up.cross(az);
		ax.normalize();
		if(Math.sqrt(ax.x * ax.x + ax.y * ax.y + ax.z * ax.z) == 0) {
			ax.x = az.y;
			ax.y = az.z;
			ax.z = az.x;
		}
		var ay = new h3d.Vector(az.y * ax.z - az.z * ax.y,az.z * ax.x - az.x * ax.z,az.x * ax.y - az.y * ax.x,1);
		m._11 = ax.x;
		m._12 = ay.x;
		m._13 = az.x;
		m._14 = 0;
		m._21 = ax.y;
		m._22 = ay.y;
		m._23 = az.y;
		m._24 = 0;
		m._31 = ax.z;
		m._32 = ay.z;
		m._33 = az.z;
		m._34 = 0;
		m._41 = -ax.dot3(this.pos);
		m._42 = -ay.dot3(this.pos);
		m._43 = -az.dot3(this.pos);
		m._44 = 1;
	}
	,makeFrustumMatrix: function(m) {
		m.zero();
		var bounds = this.orthoBounds;
		if(bounds != null) {
			var w = 1 / (bounds.xMax - bounds.xMin);
			var h = 1 / (bounds.yMax - bounds.yMin);
			var d = 1 / (bounds.zMax - bounds.zMin);
			m._11 = 2 * w;
			m._22 = 2 * h;
			m._33 = d;
			m._41 = -(bounds.xMin + bounds.xMax) * w;
			m._42 = -(bounds.yMin + bounds.yMax) * h;
			m._43 = -bounds.zMin * d;
			m._44 = 1;
		} else {
			var degToRad = Math.PI / 180;
			var halfFovX = Math.atan(Math.tan(this.fovY * 0.5 * degToRad) * this.screenRatio);
			var fovX = halfFovX * 2 / degToRad;
			var scale = this.zoom / Math.tan(halfFovX);
			m._11 = scale;
			m._22 = scale * this.screenRatio;
			m._33 = this.zFar / (this.zFar - this.zNear);
			m._34 = 1;
			m._43 = -(this.zNear * this.zFar) / (this.zFar - this.zNear);
		}
		m._11 += this.viewX * m._14;
		m._21 += this.viewX * m._24;
		m._31 += this.viewX * m._34;
		m._41 += this.viewX * m._44;
		m._12 += this.viewY * m._14;
		m._22 += this.viewY * m._24;
		m._32 += this.viewY * m._34;
		m._42 += this.viewY * m._44;
		if(this.rightHanded) {
			m._33 *= -1;
			m._34 *= -1;
		}
	}
	,__class__: h3d.Camera
};
h3d.Engine = function(hardware,aa) {
	if(aa == null) aa = 0;
	if(hardware == null) hardware = true;
	this.tmpVector = new h3d.Vector();
	this.frameCount = 0;
	this.backgroundColor = -16777216;
	this.hardware = hardware;
	this.antiAlias = aa;
	this.autoResize = true;
	this.set_fullScreen(!hxd.System.get_isWindowed());
	var stage = hxd.Stage.getInstance();
	this.realFps = stage.getFrameRate();
	this.lastTime = haxe.Timer.stamp();
	stage.addResizeEvent($bind(this,this.onStageResize));
	this.driver = new h3d.impl.GlDriver();
	if(h3d.Engine.CURRENT == null) h3d.Engine.CURRENT = this;
};
$hxClasses["h3d.Engine"] = h3d.Engine;
h3d.Engine.__name__ = ["h3d","Engine"];
h3d.Engine.prototype = {
	init: function() {
		this.driver.init($bind(this,this.onCreate),!this.hardware);
	}
	,selectShader: function(shader) {
		if(this.driver.selectShader(shader)) this.shaderSwitches++;
	}
	,selectMaterial: function(pass) {
		this.driver.selectMaterial(pass);
	}
	,uploadShaderBuffers: function(buffers,which) {
		this.driver.uploadShaderBuffers(buffers,which);
	}
	,selectBuffer: function(buf) {
		if(buf.isDisposed()) return false;
		this.driver.selectBuffer(buf);
		return true;
	}
	,renderQuadBuffer: function(b,start,max) {
		if(max == null) max = -1;
		if(start == null) start = 0;
		return this.renderBuffer(b,this.mem.quadIndexes,2,start,max);
	}
	,renderBuffer: function(b,indexes,vertPerTri,startTri,drawTri) {
		if(drawTri == null) drawTri = -1;
		if(startTri == null) startTri = 0;
		if(indexes.isDisposed()) return;
		do {
			var ntri = b.vertices / vertPerTri | 0;
			var pos = b.position / vertPerTri | 0;
			if(startTri > 0) {
				if(startTri >= ntri) {
					startTri -= ntri;
					b = b.next;
					continue;
				}
				pos += startTri;
				ntri -= startTri;
				startTri = 0;
			}
			if(drawTri >= 0) {
				if(drawTri == 0) return;
				drawTri -= ntri;
				if(drawTri < 0) {
					ntri += drawTri;
					drawTri = 0;
				}
			}
			if(ntri > 0 && this.selectBuffer(b)) {
				this.driver.draw(indexes.ibuf,pos * 3,ntri);
				this.drawTriangles += ntri;
				this.drawCalls++;
			}
			b = b.next;
		} while(b != null);
	}
	,renderIndexed: function(b,indexes,startTri,drawTri) {
		if(drawTri == null) drawTri = -1;
		if(startTri == null) startTri = 0;
		if(b.next != null) throw "Buffer is split";
		if(indexes.isDisposed()) return;
		var maxTri = indexes.count / 3 | 0;
		if(drawTri < 0) drawTri = maxTri - startTri;
		if(drawTri > 0 && this.selectBuffer(b)) {
			this.driver.draw(indexes.ibuf,startTri * 3,drawTri);
			this.drawTriangles += drawTri;
			this.drawCalls++;
		}
	}
	,set_debug: function(d) {
		this.debug = d;
		this.driver.setDebug(this.debug);
		return d;
	}
	,onCreate: function(disposed) {
		if(this.autoResize) {
			var stage = hxd.Stage.getInstance();
			this.width = stage.get_width();
			this.height = stage.get_height();
		}
		if(disposed) this.mem.onContextLost(); else {
			this.mem = new h3d.impl.MemoryManager(this.driver);
			this.mem.init();
		}
		this.hardware = this.driver.hasFeature(h3d.impl.Feature.HardwareAccelerated);
		this.set_debug(this.debug);
		this.set_fullScreen(this.fullScreen);
		this.resize(this.width,this.height);
		if(disposed) this.onContextLost(); else this.onReady();
	}
	,onContextLost: function() {
	}
	,onReady: function() {
	}
	,onStageResize: function() {
		if(this.autoResize && !this.driver.isDisposed()) {
			var stage = hxd.Stage.getInstance();
			var w = stage.get_width();
			var h = stage.get_height();
			if(w != this.width || h != this.height) this.resize(w,h);
			this.onResized();
		}
	}
	,set_fullScreen: function(v) {
		this.fullScreen = v;
		if(this.mem != null && hxd.System.get_isWindowed()) hxd.Stage.getInstance().setFullScreen(v);
		return v;
	}
	,onResized: function() {
	}
	,resize: function(width,height) {
		if(width < 32) width = 32;
		if(height < 32) height = 32;
		this.width = width;
		this.height = height;
		if(!this.driver.isDisposed()) this.driver.resize(width,height);
	}
	,begin: function() {
		if(this.driver.isDisposed()) return false;
		this.frameCount++;
		this.drawTriangles = 0;
		this.shaderSwitches = 0;
		this.drawCalls = 0;
		this.currentTarget = null;
		this.driver.begin(this.frameCount);
		if(this.backgroundColor != null) this.clear(this.backgroundColor,1,0);
		return true;
	}
	,reset: function() {
		this.driver.reset();
	}
	,hasFeature: function(f) {
		return this.driver.hasFeature(f);
	}
	,end: function() {
		this.driver.present();
		this.reset();
	}
	,setTarget: function(tex) {
		var prev = this.currentTarget;
		if(prev == tex) return prev;
		this.currentTarget = tex;
		this.driver.setRenderTarget(tex);
		return prev;
	}
	,clear: function(color,depth,stencil) {
		if(color != null) this.tmpVector.setColor(color,null);
		this.driver.clear(color == null?null:this.tmpVector,depth,stencil);
	}
	,render: function(obj) {
		if(!this.begin()) return false;
		obj.render(this);
		this.end();
		var delta = haxe.Timer.stamp() - this.lastTime;
		this.lastTime += delta;
		if(delta > 0) {
			var curFps = 1. / delta;
			if(curFps > this.realFps * 2) curFps = this.realFps * 2; else if(curFps < this.realFps * 0.5) curFps = this.realFps * 0.5;
			var f = delta / .5;
			if(f > 0.3) f = 0.3;
			this.realFps = this.realFps * (1 - f) + curFps * f;
		}
		return true;
	}
	,dispose: function() {
		this.driver.dispose();
		hxd.Stage.getInstance().removeResizeEvent($bind(this,this.onStageResize));
	}
	,__class__: h3d.Engine
	,__properties__: {set_fullScreen:"set_fullScreen",set_debug:"set_debug"}
};
h3d.Indexes = function(count) {
	this.mem = ((function($this) {
		var $r;
		if(h3d.Engine.CURRENT == null) throw "no current context, please do this operation after engine init/creation";
		$r = h3d.Engine.CURRENT;
		return $r;
	}(this))).mem;
	this.count = count;
	this.mem.allocIndexes(this);
};
$hxClasses["h3d.Indexes"] = h3d.Indexes;
h3d.Indexes.__name__ = ["h3d","Indexes"];
h3d.Indexes.alloc = function(i) {
	var idx = new h3d.Indexes(i.length);
	idx.upload(i,0,i.length);
	return idx;
};
h3d.Indexes.prototype = {
	isDisposed: function() {
		return this.ibuf == null;
	}
	,upload: function(indexes,pos,count,bufferPos) {
		if(bufferPos == null) bufferPos = 0;
		this.mem.driver.uploadIndexBuffer(this.ibuf,pos,count,indexes,bufferPos);
	}
	,dispose: function() {
		if(this.ibuf != null) this.mem.deleteIndexes(this);
	}
	,__class__: h3d.Indexes
};
h3d.Matrix = function() {
};
$hxClasses["h3d.Matrix"] = h3d.Matrix;
h3d.Matrix.__name__ = ["h3d","Matrix"];
h3d.Matrix.prototype = {
	zero: function() {
		this._11 = 0.0;
		this._12 = 0.0;
		this._13 = 0.0;
		this._14 = 0.0;
		this._21 = 0.0;
		this._22 = 0.0;
		this._23 = 0.0;
		this._24 = 0.0;
		this._31 = 0.0;
		this._32 = 0.0;
		this._33 = 0.0;
		this._34 = 0.0;
		this._41 = 0.0;
		this._42 = 0.0;
		this._43 = 0.0;
		this._44 = 0.0;
	}
	,identity: function() {
		this._11 = 1.0;
		this._12 = 0.0;
		this._13 = 0.0;
		this._14 = 0.0;
		this._21 = 0.0;
		this._22 = 1.0;
		this._23 = 0.0;
		this._24 = 0.0;
		this._31 = 0.0;
		this._32 = 0.0;
		this._33 = 1.0;
		this._34 = 0.0;
		this._41 = 0.0;
		this._42 = 0.0;
		this._43 = 0.0;
		this._44 = 1.0;
	}
	,multiply3x4: function(a,b) {
		this.multiply3x4inline(a,b);
	}
	,multiply3x4inline: function(a,b) {
		var m11 = a._11;
		var m12 = a._12;
		var m13 = a._13;
		var m21 = a._21;
		var m22 = a._22;
		var m23 = a._23;
		var a31 = a._31;
		var a32 = a._32;
		var a33 = a._33;
		var a41 = a._41;
		var a42 = a._42;
		var a43 = a._43;
		var b11 = b._11;
		var b12 = b._12;
		var b13 = b._13;
		var b21 = b._21;
		var b22 = b._22;
		var b23 = b._23;
		var b31 = b._31;
		var b32 = b._32;
		var b33 = b._33;
		var b41 = b._41;
		var b42 = b._42;
		var b43 = b._43;
		this._11 = m11 * b11 + m12 * b21 + m13 * b31;
		this._12 = m11 * b12 + m12 * b22 + m13 * b32;
		this._13 = m11 * b13 + m12 * b23 + m13 * b33;
		this._14 = 0;
		this._21 = m21 * b11 + m22 * b21 + m23 * b31;
		this._22 = m21 * b12 + m22 * b22 + m23 * b32;
		this._23 = m21 * b13 + m22 * b23 + m23 * b33;
		this._24 = 0;
		this._31 = a31 * b11 + a32 * b21 + a33 * b31;
		this._32 = a31 * b12 + a32 * b22 + a33 * b32;
		this._33 = a31 * b13 + a32 * b23 + a33 * b33;
		this._34 = 0;
		this._41 = a41 * b11 + a42 * b21 + a43 * b31 + b41;
		this._42 = a41 * b12 + a42 * b22 + a43 * b32 + b42;
		this._43 = a41 * b13 + a42 * b23 + a43 * b33 + b43;
		this._44 = 1;
	}
	,multiply: function(a,b) {
		var a11 = a._11;
		var a12 = a._12;
		var a13 = a._13;
		var a14 = a._14;
		var a21 = a._21;
		var a22 = a._22;
		var a23 = a._23;
		var a24 = a._24;
		var a31 = a._31;
		var a32 = a._32;
		var a33 = a._33;
		var a34 = a._34;
		var a41 = a._41;
		var a42 = a._42;
		var a43 = a._43;
		var a44 = a._44;
		var b11 = b._11;
		var b12 = b._12;
		var b13 = b._13;
		var b14 = b._14;
		var b21 = b._21;
		var b22 = b._22;
		var b23 = b._23;
		var b24 = b._24;
		var b31 = b._31;
		var b32 = b._32;
		var b33 = b._33;
		var b34 = b._34;
		var b41 = b._41;
		var b42 = b._42;
		var b43 = b._43;
		var b44 = b._44;
		this._11 = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
		this._12 = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
		this._13 = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
		this._14 = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
		this._21 = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
		this._22 = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
		this._23 = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
		this._24 = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
		this._31 = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
		this._32 = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
		this._33 = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
		this._34 = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
		this._41 = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
		this._42 = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
		this._43 = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
		this._44 = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
	}
	,inverse3x4: function(m) {
		var m11 = m._11;
		var m12 = m._12;
		var m13 = m._13;
		var m21 = m._21;
		var m22 = m._22;
		var m23 = m._23;
		var m31 = m._31;
		var m32 = m._32;
		var m33 = m._33;
		var m41 = m._41;
		var m42 = m._42;
		var m43 = m._43;
		this._11 = m22 * m33 - m23 * m32;
		this._12 = m13 * m32 - m12 * m33;
		this._13 = m12 * m23 - m13 * m22;
		this._14 = 0;
		this._21 = m23 * m31 - m21 * m33;
		this._22 = m11 * m33 - m13 * m31;
		this._23 = m13 * m21 - m11 * m23;
		this._24 = 0;
		this._31 = m21 * m32 - m22 * m31;
		this._32 = m12 * m31 - m11 * m32;
		this._33 = m11 * m22 - m12 * m21;
		this._34 = 0;
		this._41 = -m21 * m32 * m43 + m21 * m33 * m42 + m31 * m22 * m43 - m31 * m23 * m42 - m41 * m22 * m33 + m41 * m23 * m32;
		this._42 = m11 * m32 * m43 - m11 * m33 * m42 - m31 * m12 * m43 + m31 * m13 * m42 + m41 * m12 * m33 - m41 * m13 * m32;
		this._43 = -m11 * m22 * m43 + m11 * m23 * m42 + m21 * m12 * m43 - m21 * m13 * m42 - m41 * m12 * m23 + m41 * m13 * m22;
		this._44 = m11 * m22 * m33 - m11 * m23 * m32 - m21 * m12 * m33 + m21 * m13 * m32 + m31 * m12 * m23 - m31 * m13 * m22;
		this._44 = 1;
		var det = m11 * this._11 + m12 * this._21 + m13 * this._31;
		if((det < 0?-det:det) < 1e-10) {
			this.zero();
			return;
		}
		var invDet = 1.0 / det;
		this._11 *= invDet;
		this._12 *= invDet;
		this._13 *= invDet;
		this._21 *= invDet;
		this._22 *= invDet;
		this._23 *= invDet;
		this._31 *= invDet;
		this._32 *= invDet;
		this._33 *= invDet;
		this._41 *= invDet;
		this._42 *= invDet;
		this._43 *= invDet;
	}
	,inverse: function(m) {
		var m11 = m._11;
		var m12 = m._12;
		var m13 = m._13;
		var m14 = m._14;
		var m21 = m._21;
		var m22 = m._22;
		var m23 = m._23;
		var m24 = m._24;
		var m31 = m._31;
		var m32 = m._32;
		var m33 = m._33;
		var m34 = m._34;
		var m41 = m._41;
		var m42 = m._42;
		var m43 = m._43;
		var m44 = m._44;
		this._11 = m22 * m33 * m44 - m22 * m34 * m43 - m32 * m23 * m44 + m32 * m24 * m43 + m42 * m23 * m34 - m42 * m24 * m33;
		this._12 = -m12 * m33 * m44 + m12 * m34 * m43 + m32 * m13 * m44 - m32 * m14 * m43 - m42 * m13 * m34 + m42 * m14 * m33;
		this._13 = m12 * m23 * m44 - m12 * m24 * m43 - m22 * m13 * m44 + m22 * m14 * m43 + m42 * m13 * m24 - m42 * m14 * m23;
		this._14 = -m12 * m23 * m34 + m12 * m24 * m33 + m22 * m13 * m34 - m22 * m14 * m33 - m32 * m13 * m24 + m32 * m14 * m23;
		this._21 = -m21 * m33 * m44 + m21 * m34 * m43 + m31 * m23 * m44 - m31 * m24 * m43 - m41 * m23 * m34 + m41 * m24 * m33;
		this._22 = m11 * m33 * m44 - m11 * m34 * m43 - m31 * m13 * m44 + m31 * m14 * m43 + m41 * m13 * m34 - m41 * m14 * m33;
		this._23 = -m11 * m23 * m44 + m11 * m24 * m43 + m21 * m13 * m44 - m21 * m14 * m43 - m41 * m13 * m24 + m41 * m14 * m23;
		this._24 = m11 * m23 * m34 - m11 * m24 * m33 - m21 * m13 * m34 + m21 * m14 * m33 + m31 * m13 * m24 - m31 * m14 * m23;
		this._31 = m21 * m32 * m44 - m21 * m34 * m42 - m31 * m22 * m44 + m31 * m24 * m42 + m41 * m22 * m34 - m41 * m24 * m32;
		this._32 = -m11 * m32 * m44 + m11 * m34 * m42 + m31 * m12 * m44 - m31 * m14 * m42 - m41 * m12 * m34 + m41 * m14 * m32;
		this._33 = m11 * m22 * m44 - m11 * m24 * m42 - m21 * m12 * m44 + m21 * m14 * m42 + m41 * m12 * m24 - m41 * m14 * m22;
		this._34 = -m11 * m22 * m34 + m11 * m24 * m32 + m21 * m12 * m34 - m21 * m14 * m32 - m31 * m12 * m24 + m31 * m14 * m22;
		this._41 = -m21 * m32 * m43 + m21 * m33 * m42 + m31 * m22 * m43 - m31 * m23 * m42 - m41 * m22 * m33 + m41 * m23 * m32;
		this._42 = m11 * m32 * m43 - m11 * m33 * m42 - m31 * m12 * m43 + m31 * m13 * m42 + m41 * m12 * m33 - m41 * m13 * m32;
		this._43 = -m11 * m22 * m43 + m11 * m23 * m42 + m21 * m12 * m43 - m21 * m13 * m42 - m41 * m12 * m23 + m41 * m13 * m22;
		this._44 = m11 * m22 * m33 - m11 * m23 * m32 - m21 * m12 * m33 + m21 * m13 * m32 + m31 * m12 * m23 - m31 * m13 * m22;
		var det = m11 * this._11 + m12 * this._21 + m13 * this._31 + m14 * this._41;
		if((det < 0?-det:det) < 1e-10) {
			this.zero();
			return;
		}
		det = 1.0 / det;
		this._11 *= det;
		this._12 *= det;
		this._13 *= det;
		this._14 *= det;
		this._21 *= det;
		this._22 *= det;
		this._23 *= det;
		this._24 *= det;
		this._31 *= det;
		this._32 *= det;
		this._33 *= det;
		this._34 *= det;
		this._41 *= det;
		this._42 *= det;
		this._43 *= det;
		this._44 *= det;
	}
	,__class__: h3d.Matrix
};
h3d.Quat = function(x,y,z,w) {
	if(w == null) w = 1.;
	if(z == null) z = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
};
$hxClasses["h3d.Quat"] = h3d.Quat;
h3d.Quat.__name__ = ["h3d","Quat"];
h3d.Quat.prototype = {
	initRotate: function(ax,ay,az) {
		var sinX = Math.sin(ax * 0.5);
		var cosX = Math.cos(ax * 0.5);
		var sinY = Math.sin(ay * 0.5);
		var cosY = Math.cos(ay * 0.5);
		var sinZ = Math.sin(az * 0.5);
		var cosZ = Math.cos(az * 0.5);
		var cosYZ = cosY * cosZ;
		var sinYZ = sinY * sinZ;
		this.x = sinX * cosYZ - cosX * sinYZ;
		this.y = cosX * sinY * cosZ + sinX * cosY * sinZ;
		this.z = cosX * cosY * sinZ - sinX * sinY * cosZ;
		this.w = cosX * cosYZ + sinX * sinYZ;
	}
	,saveToMatrix: function(m) {
		var xx = this.x * this.x;
		var xy = this.x * this.y;
		var xz = this.x * this.z;
		var xw = this.x * this.w;
		var yy = this.y * this.y;
		var yz = this.y * this.z;
		var yw = this.y * this.w;
		var zz = this.z * this.z;
		var zw = this.z * this.w;
		m._11 = 1 - 2 * (yy + zz);
		m._12 = 2 * (xy + zw);
		m._13 = 2 * (xz - yw);
		m._14 = 0;
		m._21 = 2 * (xy - zw);
		m._22 = 1 - 2 * (xx + zz);
		m._23 = 2 * (yz + xw);
		m._24 = 0;
		m._31 = 2 * (xz + yw);
		m._32 = 2 * (yz - xw);
		m._33 = 1 - 2 * (xx + yy);
		m._34 = 0;
		m._41 = 0;
		m._42 = 0;
		m._43 = 0;
		m._44 = 1;
		return m;
	}
	,__class__: h3d.Quat
};
h3d.Vector = function(x,y,z,w) {
	if(w == null) w = 1.;
	if(z == null) z = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.x = x;
	this.y = y;
	this.z = z;
	this.w = w;
};
$hxClasses["h3d.Vector"] = h3d.Vector;
h3d.Vector.__name__ = ["h3d","Vector"];
h3d.Vector.prototype = {
	sub: function(v) {
		return new h3d.Vector(this.x - v.x,this.y - v.y,this.z - v.z,this.w - v.w);
	}
	,cross: function(v) {
		return new h3d.Vector(this.y * v.z - this.z * v.y,this.z * v.x - this.x * v.z,this.x * v.y - this.y * v.x,1);
	}
	,dot3: function(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	}
	,normalize: function() {
		var k = this.x * this.x + this.y * this.y + this.z * this.z;
		if(k < 1e-10) k = 0; else k = 1. / Math.sqrt(k);
		this.x *= k;
		this.y *= k;
		this.z *= k;
	}
	,set: function(x,y,z,w) {
		if(w == null) w = 1.;
		if(z == null) z = 0.;
		if(y == null) y = 0.;
		if(x == null) x = 0.;
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}
	,load: function(v) {
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		this.w = v.w;
	}
	,setColor: function(c,scale) {
		if(scale == null) scale = 1.0;
		var s = scale / 255;
		this.x = (c >> 16 & 255) * s;
		this.y = (c >> 8 & 255) * s;
		this.z = (c & 255) * s;
		this.w = (c >>> 24) * s;
	}
	,__class__: h3d.Vector
};
h3d.anim = {};
h3d.anim._Animation = {};
h3d.anim._Animation.AnimWait = function() { };
$hxClasses["h3d.anim._Animation.AnimWait"] = h3d.anim._Animation.AnimWait;
h3d.anim._Animation.AnimWait.__name__ = ["h3d","anim","_Animation","AnimWait"];
h3d.anim._Animation.AnimWait.prototype = {
	__class__: h3d.anim._Animation.AnimWait
};
h3d.anim.Animation = function() { };
$hxClasses["h3d.anim.Animation"] = h3d.anim.Animation;
h3d.anim.Animation.__name__ = ["h3d","anim","Animation"];
h3d.anim.Animation.prototype = {
	sync: function(decompose) {
		if(decompose == null) decompose = false;
		throw "assert";
	}
	,isPlaying: function() {
		return !this.pause && (this.speed < 0?-this.speed:this.speed) > 0.000001;
	}
	,endFrame: function() {
		return this.frameCount;
	}
	,update: function(dt) {
		if(!this.isInstance) throw "You must instanciate this animation first";
		if(!this.isPlaying()) return 0;
		var w = this.waits;
		var prev = null;
		while(w != null) {
			var wt = (w.frame - this.frame) / (this.speed * this.sampling);
			if(wt <= 0) {
				prev = w;
				w = w.next;
				continue;
			}
			if(wt > dt) break;
			this.frame = w.frame;
			dt -= wt;
			if(prev == null) this.waits = w.next; else prev.next = w.next;
			w.callb();
			return dt;
		}
		if(this.onAnimEnd != null) {
			var end = this.endFrame();
			var et = (end - this.frame) / (this.speed * this.sampling);
			if(et <= dt && et > 0) {
				this.frame = end;
				dt -= et;
				this.onAnimEnd();
				if(this.frame == end && this.isPlaying()) {
					if(this.loop) this.frame = 0; else dt = 0;
				}
				return dt;
			}
		}
		this.frame += dt * this.speed * this.sampling;
		if(this.frame >= this.frameCount) {
			if(this.loop) this.frame %= this.frameCount; else this.frame = this.frameCount;
		}
		return 0;
	}
	,__class__: h3d.anim.Animation
};
h3d.col = {};
h3d.col.Bounds = function() {
	this.xMin = 1e20;
	this.xMax = -1e20;
	this.yMin = 1e20;
	this.yMax = -1e20;
	this.zMin = 1e20;
	this.zMax = -1e20;
};
$hxClasses["h3d.col.Bounds"] = h3d.col.Bounds;
h3d.col.Bounds.__name__ = ["h3d","col","Bounds"];
h3d.col.Bounds.prototype = {
	empty: function() {
		this.xMin = 1e20;
		this.xMax = -1e20;
		this.yMin = 1e20;
		this.yMax = -1e20;
		this.zMin = 1e20;
		this.zMax = -1e20;
	}
	,__class__: h3d.col.Bounds
};
h3d.col.Frustum = function(mvp) {
	this.checkNearFar = true;
	this.pleft = new h3d.col.Plane(mvp._14 + mvp._11,mvp._24 + mvp._21,mvp._34 + mvp._31,-(mvp._44 + mvp._41));
	this.pright = new h3d.col.Plane(mvp._14 - mvp._11,mvp._24 - mvp._21,mvp._34 - mvp._31,mvp._41 - mvp._44);
	this.ptop = new h3d.col.Plane(mvp._14 - mvp._12,mvp._24 - mvp._22,mvp._34 - mvp._32,mvp._42 - mvp._44);
	this.pbottom = new h3d.col.Plane(mvp._14 + mvp._12,mvp._24 + mvp._22,mvp._34 + mvp._32,-(mvp._44 + mvp._42));
	this.pnear = new h3d.col.Plane(mvp._13,mvp._23,mvp._33,-mvp._43);
	this.pfar = new h3d.col.Plane(mvp._14 - mvp._13,mvp._24 - mvp._23,mvp._34 - mvp._33,mvp._43 - mvp._44);
	this.pleft.normalize();
	this.pright.normalize();
	this.ptop.normalize();
	this.pbottom.normalize();
	this.pnear.normalize();
	this.pfar.normalize();
};
$hxClasses["h3d.col.Frustum"] = h3d.col.Frustum;
h3d.col.Frustum.__name__ = ["h3d","col","Frustum"];
h3d.col.Frustum.prototype = {
	checkSphere: function(s) {
		var p = new h3d.col.Point(s.x,s.y,s.z);
		if(this.pleft.distance(p) < -s.r) return false;
		if(this.pright.distance(p) < -s.r) return false;
		if(this.ptop.distance(p) < -s.r) return false;
		if(this.pbottom.distance(p) < -s.r) return false;
		if(this.checkNearFar) {
			if(this.pnear.distance(p) < -s.r) return false;
			if(this.pfar.distance(p) < -s.r) return false;
		}
		return true;
	}
	,__class__: h3d.col.Frustum
};
h3d.col.Plane = function(nx,ny,nz,d) {
	this.nx = nx;
	this.ny = ny;
	this.nz = nz;
	this.d = d;
};
$hxClasses["h3d.col.Plane"] = h3d.col.Plane;
h3d.col.Plane.__name__ = ["h3d","col","Plane"];
h3d.col.Plane.prototype = {
	normalize: function() {
		var len = 1. / Math.sqrt(this.nx * this.nx + this.ny * this.ny + this.nz * this.nz);
		this.nx *= len;
		this.ny *= len;
		this.nz *= len;
		this.d *= len;
	}
	,distance: function(p) {
		return this.nx * p.x + this.ny * p.y + this.nz * p.z - this.d;
	}
	,__class__: h3d.col.Plane
};
h3d.col.Point = function(x,y,z) {
	if(z == null) z = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.x = x;
	this.y = y;
	this.z = z;
};
$hxClasses["h3d.col.Point"] = h3d.col.Point;
h3d.col.Point.__name__ = ["h3d","col","Point"];
h3d.col.Point.prototype = {
	normalize: function() {
		var k = this.x * this.x + this.y * this.y + this.z * this.z;
		if(k < 1e-10) k = 0; else k = 1. / Math.sqrt(k);
		this.x *= k;
		this.y *= k;
		this.z *= k;
	}
	,__class__: h3d.col.Point
};
h3d.col.Sphere = function(x,y,z,r) {
	if(r == null) r = 0.;
	if(z == null) z = 0.;
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.x = x;
	this.y = y;
	this.z = z;
	this.r = r;
};
$hxClasses["h3d.col.Sphere"] = h3d.col.Sphere;
h3d.col.Sphere.__name__ = ["h3d","col","Sphere"];
h3d.col.Sphere.prototype = {
	__class__: h3d.col.Sphere
};
h3d.impl.Feature = $hxClasses["h3d.impl.Feature"] = { __ename__ : true, __constructs__ : ["StandardDerivatives","FloatTextures","PerTargetDepthBuffer","TargetUseDefaultDepthBuffer","HardwareAccelerated","FullClearRequired"] };
h3d.impl.Feature.StandardDerivatives = ["StandardDerivatives",0];
h3d.impl.Feature.StandardDerivatives.toString = $estr;
h3d.impl.Feature.StandardDerivatives.__enum__ = h3d.impl.Feature;
h3d.impl.Feature.FloatTextures = ["FloatTextures",1];
h3d.impl.Feature.FloatTextures.toString = $estr;
h3d.impl.Feature.FloatTextures.__enum__ = h3d.impl.Feature;
h3d.impl.Feature.PerTargetDepthBuffer = ["PerTargetDepthBuffer",2];
h3d.impl.Feature.PerTargetDepthBuffer.toString = $estr;
h3d.impl.Feature.PerTargetDepthBuffer.__enum__ = h3d.impl.Feature;
h3d.impl.Feature.TargetUseDefaultDepthBuffer = ["TargetUseDefaultDepthBuffer",3];
h3d.impl.Feature.TargetUseDefaultDepthBuffer.toString = $estr;
h3d.impl.Feature.TargetUseDefaultDepthBuffer.__enum__ = h3d.impl.Feature;
h3d.impl.Feature.HardwareAccelerated = ["HardwareAccelerated",4];
h3d.impl.Feature.HardwareAccelerated.toString = $estr;
h3d.impl.Feature.HardwareAccelerated.__enum__ = h3d.impl.Feature;
h3d.impl.Feature.FullClearRequired = ["FullClearRequired",5];
h3d.impl.Feature.FullClearRequired.toString = $estr;
h3d.impl.Feature.FullClearRequired.__enum__ = h3d.impl.Feature;
h3d.impl.Feature.__empty_constructs__ = [h3d.impl.Feature.StandardDerivatives,h3d.impl.Feature.FloatTextures,h3d.impl.Feature.PerTargetDepthBuffer,h3d.impl.Feature.TargetUseDefaultDepthBuffer,h3d.impl.Feature.HardwareAccelerated,h3d.impl.Feature.FullClearRequired];
h3d.impl.Driver = function() { };
$hxClasses["h3d.impl.Driver"] = h3d.impl.Driver;
h3d.impl.Driver.__name__ = ["h3d","impl","Driver"];
h3d.impl.Driver.prototype = {
	hasFeature: function(f) {
		return false;
	}
	,isDisposed: function() {
		return true;
	}
	,dispose: function() {
	}
	,begin: function(frame) {
	}
	,log: function(str) {
		if(this.logEnable) this.logImpl(str);
	}
	,logImpl: function(str) {
	}
	,clear: function(color,depth,stencil) {
	}
	,reset: function() {
	}
	,init: function(onCreate,forceSoftware) {
		if(forceSoftware == null) forceSoftware = false;
	}
	,resize: function(width,height) {
	}
	,selectShader: function(shader) {
		return false;
	}
	,selectMaterial: function(pass) {
	}
	,uploadShaderBuffers: function(buffers,which) {
	}
	,selectBuffer: function(buffer) {
	}
	,draw: function(ibuf,startIndex,ntriangles) {
	}
	,setRenderTarget: function(tex) {
	}
	,present: function() {
	}
	,setDebug: function(b) {
	}
	,allocTexture: function(t) {
		return null;
	}
	,allocIndexes: function(count) {
		return null;
	}
	,allocVertexes: function(m) {
		return null;
	}
	,disposeTexture: function(t) {
	}
	,disposeIndexes: function(i) {
	}
	,disposeVertexes: function(v) {
	}
	,uploadIndexBuffer: function(i,startIndice,indiceCount,buf,bufPos) {
	}
	,uploadVertexBuffer: function(v,startVertex,vertexCount,buf,bufPos) {
	}
	,uploadTextureBitmap: function(t,bmp,mipLevel,side) {
	}
	,uploadTexturePixels: function(t,pixels,mipLevel,side) {
	}
	,__class__: h3d.impl.Driver
};
h3d.impl._GlDriver = {};
h3d.impl._GlDriver.CompiledShader = function(s,vertex,shader) {
	this.s = s;
	this.vertex = vertex;
	this.shader = shader;
};
$hxClasses["h3d.impl._GlDriver.CompiledShader"] = h3d.impl._GlDriver.CompiledShader;
h3d.impl._GlDriver.CompiledShader.__name__ = ["h3d","impl","_GlDriver","CompiledShader"];
h3d.impl._GlDriver.CompiledShader.prototype = {
	__class__: h3d.impl._GlDriver.CompiledShader
};
h3d.impl._GlDriver.CompiledProgram = function() {
};
$hxClasses["h3d.impl._GlDriver.CompiledProgram"] = h3d.impl._GlDriver.CompiledProgram;
h3d.impl._GlDriver.CompiledProgram.__name__ = ["h3d","impl","_GlDriver","CompiledProgram"];
h3d.impl._GlDriver.CompiledProgram.prototype = {
	__class__: h3d.impl._GlDriver.CompiledProgram
};
h3d.impl.GlDriver = function() {
	this.canvas = hxd.Stage.getCanvas();
	if(this.canvas == null) throw "Canvas #webgl not found";
	this.gl = js.html._CanvasElement.CanvasUtil.getContextWebGL(this.canvas,{ alpha : false});
	if(this.gl == null) throw "Could not acquire GL context";
	if(typeof(WebGLDebugUtils) != "undefined") this.gl = WebGLDebugUtils.makeDebugContext(this.gl);
	this.programs = new haxe.ds.IntMap();
	this.curAttribs = 0;
	this.curMatBits = -1;
	this.gl.pixelStorei(37440,1);
};
$hxClasses["h3d.impl.GlDriver"] = h3d.impl.GlDriver;
h3d.impl.GlDriver.__name__ = ["h3d","impl","GlDriver"];
h3d.impl.GlDriver.__super__ = h3d.impl.Driver;
h3d.impl.GlDriver.prototype = $extend(h3d.impl.Driver.prototype,{
	logImpl: function(str) {
		console.log(str);
	}
	,begin: function(frame) {
		this.frame = frame;
		this.reset();
	}
	,reset: function() {
		this.gl.useProgram(null);
		this.curShader = null;
		this.curBuffer = null;
	}
	,compileShader: function(glout,shader) {
		var type;
		if(shader.vertex) type = 35633; else type = 35632;
		var s = this.gl.createShader(type);
		var code = glout.run(shader.data);
		this.gl.shaderSource(s,code);
		this.gl.compileShader(s);
		if(this.gl.getShaderParameter(s,35713) != 1) {
			var log = this.gl.getShaderInfoLog(s);
			var line = code.split("\n")[Std.parseInt(HxOverrides.substr(log,9,null)) - 1];
			if(line == null) line = ""; else line = "(" + StringTools.trim(line) + ")";
			throw "An error occurred compiling the shaders: " + log + line;
		}
		return new h3d.impl._GlDriver.CompiledShader(s,shader.vertex,shader);
	}
	,initShader: function(p,s,shader) {
		var prefix;
		if(s.vertex) prefix = "vertex"; else prefix = "fragment";
		s.globals = this.gl.getUniformLocation(p.p,prefix + "Globals");
		s.params = this.gl.getUniformLocation(p.p,prefix + "Params");
		var _g = [];
		var _g2 = 0;
		var _g1 = shader.textures2DCount;
		while(_g2 < _g1) {
			var i = _g2++;
			_g.push(this.gl.getUniformLocation(p.p,prefix + "Textures[" + i + "]"));
		}
		s.textures = _g;
	}
	,selectShader: function(shader) {
		var p = this.programs.get(shader.id);
		if(p == null) {
			p = new h3d.impl._GlDriver.CompiledProgram();
			var glout = new hxsl.GlslOut();
			p.vertex = this.compileShader(glout,shader.vertex);
			p.fragment = this.compileShader(glout,shader.fragment);
			p.p = this.gl.createProgram();
			this.gl.attachShader(p.p,p.vertex.s);
			this.gl.attachShader(p.p,p.fragment.s);
			this.gl.linkProgram(p.p);
			if(this.gl.getProgramParameter(p.p,35714) != 1) {
				var log = this.gl.getProgramInfoLog(p.p);
				throw "Program linkage failure: " + log;
			}
			this.initShader(p,p.vertex,shader.vertex);
			this.initShader(p,p.fragment,shader.fragment);
			p.attribNames = [];
			p.attribs = [];
			p.stride = 0;
			var _g = 0;
			var _g1 = shader.vertex.data.vars;
			while(_g < _g1.length) {
				var v = _g1[_g];
				++_g;
				var _g2 = v.kind;
				switch(_g2[1]) {
				case 1:
					var t = 5126;
					var size;
					{
						var _g3 = v.type;
						switch(_g3[1]) {
						case 5:
							var n = _g3[2];
							size = n;
							break;
						case 9:
							var n1 = _g3[2];
							t = 5120;
							size = n1;
							break;
						case 3:
							size = 1;
							break;
						default:
							throw "assert " + Std.string(v.type);
						}
					}
					var index = this.gl.getAttribLocation(p.p,glout.varNames.get(v.id));
					if(index < 0) continue;
					p.attribs.push({ offset : p.stride, index : index, size : size, type : t});
					p.attribNames.push(v.name);
					p.stride += size;
					break;
				default:
				}
			}
			this.programs.set(shader.id,p);
		}
		if(this.curShader == p) return false;
		this.gl.useProgram(p.p);
		var _g11 = this.curAttribs;
		var _g4 = p.attribs.length;
		while(_g11 < _g4) {
			var i = _g11++;
			this.gl.enableVertexAttribArray(i);
			this.curAttribs++;
		}
		while(this.curAttribs > p.attribs.length) this.gl.disableVertexAttribArray(--this.curAttribs);
		this.curShader = p;
		this.curBuffer = null;
		return true;
	}
	,uploadShaderBuffers: function(buf,which) {
		this.uploadBuffer(this.curShader.vertex,buf.vertex,which);
		this.uploadBuffer(this.curShader.fragment,buf.fragment,which);
	}
	,uploadBuffer: function(s,buf,which) {
		switch(which) {
		case 0:
			if(s.globals != null) {
				var a = new Float32Array(buf.globals).subarray(0,s.shader.globalsSize * 4);
				this.gl.uniform4fv(s.globals,a);
			}
			break;
		case 1:
			if(s.params != null) {
				var a1 = new Float32Array(buf.params).subarray(0,s.shader.paramsSize * 4);
				this.gl.uniform4fv(s.params,a1);
			}
			break;
		case 2:
			var _g1 = 0;
			var _g = s.textures.length;
			while(_g1 < _g) {
				var i = _g1++;
				var t = buf.tex[i];
				if(t == null || t.t == null && t.realloc == null) t = h3d.mat.Texture.fromColor(16711935,null,{ fileName : "GlDriver.hx", lineNumber : 222, className : "h3d.impl.GlDriver", methodName : "uploadBuffer"});
				if(t != null && t.t == null && t.realloc != null) {
					t.alloc();
					t.realloc();
				}
				t.lastFrame = this.frame;
				this.gl.activeTexture(33984 + i);
				this.gl.uniform1i(s.textures[i],i);
				this.gl.bindTexture(3553,t.t.t);
				var flags = h3d.impl.GlDriver.TFILTERS[t.mipMap[1]][t.filter[1]];
				this.gl.texParameteri(3553,10240,flags[0]);
				this.gl.texParameteri(3553,10241,flags[1]);
				var w = h3d.impl.GlDriver.TWRAP[t.wrap[1]];
				this.gl.texParameteri(3553,10242,w);
				this.gl.texParameteri(3553,10243,w);
			}
			break;
		}
	}
	,selectMaterial: function(pass) {
		this.selectMaterialBits(pass.bits);
	}
	,selectMaterialBits: function(bits) {
		var diff = bits ^ this.curMatBits;
		if(this.curMatBits < 0) diff = -1;
		if(diff == 0) return;
		if((diff & 3) != 0) {
			var cull = bits & 3;
			if(cull == 0) this.gl.disable(2884); else {
				if((this.curMatBits & 3) == 0) this.gl.enable(2884);
				this.gl.cullFace(h3d.impl.GlDriver.FACES[cull]);
			}
		}
		if((diff & 4194240) != 0) {
			var csrc = bits >> 6 & 15;
			var cdst = bits >> 10 & 15;
			var asrc = bits >> 14 & 15;
			var adst = bits >> 18 & 15;
			if(csrc == asrc && cdst == adst) {
				if(csrc == 0 && cdst == 1) this.gl.disable(3042); else {
					if(this.curMatBits < 0 || (this.curMatBits >> 6 & 15) == 0 && (this.curMatBits >> 10 & 15) == 1) this.gl.enable(3042);
					this.gl.blendFunc(h3d.impl.GlDriver.BLEND[csrc],h3d.impl.GlDriver.BLEND[cdst]);
				}
			} else {
				if(this.curMatBits < 0 || (this.curMatBits >> 6 & 15) == 0 && (this.curMatBits >> 10 & 15) == 1) this.gl.enable(3042);
				this.gl.blendFuncSeparate(h3d.impl.GlDriver.BLEND[csrc],h3d.impl.GlDriver.BLEND[cdst],h3d.impl.GlDriver.BLEND[asrc],h3d.impl.GlDriver.BLEND[adst]);
			}
		}
		if((diff & 62914560) != 0) {
			var cop = bits >> 22 & 3;
			var aop = bits >> 24 & 3;
			if(cop == aop) this.gl.blendEquation(h3d.impl.GlDriver.OP[cop]); else this.gl.blendEquationSeparate(h3d.impl.GlDriver.OP[cop],h3d.impl.GlDriver.OP[aop]);
		}
		if((diff & 4) != 0) this.gl.depthMask((bits >> 2 & 1) != 0);
		if((diff & 56) != 0) {
			var cmp = bits >> 3 & 7;
			if(cmp == 0) this.gl.disable(2929); else {
				if(this.curMatBits < 0 || (this.curMatBits >> 3 & 7) == 0) this.gl.enable(2929);
				this.gl.depthFunc(h3d.impl.GlDriver.COMPARE[cmp]);
			}
		}
		if((diff & 1006632960) != 0) {
			var m = bits >> 26 & 15;
			this.gl.colorMask((m & 1) != 0,(m & 2) != 0,(m & 4) != 0,(m & 8) != 0);
		}
		this.curMatBits = bits;
	}
	,clear: function(color,depth,stencil) {
		var bits = 0;
		if(color != null) {
			this.gl.clearColor(color.x,color.y,color.z,color.w);
			bits |= 16384;
		}
		if(depth != null) {
			this.gl.clearDepth(depth);
			bits |= 256;
		}
		if(stencil != null) {
			this.gl.clearStencil(stencil);
			bits |= 1024;
		}
		if(bits != 0) this.gl.clear(bits);
	}
	,resize: function(width,height) {
		if(this.canvas.style.width == "") {
			this.canvas.style.width = (width / window.devicePixelRatio | 0) + "px";
			this.canvas.style.height = (height / window.devicePixelRatio | 0) + "px";
		}
		this.canvas.width = width;
		this.canvas.height = height;
		this.bufferWidth = width;
		this.bufferHeight = height;
		this.gl.viewport(0,0,width,height);
	}
	,allocTexture: function(t) {
		if((t.flags & 1 << h3d.mat.TextureFlags.TargetUseDefaultDepth[1]) != 0) throw "TargetUseDefaultDepth not supported in GL";
		var tt = this.gl.createTexture();
		var tt1 = { t : tt, width : t.width, height : t.height, fmt : 5121};
		if((t.flags & 1 << h3d.mat.TextureFlags.FmtFloat[1]) != 0) tt1.fmt = 5126; else if((t.flags & 1 << h3d.mat.TextureFlags.Fmt5_5_5_1[1]) != 0) tt1.fmt = 32820; else if((t.flags & 1 << h3d.mat.TextureFlags.Fmt5_6_5[1]) != 0) tt1.fmt = 33635; else if((t.flags & 1 << h3d.mat.TextureFlags.Fmt4_4_4_4[1]) != 0) tt1.fmt = 32819;
		t.lastFrame = this.frame;
		this.gl.bindTexture(3553,tt1.t);
		var mipMap;
		if((t.flags & 1 << h3d.mat.TextureFlags.MipMapped[1]) != 0) mipMap = 9985; else mipMap = 9729;
		this.gl.texParameteri(3553,10240,mipMap);
		this.gl.texParameteri(3553,10241,mipMap);
		this.gl.texImage2D(3553,0,6408,tt1.width,tt1.height,0,6408,tt1.fmt,null);
		if((t.flags & 1 << h3d.mat.TextureFlags.Target[1]) != 0) {
			var fb = this.gl.createFramebuffer();
			this.gl.bindFramebuffer(36160,fb);
			this.gl.framebufferTexture2D(36160,36064,3553,tt1.t,0);
			tt1.fb = fb;
			if((t.flags & 1 << h3d.mat.TextureFlags.TargetDepth[1]) != 0) {
				tt1.rb = this.gl.createRenderbuffer();
				this.gl.bindRenderbuffer(36161,tt1.rb);
				this.gl.renderbufferStorage(36161,33189,tt1.width,tt1.height);
				this.gl.framebufferRenderbuffer(36160,36096,36161,tt1.rb);
				this.gl.bindRenderbuffer(36161,null);
			}
			this.gl.bindFramebuffer(36160,null);
		}
		this.gl.bindTexture(3553,null);
		return tt1;
	}
	,allocVertexes: function(m) {
		var b = this.gl.createBuffer();
		this.gl.bindBuffer(34962,b);
		if(m.size * m.stride == 0) throw "assert";
		this.gl.bufferData(34962,m.size * m.stride * 4,(m.flags & 1 << h3d.BufferFlag.Dynamic[1]) != 0?35048:35044);
		this.gl.bindBuffer(34962,null);
		return { b : b, stride : m.stride};
	}
	,allocIndexes: function(count) {
		var b = this.gl.createBuffer();
		this.gl.bindBuffer(34963,b);
		this.gl.bufferData(34963,count * 2,35044);
		this.gl.bindBuffer(34963,null);
		return b;
	}
	,disposeTexture: function(t) {
		this.gl.deleteTexture(t.t);
		if(t.rb != null) this.gl.deleteRenderbuffer(t.rb);
		if(t.fb != null) this.gl.deleteFramebuffer(t.fb);
	}
	,disposeIndexes: function(i) {
		this.gl.deleteBuffer(i);
	}
	,disposeVertexes: function(v) {
		this.gl.deleteBuffer(v.b);
	}
	,uploadTextureBitmap: function(t,bmp,mipLevel,side) {
		var img = bmp;
		this.gl.bindTexture(3553,t.t.t);
		this.gl.texImage2D(3553,mipLevel,6408,6408,5121,img.getImageData(0,0,bmp.canvas.width,bmp.canvas.height));
		if((t.flags & 1 << h3d.mat.TextureFlags.MipMapped[1]) != 0) this.gl.generateMipmap(3553);
		this.gl.bindTexture(3553,null);
	}
	,uploadTexturePixels: function(t,pixels,mipLevel,side) {
		this.gl.bindTexture(3553,t.t.t);
		pixels.convert(hxd.PixelFormat.RGBA);
		var pixels1 = new Uint8Array(pixels.bytes.b);
		this.gl.texImage2D(3553,mipLevel,6408,t.width,t.height,0,6408,5121,pixels1);
		if((t.flags & 1 << h3d.mat.TextureFlags.MipMapped[1]) != 0) this.gl.generateMipmap(3553);
		this.gl.bindTexture(3553,null);
	}
	,uploadVertexBuffer: function(v,startVertex,vertexCount,buf,bufPos) {
		var stride = v.stride;
		var buf1 = new Float32Array(buf);
		var sub = new Float32Array(buf1.buffer,bufPos,vertexCount * stride);
		this.gl.bindBuffer(34962,v.b);
		this.gl.bufferSubData(34962,startVertex * stride * 4,sub);
		this.gl.bindBuffer(34962,null);
	}
	,uploadIndexBuffer: function(i,startIndice,indiceCount,buf,bufPos) {
		var buf1 = new Uint16Array(buf);
		var sub = new Uint16Array(buf1.buffer,bufPos,indiceCount);
		this.gl.bindBuffer(34963,i);
		this.gl.bufferSubData(34963,startIndice * 2,sub);
		this.gl.bindBuffer(34963,null);
	}
	,selectBuffer: function(v) {
		if(v == this.curBuffer) return;
		if(this.curBuffer != null && v.buffer == this.curBuffer.buffer && (v.buffer.flags & 1 << h3d.BufferFlag.RawFormat[1]) != 0 == ((this.curBuffer.flags & 1 << h3d.BufferFlag.RawFormat[1]) != 0)) {
			this.curBuffer = v;
			return;
		}
		if(this.curShader == null) throw "No shader selected";
		this.curBuffer = v;
		var m = v.buffer.vbuf;
		if(m.stride < this.curShader.stride) throw "Buffer stride (" + m.stride + ") and shader stride (" + this.curShader.stride + ") mismatch";
		this.gl.bindBuffer(34962,m.b);
		if((v.flags & 1 << h3d.BufferFlag.RawFormat[1]) != 0) {
			var _g = 0;
			var _g1 = this.curShader.attribs;
			while(_g < _g1.length) {
				var a = _g1[_g];
				++_g;
				this.gl.vertexAttribPointer(a.index,a.size,a.type,false,m.stride * 4,a.offset * 4);
			}
		} else {
			var offset = 8;
			var _g11 = 0;
			var _g2 = this.curShader.attribs.length;
			while(_g11 < _g2) {
				var i = _g11++;
				var a1 = this.curShader.attribs[i];
				var _g21 = this.curShader.attribNames[i];
				var s = _g21;
				switch(_g21) {
				case "position":
					this.gl.vertexAttribPointer(a1.index,a1.size,a1.type,false,m.stride * 4,0);
					break;
				case "normal":
					if(m.stride < 6) throw "Buffer is missing NORMAL data, set it to RAW format ?" + Std.string(v.allocPos);
					this.gl.vertexAttribPointer(a1.index,a1.size,a1.type,false,m.stride * 4,12);
					break;
				case "uv":
					if(m.stride < 8) throw "Buffer is missing UV data, set it to RAW format ?" + Std.string(v.allocPos);
					this.gl.vertexAttribPointer(a1.index,a1.size,a1.type,false,m.stride * 4,24);
					break;
				default:
					this.gl.vertexAttribPointer(a1.index,a1.size,a1.type,false,m.stride * 4,offset * 4);
					offset += a1.size;
					if(offset > m.stride) throw "Buffer is missing '" + s + "' data, set it to RAW format ?" + Std.string(v.allocPos);
				}
			}
		}
	}
	,draw: function(ibuf,startIndex,ntriangles) {
		this.gl.bindBuffer(34963,ibuf);
		this.gl.drawElements(4,ntriangles * 3,5123,startIndex * 2);
		this.gl.bindBuffer(34963,null);
	}
	,present: function() {
		this.gl.finish();
	}
	,isDisposed: function() {
		return this.gl.isContextLost();
	}
	,setRenderTarget: function(tex) {
		if(tex == null) {
			this.gl.bindFramebuffer(36160,null);
			this.gl.viewport(0,0,this.bufferWidth,this.bufferHeight);
			return;
		}
		if(tex.t == null) tex.alloc();
		tex.lastFrame = this.frame;
		this.gl.bindFramebuffer(36160,tex.t.fb);
		this.gl.viewport(0,0,tex.width,tex.height);
	}
	,init: function(onCreate,forceSoftware) {
		if(forceSoftware == null) forceSoftware = false;
		var ready = false;
		window.addEventListener("load",function(_) {
			if(!ready) {
				ready = true;
				onCreate(false);
			}
		});
	}
	,hasFeature: function(f) {
		switch(f[1]) {
		case 0:
			return this.gl.getExtension("OES_standard_derivatives") != null;
		case 1:
			return this.gl.getExtension("OES_texture_float") != null && this.gl.getExtension("OES_texture_float_linear") != null;
		case 2:
			return true;
		case 3:
			return false;
		case 4:
			return true;
		case 5:
			return false;
		}
	}
	,__class__: h3d.impl.GlDriver
});
h3d.impl._ManagedBuffer = {};
h3d.impl._ManagedBuffer.FreeCell = function(pos,count,next) {
	this.pos = pos;
	this.count = count;
	this.next = next;
};
$hxClasses["h3d.impl._ManagedBuffer.FreeCell"] = h3d.impl._ManagedBuffer.FreeCell;
h3d.impl._ManagedBuffer.FreeCell.__name__ = ["h3d","impl","_ManagedBuffer","FreeCell"];
h3d.impl._ManagedBuffer.FreeCell.prototype = {
	__class__: h3d.impl._ManagedBuffer.FreeCell
};
h3d.impl.ManagedBuffer = function(stride,size,flags) {
	this.flags = 0;
	if(flags != null) {
		var _g = 0;
		while(_g < flags.length) {
			var f = flags[_g];
			++_g;
			this.flags |= 1 << f[1];
		}
	}
	this.mem = ((function($this) {
		var $r;
		if(h3d.Engine.CURRENT == null) throw "no current context, please do this operation after engine init/creation";
		$r = h3d.Engine.CURRENT;
		return $r;
	}(this))).mem;
	this.size = size;
	this.stride = stride;
	this.freeList = new h3d.impl._ManagedBuffer.FreeCell(0,size,null);
	this.mem.allocManaged(this);
};
$hxClasses["h3d.impl.ManagedBuffer"] = h3d.impl.ManagedBuffer;
h3d.impl.ManagedBuffer.__name__ = ["h3d","impl","ManagedBuffer"];
h3d.impl.ManagedBuffer.prototype = {
	uploadVertexBuffer: function(start,vertices,buf,bufPos) {
		if(bufPos == null) bufPos = 0;
		this.mem.driver.uploadVertexBuffer(this.vbuf,start,vertices,buf,bufPos);
	}
	,allocPosition: function(nvert,align) {
		var free = this.freeList;
		while(free != null) {
			if(free.count >= nvert) {
				var d = (align - free.pos % align) % align;
				if(d == 0) break;
				if(free.count >= nvert + d) {
					free.next = new h3d.impl._ManagedBuffer.FreeCell(free.pos + d,free.count - d,free.next);
					free.count = d;
					free = free.next;
					break;
				}
			}
			free = free.next;
		}
		if(free == null) return -1;
		var pos = free.pos;
		free.pos += nvert;
		free.count -= nvert;
		return pos;
	}
	,allocBuffer: function(b) {
		var align;
		if((b.flags & 1 << h3d.BufferFlag.Quads[1]) != 0) align = 4; else if((b.flags & 1 << h3d.BufferFlag.Triangles[1]) != 0) align = 3; else align = 1;
		var p = this.allocPosition(b.vertices,align);
		if(p < 0) return false;
		b.position = p;
		b.buffer = this;
		return true;
	}
	,freeBuffer: function(b) {
		var prev = null;
		var f = this.freeList;
		var nvert = b.vertices;
		var end = b.position + nvert;
		while(f != null) {
			if(f.pos == end) {
				f.pos -= nvert;
				f.count += nvert;
				if(prev != null && prev.pos + prev.count == f.pos) {
					prev.count += f.count;
					prev.next = f.next;
				}
				nvert = 0;
				break;
			}
			if(f.pos > end) {
				if(prev != null && prev.pos + prev.count == b.position) prev.count += nvert; else {
					var n = new h3d.impl._ManagedBuffer.FreeCell(b.position,nvert,f);
					if(prev == null) this.freeList = n; else prev.next = n;
				}
				nvert = 0;
				break;
			}
			prev = f;
			f = f.next;
		}
		if(nvert != 0) throw "assert";
		if(this.freeList.count == this.size && !((this.flags & 1 << h3d.BufferFlag.Managed[1]) != 0)) this.dispose();
	}
	,dispose: function() {
		this.mem.freeManaged(this);
	}
	,__class__: h3d.impl.ManagedBuffer
};
h3d.impl.MemoryManager = function(driver) {
	this.bufferCount = 0;
	this.texMemory = 0;
	this.usedMemory = 0;
	this.driver = driver;
};
$hxClasses["h3d.impl.MemoryManager"] = h3d.impl.MemoryManager;
h3d.impl.MemoryManager.__name__ = ["h3d","impl","MemoryManager"];
h3d.impl.MemoryManager.prototype = {
	init: function() {
		this.indexes = new Array();
		this.textures = new Array();
		this.buffers = new Array();
		this.initIndexes();
	}
	,initIndexes: function() {
		var indices;
		var this1;
		this1 = new Array(0);
		indices = this1;
		var _g = 0;
		while(_g < 65533) {
			var i = _g++;
			indices.push(i);
		}
		this.triIndexes = h3d.Indexes.alloc(indices);
		var indices1;
		var this2;
		this2 = new Array(0);
		indices1 = this2;
		var p = 0;
		var _g1 = 0;
		var _g2 = 16383;
		while(_g1 < _g2) {
			var i1 = _g1++;
			var k = i1 << 2;
			indices1.push(k);
			indices1.push(k + 1);
			indices1.push(k + 2);
			indices1.push(k + 2);
			indices1.push(k + 1);
			indices1.push(k + 3);
		}
		indices1.push(65533);
		this.quadIndexes = h3d.Indexes.alloc(indices1);
	}
	,garbage: function() {
	}
	,cleanManagedBuffers: function() {
		var _g1 = 0;
		var _g = this.buffers.length;
		while(_g1 < _g) {
			var i = _g1++;
			var b = this.buffers[i];
			var prev = null;
			while(b != null) {
				if(b.freeList.count == b.size) {
					b.dispose();
					if(prev == null) this.buffers[i] = b.next; else prev.next = b.next;
				} else prev = b;
				b = b.next;
			}
		}
	}
	,allocManaged: function(m) {
		if(m.vbuf != null) return;
		var mem = m.size * m.stride * 4;
		while(this.usedMemory + mem > 262144000 || this.bufferCount >= 4096 || (m.vbuf = this.driver.allocVertexes(m)) == null) {
			var size = this.usedMemory - this.freeMemorySize();
			this.garbage();
			this.cleanManagedBuffers();
			if(this.usedMemory - this.freeMemorySize() == size) {
				if(this.bufferCount >= 4096) throw "Too many buffer";
				throw "Memory full";
			}
		}
		this.usedMemory += mem;
		this.bufferCount++;
	}
	,freeManaged: function(m) {
		if(m.vbuf == null) return;
		this.driver.disposeVertexes(m.vbuf);
		m.vbuf = null;
		this.usedMemory -= m.size * m.stride * 4;
		this.bufferCount--;
	}
	,allocBuffer: function(b,stride) {
		var max;
		if((b.flags & 1 << h3d.BufferFlag.Quads[1]) != 0) max = 65532; else if((b.flags & 1 << h3d.BufferFlag.Triangles[1]) != 0) max = 65533; else max = 65534;
		if(b.vertices > max) {
			if(max == 65534) throw "Cannot split buffer with " + b.vertices + " vertices if it's not Quads/Triangles";
			var rem = b.vertices - max;
			b.vertices = max;
			this.allocBuffer(b,stride);
			var n = b;
			while(n.next != null) n = n.next;
			var flags = [];
			var _g = 0;
			var _g1 = h3d.impl.MemoryManager.ALL_FLAGS;
			while(_g < _g1.length) {
				var f = _g1[_g];
				++_g;
				if((b.flags & 1 << f[1]) != 0) flags.push(f);
			}
			n.next = new h3d.Buffer(rem,stride,flags,{ fileName : "MemoryManager.hx", lineNumber : 130, className : "h3d.impl.MemoryManager", methodName : "allocBuffer"});
			return;
		}
		if(!((b.flags & 1 << h3d.BufferFlag.Managed[1]) != 0)) {
			var m = new h3d.impl.ManagedBuffer(stride,b.vertices);
			if(!m.allocBuffer(b)) throw "assert";
			return;
		}
		var m1 = this.buffers[stride];
		var prev = null;
		while(m1 != null) {
			if(m1.allocBuffer(b)) return;
			prev = m1;
			m1 = m1.next;
		}
		var align;
		if((b.flags & 1 << h3d.BufferFlag.Triangles[1]) != 0) align = 3; else if((b.flags & 1 << h3d.BufferFlag.Quads[1]) != 0) align = 4; else align = 0;
		if(m1 == null && align > 0) {
			var total = b.vertices;
			var size = total;
			while(size > 2048) {
				m1 = this.buffers[stride];
				size >>= 1;
				size -= size % align;
				b.vertices = size;
				while(m1 != null) {
					if(m1.allocBuffer(b)) {
						var flags1 = [];
						var _g2 = 0;
						var _g11 = h3d.impl.MemoryManager.ALL_FLAGS;
						while(_g2 < _g11.length) {
							var f1 = _g11[_g2];
							++_g2;
							if((b.flags & 1 << f1[1]) != 0) flags1.push(f1);
						}
						b.next = new h3d.Buffer(total - size,stride,flags1,{ fileName : "MemoryManager.hx", lineNumber : 165, className : "h3d.impl.MemoryManager", methodName : "allocBuffer"});
						return;
					}
					m1 = m1.next;
				}
			}
			b.vertices = total;
		}
		m1 = new h3d.impl.ManagedBuffer(stride,65533,[h3d.BufferFlag.Managed]);
		if(prev == null) this.buffers[stride] = m1; else prev.next = m1;
		if(!m1.allocBuffer(b)) throw "assert";
	}
	,deleteIndexes: function(i) {
		HxOverrides.remove(this.indexes,i);
		this.driver.disposeIndexes(i.ibuf);
		i.ibuf = null;
		this.usedMemory -= i.count * 2;
	}
	,allocIndexes: function(i) {
		i.ibuf = this.driver.allocIndexes(i.count);
		this.indexes.push(i);
		this.usedMemory += i.count * 2;
	}
	,bpp: function(t) {
		return 4;
	}
	,cleanTextures: function(force) {
		if(force == null) force = true;
		this.textures.sort($bind(this,this.sortByLRU));
		var _g = 0;
		var _g1 = this.textures;
		while(_g < _g1.length) {
			var t = _g1[_g];
			++_g;
			if(t.realloc == null) continue;
			if(force || t.lastFrame < ((function($this) {
				var $r;
				if(h3d.Engine.CURRENT == null) throw "no current context, please do this operation after engine init/creation";
				$r = h3d.Engine.CURRENT;
				return $r;
			}(this))).frameCount - 3600) {
				t.dispose();
				return true;
			}
		}
		return false;
	}
	,sortByLRU: function(t1,t2) {
		return t1.lastFrame - t2.lastFrame;
	}
	,deleteTexture: function(t) {
		HxOverrides.remove(this.textures,t);
		this.driver.disposeTexture(t.t);
		t.t = null;
		this.texMemory -= t.width * t.height * this.bpp(t);
	}
	,allocTexture: function(t) {
		var free = this.cleanTextures(false);
		t.t = this.driver.allocTexture(t);
		if(t.t == null) {
			if(!this.cleanTextures(true)) throw "Maximum texture memory reached";
			this.allocTexture(t);
			return;
		}
		this.textures.push(t);
		this.texMemory += t.width * t.height * this.bpp(t);
	}
	,onContextLost: function() {
		this.dispose();
		this.initIndexes();
	}
	,dispose: function() {
		this.triIndexes.dispose();
		this.quadIndexes.dispose();
		this.triIndexes = null;
		this.quadIndexes = null;
		var _g = 0;
		var _g1 = this.textures.slice();
		while(_g < _g1.length) {
			var t = _g1[_g];
			++_g;
			t.dispose();
		}
		var _g2 = 0;
		var _g11 = this.buffers.slice();
		while(_g2 < _g11.length) {
			var b = _g11[_g2];
			++_g2;
			var b1 = b;
			while(b1 != null) {
				b1.dispose();
				b1 = b1.next;
			}
		}
		var _g3 = 0;
		var _g12 = this.indexes.slice();
		while(_g3 < _g12.length) {
			var i = _g12[_g3];
			++_g3;
			i.dispose();
		}
		this.buffers = [];
		this.indexes = [];
		this.textures = [];
		this.bufferCount = 0;
		this.usedMemory = 0;
		this.texMemory = 0;
	}
	,freeMemorySize: function() {
		var size = 0;
		var _g = 0;
		var _g1 = this.buffers;
		while(_g < _g1.length) {
			var b = _g1[_g];
			++_g;
			var b1 = b;
			while(b1 != null) {
				var free = b1.freeList;
				while(free != null) {
					size += free.count * b1.stride * 4;
					free = free.next;
				}
				b1 = b1.next;
			}
		}
		return size;
	}
	,__class__: h3d.impl.MemoryManager
};
h3d.impl.TextureCache = function() {
	this.position = 0;
	this.cache = [];
	var engine;
	if(h3d.Engine.CURRENT == null) throw "no current context, please do this operation after engine init/creation";
	engine = h3d.Engine.CURRENT;
	this.hasDefaultDepth = engine.driver.hasFeature(h3d.impl.Feature.TargetUseDefaultDepthBuffer);
	this.fullClearRequired = engine.driver.hasFeature(h3d.impl.Feature.FullClearRequired);
};
$hxClasses["h3d.impl.TextureCache"] = h3d.impl.TextureCache;
h3d.impl.TextureCache.__name__ = ["h3d","impl","TextureCache"];
h3d.impl.TextureCache.prototype = {
	begin: function(ctx) {
		if(this.frame != ctx.frame) {
			while(this.cache.length > this.position) {
				var t = this.cache.pop();
				if(t != null) t.dispose();
			}
			this.frame = ctx.frame;
			this.position = 0;
		}
	}
	,allocTarget: function(name,ctx,width,height,hasDepth) {
		if(hasDepth == null) hasDepth = true;
		this.begin(ctx);
		var t = this.cache[this.position];
		if(t == null || t.t == null && t.realloc == null || t.width != width || t.height != height || (t.flags & 1 << (this.hasDefaultDepth?h3d.mat.TextureFlags.TargetUseDefaultDepth:h3d.mat.TextureFlags.TargetDepth)[1]) != 0 != hasDepth) {
			if(t != null) t.dispose();
			var flags = [h3d.mat.TextureFlags.Target];
			if(hasDepth) flags.push(this.hasDefaultDepth?h3d.mat.TextureFlags.TargetUseDefaultDepth:h3d.mat.TextureFlags.TargetDepth);
			t = new h3d.mat.Texture(width,height,flags,{ fileName : "TextureCache.hx", lineNumber : 41, className : "h3d.impl.TextureCache", methodName : "allocTarget"});
			this.cache[this.position] = t;
		}
		t.setName(name);
		this.position++;
		return t;
	}
	,__class__: h3d.impl.TextureCache
};
h3d.mat = {};
h3d.mat.Face = $hxClasses["h3d.mat.Face"] = { __ename__ : true, __constructs__ : ["None","Back","Front","Both"] };
h3d.mat.Face.None = ["None",0];
h3d.mat.Face.None.toString = $estr;
h3d.mat.Face.None.__enum__ = h3d.mat.Face;
h3d.mat.Face.Back = ["Back",1];
h3d.mat.Face.Back.toString = $estr;
h3d.mat.Face.Back.__enum__ = h3d.mat.Face;
h3d.mat.Face.Front = ["Front",2];
h3d.mat.Face.Front.toString = $estr;
h3d.mat.Face.Front.__enum__ = h3d.mat.Face;
h3d.mat.Face.Both = ["Both",3];
h3d.mat.Face.Both.toString = $estr;
h3d.mat.Face.Both.__enum__ = h3d.mat.Face;
h3d.mat.Face.__empty_constructs__ = [h3d.mat.Face.None,h3d.mat.Face.Back,h3d.mat.Face.Front,h3d.mat.Face.Both];
h3d.mat.Blend = $hxClasses["h3d.mat.Blend"] = { __ename__ : true, __constructs__ : ["One","Zero","SrcAlpha","SrcColor","DstAlpha","DstColor","OneMinusSrcAlpha","OneMinusSrcColor","OneMinusDstAlpha","OneMinusDstColor","ConstantColor","ConstantAlpha","OneMinusConstantColor","OneMinusConstantAlpha","SrcAlphaSaturate"] };
h3d.mat.Blend.One = ["One",0];
h3d.mat.Blend.One.toString = $estr;
h3d.mat.Blend.One.__enum__ = h3d.mat.Blend;
h3d.mat.Blend.Zero = ["Zero",1];
h3d.mat.Blend.Zero.toString = $estr;
h3d.mat.Blend.Zero.__enum__ = h3d.mat.Blend;
h3d.mat.Blend.SrcAlpha = ["SrcAlpha",2];
h3d.mat.Blend.SrcAlpha.toString = $estr;
h3d.mat.Blend.SrcAlpha.__enum__ = h3d.mat.Blend;
h3d.mat.Blend.SrcColor = ["SrcColor",3];
h3d.mat.Blend.SrcColor.toString = $estr;
h3d.mat.Blend.SrcColor.__enum__ = h3d.mat.Blend;
h3d.mat.Blend.DstAlpha = ["DstAlpha",4];
h3d.mat.Blend.DstAlpha.toString = $estr;
h3d.mat.Blend.DstAlpha.__enum__ = h3d.mat.Blend;
h3d.mat.Blend.DstColor = ["DstColor",5];
h3d.mat.Blend.DstColor.toString = $estr;
h3d.mat.Blend.DstColor.__enum__ = h3d.mat.Blend;
h3d.mat.Blend.OneMinusSrcAlpha = ["OneMinusSrcAlpha",6];
h3d.mat.Blend.OneMinusSrcAlpha.toString = $estr;
h3d.mat.Blend.OneMinusSrcAlpha.__enum__ = h3d.mat.Blend;
h3d.mat.Blend.OneMinusSrcColor = ["OneMinusSrcColor",7];
h3d.mat.Blend.OneMinusSrcColor.toString = $estr;
h3d.mat.Blend.OneMinusSrcColor.__enum__ = h3d.mat.Blend;
h3d.mat.Blend.OneMinusDstAlpha = ["OneMinusDstAlpha",8];
h3d.mat.Blend.OneMinusDstAlpha.toString = $estr;
h3d.mat.Blend.OneMinusDstAlpha.__enum__ = h3d.mat.Blend;
h3d.mat.Blend.OneMinusDstColor = ["OneMinusDstColor",9];
h3d.mat.Blend.OneMinusDstColor.toString = $estr;
h3d.mat.Blend.OneMinusDstColor.__enum__ = h3d.mat.Blend;
h3d.mat.Blend.ConstantColor = ["ConstantColor",10];
h3d.mat.Blend.ConstantColor.toString = $estr;
h3d.mat.Blend.ConstantColor.__enum__ = h3d.mat.Blend;
h3d.mat.Blend.ConstantAlpha = ["ConstantAlpha",11];
h3d.mat.Blend.ConstantAlpha.toString = $estr;
h3d.mat.Blend.ConstantAlpha.__enum__ = h3d.mat.Blend;
h3d.mat.Blend.OneMinusConstantColor = ["OneMinusConstantColor",12];
h3d.mat.Blend.OneMinusConstantColor.toString = $estr;
h3d.mat.Blend.OneMinusConstantColor.__enum__ = h3d.mat.Blend;
h3d.mat.Blend.OneMinusConstantAlpha = ["OneMinusConstantAlpha",13];
h3d.mat.Blend.OneMinusConstantAlpha.toString = $estr;
h3d.mat.Blend.OneMinusConstantAlpha.__enum__ = h3d.mat.Blend;
h3d.mat.Blend.SrcAlphaSaturate = ["SrcAlphaSaturate",14];
h3d.mat.Blend.SrcAlphaSaturate.toString = $estr;
h3d.mat.Blend.SrcAlphaSaturate.__enum__ = h3d.mat.Blend;
h3d.mat.Blend.__empty_constructs__ = [h3d.mat.Blend.One,h3d.mat.Blend.Zero,h3d.mat.Blend.SrcAlpha,h3d.mat.Blend.SrcColor,h3d.mat.Blend.DstAlpha,h3d.mat.Blend.DstColor,h3d.mat.Blend.OneMinusSrcAlpha,h3d.mat.Blend.OneMinusSrcColor,h3d.mat.Blend.OneMinusDstAlpha,h3d.mat.Blend.OneMinusDstColor,h3d.mat.Blend.ConstantColor,h3d.mat.Blend.ConstantAlpha,h3d.mat.Blend.OneMinusConstantColor,h3d.mat.Blend.OneMinusConstantAlpha,h3d.mat.Blend.SrcAlphaSaturate];
h3d.mat.Compare = $hxClasses["h3d.mat.Compare"] = { __ename__ : true, __constructs__ : ["Always","Never","Equal","NotEqual","Greater","GreaterEqual","Less","LessEqual"] };
h3d.mat.Compare.Always = ["Always",0];
h3d.mat.Compare.Always.toString = $estr;
h3d.mat.Compare.Always.__enum__ = h3d.mat.Compare;
h3d.mat.Compare.Never = ["Never",1];
h3d.mat.Compare.Never.toString = $estr;
h3d.mat.Compare.Never.__enum__ = h3d.mat.Compare;
h3d.mat.Compare.Equal = ["Equal",2];
h3d.mat.Compare.Equal.toString = $estr;
h3d.mat.Compare.Equal.__enum__ = h3d.mat.Compare;
h3d.mat.Compare.NotEqual = ["NotEqual",3];
h3d.mat.Compare.NotEqual.toString = $estr;
h3d.mat.Compare.NotEqual.__enum__ = h3d.mat.Compare;
h3d.mat.Compare.Greater = ["Greater",4];
h3d.mat.Compare.Greater.toString = $estr;
h3d.mat.Compare.Greater.__enum__ = h3d.mat.Compare;
h3d.mat.Compare.GreaterEqual = ["GreaterEqual",5];
h3d.mat.Compare.GreaterEqual.toString = $estr;
h3d.mat.Compare.GreaterEqual.__enum__ = h3d.mat.Compare;
h3d.mat.Compare.Less = ["Less",6];
h3d.mat.Compare.Less.toString = $estr;
h3d.mat.Compare.Less.__enum__ = h3d.mat.Compare;
h3d.mat.Compare.LessEqual = ["LessEqual",7];
h3d.mat.Compare.LessEqual.toString = $estr;
h3d.mat.Compare.LessEqual.__enum__ = h3d.mat.Compare;
h3d.mat.Compare.__empty_constructs__ = [h3d.mat.Compare.Always,h3d.mat.Compare.Never,h3d.mat.Compare.Equal,h3d.mat.Compare.NotEqual,h3d.mat.Compare.Greater,h3d.mat.Compare.GreaterEqual,h3d.mat.Compare.Less,h3d.mat.Compare.LessEqual];
h3d.mat.MipMap = $hxClasses["h3d.mat.MipMap"] = { __ename__ : true, __constructs__ : ["None","Nearest","Linear"] };
h3d.mat.MipMap.None = ["None",0];
h3d.mat.MipMap.None.toString = $estr;
h3d.mat.MipMap.None.__enum__ = h3d.mat.MipMap;
h3d.mat.MipMap.Nearest = ["Nearest",1];
h3d.mat.MipMap.Nearest.toString = $estr;
h3d.mat.MipMap.Nearest.__enum__ = h3d.mat.MipMap;
h3d.mat.MipMap.Linear = ["Linear",2];
h3d.mat.MipMap.Linear.toString = $estr;
h3d.mat.MipMap.Linear.__enum__ = h3d.mat.MipMap;
h3d.mat.MipMap.__empty_constructs__ = [h3d.mat.MipMap.None,h3d.mat.MipMap.Nearest,h3d.mat.MipMap.Linear];
h3d.mat.Filter = $hxClasses["h3d.mat.Filter"] = { __ename__ : true, __constructs__ : ["Nearest","Linear"] };
h3d.mat.Filter.Nearest = ["Nearest",0];
h3d.mat.Filter.Nearest.toString = $estr;
h3d.mat.Filter.Nearest.__enum__ = h3d.mat.Filter;
h3d.mat.Filter.Linear = ["Linear",1];
h3d.mat.Filter.Linear.toString = $estr;
h3d.mat.Filter.Linear.__enum__ = h3d.mat.Filter;
h3d.mat.Filter.__empty_constructs__ = [h3d.mat.Filter.Nearest,h3d.mat.Filter.Linear];
h3d.mat.Wrap = $hxClasses["h3d.mat.Wrap"] = { __ename__ : true, __constructs__ : ["Clamp","Repeat"] };
h3d.mat.Wrap.Clamp = ["Clamp",0];
h3d.mat.Wrap.Clamp.toString = $estr;
h3d.mat.Wrap.Clamp.__enum__ = h3d.mat.Wrap;
h3d.mat.Wrap.Repeat = ["Repeat",1];
h3d.mat.Wrap.Repeat.toString = $estr;
h3d.mat.Wrap.Repeat.__enum__ = h3d.mat.Wrap;
h3d.mat.Wrap.__empty_constructs__ = [h3d.mat.Wrap.Clamp,h3d.mat.Wrap.Repeat];
h3d.mat.Operation = $hxClasses["h3d.mat.Operation"] = { __ename__ : true, __constructs__ : ["Add","Sub","ReverseSub"] };
h3d.mat.Operation.Add = ["Add",0];
h3d.mat.Operation.Add.toString = $estr;
h3d.mat.Operation.Add.__enum__ = h3d.mat.Operation;
h3d.mat.Operation.Sub = ["Sub",1];
h3d.mat.Operation.Sub.toString = $estr;
h3d.mat.Operation.Sub.__enum__ = h3d.mat.Operation;
h3d.mat.Operation.ReverseSub = ["ReverseSub",2];
h3d.mat.Operation.ReverseSub.toString = $estr;
h3d.mat.Operation.ReverseSub.__enum__ = h3d.mat.Operation;
h3d.mat.Operation.__empty_constructs__ = [h3d.mat.Operation.Add,h3d.mat.Operation.Sub,h3d.mat.Operation.ReverseSub];
h3d.mat.TextureFlags = $hxClasses["h3d.mat.TextureFlags"] = { __ename__ : true, __constructs__ : ["Target","TargetDepth","TargetUseDefaultDepth","Cubic","MipMapped","IsNPOT","NoAlloc","Dynamic","FmtFloat","Fmt5_6_5","Fmt4_4_4_4","Fmt5_5_5_1","AlphaPremultiplied","WasCleared"] };
h3d.mat.TextureFlags.Target = ["Target",0];
h3d.mat.TextureFlags.Target.toString = $estr;
h3d.mat.TextureFlags.Target.__enum__ = h3d.mat.TextureFlags;
h3d.mat.TextureFlags.TargetDepth = ["TargetDepth",1];
h3d.mat.TextureFlags.TargetDepth.toString = $estr;
h3d.mat.TextureFlags.TargetDepth.__enum__ = h3d.mat.TextureFlags;
h3d.mat.TextureFlags.TargetUseDefaultDepth = ["TargetUseDefaultDepth",2];
h3d.mat.TextureFlags.TargetUseDefaultDepth.toString = $estr;
h3d.mat.TextureFlags.TargetUseDefaultDepth.__enum__ = h3d.mat.TextureFlags;
h3d.mat.TextureFlags.Cubic = ["Cubic",3];
h3d.mat.TextureFlags.Cubic.toString = $estr;
h3d.mat.TextureFlags.Cubic.__enum__ = h3d.mat.TextureFlags;
h3d.mat.TextureFlags.MipMapped = ["MipMapped",4];
h3d.mat.TextureFlags.MipMapped.toString = $estr;
h3d.mat.TextureFlags.MipMapped.__enum__ = h3d.mat.TextureFlags;
h3d.mat.TextureFlags.IsNPOT = ["IsNPOT",5];
h3d.mat.TextureFlags.IsNPOT.toString = $estr;
h3d.mat.TextureFlags.IsNPOT.__enum__ = h3d.mat.TextureFlags;
h3d.mat.TextureFlags.NoAlloc = ["NoAlloc",6];
h3d.mat.TextureFlags.NoAlloc.toString = $estr;
h3d.mat.TextureFlags.NoAlloc.__enum__ = h3d.mat.TextureFlags;
h3d.mat.TextureFlags.Dynamic = ["Dynamic",7];
h3d.mat.TextureFlags.Dynamic.toString = $estr;
h3d.mat.TextureFlags.Dynamic.__enum__ = h3d.mat.TextureFlags;
h3d.mat.TextureFlags.FmtFloat = ["FmtFloat",8];
h3d.mat.TextureFlags.FmtFloat.toString = $estr;
h3d.mat.TextureFlags.FmtFloat.__enum__ = h3d.mat.TextureFlags;
h3d.mat.TextureFlags.Fmt5_6_5 = ["Fmt5_6_5",9];
h3d.mat.TextureFlags.Fmt5_6_5.toString = $estr;
h3d.mat.TextureFlags.Fmt5_6_5.__enum__ = h3d.mat.TextureFlags;
h3d.mat.TextureFlags.Fmt4_4_4_4 = ["Fmt4_4_4_4",10];
h3d.mat.TextureFlags.Fmt4_4_4_4.toString = $estr;
h3d.mat.TextureFlags.Fmt4_4_4_4.__enum__ = h3d.mat.TextureFlags;
h3d.mat.TextureFlags.Fmt5_5_5_1 = ["Fmt5_5_5_1",11];
h3d.mat.TextureFlags.Fmt5_5_5_1.toString = $estr;
h3d.mat.TextureFlags.Fmt5_5_5_1.__enum__ = h3d.mat.TextureFlags;
h3d.mat.TextureFlags.AlphaPremultiplied = ["AlphaPremultiplied",12];
h3d.mat.TextureFlags.AlphaPremultiplied.toString = $estr;
h3d.mat.TextureFlags.AlphaPremultiplied.__enum__ = h3d.mat.TextureFlags;
h3d.mat.TextureFlags.WasCleared = ["WasCleared",13];
h3d.mat.TextureFlags.WasCleared.toString = $estr;
h3d.mat.TextureFlags.WasCleared.__enum__ = h3d.mat.TextureFlags;
h3d.mat.TextureFlags.__empty_constructs__ = [h3d.mat.TextureFlags.Target,h3d.mat.TextureFlags.TargetDepth,h3d.mat.TextureFlags.TargetUseDefaultDepth,h3d.mat.TextureFlags.Cubic,h3d.mat.TextureFlags.MipMapped,h3d.mat.TextureFlags.IsNPOT,h3d.mat.TextureFlags.NoAlloc,h3d.mat.TextureFlags.Dynamic,h3d.mat.TextureFlags.FmtFloat,h3d.mat.TextureFlags.Fmt5_6_5,h3d.mat.TextureFlags.Fmt4_4_4_4,h3d.mat.TextureFlags.Fmt5_5_5_1,h3d.mat.TextureFlags.AlphaPremultiplied,h3d.mat.TextureFlags.WasCleared];
h3d.mat.Material = function(shader) {
	if(shader != null) this.addPass(new h3d.mat.Pass("default",null)).addShader(shader);
};
$hxClasses["h3d.mat.Material"] = h3d.mat.Material;
h3d.mat.Material.__name__ = ["h3d","mat","Material"];
h3d.mat.Material.prototype = {
	addPass: function(p) {
		var prev = null;
		var cur = this.passes;
		while(cur != null) {
			prev = cur;
			cur = cur.nextPass;
		}
		if(prev == null) this.passes = p; else prev.nextPass = p;
		p.nextPass = null;
		return p;
	}
	,__class__: h3d.mat.Material
};
h3d.mat.MeshMaterial = function(texture) {
	this.mshader = new h3d.shader.BaseMesh();
	this.set_blendMode(h2d.BlendMode.None);
	h3d.mat.Material.call(this,this.mshader);
	this.set_texture(texture);
};
$hxClasses["h3d.mat.MeshMaterial"] = h3d.mat.MeshMaterial;
h3d.mat.MeshMaterial.__name__ = ["h3d","mat","MeshMaterial"];
h3d.mat.MeshMaterial.__super__ = h3d.mat.Material;
h3d.mat.MeshMaterial.prototype = $extend(h3d.mat.Material.prototype,{
	set_blendMode: function(v) {
		if(this.passes != null) {
			this.passes.setBlendMode(v);
			switch(v[1]) {
			case 0:
				this.passes.set_depthWrite(true);
				this.passes.setPassName("default");
				break;
			case 1:
				this.passes.set_depthWrite(true);
				this.passes.setPassName("alpha");
				break;
			case 2:
				this.passes.set_depthWrite(false);
				this.passes.setPassName("additive");
				break;
			case 3:
				this.passes.set_depthWrite(false);
				this.passes.setPassName("additive");
				break;
			case 4:
				this.passes.set_depthWrite(false);
				this.passes.setPassName("additive");
				break;
			case 5:
				this.passes.set_depthWrite(false);
				this.passes.setPassName("additive");
				break;
			case 6:
				this.passes.set_depthWrite(false);
				this.passes.setPassName("additive");
				break;
			}
		}
		return this.blendMode = v;
	}
	,set_texture: function(t) {
		if(t == null) {
			if(this.textureShader != null) {
				this.passes.removeShader(this.textureShader);
				this.textureShader = null;
			}
		} else {
			if(this.textureShader == null) {
				this.textureShader = new h3d.shader.Texture();
				this.passes.addShader(this.textureShader);
			}
			this.textureShader.texture__ = t;
		}
		return t;
	}
	,__class__: h3d.mat.MeshMaterial
	,__properties__: {set_texture:"set_texture",set_blendMode:"set_blendMode"}
});
h3d.mat.Pass = function(name,shaders,parent) {
	this.bits = 0;
	this.parentPass = parent;
	this.shaders = shaders;
	this.setPassName(name);
	this.set_culling(h3d.mat.Face.Back);
	this.blend(h3d.mat.Blend.One,h3d.mat.Blend.Zero);
	this.depth(true,h3d.mat.Compare.Less);
	this.set_blendOp(this.set_blendAlphaOp(h3d.mat.Operation.Add));
	this.set_colorMask(15);
};
$hxClasses["h3d.mat.Pass"] = h3d.mat.Pass;
h3d.mat.Pass.__name__ = ["h3d","mat","Pass"];
h3d.mat.Pass.prototype = {
	setPassName: function(name) {
		this.name = name;
		this.passId = hxsl.Globals.allocID(name);
	}
	,blend: function(src,dst) {
		this.set_blendSrc(src);
		this.set_blendAlphaSrc(src);
		this.set_blendDst(dst);
		this.set_blendAlphaDst(dst);
	}
	,setBlendMode: function(b) {
		switch(b[1]) {
		case 0:
			this.blend(h3d.mat.Blend.One,h3d.mat.Blend.Zero);
			break;
		case 1:
			this.blend(h3d.mat.Blend.SrcAlpha,h3d.mat.Blend.OneMinusSrcAlpha);
			break;
		case 2:
			this.blend(h3d.mat.Blend.SrcAlpha,h3d.mat.Blend.One);
			break;
		case 3:
			this.blend(h3d.mat.Blend.OneMinusDstColor,h3d.mat.Blend.One);
			break;
		case 4:
			this.blend(h3d.mat.Blend.DstColor,h3d.mat.Blend.Zero);
			break;
		case 5:
			this.blend(h3d.mat.Blend.Zero,h3d.mat.Blend.OneMinusSrcAlpha);
			break;
		case 6:
			this.blend(h3d.mat.Blend.One,h3d.mat.Blend.OneMinusSrcColor);
			break;
		}
	}
	,depth: function(write,test) {
		this.set_depthWrite(write);
		this.set_depthTest(test);
	}
	,addShader: function(s) {
		this.shaders = new hxsl.ShaderList(s,this.shaders);
		return s;
	}
	,removeShader: function(s) {
		var sl = this.shaders;
		var prev = null;
		while(sl != null) {
			if(sl.s == s) {
				if(prev == null) this.shaders = sl.next; else prev.next = sl.next;
				return true;
			}
			prev = sl;
			sl = sl.next;
		}
		return false;
	}
	,getShadersRec: function() {
		if(this.parentPass == null || this.parentShaders == this.parentPass.shaders) return this.shaders;
		var s = this.shaders;
		var prev = null;
		while(s != null && s != this.parentShaders) {
			prev = s;
			s = s.next;
		}
		this.parentShaders = this.parentPass.shaders;
		if(prev == null) this.shaders = this.parentShaders; else prev.next = this.parentShaders;
		return this.shaders;
	}
	,set_culling: function(v) {
		this.bits = this.bits & -4 | v[1];
		return this.culling = v;
	}
	,set_depthWrite: function(v) {
		this.bits = this.bits & -5 | (v?1:0) << 2;
		return this.depthWrite = v;
	}
	,set_depthTest: function(v) {
		this.bits = this.bits & -57 | v[1] << 3;
		return this.depthTest = v;
	}
	,set_blendSrc: function(v) {
		this.bits = this.bits & -961 | v[1] << 6;
		return this.blendSrc = v;
	}
	,set_blendDst: function(v) {
		this.bits = this.bits & -15361 | v[1] << 10;
		return this.blendDst = v;
	}
	,set_blendAlphaSrc: function(v) {
		this.bits = this.bits & -245761 | v[1] << 14;
		return this.blendAlphaSrc = v;
	}
	,set_blendAlphaDst: function(v) {
		this.bits = this.bits & -3932161 | v[1] << 18;
		return this.blendAlphaDst = v;
	}
	,set_blendOp: function(v) {
		this.bits = this.bits & -12582913 | v[1] << 22;
		return this.blendOp = v;
	}
	,set_blendAlphaOp: function(v) {
		this.bits = this.bits & -50331649 | v[1] << 24;
		return this.blendAlphaOp = v;
	}
	,set_colorMask: function(v) {
		this.bits = this.bits & -1006632961 | (v & 15) << 26;
		return this.colorMask = v;
	}
	,__class__: h3d.mat.Pass
	,__properties__: {set_colorMask:"set_colorMask",set_blendAlphaOp:"set_blendAlphaOp",set_blendOp:"set_blendOp",set_blendAlphaDst:"set_blendAlphaDst",set_blendAlphaSrc:"set_blendAlphaSrc",set_blendDst:"set_blendDst",set_blendSrc:"set_blendSrc",set_depthTest:"set_depthTest",set_depthWrite:"set_depthWrite",set_culling:"set_culling"}
};
h3d.mat.Texture = function(w,h,flags,allocPos) {
	var engine;
	if(h3d.Engine.CURRENT == null) throw "no current context, please do this operation after engine init/creation";
	engine = h3d.Engine.CURRENT;
	this.mem = engine.mem;
	this.id = ++h3d.mat.Texture.UID;
	this.flags = 0;
	if(flags != null) {
		var _g = 0;
		while(_g < flags.length) {
			var f = flags[_g];
			++_g;
			this.flags |= 1 << f[1];
		}
	}
	var tw = 1;
	var th = 1;
	while(tw < w) tw <<= 1;
	while(th < h) th <<= 1;
	if(tw != w || th != h) this.flags |= 1 << h3d.mat.TextureFlags.IsNPOT[1];
	if((this.flags & 1 << h3d.mat.TextureFlags.Target[1]) != 0) this.realloc = function() {
	};
	this.width = w;
	this.height = h;
	this.set_mipMap((this.flags & 1 << h3d.mat.TextureFlags.MipMapped[1]) != 0?h3d.mat.MipMap.Nearest:h3d.mat.MipMap.None);
	this.set_filter(h3d.mat.Filter.Linear);
	this.set_wrap(h3d.mat.Wrap.Clamp);
	this.bits &= 32767;
	this.allocPos = allocPos;
	this.alloc();
};
$hxClasses["h3d.mat.Texture"] = h3d.mat.Texture;
h3d.mat.Texture.__name__ = ["h3d","mat","Texture"];
h3d.mat.Texture.fromColor = function(color,alpha,allocPos) {
	if(alpha == null) alpha = 1.;
	var aval = alpha * 255 | 0;
	if(aval < 0) aval = 0; else if(aval > 255) aval = 255;
	var key = color & 16777215 | aval << 24;
	var t = h3d.mat.Texture.COLOR_CACHE.get(key);
	if(t != null) return t;
	var t1 = new h3d.mat.Texture(1,1,null,allocPos);
	t1.clear(color,alpha);
	t1.realloc = function() {
		t1.clear(color,alpha);
	};
	h3d.mat.Texture.COLOR_CACHE.set(key,t1);
	return t1;
};
h3d.mat.Texture.prototype = {
	alloc: function() {
		if(this.t == null) this.mem.allocTexture(this);
	}
	,setName: function(n) {
		this.name = n;
	}
	,set_mipMap: function(m) {
		this.bits |= 524288;
		this.bits = this.bits & -4 | m[1];
		return this.mipMap = m;
	}
	,set_filter: function(f) {
		this.bits |= 524288;
		this.bits = this.bits & -25 | f[1] << 3;
		return this.filter = f;
	}
	,set_wrap: function(w) {
		this.bits |= 524288;
		this.bits = this.bits & -193 | w[1] << 6;
		return this.wrap = w;
	}
	,resize: function(width,height) {
		this.dispose();
		var tw = 1;
		var th = 1;
		while(tw < width) tw <<= 1;
		while(th < height) th <<= 1;
		if(tw != width || th != height) this.flags |= 1 << h3d.mat.TextureFlags.IsNPOT[1]; else this.flags &= 268435455 - (1 << h3d.mat.TextureFlags.IsNPOT[1]);
		this.width = width;
		this.height = height;
		if(!((this.flags & 1 << h3d.mat.TextureFlags.NoAlloc[1]) != 0)) this.alloc();
	}
	,clear: function(color,alpha) {
		if(alpha == null) alpha = 1.;
		this.alloc();
		var p = hxd.Pixels.alloc(this.width,this.height,hxd.PixelFormat.BGRA);
		var k = 0;
		var b = color & 255;
		var g = color >> 8 & 255;
		var r = color >> 16 & 255;
		var a = alpha * 255 | 0;
		if(a < 0) a = 0; else if(a > 255) a = 255;
		var _g1 = 0;
		var _g = this.width * this.height;
		while(_g1 < _g) {
			var i = _g1++;
			p.bytes.set(k++,b);
			p.bytes.set(k++,g);
			p.bytes.set(k++,r);
			p.bytes.set(k++,a);
		}
		this.uploadPixels(p);
		p.dispose();
	}
	,uploadBitmap: function(bmp,mipLevel,side) {
		if(side == null) side = 0;
		if(mipLevel == null) mipLevel = 0;
		this.alloc();
		this.mem.driver.uploadTextureBitmap(this,bmp,mipLevel,side);
	}
	,uploadPixels: function(pixels,mipLevel,side) {
		if(side == null) side = 0;
		if(mipLevel == null) mipLevel = 0;
		this.alloc();
		this.mem.driver.uploadTexturePixels(this,pixels,mipLevel,side);
	}
	,dispose: function() {
		if(this.t != null) {
			this.mem.deleteTexture(this);
			this.allocPos.customParams = ["#DISPOSED"];
		}
	}
	,__class__: h3d.mat.Texture
	,__properties__: {set_wrap:"set_wrap",set_filter:"set_filter",set_mipMap:"set_mipMap"}
};
h3d.pass = {};
h3d.pass.Base = function() {
	this.forceProcessing = false;
	this.priority = 0;
};
$hxClasses["h3d.pass.Base"] = h3d.pass.Base;
h3d.pass.Base.__name__ = ["h3d","pass","Base"];
h3d.pass.Base.prototype = {
	setContext: function(ctx) {
		this.ctx = ctx;
	}
	,draw: function(passes) {
		return passes;
	}
	,__class__: h3d.pass.Base
};
h3d.pass.ScreenFx = function(shader) {
	this.shader = shader;
	this.shaders = new hxsl.ShaderList(shader);
	this.manager = new h3d.shader.Manager(["output.position","output.color"]);
	this.pass = new h3d.mat.Pass(Std.string(this),new hxsl.ShaderList(shader));
	this.pass.set_culling(h3d.mat.Face.None);
	this.pass.depth(false,h3d.mat.Compare.Always);
	this.plan = new h3d.prim.Plan2D();
	if(h3d.Engine.CURRENT == null) throw "no current context, please do this operation after engine init/creation";
	this.engine = h3d.Engine.CURRENT;
	this.fullClearRequired = this.engine.hasFeature(h3d.impl.Feature.FullClearRequired);
};
$hxClasses["h3d.pass.ScreenFx"] = h3d.pass.ScreenFx;
h3d.pass.ScreenFx.__name__ = ["h3d","pass","ScreenFx"];
h3d.pass.ScreenFx.prototype = {
	render: function() {
		var rts = this.manager.compileShaders(this.shaders);
		this.engine.selectMaterial(this.pass);
		this.engine.selectShader(rts);
		if(this.buffers == null) this.buffers = new h3d.shader.Buffers(rts); else this.buffers.grow(rts);
		this.manager.fillGlobals(this.buffers,rts);
		this.manager.fillParams(this.buffers,rts,this.shaders);
		this.engine.uploadShaderBuffers(this.buffers,0);
		this.engine.uploadShaderBuffers(this.buffers,1);
		this.engine.uploadShaderBuffers(this.buffers,2);
		this.plan.render(this.engine);
	}
	,dispose: function() {
		this.plan.dispose();
	}
	,__class__: h3d.pass.ScreenFx
};
h3d.pass.Blur = function(quality,passes,sigma) {
	if(sigma == null) sigma = 1.;
	if(passes == null) passes = 1;
	if(quality == null) quality = 1;
	h3d.pass.ScreenFx.call(this,new h3d.shader.Blur());
	this.set_quality(quality);
	this.passes = passes;
	this.set_sigma(sigma);
};
$hxClasses["h3d.pass.Blur"] = h3d.pass.Blur;
h3d.pass.Blur.__name__ = ["h3d","pass","Blur"];
h3d.pass.Blur.__super__ = h3d.pass.ScreenFx;
h3d.pass.Blur.prototype = $extend(h3d.pass.ScreenFx.prototype,{
	set_quality: function(q) {
		this.values = null;
		return this.quality = q;
	}
	,set_sigma: function(s) {
		this.values = null;
		return this.sigma = s;
	}
	,gauss: function(x,s) {
		if(s <= 0) if(x == 0) return 1; else return 0;
		var sq = s * s;
		var p = Math.pow(2.718281828459,-(x * x) / (2 * sq));
		return p / Math.sqrt(2 * Math.PI * sq);
	}
	,calcValues: function() {
		this.values = [];
		var tot = 0.;
		var _g1 = 0;
		var _g = this.quality + 1;
		while(_g1 < _g) {
			var i = _g1++;
			var g = this.gauss(i,this.sigma);
			this.values[i] = g;
			tot += g;
			if(i > 0) tot += g;
		}
		var _g11 = 0;
		var _g2 = this.quality + 1;
		while(_g11 < _g2) {
			var i1 = _g11++;
			this.values[i1] /= tot;
		}
	}
	,apply: function(src,tmp,output,isDepth) {
		if(isDepth == null) isDepth = false;
		if(this.quality <= 0 || this.passes <= 0 || this.sigma <= 0) return;
		if(output == null) output = src;
		var alloc = tmp == null;
		if(alloc) tmp = new h3d.mat.Texture(src.width,src.height,[h3d.mat.TextureFlags.Target],{ fileName : "Blur.hx", lineNumber : 67, className : "h3d.pass.Blur", methodName : "apply"});
		if(this.values == null) this.calcValues();
		this.shader.set_Quality(this.quality + 1);
		this.shader.values__ = this.values;
		this.shader.set_isDepth(isDepth);
		var _g1 = 0;
		var _g = this.passes;
		while(_g1 < _g) {
			var i = _g1++;
			this.shader.texture__ = src;
			this.shader.pixel__.set(1 / src.width,0,null,null);
			this.engine.setTarget(tmp);
			if(this.fullClearRequired) this.engine.clear(0,1,0);
			this.render();
			this.shader.texture__ = tmp;
			this.shader.pixel__.set(0,1 / tmp.height,null,null);
			this.engine.setTarget(output);
			if(this.fullClearRequired) this.engine.clear(0,1,0);
			this.render();
		}
		this.engine.setTarget(null);
		if(alloc) tmp.dispose();
	}
	,__class__: h3d.pass.Blur
	,__properties__: {set_sigma:"set_sigma",set_quality:"set_quality"}
});
var hxsl = {};
hxsl.Shader = function() {
	this.priority = 0;
	var cl = Type.getClass(this);
	this.shader = cl._SHADER;
	this.constModified = true;
	if(this.shader == null) {
		this.shader = new hxsl.SharedShader(cl.SRC);
		cl._SHADER = this.shader;
	}
};
$hxClasses["hxsl.Shader"] = hxsl.Shader;
hxsl.Shader.__name__ = ["hxsl","Shader"];
hxsl.Shader.prototype = {
	getParamValue: function(index) {
		throw "assert";
		return null;
	}
	,updateConstants: function(globals) {
		throw "assert";
	}
	,updateConstantsFinal: function(globals) {
		var c = this.shader.consts;
		while(c != null) {
			if(c.globalId == 0) {
				c = c.next;
				continue;
			}
			var v = globals.map.get(c.globalId);
			var _g = c.v.type;
			switch(_g[1]) {
			case 1:
				var v1 = v;
				if(v1 >>> c.bits != 0) throw "Constant " + c.v.name + " is outside range (" + v1 + " > " + ((1 << c.bits) - 1) + ")";
				this.constBits |= v1 << c.pos;
				break;
			case 2:
				var v2 = v;
				if(v2) this.constBits |= 1 << c.pos;
				break;
			default:
				throw "assert";
			}
			c = c.next;
		}
		this.instance = this.shader.getInstance(this.constBits);
	}
	,__class__: hxsl.Shader
};
h3d.pass._Border = {};
h3d.pass._Border.BorderShader = function() {
	this.color__ = new h3d.Vector();
	hxsl.Shader.call(this);
};
$hxClasses["h3d.pass._Border.BorderShader"] = h3d.pass._Border.BorderShader;
h3d.pass._Border.BorderShader.__name__ = ["h3d","pass","_Border","BorderShader"];
h3d.pass._Border.BorderShader.__super__ = hxsl.Shader;
h3d.pass._Border.BorderShader.prototype = $extend(hxsl.Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.color__;
		default:
		}
		return null;
	}
	,__class__: h3d.pass._Border.BorderShader
});
h3d.pass.Border = function(width,height,size) {
	if(size == null) size = 1;
	h3d.pass.ScreenFx.call(this,new h3d.pass._Border.BorderShader());
	var bbuf;
	var this1;
	this1 = new Array(0);
	bbuf = this1;
	bbuf.push(0 / width * 2 - 1);
	bbuf.push(1 - 0 / height * 2);
	bbuf.push(width / width * 2 - 1);
	bbuf.push(1 - 0 / height * 2);
	bbuf.push(0 / width * 2 - 1);
	bbuf.push(1 - size / height * 2);
	bbuf.push(width / width * 2 - 1);
	bbuf.push(1 - size / height * 2);
	bbuf.push(0 / width * 2 - 1);
	bbuf.push(1 - 0 / height * 2);
	bbuf.push(size / width * 2 - 1);
	bbuf.push(1 - 0 / height * 2);
	bbuf.push(0 / width * 2 - 1);
	bbuf.push(1 - height / height * 2);
	bbuf.push(size / width * 2 - 1);
	bbuf.push(1 - height / height * 2);
	bbuf.push(0 / width * 2 - 1);
	bbuf.push(1 - (height - size) / height * 2);
	bbuf.push(width / width * 2 - 1);
	bbuf.push(1 - (height - size) / height * 2);
	bbuf.push(0 / width * 2 - 1);
	bbuf.push(1 - height / height * 2);
	bbuf.push(width / width * 2 - 1);
	bbuf.push(1 - height / height * 2);
	bbuf.push((width - size) / width * 2 - 1);
	bbuf.push(1 - 0 / height * 2);
	bbuf.push(width / width * 2 - 1);
	bbuf.push(1 - 0 / height * 2);
	bbuf.push((width - size) / width * 2 - 1);
	bbuf.push(1 - height / height * 2);
	bbuf.push(width / width * 2 - 1);
	bbuf.push(1 - height / height * 2);
	var plan = new h3d.prim.RawPrimitive(this.engine,bbuf,2);
	plan.buffer.flags &= 268435455 - (1 << h3d.BufferFlag.Triangles[1]);
	plan.buffer.flags |= 1 << h3d.BufferFlag.Quads[1];
	this.plan.dispose();
	this.plan = plan;
	this.shader.color__.set(1,1,1,1);
};
$hxClasses["h3d.pass.Border"] = h3d.pass.Border;
h3d.pass.Border.__name__ = ["h3d","pass","Border"];
h3d.pass.Border.__super__ = h3d.pass.ScreenFx;
h3d.pass.Border.prototype = $extend(h3d.pass.ScreenFx.prototype,{
	__class__: h3d.pass.Border
});
h3d.pass.Default = function() {
	h3d.pass.Base.call(this);
	this.manager = new h3d.shader.Manager(this.getOutputs());
	this.tcache = new h3d.impl.TextureCache();
	this.initGlobals();
};
$hxClasses["h3d.pass.Default"] = h3d.pass.Default;
h3d.pass.Default.__name__ = ["h3d","pass","Default"];
h3d.pass.Default.__super__ = h3d.pass.Base;
h3d.pass.Default.prototype = $extend(h3d.pass.Base.prototype,{
	getOutputs: function() {
		return ["output.position","output.color"];
	}
	,processShaders: function(p,shaders) {
		var p1 = this.ctx.extraShaders;
		while(p1 != null) {
			shaders = this.ctx.allocShaderList(p1.s,shaders);
			p1 = p1.next;
		}
		return shaders;
	}
	,setupShaders: function(passes) {
		var p = passes;
		var lightInit = false;
		while(p != null) {
			var shaders = p.pass.getShadersRec();
			shaders = this.processShaders(p,shaders);
			if(p.pass.enableLights && this.ctx.lightSystem != null) {
				if(!lightInit) {
					this.ctx.lightSystem.initLights(this.manager.globals,this.ctx);
					lightInit = true;
				}
				shaders = this.ctx.lightSystem.computeLight(p.obj,shaders);
			}
			p.shader = this.manager.compileShaders(shaders);
			p.shaders = shaders;
			p = p.next;
		}
	}
	,uploadParams: function() {
		this.manager.fillParams(this.cachedBuffer,this.ctx.drawPass.shader,this.ctx.drawPass.shaders);
		this.ctx.engine.uploadShaderBuffers(this.cachedBuffer,1);
		this.ctx.engine.uploadShaderBuffers(this.cachedBuffer,2);
	}
	,log: function(str) {
		this.ctx.engine.driver.log(str);
	}
	,draw: function(passes) {
		var $it0 = this.ctx.sharedGlobals.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			this.manager.globals.fastSet(k,this.ctx.sharedGlobals.get(k));
		}
		this.setGlobals();
		this.setupShaders(passes);
		passes = haxe.ds.ListSort.sortSingleLinked(passes,function(o1,o2) {
			var d = o1.shader.id - o2.shader.id;
			if(d != 0) return d;
			return 0;
		});
		this.ctx.uploadParams = $bind(this,this.uploadParams);
		var p = passes;
		var buf = this.cachedBuffer;
		var prevShader = null;
		this.ctx.engine.driver.log("Pass " + (passes == null?"???":passes.pass.name) + " start");
		while(p != null) {
			this.log("Render " + Std.string(p.obj) + "." + p.pass.name);
			this.set_globalModelView(p.obj.absPos);
			if(p.shader.globals.exists(this.globalModelViewInverse_id)) this.set_globalModelViewInverse(p.obj.getInvPos());
			if(prevShader != p.shader) {
				prevShader = p.shader;
				this.ctx.engine.selectShader(p.shader);
				if(buf == null) buf = this.cachedBuffer = new h3d.shader.Buffers(p.shader); else buf.grow(p.shader);
				this.manager.fillGlobals(buf,p.shader);
				this.ctx.engine.uploadShaderBuffers(buf,0);
			}
			if(!p.pass.dynamicParameters) {
				this.manager.fillParams(buf,p.shader,p.shaders);
				this.ctx.engine.uploadShaderBuffers(buf,1);
				this.ctx.engine.uploadShaderBuffers(buf,2);
			}
			this.ctx.drawPass = p;
			this.ctx.engine.selectMaterial(p.pass);
			p.obj.draw(this.ctx);
			p = p.next;
		}
		this.ctx.engine.driver.log("Pass " + (passes == null?"???":passes.pass.name) + " end");
		this.ctx.nextPass();
		return passes;
	}
	,set_cameraView: function(v) {
		this.manager.globals.fastSet(this.cameraView_id,v);
		return v;
	}
	,set_cameraProj: function(v) {
		this.manager.globals.fastSet(this.cameraProj_id,v);
		return v;
	}
	,set_cameraPos: function(v) {
		this.manager.globals.fastSet(this.cameraPos_id,v);
		return v;
	}
	,set_cameraProjDiag: function(v) {
		this.manager.globals.fastSet(this.cameraProjDiag_id,v);
		return v;
	}
	,set_cameraViewProj: function(v) {
		this.manager.globals.fastSet(this.cameraViewProj_id,v);
		return v;
	}
	,set_cameraInverseViewProj: function(v) {
		this.manager.globals.fastSet(this.cameraInverseViewProj_id,v);
		return v;
	}
	,set_globalTime: function(v) {
		this.manager.globals.fastSet(this.globalTime_id,v);
		return v;
	}
	,set_pixelSize: function(v) {
		this.manager.globals.fastSet(this.pixelSize_id,v);
		return v;
	}
	,set_globalModelView: function(v) {
		this.manager.globals.fastSet(this.globalModelView_id,v);
		return v;
	}
	,set_globalModelViewInverse: function(v) {
		this.manager.globals.fastSet(this.globalModelViewInverse_id,v);
		return v;
	}
	,initGlobals: function() {
		var this1;
		this1 = hxsl.Globals.allocID("camera.view");
		this.cameraView_id = this1;
		var this2;
		this2 = hxsl.Globals.allocID("camera.proj");
		this.cameraProj_id = this2;
		var this3;
		this3 = hxsl.Globals.allocID("camera.position");
		this.cameraPos_id = this3;
		var this4;
		this4 = hxsl.Globals.allocID("camera.projDiag");
		this.cameraProjDiag_id = this4;
		var this5;
		this5 = hxsl.Globals.allocID("camera.viewProj");
		this.cameraViewProj_id = this5;
		var this6;
		this6 = hxsl.Globals.allocID("camera.inverseViewProj");
		this.cameraInverseViewProj_id = this6;
		var this7;
		this7 = hxsl.Globals.allocID("global.time");
		this.globalTime_id = this7;
		var this8;
		this8 = hxsl.Globals.allocID("global.pixelSize");
		this.pixelSize_id = this8;
		var this9;
		this9 = hxsl.Globals.allocID("global.modelView");
		this.globalModelView_id = this9;
		var this10;
		this10 = hxsl.Globals.allocID("global.modelViewInverse");
		this.globalModelViewInverse_id = this10;
	}
	,setGlobals: function() {
		this.set_cameraView(this.ctx.camera.mcam);
		this.set_cameraProj(this.ctx.camera.mproj);
		this.set_cameraPos(this.ctx.camera.pos);
		this.set_cameraProjDiag(new h3d.Vector(this.ctx.camera.mproj._11,this.ctx.camera.mproj._22,this.ctx.camera.mproj._33,this.ctx.camera.mproj._44));
		this.set_cameraViewProj(this.ctx.camera.m);
		this.set_cameraInverseViewProj(this.ctx.camera.getInverseViewProj());
		this.set_globalTime(this.ctx.time);
		this.set_pixelSize(new h3d.Vector(2 / this.ctx.engine.width,2 / this.ctx.engine.height));
	}
	,__class__: h3d.pass.Default
	,__properties__: {set_globalModelViewInverse:"set_globalModelViewInverse",set_globalModelView:"set_globalModelView",set_pixelSize:"set_pixelSize",set_globalTime:"set_globalTime",set_cameraInverseViewProj:"set_cameraInverseViewProj",set_cameraViewProj:"set_cameraViewProj",set_cameraProjDiag:"set_cameraProjDiag",set_cameraPos:"set_cameraPos",set_cameraProj:"set_cameraProj",set_cameraView:"set_cameraView"}
});
h3d.pass.Depth = function() {
	this.reduceSize = 0;
	this.enableSky = false;
	h3d.pass.Default.call(this);
	this.priority = 10;
	this.depthMapId = hxsl.Globals.allocID("depthMap");
};
$hxClasses["h3d.pass.Depth"] = h3d.pass.Depth;
h3d.pass.Depth.__name__ = ["h3d","pass","Depth"];
h3d.pass.Depth.__super__ = h3d.pass.Default;
h3d.pass.Depth.prototype = $extend(h3d.pass.Default.prototype,{
	getOutputs: function() {
		return ["output.position","output.depth"];
	}
	,draw: function(passes) {
		var texture = this.tcache.allocTarget("depthMap",this.ctx,this.ctx.engine.width >> this.reduceSize,this.ctx.engine.height >> this.reduceSize);
		this.ctx.engine.setTarget(texture);
		this.ctx.engine.clear(this.enableSky?0:16711680,1);
		passes = h3d.pass.Default.prototype.draw.call(this,passes);
		this.ctx.sharedGlobals.set(this.depthMapId,texture);
		return passes;
	}
	,__class__: h3d.pass.Depth
});
h3d.pass.LightSystem = function() {
	this.perPixelLighting = true;
	this.maxLightsPerObject = 6;
	this.shadowDirection = new h3d.Vector(0,0,-1);
	this.ambientLight = new h3d.Vector(0.5,0.5,0.5);
	this.ambientShader = new h3d.shader.AmbientLight();
};
$hxClasses["h3d.pass.LightSystem"] = h3d.pass.LightSystem;
h3d.pass.LightSystem.__name__ = ["h3d","pass","LightSystem"];
h3d.pass.LightSystem.prototype = {
	initLights: function(globals,ctx) {
		this.lightCount = 0;
		this.ctx = ctx;
		var l = ctx.lights;
		var prev = null;
		var frustum = new h3d.col.Frustum(ctx.camera.m);
		var s = new h3d.col.Sphere();
		while(l != null) {
			s.x = l.absPos._41;
			s.y = l.absPos._42;
			s.z = l.absPos._43;
			s.r = l.cullingDistance;
			if(!frustum.checkSphere(s)) {
				if(prev == null) ctx.lights = l.next; else prev.next = l.next;
				l = l.next;
				continue;
			}
			this.lightCount++;
			l.objectDistance = 0.;
			prev = l;
			l = l.next;
		}
		if(this.lightCount <= this.maxLightsPerObject) ctx.lights = haxe.ds.ListSort.sortSingleLinked(ctx.lights,$bind(this,this.sortLight));
		globals.set("global.ambientLight",this.ambientLight);
		globals.set("global.perPixelLighting",this.perPixelLighting);
	}
	,sortLight: function(l1,l2) {
		var p = l1.priority - l2.priority;
		if(p != 0) return -p;
		if(l1.objectDistance < l2.objectDistance) return -1; else return 1;
	}
	,computeLight: function(obj,shaders) {
		var _g = this;
		if(this.lightCount > this.maxLightsPerObject) {
			var l = this.ctx.lights;
			while(l != null) {
				if((obj.flags & 16) != 0) l.objectDistance = hxd.Math.distanceSq(l.absPos._41 - this.ctx.camera.target.x,l.absPos._42 - this.ctx.camera.target.y,l.absPos._43 - this.ctx.camera.target.z); else l.objectDistance = hxd.Math.distanceSq(l.absPos._41 - obj.absPos._41,l.absPos._42 - obj.absPos._42,l.absPos._43 - obj.absPos._43);
				l = l.next;
			}
			this.ctx.lights = haxe.ds.ListSort.sortSingleLinked(this.ctx.lights,$bind(this,this.sortLight));
		}
		shaders = _g.ctx.allocShaderList(this.ambientShader,shaders);
		var l1 = this.ctx.lights;
		var i = 0;
		while(l1 != null) {
			if(i++ == this.maxLightsPerObject) break;
			shaders = _g.ctx.allocShaderList(l1.shader,shaders);
			l1 = l1.next;
		}
		return shaders;
	}
	,__class__: h3d.pass.LightSystem
};
h3d.pass.Normal = function() {
	h3d.pass.Default.call(this);
	this.priority = 10;
	this.normalMapId = hxsl.Globals.allocID("normalMap");
};
$hxClasses["h3d.pass.Normal"] = h3d.pass.Normal;
h3d.pass.Normal.__name__ = ["h3d","pass","Normal"];
h3d.pass.Normal.__super__ = h3d.pass.Default;
h3d.pass.Normal.prototype = $extend(h3d.pass.Default.prototype,{
	getOutputs: function() {
		return ["output.position","output.normal"];
	}
	,draw: function(passes) {
		var texture = this.tcache.allocTarget("normalMal",this.ctx,this.ctx.engine.width,this.ctx.engine.height);
		this.ctx.engine.setTarget(texture);
		this.ctx.engine.clear(0,1);
		passes = h3d.pass.Default.prototype.draw.call(this,passes);
		this.ctx.sharedGlobals.set(this.normalMapId,texture);
		return passes;
	}
	,__class__: h3d.pass.Normal
});
h3d.pass.Object = function() {
};
$hxClasses["h3d.pass.Object"] = h3d.pass.Object;
h3d.pass.Object.__name__ = ["h3d","pass","Object"];
h3d.pass.Object.prototype = {
	__class__: h3d.pass.Object
};
h3d.pass.Params = function() { };
$hxClasses["h3d.pass.Params"] = h3d.pass.Params;
h3d.pass.Params.__name__ = ["h3d","pass","Params"];
h3d.pass.ShadowMap = function(size) {
	this.bias = 0.01;
	this.power = 10.0;
	h3d.pass.Default.call(this);
	this.set_size(size);
	this.priority = 9;
	this.lightDirection = new h3d.Vector(0,0,-1);
	this.lightCamera = new h3d.Camera();
	this.lightCamera.orthoBounds = new h3d.col.Bounds();
	this.shadowMapId = hxsl.Globals.allocID("shadow.map");
	this.shadowProjId = hxsl.Globals.allocID("shadow.proj");
	this.shadowColorId = hxsl.Globals.allocID("shadow.color");
	this.shadowPowerId = hxsl.Globals.allocID("shadow.power");
	this.shadowBiasId = hxsl.Globals.allocID("shadow.bias");
	this.color = new h3d.Vector();
	this.blur = new h3d.pass.Blur(2,3);
	this.border = new h3d.pass.Border(size,size);
};
$hxClasses["h3d.pass.ShadowMap"] = h3d.pass.ShadowMap;
h3d.pass.ShadowMap.__name__ = ["h3d","pass","ShadowMap"];
h3d.pass.ShadowMap.__super__ = h3d.pass.Default;
h3d.pass.ShadowMap.prototype = $extend(h3d.pass.Default.prototype,{
	set_size: function(s) {
		if(this.border != null) {
			this.border.dispose();
			this.border = new h3d.pass.Border(s,s);
		}
		return this.size = s;
	}
	,calcShadowBounds: function(camera) {
		var bounds = camera.orthoBounds;
		bounds.xMin = -10;
		bounds.yMin = -10;
		bounds.zMin = -10;
		bounds.xMax = 10;
		bounds.yMax = 10;
		bounds.zMax = 10;
	}
	,getOutputs: function() {
		return ["output.position","output.depth"];
	}
	,setGlobals: function() {
		h3d.pass.Default.prototype.setGlobals.call(this);
		this.lightCamera.orthoBounds.empty();
		this.calcShadowBounds(this.lightCamera);
		this.lightCamera.update();
		this.set_cameraViewProj(this.lightCamera.m);
	}
	,draw: function(passes) {
		var texture = this.tcache.allocTarget("shadowMap",this.ctx,this.size,this.size);
		var ct = this.ctx.camera.target;
		this.lightCamera.target.set(this.lightDirection.x,this.lightDirection.y,this.lightDirection.z,null);
		this.lightCamera.target.normalize();
		this.lightCamera.target.x += ct.x;
		this.lightCamera.target.y += ct.y;
		this.lightCamera.target.z += ct.z;
		this.lightCamera.pos.load(ct);
		this.lightCamera.update();
		this.ctx.engine.setTarget(texture);
		this.ctx.engine.clear(16777215,1,this.tcache.fullClearRequired?0:null);
		passes = h3d.pass.Default.prototype.draw.call(this,passes);
		if(this.border != null) this.border.render();
		if(this.blur.quality > 0 && this.blur.passes > 0) this.blur.apply(texture,this.tcache.allocTarget("tmpBlur",this.ctx,this.size,this.size,false),null,true);
		this.ctx.sharedGlobals.set(this.shadowMapId,texture);
		this.ctx.sharedGlobals.set(this.shadowProjId,this.lightCamera.m);
		this.ctx.sharedGlobals.set(this.shadowColorId,this.color);
		this.ctx.sharedGlobals.set(this.shadowPowerId,this.power);
		this.ctx.sharedGlobals.set(this.shadowBiasId,this.bias);
		return passes;
	}
	,__class__: h3d.pass.ShadowMap
	,__properties__: $extend(h3d.pass.Default.prototype.__properties__,{set_size:"set_size"})
});
h3d.prim = {};
h3d.prim.Primitive = function() { };
$hxClasses["h3d.prim.Primitive"] = h3d.prim.Primitive;
h3d.prim.Primitive.__name__ = ["h3d","prim","Primitive"];
h3d.prim.Primitive.prototype = {
	alloc: function(engine) {
		throw "not implemented";
	}
	,render: function(engine) {
		if(this.buffer == null || this.buffer.isDisposed()) this.alloc(engine);
		if(this.indexes == null) {
			if((this.buffer.flags & 1 << h3d.BufferFlag.Quads[1]) != 0) engine.renderBuffer(this.buffer,engine.mem.quadIndexes,2,0,-1); else engine.renderBuffer(this.buffer,engine.mem.triIndexes,3,0,-1);
		} else engine.renderIndexed(this.buffer,this.indexes);
	}
	,dispose: function() {
		if(this.buffer != null) {
			this.buffer.dispose();
			this.buffer = null;
		}
		if(this.indexes != null) {
			this.indexes.dispose();
			this.indexes = null;
		}
	}
	,__class__: h3d.prim.Primitive
};
h3d.prim.Polygon = function(points,idx) {
	this.points = points;
	this.idx = idx;
};
$hxClasses["h3d.prim.Polygon"] = h3d.prim.Polygon;
h3d.prim.Polygon.__name__ = ["h3d","prim","Polygon"];
h3d.prim.Polygon.__super__ = h3d.prim.Primitive;
h3d.prim.Polygon.prototype = $extend(h3d.prim.Primitive.prototype,{
	alloc: function(engine) {
		this.dispose();
		var size = 3;
		if(this.normals != null) size += 3;
		if(this.uvs != null) size += 2;
		if(this.colors != null) size += 3;
		var buf;
		var this1;
		this1 = new Array(0);
		buf = this1;
		var _g1 = 0;
		var _g = this.points.length;
		while(_g1 < _g) {
			var k = _g1++;
			var p = this.points[k];
			buf.push(p.x);
			buf.push(p.y);
			buf.push(p.z);
			if(this.normals != null) {
				var n = this.normals[k];
				buf.push(n.x);
				buf.push(n.y);
				buf.push(n.z);
			}
			if(this.uvs != null) {
				var t = this.uvs[k];
				buf.push(t.u);
				buf.push(t.v);
			}
			if(this.colors != null) {
				var c = this.colors[k];
				buf.push(c.x);
				buf.push(c.y);
				buf.push(c.z);
			}
		}
		var flags = [];
		if(this.idx == null) flags.push(h3d.BufferFlag.Triangles);
		if(this.normals == null) flags.push(h3d.BufferFlag.RawFormat);
		this.buffer = h3d.Buffer.ofFloats(buf,size,flags,{ fileName : "Polygon.hx", lineNumber : 62, className : "h3d.prim.Polygon", methodName : "alloc"});
		if(this.idx != null) this.indexes = h3d.Indexes.alloc(this.idx);
	}
	,__class__: h3d.prim.Polygon
});
h3d.prim.GeoSphere = function(subdiv) {
	if(subdiv == null) subdiv = 2;
	var a = 1 / Math.sqrt(2);
	var p = [new h3d.col.Point(0,0,1),new h3d.col.Point(0,0,-1),new h3d.col.Point(-a,-a,0),new h3d.col.Point(a,-a,0),new h3d.col.Point(a,a,0),new h3d.col.Point(-a,a,0)];
	var idx;
	var this1;
	this1 = new Array(0);
	idx = this1;
	idx.push(0);
	idx.push(3);
	idx.push(4);
	idx.push(0);
	idx.push(4);
	idx.push(5);
	idx.push(0);
	idx.push(5);
	idx.push(2);
	idx.push(0);
	idx.push(2);
	idx.push(3);
	idx.push(1);
	idx.push(4);
	idx.push(3);
	idx.push(1);
	idx.push(5);
	idx.push(4);
	idx.push(1);
	idx.push(2);
	idx.push(5);
	idx.push(1);
	idx.push(3);
	idx.push(2);
	var _g = 0;
	while(_g < subdiv) {
		var k = _g++;
		var i = 0;
		var count = idx.length;
		var np = p.length;
		var nidx;
		var this2;
		this2 = new Array(0);
		nidx = this2;
		while(i < count) {
			var p1 = p[idx[i]];
			var p2 = p[idx[i + 1]];
			var p3 = p[idx[i + 2]];
			var pa = new h3d.col.Point(p1.x + p2.x,p1.y + p2.y,p1.z + p2.z);
			var pb = new h3d.col.Point(p2.x + p3.x,p2.y + p3.y,p2.z + p3.z);
			var pc = new h3d.col.Point(p3.x + p1.x,p3.y + p1.y,p3.z + p1.z);
			pa.normalize();
			pb.normalize();
			pc.normalize();
			nidx.push(np);
			nidx.push(np + 1);
			nidx.push(np + 2);
			nidx.push(idx[i]);
			nidx.push(np);
			nidx.push(np + 2);
			nidx.push(np);
			nidx.push(idx[i + 1]);
			nidx.push(np + 1);
			nidx.push(np + 1);
			nidx.push(idx[i + 2]);
			nidx.push(np + 2);
			p[np++] = pa;
			p[np++] = pb;
			p[np++] = pc;
			i += 3;
		}
		idx = nidx;
	}
	h3d.prim.Polygon.call(this,p,idx);
};
$hxClasses["h3d.prim.GeoSphere"] = h3d.prim.GeoSphere;
h3d.prim.GeoSphere.__name__ = ["h3d","prim","GeoSphere"];
h3d.prim.GeoSphere.__super__ = h3d.prim.Polygon;
h3d.prim.GeoSphere.prototype = $extend(h3d.prim.Polygon.prototype,{
	__class__: h3d.prim.GeoSphere
});
h3d.prim.Plan2D = function() {
};
$hxClasses["h3d.prim.Plan2D"] = h3d.prim.Plan2D;
h3d.prim.Plan2D.__name__ = ["h3d","prim","Plan2D"];
h3d.prim.Plan2D.__super__ = h3d.prim.Primitive;
h3d.prim.Plan2D.prototype = $extend(h3d.prim.Primitive.prototype,{
	alloc: function(engine) {
		var v;
		var this1;
		this1 = new Array(0);
		v = this1;
		v.push(-1);
		v.push(-1);
		v.push(0);
		v.push(1);
		v.push(-1);
		v.push(1);
		v.push(0);
		v.push(0);
		v.push(1);
		v.push(-1);
		v.push(1);
		v.push(1);
		v.push(1);
		v.push(1);
		v.push(1);
		v.push(0);
		this.buffer = h3d.Buffer.ofFloats(v,4,[h3d.BufferFlag.Quads,h3d.BufferFlag.RawFormat],{ fileName : "Plan2D.hx", lineNumber : 30, className : "h3d.prim.Plan2D", methodName : "alloc"});
	}
	,render: function(engine) {
		if(this.buffer == null) this.alloc(engine);
		engine.renderBuffer(this.buffer,engine.mem.quadIndexes,2,0,-1);
	}
	,__class__: h3d.prim.Plan2D
});
h3d.prim.RawPrimitive = function(engine,vbuf,stride,ibuf) {
	var flags = [];
	if(ibuf == null) flags.push(h3d.BufferFlag.Triangles);
	if(stride < 8) flags.push(h3d.BufferFlag.RawFormat);
	this.buffer = h3d.Buffer.ofFloats(vbuf,stride,flags,{ fileName : "RawPrimitive.hx", lineNumber : 9, className : "h3d.prim.RawPrimitive", methodName : "new"});
	if(ibuf != null) this.indexes = h3d.Indexes.alloc(ibuf);
};
$hxClasses["h3d.prim.RawPrimitive"] = h3d.prim.RawPrimitive;
h3d.prim.RawPrimitive.__name__ = ["h3d","prim","RawPrimitive"];
h3d.prim.RawPrimitive.__super__ = h3d.prim.Primitive;
h3d.prim.RawPrimitive.prototype = $extend(h3d.prim.Primitive.prototype,{
	__class__: h3d.prim.RawPrimitive
});
h3d.prim.UV = function() { };
$hxClasses["h3d.prim.UV"] = h3d.prim.UV;
h3d.prim.UV.__name__ = ["h3d","prim","UV"];
h3d.prim.UV.prototype = {
	__class__: h3d.prim.UV
};
h3d.scene = {};
h3d.scene.Object = function(parent) {
	this.flags = 0;
	this.absPos = new h3d.Matrix();
	this.absPos.identity();
	this.x = 0;
	this.flags |= 1;
	true;
	0;
	this.y = 0;
	this.flags |= 1;
	true;
	0;
	this.z = 0;
	this.flags |= 1;
	true;
	0;
	this.scaleX = 1;
	this.flags |= 1;
	true;
	1;
	this.scaleY = 1;
	this.flags |= 1;
	true;
	1;
	this.scaleZ = 1;
	this.flags |= 1;
	true;
	1;
	this.qRot = new h3d.Quat();
	this.flags &= ~1;
	false;
	this.set_culled(false);
	this.flags |= 2;
	true;
	this.childs = [];
	if(parent != null) parent.addChild(this);
};
$hxClasses["h3d.scene.Object"] = h3d.scene.Object;
h3d.scene.Object.__name__ = ["h3d","scene","Object"];
h3d.scene.Object.prototype = {
	set_posChanged: function(b) {
		if(b) this.flags |= 1; else this.flags &= ~1;
		return b;
	}
	,set_culled: function(b) {
		if(b) this.flags |= 4; else this.flags &= ~4;
		return b;
	}
	,set_visible: function(b) {
		this.set_culled(!b);
		if(b) this.flags |= 2; else this.flags &= ~2;
		return b;
	}
	,getInvPos: function() {
		if(this.invPos == null) {
			this.invPos = new h3d.Matrix();
			this.invPos._44 = 0;
		}
		if(this.invPos._44 == 0) this.invPos.inverse3x4(this.absPos);
		return this.invPos;
	}
	,addChild: function(o) {
		this.addChildAt(o,this.childs.length);
	}
	,addChildAt: function(o,pos) {
		if(pos < 0) pos = 0;
		if(pos > this.childs.length) pos = this.childs.length;
		var p = this;
		while(p != null) {
			if(p == o) throw "Recursive addChild";
			p = p.parent;
		}
		if(o.parent != null) o.parent.removeChild(o);
		this.childs.splice(pos,0,o);
		o.parent = this;
		o.lastFrame = -1;
		o.flags |= 1;
		true;
	}
	,removeChild: function(o) {
		if(HxOverrides.remove(this.childs,o)) o.parent = null;
	}
	,remove: function() {
		if(this.parent != null) this.parent.removeChild(this);
	}
	,draw: function(ctx) {
	}
	,calcAbsPos: function() {
		this.qRot.saveToMatrix(this.absPos);
		this.absPos._11 *= this.scaleX;
		this.absPos._12 *= this.scaleX;
		this.absPos._13 *= this.scaleX;
		this.absPos._21 *= this.scaleY;
		this.absPos._22 *= this.scaleY;
		this.absPos._23 *= this.scaleY;
		this.absPos._31 *= this.scaleZ;
		this.absPos._32 *= this.scaleZ;
		this.absPos._33 *= this.scaleZ;
		this.absPos._41 = this.x;
		this.absPos._42 = this.y;
		this.absPos._43 = this.z;
		if(this.follow != null) {
			this.follow.syncPos();
			if((this.flags & 8) != 0) {
				var _g = this.absPos;
				_g._41 = _g._41 + this.follow.absPos._41;
				var _g1 = this.absPos;
				_g1._42 = _g1._42 + this.follow.absPos._42;
				var _g2 = this.absPos;
				_g2._43 = _g2._43 + this.follow.absPos._43;
			} else this.absPos.multiply3x4(this.absPos,this.follow.absPos);
		} else if(this.parent != null) this.absPos.multiply3x4inline(this.absPos,this.parent.absPos);
		if(this.defaultTransform != null) this.absPos.multiply3x4inline(this.defaultTransform,this.absPos);
		if(this.invPos != null) this.invPos._44 = 0;
	}
	,sync: function(ctx) {
	}
	,syncRec: function(ctx) {
		if(this.currentAnimation != null) {
			var old = this.parent;
			var dt = ctx.elapsedTime;
			while(dt > 0 && this.currentAnimation != null) dt = this.currentAnimation.update(dt);
			if(this.currentAnimation != null) this.currentAnimation.sync();
			if(this.parent == null && old != null) return;
		}
		var changed = (this.flags & 1) != 0;
		if(changed) this.calcAbsPos();
		this.sync(ctx);
		this.set_posChanged(this.follow == null);
		this.lastFrame = ctx.frame;
		var p = 0;
		var len = this.childs.length;
		while(p < len) {
			var c = this.childs[p];
			if(c == null) break;
			if(c.lastFrame != ctx.frame) {
				if(changed) {
					c.flags |= 1;
					true;
				}
				c.syncRec(ctx);
			}
			if(this.childs[p] != c) {
				p = 0;
				len = this.childs.length;
			} else p++;
		}
	}
	,syncPos: function() {
		if(this.parent != null) this.parent.syncPos();
		if((this.flags & 1) != 0) {
			this.flags &= ~1;
			false;
			this.calcAbsPos();
			var _g = 0;
			var _g1 = this.childs;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.flags |= 1;
				true;
			}
		}
	}
	,emit: function(ctx) {
	}
	,emitRec: function(ctx) {
		if((this.flags & 4) != 0) return;
		if((this.flags & 1) != 0) {
			if(this.currentAnimation != null) this.currentAnimation.sync();
			this.flags &= ~1;
			false;
			this.calcAbsPos();
			var _g = 0;
			var _g1 = this.childs;
			while(_g < _g1.length) {
				var c = _g1[_g];
				++_g;
				c.flags |= 1;
				true;
			}
		}
		this.emit(ctx);
		var _g2 = 0;
		var _g11 = this.childs;
		while(_g2 < _g11.length) {
			var c1 = _g11[_g2];
			++_g2;
			c1.emitRec(ctx);
		}
	}
	,set_x: function(v) {
		this.x = v;
		this.flags |= 1;
		true;
		return v;
	}
	,set_y: function(v) {
		this.y = v;
		this.flags |= 1;
		true;
		return v;
	}
	,set_z: function(v) {
		this.z = v;
		this.flags |= 1;
		true;
		return v;
	}
	,set_scaleX: function(v) {
		this.scaleX = v;
		this.flags |= 1;
		true;
		return v;
	}
	,set_scaleY: function(v) {
		this.scaleY = v;
		this.flags |= 1;
		true;
		return v;
	}
	,set_scaleZ: function(v) {
		this.scaleZ = v;
		this.flags |= 1;
		true;
		return v;
	}
	,setPos: function(x,y,z) {
		this.x = x;
		this.flags |= 1;
		true;
		x;
		this.y = y;
		this.flags |= 1;
		true;
		y;
		this.z = z;
		this.flags |= 1;
		true;
		z;
		this.flags |= 1;
		true;
	}
	,setRotate: function(rx,ry,rz) {
		this.qRot.initRotate(rx,ry,rz);
		this.flags |= 1;
		true;
	}
	,scale: function(v) {
		var _g = this;
		_g.set_scaleX(_g.scaleX * v);
		var _g1 = this;
		_g1.set_scaleY(_g1.scaleY * v);
		var _g2 = this;
		_g2.set_scaleZ(_g2.scaleZ * v);
		this.flags |= 1;
		true;
	}
	,toString: function() {
		return Type.getClassName(Type.getClass(this)).split(".").pop() + (this.name == null?"":"(" + this.name + ")");
	}
	,__class__: h3d.scene.Object
	,__properties__: {set_visible:"set_visible",set_culled:"set_culled",set_posChanged:"set_posChanged",set_scaleZ:"set_scaleZ",set_scaleY:"set_scaleY",set_scaleX:"set_scaleX",set_z:"set_z",set_y:"set_y",set_x:"set_x"}
};
h3d.scene.Light = function() {
	this.priority = 0;
	this.cullingDistance = 1e10;
};
$hxClasses["h3d.scene.Light"] = h3d.scene.Light;
h3d.scene.Light.__name__ = ["h3d","scene","Light"];
h3d.scene.Light.__super__ = h3d.scene.Object;
h3d.scene.Light.prototype = $extend(h3d.scene.Object.prototype,{
	emit: function(ctx) {
		ctx.emitLight(this);
	}
	,__class__: h3d.scene.Light
});
h3d.scene.Mesh = function(prim,mat,parent) {
	h3d.scene.Object.call(this,parent);
	this.primitive = prim;
	if(mat == null) mat = new h3d.mat.MeshMaterial(null);
	this.material = mat;
};
$hxClasses["h3d.scene.Mesh"] = h3d.scene.Mesh;
h3d.scene.Mesh.__name__ = ["h3d","scene","Mesh"];
h3d.scene.Mesh.__super__ = h3d.scene.Object;
h3d.scene.Mesh.prototype = $extend(h3d.scene.Object.prototype,{
	draw: function(ctx) {
		this.primitive.render(ctx.engine);
	}
	,emit: function(ctx) {
		ctx.emit(this.material,this,null);
	}
	,__class__: h3d.scene.Mesh
});
h3d.scene.RenderContext = function() {
	h3d.impl.RenderContext.call(this);
	this.cachedShaderList = [];
};
$hxClasses["h3d.scene.RenderContext"] = h3d.scene.RenderContext;
h3d.scene.RenderContext.__name__ = ["h3d","scene","RenderContext"];
h3d.scene.RenderContext.__super__ = h3d.impl.RenderContext;
h3d.scene.RenderContext.prototype = $extend(h3d.impl.RenderContext.prototype,{
	emit: function(mat,obj,index) {
		if(index == null) index = 0;
		var p = mat.passes;
		while(p != null) {
			this.emitPass(p,obj).index = index;
			p = p.nextPass;
		}
	}
	,start: function() {
		this.sharedGlobals = new haxe.ds.IntMap();
		this.lights = null;
		this.drawPass = null;
		this.passes = null;
		this.lights = null;
		this.uploadParams = null;
		this.cachedPos = 0;
		this.time += this.elapsedTime;
		this.frame++;
	}
	,nextPass: function() {
		this.cachedPos = 0;
		this.drawPass = null;
	}
	,emitPass: function(pass,obj) {
		var o = this.pool;
		if(o == null) o = new h3d.pass.Object(); else this.pool = o.next;
		o.pass = pass;
		o.obj = obj;
		o.next = this.passes;
		this.passes = o;
		return o;
	}
	,allocShaderList: function(s,next) {
		var sl = this.cachedShaderList[this.cachedPos++];
		if(sl == null) {
			sl = new hxsl.ShaderList(null);
			this.cachedShaderList[this.cachedPos - 1] = sl;
		}
		sl.s = s;
		sl.next = next;
		return sl;
	}
	,emitLight: function(l) {
		l.next = this.lights;
		this.lights = l;
	}
	,done: function() {
		this.drawPass = null;
		this.uploadParams = null;
		var p = this.passes;
		var prev = null;
		while(p != null) {
			p.obj = null;
			p.pass = null;
			p.shader = null;
			p.shaders = null;
			p.index = 0;
			prev = p;
			p = p.next;
		}
		if(prev != null) {
			prev.next = this.pool;
			this.pool = this.passes;
		}
		var _g = 0;
		var _g1 = this.cachedShaderList;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			c.s = null;
			c.next = null;
		}
		this.passes = null;
		this.lights = null;
	}
	,__class__: h3d.scene.RenderContext
});
h3d.scene.PassGroup = function(name,passes) {
	this.name = name;
	this.passes = passes;
};
$hxClasses["h3d.scene.PassGroup"] = h3d.scene.PassGroup;
h3d.scene.PassGroup.__name__ = ["h3d","scene","PassGroup"];
h3d.scene.PassGroup.prototype = {
	__class__: h3d.scene.PassGroup
};
h3d.scene.Renderer = function() {
	this.passes = new haxe.ds.StringMap();
	this.allPasses = [];
	this.tcache = new h3d.impl.TextureCache();
	this.passGroups = new haxe.ds.StringMap();
};
$hxClasses["h3d.scene.Renderer"] = h3d.scene.Renderer;
h3d.scene.Renderer.__name__ = ["h3d","scene","Renderer"];
h3d.scene.Renderer.prototype = {
	createDefaultPass: function(name) {
		switch(name) {
		case "depth":
			if(this.depth != null) return this.depth;
			return this.depth = new h3d.pass.Depth();
		case "normal":
			if(this.normal != null) return this.normal;
			return this.normal = new h3d.pass.Normal();
		case "shadow":
			if(this.shadow != null) return this.shadow;
			return this.shadow = new h3d.pass.ShadowMap(1024);
		default:
			if(this.def != null) return this.def;
			return this.def = new h3d.pass.Default();
		}
	}
	,getPass: function(name) {
		var p = this.passes.get(name);
		if(p == null) {
			p = this.createDefaultPass(name);
			this.setPass(name,p);
		}
		return p;
	}
	,setPass: function(name,p) {
		var _g = 0;
		var _g1 = this.allPasses;
		while(_g < _g1.length) {
			var p1 = _g1[_g];
			++_g;
			if(p1.name == name) HxOverrides.remove(this.allPasses,p1);
		}
		this.passes.set(name,p);
		this.allPasses.push({ name : name, p : p});
		this.allPasses.sort(function(p11,p2) {
			return p2.p.priority - p11.p.priority;
		});
	}
	,depthSort: function(passes) {
		var p = passes;
		var cam = this.ctx.camera.m;
		while(p != null) {
			var z = p.obj.absPos._41 * cam._13 + p.obj.absPos._42 * cam._23 + p.obj.absPos._43 * cam._33 + cam._43;
			var w = p.obj.absPos._41 * cam._14 + p.obj.absPos._42 * cam._24 + p.obj.absPos._43 * cam._34 + cam._44;
			p.depth = z / w;
			p = p.next;
		}
		return haxe.ds.ListSort.sortSingleLinked(passes,function(p1,p2) {
			if(p1.depth > p2.depth) return -1; else return 1;
		});
	}
	,render: function() {
		var _g = 0;
		var _g1 = this.allPasses;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			var pdata = this.passGroups.get(p.name);
			if(pdata != null && pdata.rendered) continue;
			if(pdata != null || p.p.forceProcessing) {
				p.p.setContext(this.ctx);
				var passes;
				if(pdata == null) passes = null; else passes = pdata.passes;
				if(p.name == "alpha") passes = this.depthSort(passes);
				if(p.name == "default") this.ctx.engine.setTarget(null);
				passes = p.p.draw(passes);
				if(pdata != null) {
					pdata.passes = passes;
					pdata.rendered = true;
				}
			}
		}
	}
	,process: function(ctx,passes) {
		this.ctx = ctx;
		var _g = 0;
		while(_g < passes.length) {
			var p = passes[_g];
			++_g;
			this.getPass(p.name).setContext(ctx);
			this.passGroups.set(p.name,p);
		}
		this.render();
		var _g1 = 0;
		while(_g1 < passes.length) {
			var p1 = passes[_g1];
			++_g1;
			this.passGroups.set(p1.name,null);
		}
	}
	,__class__: h3d.scene.Renderer
};
h3d.scene.Scene = function() {
	h3d.scene.Object.call(this,null);
	this.camera = new h3d.Camera();
	this.ctx = new h3d.scene.RenderContext();
	this.renderer = new h3d.scene.Renderer();
	this.lightSystem = new h3d.pass.LightSystem();
	this.postPasses = [];
	this.prePasses = [];
};
$hxClasses["h3d.scene.Scene"] = h3d.scene.Scene;
h3d.scene.Scene.__name__ = ["h3d","scene","Scene"];
h3d.scene.Scene.__interfaces__ = [h3d.IDrawable];
h3d.scene.Scene.__super__ = h3d.scene.Object;
h3d.scene.Scene.prototype = $extend(h3d.scene.Object.prototype,{
	addPass: function(p,before) {
		if(before == null) before = false;
		if(before) this.prePasses.push(p); else this.postPasses.push(p);
	}
	,render: function(engine) {
		this.camera.screenRatio = engine.width / engine.height;
		this.camera.update();
		this.ctx.camera = this.camera;
		this.ctx.engine = engine;
		this.ctx.start();
		var _g = 0;
		var _g1 = this.prePasses;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			p.render(engine);
		}
		this.syncRec(this.ctx);
		this.emitRec(this.ctx);
		this.ctx.passes = haxe.ds.ListSort.sortSingleLinked(this.ctx.passes,function(p1,p2) {
			return p1.pass.passId - p2.pass.passId;
		});
		var curPass = this.ctx.passes;
		var passes = [];
		while(curPass != null) {
			var passId = curPass.pass.passId;
			var p3 = curPass;
			var prev = null;
			while(p3 != null && p3.pass.passId == passId) {
				prev = p3;
				p3 = p3.next;
			}
			prev.next = null;
			passes.push(new h3d.scene.PassGroup(curPass.pass.name,curPass));
			curPass = p3;
		}
		this.ctx.lightSystem = this.lightSystem;
		this.renderer.process(this.ctx,passes);
		var count = 0;
		var prev1 = null;
		var _g2 = 0;
		while(_g2 < passes.length) {
			var p4 = passes[_g2];
			++_g2;
			if(!p4.rendered) throw "Pass " + p4.name + " has not been rendered : don't know how to handle.";
			var p5 = p4.passes;
			if(prev1 != null) prev1.next = p5;
			while(p5 != null) {
				prev1 = p5;
				p5 = p5.next;
			}
		}
		if(passes.length > 0) this.ctx.passes = passes[0].passes;
		this.ctx.done();
		var _g3 = 0;
		var _g11 = this.postPasses;
		while(_g3 < _g11.length) {
			var p6 = _g11[_g3];
			++_g3;
			p6.render(engine);
		}
		this.ctx.camera = null;
		this.ctx.engine = null;
	}
	,__class__: h3d.scene.Scene
});
h3d.shader = {};
h3d.shader.AmbientLight = function() {
	hxsl.Shader.call(this);
};
$hxClasses["h3d.shader.AmbientLight"] = h3d.shader.AmbientLight;
h3d.shader.AmbientLight.__name__ = ["h3d","shader","AmbientLight"];
h3d.shader.AmbientLight.__super__ = hxsl.Shader;
h3d.shader.AmbientLight.prototype = $extend(hxsl.Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		return null;
	}
	,__class__: h3d.shader.AmbientLight
});
h3d.shader.Base2d = function() {
	this.viewport__ = new h3d.Vector();
	this.color__ = new h3d.Vector();
	this.absoluteMatrixB__ = new h3d.Vector();
	this.halfPixelInverse__ = new h3d.Vector();
	this.absoluteMatrixA__ = new h3d.Vector();
	this.zValue__ = 0;
	hxsl.Shader.call(this);
};
$hxClasses["h3d.shader.Base2d"] = h3d.shader.Base2d;
h3d.shader.Base2d.__name__ = ["h3d","shader","Base2d"];
h3d.shader.Base2d.__super__ = hxsl.Shader;
h3d.shader.Base2d.prototype = $extend(hxsl.Shader.prototype,{
	set_pixelAlign: function(_v) {
		this.constModified = true;
		return this.pixelAlign__ = _v;
	}
	,set_isRelative: function(_v) {
		this.constModified = true;
		return this.isRelative__ = _v;
	}
	,updateConstants: function(globals) {
		this.constBits = 0;
		if(this.pixelAlign__) this.constBits |= 1;
		if(this.isRelative__) this.constBits |= 2;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.zValue__;
		case 1:
			return this.absoluteMatrixA__;
		case 2:
			return this.texture__;
		case 3:
			return this.pixelAlign__;
		case 4:
			return this.halfPixelInverse__;
		case 5:
			return this.isRelative__;
		case 6:
			return this.absoluteMatrixB__;
		case 7:
			return this.color__;
		case 8:
			return this.viewport__;
		default:
		}
		return null;
	}
	,__class__: h3d.shader.Base2d
	,__properties__: {set_isRelative:"set_isRelative",set_pixelAlign:"set_pixelAlign"}
});
h3d.shader.BaseMesh = function() {
	this.color__ = new h3d.Vector();
	hxsl.Shader.call(this);
	this.color__.set(1,1,1,null);
};
$hxClasses["h3d.shader.BaseMesh"] = h3d.shader.BaseMesh;
h3d.shader.BaseMesh.__name__ = ["h3d","shader","BaseMesh"];
h3d.shader.BaseMesh.__super__ = hxsl.Shader;
h3d.shader.BaseMesh.prototype = $extend(hxsl.Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.color__;
		default:
		}
		return null;
	}
	,__class__: h3d.shader.BaseMesh
});
h3d.shader.ScreenShader = function() {
	hxsl.Shader.call(this);
};
$hxClasses["h3d.shader.ScreenShader"] = h3d.shader.ScreenShader;
h3d.shader.ScreenShader.__name__ = ["h3d","shader","ScreenShader"];
h3d.shader.ScreenShader.__super__ = hxsl.Shader;
h3d.shader.ScreenShader.prototype = $extend(hxsl.Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		return null;
	}
	,__class__: h3d.shader.ScreenShader
});
h3d.shader.Blur = function() {
	this.values__ = new Array();
	this.fixedColor__ = new h3d.Vector();
	this.pixel__ = new h3d.Vector();
	this.Quality__ = 0;
	h3d.shader.ScreenShader.call(this);
};
$hxClasses["h3d.shader.Blur"] = h3d.shader.Blur;
h3d.shader.Blur.__name__ = ["h3d","shader","Blur"];
h3d.shader.Blur.__super__ = h3d.shader.ScreenShader;
h3d.shader.Blur.prototype = $extend(h3d.shader.ScreenShader.prototype,{
	set_Quality: function(_v) {
		this.constModified = true;
		return this.Quality__ = _v;
	}
	,set_isDepth: function(_v) {
		this.constModified = true;
		return this.isDepth__ = _v;
	}
	,updateConstants: function(globals) {
		this.constBits = 0;
		var v = this.Quality__;
		if(v >>> 8 != 0) throw "Quality" + " is out of range " + v + ">" + 255;
		this.constBits |= v;
		if(this.hasFixedColor__) this.constBits |= 256;
		if(this.isDepth__) this.constBits |= 512;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.Quality__;
		case 1:
			return this.pixel__;
		case 2:
			return this.hasFixedColor__;
		case 3:
			return this.fixedColor__;
		case 4:
			return this.values__;
		case 5:
			return this.texture__;
		case 6:
			return this.isDepth__;
		default:
		}
		return null;
	}
	,__class__: h3d.shader.Blur
	,__properties__: {set_isDepth:"set_isDepth",set_Quality:"set_Quality"}
});
h3d.shader.ShaderBuffers = function(s) {
	var this1;
	this1 = new Array(s.globalsSize << 2);
	this.globals = this1;
	var this2;
	this2 = new Array(s.paramsSize << 2);
	this.params = this2;
	var this3;
	this3 = new Array(s.textures2DCount + s.texturesCubeCount);
	this.tex = this3;
};
$hxClasses["h3d.shader.ShaderBuffers"] = h3d.shader.ShaderBuffers;
h3d.shader.ShaderBuffers.__name__ = ["h3d","shader","ShaderBuffers"];
h3d.shader.ShaderBuffers.prototype = {
	grow: function(s) {
		var ng = s.globalsSize << 2;
		var np = s.paramsSize << 2;
		var nt = s.textures2DCount + s.texturesCubeCount;
		if(this.globals.length < ng) {
			var this1;
			this1 = new Array(ng);
			this.globals = this1;
		}
		if(this.params.length < np) {
			var this2;
			this2 = new Array(np);
			this.params = this2;
		}
		if(this.tex.length < nt) {
			var this3;
			this3 = new Array(nt);
			this.tex = this3;
		}
	}
	,__class__: h3d.shader.ShaderBuffers
};
h3d.shader.Buffers = function(s) {
	this.vertex = new h3d.shader.ShaderBuffers(s.vertex);
	this.fragment = new h3d.shader.ShaderBuffers(s.fragment);
};
$hxClasses["h3d.shader.Buffers"] = h3d.shader.Buffers;
h3d.shader.Buffers.__name__ = ["h3d","shader","Buffers"];
h3d.shader.Buffers.prototype = {
	grow: function(s) {
		this.vertex.grow(s.vertex);
		this.fragment.grow(s.fragment);
	}
	,__class__: h3d.shader.Buffers
};
h3d.shader.ColorAdd = function() {
	this.color__ = new h3d.Vector();
};
$hxClasses["h3d.shader.ColorAdd"] = h3d.shader.ColorAdd;
h3d.shader.ColorAdd.__name__ = ["h3d","shader","ColorAdd"];
h3d.shader.ColorAdd.__super__ = hxsl.Shader;
h3d.shader.ColorAdd.prototype = $extend(hxsl.Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.color__;
		default:
		}
		return null;
	}
	,__class__: h3d.shader.ColorAdd
});
h3d.shader.ColorKey = function() {
	this.colorKey__ = new h3d.Vector();
};
$hxClasses["h3d.shader.ColorKey"] = h3d.shader.ColorKey;
h3d.shader.ColorKey.__name__ = ["h3d","shader","ColorKey"];
h3d.shader.ColorKey.__super__ = hxsl.Shader;
h3d.shader.ColorKey.prototype = $extend(hxsl.Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.colorKey__;
		default:
		}
		return null;
	}
	,__class__: h3d.shader.ColorKey
});
h3d.shader.ColorMatrix = function() {
	this.matrix__ = new h3d.Matrix();
};
$hxClasses["h3d.shader.ColorMatrix"] = h3d.shader.ColorMatrix;
h3d.shader.ColorMatrix.__name__ = ["h3d","shader","ColorMatrix"];
h3d.shader.ColorMatrix.__super__ = hxsl.Shader;
h3d.shader.ColorMatrix.prototype = $extend(hxsl.Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.matrix__;
		default:
		}
		return null;
	}
	,__class__: h3d.shader.ColorMatrix
});
h3d.shader.Manager = function(output) {
	this.shaderCache = hxsl.Cache.get();
	this.globals = new hxsl.Globals();
	this.output = this.shaderCache.allocOutputVars(output);
};
$hxClasses["h3d.shader.Manager"] = h3d.shader.Manager;
h3d.shader.Manager.__name__ = ["h3d","shader","Manager"];
h3d.shader.Manager.prototype = {
	fillRec: function(v,type,out,pos) {
		switch(type[1]) {
		case 3:
			var val = v;
			out[pos] = val;
			return 1;
		case 5:
			var n = type[2];
			var v1 = v;
			var index = pos++;
			out[index] = v1.x;
			var index1 = pos++;
			out[index1] = v1.y;
			switch(n) {
			case 3:
				var index2 = pos++;
				out[index2] = v1.z;
				break;
			case 4:
				var index3 = pos++;
				out[index3] = v1.z;
				var index4 = pos++;
				out[index4] = v1.w;
				break;
			}
			return n;
		case 7:
			var m = v;
			var index5 = pos++;
			out[index5] = m._11;
			var index6 = pos++;
			out[index6] = m._21;
			var index7 = pos++;
			out[index7] = m._31;
			var index8 = pos++;
			out[index8] = m._41;
			var index9 = pos++;
			out[index9] = m._12;
			var index10 = pos++;
			out[index10] = m._22;
			var index11 = pos++;
			out[index11] = m._32;
			var index12 = pos++;
			out[index12] = m._42;
			var index13 = pos++;
			out[index13] = m._13;
			var index14 = pos++;
			out[index14] = m._23;
			var index15 = pos++;
			out[index15] = m._33;
			var index16 = pos++;
			out[index16] = m._43;
			var index17 = pos++;
			out[index17] = m._14;
			var index18 = pos++;
			out[index18] = m._24;
			var index19 = pos++;
			out[index19] = m._34;
			var index20 = pos++;
			out[index20] = m._44;
			return 16;
		case 8:
			var m1 = v;
			var index21 = pos++;
			out[index21] = m1._11;
			var index22 = pos++;
			out[index22] = m1._21;
			var index23 = pos++;
			out[index23] = m1._31;
			var index24 = pos++;
			out[index24] = m1._41;
			var index25 = pos++;
			out[index25] = m1._12;
			var index26 = pos++;
			out[index26] = m1._22;
			var index27 = pos++;
			out[index27] = m1._32;
			var index28 = pos++;
			out[index28] = m1._42;
			var index29 = pos++;
			out[index29] = m1._13;
			var index30 = pos++;
			out[index30] = m1._23;
			var index31 = pos++;
			out[index31] = m1._33;
			var index32 = pos++;
			out[index32] = m1._43;
			return 12;
		case 6:
			var m2 = v;
			var index33 = pos++;
			out[index33] = m2._11;
			var index34 = pos++;
			out[index34] = m2._21;
			var index35 = pos++;
			out[index35] = m2._31;
			var index36 = pos++;
			out[index36] = 0;
			var index37 = pos++;
			out[index37] = m2._12;
			var index38 = pos++;
			out[index38] = m2._22;
			var index39 = pos++;
			out[index39] = m2._32;
			var index40 = pos++;
			out[index40] = 0;
			var index41 = pos++;
			out[index41] = m2._13;
			var index42 = pos++;
			out[index42] = m2._23;
			var index43 = pos++;
			out[index43] = m2._33;
			var index44 = pos++;
			out[index44] = 0;
			return 12;
		case 14:
			var t = type[2];
			switch(type[2][1]) {
			case 5:
				switch(type[2][2]) {
				case 4:
					switch(type[2][3][1]) {
					case 1:
						switch(type[3][1]) {
						case 0:
							var len = type[3][2];
							var v2 = v;
							var _g = 0;
							while(_g < len) {
								var i = _g++;
								var n1 = v2[i];
								if(n1 == null) break;
								var index45 = pos++;
								out[index45] = n1.x;
								var index46 = pos++;
								out[index46] = n1.y;
								var index47 = pos++;
								out[index47] = n1.z;
								var index48 = pos++;
								out[index48] = n1.w;
							}
							return len * 4;
						default:
							throw "assert " + Std.string(type);
						}
						break;
					default:
						switch(type[3][1]) {
						case 0:
							var len1 = type[3][2];
							var v3 = v;
							var size = 0;
							var _g1 = 0;
							while(_g1 < len1) {
								var i1 = _g1++;
								var n2 = v3[i1];
								if(n2 == null) break;
								size = this.fillRec(n2,t,out,pos);
								pos += size;
							}
							return len1 * size;
						default:
							throw "assert " + Std.string(type);
						}
					}
					break;
				default:
					switch(type[3][1]) {
					case 0:
						var len1 = type[3][2];
						var v3 = v;
						var size = 0;
						var _g1 = 0;
						while(_g1 < len1) {
							var i1 = _g1++;
							var n2 = v3[i1];
							if(n2 == null) break;
							size = this.fillRec(n2,t,out,pos);
							pos += size;
						}
						return len1 * size;
					default:
						throw "assert " + Std.string(type);
					}
				}
				break;
			case 8:
				switch(type[3][1]) {
				case 0:
					var len2 = type[3][2];
					var v4 = v;
					var _g2 = 0;
					while(_g2 < len2) {
						var i2 = _g2++;
						var m3 = v4[i2];
						if(m3 == null) break;
						var index49 = pos++;
						out[index49] = m3._11;
						var index50 = pos++;
						out[index50] = m3._21;
						var index51 = pos++;
						out[index51] = m3._31;
						var index52 = pos++;
						out[index52] = m3._41;
						var index53 = pos++;
						out[index53] = m3._12;
						var index54 = pos++;
						out[index54] = m3._22;
						var index55 = pos++;
						out[index55] = m3._32;
						var index56 = pos++;
						out[index56] = m3._42;
						var index57 = pos++;
						out[index57] = m3._13;
						var index58 = pos++;
						out[index58] = m3._23;
						var index59 = pos++;
						out[index59] = m3._33;
						var index60 = pos++;
						out[index60] = m3._43;
					}
					return len2 * 12;
				default:
					throw "assert " + Std.string(type);
				}
				break;
			default:
				switch(type[3][1]) {
				case 0:
					var len1 = type[3][2];
					var v3 = v;
					var size = 0;
					var _g1 = 0;
					while(_g1 < len1) {
						var i1 = _g1++;
						var n2 = v3[i1];
						if(n2 == null) break;
						size = this.fillRec(n2,t,out,pos);
						pos += size;
					}
					return len1 * size;
				default:
					throw "assert " + Std.string(type);
				}
			}
			break;
		case 12:
			var vl = type[2];
			var tot = 0;
			var _g3 = 0;
			while(_g3 < vl.length) {
				var vv = vl[_g3];
				++_g3;
				tot += this.fillRec(Reflect.field(v,vv.name),vv.type,out,pos + tot);
			}
			return tot;
		default:
			throw "assert " + Std.string(type);
		}
		return 0;
	}
	,getParamValue: function(p,shaders) {
		if(p.perObjectGlobal != null) {
			var v = this.globals.map.get(p.perObjectGlobal.gid);
			if(v == null) throw "Missing global value " + p.perObjectGlobal.path;
			return v;
		}
		var si = shaders;
		var n = p.instance;
		while(n-- > 0) si = si.next;
		var v1 = si.s.getParamValue(p.index);
		if(v1 == null) throw "Missing param value " + Std.string(si.s) + "." + p.name;
		return v1;
	}
	,fillGlobals: function(buf,s) {
		var _g = this;
		var buf1 = buf.vertex;
		var s1 = s.vertex;
		var g = s1.globals;
		while(g != null) {
			var v = _g.globals.map.get(g.gid);
			if(v == null) {
				if(g.path == "__consts__") {
					_g.fillRec(s1.consts,g.type,buf1.globals,g.pos);
					g = g.next;
					continue;
				}
				throw "Missing global value " + g.path;
			}
			_g.fillRec(v,g.type,buf1.globals,g.pos);
			g = g.next;
		}
		var buf2 = buf.fragment;
		var s2 = s.fragment;
		var g1 = s2.globals;
		while(g1 != null) {
			var v1 = _g.globals.map.get(g1.gid);
			if(v1 == null) {
				if(g1.path == "__consts__") {
					_g.fillRec(s2.consts,g1.type,buf2.globals,g1.pos);
					g1 = g1.next;
					continue;
				}
				throw "Missing global value " + g1.path;
			}
			_g.fillRec(v1,g1.type,buf2.globals,g1.pos);
			g1 = g1.next;
		}
	}
	,fillParams: function(buf,s,shaders) {
		var _g = this;
		var buf1 = buf.vertex;
		var s1 = s.vertex;
		var p = s1.params;
		while(p != null) {
			var v = _g.getParamValue(p,shaders);
			_g.fillRec(v,p.type,buf1.params,p.pos);
			p = p.next;
		}
		var tid = 0;
		var p1 = s1.textures2D;
		while(p1 != null) {
			var t = _g.getParamValue(p1,shaders);
			if(t == null) t = h3d.mat.Texture.fromColor(16711935,null,{ fileName : "Manager.hx", lineNumber : 183, className : "h3d.shader.Manager", methodName : "fillParams"});
			var index = tid++;
			buf1.tex[index] = t;
			p1 = p1.next;
		}
		var p2 = s1.texturesCube;
		while(p2 != null) {
			var t1 = _g.getParamValue(p2,shaders);
			if(t1 == null) t1 = h3d.mat.Texture.fromColor(16711935,null,{ fileName : "Manager.hx", lineNumber : 190, className : "h3d.shader.Manager", methodName : "fillParams"});
			var index1 = tid++;
			buf1.tex[index1] = t1;
			p2 = p2.next;
		}
		var buf2 = buf.fragment;
		var s2 = s.fragment;
		var p3 = s2.params;
		while(p3 != null) {
			var v1 = _g.getParamValue(p3,shaders);
			_g.fillRec(v1,p3.type,buf2.params,p3.pos);
			p3 = p3.next;
		}
		var tid1 = 0;
		var p4 = s2.textures2D;
		while(p4 != null) {
			var t2 = _g.getParamValue(p4,shaders);
			if(t2 == null) t2 = h3d.mat.Texture.fromColor(16711935,null,{ fileName : "Manager.hx", lineNumber : 183, className : "h3d.shader.Manager", methodName : "fillParams"});
			var index2 = tid1++;
			buf2.tex[index2] = t2;
			p4 = p4.next;
		}
		var p5 = s2.texturesCube;
		while(p5 != null) {
			var t3 = _g.getParamValue(p5,shaders);
			if(t3 == null) t3 = h3d.mat.Texture.fromColor(16711935,null,{ fileName : "Manager.hx", lineNumber : 190, className : "h3d.shader.Manager", methodName : "fillParams"});
			var index3 = tid1++;
			buf2.tex[index3] = t3;
			p5 = p5.next;
		}
	}
	,compileShaders: function(shaders) {
		var _g = new hxsl._ShaderList.ShaderIterator(shaders);
		while(_g.l != null) {
			var s = _g.next();
			s.updateConstants(this.globals);
		}
		return this.shaderCache.link(shaders,this.output);
	}
	,__class__: h3d.shader.Manager
};
h3d.shader.Shadow = function() { };
$hxClasses["h3d.shader.Shadow"] = h3d.shader.Shadow;
h3d.shader.Shadow.__name__ = ["h3d","shader","Shadow"];
h3d.shader.Shadow.__super__ = hxsl.Shader;
h3d.shader.Shadow.prototype = $extend(hxsl.Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		return null;
	}
	,__class__: h3d.shader.Shadow
});
h3d.shader.Skin = function() {
	this.MaxBones__ = 0;
	this.bonesMatrixes__ = new Array();
};
$hxClasses["h3d.shader.Skin"] = h3d.shader.Skin;
h3d.shader.Skin.__name__ = ["h3d","shader","Skin"];
h3d.shader.Skin.__super__ = hxsl.Shader;
h3d.shader.Skin.prototype = $extend(hxsl.Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		var v = this.MaxBones__;
		if(v >>> 8 != 0) throw "MaxBones" + " is out of range " + v + ">" + 255;
		this.constBits |= v;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.bonesMatrixes__;
		case 1:
			return this.MaxBones__;
		default:
		}
		return null;
	}
	,__class__: h3d.shader.Skin
});
h3d.shader.Texture = function(tex) {
	this.killAlphaThreshold__ = 0;
	hxsl.Shader.call(this);
	this.texture__ = tex;
	this.killAlphaThreshold__ = h3d.pass.Params.defaultKillAlphaThreshold;
};
$hxClasses["h3d.shader.Texture"] = h3d.shader.Texture;
h3d.shader.Texture.__name__ = ["h3d","shader","Texture"];
h3d.shader.Texture.__super__ = hxsl.Shader;
h3d.shader.Texture.prototype = $extend(hxsl.Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		if(this.additive__) this.constBits |= 1;
		if(this.killAlpha__) this.constBits |= 2;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.additive__;
		case 1:
			return this.texture__;
		case 2:
			return this.killAlphaThreshold__;
		case 3:
			return this.killAlpha__;
		default:
		}
		return null;
	}
	,__class__: h3d.shader.Texture
});
h3d.shader.UVScroll = function() {
	this.uvDelta__ = new h3d.Vector();
};
$hxClasses["h3d.shader.UVScroll"] = h3d.shader.UVScroll;
h3d.shader.UVScroll.__name__ = ["h3d","shader","UVScroll"];
h3d.shader.UVScroll.__super__ = hxsl.Shader;
h3d.shader.UVScroll.prototype = $extend(hxsl.Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.uvDelta__;
		default:
		}
		return null;
	}
	,__class__: h3d.shader.UVScroll
});
h3d.shader.VertexColor = function() { };
$hxClasses["h3d.shader.VertexColor"] = h3d.shader.VertexColor;
h3d.shader.VertexColor.__name__ = ["h3d","shader","VertexColor"];
h3d.shader.VertexColor.__super__ = hxsl.Shader;
h3d.shader.VertexColor.prototype = $extend(hxsl.Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		if(this.additive__) this.constBits |= 1;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.additive__;
		default:
		}
		return null;
	}
	,__class__: h3d.shader.VertexColor
});
var haxe = {};
haxe.Resource = function() { };
$hxClasses["haxe.Resource"] = haxe.Resource;
haxe.Resource.__name__ = ["haxe","Resource"];
haxe.Resource.getBytes = function(name) {
	var _g = 0;
	var _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return haxe.io.Bytes.ofString(x.str);
			return haxe.crypto.Base64.decode(x.data);
		}
	}
	return null;
};
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
$hxClasses["haxe.Timer"] = haxe.Timer;
haxe.Timer.__name__ = ["haxe","Timer"];
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe.Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
haxe.Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe.Timer
};
haxe.Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe.Unserializer;
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0;
	var _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
};
haxe.Unserializer.prototype = {
	setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw "Invalid object";
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw "Invalid object key";
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw "Invalid enum format";
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = new Array();
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			var p1 = this.pos;
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
			}
			return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return Math.NaN;
		case 109:
			return Math.NEGATIVE_INFINITY;
		case 112:
			return Math.POSITIVE_INFINITY;
		case 97:
			var buf = this.buf;
			var a = new Array();
			this.cache.push(a);
			while(true) {
				var c1 = this.buf.charCodeAt(this.pos);
				if(c1 == 104) {
					this.pos++;
					break;
				}
				if(c1 == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw "Invalid reference";
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw "Invalid string reference";
			return this.scache[n2];
		case 120:
			throw this.unserialize();
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw "Class not found " + name;
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw "Enum not found " + name1;
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw "Enum not found " + name2;
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw "Unknown enum index " + name2 + "@" + index;
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe.ds.StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe.ds.IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c2 = this.get(this.pos++);
			while(c2 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c2 = this.get(this.pos++);
			}
			if(c2 != 104) throw "Invalid IntMap format";
			return h1;
		case 77:
			var h2 = new haxe.ds.ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			var s3 = HxOverrides.substr(this.buf,this.pos,19);
			d = HxOverrides.strDate(s3);
			this.cache.push(d);
			this.pos += 19;
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw "Invalid bytes length";
			var codes = haxe.Unserializer.CODES;
			if(codes == null) {
				codes = haxe.Unserializer.initCodes();
				haxe.Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe.io.Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c21 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c21 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c22 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c22 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c22 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw "Class not found " + name3;
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw "Invalid custom data";
			return o2;
		default:
		}
		this.pos--;
		throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
	}
	,__class__: haxe.Unserializer
};
haxe.io = {};
haxe.io.Bytes = function(length,b) {
	this.length = length;
	this.b = b;
};
$hxClasses["haxe.io.Bytes"] = haxe.io.Bytes;
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
};
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var i = 0;
	while(i < s.length) {
		var c = StringTools.fastCodeAt(s,i++);
		if(55296 <= c && c <= 56319) c = c - 55232 << 10 | StringTools.fastCodeAt(s,i++) & 1023;
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
};
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
};
haxe.io.Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,blit: function(pos,src,srcpos,len) {
		if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
		var b1 = this.b;
		var b2 = src.b;
		if(b1 == b2 && pos > srcpos) {
			var i = len;
			while(i > 0) {
				i--;
				b1[i + pos] = b2[i + srcpos];
			}
			return;
		}
		var _g = 0;
		while(_g < len) {
			var i1 = _g++;
			b1[i1 + pos] = b2[i1 + srcpos];
		}
	}
	,fill: function(pos,len,value) {
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.set(pos++,value);
		}
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe.io.Bytes
};
haxe.crypto = {};
haxe.crypto.Base64 = function() { };
$hxClasses["haxe.crypto.Base64"] = haxe.crypto.Base64;
haxe.crypto.Base64.__name__ = ["haxe","crypto","Base64"];
haxe.crypto.Base64.decode = function(str,complement) {
	if(complement == null) complement = true;
	if(complement) while(HxOverrides.cca(str,str.length - 1) == 61) str = HxOverrides.substr(str,0,-1);
	return new haxe.crypto.BaseCode(haxe.crypto.Base64.BYTES).decodeBytes(haxe.io.Bytes.ofString(str));
};
haxe.crypto.BaseCode = function(base) {
	var len = base.length;
	var nbits = 1;
	while(len > 1 << nbits) nbits++;
	if(nbits > 8 || len != 1 << nbits) throw "BaseCode : base length must be a power of two.";
	this.base = base;
	this.nbits = nbits;
};
$hxClasses["haxe.crypto.BaseCode"] = haxe.crypto.BaseCode;
haxe.crypto.BaseCode.__name__ = ["haxe","crypto","BaseCode"];
haxe.crypto.BaseCode.prototype = {
	initTable: function() {
		var tbl = new Array();
		var _g = 0;
		while(_g < 256) {
			var i = _g++;
			tbl[i] = -1;
		}
		var _g1 = 0;
		var _g2 = this.base.length;
		while(_g1 < _g2) {
			var i1 = _g1++;
			tbl[this.base.b[i1]] = i1;
		}
		this.tbl = tbl;
	}
	,decodeBytes: function(b) {
		var nbits = this.nbits;
		var base = this.base;
		if(this.tbl == null) this.initTable();
		var tbl = this.tbl;
		var size = b.length * nbits >> 3;
		var out = haxe.io.Bytes.alloc(size);
		var buf = 0;
		var curbits = 0;
		var pin = 0;
		var pout = 0;
		while(pout < size) {
			while(curbits < 8) {
				curbits += nbits;
				buf <<= nbits;
				var i = tbl[b.get(pin++)];
				if(i == -1) throw "BaseCode : invalid encoded char";
				buf |= i;
			}
			curbits -= 8;
			out.set(pout++,buf >> curbits & 255);
		}
		return out;
	}
	,__class__: haxe.crypto.BaseCode
};
haxe.crypto.Crc32 = function() {
	this.crc = -1;
};
$hxClasses["haxe.crypto.Crc32"] = haxe.crypto.Crc32;
haxe.crypto.Crc32.__name__ = ["haxe","crypto","Crc32"];
haxe.crypto.Crc32.prototype = {
	'byte': function(b) {
		var tmp = (this.crc ^ b) & 255;
		var _g = 0;
		while(_g < 8) {
			var j = _g++;
			if((tmp & 1) == 1) tmp = tmp >>> 1 ^ -306674912; else tmp >>>= 1;
		}
		this.crc = this.crc >>> 8 ^ tmp;
	}
	,update: function(b,pos,len) {
		var b1 = b.b;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			var tmp = (this.crc ^ b1[i]) & 255;
			var _g2 = 0;
			while(_g2 < 8) {
				var j = _g2++;
				if((tmp & 1) == 1) tmp = tmp >>> 1 ^ -306674912; else tmp >>>= 1;
			}
			this.crc = this.crc >>> 8 ^ tmp;
		}
	}
	,get: function() {
		return this.crc ^ -1;
	}
	,__class__: haxe.crypto.Crc32
};
haxe.crypto.Md5 = function() {
};
$hxClasses["haxe.crypto.Md5"] = haxe.crypto.Md5;
haxe.crypto.Md5.__name__ = ["haxe","crypto","Md5"];
haxe.crypto.Md5.encode = function(s) {
	var m = new haxe.crypto.Md5();
	var h = m.doEncode(haxe.crypto.Md5.str2blks(s));
	return m.hex(h);
};
haxe.crypto.Md5.str2blks = function(str) {
	var nblk = (str.length + 8 >> 6) + 1;
	var blks = new Array();
	var blksSize = nblk * 16;
	var _g = 0;
	while(_g < blksSize) {
		var i = _g++;
		blks[i] = 0;
	}
	var i1 = 0;
	while(i1 < str.length) {
		blks[i1 >> 2] |= HxOverrides.cca(str,i1) << (str.length * 8 + i1) % 4 * 8;
		i1++;
	}
	blks[i1 >> 2] |= 128 << (str.length * 8 + i1) % 4 * 8;
	var l = str.length * 8;
	var k = nblk * 16 - 2;
	blks[k] = l & 255;
	blks[k] |= (l >>> 8 & 255) << 8;
	blks[k] |= (l >>> 16 & 255) << 16;
	blks[k] |= (l >>> 24 & 255) << 24;
	return blks;
};
haxe.crypto.Md5.prototype = {
	bitOR: function(a,b) {
		var lsb = a & 1 | b & 1;
		var msb31 = a >>> 1 | b >>> 1;
		return msb31 << 1 | lsb;
	}
	,bitXOR: function(a,b) {
		var lsb = a & 1 ^ b & 1;
		var msb31 = a >>> 1 ^ b >>> 1;
		return msb31 << 1 | lsb;
	}
	,bitAND: function(a,b) {
		var lsb = a & 1 & (b & 1);
		var msb31 = a >>> 1 & b >>> 1;
		return msb31 << 1 | lsb;
	}
	,addme: function(x,y) {
		var lsw = (x & 65535) + (y & 65535);
		var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
		return msw << 16 | lsw & 65535;
	}
	,hex: function(a) {
		var str = "";
		var hex_chr = "0123456789abcdef";
		var _g = 0;
		while(_g < a.length) {
			var num = a[_g];
			++_g;
			var _g1 = 0;
			while(_g1 < 4) {
				var j = _g1++;
				str += hex_chr.charAt(num >> j * 8 + 4 & 15) + hex_chr.charAt(num >> j * 8 & 15);
			}
		}
		return str;
	}
	,rol: function(num,cnt) {
		return num << cnt | num >>> 32 - cnt;
	}
	,cmn: function(q,a,b,x,s,t) {
		return this.addme(this.rol(this.addme(this.addme(a,q),this.addme(x,t)),s),b);
	}
	,ff: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitOR(this.bitAND(b,c),this.bitAND(~b,d)),a,b,x,s,t);
	}
	,gg: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitOR(this.bitAND(b,d),this.bitAND(c,~d)),a,b,x,s,t);
	}
	,hh: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitXOR(this.bitXOR(b,c),d),a,b,x,s,t);
	}
	,ii: function(a,b,c,d,x,s,t) {
		return this.cmn(this.bitXOR(c,this.bitOR(b,~d)),a,b,x,s,t);
	}
	,doEncode: function(x) {
		var a = 1732584193;
		var b = -271733879;
		var c = -1732584194;
		var d = 271733878;
		var step;
		var i = 0;
		while(i < x.length) {
			var olda = a;
			var oldb = b;
			var oldc = c;
			var oldd = d;
			step = 0;
			a = this.ff(a,b,c,d,x[i],7,-680876936);
			d = this.ff(d,a,b,c,x[i + 1],12,-389564586);
			c = this.ff(c,d,a,b,x[i + 2],17,606105819);
			b = this.ff(b,c,d,a,x[i + 3],22,-1044525330);
			a = this.ff(a,b,c,d,x[i + 4],7,-176418897);
			d = this.ff(d,a,b,c,x[i + 5],12,1200080426);
			c = this.ff(c,d,a,b,x[i + 6],17,-1473231341);
			b = this.ff(b,c,d,a,x[i + 7],22,-45705983);
			a = this.ff(a,b,c,d,x[i + 8],7,1770035416);
			d = this.ff(d,a,b,c,x[i + 9],12,-1958414417);
			c = this.ff(c,d,a,b,x[i + 10],17,-42063);
			b = this.ff(b,c,d,a,x[i + 11],22,-1990404162);
			a = this.ff(a,b,c,d,x[i + 12],7,1804603682);
			d = this.ff(d,a,b,c,x[i + 13],12,-40341101);
			c = this.ff(c,d,a,b,x[i + 14],17,-1502002290);
			b = this.ff(b,c,d,a,x[i + 15],22,1236535329);
			a = this.gg(a,b,c,d,x[i + 1],5,-165796510);
			d = this.gg(d,a,b,c,x[i + 6],9,-1069501632);
			c = this.gg(c,d,a,b,x[i + 11],14,643717713);
			b = this.gg(b,c,d,a,x[i],20,-373897302);
			a = this.gg(a,b,c,d,x[i + 5],5,-701558691);
			d = this.gg(d,a,b,c,x[i + 10],9,38016083);
			c = this.gg(c,d,a,b,x[i + 15],14,-660478335);
			b = this.gg(b,c,d,a,x[i + 4],20,-405537848);
			a = this.gg(a,b,c,d,x[i + 9],5,568446438);
			d = this.gg(d,a,b,c,x[i + 14],9,-1019803690);
			c = this.gg(c,d,a,b,x[i + 3],14,-187363961);
			b = this.gg(b,c,d,a,x[i + 8],20,1163531501);
			a = this.gg(a,b,c,d,x[i + 13],5,-1444681467);
			d = this.gg(d,a,b,c,x[i + 2],9,-51403784);
			c = this.gg(c,d,a,b,x[i + 7],14,1735328473);
			b = this.gg(b,c,d,a,x[i + 12],20,-1926607734);
			a = this.hh(a,b,c,d,x[i + 5],4,-378558);
			d = this.hh(d,a,b,c,x[i + 8],11,-2022574463);
			c = this.hh(c,d,a,b,x[i + 11],16,1839030562);
			b = this.hh(b,c,d,a,x[i + 14],23,-35309556);
			a = this.hh(a,b,c,d,x[i + 1],4,-1530992060);
			d = this.hh(d,a,b,c,x[i + 4],11,1272893353);
			c = this.hh(c,d,a,b,x[i + 7],16,-155497632);
			b = this.hh(b,c,d,a,x[i + 10],23,-1094730640);
			a = this.hh(a,b,c,d,x[i + 13],4,681279174);
			d = this.hh(d,a,b,c,x[i],11,-358537222);
			c = this.hh(c,d,a,b,x[i + 3],16,-722521979);
			b = this.hh(b,c,d,a,x[i + 6],23,76029189);
			a = this.hh(a,b,c,d,x[i + 9],4,-640364487);
			d = this.hh(d,a,b,c,x[i + 12],11,-421815835);
			c = this.hh(c,d,a,b,x[i + 15],16,530742520);
			b = this.hh(b,c,d,a,x[i + 2],23,-995338651);
			a = this.ii(a,b,c,d,x[i],6,-198630844);
			d = this.ii(d,a,b,c,x[i + 7],10,1126891415);
			c = this.ii(c,d,a,b,x[i + 14],15,-1416354905);
			b = this.ii(b,c,d,a,x[i + 5],21,-57434055);
			a = this.ii(a,b,c,d,x[i + 12],6,1700485571);
			d = this.ii(d,a,b,c,x[i + 3],10,-1894986606);
			c = this.ii(c,d,a,b,x[i + 10],15,-1051523);
			b = this.ii(b,c,d,a,x[i + 1],21,-2054922799);
			a = this.ii(a,b,c,d,x[i + 8],6,1873313359);
			d = this.ii(d,a,b,c,x[i + 15],10,-30611744);
			c = this.ii(c,d,a,b,x[i + 6],15,-1560198380);
			b = this.ii(b,c,d,a,x[i + 13],21,1309151649);
			a = this.ii(a,b,c,d,x[i + 4],6,-145523070);
			d = this.ii(d,a,b,c,x[i + 11],10,-1120210379);
			c = this.ii(c,d,a,b,x[i + 2],15,718787259);
			b = this.ii(b,c,d,a,x[i + 9],21,-343485551);
			a = this.addme(a,olda);
			b = this.addme(b,oldb);
			c = this.addme(c,oldc);
			d = this.addme(d,oldd);
			i += 16;
		}
		return [a,b,c,d];
	}
	,__class__: haxe.crypto.Md5
};
haxe.ds = {};
haxe.ds.ArraySort = function() { };
$hxClasses["haxe.ds.ArraySort"] = haxe.ds.ArraySort;
haxe.ds.ArraySort.__name__ = ["haxe","ds","ArraySort"];
haxe.ds.ArraySort.sort = function(a,cmp) {
	haxe.ds.ArraySort.rec(a,cmp,0,a.length);
};
haxe.ds.ArraySort.rec = function(a,cmp,from,to) {
	var middle = from + to >> 1;
	if(to - from < 12) {
		if(to <= from) return;
		var _g = from + 1;
		while(_g < to) {
			var i = _g++;
			var j = i;
			while(j > from) {
				if(cmp(a[j],a[j - 1]) < 0) haxe.ds.ArraySort.swap(a,j - 1,j); else break;
				j--;
			}
		}
		return;
	}
	haxe.ds.ArraySort.rec(a,cmp,from,middle);
	haxe.ds.ArraySort.rec(a,cmp,middle,to);
	haxe.ds.ArraySort.doMerge(a,cmp,from,middle,to,middle - from,to - middle);
};
haxe.ds.ArraySort.doMerge = function(a,cmp,from,pivot,to,len1,len2) {
	var first_cut;
	var second_cut;
	var len11;
	var len22;
	var new_mid;
	if(len1 == 0 || len2 == 0) return;
	if(len1 + len2 == 2) {
		if(cmp(a[pivot],a[from]) < 0) haxe.ds.ArraySort.swap(a,pivot,from);
		return;
	}
	if(len1 > len2) {
		len11 = len1 >> 1;
		first_cut = from + len11;
		second_cut = haxe.ds.ArraySort.lower(a,cmp,pivot,to,first_cut);
		len22 = second_cut - pivot;
	} else {
		len22 = len2 >> 1;
		second_cut = pivot + len22;
		first_cut = haxe.ds.ArraySort.upper(a,cmp,from,pivot,second_cut);
		len11 = first_cut - from;
	}
	haxe.ds.ArraySort.rotate(a,cmp,first_cut,pivot,second_cut);
	new_mid = first_cut + len22;
	haxe.ds.ArraySort.doMerge(a,cmp,from,first_cut,new_mid,len11,len22);
	haxe.ds.ArraySort.doMerge(a,cmp,new_mid,second_cut,to,len1 - len11,len2 - len22);
};
haxe.ds.ArraySort.rotate = function(a,cmp,from,mid,to) {
	var n;
	if(from == mid || mid == to) return;
	n = haxe.ds.ArraySort.gcd(to - from,mid - from);
	while(n-- != 0) {
		var val = a[from + n];
		var shift = mid - from;
		var p1 = from + n;
		var p2 = from + n + shift;
		while(p2 != from + n) {
			a[p1] = a[p2];
			p1 = p2;
			if(to - p2 > shift) p2 += shift; else p2 = from + (shift - (to - p2));
		}
		a[p1] = val;
	}
};
haxe.ds.ArraySort.gcd = function(m,n) {
	while(n != 0) {
		var t = m % n;
		m = n;
		n = t;
	}
	return m;
};
haxe.ds.ArraySort.upper = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[val],a[mid]) < 0) len = half; else {
			from = mid + 1;
			len = len - half - 1;
		}
	}
	return from;
};
haxe.ds.ArraySort.lower = function(a,cmp,from,to,val) {
	var len = to - from;
	var half;
	var mid;
	while(len > 0) {
		half = len >> 1;
		mid = from + half;
		if(cmp(a[mid],a[val]) < 0) {
			from = mid + 1;
			len = len - half - 1;
		} else len = half;
	}
	return from;
};
haxe.ds.ArraySort.swap = function(a,i,j) {
	var tmp = a[i];
	a[i] = a[j];
	a[j] = tmp;
};
haxe.ds.BalancedTree = function() {
};
$hxClasses["haxe.ds.BalancedTree"] = haxe.ds.BalancedTree;
haxe.ds.BalancedTree.__name__ = ["haxe","ds","BalancedTree"];
haxe.ds.BalancedTree.prototype = {
	set: function(key,value) {
		this.root = this.setLoop(key,value,this.root);
	}
	,get: function(key) {
		var node = this.root;
		while(node != null) {
			var c = this.compare(key,node.key);
			if(c == 0) return node.value;
			if(c < 0) node = node.left; else node = node.right;
		}
		return null;
	}
	,iterator: function() {
		var ret = [];
		this.iteratorLoop(this.root,ret);
		return HxOverrides.iter(ret);
	}
	,setLoop: function(k,v,node) {
		if(node == null) return new haxe.ds.TreeNode(null,k,v,null);
		var c = this.compare(k,node.key);
		if(c == 0) return new haxe.ds.TreeNode(node.left,k,v,node.right,node == null?0:node._height); else if(c < 0) {
			var nl = this.setLoop(k,v,node.left);
			return this.balance(nl,node.key,node.value,node.right);
		} else {
			var nr = this.setLoop(k,v,node.right);
			return this.balance(node.left,node.key,node.value,nr);
		}
	}
	,iteratorLoop: function(node,acc) {
		if(node != null) {
			this.iteratorLoop(node.left,acc);
			acc.push(node.value);
			this.iteratorLoop(node.right,acc);
		}
	}
	,balance: function(l,k,v,r) {
		var hl;
		if(l == null) hl = 0; else hl = l._height;
		var hr;
		if(r == null) hr = 0; else hr = r._height;
		if(hl > hr + 2) {
			if((function($this) {
				var $r;
				var _this = l.left;
				$r = _this == null?0:_this._height;
				return $r;
			}(this)) >= (function($this) {
				var $r;
				var _this1 = l.right;
				$r = _this1 == null?0:_this1._height;
				return $r;
			}(this))) return new haxe.ds.TreeNode(l.left,l.key,l.value,new haxe.ds.TreeNode(l.right,k,v,r)); else return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l.left,l.key,l.value,l.right.left),l.right.key,l.right.value,new haxe.ds.TreeNode(l.right.right,k,v,r));
		} else if(hr > hl + 2) {
			if((function($this) {
				var $r;
				var _this2 = r.right;
				$r = _this2 == null?0:_this2._height;
				return $r;
			}(this)) > (function($this) {
				var $r;
				var _this3 = r.left;
				$r = _this3 == null?0:_this3._height;
				return $r;
			}(this))) return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l,k,v,r.left),r.key,r.value,r.right); else return new haxe.ds.TreeNode(new haxe.ds.TreeNode(l,k,v,r.left.left),r.left.key,r.left.value,new haxe.ds.TreeNode(r.left.right,r.key,r.value,r.right));
		} else return new haxe.ds.TreeNode(l,k,v,r,(hl > hr?hl:hr) + 1);
	}
	,compare: function(k1,k2) {
		return Reflect.compare(k1,k2);
	}
	,__class__: haxe.ds.BalancedTree
};
haxe.ds.TreeNode = function(l,k,v,r,h) {
	if(h == null) h = -1;
	this.left = l;
	this.key = k;
	this.value = v;
	this.right = r;
	if(h == -1) this._height = ((function($this) {
		var $r;
		var _this = $this.left;
		$r = _this == null?0:_this._height;
		return $r;
	}(this)) > (function($this) {
		var $r;
		var _this1 = $this.right;
		$r = _this1 == null?0:_this1._height;
		return $r;
	}(this))?(function($this) {
		var $r;
		var _this2 = $this.left;
		$r = _this2 == null?0:_this2._height;
		return $r;
	}(this)):(function($this) {
		var $r;
		var _this3 = $this.right;
		$r = _this3 == null?0:_this3._height;
		return $r;
	}(this))) + 1; else this._height = h;
};
$hxClasses["haxe.ds.TreeNode"] = haxe.ds.TreeNode;
haxe.ds.TreeNode.__name__ = ["haxe","ds","TreeNode"];
haxe.ds.TreeNode.prototype = {
	__class__: haxe.ds.TreeNode
};
haxe.ds.EnumValueMap = function() {
	haxe.ds.BalancedTree.call(this);
};
$hxClasses["haxe.ds.EnumValueMap"] = haxe.ds.EnumValueMap;
haxe.ds.EnumValueMap.__name__ = ["haxe","ds","EnumValueMap"];
haxe.ds.EnumValueMap.__interfaces__ = [IMap];
haxe.ds.EnumValueMap.__super__ = haxe.ds.BalancedTree;
haxe.ds.EnumValueMap.prototype = $extend(haxe.ds.BalancedTree.prototype,{
	compare: function(k1,k2) {
		var d = k1[1] - k2[1];
		if(d != 0) return d;
		var p1 = k1.slice(2);
		var p2 = k2.slice(2);
		if(p1.length == 0 && p2.length == 0) return 0;
		return this.compareArgs(p1,p2);
	}
	,compareArgs: function(a1,a2) {
		var ld = a1.length - a2.length;
		if(ld != 0) return ld;
		var _g1 = 0;
		var _g = a1.length;
		while(_g1 < _g) {
			var i = _g1++;
			var d = this.compareArg(a1[i],a2[i]);
			if(d != 0) return d;
		}
		return 0;
	}
	,compareArg: function(v1,v2) {
		if(Reflect.isEnumValue(v1) && Reflect.isEnumValue(v2)) return this.compare(v1,v2); else if((v1 instanceof Array) && v1.__enum__ == null && ((v2 instanceof Array) && v2.__enum__ == null)) return this.compareArgs(v1,v2); else return Reflect.compare(v1,v2);
	}
	,__class__: haxe.ds.EnumValueMap
});
haxe.ds.IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe.ds.IntMap;
haxe.ds.IntMap.__name__ = ["haxe","ds","IntMap"];
haxe.ds.IntMap.__interfaces__ = [IMap];
haxe.ds.IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,get: function(key) {
		return this.h[key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty(key);
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,__class__: haxe.ds.IntMap
};
haxe.ds.ListSort = function() { };
$hxClasses["haxe.ds.ListSort"] = haxe.ds.ListSort;
haxe.ds.ListSort.__name__ = ["haxe","ds","ListSort"];
haxe.ds.ListSort.sortSingleLinked = function(list,cmp) {
	if(list == null) return null;
	var insize = 1;
	var nmerges;
	var psize = 0;
	var qsize = 0;
	var p;
	var q;
	var e;
	var tail;
	while(true) {
		p = list;
		list = null;
		tail = null;
		nmerges = 0;
		while(p != null) {
			nmerges++;
			q = p;
			psize = 0;
			var _g = 0;
			while(_g < insize) {
				var i = _g++;
				psize++;
				q = q.next;
				if(q == null) break;
			}
			qsize = insize;
			while(psize > 0 || qsize > 0 && q != null) {
				if(psize == 0) {
					e = q;
					q = q.next;
					qsize--;
				} else if(qsize == 0 || q == null || cmp(p,q) <= 0) {
					e = p;
					p = p.next;
					psize--;
				} else {
					e = q;
					q = q.next;
					qsize--;
				}
				if(tail != null) tail.next = e; else list = e;
				tail = e;
			}
			p = q;
		}
		tail.next = null;
		if(nmerges <= 1) break;
		insize *= 2;
	}
	return list;
};
haxe.ds.ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe.ds.ObjectMap;
haxe.ds.ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
haxe.ds.ObjectMap.__interfaces__ = [IMap];
haxe.ds.ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe.ds.ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,get: function(key) {
		return this.h[key.__id__];
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.ObjectMap
};
haxe.ds.StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe.ds.StringMap;
haxe.ds.StringMap.__name__ = ["haxe","ds","StringMap"];
haxe.ds.StringMap.__interfaces__ = [IMap];
haxe.ds.StringMap.prototype = {
	set: function(key,value) {
		this.h["$" + key] = value;
	}
	,get: function(key) {
		return this.h["$" + key];
	}
	,exists: function(key) {
		return this.h.hasOwnProperty("$" + key);
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
		}
		return HxOverrides.iter(a);
	}
	,__class__: haxe.ds.StringMap
};
haxe.io.BytesBuffer = function() {
	this.b = new Array();
};
$hxClasses["haxe.io.BytesBuffer"] = haxe.io.BytesBuffer;
haxe.io.BytesBuffer.__name__ = ["haxe","io","BytesBuffer"];
haxe.io.BytesBuffer.prototype = {
	add: function(src) {
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = 0;
		var _g = src.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,addBytes: function(src,pos,len) {
		if(pos < 0 || len < 0 || pos + len > src.length) throw haxe.io.Error.OutsideBounds;
		var b1 = this.b;
		var b2 = src.b;
		var _g1 = pos;
		var _g = pos + len;
		while(_g1 < _g) {
			var i = _g1++;
			this.b.push(b2[i]);
		}
	}
	,getBytes: function() {
		var bytes = new haxe.io.Bytes(this.b.length,this.b);
		this.b = null;
		return bytes;
	}
	,__class__: haxe.io.BytesBuffer
};
haxe.io.Input = function() { };
$hxClasses["haxe.io.Input"] = haxe.io.Input;
haxe.io.Input.__name__ = ["haxe","io","Input"];
haxe.io.Input.prototype = {
	readByte: function() {
		throw "Not implemented";
	}
	,readBytes: function(s,pos,len) {
		var k = len;
		var b = s.b;
		if(pos < 0 || len < 0 || pos + len > s.length) throw haxe.io.Error.OutsideBounds;
		while(k > 0) {
			b[pos] = this.readByte();
			pos++;
			k--;
		}
		return len;
	}
	,set_bigEndian: function(b) {
		this.bigEndian = b;
		return b;
	}
	,readFullBytes: function(s,pos,len) {
		while(len > 0) {
			var k = this.readBytes(s,pos,len);
			pos += k;
			len -= k;
		}
	}
	,read: function(nbytes) {
		var s = haxe.io.Bytes.alloc(nbytes);
		var p = 0;
		while(nbytes > 0) {
			var k = this.readBytes(s,p,nbytes);
			if(k == 0) throw haxe.io.Error.Blocked;
			p += k;
			nbytes -= k;
		}
		return s;
	}
	,readUInt16: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		if(this.bigEndian) return ch2 | ch1 << 8; else return ch1 | ch2 << 8;
	}
	,readInt32: function() {
		var ch1 = this.readByte();
		var ch2 = this.readByte();
		var ch3 = this.readByte();
		var ch4 = this.readByte();
		if(this.bigEndian) return ch4 | ch3 << 8 | ch2 << 16 | ch1 << 24; else return ch1 | ch2 << 8 | ch3 << 16 | ch4 << 24;
	}
	,readString: function(len) {
		var b = haxe.io.Bytes.alloc(len);
		this.readFullBytes(b,0,len);
		return b.toString();
	}
	,__class__: haxe.io.Input
	,__properties__: {set_bigEndian:"set_bigEndian"}
};
haxe.io.BytesInput = function(b,pos,len) {
	if(pos == null) pos = 0;
	if(len == null) len = b.length - pos;
	if(pos < 0 || len < 0 || pos + len > b.length) throw haxe.io.Error.OutsideBounds;
	this.b = b.b;
	this.pos = pos;
	this.len = len;
	this.totlen = len;
};
$hxClasses["haxe.io.BytesInput"] = haxe.io.BytesInput;
haxe.io.BytesInput.__name__ = ["haxe","io","BytesInput"];
haxe.io.BytesInput.__super__ = haxe.io.Input;
haxe.io.BytesInput.prototype = $extend(haxe.io.Input.prototype,{
	readByte: function() {
		if(this.len == 0) throw new haxe.io.Eof();
		this.len--;
		return this.b[this.pos++];
	}
	,readBytes: function(buf,pos,len) {
		if(pos < 0 || len < 0 || pos + len > buf.length) throw haxe.io.Error.OutsideBounds;
		if(this.len == 0 && len > 0) throw new haxe.io.Eof();
		if(this.len < len) len = this.len;
		var b1 = this.b;
		var b2 = buf.b;
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			b2[pos + i] = b1[this.pos + i];
		}
		this.pos += len;
		this.len -= len;
		return len;
	}
	,__class__: haxe.io.BytesInput
});
haxe.io.Eof = function() {
};
$hxClasses["haxe.io.Eof"] = haxe.io.Eof;
haxe.io.Eof.__name__ = ["haxe","io","Eof"];
haxe.io.Eof.prototype = {
	toString: function() {
		return "Eof";
	}
	,__class__: haxe.io.Eof
};
haxe.io.Error = $hxClasses["haxe.io.Error"] = { __ename__ : true, __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; };
haxe.io.Error.__empty_constructs__ = [haxe.io.Error.Blocked,haxe.io.Error.Overflow,haxe.io.Error.OutsideBounds];
haxe.macro = {};
haxe.macro.Binop = $hxClasses["haxe.macro.Binop"] = { __ename__ : true, __constructs__ : ["OpAdd","OpMult","OpDiv","OpSub","OpAssign","OpEq","OpNotEq","OpGt","OpGte","OpLt","OpLte","OpAnd","OpOr","OpXor","OpBoolAnd","OpBoolOr","OpShl","OpShr","OpUShr","OpMod","OpAssignOp","OpInterval","OpArrow"] };
haxe.macro.Binop.OpAdd = ["OpAdd",0];
haxe.macro.Binop.OpAdd.toString = $estr;
haxe.macro.Binop.OpAdd.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpMult = ["OpMult",1];
haxe.macro.Binop.OpMult.toString = $estr;
haxe.macro.Binop.OpMult.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpDiv = ["OpDiv",2];
haxe.macro.Binop.OpDiv.toString = $estr;
haxe.macro.Binop.OpDiv.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpSub = ["OpSub",3];
haxe.macro.Binop.OpSub.toString = $estr;
haxe.macro.Binop.OpSub.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpAssign = ["OpAssign",4];
haxe.macro.Binop.OpAssign.toString = $estr;
haxe.macro.Binop.OpAssign.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpEq = ["OpEq",5];
haxe.macro.Binop.OpEq.toString = $estr;
haxe.macro.Binop.OpEq.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpNotEq = ["OpNotEq",6];
haxe.macro.Binop.OpNotEq.toString = $estr;
haxe.macro.Binop.OpNotEq.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpGt = ["OpGt",7];
haxe.macro.Binop.OpGt.toString = $estr;
haxe.macro.Binop.OpGt.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpGte = ["OpGte",8];
haxe.macro.Binop.OpGte.toString = $estr;
haxe.macro.Binop.OpGte.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpLt = ["OpLt",9];
haxe.macro.Binop.OpLt.toString = $estr;
haxe.macro.Binop.OpLt.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpLte = ["OpLte",10];
haxe.macro.Binop.OpLte.toString = $estr;
haxe.macro.Binop.OpLte.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpAnd = ["OpAnd",11];
haxe.macro.Binop.OpAnd.toString = $estr;
haxe.macro.Binop.OpAnd.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpOr = ["OpOr",12];
haxe.macro.Binop.OpOr.toString = $estr;
haxe.macro.Binop.OpOr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpXor = ["OpXor",13];
haxe.macro.Binop.OpXor.toString = $estr;
haxe.macro.Binop.OpXor.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpBoolAnd = ["OpBoolAnd",14];
haxe.macro.Binop.OpBoolAnd.toString = $estr;
haxe.macro.Binop.OpBoolAnd.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpBoolOr = ["OpBoolOr",15];
haxe.macro.Binop.OpBoolOr.toString = $estr;
haxe.macro.Binop.OpBoolOr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpShl = ["OpShl",16];
haxe.macro.Binop.OpShl.toString = $estr;
haxe.macro.Binop.OpShl.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpShr = ["OpShr",17];
haxe.macro.Binop.OpShr.toString = $estr;
haxe.macro.Binop.OpShr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpUShr = ["OpUShr",18];
haxe.macro.Binop.OpUShr.toString = $estr;
haxe.macro.Binop.OpUShr.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpMod = ["OpMod",19];
haxe.macro.Binop.OpMod.toString = $estr;
haxe.macro.Binop.OpMod.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpAssignOp = function(op) { var $x = ["OpAssignOp",20,op]; $x.__enum__ = haxe.macro.Binop; $x.toString = $estr; return $x; };
haxe.macro.Binop.OpInterval = ["OpInterval",21];
haxe.macro.Binop.OpInterval.toString = $estr;
haxe.macro.Binop.OpInterval.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.OpArrow = ["OpArrow",22];
haxe.macro.Binop.OpArrow.toString = $estr;
haxe.macro.Binop.OpArrow.__enum__ = haxe.macro.Binop;
haxe.macro.Binop.__empty_constructs__ = [haxe.macro.Binop.OpAdd,haxe.macro.Binop.OpMult,haxe.macro.Binop.OpDiv,haxe.macro.Binop.OpSub,haxe.macro.Binop.OpAssign,haxe.macro.Binop.OpEq,haxe.macro.Binop.OpNotEq,haxe.macro.Binop.OpGt,haxe.macro.Binop.OpGte,haxe.macro.Binop.OpLt,haxe.macro.Binop.OpLte,haxe.macro.Binop.OpAnd,haxe.macro.Binop.OpOr,haxe.macro.Binop.OpXor,haxe.macro.Binop.OpBoolAnd,haxe.macro.Binop.OpBoolOr,haxe.macro.Binop.OpShl,haxe.macro.Binop.OpShr,haxe.macro.Binop.OpUShr,haxe.macro.Binop.OpMod,haxe.macro.Binop.OpInterval,haxe.macro.Binop.OpArrow];
haxe.macro.Unop = $hxClasses["haxe.macro.Unop"] = { __ename__ : true, __constructs__ : ["OpIncrement","OpDecrement","OpNot","OpNeg","OpNegBits"] };
haxe.macro.Unop.OpIncrement = ["OpIncrement",0];
haxe.macro.Unop.OpIncrement.toString = $estr;
haxe.macro.Unop.OpIncrement.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpDecrement = ["OpDecrement",1];
haxe.macro.Unop.OpDecrement.toString = $estr;
haxe.macro.Unop.OpDecrement.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpNot = ["OpNot",2];
haxe.macro.Unop.OpNot.toString = $estr;
haxe.macro.Unop.OpNot.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpNeg = ["OpNeg",3];
haxe.macro.Unop.OpNeg.toString = $estr;
haxe.macro.Unop.OpNeg.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.OpNegBits = ["OpNegBits",4];
haxe.macro.Unop.OpNegBits.toString = $estr;
haxe.macro.Unop.OpNegBits.__enum__ = haxe.macro.Unop;
haxe.macro.Unop.__empty_constructs__ = [haxe.macro.Unop.OpIncrement,haxe.macro.Unop.OpDecrement,haxe.macro.Unop.OpNot,haxe.macro.Unop.OpNeg,haxe.macro.Unop.OpNegBits];
var hxd = {};
hxd._BitmapData = {};
hxd._BitmapData.BitmapData_Impl_ = function() { };
$hxClasses["hxd._BitmapData.BitmapData_Impl_"] = hxd._BitmapData.BitmapData_Impl_;
hxd._BitmapData.BitmapData_Impl_.__name__ = ["hxd","_BitmapData","BitmapData_Impl_"];
hxd._BitmapData.BitmapData_Impl_.nativeGetPixels = function(b) {
	var w = b.canvas.width;
	var h = b.canvas.height;
	var data = b.getImageData(0,0,w,h).data;
	var pixels = [];
	var _g1 = 0;
	var _g = w * h * 4;
	while(_g1 < _g) {
		var i = _g1++;
		pixels.push(data[i]);
	}
	return new hxd.Pixels(b.canvas.width,b.canvas.height,haxe.io.Bytes.ofData(pixels),hxd.PixelFormat.RGBA);
};
hxd.EventKind = $hxClasses["hxd.EventKind"] = { __ename__ : true, __constructs__ : ["EPush","ERelease","EMove","EOver","EOut","EWheel","EFocus","EFocusLost","EKeyDown","EKeyUp"] };
hxd.EventKind.EPush = ["EPush",0];
hxd.EventKind.EPush.toString = $estr;
hxd.EventKind.EPush.__enum__ = hxd.EventKind;
hxd.EventKind.ERelease = ["ERelease",1];
hxd.EventKind.ERelease.toString = $estr;
hxd.EventKind.ERelease.__enum__ = hxd.EventKind;
hxd.EventKind.EMove = ["EMove",2];
hxd.EventKind.EMove.toString = $estr;
hxd.EventKind.EMove.__enum__ = hxd.EventKind;
hxd.EventKind.EOver = ["EOver",3];
hxd.EventKind.EOver.toString = $estr;
hxd.EventKind.EOver.__enum__ = hxd.EventKind;
hxd.EventKind.EOut = ["EOut",4];
hxd.EventKind.EOut.toString = $estr;
hxd.EventKind.EOut.__enum__ = hxd.EventKind;
hxd.EventKind.EWheel = ["EWheel",5];
hxd.EventKind.EWheel.toString = $estr;
hxd.EventKind.EWheel.__enum__ = hxd.EventKind;
hxd.EventKind.EFocus = ["EFocus",6];
hxd.EventKind.EFocus.toString = $estr;
hxd.EventKind.EFocus.__enum__ = hxd.EventKind;
hxd.EventKind.EFocusLost = ["EFocusLost",7];
hxd.EventKind.EFocusLost.toString = $estr;
hxd.EventKind.EFocusLost.__enum__ = hxd.EventKind;
hxd.EventKind.EKeyDown = ["EKeyDown",8];
hxd.EventKind.EKeyDown.toString = $estr;
hxd.EventKind.EKeyDown.__enum__ = hxd.EventKind;
hxd.EventKind.EKeyUp = ["EKeyUp",9];
hxd.EventKind.EKeyUp.toString = $estr;
hxd.EventKind.EKeyUp.__enum__ = hxd.EventKind;
hxd.EventKind.__empty_constructs__ = [hxd.EventKind.EPush,hxd.EventKind.ERelease,hxd.EventKind.EMove,hxd.EventKind.EOver,hxd.EventKind.EOut,hxd.EventKind.EWheel,hxd.EventKind.EFocus,hxd.EventKind.EFocusLost,hxd.EventKind.EKeyDown,hxd.EventKind.EKeyUp];
hxd.Event = function(k,x,y) {
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	this.button = 0;
	this.kind = k;
	this.relX = x;
	this.relY = y;
};
$hxClasses["hxd.Event"] = hxd.Event;
hxd.Event.__name__ = ["hxd","Event"];
hxd.Event.prototype = {
	__class__: hxd.Event
};
hxd.Key = function() { };
$hxClasses["hxd.Key"] = hxd.Key;
hxd.Key.__name__ = ["hxd","Key"];
hxd.Key.isDown = function(code) {
	return hxd.Key.keyPressed[code] > 0;
};
hxd.Key.isReleased = function(code) {
	return hxd.Key.keyPressed[code] == -(((function($this) {
		var $r;
		if(h3d.Engine.CURRENT == null) throw "no current context, please do this operation after engine init/creation";
		$r = h3d.Engine.CURRENT;
		return $r;
	}(this))).frameCount + 1);
};
hxd.Key.initialize = function() {
	if(hxd.Key.initDone) hxd.Key.dispose();
	hxd.Key.initDone = true;
	hxd.Key.keyPressed = [];
	hxd.Stage.getInstance().addEventTarget(hxd.Key.onEvent);
};
hxd.Key.dispose = function() {
	if(hxd.Key.initDone) {
		hxd.Stage.getInstance().removeEventTarget(hxd.Key.onEvent);
		hxd.Key.initDone = false;
		hxd.Key.keyPressed = [];
	}
};
hxd.Key.onEvent = function(e) {
	var _g = e.kind;
	switch(_g[1]) {
	case 8:
		hxd.Key.keyPressed[e.keyCode] = ((function($this) {
			var $r;
			if(h3d.Engine.CURRENT == null) throw "no current context, please do this operation after engine init/creation";
			$r = h3d.Engine.CURRENT;
			return $r;
		}(this))).frameCount + 1;
		break;
	case 9:
		hxd.Key.keyPressed[e.keyCode] = -(((function($this) {
			var $r;
			if(h3d.Engine.CURRENT == null) throw "no current context, please do this operation after engine init/creation";
			$r = h3d.Engine.CURRENT;
			return $r;
		}(this))).frameCount + 1);
		break;
	case 0:
		hxd.Key.keyPressed[e.button] = ((function($this) {
			var $r;
			if(h3d.Engine.CURRENT == null) throw "no current context, please do this operation after engine init/creation";
			$r = h3d.Engine.CURRENT;
			return $r;
		}(this))).frameCount + 1;
		break;
	case 1:
		hxd.Key.keyPressed[e.button] = -(((function($this) {
			var $r;
			if(h3d.Engine.CURRENT == null) throw "no current context, please do this operation after engine init/creation";
			$r = h3d.Engine.CURRENT;
			return $r;
		}(this))).frameCount + 1);
		break;
	default:
	}
};
hxd.Math = function() { };
$hxClasses["hxd.Math"] = hxd.Math;
hxd.Math.__name__ = ["hxd","Math"];
hxd.Math.distanceSq = function(dx,dy,dz) {
	if(dz == null) dz = 0.;
	return dx * dx + dy * dy + dz * dz;
};
hxd.PixelFormat = $hxClasses["hxd.PixelFormat"] = { __ename__ : true, __constructs__ : ["ARGB","BGRA","RGBA"] };
hxd.PixelFormat.ARGB = ["ARGB",0];
hxd.PixelFormat.ARGB.toString = $estr;
hxd.PixelFormat.ARGB.__enum__ = hxd.PixelFormat;
hxd.PixelFormat.BGRA = ["BGRA",1];
hxd.PixelFormat.BGRA.toString = $estr;
hxd.PixelFormat.BGRA.__enum__ = hxd.PixelFormat;
hxd.PixelFormat.RGBA = ["RGBA",2];
hxd.PixelFormat.RGBA.toString = $estr;
hxd.PixelFormat.RGBA.__enum__ = hxd.PixelFormat;
hxd.PixelFormat.__empty_constructs__ = [hxd.PixelFormat.ARGB,hxd.PixelFormat.BGRA,hxd.PixelFormat.RGBA];
hxd.Flags = $hxClasses["hxd.Flags"] = { __ename__ : true, __constructs__ : ["ReadOnly","AlphaPremultiplied"] };
hxd.Flags.ReadOnly = ["ReadOnly",0];
hxd.Flags.ReadOnly.toString = $estr;
hxd.Flags.ReadOnly.__enum__ = hxd.Flags;
hxd.Flags.AlphaPremultiplied = ["AlphaPremultiplied",1];
hxd.Flags.AlphaPremultiplied.toString = $estr;
hxd.Flags.AlphaPremultiplied.__enum__ = hxd.Flags;
hxd.Flags.__empty_constructs__ = [hxd.Flags.ReadOnly,hxd.Flags.AlphaPremultiplied];
hxd.Pixels = function(width,height,bytes,format,offset) {
	if(offset == null) offset = 0;
	this.width = width;
	this.height = height;
	this.bytes = bytes;
	this.format = format;
	this.offset = offset;
};
$hxClasses["hxd.Pixels"] = hxd.Pixels;
hxd.Pixels.__name__ = ["hxd","Pixels"];
hxd.Pixels.bytesPerPixel = function(format) {
	switch(format[1]) {
	case 0:case 1:case 2:
		return 4;
	}
};
hxd.Pixels.alloc = function(width,height,format) {
	return new hxd.Pixels(width,height,hxd.impl.Tmp.getBytes(width * height * hxd.Pixels.bytesPerPixel(format)),format);
};
hxd.Pixels.prototype = {
	makeSquare: function(copy) {
		var w = this.width;
		var h = this.height;
		var tw;
		if(w == 0) tw = 0; else tw = 1;
		var th;
		if(h == 0) th = 0; else th = 1;
		while(tw < w) tw <<= 1;
		while(th < h) th <<= 1;
		if(w == tw && h == th) return this;
		var out = hxd.impl.Tmp.getBytes(tw * th * 4);
		var p = 0;
		var b = this.offset;
		var _g = 0;
		while(_g < h) {
			var y = _g++;
			out.blit(p,this.bytes,b,w * 4);
			p += w * 4;
			b += w * 4;
			var _g2 = 0;
			var _g1 = (tw - w) * 4;
			while(_g2 < _g1) {
				var i = _g2++;
				out.set(p++,0);
			}
		}
		var _g11 = 0;
		var _g3 = (th - h) * tw * 4;
		while(_g11 < _g3) {
			var i1 = _g11++;
			out.set(p++,0);
		}
		if(copy) return new hxd.Pixels(tw,th,out,this.format);
		if(!((this.flags & 1 << hxd.Flags.ReadOnly[1]) != 0)) hxd.impl.Tmp.saveBytes(this.bytes);
		this.bytes = out;
		this.width = tw;
		this.height = th;
		return this;
	}
	,copyInner: function() {
		var old = this.bytes;
		this.bytes = hxd.impl.Tmp.getBytes(this.width * this.height * 4);
		this.bytes.blit(0,old,this.offset,this.width * this.height * 4);
		this.offset = 0;
		this.flags &= 268435455 - (1 << hxd.Flags.ReadOnly[1]);
	}
	,convert: function(target) {
		if(this.format == target) return;
		if((this.flags & 1 << hxd.Flags.ReadOnly[1]) != 0) this.copyInner();
		{
			var _g = this.format;
			switch(_g[1]) {
			case 1:
				switch(target[1]) {
				case 0:
					var mem = hxd.impl.Memory.select(this.bytes);
					var _g2 = 0;
					var _g1 = this.width * this.height;
					while(_g2 < _g1) {
						var i = _g2++;
						var p = (i << 2) + this.offset;
						var a = hxd.impl.Memory.current.b[p];
						var r = hxd.impl.Memory.current.b[p + 1];
						var g = hxd.impl.Memory.current.b[p + 2];
						var b = hxd.impl.Memory.current.b[p + 3];
						hxd.impl.Memory.current.b[p] = b & 255;
						hxd.impl.Memory.current.b[p + 1] = g & 255;
						hxd.impl.Memory.current.b[p + 2] = r & 255;
						hxd.impl.Memory.current.b[p + 3] = a & 255;
					}
					hxd.impl.Memory.end();
					break;
				case 2:
					var mem1 = hxd.impl.Memory.select(this.bytes);
					var _g21 = 0;
					var _g11 = this.width * this.height;
					while(_g21 < _g11) {
						var i1 = _g21++;
						var p1 = (i1 << 2) + this.offset;
						var b1 = hxd.impl.Memory.current.b[p1];
						var r1 = hxd.impl.Memory.current.b[p1 + 2];
						hxd.impl.Memory.current.b[p1] = r1 & 255;
						hxd.impl.Memory.current.b[p1 + 2] = b1 & 255;
					}
					hxd.impl.Memory.end();
					break;
				default:
					throw "Cannot convert from " + Std.string(this.format) + " to " + Std.string(target);
				}
				break;
			case 0:
				switch(target[1]) {
				case 1:
					var mem = hxd.impl.Memory.select(this.bytes);
					var _g2 = 0;
					var _g1 = this.width * this.height;
					while(_g2 < _g1) {
						var i = _g2++;
						var p = (i << 2) + this.offset;
						var a = hxd.impl.Memory.current.b[p];
						var r = hxd.impl.Memory.current.b[p + 1];
						var g = hxd.impl.Memory.current.b[p + 2];
						var b = hxd.impl.Memory.current.b[p + 3];
						hxd.impl.Memory.current.b[p] = b & 255;
						hxd.impl.Memory.current.b[p + 1] = g & 255;
						hxd.impl.Memory.current.b[p + 2] = r & 255;
						hxd.impl.Memory.current.b[p + 3] = a & 255;
					}
					hxd.impl.Memory.end();
					break;
				case 2:
					var mem2 = hxd.impl.Memory.select(this.bytes);
					var _g22 = 0;
					var _g12 = this.width * this.height;
					while(_g22 < _g12) {
						var i2 = _g22++;
						var p2 = (i2 << 2) + this.offset;
						var a1 = hxd.impl.Memory.current.b[p2];
						hxd.impl.Memory.current.b[p2] = hxd.impl.Memory.current.b[p2 + 1] & 255;
						hxd.impl.Memory.current.b[p2 + 1] = hxd.impl.Memory.current.b[p2 + 2] & 255;
						hxd.impl.Memory.current.b[p2 + 2] = hxd.impl.Memory.current.b[p2 + 3] & 255;
						hxd.impl.Memory.current.b[p2 + 3] = a1 & 255;
					}
					hxd.impl.Memory.end();
					break;
				default:
					throw "Cannot convert from " + Std.string(this.format) + " to " + Std.string(target);
				}
				break;
			default:
				throw "Cannot convert from " + Std.string(this.format) + " to " + Std.string(target);
			}
		}
		this.format = target;
	}
	,dispose: function() {
		if(this.bytes != null) {
			if(!((this.flags & 1 << hxd.Flags.ReadOnly[1]) != 0)) hxd.impl.Tmp.saveBytes(this.bytes);
			this.bytes = null;
		}
	}
	,__class__: hxd.Pixels
};
hxd.Res = function() { };
$hxClasses["hxd.Res"] = hxd.Res;
hxd.Res.__name__ = ["hxd","Res"];
hxd.Stage = function() {
	this.curMouseY = 0.;
	this.curMouseX = 0.;
	var _g = this;
	this.eventTargets = new List();
	this.resizeEvents = new List();
	this.canvas = hxd.Stage.getCanvas();
	this.canvasPos = this.canvas.getBoundingClientRect();
	window.addEventListener("mousedown",$bind(this,this.onMouseDown));
	window.addEventListener("mousemove",$bind(this,this.onMouseMove));
	window.addEventListener("mouseup",$bind(this,this.onMouseUp));
	window.addEventListener("mousewheel",$bind(this,this.onMouseWheel));
	window.addEventListener("keydown",$bind(this,this.onKeyDown));
	window.addEventListener("keyup",$bind(this,this.onKeyUp));
	this.canvas.addEventListener("mousedown",function(e) {
		_g.onMouseDown(e);
		e.stopPropagation();
		e.preventDefault();
	});
	var curW = this.get_width();
	var curH = this.get_height();
	var t0 = new haxe.Timer(100);
	t0.run = function() {
		_g.canvasPos = _g.canvas.getBoundingClientRect();
		var cw = _g.get_width();
		var ch = _g.get_height();
		if(curW != cw || curH != ch) {
			curW = cw;
			curH = ch;
			_g.onResize(null);
		}
	};
};
$hxClasses["hxd.Stage"] = hxd.Stage;
hxd.Stage.__name__ = ["hxd","Stage"];
hxd.Stage.getCanvas = function() {
	var canvas = window.document.getElementById("webgl");
	if(canvas == null) throw "Missing canvas#webgl";
	return canvas;
};
hxd.Stage.getInstance = function() {
	if(hxd.Stage.inst == null) hxd.Stage.inst = new hxd.Stage();
	return hxd.Stage.inst;
};
hxd.Stage.prototype = {
	event: function(e) {
		var $it0 = this.eventTargets.iterator();
		while( $it0.hasNext() ) {
			var et = $it0.next();
			et(e);
		}
	}
	,addEventTarget: function(et) {
		this.eventTargets.add(et);
	}
	,removeEventTarget: function(et) {
		this.eventTargets.remove(et);
	}
	,addResizeEvent: function(f) {
		this.resizeEvents.push(f);
	}
	,removeResizeEvent: function(f) {
		this.resizeEvents.remove(f);
	}
	,getFrameRate: function() {
		return 60.;
	}
	,setFullScreen: function(v) {
	}
	,get_width: function() {
		return Math.round(this.canvasPos.width * window.devicePixelRatio);
	}
	,get_height: function() {
		return Math.round(this.canvasPos.height * window.devicePixelRatio);
	}
	,get_mouseX: function() {
		return Math.round((this.curMouseX - this.canvasPos.left) * window.devicePixelRatio);
	}
	,get_mouseY: function() {
		return Math.round((this.curMouseY - this.canvasPos.top) * window.devicePixelRatio);
	}
	,onMouseDown: function(e) {
		this.event(new hxd.Event(hxd.EventKind.EPush,this.get_mouseX(),this.get_mouseY()));
	}
	,onMouseUp: function(e) {
		this.event(new hxd.Event(hxd.EventKind.ERelease,this.get_mouseX(),this.get_mouseY()));
	}
	,onMouseMove: function(e) {
		this.curMouseX = e.clientX;
		this.curMouseY = e.clientY;
		this.event(new hxd.Event(hxd.EventKind.EMove,this.get_mouseX(),this.get_mouseY()));
	}
	,onMouseWheel: function(e) {
		var ev = new hxd.Event(hxd.EventKind.EWheel,this.get_mouseX(),this.get_mouseY());
		ev.wheelDelta = -e.wheelDelta / 30.0;
		this.event(ev);
	}
	,onKeyUp: function(e) {
		var ev = new hxd.Event(hxd.EventKind.EKeyUp,this.get_mouseX(),this.get_mouseY());
		ev.keyCode = e.keyCode;
		ev.charCode = e.charCode;
		this.event(ev);
	}
	,onKeyDown: function(e) {
		var ev = new hxd.Event(hxd.EventKind.EKeyDown,this.get_mouseX(),this.get_mouseY());
		ev.keyCode = e.keyCode;
		ev.charCode = e.charCode;
		this.event(ev);
	}
	,onResize: function(e) {
		var $it0 = this.resizeEvents.iterator();
		while( $it0.hasNext() ) {
			var r = $it0.next();
			r();
		}
	}
	,__class__: hxd.Stage
	,__properties__: {get_mouseY:"get_mouseY",get_mouseX:"get_mouseX",get_height:"get_height",get_width:"get_width"}
};
hxd.Cursor = $hxClasses["hxd.Cursor"] = { __ename__ : true, __constructs__ : ["Default","Button","Move","TextInput","Hide","Custom"] };
hxd.Cursor.Default = ["Default",0];
hxd.Cursor.Default.toString = $estr;
hxd.Cursor.Default.__enum__ = hxd.Cursor;
hxd.Cursor.Button = ["Button",1];
hxd.Cursor.Button.toString = $estr;
hxd.Cursor.Button.__enum__ = hxd.Cursor;
hxd.Cursor.Move = ["Move",2];
hxd.Cursor.Move.toString = $estr;
hxd.Cursor.Move.__enum__ = hxd.Cursor;
hxd.Cursor.TextInput = ["TextInput",3];
hxd.Cursor.TextInput.toString = $estr;
hxd.Cursor.TextInput.__enum__ = hxd.Cursor;
hxd.Cursor.Hide = ["Hide",4];
hxd.Cursor.Hide.toString = $estr;
hxd.Cursor.Hide.__enum__ = hxd.Cursor;
hxd.Cursor.Custom = function(frames,speed,offsetX,offsetY) { var $x = ["Custom",5,frames,speed,offsetX,offsetY]; $x.__enum__ = hxd.Cursor; $x.toString = $estr; return $x; };
hxd.Cursor.__empty_constructs__ = [hxd.Cursor.Default,hxd.Cursor.Button,hxd.Cursor.Move,hxd.Cursor.TextInput,hxd.Cursor.Hide];
hxd.System = function() { };
$hxClasses["hxd.System"] = hxd.System;
hxd.System.__name__ = ["hxd","System"];
hxd.System.__properties__ = {get_isWindowed:"get_isWindowed"}
hxd.System.loopFunc = function() {
	var $window = window;
	var rqf = $window.requestAnimationFrame || $window.webkitRequestAnimationFrame || $window.mozRequestAnimationFrame;
	rqf(hxd.System.loopFunc);
	if(hxd.System.LOOP != null) hxd.System.LOOP();
};
hxd.System.setLoop = function(f) {
	if(!hxd.System.LOOP_INIT) {
		hxd.System.LOOP_INIT = true;
		hxd.System.loopFunc();
	}
	hxd.System.LOOP = f;
};
hxd.System.setNativeCursor = function(c) {
	var canvas = window.document.getElementById("webgl");
	if(canvas != null) switch(c[1]) {
	case 0:
		canvas.style.cursor = "default";
		break;
	case 1:
		canvas.style.cursor = "pointer";
		break;
	case 2:
		canvas.style.cursor = "move";
		break;
	case 3:
		canvas.style.cursor = "text";
		break;
	case 4:
		canvas.style.cursor = "none";
		break;
	case 5:
		throw "Custom cursor not supported";
		break;
	}
};
hxd.System.get_isWindowed = function() {
	return true;
};
hxd.impl = {};
hxd.impl.MemoryReader = function() {
};
$hxClasses["hxd.impl.MemoryReader"] = hxd.impl.MemoryReader;
hxd.impl.MemoryReader.__name__ = ["hxd","impl","MemoryReader"];
hxd.impl.MemoryReader.prototype = {
	__class__: hxd.impl.MemoryReader
};
hxd.impl.Memory = function() { };
$hxClasses["hxd.impl.Memory"] = hxd.impl.Memory;
hxd.impl.Memory.__name__ = ["hxd","impl","Memory"];
hxd.impl.Memory.select = function(b) {
	if(hxd.impl.Memory.current != null) hxd.impl.Memory.stack.push(hxd.impl.Memory.current);
	hxd.impl.Memory.current = b;
	return hxd.impl.Memory.inst;
};
hxd.impl.Memory.end = function() {
	hxd.impl.Memory.current = hxd.impl.Memory.stack.pop();
};
hxd.impl.Tmp = function() { };
$hxClasses["hxd.impl.Tmp"] = hxd.impl.Tmp;
hxd.impl.Tmp.__name__ = ["hxd","impl","Tmp"];
hxd.impl.Tmp.getBytes = function(size) {
	var _g1 = 0;
	var _g = hxd.impl.Tmp.bytes.length;
	while(_g1 < _g) {
		var i = _g1++;
		var b = hxd.impl.Tmp.bytes[i];
		if(b.length >= size) {
			hxd.impl.Tmp.bytes.splice(i,1);
			return b;
		}
	}
	var sz = 1024;
	while(sz < size) sz = sz * 3 >> 1;
	return haxe.io.Bytes.alloc(sz);
};
hxd.impl.Tmp.saveBytes = function(b) {
	var _g1 = 0;
	var _g = hxd.impl.Tmp.bytes.length;
	while(_g1 < _g) {
		var i = _g1++;
		if(hxd.impl.Tmp.bytes[i].length <= b.length) {
			hxd.impl.Tmp.bytes.splice(i,0,b);
			if(hxd.impl.Tmp.bytes.length > 8) hxd.impl.Tmp.bytes.pop();
			return;
		}
	}
	hxd.impl.Tmp.bytes.push(b);
};
hxd.res = {};
hxd.res.FileSystem = function() { };
$hxClasses["hxd.res.FileSystem"] = hxd.res.FileSystem;
hxd.res.FileSystem.__name__ = ["hxd","res","FileSystem"];
hxd.res.FileSystem.prototype = {
	__class__: hxd.res.FileSystem
};
hxd.res.Resource = function(entry) {
	this.entry = entry;
};
$hxClasses["hxd.res.Resource"] = hxd.res.Resource;
hxd.res.Resource.__name__ = ["hxd","res","Resource"];
hxd.res.Resource.prototype = {
	watch: function(onChanged) {
		if(hxd.res.Resource.LIVE_UPDATE) this.entry.watch(onChanged);
	}
	,__class__: hxd.res.Resource
};
hxd.res.FileEntry = function() { };
$hxClasses["hxd.res.FileEntry"] = hxd.res.FileEntry;
hxd.res.FileEntry.__name__ = ["hxd","res","FileEntry"];
hxd.res.FileEntry.prototype = {
	getBytes: function() {
		return null;
	}
	,open: function() {
	}
	,skip: function(nbytes) {
	}
	,readByte: function() {
		return 0;
	}
	,read: function(out,pos,size) {
	}
	,close: function() {
	}
	,load: function(onReady) {
		if(!this.get_isAvailable()) throw "load() not implemented"; else if(onReady != null) onReady();
	}
	,loadBitmap: function(onLoaded) {
		throw "loadBitmap() not implemented";
	}
	,watch: function(onChanged) {
	}
	,get_isAvailable: function() {
		return true;
	}
	,get_path: function() {
		throw "path() not implemented";
		return null;
	}
	,get_extension: function() {
		var np = this.name.split(".");
		if(np.length == 1) return ""; else return np.pop().toLowerCase();
	}
	,__class__: hxd.res.FileEntry
	,__properties__: {get_extension:"get_extension",get_path:"get_path",get_isAvailable:"get_isAvailable"}
};
hxd.res._EmbedFileSystem = {};
hxd.res._EmbedFileSystem.EmbedEntry = function(fs,name,relPath,data) {
	this.fs = fs;
	this.name = name;
	this.relPath = relPath;
	this.data = data;
};
$hxClasses["hxd.res._EmbedFileSystem.EmbedEntry"] = hxd.res._EmbedFileSystem.EmbedEntry;
hxd.res._EmbedFileSystem.EmbedEntry.__name__ = ["hxd","res","_EmbedFileSystem","EmbedEntry"];
hxd.res._EmbedFileSystem.EmbedEntry.__super__ = hxd.res.FileEntry;
hxd.res._EmbedFileSystem.EmbedEntry.prototype = $extend(hxd.res.FileEntry.prototype,{
	getBytes: function() {
		if(this.bytes == null) this.open();
		return this.bytes;
	}
	,open: function() {
		if(this.bytes == null) {
			this.bytes = haxe.Resource.getBytes(this.data);
			if(this.bytes == null) throw "Missing resource " + this.data;
		}
		this.readPos = 0;
	}
	,skip: function(nbytes) {
		this.readPos += nbytes;
	}
	,readByte: function() {
		return this.bytes.get(this.readPos++);
	}
	,read: function(out,pos,size) {
		out.blit(pos,this.bytes,this.readPos,size);
		this.readPos += size;
	}
	,close: function() {
		this.bytes = null;
		this.readPos = 0;
	}
	,load: function(onReady) {
		if(onReady != null) haxe.Timer.delay(onReady,1);
	}
	,loadBitmap: function(onLoaded) {
		var rawData = null;
		var _g = 0;
		var _g1 = haxe.Resource.content;
		while(_g < _g1.length) {
			var res = _g1[_g];
			++_g;
			if(res.name == this.data) {
				rawData = res.data;
				break;
			}
		}
		if(rawData == null) throw "Missing resource " + this.data;
		var image = new Image();
		image.onload = function(_) {
			onLoaded(image);
		};
		var extra = "";
		var bytes = rawData.length * 6 >> 3;
		var _g11 = 0;
		var _g2 = (3 - bytes * 4 % 3) % 3;
		while(_g11 < _g2) {
			var i = _g11++;
			extra += "=";
		}
		image.src = "data:image/" + this.get_extension() + ";base64," + rawData + extra;
	}
	,get_path: function() {
		if(this.relPath == ".") return "<root>"; else return this.relPath;
	}
	,__class__: hxd.res._EmbedFileSystem.EmbedEntry
});
hxd.res.EmbedFileSystem = function(root) {
	this.root = root;
};
$hxClasses["hxd.res.EmbedFileSystem"] = hxd.res.EmbedFileSystem;
hxd.res.EmbedFileSystem.__name__ = ["hxd","res","EmbedFileSystem"];
hxd.res.EmbedFileSystem.__interfaces__ = [hxd.res.FileSystem];
hxd.res.EmbedFileSystem.resolve = function(path) {
	return "R_" + hxd.res.EmbedFileSystem.invalidChars.replace(path,"_");
};
hxd.res.EmbedFileSystem.prototype = {
	splitPath: function(path) {
		if(path == ".") return []; else return path.split("/");
	}
	,exists: function(path) {
		var r = this.root;
		var _g = 0;
		var _g1 = this.splitPath(path);
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			r = Reflect.field(r,p);
			if(r == null) return false;
		}
		return true;
	}
	,get: function(path) {
		if(!this.exists(path)) throw new hxd.res.NotFound(path);
		var id = hxd.res.EmbedFileSystem.resolve(path);
		return new hxd.res._EmbedFileSystem.EmbedEntry(this,path.split("/").pop(),path,id);
	}
	,__class__: hxd.res.EmbedFileSystem
};
hxd.res.FileInput = function(f) {
	this.f = f;
	f.open();
};
$hxClasses["hxd.res.FileInput"] = hxd.res.FileInput;
hxd.res.FileInput.__name__ = ["hxd","res","FileInput"];
hxd.res.FileInput.__super__ = haxe.io.Input;
hxd.res.FileInput.prototype = $extend(haxe.io.Input.prototype,{
	skip: function(nbytes) {
		this.f.skip(nbytes);
	}
	,readByte: function() {
		return this.f.readByte();
	}
	,readBytes: function(b,pos,len) {
		this.f.read(b,pos,len);
		return len;
	}
	,close: function() {
		this.f.close();
	}
	,__class__: hxd.res.FileInput
});
hxd.res.Image = function(entry) {
	hxd.res.Resource.call(this,entry);
};
$hxClasses["hxd.res.Image"] = hxd.res.Image;
hxd.res.Image.__name__ = ["hxd","res","Image"];
hxd.res.Image.__super__ = hxd.res.Resource;
hxd.res.Image.prototype = $extend(hxd.res.Resource.prototype,{
	getSize: function() {
		if(this.inf != null) return this.inf;
		var f = new hxd.res.FileInput(this.entry);
		var width = 0;
		var height = 0;
		var isPNG = false;
		var _g = f.readUInt16();
		switch(_g) {
		case 55551:
			f.set_bigEndian(true);
			try {
				while(true) {
					var _g1 = f.readUInt16();
					switch(_g1) {
					case 65474:case 65472:
						var len = f.readUInt16();
						var prec = f.readByte();
						height = f.readUInt16();
						width = f.readUInt16();
						throw "__break__";
						break;
					default:
						f.skip(f.readUInt16() - 2);
					}
				}
			} catch( e ) { if( e != "__break__" ) throw e; }
			break;
		case 20617:
			isPNG = true;
			var TMP = hxd.impl.Tmp.getBytes(256);
			f.set_bigEndian(true);
			f.readBytes(TMP,0,6);
			while(true) {
				var dataLen = f.readInt32();
				if(f.readInt32() == 1229472850) {
					width = f.readInt32();
					height = f.readInt32();
					break;
				}
				while(dataLen > 0) {
					var k;
					if(dataLen > TMP.length) k = TMP.length; else k = dataLen;
					f.readBytes(TMP,0,k);
					dataLen -= k;
				}
				var crc = f.readInt32();
			}
			hxd.impl.Tmp.saveBytes(TMP);
			break;
		default:
			throw "Unsupported texture format " + this.entry.get_path();
		}
		f.close();
		this.inf = { width : width, height : height, isPNG : isPNG};
		return this.inf;
	}
	,getPixels: function() {
		this.getSize();
		if(this.inf.isPNG) {
			var png = new format.png.Reader(new haxe.io.BytesInput(this.entry.getBytes()));
			png.checkCRC = false;
			var pixels = hxd.Pixels.alloc(this.inf.width,this.inf.height,hxd.PixelFormat.BGRA);
			format.png.Tools.extract32(png.read(),pixels.bytes);
			return pixels;
		} else {
			var bytes = this.entry.getBytes();
			var p = hxd.res.NanoJpeg.decode(bytes);
			return new hxd.Pixels(p.width,p.height,p.pixels,hxd.PixelFormat.BGRA);
		}
	}
	,watchCallb: function() {
		var w = this.inf.width;
		var h = this.inf.height;
		this.inf = null;
		var s = this.getSize();
		if(w != s.width || h != s.height) this.tex.resize(w,h);
		this.tex.realloc = null;
		this.loadTexture();
	}
	,loadTexture: function() {
		var _g = this;
		if(this.inf.isPNG) {
			var load = function() {
				_g.tex.alloc();
				var pixels = _g.getPixels();
				if(pixels.width != _g.tex.width || pixels.height != _g.tex.height) pixels.makeSquare();
				_g.tex.uploadPixels(pixels);
				pixels.dispose();
				_g.tex.realloc = $bind(_g,_g.loadTexture);
				_g.watch($bind(_g,_g.watchCallb));
			};
			if(this.entry.get_isAvailable()) load(); else this.entry.load(load);
		} else this.entry.loadBitmap(function(bmp) {
			var bmp1 = hxd.res._LoadedBitmap.LoadedBitmap_Impl_.toBitmap(bmp);
			_g.tex.alloc();
			if(bmp1.canvas.width != _g.tex.width || bmp1.canvas.height != _g.tex.height) {
				var pixels1 = hxd._BitmapData.BitmapData_Impl_.nativeGetPixels(bmp1);
				pixels1.makeSquare();
				_g.tex.uploadPixels(pixels1);
				pixels1.dispose();
			} else _g.tex.uploadBitmap(bmp1);
			_g.tex.realloc = $bind(_g,_g.loadTexture);
			_g.watch($bind(_g,_g.watchCallb));
		});
	}
	,toTexture: function() {
		if(this.tex != null) return this.tex;
		this.getSize();
		var width = this.inf.width;
		var height = this.inf.height;
		if(!hxd.res.Image.ALLOW_NPOT) {
			var tw = 1;
			var th = 1;
			while(tw < width) tw <<= 1;
			while(th < height) th <<= 1;
			width = tw;
			height = th;
		}
		this.tex = new h3d.mat.Texture(width,height,[h3d.mat.TextureFlags.NoAlloc],{ fileName : "Image.hx", lineNumber : 150, className : "hxd.res.Image", methodName : "toTexture"});
		if(hxd.res.Image.DEFAULT_FILTER != h3d.mat.Filter.Linear) this.tex.set_filter(hxd.res.Image.DEFAULT_FILTER);
		this.tex.setName(this.entry.get_path());
		this.loadTexture();
		return this.tex;
	}
	,toTile: function() {
		var size = this.getSize();
		return h2d.Tile.fromTexture(this.toTexture()).sub(0,0,size.width,size.height);
	}
	,__class__: hxd.res.Image
});
hxd.res._LoadedBitmap = {};
hxd.res._LoadedBitmap.LoadedBitmap_Impl_ = function() { };
$hxClasses["hxd.res._LoadedBitmap.LoadedBitmap_Impl_"] = hxd.res._LoadedBitmap.LoadedBitmap_Impl_;
hxd.res._LoadedBitmap.LoadedBitmap_Impl_.__name__ = ["hxd","res","_LoadedBitmap","LoadedBitmap_Impl_"];
hxd.res._LoadedBitmap.LoadedBitmap_Impl_.toBitmap = function(this1) {
	var canvas;
	var _this = window.document;
	canvas = _this.createElement("canvas");
	canvas.width = this1.width;
	canvas.height = this1.height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(this1,0,0);
	return ctx;
};
hxd.res.Loader = function(fs) {
	this.fs = fs;
	this.cache = new haxe.ds.StringMap();
};
$hxClasses["hxd.res.Loader"] = hxd.res.Loader;
hxd.res.Loader.__name__ = ["hxd","res","Loader"];
hxd.res.Loader.prototype = {
	loadImage: function(path) {
		var i = this.cache.get(path);
		if(i == null) {
			i = new hxd.res.Image(this.fs.get(path));
			this.cache.set(path,i);
		}
		return i;
	}
	,__class__: hxd.res.Loader
};
hxd.res.Filter = $hxClasses["hxd.res.Filter"] = { __ename__ : true, __constructs__ : ["Fast","Chromatic"] };
hxd.res.Filter.Fast = ["Fast",0];
hxd.res.Filter.Fast.toString = $estr;
hxd.res.Filter.Fast.__enum__ = hxd.res.Filter;
hxd.res.Filter.Chromatic = ["Chromatic",1];
hxd.res.Filter.Chromatic.toString = $estr;
hxd.res.Filter.Chromatic.__enum__ = hxd.res.Filter;
hxd.res.Filter.__empty_constructs__ = [hxd.res.Filter.Fast,hxd.res.Filter.Chromatic];
hxd.res._NanoJpeg = {};
hxd.res._NanoJpeg.Component = function() {
};
$hxClasses["hxd.res._NanoJpeg.Component"] = hxd.res._NanoJpeg.Component;
hxd.res._NanoJpeg.Component.__name__ = ["hxd","res","_NanoJpeg","Component"];
hxd.res._NanoJpeg.Component.prototype = {
	__class__: hxd.res._NanoJpeg.Component
};
hxd.res.NanoJpeg = function() {
	var array = [new hxd.res._NanoJpeg.Component(),new hxd.res._NanoJpeg.Component(),new hxd.res._NanoJpeg.Component()];
	var vec;
	var this1;
	this1 = new Array(array.length);
	vec = this1;
	var _g1 = 0;
	var _g = array.length;
	while(_g1 < _g) {
		var i = _g1++;
		vec[i] = array[i];
	}
	this.comps = vec;
	var array1 = [(function($this) {
		var $r;
		var this2;
		this2 = new Array(64);
		$r = this2;
		return $r;
	}(this)),(function($this) {
		var $r;
		var this3;
		this3 = new Array(64);
		$r = this3;
		return $r;
	}(this)),(function($this) {
		var $r;
		var this4;
		this4 = new Array(64);
		$r = this4;
		return $r;
	}(this)),(function($this) {
		var $r;
		var this5;
		this5 = new Array(64);
		$r = this5;
		return $r;
	}(this))];
	var vec1;
	var this6;
	this6 = new Array(array1.length);
	vec1 = this6;
	var _g11 = 0;
	var _g2 = array1.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		vec1[i1] = array1[i1];
	}
	this.qtab = vec1;
	var this7;
	this7 = new Array(16);
	this.counts = this7;
	var this8;
	this8 = new Array(64);
	this.block = this8;
	var array2 = [0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63];
	var vec2;
	var this9;
	this9 = new Array(array2.length);
	vec2 = this9;
	var _g12 = 0;
	var _g3 = array2.length;
	while(_g12 < _g3) {
		var i2 = _g12++;
		vec2[i2] = array2[i2];
	}
	this.njZZ = vec2;
	var array3 = [null,null,null,null];
	var vec3;
	var this10;
	this10 = new Array(array3.length);
	vec3 = this10;
	var _g13 = 0;
	var _g4 = array3.length;
	while(_g13 < _g4) {
		var i3 = _g13++;
		vec3[i3] = array3[i3];
	}
	this.vlctab = vec3;
};
$hxClasses["hxd.res.NanoJpeg"] = hxd.res.NanoJpeg;
hxd.res.NanoJpeg.__name__ = ["hxd","res","NanoJpeg"];
hxd.res.NanoJpeg.njClip = function(x) {
	if(x < 0) return 0; else if(x > 255) return 255; else return x;
};
hxd.res.NanoJpeg.decode = function(bytes,filter,position,size) {
	if(size == null) size = -1;
	if(position == null) position = 0;
	if(hxd.res.NanoJpeg.inst == null) hxd.res.NanoJpeg.inst = new hxd.res.NanoJpeg();
	hxd.res.NanoJpeg.inst.njInit(bytes,position,size,filter);
	return hxd.res.NanoJpeg.inst.njDecode();
};
hxd.res.NanoJpeg.prototype = {
	njInit: function(bytes,pos,size,filter) {
		this.bytes = bytes;
		this.pos = pos;
		if(filter == null) this.filter = hxd.res.Filter.Chromatic; else this.filter = filter;
		if(size < 0) size = bytes.length - pos;
		var _g = 0;
		while(_g < 4) {
			var i = _g++;
			if(this.vlctab[i] == null) {
				var val = hxd.impl.Tmp.getBytes(131072);
				this.vlctab[i] = val;
			}
		}
		this.size = size;
		this.qtused = 0;
		this.qtavail = 0;
		this.rstinterval = 0;
		this.buf = 0;
		this.bufbits = 0;
		var _g1 = 0;
		while(_g1 < 3) {
			var i1 = _g1++;
			this.comps[i1].dcpred = 0;
		}
	}
	,cleanup: function() {
		this.bytes = null;
		var _g = 0;
		var _g1 = this.comps;
		while(_g < _g1.length) {
			var c = _g1[_g];
			++_g;
			if(c.pixels != null) {
				hxd.impl.Tmp.saveBytes(c.pixels);
				c.pixels = null;
			}
		}
		var _g2 = 0;
		while(_g2 < 4) {
			var i = _g2++;
			if(this.vlctab[i] != null) {
				hxd.impl.Tmp.saveBytes(this.vlctab[i]);
				this.vlctab[i] = null;
			}
		}
	}
	,njSkip: function(count) {
		this.pos += count;
		this.size -= count;
		this.length -= count;
		if(this.size < 0) throw "Invalid JPEG file";
	}
	,njShowBits: function(bits) {
		if(bits == 0) return 0;
		while(this.bufbits < bits) {
			if(this.size <= 0) {
				this.buf = this.buf << 8 | 255;
				this.bufbits += 8;
				continue;
			}
			var newbyte = this.bytes.b[this.pos];
			this.pos++;
			this.size--;
			this.bufbits += 8;
			this.buf = this.buf << 8 | newbyte;
			if(newbyte == 255) {
				if(this.size == 0) throw "Invalid JPEG file";
				var marker = this.bytes.b[this.pos];
				this.pos++;
				this.size--;
				switch(marker) {
				case 0:case 255:
					break;
				case 217:
					this.size = 0;
					break;
				default:
					if((marker & 248) != 208) throw "Invalid JPEG file";
					this.buf = this.buf << 8 | marker;
					this.bufbits += 8;
				}
			}
		}
		return this.buf >> this.bufbits - bits & (1 << bits) - 1;
	}
	,njGetBits: function(bits) {
		var r = this.njShowBits(bits);
		this.bufbits -= bits;
		return r;
	}
	,njDecodeSOF: function() {
		if(this.size < 2) throw "Invalid JPEG file";
		this.length = this.bytes.b[this.pos] << 8 | this.bytes.b[this.pos + 1];
		if(this.length > this.size) throw "Invalid JPEG file";
		this.pos += 2;
		this.size -= 2;
		this.length -= 2;
		if(this.size < 0) throw "Invalid JPEG file";
		if(this.length < 9) throw "Invalid JPEG file";
		if(this.bytes.b[this.pos] != 8) this.notSupported();
		this.height = this.bytes.b[this.pos + 1] << 8 | this.bytes.b[this.pos + 2];
		this.width = this.bytes.b[this.pos + 3] << 8 | this.bytes.b[this.pos + 4];
		this.ncomp = this.bytes.b[this.pos + 5];
		this.pos += 6;
		this.size -= 6;
		this.length -= 6;
		if(this.size < 0) throw "Invalid JPEG file";
		var _g = this.ncomp;
		switch(_g) {
		case 1:case 3:
			break;
		default:
			this.notSupported();
		}
		if(this.length < this.ncomp * 3) throw "Invalid JPEG file";
		var ssxmax = 0;
		var ssymax = 0;
		var _g1 = 0;
		var _g2 = this.ncomp;
		while(_g1 < _g2) {
			var i = _g1++;
			var c = this.comps[i];
			c.cid = this.bytes.b[this.pos];
			c.ssx = this.bytes.b[this.pos + 1] >> 4;
			if(c.ssx == 0) throw "Invalid JPEG file";
			if((c.ssx & c.ssx - 1) != 0) this.notSupported();
			c.ssy = this.bytes.b[this.pos + 1] & 15;
			if(c.ssy == 0) throw "Invalid JPEG file";
			if((c.ssy & c.ssy - 1) != 0) this.notSupported();
			c.qtsel = this.bytes.b[this.pos + 2];
			if((c.qtsel & 252) != 0) throw "Invalid JPEG file";
			this.pos += 3;
			this.size -= 3;
			this.length -= 3;
			if(this.size < 0) throw "Invalid JPEG file";
			this.qtused |= 1 << c.qtsel;
			if(c.ssx > ssxmax) ssxmax = c.ssx;
			if(c.ssy > ssymax) ssymax = c.ssy;
		}
		if(this.ncomp == 1) {
			var c1 = this.comps[0];
			c1.ssx = c1.ssy = ssxmax = ssymax = 1;
		}
		this.mbsizex = ssxmax << 3;
		this.mbsizey = ssymax << 3;
		this.mbwidth = (this.width + this.mbsizex - 1) / this.mbsizex | 0;
		this.mbheight = (this.height + this.mbsizey - 1) / this.mbsizey | 0;
		var _g11 = 0;
		var _g3 = this.ncomp;
		while(_g11 < _g3) {
			var i1 = _g11++;
			var c2 = this.comps[i1];
			c2.width = (this.width * c2.ssx + ssxmax - 1) / ssxmax | 0;
			c2.stride = c2.width + 7 & 2147483640;
			c2.height = (this.height * c2.ssy + ssymax - 1) / ssymax | 0;
			c2.stride = this.mbwidth * this.mbsizex * c2.ssx / ssxmax | 0;
			if(c2.width < 3 && c2.ssx != ssxmax || c2.height < 3 && c2.ssy != ssymax) this.notSupported();
			c2.pixels = hxd.impl.Tmp.getBytes(c2.stride * (this.mbheight * this.mbsizey * c2.ssy / ssymax | 0));
		}
		this.njSkip(this.length);
	}
	,njDecodeDQT: function() {
		if(this.size < 2) throw "Invalid JPEG file";
		this.length = this.bytes.b[this.pos] << 8 | this.bytes.b[this.pos + 1];
		if(this.length > this.size) throw "Invalid JPEG file";
		this.pos += 2;
		this.size -= 2;
		this.length -= 2;
		if(this.size < 0) throw "Invalid JPEG file";
		while(this.length >= 65) {
			var i = this.bytes.b[this.pos];
			if((i & 252) != 0) throw "Invalid JPEG file";
			this.qtavail |= 1 << i;
			var t = this.qtab[i];
			var _g = 0;
			while(_g < 64) {
				var k = _g++;
				t[k] = this.bytes.b[this.pos + (k + 1)];
			}
			this.pos += 65;
			this.size -= 65;
			this.length -= 65;
			if(this.size < 0) throw "Invalid JPEG file";
		}
		if(this.length != 0) throw "Invalid JPEG file";
	}
	,njDecodeDHT: function() {
		if(this.size < 2) throw "Invalid JPEG file";
		this.length = this.bytes.b[this.pos] << 8 | this.bytes.b[this.pos + 1];
		if(this.length > this.size) throw "Invalid JPEG file";
		this.pos += 2;
		this.size -= 2;
		this.length -= 2;
		if(this.size < 0) throw "Invalid JPEG file";
		while(this.length >= 17) {
			var i = this.bytes.b[this.pos];
			if((i & 236) != 0) throw "Invalid JPEG file";
			if((i & 2) != 0) this.notSupported();
			i = (i | i >> 3) & 3;
			var _g = 0;
			while(_g < 16) {
				var codelen = _g++;
				this.counts[codelen] = this.bytes.b[this.pos + (codelen + 1)];
			}
			this.pos += 17;
			this.size -= 17;
			this.length -= 17;
			if(this.size < 0) throw "Invalid JPEG file";
			var vlc = this.vlctab[i];
			var vpos = 0;
			var remain = 65536;
			var spread = 65536;
			var _g1 = 1;
			while(_g1 < 17) {
				var codelen1 = _g1++;
				spread >>= 1;
				var currcnt = this.counts[codelen1 - 1];
				if(currcnt == 0) continue;
				if(this.length < currcnt) throw "Invalid JPEG file";
				remain -= currcnt << 16 - codelen1;
				if(remain < 0) throw "Invalid JPEG file";
				var _g11 = 0;
				while(_g11 < currcnt) {
					var i1 = _g11++;
					var code = this.bytes.b[this.pos + i1];
					var _g2 = 0;
					while(_g2 < spread) {
						var j = _g2++;
						vlc.set(vpos++,codelen1);
						vlc.set(vpos++,code);
					}
				}
				this.pos += currcnt;
				this.size -= currcnt;
				this.length -= currcnt;
				if(this.size < 0) throw "Invalid JPEG file";
			}
			while(remain-- != 0) {
				vlc.b[vpos] = 0;
				vpos += 2;
			}
		}
		if(this.length != 0) throw "Invalid JPEG file";
	}
	,njDecodeDRI: function() {
		if(this.size < 2) throw "Invalid JPEG file";
		this.length = this.bytes.b[this.pos] << 8 | this.bytes.b[this.pos + 1];
		if(this.length > this.size) throw "Invalid JPEG file";
		this.pos += 2;
		this.size -= 2;
		this.length -= 2;
		if(this.size < 0) throw "Invalid JPEG file";
		if(this.length < 2) throw "Invalid JPEG file";
		this.rstinterval = this.bytes.b[this.pos] << 8 | this.bytes.b[this.pos + 1];
		this.njSkip(this.length);
	}
	,njGetVLC: function(vlc) {
		var value = this.njShowBits(16);
		var bits = vlc.b[value << 1];
		if(bits == 0) throw "Invalid JPEG file";
		if(this.bufbits < bits) this.njShowBits(bits);
		this.bufbits -= bits;
		value = vlc.b[value << 1 | 1];
		this.vlcCode = value;
		bits = value & 15;
		if(bits == 0) return 0;
		value = this.njGetBits(bits);
		if(value < 1 << bits - 1) value += (-1 << bits) + 1;
		return value;
	}
	,njRowIDCT: function(bp) {
		var x0;
		var x1;
		var x2;
		var x3;
		var x4;
		var x5;
		var x6;
		var x7;
		var x8;
		if(((x1 = this.block[bp + 4] << 11) | (x2 = this.block[bp + 6]) | (x3 = this.block[bp + 2]) | (x4 = this.block[bp + 1]) | (x5 = this.block[bp + 7]) | (x6 = this.block[bp + 5]) | (x7 = this.block[bp + 3])) == 0) {
			var val;
			var val1;
			var val2;
			var val3;
			var val4;
			var val5;
			var val6 = this.block[bp + 7] = this.block[bp] << 3;
			val5 = this.block[bp + 6] = val6;
			val4 = this.block[bp + 5] = val5;
			val3 = this.block[bp + 4] = val4;
			val2 = this.block[bp + 3] = val3;
			val1 = this.block[bp + 2] = val2;
			val = this.block[bp + 1] = val1;
			this.block[bp] = val;
			return;
		}
		x0 = (this.block[bp] << 11) + 128;
		x8 = 565 * (x4 + x5);
		x4 = x8 + 2276 * x4;
		x5 = x8 - 3406 * x5;
		x8 = 2408 * (x6 + x7);
		x6 = x8 - 799 * x6;
		x7 = x8 - 4017 * x7;
		x8 = x0 + x1;
		x0 -= x1;
		x1 = 1108 * (x3 + x2);
		x2 = x1 - 3784 * x2;
		x3 = x1 + 1568 * x3;
		x1 = x4 + x6;
		x4 -= x6;
		x6 = x5 + x7;
		x5 -= x7;
		x7 = x8 + x3;
		x8 -= x3;
		x3 = x0 + x2;
		x0 -= x2;
		x2 = 181 * (x4 + x5) + 128 >> 8;
		x4 = 181 * (x4 - x5) + 128 >> 8;
		this.block[bp] = x7 + x1 >> 8;
		this.block[bp + 1] = x3 + x2 >> 8;
		this.block[bp + 2] = x0 + x4 >> 8;
		this.block[bp + 3] = x8 + x6 >> 8;
		this.block[bp + 4] = x8 - x6 >> 8;
		this.block[bp + 5] = x0 - x4 >> 8;
		this.block[bp + 6] = x3 - x2 >> 8;
		this.block[bp + 7] = x7 - x1 >> 8;
	}
	,njColIDCT: function(bp,out,po,stride) {
		var x0;
		var x1;
		var x2;
		var x3;
		var x4;
		var x5;
		var x6;
		var x7;
		var x8;
		if(((x1 = this.block[bp + 32] << 8) | (x2 = this.block[bp + 48]) | (x3 = this.block[bp + 16]) | (x4 = this.block[bp + 8]) | (x5 = this.block[bp + 56]) | (x6 = this.block[bp + 40]) | (x7 = this.block[bp + 24])) == 0) {
			x1 = hxd.res.NanoJpeg.njClip((this.block[bp] + 32 >> 6) + 128);
			var _g = 0;
			while(_g < 8) {
				var i = _g++;
				out.b[po] = x1 & 255;
				po += stride;
			}
			return;
		}
		x0 = (this.block[bp] << 8) + 8192;
		x8 = 565 * (x4 + x5) + 4;
		x4 = x8 + 2276 * x4 >> 3;
		x5 = x8 - 3406 * x5 >> 3;
		x8 = 2408 * (x6 + x7) + 4;
		x6 = x8 - 799 * x6 >> 3;
		x7 = x8 - 4017 * x7 >> 3;
		x8 = x0 + x1;
		x0 -= x1;
		x1 = 1108 * (x3 + x2) + 4;
		x2 = x1 - 3784 * x2 >> 3;
		x3 = x1 + 1568 * x3 >> 3;
		x1 = x4 + x6;
		x4 -= x6;
		x6 = x5 + x7;
		x5 -= x7;
		x7 = x8 + x3;
		x8 -= x3;
		x3 = x0 + x2;
		x0 -= x2;
		x2 = 181 * (x4 + x5) + 128 >> 8;
		x4 = 181 * (x4 - x5) + 128 >> 8;
		var v = hxd.res.NanoJpeg.njClip((x7 + x1 >> 14) + 128);
		out.b[po] = v & 255;
		po += stride;
		var v1 = hxd.res.NanoJpeg.njClip((x3 + x2 >> 14) + 128);
		out.b[po] = v1 & 255;
		po += stride;
		var v2 = hxd.res.NanoJpeg.njClip((x0 + x4 >> 14) + 128);
		out.b[po] = v2 & 255;
		po += stride;
		var v3 = hxd.res.NanoJpeg.njClip((x8 + x6 >> 14) + 128);
		out.b[po] = v3 & 255;
		po += stride;
		var v4 = hxd.res.NanoJpeg.njClip((x8 - x6 >> 14) + 128);
		out.b[po] = v4 & 255;
		po += stride;
		var v5 = hxd.res.NanoJpeg.njClip((x0 - x4 >> 14) + 128);
		out.b[po] = v5 & 255;
		po += stride;
		var v6 = hxd.res.NanoJpeg.njClip((x3 - x2 >> 14) + 128);
		out.b[po] = v6 & 255;
		po += stride;
		var v7 = hxd.res.NanoJpeg.njClip((x7 - x1 >> 14) + 128);
		out.b[po] = v7 & 255;
	}
	,njDecodeBlock: function(c,po) {
		var out = c.pixels;
		var value;
		var coef = 0;
		var _g = 0;
		while(_g < 64) {
			var i = _g++;
			this.block[i] = 0;
		}
		c.dcpred += this.njGetVLC(this.vlctab[c.dctabsel]);
		var qt = this.qtab[c.qtsel];
		var at = this.vlctab[c.actabsel];
		this.block[0] = c.dcpred * qt[0];
		do {
			value = this.njGetVLC(at);
			if(this.vlcCode == 0) break;
			if((this.vlcCode & 15) == 0 && this.vlcCode != 240) throw "Invalid JPEG file";
			coef += (this.vlcCode >> 4) + 1;
			if(coef > 63) throw "Invalid JPEG file";
			this.block[this.njZZ[coef]] = value * qt[coef];
		} while(coef < 63);
		var _g1 = 0;
		while(_g1 < 8) {
			var coef1 = _g1++;
			this.njRowIDCT(coef1 * 8);
		}
		var _g2 = 0;
		while(_g2 < 8) {
			var coef2 = _g2++;
			this.njColIDCT(coef2,out,coef2 + po,c.stride);
		}
	}
	,notSupported: function() {
		throw "This JPG file is not supported";
	}
	,njDecodeScan: function() {
		if(this.size < 2) throw "Invalid JPEG file";
		this.length = this.bytes.b[this.pos] << 8 | this.bytes.b[this.pos + 1];
		if(this.length > this.size) throw "Invalid JPEG file";
		this.pos += 2;
		this.size -= 2;
		this.length -= 2;
		if(this.size < 0) throw "Invalid JPEG file";
		if(this.length < 4 + 2 * this.ncomp) throw "Invalid JPEG file";
		if(this.bytes.b[this.pos] != this.ncomp) this.notSupported();
		this.pos += 1;
		this.size -= 1;
		this.length -= 1;
		if(this.size < 0) throw "Invalid JPEG file";
		var _g1 = 0;
		var _g = this.ncomp;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.comps[i];
			if(this.bytes.b[this.pos] != c.cid) throw "Invalid JPEG file";
			if((this.bytes.b[this.pos + 1] & 238) != 0) throw "Invalid JPEG file";
			c.dctabsel = this.bytes.b[this.pos + 1] >> 4;
			c.actabsel = this.bytes.b[this.pos + 1] & 1 | 2;
			this.pos += 2;
			this.size -= 2;
			this.length -= 2;
			if(this.size < 0) throw "Invalid JPEG file";
		}
		if(this.bytes.b[this.pos] != 0 || this.bytes.b[this.pos + 1] != 63 || this.bytes.b[this.pos + 2] != 0) this.notSupported();
		this.njSkip(this.length);
		var mbx = 0;
		var mby = 0;
		var rstcount = this.rstinterval;
		var nextrst = 0;
		while(true) {
			var _g11 = 0;
			var _g2 = this.ncomp;
			while(_g11 < _g2) {
				var i1 = _g11++;
				var c1 = this.comps[i1];
				var _g3 = 0;
				var _g21 = c1.ssy;
				while(_g3 < _g21) {
					var sby = _g3++;
					var _g5 = 0;
					var _g4 = c1.ssx;
					while(_g5 < _g4) {
						var sbx = _g5++;
						this.njDecodeBlock(c1,(mby * c1.ssy + sby) * c1.stride + mbx * c1.ssx + sbx << 3);
					}
				}
			}
			if(++mbx >= this.mbwidth) {
				mbx = 0;
				if(++mby >= this.mbheight) break;
			}
			if(this.rstinterval != 0 && --rstcount == 0) {
				this.bufbits &= 248;
				var i2 = this.njGetBits(16);
				if((i2 & 65528) != 65488 || (i2 & 7) != nextrst) throw "Invalid JPEG file";
				nextrst = nextrst + 1 & 7;
				rstcount = this.rstinterval;
				var _g6 = 0;
				while(_g6 < 3) {
					var i3 = _g6++;
					this.comps[i3].dcpred = 0;
				}
			}
		}
	}
	,njUpsampleH: function(c) {
		var xmax = c.width - 3;
		var cout = hxd.impl.Tmp.getBytes(c.width * c.height << 1);
		var lout = cout;
		var lin = c.pixels;
		var pi = 0;
		var po = 0;
		var _g1 = 0;
		var _g = c.height;
		while(_g1 < _g) {
			var y = _g1++;
			var v = hxd.res.NanoJpeg.njClip(139 * lin.b[pi] + -11 * lin.b[pi + 1] + 64 >> 7);
			lout.b[po] = v & 255;
			var v1 = hxd.res.NanoJpeg.njClip(104 * lin.b[pi] + 27 * lin.b[pi + 1] + -3 * lin.b[pi + 2] + 64 >> 7);
			lout.b[po + 1] = v1 & 255;
			var v2 = hxd.res.NanoJpeg.njClip(28 * lin.b[pi] + 109 * lin.b[pi + 1] + -9 * lin.b[pi + 2] + 64 >> 7);
			lout.b[po + 2] = v2 & 255;
			var _g2 = 0;
			while(_g2 < xmax) {
				var x = _g2++;
				var v3 = hxd.res.NanoJpeg.njClip(-9 * lin.b[pi + x] + 111 * lin.b[pi + x + 1] + 29 * lin.b[pi + x + 2] + -3 * lin.b[pi + x + 3] + 64 >> 7);
				lout.b[po + (x << 1) + 3] = v3 & 255;
				var v4 = hxd.res.NanoJpeg.njClip(-3 * lin.b[pi + x] + 29 * lin.b[pi + x + 1] + 111 * lin.b[pi + x + 2] + -9 * lin.b[pi + x + 3] + 64 >> 7);
				lout.b[po + (x << 1) + 4] = v4 & 255;
			}
			pi += c.stride;
			po += c.width << 1;
			var v5 = hxd.res.NanoJpeg.njClip(28 * lin.b[pi - 1] + 109 * lin.b[pi - 2] + -9 * lin.b[pi - 3] + 64 >> 7);
			lout.b[po - 3] = v5 & 255;
			var v6 = hxd.res.NanoJpeg.njClip(104 * lin.b[pi - 1] + 27 * lin.b[pi - 2] + -3 * lin.b[pi - 3] + 64 >> 7);
			lout.b[po - 2] = v6 & 255;
			var v7 = hxd.res.NanoJpeg.njClip(139 * lin.b[pi - 1] + -11 * lin.b[pi - 2] + 64 >> 7);
			lout.b[po - 1] = v7 & 255;
		}
		c.width <<= 1;
		c.stride = c.width;
		hxd.impl.Tmp.saveBytes(c.pixels);
		c.pixels = cout;
	}
	,njUpsampleV: function(c) {
		var w = c.width;
		var s1 = c.stride;
		var s2 = s1 + s1;
		var out = hxd.impl.Tmp.getBytes(c.width * c.height << 1);
		var pi = 0;
		var po = 0;
		var cout = out;
		var cin = c.pixels;
		var _g = 0;
		while(_g < w) {
			var x = _g++;
			pi = po = x;
			var v = hxd.res.NanoJpeg.njClip(139 * cin.b[pi] + -11 * cin.b[pi + s1] + 64 >> 7);
			cout.b[po] = v & 255;
			po += w;
			var v1 = hxd.res.NanoJpeg.njClip(104 * cin.b[pi] + 27 * cin.b[pi + s1] + -3 * cin.b[pi + s2] + 64 >> 7);
			cout.b[po] = v1 & 255;
			po += w;
			var v2 = hxd.res.NanoJpeg.njClip(28 * cin.b[pi] + 109 * cin.b[pi + s1] + -9 * cin.b[pi + s2] + 64 >> 7);
			cout.b[po] = v2 & 255;
			po += w;
			pi += s1;
			var _g2 = 0;
			var _g1 = c.height - 2;
			while(_g2 < _g1) {
				var y = _g2++;
				var v3 = hxd.res.NanoJpeg.njClip(-9 * cin.b[pi - s1] + 111 * cin.b[pi] + 29 * cin.b[pi + s1] + -3 * cin.b[pi + s2] + 64 >> 7);
				cout.b[po] = v3 & 255;
				po += w;
				var v4 = hxd.res.NanoJpeg.njClip(-3 * cin.b[pi - s1] + 29 * cin.b[pi] + 111 * cin.b[pi + s1] + -9 * cin.b[pi + s2] + 64 >> 7);
				cout.b[po] = v4 & 255;
				po += w;
				pi += s1;
			}
			pi += s1;
			var v5 = hxd.res.NanoJpeg.njClip(28 * cin.b[pi] + 109 * cin.b[pi - s1] + -9 * cin.b[pi - s2] + 64 >> 7);
			cout.b[po] = v5 & 255;
			po += w;
			var v6 = hxd.res.NanoJpeg.njClip(104 * cin.b[pi] + 27 * cin.b[pi - s1] + -3 * cin.b[pi - s2] + 64 >> 7);
			cout.b[po] = v6 & 255;
			po += w;
			var v7 = hxd.res.NanoJpeg.njClip(139 * cin.b[pi] + -11 * cin.b[pi - s1] + 64 >> 7);
			cout.b[po] = v7 & 255;
		}
		c.height <<= 1;
		c.stride = c.width;
		hxd.impl.Tmp.saveBytes(c.pixels);
		c.pixels = out;
	}
	,njUpsample: function(c) {
		var xshift = 0;
		var yshift = 0;
		while(c.width < this.width) {
			c.width <<= 1;
			++xshift;
		}
		while(c.height < this.height) {
			c.height <<= 1;
			++yshift;
		}
		var out = hxd.impl.Tmp.getBytes(c.width * c.height);
		var lin = c.pixels;
		var pout = 0;
		var lout = out;
		var _g1 = 0;
		var _g = c.height;
		while(_g1 < _g) {
			var y = _g1++;
			var pin = (y >> yshift) * c.stride;
			var _g3 = 0;
			var _g2 = c.width;
			while(_g3 < _g2) {
				var x = _g3++;
				var pos = pout++;
				lout.b[pos] = lin.b[(x >> xshift) + pin] & 255;
			}
		}
		c.stride = c.width;
		hxd.impl.Tmp.saveBytes(c.pixels);
		c.pixels = out;
	}
	,njConvert: function() {
		var _g1 = 0;
		var _g = this.ncomp;
		while(_g1 < _g) {
			var i = _g1++;
			var c = this.comps[i];
			var _g2 = this.filter;
			switch(_g2[1]) {
			case 0:
				if(c.width < this.width || c.height < this.height) this.njUpsample(c);
				break;
			case 1:
				while(c.width < this.width || c.height < this.height) {
					if(c.width < this.width) this.njUpsampleH(c);
					if(c.height < this.height) this.njUpsampleV(c);
				}
				break;
			}
			if(c.width < this.width || c.height < this.height) throw "assert";
		}
		var pixels = hxd.impl.Tmp.getBytes(this.width * this.height * 4);
		if(this.ncomp == 3) {
			var py = this.comps[0].pixels;
			var pcb = this.comps[1].pixels;
			var pcr = this.comps[2].pixels;
			var pix = pixels;
			var k1 = 0;
			var k2 = 0;
			var k3 = 0;
			var out = 0;
			var _g11 = 0;
			var _g3 = this.height;
			while(_g11 < _g3) {
				var yy = _g11++;
				var _g31 = 0;
				var _g21 = this.width;
				while(_g31 < _g21) {
					var x = _g31++;
					var y;
					y = (function($this) {
						var $r;
						var i1 = k1++;
						$r = py.b[i1];
						return $r;
					}(this)) << 8;
					var cb;
					cb = (function($this) {
						var $r;
						var i2 = k2++;
						$r = pcb.b[i2];
						return $r;
					}(this)) - 128;
					var cr;
					cr = (function($this) {
						var $r;
						var i3 = k3++;
						$r = pcr.b[i3];
						return $r;
					}(this)) - 128;
					var r = hxd.res.NanoJpeg.njClip(y + 359 * cr + 128 >> 8);
					var g = hxd.res.NanoJpeg.njClip(y - 88 * cb - 183 * cr + 128 >> 8);
					var b = hxd.res.NanoJpeg.njClip(y + 454 * cb + 128 >> 8);
					var out1 = out++;
					pix.b[out1] = b & 255;
					var out2 = out++;
					pix.b[out2] = g & 255;
					var out3 = out++;
					pix.b[out3] = r & 255;
					var out4 = out++;
					pix.b[out4] = 255;
				}
				k1 += this.comps[0].stride - this.width;
				k2 += this.comps[1].stride - this.width;
				k3 += this.comps[2].stride - this.width;
			}
		} else throw "TODO";
		return pixels;
	}
	,njDecode: function() {
		if(this.size < 2 || this.bytes.b[this.pos] != 255 || this.bytes.b[this.pos + 1] != 216) throw "This file is not a JPEG";
		this.pos += 2;
		this.size -= 2;
		this.length -= 2;
		if(this.size < 0) throw "Invalid JPEG file";
		try {
			while(true) {
				if(this.size < 2 || this.bytes.b[this.pos] != 255) throw "Invalid JPEG file";
				this.pos += 2;
				this.size -= 2;
				this.length -= 2;
				if(this.size < 0) throw "Invalid JPEG file";
				var _g = this.bytes.b[this.pos + -1];
				switch(_g) {
				case 192:
					this.njDecodeSOF();
					break;
				case 219:
					this.njDecodeDQT();
					break;
				case 196:
					this.njDecodeDHT();
					break;
				case 221:
					this.njDecodeDRI();
					break;
				case 218:
					this.njDecodeScan();
					throw "__break__";
					break;
				case 254:
					if(this.size < 2) throw "Invalid JPEG file";
					this.length = this.bytes.b[this.pos] << 8 | this.bytes.b[this.pos + 1];
					if(this.length > this.size) throw "Invalid JPEG file";
					this.pos += 2;
					this.size -= 2;
					this.length -= 2;
					if(this.size < 0) throw "Invalid JPEG file";
					this.njSkip(this.length);
					break;
				case 194:
					throw "Unsupported progressive JPG";
					break;
				case 195:
					throw "Unsupported lossless JPG";
					break;
				default:
					var _g1 = this.bytes.b[this.pos + -1] & 240;
					switch(_g1) {
					case 224:
						if(this.size < 2) throw "Invalid JPEG file";
						this.length = this.bytes.b[this.pos] << 8 | this.bytes.b[this.pos + 1];
						if(this.length > this.size) throw "Invalid JPEG file";
						this.pos += 2;
						this.size -= 2;
						this.length -= 2;
						if(this.size < 0) throw "Invalid JPEG file";
						this.njSkip(this.length);
						break;
					case 192:
						throw "Unsupported jpeg type " + (this.bytes.b[this.pos + -1] & 15);
						break;
					default:
						throw "Unsupported jpeg tag 0x" + StringTools.hex(this.bytes.b[this.pos + -1],2);
					}
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		var pixels = this.njConvert();
		this.cleanup();
		return { pixels : pixels, width : this.width, height : this.height};
	}
	,__class__: hxd.res.NanoJpeg
};
hxd.res.NotFound = function(path) {
	this.path = path;
};
$hxClasses["hxd.res.NotFound"] = hxd.res.NotFound;
hxd.res.NotFound.__name__ = ["hxd","res","NotFound"];
hxd.res.NotFound.prototype = {
	toString: function() {
		return "Resource file not found '" + this.path + "'";
	}
	,__class__: hxd.res.NotFound
};
hxsl.Type = $hxClasses["hxsl.Type"] = { __ename__ : true, __constructs__ : ["TVoid","TInt","TBool","TFloat","TString","TVec","TMat3","TMat4","TMat3x4","TBytes","TSampler2D","TSamplerCube","TStruct","TFun","TArray"] };
hxsl.Type.TVoid = ["TVoid",0];
hxsl.Type.TVoid.toString = $estr;
hxsl.Type.TVoid.__enum__ = hxsl.Type;
hxsl.Type.TInt = ["TInt",1];
hxsl.Type.TInt.toString = $estr;
hxsl.Type.TInt.__enum__ = hxsl.Type;
hxsl.Type.TBool = ["TBool",2];
hxsl.Type.TBool.toString = $estr;
hxsl.Type.TBool.__enum__ = hxsl.Type;
hxsl.Type.TFloat = ["TFloat",3];
hxsl.Type.TFloat.toString = $estr;
hxsl.Type.TFloat.__enum__ = hxsl.Type;
hxsl.Type.TString = ["TString",4];
hxsl.Type.TString.toString = $estr;
hxsl.Type.TString.__enum__ = hxsl.Type;
hxsl.Type.TVec = function(size,t) { var $x = ["TVec",5,size,t]; $x.__enum__ = hxsl.Type; $x.toString = $estr; return $x; };
hxsl.Type.TMat3 = ["TMat3",6];
hxsl.Type.TMat3.toString = $estr;
hxsl.Type.TMat3.__enum__ = hxsl.Type;
hxsl.Type.TMat4 = ["TMat4",7];
hxsl.Type.TMat4.toString = $estr;
hxsl.Type.TMat4.__enum__ = hxsl.Type;
hxsl.Type.TMat3x4 = ["TMat3x4",8];
hxsl.Type.TMat3x4.toString = $estr;
hxsl.Type.TMat3x4.__enum__ = hxsl.Type;
hxsl.Type.TBytes = function(size) { var $x = ["TBytes",9,size]; $x.__enum__ = hxsl.Type; $x.toString = $estr; return $x; };
hxsl.Type.TSampler2D = ["TSampler2D",10];
hxsl.Type.TSampler2D.toString = $estr;
hxsl.Type.TSampler2D.__enum__ = hxsl.Type;
hxsl.Type.TSamplerCube = ["TSamplerCube",11];
hxsl.Type.TSamplerCube.toString = $estr;
hxsl.Type.TSamplerCube.__enum__ = hxsl.Type;
hxsl.Type.TStruct = function(vl) { var $x = ["TStruct",12,vl]; $x.__enum__ = hxsl.Type; $x.toString = $estr; return $x; };
hxsl.Type.TFun = function(variants) { var $x = ["TFun",13,variants]; $x.__enum__ = hxsl.Type; $x.toString = $estr; return $x; };
hxsl.Type.TArray = function(t,size) { var $x = ["TArray",14,t,size]; $x.__enum__ = hxsl.Type; $x.toString = $estr; return $x; };
hxsl.Type.__empty_constructs__ = [hxsl.Type.TVoid,hxsl.Type.TInt,hxsl.Type.TBool,hxsl.Type.TFloat,hxsl.Type.TString,hxsl.Type.TMat3,hxsl.Type.TMat4,hxsl.Type.TMat3x4,hxsl.Type.TSampler2D,hxsl.Type.TSamplerCube];
hxsl.VecType = $hxClasses["hxsl.VecType"] = { __ename__ : true, __constructs__ : ["VInt","VFloat","VBool"] };
hxsl.VecType.VInt = ["VInt",0];
hxsl.VecType.VInt.toString = $estr;
hxsl.VecType.VInt.__enum__ = hxsl.VecType;
hxsl.VecType.VFloat = ["VFloat",1];
hxsl.VecType.VFloat.toString = $estr;
hxsl.VecType.VFloat.__enum__ = hxsl.VecType;
hxsl.VecType.VBool = ["VBool",2];
hxsl.VecType.VBool.toString = $estr;
hxsl.VecType.VBool.__enum__ = hxsl.VecType;
hxsl.VecType.__empty_constructs__ = [hxsl.VecType.VInt,hxsl.VecType.VFloat,hxsl.VecType.VBool];
hxsl.SizeDecl = $hxClasses["hxsl.SizeDecl"] = { __ename__ : true, __constructs__ : ["SConst","SVar"] };
hxsl.SizeDecl.SConst = function(v) { var $x = ["SConst",0,v]; $x.__enum__ = hxsl.SizeDecl; $x.toString = $estr; return $x; };
hxsl.SizeDecl.SVar = function(v) { var $x = ["SVar",1,v]; $x.__enum__ = hxsl.SizeDecl; $x.toString = $estr; return $x; };
hxsl.SizeDecl.__empty_constructs__ = [];
hxsl.Error = function(msg,pos) {
	this.msg = msg;
	this.pos = pos;
};
$hxClasses["hxsl.Error"] = hxsl.Error;
hxsl.Error.__name__ = ["hxsl","Error"];
hxsl.Error.t = function(msg,pos) {
	throw new hxsl.Error(msg,pos);
	return null;
};
hxsl.Error.prototype = {
	toString: function() {
		return "Error(" + this.msg + ")@" + Std.string(this.pos);
	}
	,__class__: hxsl.Error
};
hxsl.VarKind = $hxClasses["hxsl.VarKind"] = { __ename__ : true, __constructs__ : ["Global","Input","Param","Var","Local","Output","Function"] };
hxsl.VarKind.Global = ["Global",0];
hxsl.VarKind.Global.toString = $estr;
hxsl.VarKind.Global.__enum__ = hxsl.VarKind;
hxsl.VarKind.Input = ["Input",1];
hxsl.VarKind.Input.toString = $estr;
hxsl.VarKind.Input.__enum__ = hxsl.VarKind;
hxsl.VarKind.Param = ["Param",2];
hxsl.VarKind.Param.toString = $estr;
hxsl.VarKind.Param.__enum__ = hxsl.VarKind;
hxsl.VarKind.Var = ["Var",3];
hxsl.VarKind.Var.toString = $estr;
hxsl.VarKind.Var.__enum__ = hxsl.VarKind;
hxsl.VarKind.Local = ["Local",4];
hxsl.VarKind.Local.toString = $estr;
hxsl.VarKind.Local.__enum__ = hxsl.VarKind;
hxsl.VarKind.Output = ["Output",5];
hxsl.VarKind.Output.toString = $estr;
hxsl.VarKind.Output.__enum__ = hxsl.VarKind;
hxsl.VarKind.Function = ["Function",6];
hxsl.VarKind.Function.toString = $estr;
hxsl.VarKind.Function.__enum__ = hxsl.VarKind;
hxsl.VarKind.__empty_constructs__ = [hxsl.VarKind.Global,hxsl.VarKind.Input,hxsl.VarKind.Param,hxsl.VarKind.Var,hxsl.VarKind.Local,hxsl.VarKind.Output,hxsl.VarKind.Function];
hxsl.VarQualifier = $hxClasses["hxsl.VarQualifier"] = { __ename__ : true, __constructs__ : ["Const","Private","Nullable","PerObject","Name","Shared","Precision"] };
hxsl.VarQualifier.Const = function(max) { var $x = ["Const",0,max]; $x.__enum__ = hxsl.VarQualifier; $x.toString = $estr; return $x; };
hxsl.VarQualifier.Private = ["Private",1];
hxsl.VarQualifier.Private.toString = $estr;
hxsl.VarQualifier.Private.__enum__ = hxsl.VarQualifier;
hxsl.VarQualifier.Nullable = ["Nullable",2];
hxsl.VarQualifier.Nullable.toString = $estr;
hxsl.VarQualifier.Nullable.__enum__ = hxsl.VarQualifier;
hxsl.VarQualifier.PerObject = ["PerObject",3];
hxsl.VarQualifier.PerObject.toString = $estr;
hxsl.VarQualifier.PerObject.__enum__ = hxsl.VarQualifier;
hxsl.VarQualifier.Name = function(n) { var $x = ["Name",4,n]; $x.__enum__ = hxsl.VarQualifier; $x.toString = $estr; return $x; };
hxsl.VarQualifier.Shared = ["Shared",5];
hxsl.VarQualifier.Shared.toString = $estr;
hxsl.VarQualifier.Shared.__enum__ = hxsl.VarQualifier;
hxsl.VarQualifier.Precision = function(p) { var $x = ["Precision",6,p]; $x.__enum__ = hxsl.VarQualifier; $x.toString = $estr; return $x; };
hxsl.VarQualifier.__empty_constructs__ = [hxsl.VarQualifier.Private,hxsl.VarQualifier.Nullable,hxsl.VarQualifier.PerObject,hxsl.VarQualifier.Shared];
hxsl.Prec = $hxClasses["hxsl.Prec"] = { __ename__ : true, __constructs__ : ["Low","Medium","High"] };
hxsl.Prec.Low = ["Low",0];
hxsl.Prec.Low.toString = $estr;
hxsl.Prec.Low.__enum__ = hxsl.Prec;
hxsl.Prec.Medium = ["Medium",1];
hxsl.Prec.Medium.toString = $estr;
hxsl.Prec.Medium.__enum__ = hxsl.Prec;
hxsl.Prec.High = ["High",2];
hxsl.Prec.High.toString = $estr;
hxsl.Prec.High.__enum__ = hxsl.Prec;
hxsl.Prec.__empty_constructs__ = [hxsl.Prec.Low,hxsl.Prec.Medium,hxsl.Prec.High];
hxsl.Const = $hxClasses["hxsl.Const"] = { __ename__ : true, __constructs__ : ["CNull","CBool","CInt","CFloat","CString"] };
hxsl.Const.CNull = ["CNull",0];
hxsl.Const.CNull.toString = $estr;
hxsl.Const.CNull.__enum__ = hxsl.Const;
hxsl.Const.CBool = function(b) { var $x = ["CBool",1,b]; $x.__enum__ = hxsl.Const; $x.toString = $estr; return $x; };
hxsl.Const.CInt = function(v) { var $x = ["CInt",2,v]; $x.__enum__ = hxsl.Const; $x.toString = $estr; return $x; };
hxsl.Const.CFloat = function(v) { var $x = ["CFloat",3,v]; $x.__enum__ = hxsl.Const; $x.toString = $estr; return $x; };
hxsl.Const.CString = function(v) { var $x = ["CString",4,v]; $x.__enum__ = hxsl.Const; $x.toString = $estr; return $x; };
hxsl.Const.__empty_constructs__ = [hxsl.Const.CNull];
hxsl.FunctionKind = $hxClasses["hxsl.FunctionKind"] = { __ename__ : true, __constructs__ : ["Vertex","Fragment","Init","Helper"] };
hxsl.FunctionKind.Vertex = ["Vertex",0];
hxsl.FunctionKind.Vertex.toString = $estr;
hxsl.FunctionKind.Vertex.__enum__ = hxsl.FunctionKind;
hxsl.FunctionKind.Fragment = ["Fragment",1];
hxsl.FunctionKind.Fragment.toString = $estr;
hxsl.FunctionKind.Fragment.__enum__ = hxsl.FunctionKind;
hxsl.FunctionKind.Init = ["Init",2];
hxsl.FunctionKind.Init.toString = $estr;
hxsl.FunctionKind.Init.__enum__ = hxsl.FunctionKind;
hxsl.FunctionKind.Helper = ["Helper",3];
hxsl.FunctionKind.Helper.toString = $estr;
hxsl.FunctionKind.Helper.__enum__ = hxsl.FunctionKind;
hxsl.FunctionKind.__empty_constructs__ = [hxsl.FunctionKind.Vertex,hxsl.FunctionKind.Fragment,hxsl.FunctionKind.Init,hxsl.FunctionKind.Helper];
hxsl.TGlobal = $hxClasses["hxsl.TGlobal"] = { __ename__ : true, __constructs__ : ["Radians","Degrees","Sin","Cos","Tan","Asin","Acos","Atan","Pow","Exp","Log","Exp2","Log2","Sqrt","Inversesqrt","Abs","Sign","Floor","Ceil","Fract","Mod","Min","Max","Clamp","Mix","Step","SmoothStep","Length","Distance","Dot","Cross","Normalize","LReflect","Texture2D","TextureCube","ToInt","ToFloat","ToBool","Vec2","Vec3","Vec4","IVec2","IVec3","IVec4","BVec2","BVec3","BVec4","Mat2","Mat3","Mat4","Mat3x4","Saturate","Pack","Unpack","PackNormal","UnpackNormal","DFdx","DFdy","Fwidth"] };
hxsl.TGlobal.Radians = ["Radians",0];
hxsl.TGlobal.Radians.toString = $estr;
hxsl.TGlobal.Radians.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Degrees = ["Degrees",1];
hxsl.TGlobal.Degrees.toString = $estr;
hxsl.TGlobal.Degrees.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Sin = ["Sin",2];
hxsl.TGlobal.Sin.toString = $estr;
hxsl.TGlobal.Sin.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Cos = ["Cos",3];
hxsl.TGlobal.Cos.toString = $estr;
hxsl.TGlobal.Cos.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Tan = ["Tan",4];
hxsl.TGlobal.Tan.toString = $estr;
hxsl.TGlobal.Tan.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Asin = ["Asin",5];
hxsl.TGlobal.Asin.toString = $estr;
hxsl.TGlobal.Asin.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Acos = ["Acos",6];
hxsl.TGlobal.Acos.toString = $estr;
hxsl.TGlobal.Acos.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Atan = ["Atan",7];
hxsl.TGlobal.Atan.toString = $estr;
hxsl.TGlobal.Atan.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Pow = ["Pow",8];
hxsl.TGlobal.Pow.toString = $estr;
hxsl.TGlobal.Pow.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Exp = ["Exp",9];
hxsl.TGlobal.Exp.toString = $estr;
hxsl.TGlobal.Exp.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Log = ["Log",10];
hxsl.TGlobal.Log.toString = $estr;
hxsl.TGlobal.Log.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Exp2 = ["Exp2",11];
hxsl.TGlobal.Exp2.toString = $estr;
hxsl.TGlobal.Exp2.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Log2 = ["Log2",12];
hxsl.TGlobal.Log2.toString = $estr;
hxsl.TGlobal.Log2.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Sqrt = ["Sqrt",13];
hxsl.TGlobal.Sqrt.toString = $estr;
hxsl.TGlobal.Sqrt.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Inversesqrt = ["Inversesqrt",14];
hxsl.TGlobal.Inversesqrt.toString = $estr;
hxsl.TGlobal.Inversesqrt.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Abs = ["Abs",15];
hxsl.TGlobal.Abs.toString = $estr;
hxsl.TGlobal.Abs.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Sign = ["Sign",16];
hxsl.TGlobal.Sign.toString = $estr;
hxsl.TGlobal.Sign.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Floor = ["Floor",17];
hxsl.TGlobal.Floor.toString = $estr;
hxsl.TGlobal.Floor.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Ceil = ["Ceil",18];
hxsl.TGlobal.Ceil.toString = $estr;
hxsl.TGlobal.Ceil.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Fract = ["Fract",19];
hxsl.TGlobal.Fract.toString = $estr;
hxsl.TGlobal.Fract.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Mod = ["Mod",20];
hxsl.TGlobal.Mod.toString = $estr;
hxsl.TGlobal.Mod.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Min = ["Min",21];
hxsl.TGlobal.Min.toString = $estr;
hxsl.TGlobal.Min.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Max = ["Max",22];
hxsl.TGlobal.Max.toString = $estr;
hxsl.TGlobal.Max.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Clamp = ["Clamp",23];
hxsl.TGlobal.Clamp.toString = $estr;
hxsl.TGlobal.Clamp.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Mix = ["Mix",24];
hxsl.TGlobal.Mix.toString = $estr;
hxsl.TGlobal.Mix.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Step = ["Step",25];
hxsl.TGlobal.Step.toString = $estr;
hxsl.TGlobal.Step.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.SmoothStep = ["SmoothStep",26];
hxsl.TGlobal.SmoothStep.toString = $estr;
hxsl.TGlobal.SmoothStep.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Length = ["Length",27];
hxsl.TGlobal.Length.toString = $estr;
hxsl.TGlobal.Length.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Distance = ["Distance",28];
hxsl.TGlobal.Distance.toString = $estr;
hxsl.TGlobal.Distance.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Dot = ["Dot",29];
hxsl.TGlobal.Dot.toString = $estr;
hxsl.TGlobal.Dot.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Cross = ["Cross",30];
hxsl.TGlobal.Cross.toString = $estr;
hxsl.TGlobal.Cross.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Normalize = ["Normalize",31];
hxsl.TGlobal.Normalize.toString = $estr;
hxsl.TGlobal.Normalize.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.LReflect = ["LReflect",32];
hxsl.TGlobal.LReflect.toString = $estr;
hxsl.TGlobal.LReflect.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Texture2D = ["Texture2D",33];
hxsl.TGlobal.Texture2D.toString = $estr;
hxsl.TGlobal.Texture2D.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.TextureCube = ["TextureCube",34];
hxsl.TGlobal.TextureCube.toString = $estr;
hxsl.TGlobal.TextureCube.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.ToInt = ["ToInt",35];
hxsl.TGlobal.ToInt.toString = $estr;
hxsl.TGlobal.ToInt.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.ToFloat = ["ToFloat",36];
hxsl.TGlobal.ToFloat.toString = $estr;
hxsl.TGlobal.ToFloat.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.ToBool = ["ToBool",37];
hxsl.TGlobal.ToBool.toString = $estr;
hxsl.TGlobal.ToBool.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Vec2 = ["Vec2",38];
hxsl.TGlobal.Vec2.toString = $estr;
hxsl.TGlobal.Vec2.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Vec3 = ["Vec3",39];
hxsl.TGlobal.Vec3.toString = $estr;
hxsl.TGlobal.Vec3.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Vec4 = ["Vec4",40];
hxsl.TGlobal.Vec4.toString = $estr;
hxsl.TGlobal.Vec4.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.IVec2 = ["IVec2",41];
hxsl.TGlobal.IVec2.toString = $estr;
hxsl.TGlobal.IVec2.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.IVec3 = ["IVec3",42];
hxsl.TGlobal.IVec3.toString = $estr;
hxsl.TGlobal.IVec3.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.IVec4 = ["IVec4",43];
hxsl.TGlobal.IVec4.toString = $estr;
hxsl.TGlobal.IVec4.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.BVec2 = ["BVec2",44];
hxsl.TGlobal.BVec2.toString = $estr;
hxsl.TGlobal.BVec2.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.BVec3 = ["BVec3",45];
hxsl.TGlobal.BVec3.toString = $estr;
hxsl.TGlobal.BVec3.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.BVec4 = ["BVec4",46];
hxsl.TGlobal.BVec4.toString = $estr;
hxsl.TGlobal.BVec4.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Mat2 = ["Mat2",47];
hxsl.TGlobal.Mat2.toString = $estr;
hxsl.TGlobal.Mat2.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Mat3 = ["Mat3",48];
hxsl.TGlobal.Mat3.toString = $estr;
hxsl.TGlobal.Mat3.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Mat4 = ["Mat4",49];
hxsl.TGlobal.Mat4.toString = $estr;
hxsl.TGlobal.Mat4.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Mat3x4 = ["Mat3x4",50];
hxsl.TGlobal.Mat3x4.toString = $estr;
hxsl.TGlobal.Mat3x4.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Saturate = ["Saturate",51];
hxsl.TGlobal.Saturate.toString = $estr;
hxsl.TGlobal.Saturate.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Pack = ["Pack",52];
hxsl.TGlobal.Pack.toString = $estr;
hxsl.TGlobal.Pack.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Unpack = ["Unpack",53];
hxsl.TGlobal.Unpack.toString = $estr;
hxsl.TGlobal.Unpack.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.PackNormal = ["PackNormal",54];
hxsl.TGlobal.PackNormal.toString = $estr;
hxsl.TGlobal.PackNormal.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.UnpackNormal = ["UnpackNormal",55];
hxsl.TGlobal.UnpackNormal.toString = $estr;
hxsl.TGlobal.UnpackNormal.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.DFdx = ["DFdx",56];
hxsl.TGlobal.DFdx.toString = $estr;
hxsl.TGlobal.DFdx.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.DFdy = ["DFdy",57];
hxsl.TGlobal.DFdy.toString = $estr;
hxsl.TGlobal.DFdy.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.Fwidth = ["Fwidth",58];
hxsl.TGlobal.Fwidth.toString = $estr;
hxsl.TGlobal.Fwidth.__enum__ = hxsl.TGlobal;
hxsl.TGlobal.__empty_constructs__ = [hxsl.TGlobal.Radians,hxsl.TGlobal.Degrees,hxsl.TGlobal.Sin,hxsl.TGlobal.Cos,hxsl.TGlobal.Tan,hxsl.TGlobal.Asin,hxsl.TGlobal.Acos,hxsl.TGlobal.Atan,hxsl.TGlobal.Pow,hxsl.TGlobal.Exp,hxsl.TGlobal.Log,hxsl.TGlobal.Exp2,hxsl.TGlobal.Log2,hxsl.TGlobal.Sqrt,hxsl.TGlobal.Inversesqrt,hxsl.TGlobal.Abs,hxsl.TGlobal.Sign,hxsl.TGlobal.Floor,hxsl.TGlobal.Ceil,hxsl.TGlobal.Fract,hxsl.TGlobal.Mod,hxsl.TGlobal.Min,hxsl.TGlobal.Max,hxsl.TGlobal.Clamp,hxsl.TGlobal.Mix,hxsl.TGlobal.Step,hxsl.TGlobal.SmoothStep,hxsl.TGlobal.Length,hxsl.TGlobal.Distance,hxsl.TGlobal.Dot,hxsl.TGlobal.Cross,hxsl.TGlobal.Normalize,hxsl.TGlobal.LReflect,hxsl.TGlobal.Texture2D,hxsl.TGlobal.TextureCube,hxsl.TGlobal.ToInt,hxsl.TGlobal.ToFloat,hxsl.TGlobal.ToBool,hxsl.TGlobal.Vec2,hxsl.TGlobal.Vec3,hxsl.TGlobal.Vec4,hxsl.TGlobal.IVec2,hxsl.TGlobal.IVec3,hxsl.TGlobal.IVec4,hxsl.TGlobal.BVec2,hxsl.TGlobal.BVec3,hxsl.TGlobal.BVec4,hxsl.TGlobal.Mat2,hxsl.TGlobal.Mat3,hxsl.TGlobal.Mat4,hxsl.TGlobal.Mat3x4,hxsl.TGlobal.Saturate,hxsl.TGlobal.Pack,hxsl.TGlobal.Unpack,hxsl.TGlobal.PackNormal,hxsl.TGlobal.UnpackNormal,hxsl.TGlobal.DFdx,hxsl.TGlobal.DFdy,hxsl.TGlobal.Fwidth];
hxsl.Component = $hxClasses["hxsl.Component"] = { __ename__ : true, __constructs__ : ["X","Y","Z","W"] };
hxsl.Component.X = ["X",0];
hxsl.Component.X.toString = $estr;
hxsl.Component.X.__enum__ = hxsl.Component;
hxsl.Component.Y = ["Y",1];
hxsl.Component.Y.toString = $estr;
hxsl.Component.Y.__enum__ = hxsl.Component;
hxsl.Component.Z = ["Z",2];
hxsl.Component.Z.toString = $estr;
hxsl.Component.Z.__enum__ = hxsl.Component;
hxsl.Component.W = ["W",3];
hxsl.Component.W.toString = $estr;
hxsl.Component.W.__enum__ = hxsl.Component;
hxsl.Component.__empty_constructs__ = [hxsl.Component.X,hxsl.Component.Y,hxsl.Component.Z,hxsl.Component.W];
hxsl.TExprDef = $hxClasses["hxsl.TExprDef"] = { __ename__ : true, __constructs__ : ["TConst","TVar","TGlobal","TParenthesis","TBlock","TBinop","TUnop","TVarDecl","TCall","TSwiz","TIf","TDiscard","TReturn","TFor","TContinue","TBreak","TArray","TArrayDecl"] };
hxsl.TExprDef.TConst = function(c) { var $x = ["TConst",0,c]; $x.__enum__ = hxsl.TExprDef; $x.toString = $estr; return $x; };
hxsl.TExprDef.TVar = function(v) { var $x = ["TVar",1,v]; $x.__enum__ = hxsl.TExprDef; $x.toString = $estr; return $x; };
hxsl.TExprDef.TGlobal = function(g) { var $x = ["TGlobal",2,g]; $x.__enum__ = hxsl.TExprDef; $x.toString = $estr; return $x; };
hxsl.TExprDef.TParenthesis = function(e) { var $x = ["TParenthesis",3,e]; $x.__enum__ = hxsl.TExprDef; $x.toString = $estr; return $x; };
hxsl.TExprDef.TBlock = function(el) { var $x = ["TBlock",4,el]; $x.__enum__ = hxsl.TExprDef; $x.toString = $estr; return $x; };
hxsl.TExprDef.TBinop = function(op,e1,e2) { var $x = ["TBinop",5,op,e1,e2]; $x.__enum__ = hxsl.TExprDef; $x.toString = $estr; return $x; };
hxsl.TExprDef.TUnop = function(op,e1) { var $x = ["TUnop",6,op,e1]; $x.__enum__ = hxsl.TExprDef; $x.toString = $estr; return $x; };
hxsl.TExprDef.TVarDecl = function(v,init) { var $x = ["TVarDecl",7,v,init]; $x.__enum__ = hxsl.TExprDef; $x.toString = $estr; return $x; };
hxsl.TExprDef.TCall = function(e,args) { var $x = ["TCall",8,e,args]; $x.__enum__ = hxsl.TExprDef; $x.toString = $estr; return $x; };
hxsl.TExprDef.TSwiz = function(e,regs) { var $x = ["TSwiz",9,e,regs]; $x.__enum__ = hxsl.TExprDef; $x.toString = $estr; return $x; };
hxsl.TExprDef.TIf = function(econd,eif,eelse) { var $x = ["TIf",10,econd,eif,eelse]; $x.__enum__ = hxsl.TExprDef; $x.toString = $estr; return $x; };
hxsl.TExprDef.TDiscard = ["TDiscard",11];
hxsl.TExprDef.TDiscard.toString = $estr;
hxsl.TExprDef.TDiscard.__enum__ = hxsl.TExprDef;
hxsl.TExprDef.TReturn = function(e) { var $x = ["TReturn",12,e]; $x.__enum__ = hxsl.TExprDef; $x.toString = $estr; return $x; };
hxsl.TExprDef.TFor = function(v,it,loop) { var $x = ["TFor",13,v,it,loop]; $x.__enum__ = hxsl.TExprDef; $x.toString = $estr; return $x; };
hxsl.TExprDef.TContinue = ["TContinue",14];
hxsl.TExprDef.TContinue.toString = $estr;
hxsl.TExprDef.TContinue.__enum__ = hxsl.TExprDef;
hxsl.TExprDef.TBreak = ["TBreak",15];
hxsl.TExprDef.TBreak.toString = $estr;
hxsl.TExprDef.TBreak.__enum__ = hxsl.TExprDef;
hxsl.TExprDef.TArray = function(e,index) { var $x = ["TArray",16,e,index]; $x.__enum__ = hxsl.TExprDef; $x.toString = $estr; return $x; };
hxsl.TExprDef.TArrayDecl = function(el) { var $x = ["TArrayDecl",17,el]; $x.__enum__ = hxsl.TExprDef; $x.toString = $estr; return $x; };
hxsl.TExprDef.__empty_constructs__ = [hxsl.TExprDef.TDiscard,hxsl.TExprDef.TContinue,hxsl.TExprDef.TBreak];
hxsl.Tools = function() { };
$hxClasses["hxsl.Tools"] = hxsl.Tools;
hxsl.Tools.__name__ = ["hxsl","Tools"];
hxsl.Tools.allocVarId = function() {
	return ++hxsl.Tools.UID;
};
hxsl.Tools.getName = function(v) {
	if(v.qualifiers == null) return v.name;
	var _g = 0;
	var _g1 = v.qualifiers;
	while(_g < _g1.length) {
		var q = _g1[_g];
		++_g;
		switch(q[1]) {
		case 4:
			var n = q[2];
			return n;
		default:
		}
	}
	return v.name;
};
hxsl.Tools.getConstBits = function(v) {
	var _g = v.type;
	switch(_g[1]) {
	case 2:
		return 1;
	case 1:
		var _g1 = 0;
		var _g2 = v.qualifiers;
		while(_g1 < _g2.length) {
			var q = _g2[_g1];
			++_g1;
			switch(q[1]) {
			case 0:
				var n = q[2];
				if(n != null) {
					var bits = 0;
					while(n >= 1 << bits) bits++;
					return bits;
				}
				return 8;
			default:
			}
		}
		break;
	default:
	}
	return 0;
};
hxsl.Tools.isConst = function(v) {
	if(v.qualifiers != null) {
		var _g = 0;
		var _g1 = v.qualifiers;
		while(_g < _g1.length) {
			var q = _g1[_g];
			++_g;
			switch(q[1]) {
			case 0:
				return true;
			default:
			}
		}
	}
	return false;
};
hxsl.Tools.hasQualifier = function(v,q) {
	if(v.qualifiers != null) {
		var _g = 0;
		var _g1 = v.qualifiers;
		while(_g < _g1.length) {
			var q2 = _g1[_g];
			++_g;
			if(q2 == q) return true;
		}
	}
	return false;
};
hxsl.Tools.toString = function(t) {
	switch(t[1]) {
	case 5:
		var t1 = t[3];
		var size = t[2];
		var prefix;
		switch(t1[1]) {
		case 1:
			prefix = "";
			break;
		case 0:
			prefix = "I";
			break;
		case 2:
			prefix = "B";
			break;
		}
		return prefix + "Vec" + size;
	case 12:
		var vl = t[2];
		return "{" + ((function($this) {
			var $r;
			var _g = [];
			{
				var _g1 = 0;
				while(_g1 < vl.length) {
					var v = vl[_g1];
					++_g1;
					_g.push(v.name + " : " + hxsl.Tools.toString(v.type));
				}
			}
			$r = _g;
			return $r;
		}(this))).join(",") + "}";
	case 14:
		var s = t[3];
		var t2 = t[2];
		return hxsl.Tools.toString(t2) + "[" + (function($this) {
			var $r;
			switch(s[1]) {
			case 0:
				$r = (function($this) {
					var $r;
					var i = s[2];
					$r = "" + i;
					return $r;
				}($this));
				break;
			case 1:
				$r = (function($this) {
					var $r;
					var v1 = s[2];
					$r = v1.name;
					return $r;
				}($this));
				break;
			}
			return $r;
		}(this)) + "]";
	default:
		return HxOverrides.substr(t[0],1,null);
	}
};
hxsl.Tools.iter = function(e,f) {
	{
		var _g = e.e;
		switch(_g[1]) {
		case 3:
			var e1 = _g[2];
			f(e1);
			break;
		case 4:
			var el = _g[2];
			var _g1 = 0;
			while(_g1 < el.length) {
				var e2 = el[_g1];
				++_g1;
				f(e2);
			}
			break;
		case 5:
			var e21 = _g[4];
			var e11 = _g[3];
			f(e11);
			f(e21);
			break;
		case 6:
			var e12 = _g[3];
			f(e12);
			break;
		case 7:
			var init = _g[3];
			if(init != null) f(init);
			break;
		case 8:
			var args = _g[3];
			var e3 = _g[2];
			f(e3);
			var _g11 = 0;
			while(_g11 < args.length) {
				var a = args[_g11];
				++_g11;
				f(a);
			}
			break;
		case 9:
			var e4 = _g[2];
			f(e4);
			break;
		case 10:
			var eelse = _g[4];
			var eif = _g[3];
			var econd = _g[2];
			f(econd);
			f(eif);
			if(eelse != null) f(eelse);
			break;
		case 12:
			var e5 = _g[2];
			if(e5 != null) f(e5);
			break;
		case 13:
			var loop = _g[4];
			var it = _g[3];
			f(it);
			f(loop);
			break;
		case 16:
			var index = _g[3];
			var e6 = _g[2];
			f(e6);
			f(index);
			break;
		case 17:
			var el1 = _g[2];
			var _g12 = 0;
			while(_g12 < el1.length) {
				var e7 = el1[_g12];
				++_g12;
				f(e7);
			}
			break;
		case 0:case 1:case 2:case 11:case 14:case 15:
			break;
		}
	}
};
hxsl.Tools.map = function(e,f) {
	var ed;
	{
		var _g = e.e;
		switch(_g[1]) {
		case 3:
			var e1 = _g[2];
			ed = hxsl.TExprDef.TParenthesis(f(e1));
			break;
		case 4:
			var el = _g[2];
			ed = hxsl.TExprDef.TBlock((function($this) {
				var $r;
				var _g1 = [];
				{
					var _g2 = 0;
					while(_g2 < el.length) {
						var e2 = el[_g2];
						++_g2;
						_g1.push(f(e2));
					}
				}
				$r = _g1;
				return $r;
			}(this)));
			break;
		case 5:
			var e21 = _g[4];
			var e11 = _g[3];
			var op = _g[2];
			ed = hxsl.TExprDef.TBinop(op,f(e11),f(e21));
			break;
		case 6:
			var e12 = _g[3];
			var op1 = _g[2];
			ed = hxsl.TExprDef.TUnop(op1,f(e12));
			break;
		case 7:
			var init = _g[3];
			var v = _g[2];
			ed = hxsl.TExprDef.TVarDecl(v,init != null?f(init):null);
			break;
		case 8:
			var args = _g[3];
			var e3 = _g[2];
			ed = hxsl.TExprDef.TCall(f(e3),(function($this) {
				var $r;
				var _g11 = [];
				{
					var _g21 = 0;
					while(_g21 < args.length) {
						var a = args[_g21];
						++_g21;
						_g11.push(f(a));
					}
				}
				$r = _g11;
				return $r;
			}(this)));
			break;
		case 9:
			var c = _g[3];
			var e4 = _g[2];
			ed = hxsl.TExprDef.TSwiz(f(e4),c);
			break;
		case 10:
			var eelse = _g[4];
			var eif = _g[3];
			var econd = _g[2];
			ed = hxsl.TExprDef.TIf(f(econd),f(eif),eelse != null?f(eelse):null);
			break;
		case 12:
			var e5 = _g[2];
			ed = hxsl.TExprDef.TReturn(e5 != null?f(e5):null);
			break;
		case 13:
			var loop = _g[4];
			var it = _g[3];
			var v1 = _g[2];
			ed = hxsl.TExprDef.TFor(v1,f(it),f(loop));
			break;
		case 16:
			var index = _g[3];
			var e6 = _g[2];
			ed = hxsl.TExprDef.TArray(f(e6),f(index));
			break;
		case 17:
			var el1 = _g[2];
			ed = hxsl.TExprDef.TArrayDecl((function($this) {
				var $r;
				var _g12 = [];
				{
					var _g22 = 0;
					while(_g22 < el1.length) {
						var e7 = el1[_g22];
						++_g22;
						_g12.push(f(e7));
					}
				}
				$r = _g12;
				return $r;
			}(this)));
			break;
		case 0:case 1:case 2:case 11:case 14:case 15:
			ed = e.e;
			break;
		}
	}
	return { e : ed, t : e.t, p : e.p};
};
hxsl.Tools2 = function() { };
$hxClasses["hxsl.Tools2"] = hxsl.Tools2;
hxsl.Tools2.__name__ = ["hxsl","Tools2"];
hxsl.Tools2.toString = function(g) {
	var n = g[0];
	return n.charAt(0).toLowerCase() + HxOverrides.substr(n,1,null);
};
hxsl.SearchMap = function() {
};
$hxClasses["hxsl.SearchMap"] = hxsl.SearchMap;
hxsl.SearchMap.__name__ = ["hxsl","SearchMap"];
hxsl.SearchMap.prototype = {
	__class__: hxsl.SearchMap
};
hxsl.Cache = function() {
	this.constsToGlobal = false;
	this.linkCache = new haxe.ds.IntMap();
	this.outVarsMap = new haxe.ds.StringMap();
	this.outVars = [];
	this.byID = new haxe.ds.StringMap();
};
$hxClasses["hxsl.Cache"] = hxsl.Cache;
hxsl.Cache.__name__ = ["hxsl","Cache"];
hxsl.Cache.get = function() {
	var c = hxsl.Cache.INST;
	if(c == null) hxsl.Cache.INST = c = new hxsl.Cache();
	return c;
};
hxsl.Cache.prototype = {
	allocOutputVars: function(vars) {
		var key = vars.join(",");
		var id = this.outVarsMap.get(key);
		if(id != null) return id;
		vars = vars.slice();
		vars.sort(Reflect.compare);
		var key1 = vars.join(",");
		id = this.outVarsMap.get(key1);
		if(id != null) {
			this.outVarsMap.set(key,id);
			return id;
		}
		id = this.outVars.length;
		this.outVars.push(vars);
		this.outVarsMap.set(key,id);
		return id;
	}
	,link: function(shaders,outVars) {
		var c = this.linkCache.get(outVars);
		if(c == null) {
			c = new hxsl.SearchMap();
			this.linkCache.set(outVars,c);
		}
		var _g = new hxsl._ShaderList.ShaderIterator(shaders);
		while(_g.l != null) {
			var s = _g.next();
			var i = s.instance;
			if(c.next == null) c.next = new haxe.ds.IntMap();
			var cs = c.next.get(i.id);
			if(cs == null) {
				cs = new hxsl.SearchMap();
				c.next.set(i.id,cs);
			}
			c = cs;
		}
		if(c.linked == null) c.linked = this.compileRuntimeShader(shaders,outVars);
		return c.linked;
	}
	,compileRuntimeShader: function(shaders,outVars) {
		var shaderDatas = [];
		var index = 0;
		var _g = new hxsl._ShaderList.ShaderIterator(shaders);
		while(_g.l != null) {
			var s = _g.next();
			var i = s.instance;
			shaderDatas.push({ inst : i, p : s.priority, index : index++});
		}
		shaderDatas.reverse();
		haxe.ds.ArraySort.sort(shaderDatas,function(s1,s2) {
			return s2.p - s1.p;
		});
		var linker = new hxsl.Linker();
		var s3 = linker.link((function($this) {
			var $r;
			var _g1 = [];
			{
				var _g11 = 0;
				while(_g11 < shaderDatas.length) {
					var s4 = shaderDatas[_g11];
					++_g11;
					_g1.push(s4.inst.shader);
				}
			}
			$r = _g1;
			return $r;
		}(this)),this.outVars[outVars]);
		var paramVars = new haxe.ds.IntMap();
		var _g12 = 0;
		var _g2 = linker.allVars;
		while(_g12 < _g2.length) {
			var v = _g2[_g12];
			++_g12;
			if(v.v.kind == hxsl.VarKind.Param) {
				{
					var _g3 = v.v.type;
					switch(_g3[1]) {
					case 12:
						continue;
						break;
					default:
					}
				}
				var inf = shaderDatas[v.instanceIndex];
				var value = { instance : inf.index, index : inf.inst.params.get(v.merged[0].id)};
				paramVars.set(v.id,value);
			}
		}
		var s5 = new hxsl.Splitter().split(s3);
		var s6 = new hxsl.Dce().dce(s5.vertex,s5.fragment);
		var r = new hxsl.RuntimeShader();
		r.vertex = this.flattenShader(s6.vertex,hxsl.FunctionKind.Vertex,paramVars);
		r.vertex.vertex = true;
		r.fragment = this.flattenShader(s6.fragment,hxsl.FunctionKind.Fragment,paramVars);
		r.globals = new haxe.ds.IntMap();
		var p = r.vertex.globals;
		while(p != null) {
			r.globals.set(p.gid,true);
			p = p.next;
		}
		p = r.fragment.globals;
		while(p != null) {
			r.globals.set(p.gid,true);
			p = p.next;
		}
		var sid = haxe.crypto.Md5.encode(hxsl.Printer.shaderToString(r.vertex.data) + hxsl.Printer.shaderToString(r.fragment.data));
		var r2 = this.byID.get(sid);
		if(r2 != null) r.id = r2.id; else this.byID.set(sid,r);
		return r;
	}
	,getPath: function(v) {
		if(v.parent == null) return v.name;
		return this.getPath(v.parent) + "." + v.name;
	}
	,flattenShader: function(s,kind,params) {
		var flat = new hxsl.Flatten();
		var c = new hxsl.RuntimeShaderData();
		var data = flat.flatten(s,kind,this.constsToGlobal);
		c.consts = flat.consts;
		var $it0 = flat.allocData.keys();
		while( $it0.hasNext() ) {
			var g = $it0.next();
			var alloc = flat.allocData.h[g.__id__];
			var _g = g.kind;
			switch(_g[1]) {
			case 2:
				var out = [];
				var _g1 = 0;
				while(_g1 < alloc.length) {
					var a = alloc[_g1];
					++_g1;
					if(a.v == null) continue;
					var p = params.get(a.v.id);
					if(p == null) {
						var ap = new hxsl.AllocParam(a.v.name,a.pos,-1,-1,a.v.type);
						ap.perObjectGlobal = new hxsl.AllocGlobal(-1,this.getPath(a.v),a.v.type);
						out.push(ap);
						continue;
					}
					out.push(new hxsl.AllocParam(a.v.name,a.pos,p.instance,p.index,a.v.type));
				}
				var _g2 = 0;
				var _g11 = out.length - 1;
				while(_g2 < _g11) {
					var i = _g2++;
					out[i].next = out[i + 1];
				}
				{
					var _g12 = g.type;
					switch(_g12[1]) {
					case 14:
						switch(_g12[2][1]) {
						case 10:
							c.textures2D = out[0];
							c.textures2DCount = out.length;
							break;
						case 11:
							c.texturesCube = out[0];
							c.texturesCubeCount = out.length;
							break;
						case 5:
							switch(_g12[2][2]) {
							case 4:
								switch(_g12[2][3][1]) {
								case 1:
									switch(_g12[3][1]) {
									case 0:
										var size = _g12[3][2];
										c.params = out[0];
										c.paramsSize = size;
										break;
									default:
										throw "assert";
									}
									break;
								default:
									throw "assert";
								}
								break;
							default:
								throw "assert";
							}
							break;
						default:
							throw "assert";
						}
						break;
					default:
						throw "assert";
					}
				}
				break;
			case 0:
				var out1;
				var _g13 = [];
				var _g21 = 0;
				while(_g21 < alloc.length) {
					var a1 = alloc[_g21];
					++_g21;
					if(a1.v != null) _g13.push(new hxsl.AllocGlobal(a1.pos,this.getPath(a1.v),a1.v.type));
				}
				out1 = _g13;
				var _g3 = 0;
				var _g22 = out1.length - 1;
				while(_g3 < _g22) {
					var i1 = _g3++;
					out1[i1].next = out1[i1 + 1];
				}
				{
					var _g23 = g.type;
					switch(_g23[1]) {
					case 14:
						switch(_g23[2][1]) {
						case 5:
							switch(_g23[2][2]) {
							case 4:
								switch(_g23[2][3][1]) {
								case 1:
									switch(_g23[3][1]) {
									case 0:
										var size1 = _g23[3][2];
										c.globals = out1[0];
										c.globalsSize = size1;
										break;
									default:
										throw "assert";
									}
									break;
								default:
									throw "assert";
								}
								break;
							default:
								throw "assert";
							}
							break;
						default:
							throw "assert";
						}
						break;
					default:
						throw "assert";
					}
				}
				break;
			default:
				throw "assert";
			}
		}
		if(c.globals == null) c.globalsSize = 0;
		if(c.params == null) c.paramsSize = 0;
		if(c.textures2D == null) c.textures2DCount = 0;
		if(c.texturesCube == null) c.texturesCubeCount = 0;
		c.data = data;
		return c;
	}
	,__class__: hxsl.Cache
};
hxsl.Clone = function() {
	this.varMap = new haxe.ds.IntMap();
};
$hxClasses["hxsl.Clone"] = hxsl.Clone;
hxsl.Clone.__name__ = ["hxsl","Clone"];
hxsl.Clone.shaderData = function(s) {
	return new hxsl.Clone().shader(s);
};
hxsl.Clone.prototype = {
	tvar: function(v) {
		var v2 = this.varMap.get(v.id);
		if(v2 != null) return v2;
		v2 = { id : hxsl.Tools.allocVarId(), type : v.type, name : v.name, kind : v.kind};
		this.varMap.set(v.id,v2);
		if(v.parent != null) v2.parent = this.tvar(v.parent);
		if(v.qualifiers != null) v2.qualifiers = v.qualifiers.slice();
		v2.type = this.ttype(v.type);
		return v2;
	}
	,tfun: function(f) {
		return { ret : this.ttype(f.ret), kind : f.kind, ref : this.tvar(f.ref), args : (function($this) {
			var $r;
			var _g = [];
			{
				var _g1 = 0;
				var _g2 = f.args;
				while(_g1 < _g2.length) {
					var a = _g2[_g1];
					++_g1;
					_g.push($this.tvar(a));
				}
			}
			$r = _g;
			return $r;
		}(this)), expr : this.texpr(f.expr)};
	}
	,ttype: function(t) {
		switch(t[1]) {
		case 12:
			var vl = t[2];
			return hxsl.Type.TStruct((function($this) {
				var $r;
				var _g = [];
				{
					var _g1 = 0;
					while(_g1 < vl.length) {
						var v = vl[_g1];
						++_g1;
						_g.push($this.tvar(v));
					}
				}
				$r = _g;
				return $r;
			}(this)));
		case 14:
			var size = t[3];
			var t1 = t[2];
			return hxsl.Type.TArray(this.ttype(t1),(function($this) {
				var $r;
				switch(size[1]) {
				case 0:
					$r = size;
					break;
				case 1:
					$r = (function($this) {
						var $r;
						var v1 = size[2];
						$r = hxsl.SizeDecl.SVar($this.tvar(v1));
						return $r;
					}($this));
					break;
				}
				return $r;
			}(this)));
		case 13:
			var vars = t[2];
			return hxsl.Type.TFun((function($this) {
				var $r;
				var _g2 = [];
				{
					var _g11 = 0;
					while(_g11 < vars.length) {
						var v2 = vars[_g11];
						++_g11;
						_g2.push({ args : (function($this) {
							var $r;
							var _g21 = [];
							{
								var _g3 = 0;
								var _g4 = v2.args;
								while(_g3 < _g4.length) {
									var a = _g4[_g3];
									++_g3;
									_g21.push({ name : a.name, type : $this.ttype(a.type)});
								}
							}
							$r = _g21;
							return $r;
						}($this)), ret : $this.ttype(v2.ret)});
					}
				}
				$r = _g2;
				return $r;
			}(this)));
		default:
			return t;
		}
	}
	,texpr: function(e) {
		var e2 = hxsl.Tools.map(e,$bind(this,this.texpr));
		e2.t = this.ttype(e.t);
		{
			var _g = e2.e;
			switch(_g[1]) {
			case 1:
				var v = _g[2];
				e2.e = hxsl.TExprDef.TVar(this.tvar(v));
				break;
			case 7:
				var init = _g[3];
				var v1 = _g[2];
				e2.e = hxsl.TExprDef.TVarDecl(this.tvar(v1),init);
				break;
			case 13:
				var loop = _g[4];
				var it = _g[3];
				var v2 = _g[2];
				e2.e = hxsl.TExprDef.TFor(this.tvar(v2),it,loop);
				break;
			default:
				e2.e = e2.e;
			}
		}
		return e2;
	}
	,shader: function(s) {
		return { name : s.name, vars : (function($this) {
			var $r;
			var _g = [];
			{
				var _g1 = 0;
				var _g2 = s.vars;
				while(_g1 < _g2.length) {
					var v = _g2[_g1];
					++_g1;
					_g.push($this.tvar(v));
				}
			}
			$r = _g;
			return $r;
		}(this)), funs : (function($this) {
			var $r;
			var _g11 = [];
			{
				var _g21 = 0;
				var _g3 = s.funs;
				while(_g21 < _g3.length) {
					var f = _g3[_g21];
					++_g21;
					_g11.push($this.tfun(f));
				}
			}
			$r = _g11;
			return $r;
		}(this))};
	}
	,__class__: hxsl.Clone
};
hxsl._Dce = {};
hxsl._Dce.Exit = function() {
};
$hxClasses["hxsl._Dce.Exit"] = hxsl._Dce.Exit;
hxsl._Dce.Exit.__name__ = ["hxsl","_Dce","Exit"];
hxsl._Dce.Exit.prototype = {
	__class__: hxsl._Dce.Exit
};
hxsl._Dce.VarDeps = function(v) {
	this.v = v;
	this.used = true;
	this.deps = new haxe.ds.IntMap();
};
$hxClasses["hxsl._Dce.VarDeps"] = hxsl._Dce.VarDeps;
hxsl._Dce.VarDeps.__name__ = ["hxsl","_Dce","VarDeps"];
hxsl._Dce.VarDeps.prototype = {
	__class__: hxsl._Dce.VarDeps
};
hxsl.Dce = function() {
};
$hxClasses["hxsl.Dce"] = hxsl.Dce;
hxsl.Dce.__name__ = ["hxsl","Dce"];
hxsl.Dce.prototype = {
	dce: function(vertex,fragment) {
		this.used = new haxe.ds.IntMap();
		var inputs = [];
		var _g = 0;
		var _g1 = vertex.vars;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			this.get(v);
			if(v.kind == hxsl.VarKind.Input) inputs.unshift(v);
		}
		var _g2 = 0;
		var _g11 = fragment.vars;
		while(_g2 < _g11.length) {
			var v1 = _g11[_g2];
			++_g2;
			this.get(v1);
		}
		var _g3 = 0;
		var _g12 = vertex.funs;
		while(_g3 < _g12.length) {
			var f = _g12[_g3];
			++_g3;
			this.check(f.expr,[]);
		}
		var _g4 = 0;
		var _g13 = fragment.funs;
		while(_g4 < _g13.length) {
			var f1 = _g13[_g4];
			++_g4;
			this.check(f1.expr,[]);
		}
		var changed = true;
		while(changed) {
			changed = false;
			var $it0 = this.used.iterator();
			while( $it0.hasNext() ) {
				var v2 = $it0.next();
				if(!v2.used || v2.v.kind == hxsl.VarKind.Output || v2.v.kind == hxsl.VarKind.Input && v2.v != inputs[0] || v2.keep) continue;
				var used = false;
				var $it1 = v2.deps.iterator();
				while( $it1.hasNext() ) {
					var d = $it1.next();
					if(d != v2 && d.used) {
						used = true;
						break;
					}
				}
				if(!used) {
					v2.used = false;
					changed = true;
					HxOverrides.remove(vertex.vars,v2.v);
					HxOverrides.remove(fragment.vars,v2.v);
					if(v2.v == inputs[0]) inputs.shift();
				}
			}
		}
		var _g5 = 0;
		var _g14 = vertex.funs;
		while(_g5 < _g14.length) {
			var f2 = _g14[_g5];
			++_g5;
			f2.expr = this.mapExpr(f2.expr);
		}
		var _g6 = 0;
		var _g15 = fragment.funs;
		while(_g6 < _g15.length) {
			var f3 = _g15[_g6];
			++_g6;
			f3.expr = this.mapExpr(f3.expr);
		}
		return { fragment : fragment, vertex : vertex};
	}
	,get: function(v) {
		var vd = this.used.get(v.id);
		if(vd == null) {
			vd = new hxsl._Dce.VarDeps(v);
			this.used.set(v.id,vd);
		}
		return vd;
	}
	,link: function(v,writeTo) {
		var vd = this.get(v);
		var _g = 0;
		while(_g < writeTo.length) {
			var w = writeTo[_g];
			++_g;
			if(w == null) {
				vd.keep = true;
				continue;
			}
			vd.deps.set(w.v.id,w);
		}
	}
	,hasDiscardRec: function(e) {
		var _g = e.e;
		switch(_g[1]) {
		case 11:
			throw new hxsl._Dce.Exit();
			break;
		default:
			hxsl.Tools.iter(e,$bind(this,this.hasDiscardRec));
		}
	}
	,hasDiscard: function(e) {
		try {
			this.hasDiscardRec(e);
			return false;
		} catch( e1 ) {
			if( js.Boot.__instanceof(e1,hxsl._Dce.Exit) ) {
				return true;
			} else throw(e1);
		}
	}
	,check: function(e,writeTo) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 1:
				var v = _g[2];
				this.link(v,writeTo);
				break;
			case 5:
				switch(_g[2][1]) {
				case 4:
					switch(_g[3].e[1]) {
					case 1:
						var e1 = _g[4];
						var v1 = _g[3].e[2];
						writeTo.push(this.get(v1));
						this.check(e1,writeTo);
						writeTo.pop();
						break;
					case 9:
						switch(_g[3].e[2].e[1]) {
						case 1:
							var e1 = _g[4];
							var v1 = _g[3].e[2].e[2];
							writeTo.push(this.get(v1));
							this.check(e1,writeTo);
							writeTo.pop();
							break;
						default:
							hxsl.Tools.iter(e,(function(f,a1) {
								return function(e2) {
									return f(e2,a1);
								};
							})($bind(this,this.check),writeTo));
						}
						break;
					default:
						hxsl.Tools.iter(e,(function(f,a1) {
							return function(e2) {
								return f(e2,a1);
							};
						})($bind(this,this.check),writeTo));
					}
					break;
				case 20:
					switch(_g[3].e[1]) {
					case 1:
						var e1 = _g[4];
						var v1 = _g[3].e[2];
						writeTo.push(this.get(v1));
						this.check(e1,writeTo);
						writeTo.pop();
						break;
					case 9:
						switch(_g[3].e[2].e[1]) {
						case 1:
							var e1 = _g[4];
							var v1 = _g[3].e[2].e[2];
							writeTo.push(this.get(v1));
							this.check(e1,writeTo);
							writeTo.pop();
							break;
						default:
							hxsl.Tools.iter(e,(function(f,a1) {
								return function(e2) {
									return f(e2,a1);
								};
							})($bind(this,this.check),writeTo));
						}
						break;
					default:
						hxsl.Tools.iter(e,(function(f,a1) {
							return function(e2) {
								return f(e2,a1);
							};
						})($bind(this,this.check),writeTo));
					}
					break;
				default:
					hxsl.Tools.iter(e,(function(f,a1) {
						return function(e2) {
							return f(e2,a1);
						};
					})($bind(this,this.check),writeTo));
				}
				break;
			case 7:
				var init = _g[3];
				var v2 = _g[2];
				if(init != null) {
					writeTo.push(this.get(v2));
					this.check(init,writeTo);
					writeTo.pop();
				} else hxsl.Tools.iter(e,(function(f,a1) {
					return function(e2) {
						return f(e2,a1);
					};
				})($bind(this,this.check),writeTo));
				break;
			case 10:
				var eelse = _g[4];
				var eif = _g[3];
				var e3 = _g[2];
				if(this.hasDiscard(eif) || eelse != null && this.hasDiscard(eelse)) {
					writeTo.push(null);
					this.check(e3,writeTo);
					writeTo.pop();
					this.check(eif,writeTo);
					if(eelse != null) this.check(eelse,writeTo);
				} else hxsl.Tools.iter(e,(function(f,a1) {
					return function(e2) {
						return f(e2,a1);
					};
				})($bind(this,this.check),writeTo));
				break;
			default:
				hxsl.Tools.iter(e,(function(f,a1) {
					return function(e2) {
						return f(e2,a1);
					};
				})($bind(this,this.check),writeTo));
			}
		}
	}
	,mapExpr: function(e) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 4:
				var el = _g[2];
				var out = [];
				var count = 0;
				var _g1 = 0;
				while(_g1 < el.length) {
					var e1 = el[_g1];
					++_g1;
					var e2 = this.mapExpr(e1);
					{
						var _g2 = e2.e;
						switch(_g2[1]) {
						case 0:
							if(count < el.length) {
							} else out.push(e2);
							break;
						default:
							out.push(e2);
						}
					}
					count++;
				}
				return { e : hxsl.TExprDef.TBlock(out), p : e.p, t : e.t};
			case 7:
				var v = _g[2];
				if(!this.get(v).used) return { e : hxsl.TExprDef.TConst(hxsl.Const.CNull), t : e.t, p : e.p}; else return hxsl.Tools.map(e,$bind(this,this.mapExpr));
				break;
			case 5:
				switch(_g[2][1]) {
				case 4:
					switch(_g[3].e[1]) {
					case 1:
						var v = _g[3].e[2];
						if(!this.get(v).used) return { e : hxsl.TExprDef.TConst(hxsl.Const.CNull), t : e.t, p : e.p}; else return hxsl.Tools.map(e,$bind(this,this.mapExpr));
						break;
					case 9:
						switch(_g[3].e[2].e[1]) {
						case 1:
							var v = _g[3].e[2].e[2];
							if(!this.get(v).used) return { e : hxsl.TExprDef.TConst(hxsl.Const.CNull), t : e.t, p : e.p}; else return hxsl.Tools.map(e,$bind(this,this.mapExpr));
							break;
						default:
							return hxsl.Tools.map(e,$bind(this,this.mapExpr));
						}
						break;
					default:
						return hxsl.Tools.map(e,$bind(this,this.mapExpr));
					}
					break;
				case 20:
					switch(_g[3].e[1]) {
					case 1:
						var v = _g[3].e[2];
						if(!this.get(v).used) return { e : hxsl.TExprDef.TConst(hxsl.Const.CNull), t : e.t, p : e.p}; else return hxsl.Tools.map(e,$bind(this,this.mapExpr));
						break;
					case 9:
						switch(_g[3].e[2].e[1]) {
						case 1:
							var v = _g[3].e[2].e[2];
							if(!this.get(v).used) return { e : hxsl.TExprDef.TConst(hxsl.Const.CNull), t : e.t, p : e.p}; else return hxsl.Tools.map(e,$bind(this,this.mapExpr));
							break;
						default:
							return hxsl.Tools.map(e,$bind(this,this.mapExpr));
						}
						break;
					default:
						return hxsl.Tools.map(e,$bind(this,this.mapExpr));
					}
					break;
				default:
					return hxsl.Tools.map(e,$bind(this,this.mapExpr));
				}
				break;
			default:
				return hxsl.Tools.map(e,$bind(this,this.mapExpr));
			}
		}
	}
	,__class__: hxsl.Dce
};
hxsl.Eval = function() {
	this.varMap = new haxe.ds.ObjectMap();
	this.funMap = new haxe.ds.ObjectMap();
	this.constants = new haxe.ds.ObjectMap();
};
$hxClasses["hxsl.Eval"] = hxsl.Eval;
hxsl.Eval.__name__ = ["hxsl","Eval"];
hxsl.Eval.prototype = {
	setConstant: function(v,c) {
		var value = hxsl.TExprDef.TConst(c);
		this.constants.set(v,value);
	}
	,mapVar: function(v) {
		var v2 = this.varMap.h[v.__id__];
		if(v2 != null) if(v == v2) return v2; else return this.mapVar(v2);
		v2 = { id : hxsl.Tools.allocVarId(), name : v.name, type : v.type, kind : v.kind};
		if(v.parent != null) v2.parent = this.mapVar(v.parent);
		if(v.qualifiers != null) v2.qualifiers = v.qualifiers.slice();
		this.varMap.set(v,v2);
		this.varMap.set(v2,v2);
		{
			var _g = v2.type;
			switch(_g[1]) {
			case 12:
				var vl = _g[2];
				v2.type = hxsl.Type.TStruct((function($this) {
					var $r;
					var _g1 = [];
					{
						var _g2 = 0;
						while(_g2 < vl.length) {
							var v1 = vl[_g2];
							++_g2;
							_g1.push($this.mapVar(v1));
						}
					}
					$r = _g1;
					return $r;
				}(this)));
				break;
			case 14:
				switch(_g[3][1]) {
				case 1:
					var t = _g[2];
					var vs = _g[3][2];
					var c = this.constants.h[vs.__id__];
					if(c != null) switch(c[1]) {
					case 0:
						switch(c[2][1]) {
						case 2:
							var v3 = c[2][2];
							v2.type = hxsl.Type.TArray(t,hxsl.SizeDecl.SConst(v3));
							break;
						default:
							hxsl.Error.t("Integer value expected for array size constant " + vs.name,null);
						}
						break;
					default:
						hxsl.Error.t("Integer value expected for array size constant " + vs.name,null);
					} else {
						var vs2 = this.mapVar(vs);
						v2.type = hxsl.Type.TArray(t,hxsl.SizeDecl.SVar(vs2));
					}
					break;
				default:
				}
				break;
			default:
			}
		}
		return v2;
	}
	,'eval': function(s) {
		var funs = [];
		var _g = 0;
		var _g1 = s.funs;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			var f2 = { kind : f.kind, ref : this.mapVar(f.ref), args : (function($this) {
				var $r;
				var _g2 = [];
				{
					var _g3 = 0;
					var _g4 = f.args;
					while(_g3 < _g4.length) {
						var a = _g4[_g3];
						++_g3;
						_g2.push($this.mapVar(a));
					}
				}
				$r = _g2;
				return $r;
			}(this)), ret : f.ret, expr : f.expr};
			if(f.kind != hxsl.FunctionKind.Helper) funs.push(f2);
			this.funMap.set(f2.ref,f);
		}
		var _g11 = 0;
		var _g5 = funs.length;
		while(_g11 < _g5) {
			var i = _g11++;
			funs[i].expr = this.evalExpr(funs[i].expr);
		}
		return { name : s.name, vars : (function($this) {
			var $r;
			var _g6 = [];
			{
				var _g12 = 0;
				var _g21 = s.vars;
				while(_g12 < _g21.length) {
					var v = _g21[_g12];
					++_g12;
					_g6.push($this.mapVar(v));
				}
			}
			$r = _g6;
			return $r;
		}(this)), funs : funs};
	}
	,hasReturn: function(e) {
		this.markReturn = false;
		this.hasReturnLoop(e);
		return this.markReturn;
	}
	,hasReturnLoop: function(e) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 12:
				this.markReturn = true;
				break;
			default:
				if(!this.markReturn) hxsl.Tools.iter(e,$bind(this,this.hasReturnLoop));
			}
		}
	}
	,handleReturn: function(e,$final) {
		if($final == null) $final = false;
		{
			var _g = e.e;
			switch(_g[1]) {
			case 12:
				var v = _g[2];
				if(!$final) hxsl.Error.t("Cannot inline not final return",e.p);
				if(v == null) return { e : hxsl.TExprDef.TBlock([]), t : hxsl.Type.TVoid, p : e.p};
				return this.handleReturn(v,true);
			case 4:
				var el = _g[2];
				var i = 0;
				var last = el.length;
				var out = [];
				try {
					while(i < last) {
						var e1 = el[i++];
						if(i == last) out.push(this.handleReturn(e1,$final)); else {
							var _g1 = e1.e;
							switch(_g1[1]) {
							case 10:
								if(_g1[4] == null) {
									var econd = _g1[2];
									var eif = _g1[3];
									if($final && this.hasReturn(eif)) {
										out.push(this.handleReturn({ e : hxsl.TExprDef.TIf(econd,eif,{ e : hxsl.TExprDef.TBlock(el.slice(i)), t : e1.t, p : e1.p}), t : e1.t, p : e1.p}));
										throw "__break__";
									} else out.push(this.handleReturn(e1));
								} else switch(_g1[4]) {
								default:
									out.push(this.handleReturn(e1));
								}
								break;
							default:
								out.push(this.handleReturn(e1));
							}
						}
					}
				} catch( e ) { if( e != "__break__" ) throw e; }
				var t;
				if($final) t = out[out.length - 1].t; else t = e.t;
				return { e : hxsl.TExprDef.TBlock(out), t : t, p : e.p};
			case 3:
				var v1 = _g[2];
				var v2 = this.handleReturn(v1,$final);
				return { e : hxsl.TExprDef.TParenthesis(v2), t : v2.t, p : e.p};
			case 10:
				var eelse = _g[4];
				var eif1 = _g[3];
				var cond = _g[2];
				if(eelse != null && $final) {
					var cond1 = this.handleReturn(cond);
					var eif2 = this.handleReturn(eif1,$final);
					return { e : hxsl.TExprDef.TIf(cond1,eif2,this.handleReturn(eelse,$final)), t : eif2.t, p : e.p};
				} else return hxsl.Tools.map(e,$bind(this,this.handleReturnDef));
				break;
			default:
				return hxsl.Tools.map(e,$bind(this,this.handleReturnDef));
			}
		}
	}
	,handleReturnDef: function(e) {
		return this.handleReturn(e);
	}
	,evalCall: function(g,args) {
		switch(g[1]) {
		case 36:
			switch(args.length) {
			case 1:
				switch(args[0].e[1]) {
				case 0:
					switch(args[0].e[2][1]) {
					case 2:
						var i = args[0].e[2][2];
						return hxsl.TExprDef.TConst(hxsl.Const.CFloat(i));
					default:
						return null;
					}
					break;
				default:
					return null;
				}
				break;
			default:
				return null;
			}
			break;
		default:
			return null;
		}
	}
	,evalExpr: function(e) {
		var _g6 = this;
		var d;
		{
			var _g = e.e;
			switch(_g[1]) {
			case 2:case 0:
				d = e.e;
				break;
			case 1:
				var v = _g[2];
				var c = this.constants.h[v.__id__];
				if(c != null) d = c; else {
					var v2 = this.mapVar(v);
					d = hxsl.TExprDef.TVar(v2);
				}
				break;
			case 7:
				var init = _g[3];
				var v1 = _g[2];
				d = hxsl.TExprDef.TVarDecl(this.mapVar(v1),init == null?null:this.evalExpr(init));
				break;
			case 16:
				var e2 = _g[3];
				var e1 = _g[2];
				var e11 = this.evalExpr(e1);
				var e21 = this.evalExpr(e2);
				{
					var _g1 = e11.e;
					var _g2 = e21.e;
					switch(_g1[1]) {
					case 17:
						switch(_g2[1]) {
						case 0:
							switch(_g2[2][1]) {
							case 2:
								var el = _g1[2];
								var i = _g2[2][2];
								if(i >= 0 && i < el.length) d = el[i].e; else d = hxsl.TExprDef.TArray(e11,e21);
								break;
							default:
								d = hxsl.TExprDef.TArray(e11,e21);
							}
							break;
						default:
							d = hxsl.TExprDef.TArray(e11,e21);
						}
						break;
					default:
						d = hxsl.TExprDef.TArray(e11,e21);
					}
				}
				break;
			case 9:
				var r = _g[3];
				var e3 = _g[2];
				d = hxsl.TExprDef.TSwiz(this.evalExpr(e3),r.slice());
				break;
			case 12:
				var e4 = _g[2];
				d = hxsl.TExprDef.TReturn(e4 == null?null:this.evalExpr(e4));
				break;
			case 8:
				var args = _g[3];
				var c1 = _g[2];
				var c2 = this.evalExpr(c1);
				var args1;
				var _g11 = [];
				var _g21 = 0;
				while(_g21 < args.length) {
					var a = args[_g21];
					++_g21;
					_g11.push(this.evalExpr(a));
				}
				args1 = _g11;
				{
					var _g22 = c2.e;
					switch(_g22[1]) {
					case 2:
						var g = _g22[2];
						var v3 = this.evalCall(g,args1);
						if(v3 != null) d = v3; else d = hxsl.TExprDef.TCall(c2,args1);
						break;
					case 1:
						var v4 = _g22[2];
						if(this.funMap.h.__keys__[v4.__id__] != null) {
							var f = this.funMap.h[v4.__id__];
							var outExprs = [];
							var undo = [];
							var _g4 = 0;
							var _g3 = f.args.length;
							while(_g4 < _g3) {
								var i1 = _g4++;
								var v5 = [f.args[i1]];
								var e5 = args1[i1];
								{
									var _g5 = e5.e;
									switch(_g5[1]) {
									case 0:
										var old = [this.constants.h[v5[0].__id__]];
										undo.push((function(old,v5) {
											return function() {
												if(old[0] == null) _g6.constants.remove(v5[0]); else _g6.constants.set(v5[0],old[0]);
											};
										})(old,v5));
										this.constants.set(v5[0],e5.e);
										break;
									case 1:
										switch(_g5[2].kind[1]) {
										case 1:case 2:case 0:
											var old = [this.constants.h[v5[0].__id__]];
											undo.push((function(old,v5) {
												return function() {
													if(old[0] == null) _g6.constants.remove(v5[0]); else _g6.constants.set(v5[0],old[0]);
												};
											})(old,v5));
											this.constants.set(v5[0],e5.e);
											break;
										default:
											var old1 = [this.varMap.h[v5[0].__id__]];
											if(old1[0] == null) undo.push((function(v5) {
												return function() {
													_g6.varMap.remove(v5[0]);
												};
											})(v5)); else {
												this.varMap.remove(v5[0]);
												undo.push((function(old1,v5) {
													return function() {
														_g6.varMap.set(v5[0],old1[0]);
													};
												})(old1,v5));
											}
											var v21 = this.mapVar(v5[0]);
											outExprs.push({ e : hxsl.TExprDef.TVarDecl(v21,e5), t : hxsl.Type.TVoid, p : e5.p});
										}
										break;
									default:
										var old1 = [this.varMap.h[v5[0].__id__]];
										if(old1[0] == null) undo.push((function(v5) {
											return function() {
												_g6.varMap.remove(v5[0]);
											};
										})(v5)); else {
											this.varMap.remove(v5[0]);
											undo.push((function(old1,v5) {
												return function() {
													_g6.varMap.set(v5[0],old1[0]);
												};
											})(old1,v5));
										}
										var v21 = this.mapVar(v5[0]);
										outExprs.push({ e : hxsl.TExprDef.TVarDecl(v21,e5), t : hxsl.Type.TVoid, p : e5.p});
									}
								}
							}
							var e6 = this.handleReturn(this.evalExpr(f.expr),true);
							var _g31 = 0;
							while(_g31 < undo.length) {
								var u = undo[_g31];
								++_g31;
								u();
							}
							{
								var _g32 = e6.e;
								switch(_g32[1]) {
								case 4:
									var el1 = _g32[2];
									var _g41 = 0;
									while(_g41 < el1.length) {
										var e7 = el1[_g41];
										++_g41;
										outExprs.push(e7);
									}
									break;
								default:
									outExprs.push(e6);
								}
							}
							d = hxsl.TExprDef.TBlock(outExprs);
						} else d = hxsl.Error.t("Cannot eval non-static call expresssion '" + new hxsl.Printer().exprString(c2) + "'",c2.p);
						break;
					default:
						d = hxsl.Error.t("Cannot eval non-static call expresssion '" + new hxsl.Printer().exprString(c2) + "'",c2.p);
					}
				}
				break;
			case 4:
				var el2 = _g[2];
				var out = [];
				var last = el2.length - 1;
				var _g23 = 0;
				var _g12 = el2.length;
				while(_g23 < _g12) {
					var i2 = _g23++;
					var e8 = this.evalExpr(el2[i2]);
					{
						var _g33 = e8.e;
						switch(_g33[1]) {
						case 0:
							if(i2 < last) {
							} else out.push(e8);
							break;
						case 1:
							if(i2 < last) {
							} else out.push(e8);
							break;
						default:
							out.push(e8);
						}
					}
				}
				if(out.length == 1) d = out[0].e; else d = hxsl.TExprDef.TBlock(out);
				break;
			case 5:
				var e22 = _g[4];
				var e12 = _g[3];
				var op = _g[2];
				var e13 = this.evalExpr(e12);
				var e23 = this.evalExpr(e22);
				switch(op[1]) {
				case 0:
					{
						var _g13 = e13.e;
						var _g24 = e23.e;
						switch(_g13[1]) {
						case 0:
							switch(_g13[2][1]) {
							case 2:
								switch(_g24[1]) {
								case 0:
									switch(_g24[2][1]) {
									case 2:
										var a1 = _g13[2][2];
										var b = _g24[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CInt(Std["int"](a1 + b)));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g24[1]) {
								case 0:
									switch(_g24[2][1]) {
									case 3:
										var a2 = _g13[2][2];
										var b1 = _g24[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CFloat(a2 + b1));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl.TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl.TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 3:
					{
						var _g14 = e13.e;
						var _g25 = e23.e;
						switch(_g14[1]) {
						case 0:
							switch(_g14[2][1]) {
							case 2:
								switch(_g25[1]) {
								case 0:
									switch(_g25[2][1]) {
									case 2:
										var a3 = _g14[2][2];
										var b2 = _g25[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CInt(Std["int"](a3 - b2)));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g25[1]) {
								case 0:
									switch(_g25[2][1]) {
									case 3:
										var a4 = _g14[2][2];
										var b3 = _g25[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CFloat(a4 - b3));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl.TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl.TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 1:
					{
						var _g15 = e13.e;
						var _g26 = e23.e;
						switch(_g15[1]) {
						case 0:
							switch(_g15[2][1]) {
							case 2:
								switch(_g26[1]) {
								case 0:
									switch(_g26[2][1]) {
									case 2:
										var a5 = _g15[2][2];
										var b4 = _g26[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CInt(Std["int"](a5 * b4)));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g26[1]) {
								case 0:
									switch(_g26[2][1]) {
									case 3:
										var a6 = _g15[2][2];
										var b5 = _g26[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CFloat(a6 * b5));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl.TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl.TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 2:
					{
						var _g16 = e13.e;
						var _g27 = e23.e;
						switch(_g16[1]) {
						case 0:
							switch(_g16[2][1]) {
							case 2:
								switch(_g27[1]) {
								case 0:
									switch(_g27[2][1]) {
									case 2:
										var a7 = _g16[2][2];
										var b6 = _g27[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CInt(Std["int"](a7 / b6)));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g27[1]) {
								case 0:
									switch(_g27[2][1]) {
									case 3:
										var a8 = _g16[2][2];
										var b7 = _g27[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CFloat(a8 / b7));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl.TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl.TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 19:
					{
						var _g17 = e13.e;
						var _g28 = e23.e;
						switch(_g17[1]) {
						case 0:
							switch(_g17[2][1]) {
							case 2:
								switch(_g28[1]) {
								case 0:
									switch(_g28[2][1]) {
									case 2:
										var a9 = _g17[2][2];
										var b8 = _g28[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CInt(Std["int"](a9 % b8)));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g28[1]) {
								case 0:
									switch(_g28[2][1]) {
									case 3:
										var a10 = _g17[2][2];
										var b9 = _g28[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CFloat(a10 % b9));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl.TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl.TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 13:
					{
						var _g18 = e13.e;
						var _g29 = e23.e;
						switch(_g18[1]) {
						case 0:
							switch(_g18[2][1]) {
							case 2:
								switch(_g29[1]) {
								case 0:
									switch(_g29[2][1]) {
									case 2:
										var a11 = _g18[2][2];
										var b10 = _g29[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CInt(a11 ^ b10));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl.TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl.TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 12:
					{
						var _g19 = e13.e;
						var _g210 = e23.e;
						switch(_g19[1]) {
						case 0:
							switch(_g19[2][1]) {
							case 2:
								switch(_g210[1]) {
								case 0:
									switch(_g210[2][1]) {
									case 2:
										var a12 = _g19[2][2];
										var b11 = _g210[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CInt(a12 | b11));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl.TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl.TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 11:
					{
						var _g110 = e13.e;
						var _g211 = e23.e;
						switch(_g110[1]) {
						case 0:
							switch(_g110[2][1]) {
							case 2:
								switch(_g211[1]) {
								case 0:
									switch(_g211[2][1]) {
									case 2:
										var a13 = _g110[2][2];
										var b12 = _g211[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CInt(a13 & b12));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl.TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl.TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 17:
					{
						var _g111 = e13.e;
						var _g212 = e23.e;
						switch(_g111[1]) {
						case 0:
							switch(_g111[2][1]) {
							case 2:
								switch(_g212[1]) {
								case 0:
									switch(_g212[2][1]) {
									case 2:
										var a14 = _g111[2][2];
										var b13 = _g212[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CInt(a14 >> b13));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl.TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl.TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 18:
					{
						var _g112 = e13.e;
						var _g213 = e23.e;
						switch(_g112[1]) {
						case 0:
							switch(_g112[2][1]) {
							case 2:
								switch(_g213[1]) {
								case 0:
									switch(_g213[2][1]) {
									case 2:
										var a15 = _g112[2][2];
										var b14 = _g213[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CInt(a15 >>> b14));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl.TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl.TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 16:
					{
						var _g113 = e13.e;
						var _g214 = e23.e;
						switch(_g113[1]) {
						case 0:
							switch(_g113[2][1]) {
							case 2:
								switch(_g214[1]) {
								case 0:
									switch(_g214[2][1]) {
									case 2:
										var a16 = _g113[2][2];
										var b15 = _g214[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CInt(a16 << b15));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl.TExprDef.TBinop(op,e13,e23);
							}
							break;
						default:
							d = hxsl.TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 14:
					{
						var _g114 = e13.e;
						var _g215 = e23.e;
						switch(_g114[1]) {
						case 0:
							switch(_g114[2][1]) {
							case 1:
								switch(_g215[1]) {
								case 0:
									switch(_g215[2][1]) {
									case 1:
										var a17 = _g114[2][2];
										var b16 = _g215[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(a17 && b16));
										break;
									default:
										var a18 = _g114[2][2];
										if(a18 == false) d = hxsl.TExprDef.TConst(hxsl.Const.CBool(a18)); else d = e23.e;
									}
									break;
								default:
									var a18 = _g114[2][2];
									if(a18 == false) d = hxsl.TExprDef.TConst(hxsl.Const.CBool(a18)); else d = e23.e;
								}
								break;
							default:
								switch(_g215[1]) {
								case 0:
									switch(_g215[2][1]) {
									case 1:
										var a19 = _g215[2][2];
										if(a19 == false) d = hxsl.TExprDef.TConst(hxsl.Const.CBool(a19)); else d = e13.e;
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
							}
							break;
						default:
							switch(_g215[1]) {
							case 0:
								switch(_g215[2][1]) {
								case 1:
									var a19 = _g215[2][2];
									if(a19 == false) d = hxsl.TExprDef.TConst(hxsl.Const.CBool(a19)); else d = e13.e;
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl.TExprDef.TBinop(op,e13,e23);
							}
						}
					}
					break;
				case 15:
					{
						var _g115 = e13.e;
						var _g216 = e23.e;
						switch(_g115[1]) {
						case 0:
							switch(_g115[2][1]) {
							case 1:
								switch(_g216[1]) {
								case 0:
									switch(_g216[2][1]) {
									case 1:
										var a20 = _g115[2][2];
										var b17 = _g216[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(a20 || b17));
										break;
									default:
										var a21 = _g115[2][2];
										if(a21 == true) d = hxsl.TExprDef.TConst(hxsl.Const.CBool(a21)); else d = e23.e;
									}
									break;
								default:
									var a21 = _g115[2][2];
									if(a21 == true) d = hxsl.TExprDef.TConst(hxsl.Const.CBool(a21)); else d = e23.e;
								}
								break;
							default:
								switch(_g216[1]) {
								case 0:
									switch(_g216[2][1]) {
									case 1:
										var a22 = _g216[2][2];
										if(a22 == true) d = hxsl.TExprDef.TConst(hxsl.Const.CBool(a22)); else d = e13.e;
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
							}
							break;
						default:
							switch(_g216[1]) {
							case 0:
								switch(_g216[2][1]) {
								case 1:
									var a22 = _g216[2][2];
									if(a22 == true) d = hxsl.TExprDef.TConst(hxsl.Const.CBool(a22)); else d = e13.e;
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							default:
								d = hxsl.TExprDef.TBinop(op,e13,e23);
							}
						}
					}
					break;
				case 5:
					{
						var _g116 = e13.e;
						var _g217 = e23.e;
						switch(_g116[1]) {
						case 0:
							switch(_g116[2][1]) {
							case 0:
								switch(_g217[1]) {
								case 0:
									switch(_g217[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(true));
										break;
									default:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(false));
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 1:
								switch(_g217[1]) {
								case 0:
									switch(_g217[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(false));
										break;
									case 1:
										var a23 = _g116[2][2];
										var b18 = _g217[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool((a23 == b18?0:1) == 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 2:
								switch(_g217[1]) {
								case 0:
									switch(_g217[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(false));
										break;
									case 2:
										var a24 = _g116[2][2];
										var b19 = _g217[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(a24 - b19 == 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g217[1]) {
								case 0:
									switch(_g217[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(false));
										break;
									case 3:
										var a25 = _g116[2][2];
										var b20 = _g217[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool((a25 > b20?1:a25 == b20?0:-1) == 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 4:
								switch(_g217[1]) {
								case 0:
									switch(_g217[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(false));
										break;
									case 4:
										var a26 = _g116[2][2];
										var b21 = _g217[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool((a26 > b21?1:a26 == b21?0:-1) == 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							}
							break;
						default:
							d = hxsl.TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 6:
					{
						var _g117 = e13.e;
						var _g218 = e23.e;
						switch(_g117[1]) {
						case 0:
							switch(_g117[2][1]) {
							case 0:
								switch(_g218[1]) {
								case 0:
									switch(_g218[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(false));
										break;
									default:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(true));
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 1:
								switch(_g218[1]) {
								case 0:
									switch(_g218[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(true));
										break;
									case 1:
										var a27 = _g117[2][2];
										var b22 = _g218[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool((a27 == b22?0:1) != 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 2:
								switch(_g218[1]) {
								case 0:
									switch(_g218[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(true));
										break;
									case 2:
										var a28 = _g117[2][2];
										var b23 = _g218[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(a28 - b23 != 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g218[1]) {
								case 0:
									switch(_g218[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(true));
										break;
									case 3:
										var a29 = _g117[2][2];
										var b24 = _g218[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool((a29 > b24?1:a29 == b24?0:-1) != 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 4:
								switch(_g218[1]) {
								case 0:
									switch(_g218[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(true));
										break;
									case 4:
										var a30 = _g117[2][2];
										var b25 = _g218[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool((a30 > b25?1:a30 == b25?0:-1) != 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							}
							break;
						default:
							d = hxsl.TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 7:
					{
						var _g118 = e13.e;
						var _g219 = e23.e;
						switch(_g118[1]) {
						case 0:
							switch(_g118[2][1]) {
							case 0:
								switch(_g219[1]) {
								case 0:
									switch(_g219[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(false));
										break;
									default:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(false));
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 1:
								switch(_g219[1]) {
								case 0:
									switch(_g219[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(true));
										break;
									case 1:
										var a31 = _g118[2][2];
										var b26 = _g219[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool((a31 == b26?0:1) > 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 2:
								switch(_g219[1]) {
								case 0:
									switch(_g219[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(true));
										break;
									case 2:
										var a32 = _g118[2][2];
										var b27 = _g219[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(a32 - b27 > 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g219[1]) {
								case 0:
									switch(_g219[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(true));
										break;
									case 3:
										var a33 = _g118[2][2];
										var b28 = _g219[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool((a33 > b28?1:a33 == b28?0:-1) > 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 4:
								switch(_g219[1]) {
								case 0:
									switch(_g219[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(true));
										break;
									case 4:
										var a34 = _g118[2][2];
										var b29 = _g219[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool((a34 > b29?1:a34 == b29?0:-1) > 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							}
							break;
						default:
							d = hxsl.TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 8:
					{
						var _g119 = e13.e;
						var _g220 = e23.e;
						switch(_g119[1]) {
						case 0:
							switch(_g119[2][1]) {
							case 0:
								switch(_g220[1]) {
								case 0:
									switch(_g220[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(true));
										break;
									default:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(false));
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 1:
								switch(_g220[1]) {
								case 0:
									switch(_g220[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(true));
										break;
									case 1:
										var a35 = _g119[2][2];
										var b30 = _g220[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool((a35 == b30?0:1) >= 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 2:
								switch(_g220[1]) {
								case 0:
									switch(_g220[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(true));
										break;
									case 2:
										var a36 = _g119[2][2];
										var b31 = _g220[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(a36 - b31 >= 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g220[1]) {
								case 0:
									switch(_g220[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(true));
										break;
									case 3:
										var a37 = _g119[2][2];
										var b32 = _g220[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool((a37 > b32?1:a37 == b32?0:-1) >= 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 4:
								switch(_g220[1]) {
								case 0:
									switch(_g220[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(true));
										break;
									case 4:
										var a38 = _g119[2][2];
										var b33 = _g220[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool((a38 > b33?1:a38 == b33?0:-1) >= 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							}
							break;
						default:
							d = hxsl.TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 9:
					{
						var _g120 = e13.e;
						var _g221 = e23.e;
						switch(_g120[1]) {
						case 0:
							switch(_g120[2][1]) {
							case 0:
								switch(_g221[1]) {
								case 0:
									switch(_g221[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(false));
										break;
									default:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(true));
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 1:
								switch(_g221[1]) {
								case 0:
									switch(_g221[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(false));
										break;
									case 1:
										var a39 = _g120[2][2];
										var b34 = _g221[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool((a39 == b34?0:1) < 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 2:
								switch(_g221[1]) {
								case 0:
									switch(_g221[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(false));
										break;
									case 2:
										var a40 = _g120[2][2];
										var b35 = _g221[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(a40 - b35 < 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g221[1]) {
								case 0:
									switch(_g221[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(false));
										break;
									case 3:
										var a41 = _g120[2][2];
										var b36 = _g221[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool((a41 > b36?1:a41 == b36?0:-1) < 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 4:
								switch(_g221[1]) {
								case 0:
									switch(_g221[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(false));
										break;
									case 4:
										var a42 = _g120[2][2];
										var b37 = _g221[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool((a42 > b37?1:a42 == b37?0:-1) < 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							}
							break;
						default:
							d = hxsl.TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 10:
					{
						var _g121 = e13.e;
						var _g222 = e23.e;
						switch(_g121[1]) {
						case 0:
							switch(_g121[2][1]) {
							case 0:
								switch(_g222[1]) {
								case 0:
									switch(_g222[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(true));
										break;
									default:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(true));
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 1:
								switch(_g222[1]) {
								case 0:
									switch(_g222[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(false));
										break;
									case 1:
										var a43 = _g121[2][2];
										var b38 = _g222[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool((a43 == b38?0:1) <= 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 2:
								switch(_g222[1]) {
								case 0:
									switch(_g222[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(false));
										break;
									case 2:
										var a44 = _g121[2][2];
										var b39 = _g222[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(a44 - b39 <= 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 3:
								switch(_g222[1]) {
								case 0:
									switch(_g222[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(false));
										break;
									case 3:
										var a45 = _g121[2][2];
										var b40 = _g222[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool((a45 > b40?1:a45 == b40?0:-1) <= 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							case 4:
								switch(_g222[1]) {
								case 0:
									switch(_g222[2][1]) {
									case 0:
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool(false));
										break;
									case 4:
										var a46 = _g121[2][2];
										var b41 = _g222[2][2];
										d = hxsl.TExprDef.TConst(hxsl.Const.CBool((a46 > b41?1:a46 == b41?0:-1) <= 0));
										break;
									default:
										d = hxsl.TExprDef.TBinop(op,e13,e23);
									}
									break;
								default:
									d = hxsl.TExprDef.TBinop(op,e13,e23);
								}
								break;
							}
							break;
						default:
							d = hxsl.TExprDef.TBinop(op,e13,e23);
						}
					}
					break;
				case 21:case 4:case 20:
					d = hxsl.TExprDef.TBinop(op,e13,e23);
					break;
				case 22:
					throw "assert";
					break;
				}
				break;
			case 6:
				var e9 = _g[3];
				var op1 = _g[2];
				var e10 = this.evalExpr(e9);
				{
					var _g122 = e10.e;
					switch(_g122[1]) {
					case 0:
						var c3 = _g122[2];
						switch(op1[1]) {
						case 2:
							switch(c3[1]) {
							case 1:
								var b42 = c3[2];
								d = hxsl.TExprDef.TConst(hxsl.Const.CBool(!b42));
								break;
							default:
								d = hxsl.TExprDef.TUnop(op1,e10);
							}
							break;
						case 3:
							switch(c3[1]) {
							case 2:
								var i3 = c3[2];
								d = hxsl.TExprDef.TConst(hxsl.Const.CInt(-i3));
								break;
							case 3:
								var f1 = c3[2];
								d = hxsl.TExprDef.TConst(hxsl.Const.CFloat(-f1));
								break;
							default:
								d = hxsl.TExprDef.TUnop(op1,e10);
							}
							break;
						default:
							d = hxsl.TExprDef.TUnop(op1,e10);
						}
						break;
					default:
						d = hxsl.TExprDef.TUnop(op1,e10);
					}
				}
				break;
			case 3:
				var e14 = _g[2];
				var e15 = this.evalExpr(e14);
				{
					var _g123 = e15.e;
					switch(_g123[1]) {
					case 0:
						d = e15.e;
						break;
					default:
						d = hxsl.TExprDef.TParenthesis(e15);
					}
				}
				break;
			case 10:
				var eelse = _g[4];
				var eif = _g[3];
				var econd = _g[2];
				var e16 = this.evalExpr(econd);
				{
					var _g124 = e16.e;
					switch(_g124[1]) {
					case 0:
						switch(_g124[2][1]) {
						case 1:
							var b43 = _g124[2][2];
							if(b43) d = this.evalExpr(eif).e; else if(eelse == null) d = hxsl.TExprDef.TConst(hxsl.Const.CNull); else d = this.evalExpr(eelse).e;
							break;
						default:
							d = hxsl.TExprDef.TIf(e16,this.evalExpr(eif),eelse == null?null:this.evalExpr(eelse));
						}
						break;
					default:
						d = hxsl.TExprDef.TIf(e16,this.evalExpr(eif),eelse == null?null:this.evalExpr(eelse));
					}
				}
				break;
			case 15:
				d = hxsl.TExprDef.TBreak;
				break;
			case 14:
				d = hxsl.TExprDef.TContinue;
				break;
			case 11:
				d = hxsl.TExprDef.TDiscard;
				break;
			case 13:
				var loop = _g[4];
				var it = _g[3];
				var v6 = _g[2];
				var v22 = this.mapVar(v6);
				var it1 = this.evalExpr(it);
				var e17;
				{
					var _g125 = it1.e;
					switch(_g125[1]) {
					case 5:
						switch(_g125[2][1]) {
						case 21:
							switch(_g125[3].e[1]) {
							case 0:
								switch(_g125[3].e[2][1]) {
								case 2:
									switch(_g125[4].e[1]) {
									case 0:
										switch(_g125[4].e[2][1]) {
										case 2:
											var start = _g125[3].e[2][2];
											var len = _g125[4].e[2][2];
											var out1 = [];
											var _g223 = start;
											while(_g223 < len) {
												var i4 = _g223++;
												var value = hxsl.TExprDef.TConst(hxsl.Const.CInt(i4));
												this.constants.set(v6,value);
												out1.push(this.evalExpr(loop));
											}
											this.constants.remove(v6);
											e17 = hxsl.TExprDef.TBlock(out1);
											break;
										default:
											e17 = hxsl.TExprDef.TFor(v22,it1,this.evalExpr(loop));
										}
										break;
									default:
										e17 = hxsl.TExprDef.TFor(v22,it1,this.evalExpr(loop));
									}
									break;
								default:
									e17 = hxsl.TExprDef.TFor(v22,it1,this.evalExpr(loop));
								}
								break;
							default:
								e17 = hxsl.TExprDef.TFor(v22,it1,this.evalExpr(loop));
							}
							break;
						default:
							e17 = hxsl.TExprDef.TFor(v22,it1,this.evalExpr(loop));
						}
						break;
					default:
						e17 = hxsl.TExprDef.TFor(v22,it1,this.evalExpr(loop));
					}
				}
				this.varMap.remove(v6);
				d = e17;
				break;
			case 17:
				var el3 = _g[2];
				d = hxsl.TExprDef.TArrayDecl((function($this) {
					var $r;
					var _g126 = [];
					{
						var _g224 = 0;
						while(_g224 < el3.length) {
							var e18 = el3[_g224];
							++_g224;
							_g126.push($this.evalExpr(e18));
						}
					}
					$r = _g126;
					return $r;
				}(this)));
				break;
			}
		}
		return { e : d, t : e.t, p : e.p};
	}
	,__class__: hxsl.Eval
};
hxsl._Flatten = {};
hxsl._Flatten.Alloc = function(g,t,pos,size) {
	this.g = g;
	this.t = t;
	this.pos = pos;
	this.size = size;
};
$hxClasses["hxsl._Flatten.Alloc"] = hxsl._Flatten.Alloc;
hxsl._Flatten.Alloc.__name__ = ["hxsl","_Flatten","Alloc"];
hxsl._Flatten.Alloc.prototype = {
	__class__: hxsl._Flatten.Alloc
};
hxsl.Flatten = function() {
};
$hxClasses["hxsl.Flatten"] = hxsl.Flatten;
hxsl.Flatten.__name__ = ["hxsl","Flatten"];
hxsl.Flatten.prototype = {
	flatten: function(s,kind,constsToGlobal) {
		this.globals = [];
		this.params = [];
		this.outVars = [];
		if(constsToGlobal) {
			this.consts = [];
			var p = s.funs[0].expr.p;
			var gc = { id : hxsl.Tools.allocVarId(), name : "__consts__", kind : hxsl.VarKind.Global, type : null};
			this.econsts = { e : hxsl.TExprDef.TVar(gc), t : null, p : p};
			s = { name : s.name, vars : s.vars.slice(), funs : (function($this) {
				var $r;
				var _g = [];
				{
					var _g1 = 0;
					var _g2 = s.funs;
					while(_g1 < _g2.length) {
						var f = _g2[_g1];
						++_g1;
						_g.push($this.mapFun(f,$bind($this,$this.mapConsts)));
					}
				}
				$r = _g;
				return $r;
			}(this))};
			var _g11 = 0;
			var _g21 = s.vars;
			while(_g11 < _g21.length) {
				var v = _g21[_g11];
				++_g11;
				{
					var _g3 = v.type;
					switch(_g3[1]) {
					case 9:
						this.allocConst(255,p);
						break;
					default:
					}
				}
			}
			if(this.consts.length > 0) {
				gc.type = this.econsts.t = hxsl.Type.TArray(hxsl.Type.TFloat,hxsl.SizeDecl.SConst(this.consts.length));
				s.vars.push(gc);
			}
		}
		this.varMap = new haxe.ds.ObjectMap();
		this.allocData = new haxe.ds.ObjectMap();
		var _g4 = 0;
		var _g12 = s.vars;
		while(_g4 < _g12.length) {
			var v1 = _g12[_g4];
			++_g4;
			this.gatherVar(v1);
		}
		var prefix;
		switch(kind[1]) {
		case 0:
			prefix = "vertex";
			break;
		case 1:
			prefix = "fragment";
			break;
		default:
			throw "assert";
		}
		this.pack(prefix + "Globals",hxsl.VarKind.Global,this.globals,hxsl.VecType.VFloat);
		this.pack(prefix + "Params",hxsl.VarKind.Param,this.params,hxsl.VecType.VFloat);
		var allVars = this.globals.concat(this.params);
		var textures = this.packTextures(prefix + "Textures",allVars,hxsl.Type.TSampler2D).concat(this.packTextures(prefix + "TexturesCube",allVars,hxsl.Type.TSamplerCube));
		var funs;
		var _g5 = [];
		var _g13 = 0;
		var _g22 = s.funs;
		while(_g13 < _g22.length) {
			var f1 = _g22[_g13];
			++_g13;
			_g5.push(this.mapFun(f1,$bind(this,this.mapExpr)));
		}
		funs = _g5;
		var _g14 = 0;
		while(_g14 < textures.length) {
			var t = textures[_g14];
			++_g14;
			t.pos >>= 2;
		}
		return { name : s.name, vars : this.outVars, funs : funs};
	}
	,mapFun: function(f,mapExpr) {
		return { kind : f.kind, ret : f.ret, args : f.args, ref : f.ref, expr : mapExpr(f.expr)};
	}
	,mapExpr: function(e) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 1:
				var v = _g[2];
				var a = this.varMap.h[v.__id__];
				if(a == null) e = e; else e = this.access(a,v.type,e.p,(function(f,a1) {
					return function(a11,a2) {
						return f(a1,a11,a2);
					};
				})($bind(this,this.readIndex),a));
				break;
			case 16:
				switch(_g[2].e[1]) {
				case 1:
					var eindex = _g[3];
					var vp = _g[2].p;
					var v1 = _g[2].e[2];
					if(!(function($this) {
						var $r;
						var _g1 = eindex.e;
						$r = (function($this) {
							var $r;
							switch(_g1[1]) {
							case 0:
								$r = (function($this) {
									var $r;
									switch(_g1[2][1]) {
									case 2:
										$r = true;
										break;
									default:
										$r = false;
									}
									return $r;
								}($this));
								break;
							default:
								$r = false;
							}
							return $r;
						}($this));
						return $r;
					}(this))) {
						var a3 = this.varMap.h[v1.__id__];
						if(a3 == null) e = e; else {
							var _g11 = v1.type;
							switch(_g11[1]) {
							case 14:
								var t = _g11[2];
								var stride = this.varSize(t,a3.t);
								if(stride == 0 || (stride & 3) != 0) throw new hxsl.Error("Dynamic access to an Array which size is not 4 components-aligned is not allowed",e.p);
								stride >>= 2;
								eindex = this.mapExpr(eindex);
								var toInt = { e : hxsl.TExprDef.TCall({ e : hxsl.TExprDef.TGlobal(hxsl.TGlobal.ToInt), t : hxsl.Type.TFun([]), p : vp},[eindex]), t : hxsl.Type.TInt, p : vp};
								e = this.access(a3,t,vp,(function(f1,a4,a12,a21) {
									return function(a31,a41) {
										return f1(a4,a12,a21,a31,a41);
									};
								})($bind(this,this.readOffset),a3,stride,stride == 1?toInt:{ e : hxsl.TExprDef.TBinop(haxe.macro.Binop.OpMult,toInt,{ e : hxsl.TExprDef.TConst(hxsl.Const.CInt(stride)), t : hxsl.Type.TInt, p : vp}), t : hxsl.Type.TInt, p : vp}));
								break;
							default:
								throw "assert";
							}
						}
					} else e = hxsl.Tools.map(e,$bind(this,this.mapExpr));
					break;
				default:
					e = hxsl.Tools.map(e,$bind(this,this.mapExpr));
				}
				break;
			default:
				e = hxsl.Tools.map(e,$bind(this,this.mapExpr));
			}
		}
		return this.optimize(e);
	}
	,mapConsts: function(e) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 16:
				var eindex = _g[3];
				var eindex1 = _g[3];
				switch(_g[3].e[1]) {
				case 0:
					switch(_g[3].e[2][1]) {
					case 2:
						var ea = _g[2];
						return { e : hxsl.TExprDef.TArray(this.mapConsts(ea),eindex), t : e.t, p : e.p};
					default:
						var ea1 = _g[2];
						{
							var _g1 = ea1.t;
							switch(_g1[1]) {
							case 14:
								var t = _g1[2];
								var stride = this.varSize(t,hxsl.VecType.VFloat) >> 2;
								this.allocConst(stride,e.p);
								break;
							default:
							}
						}
					}
					break;
				default:
					var ea1 = _g[2];
					{
						var _g1 = ea1.t;
						switch(_g1[1]) {
						case 14:
							var t = _g1[2];
							var stride = this.varSize(t,hxsl.VecType.VFloat) >> 2;
							this.allocConst(stride,e.p);
							break;
						default:
						}
					}
				}
				break;
			case 5:
				switch(_g[2][1]) {
				case 1:
					switch(_g[4].t[1]) {
					case 8:
						this.allocConst(1,e.p);
						break;
					default:
					}
					break;
				default:
				}
				break;
			case 0:
				var c = _g[2];
				switch(c[1]) {
				case 3:
					var v = c[2];
					return this.allocConst(v,e.p);
				case 2:
					var v1 = c[2];
					return this.allocConst(v1,e.p);
				default:
					return e;
				}
				break;
			case 2:
				var g = _g[2];
				switch(g[1]) {
				case 52:
					this.allocConsts([1,255,65025,16581375],e.p);
					this.allocConsts([0.00392156862745098,0.00392156862745098,0.00392156862745098,0],e.p);
					break;
				case 53:
					this.allocConsts([1,0.00392156862745098,1.5378700499807768e-005,6.0308629411010845e-008],e.p);
					break;
				case 0:
					this.allocConst(Math.PI / 180,e.p);
					break;
				case 1:
					this.allocConst(180 / Math.PI,e.p);
					break;
				case 10:
					this.allocConst(0.6931471805599453,e.p);
					break;
				case 9:
					this.allocConst(1.4426950408889634,e.p);
					break;
				case 24:
					this.allocConst(1,e.p);
					break;
				case 55:
					this.allocConst(0.5,e.p);
					break;
				case 54:
					this.allocConst(1,e.p);
					this.allocConst(0.5,e.p);
					break;
				default:
				}
				break;
			case 8:
				switch(_g[2].e[1]) {
				case 2:
					switch(_g[2].e[2][1]) {
					case 40:
						switch(_g[3].length) {
						case 2:
							switch(_g[3][0].t[1]) {
							case 5:
								switch(_g[3][0].t[2]) {
								case 3:
									switch(_g[3][0].t[3][1]) {
									case 1:
										switch(_g[3][0].e[1]) {
										case 1:
											switch(_g[3][0].e[2].kind[1]) {
											case 0:case 2:case 1:case 3:
												switch(_g[3][1].e[1]) {
												case 0:
													switch(_g[3][1].e[2][1]) {
													case 2:
														switch(_g[3][1].e[2][2]) {
														case 1:
															return e;
														default:
														}
														break;
													default:
													}
													break;
												default:
												}
												break;
											default:
											}
											break;
										default:
										}
										break;
									default:
									}
									break;
								default:
								}
								break;
							default:
							}
							break;
						default:
						}
						break;
					default:
					}
					break;
				default:
				}
				break;
			default:
			}
		}
		return hxsl.Tools.map(e,$bind(this,this.mapConsts));
	}
	,allocConst: function(v,p) {
		var index = HxOverrides.indexOf(this.consts,v,0);
		if(index < 0) {
			index = this.consts.length;
			this.consts.push(v);
		}
		return { e : hxsl.TExprDef.TArray(this.econsts,{ e : hxsl.TExprDef.TConst(hxsl.Const.CInt(index)), t : hxsl.Type.TInt, p : p}), t : hxsl.Type.TFloat, p : p};
	}
	,allocConsts: function(va,p) {
		var _g = this;
		var pad = va.length - 1 & 3;
		var index = -1;
		var _g1 = 0;
		var _g2 = this.consts.length - (va.length - 1);
		while(_g1 < _g2) {
			var i = _g1++;
			if(i >> 2 != i + pad >> 2) continue;
			var found = true;
			var _g3 = 0;
			var _g21 = va.length;
			while(_g3 < _g21) {
				var j = _g3++;
				if(this.consts[i + j] != va[j]) {
					found = false;
					break;
				}
			}
			if(found) {
				index = i;
				break;
			}
		}
		if(index < 0) {
			while(this.consts.length >> 2 != this.consts.length + pad >> 2) this.consts.push(0);
			index = this.consts.length;
			var _g4 = 0;
			while(_g4 < va.length) {
				var v = va[_g4];
				++_g4;
				this.consts.push(v);
			}
		}
		var _g5 = va.length;
		switch(_g5) {
		case 1:
			return { e : hxsl.TExprDef.TArray(_g.econsts,{ e : hxsl.TExprDef.TConst(hxsl.Const.CInt(index)), t : hxsl.Type.TInt, p : p}), t : hxsl.Type.TFloat, p : p};
		case 2:
			return { e : hxsl.TExprDef.TCall({ e : hxsl.TExprDef.TGlobal(hxsl.TGlobal.Vec2), t : hxsl.Type.TVoid, p : p},[{ e : hxsl.TExprDef.TArray(_g.econsts,{ e : hxsl.TExprDef.TConst(hxsl.Const.CInt(index)), t : hxsl.Type.TInt, p : p}), t : hxsl.Type.TFloat, p : p},{ e : hxsl.TExprDef.TArray(_g.econsts,{ e : hxsl.TExprDef.TConst(hxsl.Const.CInt(index + 1)), t : hxsl.Type.TInt, p : p}), t : hxsl.Type.TFloat, p : p}]), t : hxsl.Type.TVec(2,hxsl.VecType.VFloat), p : p};
		case 3:
			return { e : hxsl.TExprDef.TCall({ e : hxsl.TExprDef.TGlobal(hxsl.TGlobal.Vec3), t : hxsl.Type.TVoid, p : p},[{ e : hxsl.TExprDef.TArray(_g.econsts,{ e : hxsl.TExprDef.TConst(hxsl.Const.CInt(index)), t : hxsl.Type.TInt, p : p}), t : hxsl.Type.TFloat, p : p},{ e : hxsl.TExprDef.TArray(_g.econsts,{ e : hxsl.TExprDef.TConst(hxsl.Const.CInt(index + 1)), t : hxsl.Type.TInt, p : p}), t : hxsl.Type.TFloat, p : p},{ e : hxsl.TExprDef.TArray(_g.econsts,{ e : hxsl.TExprDef.TConst(hxsl.Const.CInt(index + 2)), t : hxsl.Type.TInt, p : p}), t : hxsl.Type.TFloat, p : p}]), t : hxsl.Type.TVec(3,hxsl.VecType.VFloat), p : p};
		case 4:
			return { e : hxsl.TExprDef.TCall({ e : hxsl.TExprDef.TGlobal(hxsl.TGlobal.Vec4), t : hxsl.Type.TVoid, p : p},[{ e : hxsl.TExprDef.TArray(_g.econsts,{ e : hxsl.TExprDef.TConst(hxsl.Const.CInt(index)), t : hxsl.Type.TInt, p : p}), t : hxsl.Type.TFloat, p : p},{ e : hxsl.TExprDef.TArray(_g.econsts,{ e : hxsl.TExprDef.TConst(hxsl.Const.CInt(index + 1)), t : hxsl.Type.TInt, p : p}), t : hxsl.Type.TFloat, p : p},{ e : hxsl.TExprDef.TArray(_g.econsts,{ e : hxsl.TExprDef.TConst(hxsl.Const.CInt(index + 3)), t : hxsl.Type.TInt, p : p}), t : hxsl.Type.TFloat, p : p},{ e : hxsl.TExprDef.TArray(_g.econsts,{ e : hxsl.TExprDef.TConst(hxsl.Const.CInt(index + 4)), t : hxsl.Type.TInt, p : p}), t : hxsl.Type.TFloat, p : p}]), t : hxsl.Type.TVec(4,hxsl.VecType.VFloat), p : p};
		default:
			throw "assert";
		}
	}
	,readIndex: function(a,index,pos) {
		return { e : hxsl.TExprDef.TArray({ e : hxsl.TExprDef.TVar(a.g), t : a.g.type, p : pos},{ e : hxsl.TExprDef.TConst(hxsl.Const.CInt((a.pos >> 2) + index)), t : hxsl.Type.TInt, p : pos}), t : hxsl.Type.TVec(4,a.t), p : pos};
	}
	,readOffset: function(a,stride,delta,index,pos) {
		var index1 = (a.pos >> 2) + index;
		var offset;
		if(index1 == 0) offset = delta; else offset = { e : hxsl.TExprDef.TBinop(haxe.macro.Binop.OpAdd,delta,{ e : hxsl.TExprDef.TConst(hxsl.Const.CInt(index1)), t : hxsl.Type.TInt, p : pos}), t : hxsl.Type.TInt, p : pos};
		return { e : hxsl.TExprDef.TArray({ e : hxsl.TExprDef.TVar(a.g), t : a.g.type, p : pos},offset), t : hxsl.Type.TVec(4,a.t), p : pos};
	}
	,access: function(a,t,pos,read) {
		switch(t[1]) {
		case 7:
			return { e : hxsl.TExprDef.TCall({ e : hxsl.TExprDef.TGlobal(hxsl.TGlobal.Mat4), t : hxsl.Type.TFun([]), p : pos},[read(0,pos),read(1,pos),read(2,pos),read(3,pos)]), t : hxsl.Type.TMat4, p : pos};
		case 8:
			return { e : hxsl.TExprDef.TCall({ e : hxsl.TExprDef.TGlobal(hxsl.TGlobal.Mat3x4), t : hxsl.Type.TFun([]), p : pos},[read(0,pos),read(1,pos),read(2,pos)]), t : hxsl.Type.TMat3x4, p : pos};
		case 6:
			return { e : hxsl.TExprDef.TCall({ e : hxsl.TExprDef.TGlobal(hxsl.TGlobal.Mat3), t : hxsl.Type.TFun([]), p : pos},[this.access(a,hxsl.Type.TMat3x4,pos,read)]), t : hxsl.Type.TMat3, p : pos};
		case 14:
			switch(t[3][1]) {
			case 0:
				var t1 = t[2];
				var len = t[3][2];
				var stride = a.size / len | 0;
				var earr;
				var _g = [];
				var _g1 = 0;
				while(_g1 < len) {
					var i = _g1++;
					_g.push((function($this) {
						var $r;
						var a1 = new hxsl._Flatten.Alloc(a.g,a.t,a.pos + stride * i,stride);
						$r = $this.access(a1,t1,pos,(function(f,a2) {
							return function(a11,a21) {
								return f(a2,a11,a21);
							};
						})($bind($this,$this.readIndex),a1));
						return $r;
					}(this)));
				}
				earr = _g;
				return { e : hxsl.TExprDef.TArrayDecl(earr), t : t1, p : pos};
			default:
				var size = this.varSize(t,a.t);
				if(size <= 4) {
					var k = read(0,pos);
					if(size == 4) {
						if((a.pos & 3) != 0) throw "assert";
						return k;
					} else {
						var sw = [];
						var _g2 = 0;
						while(_g2 < size) {
							var i1 = _g2++;
							sw.push(hxsl.Tools.SWIZ[i1 + (a.pos & 3)]);
						}
						return { e : hxsl.TExprDef.TSwiz(k,sw), t : t, p : pos};
					}
				}
				return hxsl.Error.t("Access not supported for " + hxsl.Tools.toString(t),null);
			}
			break;
		case 10:case 11:
			return read(0,pos);
		default:
			var size = this.varSize(t,a.t);
			if(size <= 4) {
				var k = read(0,pos);
				if(size == 4) {
					if((a.pos & 3) != 0) throw "assert";
					return k;
				} else {
					var sw = [];
					var _g2 = 0;
					while(_g2 < size) {
						var i1 = _g2++;
						sw.push(hxsl.Tools.SWIZ[i1 + (a.pos & 3)]);
					}
					return { e : hxsl.TExprDef.TSwiz(k,sw), t : t, p : pos};
				}
			}
			return hxsl.Error.t("Access not supported for " + hxsl.Tools.toString(t),null);
		}
	}
	,optimize: function(e) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 8:
				switch(_g[2].e[1]) {
				case 2:
					switch(_g[2].e[2][1]) {
					case 50:
						switch(_g[3].length) {
						case 1:
							switch(_g[3][0].e[1]) {
							case 8:
								switch(_g[3][0].e[2].e[1]) {
								case 2:
									switch(_g[3][0].e[2].e[2][1]) {
									case 49:
										var args = _g[3][0].e[3];
										var rem = 0;
										var size = 0;
										while(size < 4) {
											var t = args[args.length - 1 - rem].t;
											size += this.varSize(t,hxsl.VecType.VFloat);
											rem++;
										}
										if(size == 4) {
											var _g1 = 0;
											while(_g1 < rem) {
												var i = _g1++;
												args.pop();
											}
											var emat;
											{
												var _g11 = e.e;
												switch(_g11[1]) {
												case 8:
													var e1 = _g11[2];
													emat = e1;
													break;
												default:
													throw "assert";
												}
											}
											return { e : hxsl.TExprDef.TCall(emat,args), t : e.t, p : e.p};
										}
										break;
									default:
									}
									break;
								default:
								}
								break;
							default:
							}
							break;
						default:
						}
						break;
					default:
					}
					break;
				default:
				}
				break;
			case 16:
				switch(_g[2].e[1]) {
				case 17:
					switch(_g[3].e[1]) {
					case 0:
						switch(_g[3].e[2][1]) {
						case 2:
							var el = _g[2].e[2];
							var i1 = _g[3].e[2][2];
							if(i1 >= 0 && i1 < el.length) return el[i1];
							hxsl.Error.t("Reading outside array bounds",e.p);
							break;
						default:
						}
						break;
					default:
					}
					break;
				default:
				}
				break;
			default:
			}
		}
		return e;
	}
	,packTextures: function(name,vars,t) {
		var alloc = new Array();
		var g = { id : hxsl.Tools.allocVarId(), name : name, type : t, kind : hxsl.VarKind.Param};
		var _g = 0;
		while(_g < vars.length) {
			var v = vars[_g];
			++_g;
			if(v.type != t) continue;
			var a = new hxsl._Flatten.Alloc(g,null,alloc.length << 2,1);
			a.v = v;
			this.varMap.set(v,a);
			alloc.push(a);
		}
		g.type = hxsl.Type.TArray(t,hxsl.SizeDecl.SConst(alloc.length));
		if(alloc.length > 0) {
			this.outVars.push(g);
			this.allocData.set(g,alloc);
		}
		return alloc;
	}
	,pack: function(name,kind,vars,t) {
		var alloc = new Array();
		var apos = 0;
		var g = { id : hxsl.Tools.allocVarId(), name : name, type : hxsl.Type.TVec(0,t), kind : kind};
		var _g = 0;
		while(_g < vars.length) {
			var v = vars[_g];
			++_g;
			var _g1 = v.type;
			switch(_g1[1]) {
			case 10:case 11:
				continue;
				break;
			default:
			}
			var size = this.varSize(v.type,t);
			var best = null;
			var _g11 = 0;
			while(_g11 < alloc.length) {
				var a = alloc[_g11];
				++_g11;
				if(a.v == null && a.size >= size && (best == null || best.size > a.size)) best = a;
			}
			if(best != null) {
				var free = best.size - size;
				if(free > 0) {
					var i = Lambda.indexOf(alloc,best);
					var a1 = new hxsl._Flatten.Alloc(g,t,best.pos + size,free);
					alloc.splice(i + 1,0,a1);
					best.size = size;
				}
				best.v = v;
				this.varMap.set(v,best);
			} else {
				var a2 = new hxsl._Flatten.Alloc(g,t,apos,size);
				apos += size;
				a2.v = v;
				this.varMap.set(v,a2);
				alloc.push(a2);
				var pad = (4 - size % 4) % 4;
				if(pad > 0) {
					var a3 = new hxsl._Flatten.Alloc(g,t,apos,pad);
					apos += pad;
					alloc.push(a3);
				}
			}
		}
		g.type = hxsl.Type.TArray(hxsl.Type.TVec(4,t),hxsl.SizeDecl.SConst(apos >> 2));
		if(apos > 0) {
			this.outVars.push(g);
			this.allocData.set(g,alloc);
		}
		return g;
	}
	,varSize: function(v,t) {
		switch(v[1]) {
		case 3:
			if(t == hxsl.VecType.VFloat) return 1; else throw hxsl.Tools.toString(v) + " size unknown for type " + Std.string(t);
			break;
		case 5:
			var t2 = v[3];
			var n = v[2];
			if(t == t2) return n; else throw hxsl.Tools.toString(v) + " size unknown for type " + Std.string(t);
			break;
		case 7:
			if(t == hxsl.VecType.VFloat) return 16; else throw hxsl.Tools.toString(v) + " size unknown for type " + Std.string(t);
			break;
		case 8:
			if(t == hxsl.VecType.VFloat) return 12; else throw hxsl.Tools.toString(v) + " size unknown for type " + Std.string(t);
			break;
		case 6:
			if(t == hxsl.VecType.VFloat) return 9; else throw hxsl.Tools.toString(v) + " size unknown for type " + Std.string(t);
			break;
		case 14:
			switch(v[3][1]) {
			case 0:
				var at = v[2];
				var n1 = v[3][2];
				return this.varSize(at,t) * n1;
			default:
				throw hxsl.Tools.toString(v) + " size unknown for type " + Std.string(t);
			}
			break;
		default:
			throw hxsl.Tools.toString(v) + " size unknown for type " + Std.string(t);
		}
	}
	,gatherVar: function(v) {
		{
			var _g = v.type;
			switch(_g[1]) {
			case 12:
				var vl = _g[2];
				var _g1 = 0;
				while(_g1 < vl.length) {
					var v1 = vl[_g1];
					++_g1;
					this.gatherVar(v1);
				}
				break;
			default:
				var _g11 = v.kind;
				switch(_g11[1]) {
				case 0:
					if(hxsl.Tools.hasQualifier(v,hxsl.VarQualifier.PerObject)) this.params.push(v); else this.globals.push(v);
					break;
				case 2:
					this.params.push(v);
					break;
				default:
					this.outVars.push(v);
				}
			}
		}
	}
	,__class__: hxsl.Flatten
};
hxsl.Globals = function() {
	this.map = new haxe.ds.IntMap();
};
$hxClasses["hxsl.Globals"] = hxsl.Globals;
hxsl.Globals.__name__ = ["hxsl","Globals"];
hxsl.Globals.allocID = function(path) {
	if(hxsl.Globals.MAP == null) {
		hxsl.Globals.MAP = new haxe.ds.StringMap();
		hxsl.Globals.ALL = [];
	}
	var id = hxsl.Globals.MAP.get(path);
	if(id == null) {
		id = hxsl.Globals.ALL.length;
		hxsl.Globals.ALL.push(path);
		hxsl.Globals.MAP.set(path,id);
	}
	return id;
};
hxsl.Globals.prototype = {
	set: function(path,v) {
		var key = hxsl.Globals.allocID(path);
		var value = v;
		this.map.set(key,value);
	}
	,fastSet: function(id,v) {
		var value = v;
		this.map.set(id,value);
	}
	,__class__: hxsl.Globals
};
var js = {};
js.Boot = function() { };
$hxClasses["js.Boot"] = js.Boot;
js.Boot.__name__ = ["js","Boot"];
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
hxsl.GlslOut = function() {
	this.varNames = new haxe.ds.IntMap();
	this.allNames = new haxe.ds.StringMap();
};
$hxClasses["hxsl.GlslOut"] = hxsl.GlslOut;
hxsl.GlslOut.__name__ = ["hxsl","GlslOut"];
hxsl.GlslOut.prototype = {
	add: function(v) {
		this.buf.add(v);
	}
	,decl: function(s) {
		var _g = 0;
		var _g1 = this.decls;
		while(_g < _g1.length) {
			var d = _g1[_g];
			++_g;
			if(d == s) return;
		}
		this.decls.push(s);
	}
	,addType: function(t) {
		switch(t[1]) {
		case 0:
			this.buf.add("void");
			break;
		case 1:
			this.buf.add("int");
			break;
		case 9:
			var n = t[2];
			this.buf.add("vec");
			this.buf.add(n);
			break;
		case 2:
			this.buf.add("bool");
			break;
		case 3:
			this.buf.add("float");
			break;
		case 4:
			this.buf.add("string");
			break;
		case 5:
			var k = t[3];
			var size = t[2];
			switch(k[1]) {
			case 1:
				break;
			case 0:
				this.buf.add("i");
				break;
			case 2:
				this.buf.add("b");
				break;
			}
			this.buf.add("vec");
			this.buf.add(size);
			break;
		case 6:
			this.buf.add("mat3");
			break;
		case 7:
			this.buf.add("mat4");
			break;
		case 8:
			this.decl(hxsl.GlslOut.MAT34);
			this.buf.add("mat3x4");
			break;
		case 10:
			this.buf.add("sampler2D");
			break;
		case 11:
			this.buf.add("samplerCube");
			break;
		case 12:
			var vl = t[2];
			this.buf.add("struct { ");
			var _g = 0;
			while(_g < vl.length) {
				var v = vl[_g];
				++_g;
				this.addVar(v);
				this.buf.add(";");
			}
			this.buf.add(" }");
			break;
		case 13:
			this.buf.add("function");
			break;
		case 14:
			var size1 = t[3];
			var t1 = t[2];
			this.addType(t1);
			this.buf.add("[");
			switch(size1[1]) {
			case 1:
				var v1 = size1[2];
				this.add(this.varName(v1));
				break;
			case 0:
				var v2 = size1[2];
				this.buf.add(v2);
				break;
			}
			this.buf.add("]");
			break;
		}
	}
	,addVar: function(v) {
		{
			var _g = v.type;
			switch(_g[1]) {
			case 14:
				var size = _g[3];
				var t = _g[2];
				var old = v.type;
				v.type = t;
				this.addVar(v);
				v.type = old;
				this.buf.add("[");
				switch(size[1]) {
				case 1:
					var v1 = size[2];
					this.add(this.varName(v1));
					break;
				case 0:
					var n = size[2];
					this.buf.add(n);
					break;
				}
				this.buf.add("]");
				break;
			default:
				this.addType(v.type);
				this.buf.add(" ");
				this.add(this.varName(v));
			}
		}
	}
	,addValue: function(e,tabs) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 4:
				var el = _g[2];
				var name = "val" + this.exprValues.length;
				var tmp = this.buf;
				this.buf = new StringBuf();
				this.addType(e.t);
				this.buf.add(" ");
				this.buf.add(name);
				this.buf.add("(void)");
				var el2 = el.slice();
				var last = el2[el2.length - 1];
				el2[el2.length - 1] = { e : hxsl.TExprDef.TReturn(last), t : e.t, p : last.p};
				var e2 = { t : hxsl.Type.TVoid, e : hxsl.TExprDef.TBlock(el2), p : e.p};
				this.addExpr(e2,"");
				this.exprValues.push(this.buf.b);
				this.buf = tmp;
				this.buf.add(name);
				this.buf.add("()");
				break;
			default:
				this.addExpr(e,tabs);
			}
		}
	}
	,addExpr: function(e,tabs) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 0:
				var c = _g[2];
				switch(c[1]) {
				case 2:
					var v = c[2];
					this.buf.add(v);
					break;
				case 3:
					var f = c[2];
					var str = "" + f;
					this.buf.add(str);
					if(str.indexOf(".") == -1 && str.indexOf("e") == -1) this.buf.add(".");
					break;
				case 4:
					var v1 = c[2];
					this.buf.add("\"" + v1 + "\"");
					break;
				case 0:
					this.buf.add("null");
					break;
				case 1:
					var b = c[2];
					this.buf.add(b);
					break;
				}
				break;
			case 1:
				var v2 = _g[2];
				this.add(this.varName(v2));
				break;
			case 2:
				var g = _g[2];
				switch(g[1]) {
				case 50:
					this.decl(hxsl.GlslOut.MAT34);
					break;
				case 56:case 57:case 58:
					this.decl("#extension GL_OES_standard_derivatives:enable");
					break;
				case 52:
					this.decl("vec4 pack( float v ) { vec4 color = fract(v * vec4(1, 255, 255.*255., 255.*255.*255.)); return color - color.yzww * vec4(1. / 255., 1. / 255., 1. / 255., 0.); }");
					break;
				case 53:
					this.decl("float unpack( vec4 color ) { return dot(color,vec4(1., 1. / 255., 1. / (255. * 255.), 1. / (255. * 255. * 255.))); }");
					break;
				case 54:
					this.decl("vec4 packNormal( vec3 v ) { return vec4((v + vec3(1.)) * vec3(0.5),1.); }");
					break;
				case 55:
					this.decl("vec3 unpackNormal( vec4 v ) { return normalize((v.xyz - vec3(0.5)) * vec3(2.)); }");
					break;
				case 33:
					this.decl("vec4 _texture2D( sampler2D t, vec2 v ) { return texture2D(t,vec2(v.x,0.999999-v.y)); }");
					break;
				default:
				}
				this.add(hxsl.GlslOut.GLOBALS.get(g));
				break;
			case 3:
				var e1 = _g[2];
				this.buf.add("(");
				this.addValue(e1,tabs);
				this.buf.add(")");
				break;
			case 4:
				var el = _g[2];
				this.buf.add("{\n");
				var t2 = tabs + "\t";
				var _g1 = 0;
				while(_g1 < el.length) {
					var e2 = el[_g1];
					++_g1;
					this.buf.add(t2);
					this.addExpr(e2,t2);
					this.buf.add(";\n");
				}
				this.buf.add(tabs);
				this.buf.add("}");
				break;
			case 5:
				var e21 = _g[4];
				var e11 = _g[3];
				var op = _g[2];
				{
					var _g11 = e11.t;
					var _g2 = e21.t;
					switch(op[1]) {
					case 1:
						switch(_g11[1]) {
						case 5:
							switch(_g11[2]) {
							case 3:
								switch(_g11[3][1]) {
								case 1:
									switch(_g2[1]) {
									case 8:
										this.decl(hxsl.GlslOut.MAT34);
										this.decl("vec3 m3x4mult( vec3 v, mat3x4 m) { vec4 ve = vec4(v,1.0); return vec3(dot(m.a,ve),dot(m.b,ve),dot(m.c,ve)); }");
										this.buf.add("m3x4mult(");
										this.addValue(e11,tabs);
										this.buf.add(",");
										this.addValue(e21,tabs);
										this.buf.add(")");
										break;
									default:
										this.addValue(e11,tabs);
										this.buf.add(" ");
										this.add(hxsl.Printer.opStr(op));
										this.buf.add(" ");
										this.addValue(e21,tabs);
									}
									break;
								default:
									this.addValue(e11,tabs);
									this.buf.add(" ");
									this.add(hxsl.Printer.opStr(op));
									this.buf.add(" ");
									this.addValue(e21,tabs);
								}
								break;
							default:
								this.addValue(e11,tabs);
								this.buf.add(" ");
								this.add(hxsl.Printer.opStr(op));
								this.buf.add(" ");
								this.addValue(e21,tabs);
							}
							break;
						default:
							this.addValue(e11,tabs);
							this.buf.add(" ");
							this.add(hxsl.Printer.opStr(op));
							this.buf.add(" ");
							this.addValue(e21,tabs);
						}
						break;
					default:
						this.addValue(e11,tabs);
						this.buf.add(" ");
						this.add(hxsl.Printer.opStr(op));
						this.buf.add(" ");
						this.addValue(e21,tabs);
					}
				}
				break;
			case 6:
				var e12 = _g[3];
				var op1 = _g[2];
				this.buf.add((function($this) {
					var $r;
					switch(op1[1]) {
					case 2:
						$r = "!";
						break;
					case 3:
						$r = "-";
						break;
					case 0:
						$r = "++";
						break;
					case 1:
						$r = "--";
						break;
					case 4:
						$r = "~";
						break;
					}
					return $r;
				}(this)));
				this.addValue(e12,tabs);
				break;
			case 7:
				var init = _g[3];
				var v3 = _g[2];
				this.locals.push(v3);
				if(init != null) {
					this.add(this.varName(v3));
					this.buf.add(" = ");
					this.addValue(init,tabs);
				} else this.buf.add("/*var*/");
				break;
			case 8:
				var e3 = _g[2];
				switch(_g[2].e[1]) {
				case 2:
					switch(_g[2].e[2][1]) {
					case 48:
						var args = _g[3];
						switch(_g[3].length) {
						case 1:
							var e4 = _g[3][0];
							if(e4.t == hxsl.Type.TMat3x4) {
								this.decl("mat3 _mat3( mat3x4 v ) { return mat3(v.a.xyz,v.b.xyz,v.c.xyz); }");
								this.buf.add("_mat3(");
								this.addValue(e4,tabs);
								this.buf.add(")");
							} else {
								this.addValue(e3,tabs);
								this.buf.add("(");
								var first = true;
								var _g12 = 0;
								while(_g12 < args.length) {
									var e5 = args[_g12];
									++_g12;
									if(first) first = false; else this.buf.add(", ");
									this.addValue(e5,tabs);
								}
								this.buf.add(")");
							}
							break;
						default:
							this.addValue(e3,tabs);
							this.buf.add("(");
							var first = true;
							var _g12 = 0;
							while(_g12 < args.length) {
								var e5 = args[_g12];
								++_g12;
								if(first) first = false; else this.buf.add(", ");
								this.addValue(e5,tabs);
							}
							this.buf.add(")");
						}
						break;
					case 51:
						var args = _g[3];
						switch(_g[3].length) {
						case 1:
							var e6 = _g[3][0];
							this.buf.add("clamp(");
							this.addValue(e6,tabs);
							this.buf.add(", 0., 1.)");
							break;
						default:
							this.addValue(e3,tabs);
							this.buf.add("(");
							var first = true;
							var _g12 = 0;
							while(_g12 < args.length) {
								var e5 = args[_g12];
								++_g12;
								if(first) first = false; else this.buf.add(", ");
								this.addValue(e5,tabs);
							}
							this.buf.add(")");
						}
						break;
					default:
						var args = _g[3];
						this.addValue(e3,tabs);
						this.buf.add("(");
						var first = true;
						var _g12 = 0;
						while(_g12 < args.length) {
							var e5 = args[_g12];
							++_g12;
							if(first) first = false; else this.buf.add(", ");
							this.addValue(e5,tabs);
						}
						this.buf.add(")");
					}
					break;
				default:
					var args = _g[3];
					this.addValue(e3,tabs);
					this.buf.add("(");
					var first = true;
					var _g12 = 0;
					while(_g12 < args.length) {
						var e5 = args[_g12];
						++_g12;
						if(first) first = false; else this.buf.add(", ");
						this.addValue(e5,tabs);
					}
					this.buf.add(")");
				}
				break;
			case 9:
				var regs = _g[3];
				var e7 = _g[2];
				var _g13 = e7.t;
				switch(_g13[1]) {
				case 3:
					var _g21 = 0;
					while(_g21 < regs.length) {
						var r = regs[_g21];
						++_g21;
						if(r != hxsl.Component.X) throw "assert";
					}
					var _g22 = regs.length;
					switch(_g22) {
					case 1:
						this.addValue(e7,tabs);
						break;
					case 2:
						this.decl("vec2 _vec2( float v ) { return vec2(v,v); }");
						this.buf.add("_vec2(");
						this.addValue(e7,tabs);
						this.buf.add(")");
						break;
					case 3:
						this.decl("vec3 _vec3( float v ) { return vec3(v,v,v); }");
						this.buf.add("_vec3(");
						this.addValue(e7,tabs);
						this.buf.add(")");
						break;
					case 4:
						this.decl("vec4 _vec4( float v ) { return vec4(v,v,v,v); }");
						this.buf.add("_vec4(");
						this.addValue(e7,tabs);
						this.buf.add(")");
						break;
					default:
						throw "assert";
					}
					break;
				default:
					this.addValue(e7,tabs);
					this.buf.add(".");
					var _g23 = 0;
					while(_g23 < regs.length) {
						var r1 = regs[_g23];
						++_g23;
						this.buf.add((function($this) {
							var $r;
							switch(r1[1]) {
							case 0:
								$r = "x";
								break;
							case 1:
								$r = "y";
								break;
							case 2:
								$r = "z";
								break;
							case 3:
								$r = "w";
								break;
							}
							return $r;
						}(this)));
					}
				}
				break;
			case 10:
				var eelse = _g[4];
				var eif = _g[3];
				var econd = _g[2];
				this.buf.add("if( ");
				this.addValue(econd,tabs);
				this.buf.add(") ");
				this.addExpr(eif,tabs);
				if(eelse != null) {
					this.buf.add(" else ");
					this.addExpr(eelse,tabs);
				}
				break;
			case 11:
				this.buf.add("discard");
				break;
			case 12:
				var e8 = _g[2];
				if(e8 == null) this.buf.add("return"); else {
					this.buf.add("return ");
					this.addValue(e8,tabs);
				}
				break;
			case 13:
				var loop = _g[4];
				var it = _g[3];
				var v4 = _g[2];
				this.buf.add("for(...)");
				break;
			case 14:
				this.buf.add("continue");
				break;
			case 15:
				this.buf.add("break");
				break;
			case 16:
				var index = _g[3];
				var e9 = _g[2];
				this.addValue(e9,tabs);
				this.buf.add("[");
				this.addValue(index,tabs);
				this.buf.add("]");
				break;
			case 17:
				var el1 = _g[2];
				this.buf.add("[");
				var first1 = true;
				var _g14 = 0;
				while(_g14 < el1.length) {
					var e10 = el1[_g14];
					++_g14;
					if(first1) first1 = false; else this.buf.add(", ");
					this.addValue(e10,tabs);
				}
				this.buf.add("]");
				break;
			}
		}
	}
	,varName: function(v) {
		if(v.kind == hxsl.VarKind.Output) if(this.isVertex) return "gl_Position"; else return "gl_FragColor";
		var n = this.varNames.get(v.id);
		if(n != null) return n;
		n = v.name;
		if(hxsl.GlslOut.KWDS.exists(n)) n = "_" + n;
		if(this.allNames.exists(n)) {
			var k = 2;
			n += "_";
			while(this.allNames.exists(n + k)) k++;
			n += k;
		}
		this.varNames.set(v.id,n);
		this.allNames.set(n,v.id);
		return n;
	}
	,run: function(s) {
		this.locals = [];
		this.decls = [];
		this.buf = new StringBuf();
		this.exprValues = [];
		this.decls.push("precision mediump float;");
		if(s.funs.length != 1) throw "assert";
		var f = s.funs[0];
		this.isVertex = f.kind == hxsl.FunctionKind.Vertex;
		var _g = 0;
		var _g1 = s.vars;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			var _g2 = v.kind;
			switch(_g2[1]) {
			case 2:case 0:
				this.buf.add("uniform ");
				break;
			case 1:
				this.buf.add("attribute ");
				break;
			case 3:
				this.buf.add("varying ");
				break;
			case 6:case 5:
				continue;
				break;
			case 4:
				break;
			}
			if(v.qualifiers != null) {
				var _g21 = 0;
				var _g3 = v.qualifiers;
				while(_g21 < _g3.length) {
					var q = _g3[_g21];
					++_g21;
					switch(q[1]) {
					case 6:
						var p = q[2];
						switch(p[1]) {
						case 0:
							this.buf.add("lowp ");
							break;
						case 1:
							this.buf.add("mediump ");
							break;
						case 2:
							this.buf.add("highp ");
							break;
						}
						break;
					default:
					}
				}
			}
			this.addVar(v);
			this.buf.add(";\n");
		}
		this.buf.add("\n");
		var tmp = this.buf;
		this.buf = new StringBuf();
		this.buf.add("void main(void) {\n");
		{
			var _g4 = f.expr.e;
			switch(_g4[1]) {
			case 4:
				var el = _g4[2];
				var _g11 = 0;
				while(_g11 < el.length) {
					var e = el[_g11];
					++_g11;
					this.buf.add("\t");
					this.addExpr(e,"\t");
					this.buf.add(";\n");
				}
				break;
			default:
				this.addExpr(f.expr,"");
			}
		}
		this.buf.add("}");
		this.exprValues.push(this.buf.b);
		this.buf = tmp;
		var _g5 = 0;
		var _g12 = this.locals;
		while(_g5 < _g12.length) {
			var v1 = _g12[_g5];
			++_g5;
			this.addVar(v1);
			this.buf.add(";\n");
		}
		this.buf.add("\n");
		var _g6 = 0;
		var _g13 = this.exprValues;
		while(_g6 < _g13.length) {
			var e1 = _g13[_g6];
			++_g6;
			this.buf.add(e1);
			this.buf.add("\n\n");
		}
		this.decls.push(this.buf.b);
		this.buf = null;
		return this.decls.join("\n");
	}
	,__class__: hxsl.GlslOut
};
hxsl._Linker = {};
hxsl._Linker.AllocatedVar = function() {
};
$hxClasses["hxsl._Linker.AllocatedVar"] = hxsl._Linker.AllocatedVar;
hxsl._Linker.AllocatedVar.__name__ = ["hxsl","_Linker","AllocatedVar"];
hxsl._Linker.AllocatedVar.prototype = {
	__class__: hxsl._Linker.AllocatedVar
};
hxsl._Linker.ShaderInfos = function(n,v) {
	this.name = n;
	this.vertex = v;
	this.processed = new haxe.ds.IntMap();
	this.usedFunctions = [];
	this.read = new haxe.ds.IntMap();
	this.write = new haxe.ds.IntMap();
};
$hxClasses["hxsl._Linker.ShaderInfos"] = hxsl._Linker.ShaderInfos;
hxsl._Linker.ShaderInfos.__name__ = ["hxsl","_Linker","ShaderInfos"];
hxsl._Linker.ShaderInfos.prototype = {
	__class__: hxsl._Linker.ShaderInfos
};
hxsl.Linker = function() {
};
$hxClasses["hxsl.Linker"] = hxsl.Linker;
hxsl.Linker.__name__ = ["hxsl","Linker"];
hxsl.Linker.prototype = {
	error: function(msg,p) {
		return hxsl.Error.t(msg,p);
	}
	,mergeVar: function(path,v,v2,p) {
		var _g = v.kind;
		switch(_g[1]) {
		case 0:case 1:case 3:case 4:case 5:
			break;
		case 2:case 6:
			throw "assert";
			break;
		}
		if(v.kind != v2.kind && v.kind != hxsl.VarKind.Local && v2.kind != hxsl.VarKind.Local) this.error("'" + path + "' kind does not match : " + Std.string(v.kind) + " should be " + Std.string(v2.kind),p);
		{
			var _g1 = v.type;
			var _g11 = v2.type;
			switch(_g1[1]) {
			case 12:
				switch(_g11[1]) {
				case 12:
					var fl1 = _g1[2];
					var fl2 = _g11[2];
					var _g2 = 0;
					while(_g2 < fl1.length) {
						var f1 = fl1[_g2];
						++_g2;
						var ft = null;
						var _g3 = 0;
						while(_g3 < fl2.length) {
							var f2 = fl2[_g3];
							++_g3;
							if(f1.name == f2.name) {
								ft = f2;
								break;
							}
						}
						if(ft == null) fl2.push(f1); else this.mergeVar(path + "." + ft.name,f1,ft,p);
					}
					break;
				default:
					if(!Type.enumEq(v.type,v2.type)) this.error("'" + path + "' type does not match : " + hxsl.Tools.toString(v.type) + " should be " + hxsl.Tools.toString(v2.type),p);
				}
				break;
			default:
				if(!Type.enumEq(v.type,v2.type)) this.error("'" + path + "' type does not match : " + hxsl.Tools.toString(v.type) + " should be " + hxsl.Tools.toString(v2.type),p);
			}
		}
	}
	,allocVar: function(v,p,path,parent) {
		if(v.parent != null && parent == null) {
			parent = this.allocVar(v.parent,p);
			var p1 = parent.v;
			path = p1.name;
			p1 = p1.parent;
			while(p1 != null) {
				path = p1.name + "." + path;
				p1 = p1.parent;
			}
		}
		var key;
		if(path == null) key = v.name; else key = path + "." + v.name;
		if(v.qualifiers != null) {
			var _g = 0;
			var _g1 = v.qualifiers;
			while(_g < _g1.length) {
				var q = _g1[_g];
				++_g;
				switch(q[1]) {
				case 4:
					var n = q[2];
					key = n;
					break;
				default:
				}
			}
		}
		var v2 = this.varMap.get(key);
		var vname = v.name;
		if(v2 != null) {
			var _g2 = 0;
			var _g11 = v2.merged;
			while(_g2 < _g11.length) {
				var vm = _g11[_g2];
				++_g2;
				if(vm == v) return v2;
			}
			if(v.kind == hxsl.VarKind.Param && !hxsl.Tools.hasQualifier(v,hxsl.VarQualifier.Shared) || v.kind == hxsl.VarKind.Function || v.kind == hxsl.VarKind.Var && hxsl.Tools.hasQualifier(v,hxsl.VarQualifier.Private) || (function($this) {
				var $r;
				var v1 = v2.v;
				$r = v1.kind == hxsl.VarKind.Param && !hxsl.Tools.hasQualifier(v1,hxsl.VarQualifier.Shared) || v1.kind == hxsl.VarKind.Function || v1.kind == hxsl.VarKind.Var && hxsl.Tools.hasQualifier(v1,hxsl.VarQualifier.Private);
				return $r;
			}(this)) || v.kind == hxsl.VarKind.Param && v2.v.kind == hxsl.VarKind.Param) {
				var k = 2;
				while(true) {
					var a = this.varMap.get(key + k);
					if(a == null) break;
					var _g3 = 0;
					var _g12 = a.merged;
					while(_g3 < _g12.length) {
						var vm1 = _g12[_g3];
						++_g3;
						if(vm1 == v) return a;
					}
					k++;
				}
				vname += k;
				key += k;
			} else {
				this.mergeVar(key,v,v2.v,p);
				v2.merged.push(v);
				this.varIdMap.set(v.id,v2.id);
				return v2;
			}
		}
		var vid = this.allVars.length + 1;
		var v21 = { id : vid, name : vname, type : v.type, kind : v.kind == hxsl.VarKind.Output?hxsl.VarKind.Local:v.kind, qualifiers : v.qualifiers, parent : parent == null?null:parent.v};
		var a1 = new hxsl._Linker.AllocatedVar();
		a1.v = v21;
		a1.merged = [v];
		a1.path = key;
		a1.id = vid;
		a1.parent = parent;
		a1.instanceIndex = this.curInstance;
		this.allVars.push(a1);
		this.varMap.set(key,a1);
		{
			var _g4 = v21.type;
			switch(_g4[1]) {
			case 12:
				var vl = _g4[2];
				v21.type = hxsl.Type.TStruct((function($this) {
					var $r;
					var _g13 = [];
					{
						var _g21 = 0;
						while(_g21 < vl.length) {
							var v3 = vl[_g21];
							++_g21;
							_g13.push($this.allocVar(v3,p,key,a1).v);
						}
					}
					$r = _g13;
					return $r;
				}(this)));
				break;
			default:
			}
		}
		return a1;
	}
	,mapExprVar: function(e) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 1:
				var v = _g[2];
				if(!this.locals.exists(v.id)) {
					var v1 = this.allocVar(v,e.p);
					if(this.curShader != null && !this.curShader.write.exists(v1.id)) {
						this.curShader.read.set(v1.id,v1);
						if(this.curShader.vertex == null && v1.v.kind == hxsl.VarKind.Var) this.curShader.vertex = false;
					}
					return { e : hxsl.TExprDef.TVar(v1.v), t : v1.v.type, p : e.p};
				} else {
				}
				break;
			case 5:
				var e2 = _g[4];
				var e1 = _g[3];
				var op = _g[2];
				{
					var _g1 = e1.e;
					switch(op[1]) {
					case 4:
						switch(_g1[1]) {
						case 1:
							var v2 = _g1[2];
							if(!this.locals.exists(v2.id)) {
								var e21 = this.mapExprVar(e2);
								var v3 = this.allocVar(v2,e1.p);
								if(this.curShader != null) this.curShader.write.set(v3.id,v3);
								return { e : hxsl.TExprDef.TBinop(op,{ e : hxsl.TExprDef.TVar(v3.v), t : v3.v.type, p : e.p},e21), t : e.t, p : e.p};
							} else {
								var v4 = _g1[2];
								if(!this.locals.exists(v4.id)) {
									var e11 = this.mapExprVar(e1);
									var e22 = this.mapExprVar(e2);
									var v5 = this.allocVar(v4,e11.p);
									if(this.curShader != null) this.curShader.write.set(v5.id,v5);
									return { e : hxsl.TExprDef.TBinop(op,e11,e22), t : e.t, p : e.p};
								} else {
								}
							}
							break;
						case 9:
							switch(_g1[2].e[1]) {
							case 1:
								var v4 = _g1[2].e[2];
								if(!this.locals.exists(v4.id)) {
									var e11 = this.mapExprVar(e1);
									var e22 = this.mapExprVar(e2);
									var v5 = this.allocVar(v4,e11.p);
									if(this.curShader != null) this.curShader.write.set(v5.id,v5);
									return { e : hxsl.TExprDef.TBinop(op,e11,e22), t : e.t, p : e.p};
								} else {
								}
								break;
							default:
							}
							break;
						default:
						}
						break;
					case 20:
						switch(_g1[1]) {
						case 1:
							var v4 = _g1[2];
							if(!this.locals.exists(v4.id)) {
								var e11 = this.mapExprVar(e1);
								var e22 = this.mapExprVar(e2);
								var v5 = this.allocVar(v4,e11.p);
								if(this.curShader != null) this.curShader.write.set(v5.id,v5);
								return { e : hxsl.TExprDef.TBinop(op,e11,e22), t : e.t, p : e.p};
							} else {
							}
							break;
						case 9:
							switch(_g1[2].e[1]) {
							case 1:
								var v4 = _g1[2].e[2];
								if(!this.locals.exists(v4.id)) {
									var e11 = this.mapExprVar(e1);
									var e22 = this.mapExprVar(e2);
									var v5 = this.allocVar(v4,e11.p);
									if(this.curShader != null) this.curShader.write.set(v5.id,v5);
									return { e : hxsl.TExprDef.TBinop(op,e11,e22), t : e.t, p : e.p};
								} else {
								}
								break;
							default:
							}
							break;
						default:
						}
						break;
					default:
					}
				}
				break;
			case 11:
				if(this.curShader != null) {
					this.curShader.vertex = false;
					this.curShader.hasDiscard = true;
				}
				break;
			case 7:
				var v6 = _g[2];
				this.locals.set(v6.id,true);
				break;
			default:
			}
		}
		return hxsl.Tools.map(e,$bind(this,this.mapExprVar));
	}
	,addShader: function(name,vertex,e,p) {
		var s = new hxsl._Linker.ShaderInfos(name,vertex);
		this.curShader = s;
		s.priority = p;
		s.body = this.mapExprVar(e);
		this.shaders.push(s);
		this.curShader = null;
		return s;
	}
	,sortByPriorityDesc: function(s1,s2) {
		return s2.priority - s1.priority;
	}
	,buildDependency: function(parent,v,isWritten) {
		var found = !isWritten;
		var _g = 0;
		var _g1 = this.shaders;
		while(_g < _g1.length) {
			var s = _g1[_g];
			++_g;
			if(parent == s) {
				found = true;
				continue;
			} else if(!found) continue;
			if(!s.write.exists(v.id)) continue;
			if(parent.vertex && s.vertex == false) continue;
			parent.deps.set(s,true);
			this.initDependencies(s);
			if(!s.read.exists(v.id)) return;
		}
		if(v.v.kind == hxsl.VarKind.Var) this.error("Variable " + v.path + " required by " + parent.name + " is missing initializer",null);
	}
	,initDependencies: function(s) {
		if(s.deps != null) return;
		s.deps = new haxe.ds.ObjectMap();
		var $it0 = s.read.iterator();
		while( $it0.hasNext() ) {
			var r = $it0.next();
			this.buildDependency(s,r,s.write.exists(r.id));
		}
		if(s.vertex == null) {
			var $it1 = s.deps.keys();
			while( $it1.hasNext() ) {
				var d = $it1.next();
				if(d.vertex == false) {
					s.vertex = false;
					break;
				}
			}
		}
	}
	,collect: function(cur,out,vertex) {
		if(cur.onStack) this.error("Loop in shader dependencies (" + cur.name + ")",null);
		if(cur.marked == vertex) return;
		cur.marked = vertex;
		cur.onStack = true;
		var deps;
		var _g = [];
		var $it0 = cur.deps.keys();
		while( $it0.hasNext() ) {
			var d = $it0.next();
			_g.push(d);
		}
		deps = _g;
		deps.sort($bind(this,this.sortByPriorityDesc));
		var _g1 = 0;
		while(_g1 < deps.length) {
			var d1 = deps[_g1];
			++_g1;
			this.collect(d1,out,vertex);
		}
		if(cur.vertex == null) cur.vertex = vertex;
		if(cur.vertex == vertex) out.push(cur);
		cur.onStack = false;
	}
	,uniqueLocals: function(expr,locals) {
		{
			var _g = expr.e;
			switch(_g[1]) {
			case 7:
				var v = _g[2];
				if(locals.exists(v.name)) {
					var k = 2;
					while(locals.exists(v.name + k)) k++;
					v.name += k;
				}
				locals.set(v.name,true);
				break;
			case 4:
				var el = _g[2];
				var locals1;
				var _g1 = new haxe.ds.StringMap();
				var $it0 = locals.keys();
				while( $it0.hasNext() ) {
					var k1 = $it0.next();
					_g1.set(k1,true);
				}
				locals1 = _g1;
				var _g2 = 0;
				while(_g2 < el.length) {
					var e = el[_g2];
					++_g2;
					this.uniqueLocals(e,locals1);
				}
				break;
			default:
				hxsl.Tools.iter(expr,(function(f,a2) {
					return function(a1) {
						return f(a1,a2);
					};
				})($bind(this,this.uniqueLocals),locals));
			}
		}
	}
	,link: function(shadersData,outVars) {
		var _g1 = this;
		this.varMap = new haxe.ds.StringMap();
		this.varIdMap = new haxe.ds.IntMap();
		this.allVars = new Array();
		this.shaders = [];
		this.locals = new haxe.ds.IntMap();
		var dupShaders = new haxe.ds.ObjectMap();
		var _g = [];
		var _g11 = 0;
		while(_g11 < shadersData.length) {
			var s = shadersData[_g11];
			++_g11;
			_g.push((function($this) {
				var $r;
				var s1 = s;
				var sreal = s1;
				if(dupShaders.h.__keys__[s1.__id__] != null) s1 = hxsl.Clone.shaderData(s1);
				dupShaders.set(s1,sreal);
				$r = s1;
				return $r;
			}(this)));
		}
		shadersData = _g;
		this.curInstance = 0;
		var _g12 = 0;
		while(_g12 < shadersData.length) {
			var s2 = shadersData[_g12];
			++_g12;
			var _g2 = 0;
			var _g3 = s2.vars;
			while(_g2 < _g3.length) {
				var v = _g3[_g2];
				++_g2;
				this.allocVar(v,null);
			}
			var _g21 = 0;
			var _g31 = s2.funs;
			while(_g21 < _g31.length) {
				var f = _g31[_g21];
				++_g21;
				var v1 = this.allocVar(f.ref,f.expr.p);
				v1.kind = f.kind;
			}
			this.curInstance++;
		}
		var priority = 0;
		var _g13 = 0;
		while(_g13 < shadersData.length) {
			var s3 = shadersData[_g13];
			++_g13;
			var _g22 = 0;
			var _g32 = s3.funs;
			while(_g22 < _g32.length) {
				var f1 = _g32[_g22];
				++_g22;
				var v2 = this.allocVar(f1.ref,f1.expr.p);
				if(v2.kind == null) throw "assert";
				var _g4 = v2.kind;
				switch(_g4[1]) {
				case 0:case 1:
					this.addShader(s3.name + "." + (v2.kind == hxsl.FunctionKind.Vertex?"vertex":"fragment"),v2.kind == hxsl.FunctionKind.Vertex,f1.expr,priority);
					break;
				case 2:
					{
						var _g5 = f1.expr.e;
						switch(_g5[1]) {
						case 4:
							var el = _g5[2];
							var index = 0;
							var priority1 = -el.length;
							var _g6 = 0;
							while(_g6 < el.length) {
								var e = el[_g6];
								++_g6;
								this.addShader(s3.name + ".__init__" + index++,null,e,priority1++);
							}
							break;
						default:
							this.addShader(s3.name + ".__init__",null,f1.expr,-1);
						}
					}
					break;
				case 3:
					throw "Unexpected helper function in linker " + v2.v.name;
					break;
				}
			}
			priority++;
		}
		this.shaders.sort($bind(this,this.sortByPriorityDesc));
		var entry = new hxsl._Linker.ShaderInfos("<entry>",false);
		entry.deps = new haxe.ds.ObjectMap();
		var _g14 = 0;
		while(_g14 < outVars.length) {
			var outVar = outVars[_g14];
			++_g14;
			var v3 = this.varMap.get(outVar);
			if(v3 == null) throw "Variable not found " + outVar;
			v3.v.kind = hxsl.VarKind.Output;
			this.buildDependency(entry,v3,false);
		}
		var _g15 = 0;
		var _g23 = this.shaders;
		while(_g15 < _g23.length) {
			var s4 = _g23[_g15];
			++_g15;
			if(s4.hasDiscard) {
				this.initDependencies(s4);
				entry.deps.set(s4,true);
			}
		}
		var v4 = [];
		var f2 = [];
		this.collect(entry,v4,true);
		this.collect(entry,f2,false);
		if(f2.pop() != entry) throw "assert";
		var _g16 = 0;
		var _g24 = this.shaders;
		while(_g16 < _g24.length) {
			var s5 = _g24[_g16];
			++_g16;
			s5.marked = null;
		}
		var _g17 = 0;
		var _g25 = v4.concat(f2);
		while(_g17 < _g25.length) {
			var s6 = _g25[_g17];
			++_g17;
			var $it0 = s6.deps.keys();
			while( $it0.hasNext() ) {
				var d = $it0.next();
				if(d.marked == null) this.error(d.name + " needed by " + s6.name + " is unreachable",null);
			}
			s6.marked = true;
		}
		var outVars1 = [];
		var varMap = new haxe.ds.IntMap();
		var addVar;
		var addVar1 = null;
		addVar1 = function(v5) {
			if(varMap.exists(v5.id)) return;
			varMap.set(v5.id,true);
			if(v5.v.parent != null) addVar1(v5.parent); else outVars1.push(v5.v);
		};
		addVar = addVar1;
		var _g18 = 0;
		var _g26 = v4.concat(f2);
		while(_g18 < _g26.length) {
			var s7 = _g26[_g18];
			++_g18;
			var $it1 = s7.read.iterator();
			while( $it1.hasNext() ) {
				var v6 = $it1.next();
				addVar(v6);
			}
			var $it2 = s7.write.iterator();
			while( $it2.hasNext() ) {
				var v7 = $it2.next();
				addVar(v7);
			}
		}
		var cleanVar;
		var cleanVar1 = null;
		cleanVar1 = function(v8) {
			{
				var _g19 = v8.type;
				switch(_g19[1]) {
				case 12:
					var vl = _g19[2];
					if(v8.kind != hxsl.VarKind.Input) {
						var vout = [];
						var _g27 = 0;
						while(_g27 < vl.length) {
							var v9 = vl[_g27];
							++_g27;
							if(varMap.exists(v9.id)) {
								cleanVar1(v9);
								vout.push(v9);
							}
						}
						v8.type = hxsl.Type.TStruct(vout);
					} else {
					}
					break;
				default:
				}
			}
		};
		cleanVar = cleanVar1;
		var _g110 = 0;
		while(_g110 < outVars1.length) {
			var v10 = outVars1[_g110];
			++_g110;
			cleanVar(v10);
		}
		var build = function(kind,name,a) {
			var v11 = { id : hxsl.Tools.allocVarId(), name : name, type : hxsl.Type.TFun([{ ret : hxsl.Type.TVoid, args : []}]), kind : hxsl.VarKind.Function};
			outVars1.push(v11);
			var exprs = [];
			var _g111 = 0;
			while(_g111 < a.length) {
				var s8 = a[_g111];
				++_g111;
				{
					var _g28 = s8.body.e;
					switch(_g28[1]) {
					case 4:
						var el1 = _g28[2];
						var _g33 = 0;
						while(_g33 < el1.length) {
							var e1 = el1[_g33];
							++_g33;
							exprs.push(e1);
						}
						break;
					default:
						exprs.push(s8.body);
					}
				}
			}
			var expr = { e : hxsl.TExprDef.TBlock(exprs), t : hxsl.Type.TVoid, p : exprs.length == 0?null:exprs[0].p};
			_g1.uniqueLocals(expr,new haxe.ds.StringMap());
			return { kind : kind, ref : v11, ret : hxsl.Type.TVoid, args : [], expr : expr};
		};
		var funs = [build(hxsl.FunctionKind.Vertex,"vertex",v4),build(hxsl.FunctionKind.Fragment,"fragment",f2)];
		var $it3 = dupShaders.keys();
		while( $it3.hasNext() ) {
			var s9 = $it3.next();
			var sreal1 = dupShaders.h[s9.__id__];
			if(s9 == sreal1) continue;
			var _g29 = 0;
			var _g112 = s9.vars.length;
			while(_g29 < _g112) {
				var i = _g29++;
				this.allocVar(s9.vars[i],null).merged.unshift(sreal1.vars[i]);
			}
		}
		return { name : "out", vars : outVars1, funs : funs};
	}
	,__class__: hxsl.Linker
};
hxsl.Printer = function(varId) {
	if(varId == null) varId = false;
	this.varId = varId;
};
$hxClasses["hxsl.Printer"] = hxsl.Printer;
hxsl.Printer.__name__ = ["hxsl","Printer"];
hxsl.Printer.opStr = function(op) {
	switch(op[1]) {
	case 0:
		return "+";
	case 3:
		return "-";
	case 1:
		return "*";
	case 2:
		return "/";
	case 19:
		return "%";
	case 5:
		return "==";
	case 6:
		return "!=";
	case 7:
		return ">";
	case 9:
		return "<";
	case 8:
		return ">=";
	case 10:
		return "<=";
	case 13:
		return "^";
	case 12:
		return "|";
	case 11:
		return "&";
	case 16:
		return "<<";
	case 17:
		return ">>";
	case 18:
		return ">>>";
	case 14:
		return "&&";
	case 15:
		return "||";
	case 4:
		return "=";
	case 20:
		var op1 = op[2];
		return hxsl.Printer.opStr(op1) + "=";
	case 22:
		return "=>";
	case 21:
		return "...";
	}
};
hxsl.Printer.shaderToString = function(s,varId) {
	if(varId == null) varId = false;
	return new hxsl.Printer(varId).shaderString(s);
};
hxsl.Printer.prototype = {
	add: function(v) {
		this.buffer.add(v);
	}
	,shaderString: function(s) {
		this.buffer = new StringBuf();
		var _g = 0;
		var _g1 = s.vars;
		while(_g < _g1.length) {
			var v = _g1[_g];
			++_g;
			this.addVar(v,hxsl.VarKind.Var);
			this.buffer.add(";\n");
		}
		if(s.vars.length > 0) this.buffer.add("\n");
		var _g2 = 0;
		var _g11 = s.funs;
		while(_g2 < _g11.length) {
			var f = _g11[_g2];
			++_g2;
			this.addFun(f);
			this.buffer.add("\n\n");
		}
		return this.buffer.b;
	}
	,exprString: function(e) {
		this.buffer = new StringBuf();
		this.addExpr(e,"");
		return this.buffer.b;
	}
	,addVar: function(v,defKind,tabs,parent) {
		if(tabs == null) tabs = "";
		if(v.qualifiers != null) {
			var _g = 0;
			var _g1 = v.qualifiers;
			while(_g < _g1.length) {
				var q = _g1[_g];
				++_g;
				this.add("@" + (function($this) {
					var $r;
					switch(q[1]) {
					case 0:
						$r = (function($this) {
							var $r;
							var max = q[2];
							$r = "const" + (max == null?"":"(" + max + ")");
							return $r;
						}($this));
						break;
					case 1:
						$r = "private";
						break;
					case 2:
						$r = "nullable";
						break;
					case 3:
						$r = "perObject";
						break;
					case 4:
						$r = (function($this) {
							var $r;
							var n = q[2];
							$r = "name('" + n + "')";
							return $r;
						}($this));
						break;
					case 5:
						$r = "shared";
						break;
					case 6:
						$r = (function($this) {
							var $r;
							var p = q[2];
							$r = Std.string(p).toLowerCase() + "p";
							return $r;
						}($this));
						break;
					}
					return $r;
				}(this)) + " ");
			}
		}
		if(v.kind != defKind) {
			var _g2 = v.kind;
			switch(_g2[1]) {
			case 4:
				this.buffer.add("@local ");
				break;
			case 0:
				this.buffer.add("@global ");
				break;
			case 3:
				this.buffer.add("@var ");
				break;
			case 2:
				this.buffer.add("@param ");
				break;
			case 1:
				this.buffer.add("@input ");
				break;
			case 6:
				this.buffer.add("@function ");
				break;
			case 5:
				this.buffer.add("@output ");
				break;
			}
		}
		this.buffer.add("var ");
		if(v.parent == parent) this.buffer.add(v.name + (this.varId?"@" + v.id:"")); else this.addVarName(v);
		this.buffer.add(" : ");
		{
			var _g3 = v.type;
			switch(_g3[1]) {
			case 12:
				var vl = _g3[2];
				this.buffer.add("{");
				var first = true;
				var _g11 = 0;
				while(_g11 < vl.length) {
					var v1 = vl[_g11];
					++_g11;
					if(first) first = false; else this.buffer.add(", ");
					this.addVar(v1,v1.kind,tabs,v1);
				}
				this.buffer.add("}");
				break;
			default:
				this.add(hxsl.Tools.toString(v.type));
			}
		}
	}
	,addFun: function(f) {
		this.buffer.add("function " + f.ref.name + "(");
		var first = true;
		var _g = 0;
		var _g1 = f.args;
		while(_g < _g1.length) {
			var a = _g1[_g];
			++_g;
			if(first) {
				this.buffer.add(" ");
				first = false;
			} else this.buffer.add(", ");
			this.addVar(a,hxsl.VarKind.Local);
		}
		if(f.args.length > 0) this.buffer.add(" ");
		this.add(") : " + hxsl.Tools.toString(f.ret) + " ");
		this.addExpr(f.expr,"");
	}
	,addVarName: function(v) {
		if(v.parent != null) {
			this.addVarName(v.parent);
			this.buffer.add(".");
		}
		this.buffer.add(v.name);
		if(this.varId) this.buffer.add("@" + v.id);
	}
	,addExpr: function(e,tabs) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 1:
				var v = _g[2];
				this.addVarName(v);
				break;
			case 7:
				var init = _g[3];
				var v1 = _g[2];
				this.addVar(v1,hxsl.VarKind.Local,tabs);
				if(init != null) {
					this.buffer.add(" = ");
					this.addExpr(init,tabs);
				}
				break;
			case 9:
				var regs = _g[3];
				var e1 = _g[2];
				this.addExpr(e1,tabs);
				this.buffer.add(".");
				var _g1 = 0;
				while(_g1 < regs.length) {
					var r = regs[_g1];
					++_g1;
					this.add(Std.string(r).toLowerCase());
				}
				break;
			case 12:
				var e2 = _g[2];
				this.buffer.add("return");
				if(e2 != null) {
					this.buffer.add(" ");
					this.addExpr(e2,tabs);
				}
				break;
			case 10:
				var eelse = _g[4];
				var eif = _g[3];
				var cond = _g[2];
				this.buffer.add("if( ");
				this.addExpr(cond,tabs);
				this.buffer.add(" ) ");
				this.addExpr(eif,tabs);
				if(eelse != null) {
					this.buffer.add(" else ");
					this.addExpr(eelse,tabs);
				}
				break;
			case 2:
				var g = _g[2];
				this.add(hxsl.Tools2.toString(g));
				break;
			case 8:
				var el = _g[3];
				var e3 = _g[2];
				this.addExpr(e3,tabs);
				this.buffer.add("(");
				var first = true;
				var _g11 = 0;
				while(_g11 < el.length) {
					var e4 = el[_g11];
					++_g11;
					if(first) first = false; else this.buffer.add(", ");
					this.addExpr(e4,tabs);
				}
				this.buffer.add(")");
				break;
			case 13:
				var loop = _g[4];
				var it = _g[3];
				var v2 = _g[2];
				this.buffer.add("for( " + v2.name + " in ");
				this.addExpr(it,tabs);
				this.buffer.add(") ");
				this.addExpr(loop,tabs);
				break;
			case 14:
				this.buffer.add("continue");
				break;
			case 15:
				this.buffer.add("break");
				break;
			case 11:
				this.buffer.add("discard");
				break;
			case 4:
				var el1 = _g[2];
				this.buffer.add("{");
				tabs += "\t";
				var _g12 = 0;
				while(_g12 < el1.length) {
					var e5 = el1[_g12];
					++_g12;
					this.buffer.add("\n" + tabs);
					this.addExpr(e5,tabs);
					this.buffer.add(";");
				}
				tabs = HxOverrides.substr(tabs,1,null);
				if(el1.length > 0) this.buffer.add("\n" + tabs);
				this.buffer.add("}");
				break;
			case 6:
				var e6 = _g[3];
				var op = _g[2];
				this.buffer.add((function($this) {
					var $r;
					switch(op[1]) {
					case 2:
						$r = "!";
						break;
					case 3:
						$r = "-";
						break;
					case 4:
						$r = "~";
						break;
					case 0:
						$r = "++";
						break;
					case 1:
						$r = "--";
						break;
					}
					return $r;
				}(this)));
				this.addExpr(e6,tabs);
				break;
			case 5:
				var e21 = _g[4];
				var e11 = _g[3];
				var op1 = _g[2];
				this.addExpr(e11,tabs);
				this.add(" " + hxsl.Printer.opStr(op1) + " ");
				this.addExpr(e21,tabs);
				break;
			case 16:
				var e22 = _g[3];
				var e12 = _g[2];
				this.addExpr(e12,tabs);
				this.buffer.add("[");
				this.addExpr(e22,tabs);
				this.buffer.add("]");
				break;
			case 3:
				var e7 = _g[2];
				this.buffer.add("(");
				this.addExpr(e7,tabs);
				this.buffer.add(")");
				break;
			case 0:
				var c = _g[2];
				this.buffer.add((function($this) {
					var $r;
					switch(c[1]) {
					case 0:
						$r = "null";
						break;
					case 1:
						$r = (function($this) {
							var $r;
							var b = c[2];
							$r = b;
							return $r;
						}($this));
						break;
					case 2:
						$r = (function($this) {
							var $r;
							var i = c[2];
							$r = i;
							return $r;
						}($this));
						break;
					case 3:
						$r = (function($this) {
							var $r;
							var f = c[2];
							$r = f;
							return $r;
						}($this));
						break;
					case 4:
						$r = (function($this) {
							var $r;
							var s = c[2];
							$r = "\"" + s + "\"";
							return $r;
						}($this));
						break;
					}
					return $r;
				}(this)));
				break;
			case 17:
				var el2 = _g[2];
				this.buffer.add("[");
				var first1 = true;
				var _g13 = 0;
				while(_g13 < el2.length) {
					var e8 = el2[_g13];
					++_g13;
					if(first1) first1 = false; else this.buffer.add(", ");
					this.addExpr(e8,tabs);
				}
				this.buffer.add("]");
				break;
			}
		}
	}
	,__class__: hxsl.Printer
};
hxsl.AllocParam = function(name,pos,instance,index,type) {
	this.name = name;
	this.pos = pos;
	this.instance = instance;
	this.index = index;
	this.type = type;
};
$hxClasses["hxsl.AllocParam"] = hxsl.AllocParam;
hxsl.AllocParam.__name__ = ["hxsl","AllocParam"];
hxsl.AllocParam.prototype = {
	__class__: hxsl.AllocParam
};
hxsl.AllocGlobal = function(pos,path,type) {
	this.pos = pos;
	this.path = path;
	this.gid = hxsl.Globals.allocID(path);
	this.type = type;
};
$hxClasses["hxsl.AllocGlobal"] = hxsl.AllocGlobal;
hxsl.AllocGlobal.__name__ = ["hxsl","AllocGlobal"];
hxsl.AllocGlobal.prototype = {
	__class__: hxsl.AllocGlobal
};
hxsl.RuntimeShaderData = function() {
};
$hxClasses["hxsl.RuntimeShaderData"] = hxsl.RuntimeShaderData;
hxsl.RuntimeShaderData.__name__ = ["hxsl","RuntimeShaderData"];
hxsl.RuntimeShaderData.prototype = {
	__class__: hxsl.RuntimeShaderData
};
hxsl.RuntimeShader = function() {
	this.id = hxsl.RuntimeShader.UID++;
};
$hxClasses["hxsl.RuntimeShader"] = hxsl.RuntimeShader;
hxsl.RuntimeShader.__name__ = ["hxsl","RuntimeShader"];
hxsl.RuntimeShader.prototype = {
	__class__: hxsl.RuntimeShader
};
hxsl.ShaderList = function(s,n) {
	this.s = s;
	this.next = n;
};
$hxClasses["hxsl.ShaderList"] = hxsl.ShaderList;
hxsl.ShaderList.__name__ = ["hxsl","ShaderList"];
hxsl.ShaderList.prototype = {
	__class__: hxsl.ShaderList
};
hxsl._ShaderList = {};
hxsl._ShaderList.ShaderIterator = function(l) {
	this.l = l;
};
$hxClasses["hxsl._ShaderList.ShaderIterator"] = hxsl._ShaderList.ShaderIterator;
hxsl._ShaderList.ShaderIterator.__name__ = ["hxsl","_ShaderList","ShaderIterator"];
hxsl._ShaderList.ShaderIterator.prototype = {
	hasNext: function() {
		return this.l != null;
	}
	,next: function() {
		var s = this.l.s;
		this.l = this.l.next;
		return s;
	}
	,__class__: hxsl._ShaderList.ShaderIterator
};
hxsl.ShaderInstance = function(shader) {
	this.id = hxsl.Tools.allocVarId();
	this.shader = shader;
	this.params = new haxe.ds.IntMap();
};
$hxClasses["hxsl.ShaderInstance"] = hxsl.ShaderInstance;
hxsl.ShaderInstance.__name__ = ["hxsl","ShaderInstance"];
hxsl.ShaderInstance.prototype = {
	__class__: hxsl.ShaderInstance
};
hxsl.ShaderGlobal = function(v,gid) {
	this.v = v;
	this.globalId = gid;
};
$hxClasses["hxsl.ShaderGlobal"] = hxsl.ShaderGlobal;
hxsl.ShaderGlobal.__name__ = ["hxsl","ShaderGlobal"];
hxsl.ShaderGlobal.prototype = {
	__class__: hxsl.ShaderGlobal
};
hxsl.ShaderConst = function(v,pos,bits) {
	this.v = v;
	this.pos = pos;
	this.bits = bits;
};
$hxClasses["hxsl.ShaderConst"] = hxsl.ShaderConst;
hxsl.ShaderConst.__name__ = ["hxsl","ShaderConst"];
hxsl.ShaderConst.prototype = {
	__class__: hxsl.ShaderConst
};
hxsl.SharedShader = function(src) {
	this.instanceCache = new haxe.ds.IntMap();
	this.data = haxe.Unserializer.run(src);
	this.consts = null;
	this.globals = [];
	var _g = 0;
	var _g1 = this.data.vars;
	while(_g < _g1.length) {
		var v = _g1[_g];
		++_g;
		this.browseVar(v);
	}
	if(this.consts == null) {
		var hasFun = false;
		var _g2 = 0;
		var _g11 = this.data.funs;
		try {
			while(_g2 < _g11.length) {
				var f = _g11[_g2];
				++_g2;
				var _g21 = f.ref.name;
				switch(_g21) {
				case "vertex":case "fragment":case "__init__":case "__init__vertex":case "__init__fragment":
					break;
				default:
					hasFun = true;
					throw "__break__";
				}
			}
		} catch( e ) { if( e != "__break__" ) throw e; }
		if(!hasFun) {
			var i = new hxsl.ShaderInstance(this.data);
			this.paramsCount = 0;
			var _g3 = 0;
			var _g12 = this.data.vars;
			while(_g3 < _g12.length) {
				var v1 = _g12[_g3];
				++_g3;
				this.addSelfParam(i,v1);
			}
			this.instanceCache.set(0,i);
		}
	}
};
$hxClasses["hxsl.SharedShader"] = hxsl.SharedShader;
hxsl.SharedShader.__name__ = ["hxsl","SharedShader"];
hxsl.SharedShader.prototype = {
	getInstance: function(constBits) {
		var i = this.instanceCache.get(constBits);
		if(i == null) return this.makeInstance(constBits); else return i;
	}
	,makeInstance: function(constBits) {
		var $eval = new hxsl.Eval();
		var c = this.consts;
		while(c != null) {
			$eval.setConstant(c.v,(function($this) {
				var $r;
				var _g = c.v.type;
				$r = (function($this) {
					var $r;
					switch(_g[1]) {
					case 2:
						$r = hxsl.Const.CBool((constBits >>> c.pos & 1) != 0);
						break;
					case 1:
						$r = hxsl.Const.CInt(constBits >>> c.pos & (1 << c.bits) - 1);
						break;
					default:
						$r = (function($this) {
							var $r;
							throw "assert";
							return $r;
						}($this));
					}
					return $r;
				}($this));
				return $r;
			}(this)));
			c = c.next;
		}
		var i = new hxsl.ShaderInstance($eval["eval"](this.data));
		this.paramsCount = 0;
		var _g1 = 0;
		var _g11 = this.data.vars;
		while(_g1 < _g11.length) {
			var v = _g11[_g1];
			++_g1;
			this.addParam($eval,i,v);
		}
		this.instanceCache.set(constBits,i);
		return i;
	}
	,addSelfParam: function(i,v) {
		{
			var _g = v.type;
			switch(_g[1]) {
			case 12:
				var vl = _g[2];
				var _g1 = 0;
				while(_g1 < vl.length) {
					var v1 = vl[_g1];
					++_g1;
					this.addSelfParam(i,v1);
				}
				break;
			default:
				if(v.kind == hxsl.VarKind.Param) {
					i.params.set(v.id,this.paramsCount);
					this.paramsCount++;
				}
			}
		}
	}
	,addParam: function($eval,i,v) {
		{
			var _g = v.type;
			switch(_g[1]) {
			case 12:
				var vl = _g[2];
				var _g1 = 0;
				while(_g1 < vl.length) {
					var v1 = vl[_g1];
					++_g1;
					this.addParam($eval,i,v1);
				}
				break;
			default:
				if(v.kind == hxsl.VarKind.Param) {
					i.params.set($eval.varMap.h[v.__id__].id,this.paramsCount);
					this.paramsCount++;
				}
			}
		}
	}
	,browseVar: function(v,path) {
		v.id = hxsl.Tools.allocVarId();
		if(path == null) path = hxsl.Tools.getName(v); else path += "." + v.name;
		{
			var _g = v.type;
			switch(_g[1]) {
			case 12:
				var vl = _g[2];
				var _g1 = 0;
				while(_g1 < vl.length) {
					var vs = vl[_g1];
					++_g1;
					this.browseVar(vs,path);
				}
				break;
			default:
				var globalId = 0;
				if(v.kind == hxsl.VarKind.Global) {
					globalId = hxsl.Globals.allocID(path);
					this.globals.push(new hxsl.ShaderGlobal(v,globalId));
				}
				if(!hxsl.Tools.isConst(v)) return;
				var bits = hxsl.Tools.getConstBits(v);
				if(bits > 0) {
					var pos;
					if(this.consts == null) pos = 0; else pos = this.consts.pos + this.consts.bits;
					var c = new hxsl.ShaderConst(v,pos,bits);
					c.globalId = globalId;
					c.next = this.consts;
					this.consts = c;
				}
			}
		}
	}
	,__class__: hxsl.SharedShader
};
hxsl._Splitter = {};
hxsl._Splitter.VarProps = function(v) {
	this.v = v;
	this.read = 0;
	this.write = 0;
};
$hxClasses["hxsl._Splitter.VarProps"] = hxsl._Splitter.VarProps;
hxsl._Splitter.VarProps.__name__ = ["hxsl","_Splitter","VarProps"];
hxsl._Splitter.VarProps.prototype = {
	__class__: hxsl._Splitter.VarProps
};
hxsl.Splitter = function() {
};
$hxClasses["hxsl.Splitter"] = hxsl.Splitter;
hxsl.Splitter.__name__ = ["hxsl","Splitter"];
hxsl.Splitter.prototype = {
	split: function(s) {
		var vfun = null;
		var vvars = new haxe.ds.IntMap();
		var ffun = null;
		var fvars = new haxe.ds.IntMap();
		this.varNames = new haxe.ds.StringMap();
		var _g = 0;
		var _g1 = s.funs;
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			var _g2 = f.kind;
			switch(_g2[1]) {
			case 0:
				this.vars = vvars;
				vfun = f;
				this.checkExpr(f.expr);
				break;
			case 1:
				this.vars = fvars;
				ffun = f;
				this.checkExpr(f.expr);
				break;
			default:
				throw "assert";
			}
		}
		this.varMap = new haxe.ds.ObjectMap();
		var $it0 = vvars.iterator();
		while( $it0.hasNext() ) {
			var inf = $it0.next();
			var v = inf.v;
			var _g3 = v.kind;
			switch(_g3[1]) {
			case 3:case 4:
				if(fvars.exists(v.id)) v.kind = hxsl.VarKind.Var; else v.kind = hxsl.VarKind.Local;
				break;
			default:
			}
			var _g4 = v.kind;
			switch(_g4[1]) {
			case 3:case 5:
				if(inf.read > 0 || inf.write > 1) {
					var nv = { id : hxsl.Tools.allocVarId(), name : v.name, kind : v.kind, type : v.type};
					this.vars = vvars;
					var ninf = this.get(nv);
					v.kind = hxsl.VarKind.Local;
					var p = vfun.expr.p;
					var e = { e : hxsl.TExprDef.TBinop(haxe.macro.Binop.OpAssign,{ e : hxsl.TExprDef.TVar(nv), t : nv.type, p : p},{ e : hxsl.TExprDef.TVar(v), t : v.type, p : p}), t : nv.type, p : p};
					this.addExpr(vfun,e);
					this.checkExpr(e);
					if(nv.kind == hxsl.VarKind.Var) {
						var old = fvars.get(v.id);
						this.varMap.set(v,nv);
						fvars.remove(v.id);
						var np = new hxsl._Splitter.VarProps(nv);
						np.read = old.read;
						np.write = old.write;
						fvars.set(nv.id,np);
					}
				}
				break;
			default:
			}
		}
		var finits = [];
		var $it1 = fvars.iterator();
		while( $it1.hasNext() ) {
			var inf1 = $it1.next();
			var v1 = inf1.v;
			var _g5 = v1.kind;
			switch(_g5[1]) {
			case 1:
				var nv1 = { id : hxsl.Tools.allocVarId(), name : v1.name, kind : hxsl.VarKind.Var, type : v1.type};
				this.uniqueName(nv1);
				var i = vvars.get(v1.id);
				if(i == null) {
					i = new hxsl._Splitter.VarProps(v1);
					vvars.set(v1.id,i);
				}
				i.read++;
				var vp = new hxsl._Splitter.VarProps(nv1);
				vp.write = 1;
				vvars.set(nv1.id,vp);
				var fp = new hxsl._Splitter.VarProps(nv1);
				fp.read = 1;
				fvars.set(nv1.id,fp);
				this.addExpr(vfun,{ e : hxsl.TExprDef.TBinop(haxe.macro.Binop.OpAssign,{ e : hxsl.TExprDef.TVar(nv1), t : v1.type, p : vfun.expr.p},{ e : hxsl.TExprDef.TVar(v1), t : v1.type, p : vfun.expr.p}), t : v1.type, p : vfun.expr.p});
				this.varMap.set(v1,nv1);
				inf1.local = true;
				break;
			case 3:
				if(inf1.write > 0) {
					var nv2 = { id : hxsl.Tools.allocVarId(), name : v1.name, kind : hxsl.VarKind.Local, type : v1.type};
					this.uniqueName(nv2);
					finits.push({ e : hxsl.TExprDef.TVarDecl(nv2,{ e : hxsl.TExprDef.TVar(v1), t : v1.type, p : ffun.expr.p}), t : hxsl.Type.TVoid, p : ffun.expr.p});
					this.varMap.set(v1,nv2);
				} else {
				}
				break;
			default:
			}
		}
		var $it2 = vvars.iterator();
		while( $it2.hasNext() ) {
			var v2 = $it2.next();
			this.checkVar(v2,true,vvars);
		}
		var $it3 = fvars.iterator();
		while( $it3.hasNext() ) {
			var v3 = $it3.next();
			this.checkVar(v3,false,vvars);
		}
		var $it4 = this.varMap.keys();
		while( $it4.hasNext() ) {
			var v4 = $it4.next();
			var v21;
			var key = this.varMap.h[v4.__id__];
			v21 = this.varMap.h[key.__id__];
			if(v21 != null) this.varMap.set(v4,v21);
		}
		ffun = { ret : ffun.ret, ref : ffun.ref, kind : ffun.kind, args : ffun.args, expr : this.mapVars(ffun.expr)};
		{
			var _g6 = ffun.expr.e;
			switch(_g6[1]) {
			case 4:
				var el = _g6[2];
				var _g11 = 0;
				while(_g11 < finits.length) {
					var e1 = finits[_g11];
					++_g11;
					el.unshift(e1);
				}
				break;
			default:
				finits.push(ffun.expr);
				ffun.expr = { e : hxsl.TExprDef.TBlock(finits), t : hxsl.Type.TVoid, p : ffun.expr.p};
			}
		}
		var vvars1;
		var _g7 = [];
		var $it5 = vvars.iterator();
		while( $it5.hasNext() ) {
			var v5 = $it5.next();
			if(!v5.local) _g7.push(v5.v);
		}
		vvars1 = _g7;
		var fvars1;
		var _g12 = [];
		var $it6 = fvars.iterator();
		while( $it6.hasNext() ) {
			var v6 = $it6.next();
			if(!v6.local) _g12.push(v6.v);
		}
		fvars1 = _g12;
		vvars1.sort(function(v11,v22) {
			return v11.id - v22.id;
		});
		fvars1.sort(function(v12,v23) {
			return v12.id - v23.id;
		});
		return { vertex : { name : "vertex", vars : vvars1, funs : [vfun]}, fragment : { name : "fragment", vars : fvars1, funs : [ffun]}};
	}
	,addExpr: function(f,e) {
		{
			var _g = f.expr.e;
			switch(_g[1]) {
			case 4:
				var el = _g[2];
				el.push(e);
				break;
			default:
				f.expr = { e : hxsl.TExprDef.TBlock([f.expr,e]), t : hxsl.Type.TVoid, p : f.expr.p};
			}
		}
	}
	,checkVar: function(v,vertex,vvars) {
		var _g = v.v.kind;
		switch(_g[1]) {
		case 4:
			if(v.requireInit) throw "Variable " + v.v.name + " is written without being initialized"; else {
			}
			break;
		case 3:
			if(!vertex) {
				var i = vvars.get(v.v.id);
				if(i == null || i.write == 0) throw "Varying " + v.v.name + " is not written by vertex shader";
			}
			break;
		default:
		}
	}
	,mapVars: function(e) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 1:
				var v = _g[2];
				var v2 = this.varMap.h[v.__id__];
				if(v2 == null) return e; else return { e : hxsl.TExprDef.TVar(v2), t : e.t, p : e.p};
				break;
			default:
				return hxsl.Tools.map(e,$bind(this,this.mapVars));
			}
		}
	}
	,get: function(v) {
		var i = this.vars.get(v.id);
		if(i == null) {
			i = new hxsl._Splitter.VarProps(v);
			this.vars.set(v.id,i);
			this.uniqueName(v);
		}
		return i;
	}
	,uniqueName: function(v) {
		if(v.kind == hxsl.VarKind.Global || v.kind == hxsl.VarKind.Output || v.kind == hxsl.VarKind.Input) return;
		v.parent = null;
		var n = this.varNames.get(v.name);
		if(n != null && n != v) {
			var k = 2;
			while(this.varNames.exists(v.name + k)) k++;
			v.name += k;
		}
		this.varNames.set(v.name,v);
	}
	,checkExpr: function(e) {
		{
			var _g = e.e;
			switch(_g[1]) {
			case 1:
				var v = _g[2];
				var inf = this.get(v);
				if(inf.write == 0) inf.requireInit = true;
				inf.read++;
				break;
			case 5:
				switch(_g[2][1]) {
				case 4:
					switch(_g[3].e[1]) {
					case 1:
						var e1 = _g[4];
						var v1 = _g[3].e[2];
						var inf1 = this.get(v1);
						inf1.write++;
						this.checkExpr(e1);
						break;
					case 9:
						switch(_g[3].e[2].e[1]) {
						case 1:
							var e1 = _g[4];
							var v1 = _g[3].e[2].e[2];
							var inf1 = this.get(v1);
							inf1.write++;
							this.checkExpr(e1);
							break;
						default:
							hxsl.Tools.iter(e,$bind(this,this.checkExpr));
						}
						break;
					default:
						hxsl.Tools.iter(e,$bind(this,this.checkExpr));
					}
					break;
				case 20:
					switch(_g[3].e[1]) {
					case 1:
						var e2 = _g[4];
						var v2 = _g[3].e[2];
						var inf2 = this.get(v2);
						if(inf2.write == 0) inf2.requireInit = true;
						inf2.read++;
						inf2.write++;
						this.checkExpr(e2);
						break;
					case 9:
						switch(_g[3].e[2].e[1]) {
						case 1:
							var e2 = _g[4];
							var v2 = _g[3].e[2].e[2];
							var inf2 = this.get(v2);
							if(inf2.write == 0) inf2.requireInit = true;
							inf2.read++;
							inf2.write++;
							this.checkExpr(e2);
							break;
						default:
							hxsl.Tools.iter(e,$bind(this,this.checkExpr));
						}
						break;
					default:
						hxsl.Tools.iter(e,$bind(this,this.checkExpr));
					}
					break;
				default:
					hxsl.Tools.iter(e,$bind(this,this.checkExpr));
				}
				break;
			case 7:
				var init = _g[3];
				var v3 = _g[2];
				var inf3 = this.get(v3);
				inf3.local = true;
				if(init != null) {
					this.checkExpr(init);
					inf3.write++;
				}
				break;
			default:
				hxsl.Tools.iter(e,$bind(this,this.checkExpr));
			}
		}
	}
	,__class__: hxsl.Splitter
};
js.html = {};
js.html._CanvasElement = {};
js.html._CanvasElement.CanvasUtil = function() { };
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js.html._CanvasElement.CanvasUtil;
js.html._CanvasElement.CanvasUtil.__name__ = ["js","html","_CanvasElement","CanvasUtil"];
js.html._CanvasElement.CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0;
	var _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
};
var ld31 = {};
ld31.Game = function(restart) {
	this._frameTime = 0.01;
	this._tm = new ld31.gameplay.Tilemap();
	this._playerControl = new ld31.gameplay.PlayerControl();
	this._graphic = new ld31.graphic.Render($bind(this,this.start));
};
$hxClasses["ld31.Game"] = ld31.Game;
ld31.Game.__name__ = ["ld31","Game"];
ld31.Game.prototype = {
	start: function() {
		this._dt = 0.;
		this._t = haxe.Timer.stamp();
		this._dir = new ld31.math.Dir();
		this._lastDirChange = this._t;
		var p = ld31.gameplay.Tilemap.getNeutralPos();
		var _g = 0;
		while(_g < 13) {
			var i = _g++;
			var _g1 = 0;
			while(_g1 < 13) {
				var j = _g1++;
				if(this._tm.get(i,j) == 1) {
					var n = new ld31.graphic.CubeMesh(1,this._graphic.s3d);
					n.x = i;
					n.flags |= 1;
					true;
					i;
					n.y = j;
					n.flags |= 1;
					true;
					j;
				}
			}
		}
		this._playerControl.x = p.x;
		this._playerControl.y = p.y - 1;
		this._playerControl.onRestart = $bind(this,this.orbital);
		this._playerMesh = new ld31.graphic.PlayerMesh(this._graphic.s3d);
		this._playerMesh.scale(0.5);
		hxd.System.setLoop($bind(this,this.mainLoop));
		this.initAnimPlayer();
		this._msgNum = 0;
		this.updateMsg();
	}
	,updateMsg: function() {
		if(this._msgNum == 0) {
			this._msgNum++;
			this._graphic.addMsg(this._msgNum);
		} else if(this._msgNum == 1) {
			if(hxd.Key.isDown(37) || hxd.Key.isDown(39)) {
				this._msgNum++;
				this._graphic.addMsg(this._msgNum);
			}
		} else if(this._msgNum == 2) {
			if(hxd.Key.isDown(32)) {
				this._msgNum++;
				this._graphic.addMsg(this._msgNum);
				this.createPolyomino();
			}
		} else if(this._msgNum == 3) {
			if(hxd.Key.isDown(40)) {
				this._msgNum++;
				this._graphic.addMsg(this._msgNum,2.0);
			}
		} else if(this._msgNum == 4) this._msgNum++;
		if(hxd.Key.isReleased(122)) this._graphic.engine.set_fullScreen(true);
		if(hxd.Key.isReleased(13)) this._restart();
	}
	,orbital: function() {
		this.initAnimPlayer();
	}
	,initAnimPlayer: function() {
		var _g = this;
		this._playerMesh.set_z(50);
		this._playerControl.blockControls = true;
		tweenx909.TweenX.to(this._playerMesh,{ z : 0},null,null,null,null,null,null,null,null,{ fileName : "Game.hx", lineNumber : 142, className : "ld31.Game", methodName : "initAnimPlayer"}).time(0.5).ease(tweenx909.EaseX.circIn).onFinish(function() {
			_g._playerControl.blockControls = false;
		});
	}
	,changeDir: function(newDir) {
		this._dir = newDir;
		this._graphic.rot(this._dir);
		if(this._pol != null) this._pol.rot(this._dir);
	}
	,mainLoop: function() {
		this.updateMsg();
		var dt = haxe.Timer.stamp() - this._t;
		this._t += dt;
		this._dt += dt;
		while(this._dt >= this._frameTime) {
			var col = this._tm.getCol(Math.round(this._playerControl.x),Math.round(this._playerControl.y));
			this._playerControl.updateCollides(col);
			if(this._pol != null) this._pol.updateGhost(this._playerControl.x,this._playerControl.y,this._tm);
			var newDir = ld31.math.Dir.getDir(this._playerControl.x,this._playerControl.y,this._tm,this._dir);
			if(!(this._dir._dir == newDir._dir) && haxe.Timer.stamp() - this._lastDirChange > 0.2) {
				this._lastDirChange = haxe.Timer.stamp();
				this.changeDir(newDir);
			}
			if(this._dt / this._frameTime <= 2) {
				this._playerMesh.set_x(this._playerControl.x);
				this._playerMesh.set_y(this._playerControl.y);
				this._graphic.refresh();
			}
			this._playerControl.updateControls(col,this._dir);
			this._playerControl.x += this._playerControl.vx;
			this._playerControl.y += this._playerControl.vy;
			this._dt -= this._frameTime;
		}
	}
	,createPolyomino: function() {
		this._pol = new ld31.gameplay.Polyomino(this._graphic.s3d,this._dir);
		this._pol.onSitting = $bind(this,this.sitPolyomino);
		this._playerControl.onAction = ($_=this._pol,$bind($_,$_.sit));
	}
	,sitPolyomino: function() {
		this._pol.fixToTilemap(this._tm,this._graphic.map);
		this._pol = null;
		this.createPolyomino();
	}
	,__class__: ld31.Game
};
ld31.Main = function() { };
$hxClasses["ld31.Main"] = ld31.Main;
ld31.Main.__name__ = ["ld31","Main"];
ld31.Main.main = function() {
	ld31.Main.restart();
};
ld31.Main.restart = function() {
	if((function($this) {
		var $r;
		if(h3d.Engine.CURRENT == null) throw "no current context, please do this operation after engine init/creation";
		$r = h3d.Engine.CURRENT;
		return $r;
	}(this)) != null) ((function($this) {
		var $r;
		if(h3d.Engine.CURRENT == null) throw "no current context, please do this operation after engine init/creation";
		$r = h3d.Engine.CURRENT;
		return $r;
	}(this))).dispose();
	hxd.Key.initialize();
	hxd.Res.loader = new hxd.res.Loader(new hxd.res.EmbedFileSystem(haxe.Unserializer.run("oy10:p03add.pngty11:p02jump.pngty11:p01move.pngty12:p04enjoy.pngtg")));
	ld31.Main._game = new ld31.Game(ld31.Main.restart);
};
ld31.gameplay = {};
ld31.gameplay.PlayerControl = function() {
	this.vx = 0;
	this.vy = 0;
	this._run = new ld31.math.Vec2d(0.3,0);
	this._jump = new ld31.math.Vec2d(0,-0.3);
	this._g = new ld31.math.Vec2d(0,0.02);
	this._friction = 0.7;
	this._airSlowler = 0.2;
	this._lastTOnGround = haxe.Timer.stamp();
	this.blockControls = false;
};
$hxClasses["ld31.gameplay.PlayerControl"] = ld31.gameplay.PlayerControl;
ld31.gameplay.PlayerControl.__name__ = ["ld31","gameplay","PlayerControl"];
ld31.gameplay.PlayerControl.prototype = {
	updateCollides: function(c) {
		if(c.top != 0 && this.y - Math.round(this.y) <= 0) {
			if(this.vy < 0) this.vy = 0;
			this.y = Math.round(this.y);
		}
		if(c.bottom != 0 && this.y - Math.round(this.y) >= 0) {
			if(this.vy > 0) this.vy = 0;
			this.y = Math.round(this.y);
		}
		if(c.left != 0 && this.x - Math.round(this.x) <= 0) {
			if(this.vx < 0) this.vx = 0;
			this.x = Math.round(this.x);
		}
		if(c.right != 0 && this.x - Math.round(this.x) >= 0) {
			if(this.vx > 0) this.vx = 0;
			this.x = Math.round(this.x);
		}
	}
	,updateControls: function(col,dir) {
		var r = this._run.cloneAndRot(dir);
		var g = this._g.cloneAndRot(dir);
		var j = this._jump.cloneAndRot(dir);
		var c = col.rot(dir);
		var onGround = false;
		if(c.bottom != 0) {
			if(dir._dir == ld31.math.Dir.DIR_UP) {
				if(this.y - Math.round(this.y) >= 0) onGround = true;
			} else if(dir._dir == ld31.math.Dir.DIR_RIGHT) {
				if(this.x - Math.round(this.x) <= 0) onGround = true;
			} else if(dir._dir == ld31.math.Dir.DIR_DOWN) {
				if(this.y - Math.round(this.y) <= 0) onGround = true;
			} else if(dir._dir == ld31.math.Dir.DIR_LEFT) {
				if(this.x - Math.round(this.x) >= 0) onGround = true;
			}
		}
		if(col.on != 0 || c.top != 0 && c.right != 0 && c.bottom != 0 && c.left != 0) {
			var decal = new h2d.col.Point(j.x,j.y);
			decal.normalize();
			this.x += decal.x;
			this.y += decal.y;
		}
		if(dir._dir == ld31.math.Dir.DIR_LEFT || dir._dir == ld31.math.Dir.DIR_RIGHT) this.vy *= this._friction; else this.vx *= this._friction;
		if(onGround) {
			if(!this.blockControls) {
				if(hxd.Key.isDown(37)) {
					r.x *= -1;
					r.y *= -1;
					this.vx = this.applyMove(this.vx,r.x,0.1,true);
					this.vy = this.applyMove(this.vy,r.y,0.1,true);
				} else if(hxd.Key.isDown(39)) {
					this.vx = this.applyMove(this.vx,r.x,0.1,true);
					this.vy = this.applyMove(this.vy,r.y,0.1,true);
				}
				if(hxd.Key.isDown(32)) {
					this.vx = this.applyMove(this.vx,j.x,1.0,true);
					this.vy = this.applyMove(this.vy,j.y,1.0,true);
				}
			}
			this._lastTOnGround = haxe.Timer.stamp();
		} else {
			if(!this.blockControls) {
				if(hxd.Key.isDown(37)) {
					r.x *= -1;
					r.y *= -1;
					this.vx = this.applyMove(this.vx,r.x,0.1,true);
					this.vy = this.applyMove(this.vy,r.y,0.1,true);
				} else if(hxd.Key.isDown(39)) {
					this.vx = this.applyMove(this.vx,r.x,0.1,true);
					this.vy = this.applyMove(this.vy,r.y,0.1,true);
				}
			}
			var fG = haxe.Timer.stamp() - this._lastTOnGround;
			if(fG > 0.5) return this.restartPos();
			this.vx += g.x;
			this.vy += g.y;
		}
		if(!this.blockControls && hxd.Key.isDown(40) && this.onAction != null) this.onAction();
	}
	,restartPos: function() {
		this.x = Math.floor(6.5);
		this.y = Math.floor(6.5);
		this.vx = 0;
		this.vy = 0;
		this._lastTOnGround = haxe.Timer.stamp();
		if(this.onRestart != null) this.onRestart();
	}
	,applyMove: function(v0,v1,acc,maximum) {
		if(maximum == null) maximum = false;
		if(acc == null) acc = 1.0;
		if(v1 > 0) {
			if(maximum && v0 < v1) {
				v0 += v1 * acc;
				if(v0 > v1) v0 = v1;
			} else v0 += v1 * acc;
		} else if(v1 < 0) {
			if(maximum && v0 > v1) {
				v0 += v1 * acc;
				if(v0 < v1) v0 = v1;
			} else v0 += v1 * acc;
		}
		return v0;
	}
	,__class__: ld31.gameplay.PlayerControl
};
ld31.gameplay.Polyomino = function(parent,dir) {
	this.control = new ld31.gameplay.PolyominoControl();
	this.graphicFinal = new ld31.graphic.PolyominoObject(this.control,parent);
	this.graphicFinal.set_visible(false);
	this.graphicGhost = new ld31.graphic.PolyominoObject(this.control,parent,true);
	this._sitTime = false;
	this.rot(dir);
};
$hxClasses["ld31.gameplay.Polyomino"] = ld31.gameplay.Polyomino;
ld31.gameplay.Polyomino.__name__ = ["ld31","gameplay","Polyomino"];
ld31.gameplay.Polyomino.prototype = {
	fixToTilemap: function(tm,mm) {
		tm.addPolyomino(this.control.form,this._sitPlace[0],this._sitPlace[1],mm);
		this.graphicGhost.set_visible(false);
		this.graphicGhost.remove();
		this.graphicFinal.set_visible(false);
		this.graphicFinal.remove();
	}
	,rot: function(dir) {
		if(this._sitTime) return;
		this._dir = dir;
		this._xi = this._yi = -100;
	}
	,sit: function() {
		if(this._sitTime || this._sitPlace == null) return;
		this._sitTime = true;
		this.graphicFinal.set_visible(true);
		var x0 = this._sitPlace[0];
		var y0 = this._sitPlace[1];
		var dir = new ld31.math.Dir(this._dirSitPlace);
		if(dir._dir == ld31.math.Dir.DIR_UP) y0 -= 13; else if(dir._dir == ld31.math.Dir.DIR_RIGHT) x0 += 13; else if(dir._dir == ld31.math.Dir.DIR_DOWN) y0 += 13; else if(dir._dir == ld31.math.Dir.DIR_LEFT) x0 -= 13;
		this.graphicFinal.setPos(x0,y0,0);
		tweenx909.TweenX.to(this.graphicFinal,{ x : this._sitPlace[0], y : this._sitPlace[1]},null,null,null,null,null,null,null,null,{ fileName : "Polyomino.hx", lineNumber : 83, className : "ld31.gameplay.Polyomino", methodName : "sit"}).time(0.25).onFinish(this.onSitting);
	}
	,updateGhost: function(x,y,tm) {
		if(this._sitTime) return;
		var xi = Math.round(x - (this.control.form[0].length - 1) * 0.5);
		var yi = Math.round(y - (this.control.form.length - 1) * 0.5);
		this._xi = xi;
		this._yi = yi;
		this._sitPlace = tm.getPosPolContact(this.control.form,this._dir,xi,yi);
		this._dirSitPlace = this._dir._dir;
		if(this._sitPlace == null) this.graphicGhost.set_visible(false); else {
			if(!((this.graphicGhost.flags & 2) != 0)) this.graphicGhost.set_visible(true);
			this.graphicGhost.setPos(this._sitPlace[0],this._sitPlace[1],0);
		}
	}
	,__class__: ld31.gameplay.Polyomino
};
ld31.gameplay.PolyominoControl = function(id,color) {
	if(color == null) color = -1;
	if(id == null) id = -1;
	if(id < 0) this.id = Math.floor(Math.random() * ld31.gameplay.PolyominoControl.POLYOMINOS.length); else this.id = id;
	if(color < 0) {
		var col = Math.floor(Math.random() * 3);
		if(col == 0) this.color = 2; else if(col == 1) this.color = 3; else this.color = 4;
	} else this.color = color;
	this.updateForm(new ld31.math.Dir());
};
$hxClasses["ld31.gameplay.PolyominoControl"] = ld31.gameplay.PolyominoControl;
ld31.gameplay.PolyominoControl.__name__ = ["ld31","gameplay","PolyominoControl"];
ld31.gameplay.PolyominoControl.prototype = {
	updateForm: function(dir) {
		var original = ld31.gameplay.PolyominoControl.POLYOMINOS[this.id];
		var newYL;
		if(dir._dir == ld31.math.Dir.DIR_UP || dir._dir == ld31.math.Dir.DIR_DOWN) newYL = original.length; else newYL = original[0].length;
		var newXL;
		if(dir._dir == ld31.math.Dir.DIR_UP || dir._dir == ld31.math.Dir.DIR_DOWN) newXL = original[0].length; else newXL = original.length;
		var oldXL = original[0].length - 1;
		var oldYL = original.length - 1;
		this.form = [];
		var _g = 0;
		while(_g < newYL) {
			var j = _g++;
			this.form[j] = [];
			var _g1 = 0;
			while(_g1 < newXL) {
				var i = _g1++;
				if(dir._dir == ld31.math.Dir.DIR_UP) if(original[j][i] > 0) this.form[j][i] = this.color; else this.form[j][i] = 0; else if(dir._dir == ld31.math.Dir.DIR_RIGHT) if(original[oldYL - i][j] > 0) this.form[j][i] = this.color; else this.form[j][i] = 0; else if(dir._dir == ld31.math.Dir.DIR_DOWN) if(original[oldYL - j][oldXL - i] > 0) this.form[j][i] = this.color; else this.form[j][i] = 0; else if(dir._dir == ld31.math.Dir.DIR_LEFT) if(original[oldYL - i][j] > 0) this.form[j][i] = this.color; else this.form[j][i] = 0;
			}
		}
	}
	,__class__: ld31.gameplay.PolyominoControl
};
ld31.gameplay.Tilemap = function() {
	this._staticTypes = ld31.gameplay.Tilemap.getEmtpyGrid();
	this.bounds = new ld31.math.Bounds();
	this.updateBB();
};
$hxClasses["ld31.gameplay.Tilemap"] = ld31.gameplay.Tilemap;
ld31.gameplay.Tilemap.__name__ = ["ld31","gameplay","Tilemap"];
ld31.gameplay.Tilemap.getNeutralPos = function() {
	var mX = Math.floor(6.5);
	var mY = Math.floor(6.5);
	return new ld31.math.Vec2d(mX,mY);
};
ld31.gameplay.Tilemap.getEmtpyGrid = function() {
	var a = [];
	var _g1 = 0;
	var _g = 23;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = [];
		var _g3 = 0;
		var _g2 = 23;
		while(_g3 < _g2) {
			var j = _g3++;
			a[i][j] = 0;
		}
	}
	var mX = Math.floor(6.5) + 5;
	var mY = Math.floor(6.5) + 5;
	a[mX][mY] = 1;
	return a;
};
ld31.gameplay.Tilemap.prototype = {
	updateBB: function() {
		this.bounds.xMin = 100;
		this.bounds.yMin = 100;
		this.bounds.xMax = -100;
		this.bounds.yMax = -100;
		var _g = 0;
		while(_g < 13) {
			var j = _g++;
			var _g1 = 0;
			while(_g1 < 13) {
				var i = _g1++;
				if(this.get(i,j) != 0) {
					if(j < this.bounds.yMin) this.bounds.yMin = j;
					if(i < this.bounds.xMin) this.bounds.xMin = i;
					if(j > this.bounds.yMax) this.bounds.yMax = j;
					if(i > this.bounds.xMax) this.bounds.xMax = i;
				}
			}
		}
		console.log(this.bounds);
	}
	,getPosPolContact: function(form,dir,x,y) {
		if(dir._dir == ld31.math.Dir.DIR_UP) {
			var min = -(form.length + 5);
			var _g1 = min;
			var _g = 18;
			while(_g1 < _g) {
				var j = _g1++;
				if(this.hasPolContact(form,x,j)) return [x,j - 1];
			}
		} else if(dir._dir == ld31.math.Dir.DIR_DOWN) {
			var j1 = 18;
			var min1 = -(form.length + 5);
			while(--j1 > min1) if(this.hasPolContact(form,x,j1)) return [x,j1 + 1];
		} else if(dir._dir == ld31.math.Dir.DIR_LEFT) {
			var min2 = -(form[0].length + 5);
			var _g11 = -form[0].length;
			var _g2 = 18;
			while(_g11 < _g2) {
				var i = _g11++;
				if(this.hasPolContact(form,i,y)) return [i - 1,y];
			}
		} else if(dir._dir == ld31.math.Dir.DIR_RIGHT) {
			var i1 = 18;
			var min3 = -(form[0].length + 5);
			while(--i1 > min3) if(this.hasPolContact(form,i1,y)) return [i1 + 1,y];
		}
		return null;
	}
	,hasPolContact: function(form,x,y) {
		var _g1 = y;
		var _g = y + form.length;
		while(_g1 < _g) {
			var j = _g1++;
			var _g3 = x;
			var _g2 = x + form[0].length;
			while(_g3 < _g2) {
				var i = _g3++;
				if(this.get(i,j) != 0 && form[j - y][i - x] != 0) return true;
			}
		}
		return false;
	}
	,addPolyomino: function(form,x,y,mm) {
		var _g1 = y;
		var _g = y + form.length;
		while(_g1 < _g) {
			var j = _g1++;
			var _g3 = x;
			var _g2 = x + form[0].length;
			while(_g3 < _g2) {
				var i = _g3++;
				if(this.get(i,j) == 0 && form[j - y][i - x] != 0) this.set(i,j,form[j - y][i - x],mm);
			}
		}
		this.updateBB();
	}
	,getCol: function(x,y) {
		var c = new ld31.math.Contacts();
		c.on = this.get(x,y);
		c.top = this.get(x,y - 1);
		c.right = this.get(x + 1,y);
		c.bottom = this.get(x,y + 1);
		c.left = this.get(x - 1,y);
		return c;
	}
	,set: function(x,y,type,mm) {
		if(x > -1 && y > -1 && x < 13 && y < 13) mm.addSquare(type,x,y); else mm.addSquare(6,x,y);
		x += 5;
		y += 5;
		if(x > -1 && y > -1 && x < this._staticTypes[0].length && y < this._staticTypes.length) this._staticTypes[y][x] = type;
	}
	,get: function(x,y) {
		x += 5;
		y += 5;
		var rep;
		if(x > -1 && y > -1 && x < this._staticTypes[0].length && y < this._staticTypes.length) rep = this._staticTypes[y][x]; else rep = 0;
		return rep;
	}
	,__class__: ld31.gameplay.Tilemap
};
ld31.graphic = {};
ld31.graphic.CubeMesh = function(type,parent,ghost) {
	if(ghost == null) ghost = false;
	h3d.scene.Mesh.call(this,new ld31.graphic.CubePrim(),ld31.graphic.CubeMesh.getMat(type,ghost),parent);
};
$hxClasses["ld31.graphic.CubeMesh"] = ld31.graphic.CubeMesh;
ld31.graphic.CubeMesh.__name__ = ["ld31","graphic","CubeMesh"];
ld31.graphic.CubeMesh.getMatBlack = function() {
	if(ld31.graphic.CubeMesh._MAT_BLACK == null) {
		ld31.graphic.CubeMesh._MAT_BLACK = new h3d.mat.MeshMaterial();
		ld31.graphic.CubeMesh._MAT_BLACK.mshader.color__.setColor(0,null);
	}
	return ld31.graphic.CubeMesh._MAT_BLACK;
};
ld31.graphic.CubeMesh.getMatR = function() {
	if(ld31.graphic.CubeMesh._MAT_R == null) {
		ld31.graphic.CubeMesh._MAT_R = new h3d.mat.MeshMaterial();
		ld31.graphic.CubeMesh._MAT_R.mshader.color__.setColor(16711833,null);
	}
	return ld31.graphic.CubeMesh._MAT_R;
};
ld31.graphic.CubeMesh.getMatG = function() {
	if(ld31.graphic.CubeMesh._MAT_G == null) {
		ld31.graphic.CubeMesh._MAT_G = new h3d.mat.MeshMaterial();
		ld31.graphic.CubeMesh._MAT_G.mshader.color__.setColor(10092288,null);
	}
	return ld31.graphic.CubeMesh._MAT_G;
};
ld31.graphic.CubeMesh.getMatB = function() {
	if(ld31.graphic.CubeMesh._MAT_B == null) {
		ld31.graphic.CubeMesh._MAT_B = new h3d.mat.MeshMaterial();
		ld31.graphic.CubeMesh._MAT_B.mshader.color__.setColor(39423,null);
	}
	return ld31.graphic.CubeMesh._MAT_B;
};
ld31.graphic.CubeMesh.getMatOut = function() {
	if(ld31.graphic.CubeMesh._MAT_OUT == null) {
		ld31.graphic.CubeMesh._MAT_OUT = new h3d.mat.MeshMaterial();
		ld31.graphic.CubeMesh._MAT_OUT.passes.addShader(new ld31.graphic.OutShader());
		ld31.graphic.CubeMesh._MAT_OUT.mshader.color__.setColor(10027263,null);
	}
	return ld31.graphic.CubeMesh._MAT_OUT;
};
ld31.graphic.CubeMesh.getMatRG = function() {
	if(ld31.graphic.CubeMesh._MAT_R_G == null) {
		ld31.graphic.CubeMesh._MAT_R_G = new h3d.mat.MeshMaterial();
		ld31.graphic.CubeMesh._MAT_R_G.passes.addShader(new ld31.graphic.GhostShader());
		ld31.graphic.CubeMesh._MAT_R_G.mshader.color__.setColor(16711833,null);
	}
	return ld31.graphic.CubeMesh._MAT_R_G;
};
ld31.graphic.CubeMesh.getMatGG = function() {
	if(ld31.graphic.CubeMesh._MAT_G_G == null) {
		ld31.graphic.CubeMesh._MAT_G_G = new h3d.mat.MeshMaterial();
		ld31.graphic.CubeMesh._MAT_G_G.passes.addShader(new ld31.graphic.GhostShader());
		ld31.graphic.CubeMesh._MAT_G_G.mshader.color__.setColor(10092288,null);
	}
	return ld31.graphic.CubeMesh._MAT_G_G;
};
ld31.graphic.CubeMesh.getMatBG = function() {
	if(ld31.graphic.CubeMesh._MAT_B_G == null) {
		ld31.graphic.CubeMesh._MAT_B_G = new h3d.mat.MeshMaterial();
		ld31.graphic.CubeMesh._MAT_B_G.passes.addShader(new ld31.graphic.GhostShader());
		ld31.graphic.CubeMesh._MAT_B_G.mshader.color__.setColor(39423,null);
	}
	return ld31.graphic.CubeMesh._MAT_B_G;
};
ld31.graphic.CubeMesh.getMat = function(type,ghost) {
	if(type == 2 && ghost) return ld31.graphic.CubeMesh.getMatRG();
	if(type == 2) return ld31.graphic.CubeMesh.getMatR();
	if(type == 3 && ghost) return ld31.graphic.CubeMesh.getMatGG();
	if(type == 3) return ld31.graphic.CubeMesh.getMatG();
	if(type == 4 && ghost) return ld31.graphic.CubeMesh.getMatBG();
	if(type == 4) return ld31.graphic.CubeMesh.getMatB();
	return ld31.graphic.CubeMesh.getMatBlack();
};
ld31.graphic.CubeMesh.__super__ = h3d.scene.Mesh;
ld31.graphic.CubeMesh.prototype = $extend(h3d.scene.Mesh.prototype,{
	__class__: ld31.graphic.CubeMesh
});
ld31.graphic.CubePrim = function() {
	var p = [new h3d.col.Point(-.5,-.5,0),new h3d.col.Point(.5,-.5,0),new h3d.col.Point(-.5,.5,0),new h3d.col.Point(.5,.5,0)];
	var idx;
	var this1;
	this1 = new Array(0);
	idx = this1;
	idx.push(0);
	idx.push(1);
	idx.push(2);
	idx.push(2);
	idx.push(1);
	idx.push(3);
	h3d.prim.Polygon.call(this,p,idx);
};
$hxClasses["ld31.graphic.CubePrim"] = ld31.graphic.CubePrim;
ld31.graphic.CubePrim.__name__ = ["ld31","graphic","CubePrim"];
ld31.graphic.CubePrim.__super__ = h3d.prim.Polygon;
ld31.graphic.CubePrim.prototype = $extend(h3d.prim.Polygon.prototype,{
	__class__: ld31.graphic.CubePrim
});
ld31.graphic.GhostShader = function() {
	this.color__ = new h3d.Vector();
	hxsl.Shader.call(this);
};
$hxClasses["ld31.graphic.GhostShader"] = ld31.graphic.GhostShader;
ld31.graphic.GhostShader.__name__ = ["ld31","graphic","GhostShader"];
ld31.graphic.GhostShader.__super__ = hxsl.Shader;
ld31.graphic.GhostShader.prototype = $extend(hxsl.Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.color__;
		default:
		}
		return null;
	}
	,__class__: ld31.graphic.GhostShader
});
ld31.graphic.MapObject = function(parent) {
	h3d.scene.Object.call(this,parent);
	this.rP = new ld31.graphic.MapPrim();
	this.rM = new h3d.scene.Mesh(this.rP,ld31.graphic.CubeMesh.getMatR(),parent);
	this.gP = new ld31.graphic.MapPrim();
	this.gM = new h3d.scene.Mesh(this.gP,ld31.graphic.CubeMesh.getMatG(),parent);
	this.bP = new ld31.graphic.MapPrim();
	this.bM = new h3d.scene.Mesh(this.bP,ld31.graphic.CubeMesh.getMatB(),parent);
	this.outP = new ld31.graphic.MapPrim();
	this.outM = new h3d.scene.Mesh(this.outP,ld31.graphic.CubeMesh.getMatOut(),parent);
};
$hxClasses["ld31.graphic.MapObject"] = ld31.graphic.MapObject;
ld31.graphic.MapObject.__name__ = ["ld31","graphic","MapObject"];
ld31.graphic.MapObject.__super__ = h3d.scene.Object;
ld31.graphic.MapObject.prototype = $extend(h3d.scene.Object.prototype,{
	addSquare: function(type,x,y) {
		if(type == 2) this.rP.addSquare(x,y); else if(type == 3) this.gP.addSquare(x,y); else if(type == 4) this.bP.addSquare(x,y); else if(type == 6) this.outP.addSquare(x,y);
	}
	,__class__: ld31.graphic.MapObject
});
ld31.graphic.MapPrim = function() {
	h3d.prim.Polygon.call(this,[]);
};
$hxClasses["ld31.graphic.MapPrim"] = ld31.graphic.MapPrim;
ld31.graphic.MapPrim.__name__ = ["ld31","graphic","MapPrim"];
ld31.graphic.MapPrim.__super__ = h3d.prim.Polygon;
ld31.graphic.MapPrim.prototype = $extend(h3d.prim.Polygon.prototype,{
	addSquare: function(x,y) {
		var iP = this.points.length;
		this.points.push(new h3d.col.Point(x - .5,y - .5,0));
		this.points.push(new h3d.col.Point(x + .5,y - .5,0));
		this.points.push(new h3d.col.Point(x - .5,y + .5,0));
		this.points.push(new h3d.col.Point(x + .5,y + .5,0));
		if(this.idx == null) {
			var this1;
			this1 = new Array(0);
			this.idx = this1;
		}
		this.idx.push(iP);
		this.idx.push(iP + 1);
		this.idx.push(iP + 2);
		this.idx.push(iP + 2);
		this.idx.push(iP + 1);
		this.idx.push(iP + 3);
		this.alloc((function($this) {
			var $r;
			if(h3d.Engine.CURRENT == null) throw "no current context, please do this operation after engine init/creation";
			$r = h3d.Engine.CURRENT;
			return $r;
		}(this)));
	}
	,__class__: ld31.graphic.MapPrim
});
ld31.graphic.OutShader = function() {
	this.color__ = new h3d.Vector();
	hxsl.Shader.call(this);
};
$hxClasses["ld31.graphic.OutShader"] = ld31.graphic.OutShader;
ld31.graphic.OutShader.__name__ = ["ld31","graphic","OutShader"];
ld31.graphic.OutShader.__super__ = hxsl.Shader;
ld31.graphic.OutShader.prototype = $extend(hxsl.Shader.prototype,{
	updateConstants: function(globals) {
		this.constBits = 0;
		this.updateConstantsFinal(globals);
	}
	,getParamValue: function(index) {
		switch(index) {
		case 0:
			return this.color__;
		default:
		}
		return null;
	}
	,__class__: ld31.graphic.OutShader
});
ld31.graphic.PlayerMesh = function(parent) {
	var prim = new h3d.prim.GeoSphere(3);
	var mat = new h3d.mat.MeshMaterial();
	mat.mshader.color__.setColor(6710886,null);
	h3d.scene.Mesh.call(this,prim,mat,parent);
};
$hxClasses["ld31.graphic.PlayerMesh"] = ld31.graphic.PlayerMesh;
ld31.graphic.PlayerMesh.__name__ = ["ld31","graphic","PlayerMesh"];
ld31.graphic.PlayerMesh.__super__ = h3d.scene.Mesh;
ld31.graphic.PlayerMesh.prototype = $extend(h3d.scene.Mesh.prototype,{
	__class__: ld31.graphic.PlayerMesh
});
ld31.graphic.PolyominoObject = function(pc,parent,ghost) {
	if(ghost == null) ghost = false;
	h3d.scene.Object.call(this,parent);
	var f = pc.form;
	var _g1 = 0;
	var _g = f.length;
	while(_g1 < _g) {
		var j = _g1++;
		var _g3 = 0;
		var _g2 = f[j].length;
		while(_g3 < _g2) {
			var i = _g3++;
			if(f[j][i] == 0) continue;
			var c = new ld31.graphic.CubeMesh(pc.color,this,ghost);
			c.x = i;
			c.flags |= 1;
			true;
			i;
			c.y = j;
			c.flags |= 1;
			true;
			j;
		}
	}
};
$hxClasses["ld31.graphic.PolyominoObject"] = ld31.graphic.PolyominoObject;
ld31.graphic.PolyominoObject.__name__ = ["ld31","graphic","PolyominoObject"];
ld31.graphic.PolyominoObject.__super__ = h3d.scene.Object;
ld31.graphic.PolyominoObject.prototype = $extend(h3d.scene.Object.prototype,{
	__class__: ld31.graphic.PolyominoObject
});
ld31.graphic.Render = function(callb) {
	this._onInit = callb;
	this.engine = this.engine = new h3d.Engine();
	this.engine.onReady = $bind(this,this.setup);
	this.engine.init();
};
$hxClasses["ld31.graphic.Render"] = ld31.graphic.Render;
ld31.graphic.Render.__name__ = ["ld31","graphic","Render"];
ld31.graphic.Render.prototype = {
	rot: function(dir) {
		var newPos = { x : 0, y : 0, z : 0};
		if(dir._dir == ld31.math.Dir.DIR_UP) newPos.y = -1; else if(dir._dir == ld31.math.Dir.DIR_RIGHT) newPos.x = 1; else if(dir._dir == ld31.math.Dir.DIR_DOWN) newPos.y = 1; else if(dir._dir == ld31.math.Dir.DIR_LEFT) newPos.x = -1;
		tweenx909.TweenX.to(this.s3d.camera.up,newPos,null,null,null,null,null,null,null,null,{ fileName : "Render.hx", lineNumber : 52, className : "ld31.graphic.Render", methodName : "rot"}).time(0.5).ease(tweenx909.EaseX.circOut);
	}
	,onResize: function() {
	}
	,setup: function() {
		var _g = this;
		this.engine.onResized = function() {
			_g.s2d.checkResize();
			_g.onResize();
		};
		this.s3d = new h3d.scene.Scene();
		this.s2d = new h2d.Scene();
		this.s2d.setFixedSize(1280,720);
		this.s3d.addPass(this.s2d);
		this.engine.backgroundColor = 0;
		var p = ld31.gameplay.Tilemap.getNeutralPos();
		this.s3d.camera.zoom = 4;
		this.s3d.camera.up.set(0.,-1.,0.,null);
		this.s3d.camera.pos.set(p.x,p.y,13. * this.s3d.camera.zoom,null);
		this.s3d.camera.target.set(p.x,p.y,null,null);
		var bg = new ld31.graphic.TimerObject(this.s3d);
		bg.scaleX = 13;
		bg.flags |= 1;
		true;
		13;
		bg.scaleY = 13;
		bg.flags |= 1;
		true;
		13;
		bg.setPos(Math.floor(6.5),Math.floor(6.5),-0.01);
		this.map = new ld31.graphic.MapObject(this.s3d);
		this._onInit();
	}
	,refresh: function() {
		this.engine.render(this.s3d);
	}
	,addMsg: function(num,time) {
		if(time == null) time = -1.0;
		var _g = this;
		if(this._msg != null) this._msg.remove();
		if(this._tile != null) this._tile.dispose();
		if(num == 1) this._tile = hxd.Res.loader.loadImage("p01move.png").toTile(); else if(num == 2) this._tile = hxd.Res.loader.loadImage("p02jump.png").toTile(); else if(num == 3) this._tile = hxd.Res.loader.loadImage("p03add.png").toTile(); else if(num == 4) this._tile = hxd.Res.loader.loadImage("p04enjoy.png").toTile(); else return;
		this._tile = this._tile.center();
		this._msg = new h2d.Bitmap(this._tile,this.s2d);
		this._msg.set_x(640.);
		this._msg.set_y(503.99999999999994);
		if(time > 0) tweenx909.TweenX.to(this,{ },null,null,null,null,null,null,null,null,{ fileName : "Render.hx", lineNumber : 137, className : "ld31.graphic.Render", methodName : "addMsg"}).time(2).onFinish(function() {
			_g.addMsg(-1);
		});
	}
	,__class__: ld31.graphic.Render
};
ld31.graphic.TimerObject = function(parent) {
	h3d.scene.Object.call(this,parent);
	var prim = new ld31.graphic.TimerPrim();
	var c1 = new h3d.mat.MeshMaterial();
	c1.mshader.color__.setColor(16777215,null);
	var c2 = new h3d.mat.MeshMaterial();
	c2.mshader.color__.setColor(13421772,null);
	var m1 = new h3d.scene.Mesh(prim,c1,this);
	var m2 = new h3d.scene.Mesh(prim,c2,this);
	m2.setRotate(.0,.0,1.5707963267948966);
};
$hxClasses["ld31.graphic.TimerObject"] = ld31.graphic.TimerObject;
ld31.graphic.TimerObject.__name__ = ["ld31","graphic","TimerObject"];
ld31.graphic.TimerObject.__super__ = h3d.scene.Object;
ld31.graphic.TimerObject.prototype = $extend(h3d.scene.Object.prototype,{
	__class__: ld31.graphic.TimerObject
});
ld31.graphic.TimerPrim = function() {
	var z = 0.5;
	var p = [new h3d.col.Point(-.5,-.5,0),new h3d.col.Point(.0,.0,0),new h3d.col.Point(-.5,.5,0),new h3d.col.Point(.5,-.5,0),new h3d.col.Point(.5,.5,0)];
	var idx;
	var this1;
	this1 = new Array(0);
	idx = this1;
	idx.push(0);
	idx.push(1);
	idx.push(2);
	idx.push(3);
	idx.push(4);
	idx.push(1);
	h3d.prim.Polygon.call(this,p,idx);
};
$hxClasses["ld31.graphic.TimerPrim"] = ld31.graphic.TimerPrim;
ld31.graphic.TimerPrim.__name__ = ["ld31","graphic","TimerPrim"];
ld31.graphic.TimerPrim.__super__ = h3d.prim.Polygon;
ld31.graphic.TimerPrim.prototype = $extend(h3d.prim.Polygon.prototype,{
	__class__: ld31.graphic.TimerPrim
});
ld31.math = {};
ld31.math.Bounds = function() {
};
$hxClasses["ld31.math.Bounds"] = ld31.math.Bounds;
ld31.math.Bounds.__name__ = ["ld31","math","Bounds"];
ld31.math.Bounds.prototype = {
	__class__: ld31.math.Bounds
};
ld31.math.Contacts = function() {
};
$hxClasses["ld31.math.Contacts"] = ld31.math.Contacts;
ld31.math.Contacts.__name__ = ["ld31","math","Contacts"];
ld31.math.Contacts.prototype = {
	rot: function(dir) {
		var nc = new ld31.math.Contacts();
		nc.on = this.on;
		if(dir._dir == ld31.math.Dir.DIR_UP) {
			nc.left = this.left;
			nc.top = this.top;
			nc.right = this.right;
			nc.bottom = this.bottom;
		} else if(dir._dir == ld31.math.Dir.DIR_LEFT) {
			nc.left = this.bottom;
			nc.top = this.left;
			nc.right = this.top;
			nc.bottom = this.right;
		} else if(dir._dir == ld31.math.Dir.DIR_DOWN) {
			nc.left = this.right;
			nc.top = this.bottom;
			nc.right = this.left;
			nc.bottom = this.top;
		} else if(dir._dir == ld31.math.Dir.DIR_RIGHT) {
			nc.left = this.top;
			nc.top = this.right;
			nc.right = this.bottom;
			nc.bottom = this.left;
		}
		return nc;
	}
	,__class__: ld31.math.Contacts
};
ld31.math.Dir = function(dir) {
	if(dir == null) dir = 0;
	if(dir < 0) this._dir = dir % 4 + 4; else this._dir = dir % 4;
};
$hxClasses["ld31.math.Dir"] = ld31.math.Dir;
ld31.math.Dir.__name__ = ["ld31","math","Dir"];
ld31.math.Dir.getDir = function(playerX,playerY,tm,lastDir) {
	var playerSize = 1;
	if(lastDir._dir == ld31.math.Dir.DIR_UP || lastDir._dir == ld31.math.Dir.DIR_DOWN) {
		if(playerX + playerSize < tm.bounds.xMin) return new ld31.math.Dir(ld31.math.Dir.DIR_LEFT);
		if(playerX - playerSize > tm.bounds.xMax) return new ld31.math.Dir(ld31.math.Dir.DIR_RIGHT);
	}
	if(lastDir._dir == ld31.math.Dir.DIR_LEFT || lastDir._dir == ld31.math.Dir.DIR_RIGHT) {
		if(playerY + playerSize < tm.bounds.yMin) return new ld31.math.Dir(ld31.math.Dir.DIR_UP);
		if(playerY - playerSize > tm.bounds.yMax) return new ld31.math.Dir(ld31.math.Dir.DIR_DOWN);
	}
	return lastDir;
};
ld31.math.Dir.prototype = {
	__class__: ld31.math.Dir
};
ld31.math.Vec2d = function(x,y) {
	if(y == null) y = 0.;
	if(x == null) x = 0.;
	h2d.col.Point.call(this,x,y);
};
$hxClasses["ld31.math.Vec2d"] = ld31.math.Vec2d;
ld31.math.Vec2d.__name__ = ["ld31","math","Vec2d"];
ld31.math.Vec2d.__super__ = h2d.col.Point;
ld31.math.Vec2d.prototype = $extend(h2d.col.Point.prototype,{
	cloneAndRot: function(dir) {
		var n = new ld31.math.Vec2d();
		if(dir._dir == ld31.math.Dir.DIR_UP) {
			n.x = this.x;
			n.y = this.y;
		} else if(dir._dir == ld31.math.Dir.DIR_RIGHT) {
			n.x = -this.y;
			n.y = this.x;
		} else if(dir._dir == ld31.math.Dir.DIR_DOWN) {
			n.x = -this.x;
			n.y = -this.y;
		} else if(dir._dir == ld31.math.Dir.DIR_LEFT) {
			n.x = this.y;
			n.y = -this.x;
		}
		return n;
	}
	,__class__: ld31.math.Vec2d
});
var tweenx909 = {};
tweenx909.EaseX = function() { };
$hxClasses["tweenx909.EaseX"] = tweenx909.EaseX;
tweenx909.EaseX.__name__ = ["tweenx909","EaseX"];
tweenx909.EaseX.linear = function(t) {
	return t;
};
tweenx909.EaseX.circIn = function(t) {
	return 1 - Math.sqrt(1 - t * t);
};
tweenx909.EaseX.circOut = function(t) {
	return Math.sqrt(t * (2 - t));
};
tweenx909.advanced = {};
tweenx909.advanced.CommandX = function(command,posInfos) {
	this.command = command;
	this.definedPosInfos = posInfos;
};
$hxClasses["tweenx909.advanced.CommandX"] = tweenx909.advanced.CommandX;
tweenx909.advanced.CommandX.__name__ = ["tweenx909","advanced","CommandX"];
tweenx909.advanced.CommandX.prototype = {
	__class__: tweenx909.advanced.CommandX
};
tweenx909.rule = {};
tweenx909.rule.BoolRuleX = function() { };
$hxClasses["tweenx909.rule.BoolRuleX"] = tweenx909.rule.BoolRuleX;
tweenx909.rule.BoolRuleX.__name__ = ["tweenx909","rule","BoolRuleX"];
tweenx909.rule.BoolRuleX.calc = function(_from,_to,t1,t2,tween) {
	return 0 < (_from?1:0) * t2 + (_to?1:0) * t1;
};
tweenx909.rule.BoolRuleX.defaultFrom = function(value,_to,tween) {
	return value;
};
tweenx909.rule.ArrayRuleX = function() { };
$hxClasses["tweenx909.rule.ArrayRuleX"] = tweenx909.rule.ArrayRuleX;
tweenx909.rule.ArrayRuleX.__name__ = ["tweenx909","rule","ArrayRuleX"];
tweenx909.rule.ArrayRuleX.calc = function(_from,_to,t1,t2,tween) {
	var fi = $iterator(_from)();
	var arr = [];
	var $it0 = $iterator(_to)();
	while( $it0.hasNext() ) {
		var t = $it0.next();
		var f = fi.next();
		arr.push(tweenx909.rule.ArrayRuleX._calc(f,t,t1,t2,tween));
	}
	return arr;
};
tweenx909.rule.ArrayRuleX._calc = function(_from,_to,t1,t2,tween) {
	if(typeof(_to) == "number") return _from * t2 + _to * t1; else {
		var result = null;
		var ok = false;
		var $it0 = $iterator(tweenx909.TweenX.get_rules())();
		while( $it0.hasNext() ) {
			var r = $it0.next();
			if(js.Boot.__instanceof(_to,r.inputClass)) {
				ok = true;
				result = r.calc(_from,_to,t1,t2,tween);
				break;
			}
		}
		if(!ok) {
			var eh = tween;
			throw eh.error("The tween rule for " + Type.getClassName(Type.getClass(_to)) + " is not defined");
		}
		return result;
	}
};
tweenx909.rule.ArrayRuleX.defaultFrom = function(value,_to,tween) {
	var eh = tween;
	if(value != null) {
		var arr = [];
		var $it0 = $iterator(_to)();
		while( $it0.hasNext() ) {
			var t = $it0.next();
			arr.push(null);
		}
	} else if(Lambda.count(value) != Lambda.count(_to)) throw eh.error("The array length must be same with start.");
	var result = [];
	var it = $iterator(_to)();
	var $it1 = $iterator(value)();
	while( $it1.hasNext() ) {
		var v = $it1.next();
		var t1 = it.next();
		result.push(tweenx909.rule.ArrayRuleX._defaultFrom(v,t1,tween));
	}
	return result;
};
tweenx909.rule.ArrayRuleX._defaultFrom = function(value,_to,tween) {
	if(typeof(_to) == "number") return value;
	var $it0 = $iterator(tweenx909.TweenX.get_rules())();
	while( $it0.hasNext() ) {
		var r = $it0.next();
		if(js.Boot.__instanceof(_to,r.inputClass)) return r.defaultFrom(value,_to,tween);
	}
	var eh = tween;
	throw eh.error("The tween rule for " + Type.getClassName(Type.getClass(_to)) + " is not defined");
	return null;
};
tweenx909.rule.TimelineX = function() { };
$hxClasses["tweenx909.rule.TimelineX"] = tweenx909.rule.TimelineX;
tweenx909.rule.TimelineX.__name__ = ["tweenx909","rule","TimelineX"];
tweenx909.rule.TimelineX.calc = function(_from,_to,t1,t2,tween) {
	var t = t1 * _to.length;
	var ts = _to.timeline;
	var l = ts.length;
	var min = 0;
	var max = l;
	var n = max >> 1;
	while(max - min > 1) {
		var val = ts[n];
		if(t < val) max = n; else min = n;
		n = min + (max - min >> 1);
	}
	return _to.data[min];
};
tweenx909.rule.TimelineX.defaultFrom = function(value,_to,tween) {
	return null;
};
tweenx909.rule.TimelineX.prototype = {
	__class__: tweenx909.rule.TimelineX
};
tweenx909.rule.RgbX = function(red,green,blue) {
	this.r = red;
	this.g = green;
	this.b = blue;
};
$hxClasses["tweenx909.rule.RgbX"] = tweenx909.rule.RgbX;
tweenx909.rule.RgbX.__name__ = ["tweenx909","rule","RgbX"];
tweenx909.rule.RgbX.calc = function(_from,_to,t1,t2,tween) {
	var r = (_from.r * t2 + _to.r * t1) * 255 | 0;
	if(r < 0) r = 0; else if(r > 255) r = 255;
	var g = (_from.g * t2 + _to.g * t1) * 255 | 0;
	if(g < 0) g = 0; else if(g > 255) g = 255;
	var b = (_from.b * t2 + _to.b * t1) * 255 | 0;
	if(b < 0) b = 0; else if(b > 255) b = 255;
	return r << 16 | g << 8 | b;
};
tweenx909.rule.RgbX.defaultFrom = function(value,_to,tween) {
	return tweenx909.rule.RgbX.of(value);
};
tweenx909.rule.RgbX.of = function(color) {
	return new tweenx909.rule.RgbX((color >> 16 & 255) / 255,(color >> 8 & 255) / 255,(color & 255) / 255);
};
tweenx909.rule.RgbX.prototype = {
	__class__: tweenx909.rule.RgbX
};
tweenx909.rule.HsvX = function(hue,saturation,value) {
	this.h = hue;
	this.s = saturation;
	this.v = value;
};
$hxClasses["tweenx909.rule.HsvX"] = tweenx909.rule.HsvX;
tweenx909.rule.HsvX.__name__ = ["tweenx909","rule","HsvX"];
tweenx909.rule.HsvX.calc = function(_from,_to,t1,t2,tween) {
	var h = _from.h * t2 + _to.h * t1;
	var s = _from.s * t2 + _to.s * t1;
	var v = _from.v * t2 + _to.v * t1;
	h = (h - Math.floor(h)) * 6;
	var hi = Math.floor(h);
	if(s > 1) s = 1;
	if(s < 0) s = 0;
	if(v > 1) v = 1;
	if(v < 0) v = 0;
	var m = v * (1 - s);
	var f = h - hi;
	var r = .0;
	var g = .0;
	var b = .0;
	switch(hi) {
	case 0:
		r = v;
		g = v * (1 - s * (1 - f));
		b = m;
		break;
	case 1:
		r = v * (1 - s * f);
		g = v;
		b = m;
		break;
	case 2:
		r = m;
		g = v;
		b = v * (1 - s * (1 - f));
		break;
	case 3:
		r = m;
		g = v * (1 - s * f);
		b = v;
		break;
	case 4:
		r = v * (1 - s * (1 - f));
		g = m;
		b = v;
		break;
	case 5:
		r = v;
		g = m;
		b = v * (1 - s * f);
		break;
	}
	return (r * 255 | 0) << 16 | (g * 255 | 0) << 8 | (b * 255 | 0);
};
tweenx909.rule.HsvX.defaultFrom = function(value,_to,tween) {
	return tweenx909.rule.HsvX.of(value);
};
tweenx909.rule.HsvX.of = function(color,hueIndex) {
	if(hueIndex == null) hueIndex = 0;
	var r = (color >> 16 & 255) / 255;
	var g = (color >> 8 & 255) / 255;
	var b = (color & 255) / 255;
	var max;
	var min;
	var diff;
	var h;
	if(r < g) {
		if(g < b) {
			max = b;
			min = r;
			h = (4 + (r - g) / (diff = max - min)) / 6;
		} else {
			max = g;
			if(r < b) min = r; else min = b;
			h = (2 + (b - r) / (diff = max - min)) / 6;
		}
	} else if(r < b) {
		max = b;
		min = g;
		h = (4 + (r - g) / (diff = max - min)) / 6;
	} else {
		max = r;
		if(g < b) min = g; else min = b;
		h = (g - b) / (diff = max - min) / 6;
	}
	if(h < 0) h += 1;
	var s = diff / max;
	return new tweenx909.rule.HsvX(h + hueIndex,s,max);
};
tweenx909.rule.HsvX.prototype = {
	__class__: tweenx909.rule.HsvX
};
tweenx909.rule.ArgbX = function(alpha,red,green,blue) {
	this.a = alpha;
	this.r = red;
	this.g = green;
	this.b = blue;
};
$hxClasses["tweenx909.rule.ArgbX"] = tweenx909.rule.ArgbX;
tweenx909.rule.ArgbX.__name__ = ["tweenx909","rule","ArgbX"];
tweenx909.rule.ArgbX.calc = function(_from,_to,t1,t2,tween) {
	var a = (_from.a * t2 + _to.a * t1) * 255 | 0;
	if(a < 0) a = 0; else if(a > 255) a = 255;
	var r = (_from.r * t2 + _to.r * t1) * 255 | 0;
	if(r < 0) r = 0; else if(r > 255) r = 255;
	var g = (_from.g * t2 + _to.g * t1) * 255 | 0;
	if(g < 0) g = 0; else if(g > 255) g = 255;
	var b = (_from.b * t2 + _to.b * t1) * 255 | 0;
	if(b < 0) b = 0; else if(b > 255) b = 255;
	return a << 24 | r << 16 | g << 8 | b;
};
tweenx909.rule.ArgbX.defaultFrom = function(value,_to,tween) {
	return tweenx909.rule.ArgbX.of(value);
};
tweenx909.rule.ArgbX.of = function(color) {
	return new tweenx909.rule.ArgbX((color >>> 24 & 255) / 255,(color >> 16 & 255) / 255,(color >> 8 & 255) / 255,(color & 255) / 255);
};
tweenx909.rule.ArgbX.prototype = {
	__class__: tweenx909.rule.ArgbX
};
tweenx909.rule.AhsvX = function(alpha,hue,saturation,value) {
	this.a = alpha;
	this.h = hue;
	this.s = saturation;
	this.v = value;
};
$hxClasses["tweenx909.rule.AhsvX"] = tweenx909.rule.AhsvX;
tweenx909.rule.AhsvX.__name__ = ["tweenx909","rule","AhsvX"];
tweenx909.rule.AhsvX.calc = function(_from,_to,t1,t2,tween) {
	var a = _from.a * t2 + _to.a * t1;
	if(a > 1) a = 1;
	if(a < 0) a = 0;
	var h = _from.h * t2 + _to.h * t1;
	var s = _from.s * t2 + _to.s * t1;
	var v = _from.v * t2 + _to.v * t1;
	h = (h - Math.floor(h)) * 6;
	var hi = Math.floor(h);
	if(s > 1) s = 1;
	if(s < 0) s = 0;
	if(v > 1) v = 1;
	if(v < 0) v = 0;
	var m = v * (1 - s);
	var f = h - hi;
	var r = .0;
	var g = .0;
	var b = .0;
	switch(hi) {
	case 0:
		r = v;
		g = v * (1 - s * (1 - f));
		b = m;
		break;
	case 1:
		r = v * (1 - s * f);
		g = v;
		b = m;
		break;
	case 2:
		r = m;
		g = v;
		b = v * (1 - s * (1 - f));
		break;
	case 3:
		r = m;
		g = v * (1 - s * f);
		b = v;
		break;
	case 4:
		r = v * (1 - s * (1 - f));
		g = m;
		b = v;
		break;
	case 5:
		r = v;
		g = m;
		b = v * (1 - s * f);
		break;
	}
	return (a * 255 | 0) << 24 | (r * 255 | 0) << 16 | (g * 255 | 0) << 8 | (b * 255 | 0);
};
tweenx909.rule.AhsvX.defaultFrom = function(value,_to,tween) {
	return tweenx909.rule.AhsvX.of(value);
};
tweenx909.rule.AhsvX.of = function(color,hueIndex) {
	if(hueIndex == null) hueIndex = 0;
	var a = (color >>> 24 & 255) / 255;
	var r = (color >> 16 & 255) / 255;
	var g = (color >> 8 & 255) / 255;
	var b = (color & 255) / 255;
	var max;
	var min;
	var diff;
	var h;
	if(r < g) {
		if(g < b) {
			max = b;
			min = r;
			h = (4 + (r - g) / (diff = max - min)) / 6;
		} else {
			max = g;
			if(r < b) min = r; else min = b;
			h = (2 + (b - r) / (diff = max - min)) / 6;
		}
	} else if(r < b) {
		max = b;
		min = g;
		h = (4 + (r - g) / (diff = max - min)) / 6;
	} else {
		max = r;
		if(g < b) min = g; else min = b;
		h = (g - b) / (diff = max - min) / 6;
	}
	if(h < 0) h += 1;
	var s = diff / max;
	return new tweenx909.rule.AhsvX(a,h + hueIndex,s,max);
};
tweenx909.rule.AhsvX.prototype = {
	__class__: tweenx909.rule.AhsvX
};
tweenx909.rule.QuakeX = function(value,scale,ease) {
	this.value = value;
	this.scale = scale;
	if(ease == null) this.ease = $bind(this,this.none); else this.ease = ease;
};
$hxClasses["tweenx909.rule.QuakeX"] = tweenx909.rule.QuakeX;
tweenx909.rule.QuakeX.__name__ = ["tweenx909","rule","QuakeX"];
tweenx909.rule.QuakeX.calc = function(_from,_to,t1,t2,tween) {
	var p;
	if(t1 < 0.5) p = _from.ease(t1 * 2); else p = _to.ease(t2 * 2);
	return _from.value * t2 + _to.value * t1 + p * (Math.random() * 2 - 1) * (_from.scale * t2 + _to.scale * t1);
};
tweenx909.rule.QuakeX.defaultFrom = function(value,_to,tween) {
	return new tweenx909.rule.QuakeX(value,_to.scale,_to.ease);
};
tweenx909.rule.QuakeX.prototype = {
	none: function(t) {
		if(t <= 0) return 0; else return 1;
	}
	,__class__: tweenx909.rule.QuakeX
};
tweenx909.advanced.UpdateModeX = $hxClasses["tweenx909.advanced.UpdateModeX"] = { __ename__ : true, __constructs__ : ["MANUAL","TIME"] };
tweenx909.advanced.UpdateModeX.MANUAL = ["MANUAL",0];
tweenx909.advanced.UpdateModeX.MANUAL.toString = $estr;
tweenx909.advanced.UpdateModeX.MANUAL.__enum__ = tweenx909.advanced.UpdateModeX;
tweenx909.advanced.UpdateModeX.TIME = function(frameRate) { var $x = ["TIME",1,frameRate]; $x.__enum__ = tweenx909.advanced.UpdateModeX; $x.toString = $estr; return $x; };
tweenx909.advanced.UpdateModeX.__empty_constructs__ = [tweenx909.advanced.UpdateModeX.MANUAL];
tweenx909.TweenX = function(type,time,ease,delay,repeat,yoyo,zigzag,interval,autoPlay,posInfos) {
	this.timeScale = 1;
	this._skip = null;
	this._currentTime = 0;
	tweenx909.advanced.CommandX.call(this,tweenx909.advanced.CommandTypeX.TWEEN(this),posInfos);
	this._type = type;
	this._currentTime = 0;
	switch(type[1]) {
	case 0:
		var g = type[2];
		this._easeIsDefault = false;
		if(ease == null) this._ease = tweenx909.EaseX.linear; else this._ease = ease;
		break;
	default:
		if(this._easeIsDefault = ease == null) this._ease = tweenx909.TweenX.defaultEase; else this._ease = ease;
	}
	if(this._timeIsDefault = time == null) this._time = tweenx909.TweenX.defaultTime; else this._time = time;
	if(this._delayIsDefault = delay == null) this._delay = tweenx909.TweenX.defaultDelay; else this._delay = delay;
	if(this._intervalIsDefault = interval == null) this._interval = tweenx909.TweenX.defaultInterval; else this._interval = interval;
	if(this._repeatIsDefault = repeat == null) this._repeat = tweenx909.TweenX.defaultRepeat; else this._repeat = repeat;
	if(this._yoyoIsDefault = yoyo == null) this._yoyo = tweenx909.TweenX.defaultYoyo; else this._yoyo = yoyo;
	if(this._zigzagIsDefault = zigzag == null) this._zigzag = tweenx909.TweenX.defaultZigZag; else this._zigzag = zigzag;
	if(this._autoPlayIsDefault = autoPlay == null) this._autoPlay = tweenx909.TweenX.defaultAutoPlay; else this._autoPlay = autoPlay;
	this._rest = 0;
	this._eventListeners = [];
	this.id = tweenx909.TweenX.idCounter++;
	tweenx909.TweenX._addedTweens.push(this);
	if(!tweenx909.TweenX.managerInited) tweenx909.TweenX.initManager();
};
$hxClasses["tweenx909.TweenX"] = tweenx909.TweenX;
tweenx909.TweenX.__name__ = ["tweenx909","TweenX"];
tweenx909.TweenX.__properties__ = {get_rules:"get_rules"}
tweenx909.TweenX.get_rules = function() {
	return tweenx909.TweenX._rules;
};
tweenx909.TweenX.dumpDefaults = function() {
	return new tweenx909.advanced.DefaultsX().dump();
};
tweenx909.TweenX.setDefaults = function(defaults) {
	defaults.apply();
};
tweenx909.TweenX.initManager = function() {
	tweenx909.TweenX.managerInited = true;
	tweenx909.TweenX.stopUpdater();
	{
		var _g = tweenx909.TweenX.updateMode;
		switch(_g[1]) {
		case 1:
			var f = _g[2];
			tweenx909.TweenX.prevTime = new Date().getTime();
			tweenx909.TweenX.setInterval(tweenx909.TweenX.mainLoop,Math.round(1000 / f));
			break;
		case 0:
			break;
		}
	}
};
tweenx909.TweenX.mainLoop = function() {
	{
		var _g = tweenx909.TweenX.updateMode;
		switch(_g[1]) {
		case 1:
			var f = _g[2];
			tweenx909.TweenX.manualUpdate((new Date().getTime() - tweenx909.TweenX.prevTime) / 1000);
			tweenx909.TweenX.prevTime = new Date().getTime();
			break;
		case 0:
			throw "invalid auto update";
			break;
		}
	}
};
tweenx909.TweenX.stopUpdater = function() {
	if(tweenx909.TweenX._timer != null) {
		tweenx909.TweenX._timer.stop();
		tweenx909.TweenX._timer = null;
	}
};
tweenx909.TweenX.manualUpdate = function(time) {
	tweenx909.TweenX.initTweens();
	var l = tweenx909.TweenX._tweens.length;
	var i = 0;
	while(i < l) {
		var t = tweenx909.TweenX._tweens[i++];
		t._update(time * t.timeScale * tweenx909.TweenX.topLevelTimeScale);
		if(!t.playing) {
			tweenx909.TweenX._tweens.splice(--i,1);
			l--;
		}
	}
	tweenx909.TweenX._resetLog();
};
tweenx909.TweenX.initTweens = function() {
	var _g = 0;
	var _g1 = tweenx909.TweenX._addedTweens;
	while(_g < _g1.length) {
		var t = _g1[_g];
		++_g;
		t._init();
	}
	tweenx909.TweenX._addedTweens.splice(0,tweenx909.TweenX._addedTweens.length);
};
tweenx909.TweenX.to = function(target,_to,time,ease,delay,repeat,yoyo,zigzag,interval,autoPlay,posInfos) {
	if(_to == null) _to = { };
	if(!tweenx909.TweenX.isIterable(target)) return new tweenx909.advanced.StandardTweenX(tweenx909.advanced.TweenTypeX.FROM_TO(target,{ },_to),time,ease,delay,repeat,yoyo,zigzag,interval,autoPlay,posInfos); else return new tweenx909.advanced.StandardTweenX(tweenx909.advanced.TweenTypeX.ARRAY(target,[{ }],[_to]),time,ease,delay,repeat,yoyo,zigzag,interval,autoPlay,posInfos);
};
tweenx909.TweenX.setInterval = function(f,t) {
	if(tweenx909.TweenX._timer != null) tweenx909.TweenX._timer.stop();
	tweenx909.TweenX._timer = new haxe.Timer(t);
	tweenx909.TweenX._timer.run = f;
};
tweenx909.TweenX._resetLog = function() {
	tweenx909.TweenX._initLog = [];
	tweenx909.TweenX.dictionary = new haxe.ds.ObjectMap();
};
tweenx909.TweenX.field = function(o,key) {
	var tmp;
	if(o == null) return null; else if(o.__properties__ && (tmp = o.__properties__["get_" + key])) return o[tmp](); else return o[key];
};
tweenx909.TweenX.setField = function(o,key,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + key])) o[tmp](value); else o[key] = value;
};
tweenx909.TweenX.isIterable = function(d) {
	return d != null && ((d instanceof Array) && d.__enum__ == null || Object.prototype.hasOwnProperty.call(d,"iterator") && Reflect.isFunction($iterator(d)) && $iterator(d)() != null);
};
tweenx909.TweenX.__super__ = tweenx909.advanced.CommandX;
tweenx909.TweenX.prototype = $extend(tweenx909.advanced.CommandX.prototype,{
	get_currentTime: function() {
		var t = this.get_totalTime();
		var p;
		if(this.backward) p = t - this._currentTime; else p = this._currentTime;
		if(p < 0) p = 0;
		if(p > t) p = t;
		return p;
	}
	,get_singleTime: function() {
		return this._time + this._interval;
	}
	,get_totalTime: function() {
		return this._delay + this.get_singleTime() * this._repeat - this._interval + this._rest;
	}
	,error: function(msg) {
		var p = this.definedPosInfos;
		return msg + "(Tween_" + this.id + " was generated at " + p.className + "/" + p.methodName + "() [" + p.fileName + ":" + p.lineNumber + "])";
	}
	,play: function() {
		if(this._parent != null) throw this.error("Can't play serialized object directly");
		if(this.playing) return this;
		if(!this._inited) this._init();
		this.playing = true;
		tweenx909.TweenX._tweens.push(this);
		this.dispatch(0);
		if(this._onPlay != null) this._onPlay();
		this.update(1.4901161415892264e-008);
		return this;
	}
	,_stop: function() {
		if(!this.playing) return;
		this.playing = false;
		this.dispatch(9);
		if(this._onStop != null) this._onStop();
	}
	,update: function(time) {
		if(this._parent != null) throw this.error("Can't stop serialized object directly");
		this._update(time * this.timeScale * tweenx909.TweenX.topLevelTimeScale);
		return this;
	}
	,_invert: function() {
		this._currentTime = this._totalTime - this._currentTime;
		if(this._repeat % 2 == 0) this._odd = !this._odd;
		this._inverted = !this._inverted;
		var d = this._delay;
		this._delay = this._rest;
		this._rest = d;
	}
	,_init: function() {
		if(this._inited) return;
		this._inited = true;
		if(tweenx909.TweenX._groupDefaults) {
			if(this._easeIsDefault) this._ease = tweenx909.TweenX.defaultEase;
			if(this._timeIsDefault) this._time = tweenx909.TweenX.defaultTime;
			if(this._delayIsDefault) this._delay = tweenx909.TweenX.defaultDelay;
			if(this._intervalIsDefault) this._interval = tweenx909.TweenX.defaultInterval;
			if(this._repeatIsDefault) this._repeat = tweenx909.TweenX.defaultRepeat;
			if(this._yoyoIsDefault) this._yoyo = tweenx909.TweenX.defaultYoyo;
			if(this._zigzagIsDefault) this._zigzag = tweenx909.TweenX.defaultZigZag;
			if(this._autoPlayIsDefault) this._autoPlay = tweenx909.TweenX.defaultAutoPlay;
		}
		if(this._repeat == 0) this._repeat = 2147483646;
		if(this._time < 1.4901161415892264e-008) this._time = 1.4901161415892264e-008;
		var ot = new Date().getTime();
		this._fastMode = true;
		{
			var _g = this._type;
			switch(_g[1]) {
			case 2:
				var _to = _g[4];
				var _from = _g[3];
				var target = _g[2];
				this._initFromTo(target,_from,_to);
				this._toKeys = Reflect.fields(_to);
				break;
			case 1:
				var toArr = _g[4];
				var fromArr = _g[3];
				var targets = _g[2];
				var i = 0;
				var $it0 = $iterator(targets)();
				while( $it0.hasNext() ) {
					var target1 = $it0.next();
					var _from1 = fromArr[i];
					var _to1 = toArr[i];
					this._initFromTo(target1,_from1,_to1);
					if(i == 0) this._toKeys = Reflect.fields(_to1);
					i++;
				}
				break;
			case 0:
				var g = _g[2];
				this.initGroup(g);
				break;
			default:
			}
		}
		this._singleTime = this.get_singleTime();
		this._totalTime = this.get_totalTime();
		if(this._autoPlay) this.play();
	}
	,_initFromTo: function(target,_from,_to) {
		throw this.error("must be standard tween.");
	}
	,_update: function(spent) {
		if(!this._inited) this._init();
		if(spent == 0) return;
		if(this.backward) spent = -spent;
		if(spent < 0) {
			this._invert();
			this.backward = !this.backward;
			spent = -spent;
		}
		var _currentTime = this._currentTime;
		var _singleTime = this.get_singleTime();
		var _totalTime = this._totalTime;
		var time = this._time;
		var delay = this._delay;
		var untilRest = _totalTime - this._rest;
		var delaying = _currentTime - delay < 1.4901161415892264e-008;
		var resting = !delaying && 1.4901161415892264e-008 > untilRest - _currentTime;
		var body = _currentTime - delay;
		var repeatNum = Math.floor(body / _singleTime);
		var position = body - repeatNum * _singleTime;
		var intervending = 1.4901161415892264e-008 > time - position;
		this._currentTime = _currentTime += spent;
		position += spent;
		body += spent;
		if(_currentTime - delay < 1.4901161415892264e-008) {
			this.dispatch(1);
			if(this._onDelay != null) this._onDelay();
			return;
		} else if(delaying) {
			this._apply(0,0);
			this.dispatch(2);
			if(this._onHead != null) this._onHead();
			this.dispatch(3);
			if(this._onUpdate != null) this._onUpdate();
			delaying = false;
		}
		if(1.4901161415892264e-008 > untilRest - _currentTime) {
			if(!resting) {
				if(intervending) {
					this.dispatch(6);
					if(this._onRepeat != null) this._onRepeat();
					this._apply(0,repeatNum);
					this.dispatch(2);
					if(this._onHead != null) this._onHead();
					this.dispatch(3);
					if(this._onUpdate != null) this._onUpdate();
				}
				this._apply(this._time,this._repeat - 1);
				this.dispatch(3);
				if(this._onUpdate != null) this._onUpdate();
				this.dispatch(4);
				if(this._onFoot != null) this._onFoot();
			}
			if(1.4901161415892264e-008 > _totalTime - _currentTime) {
				this._currentTime = this._totalTime;
				this.dispatch(8);
				if(this._onFinish != null) this._onFinish();
				this._stop();
			} else {
				this.dispatch(7);
				if(this._onRest != null) this._onRest();
			}
		} else {
			if(1.4901161415892264e-008 > time - position) {
				if(!intervending && repeatNum >= 0) {
					this._apply(this._time,repeatNum);
					this.dispatch(3);
					if(this._onUpdate != null) this._onUpdate();
					this.dispatch(4);
					if(this._onFoot != null) this._onFoot();
				}
				if(position < _singleTime) {
					this.dispatch(5);
					if(this._onInterval != null) this._onInterval();
					return;
				} else {
					if(repeatNum >= 0) {
						this.dispatch(6);
						if(this._onRepeat != null) this._onRepeat();
						this._apply(0,repeatNum);
						this.dispatch(2);
						if(this._onHead != null) this._onHead();
						this.dispatch(3);
						if(this._onUpdate != null) this._onUpdate();
					}
					repeatNum = body / _singleTime | 0;
					position = body - repeatNum * _singleTime;
					if(1.4901161415892264e-008 > time - position) {
						this._apply(this._time,repeatNum);
						this.dispatch(3);
						if(this._onUpdate != null) this._onUpdate();
						this.dispatch(4);
						if(this._onFoot != null) this._onFoot();
						this.dispatch(5);
						if(this._onInterval != null) this._onInterval();
						return;
					}
				}
			} else if(intervending) {
				this.dispatch(6);
				if(this._onRepeat != null) this._onRepeat();
				this._apply(0,repeatNum);
				this.dispatch(2);
				if(this._onHead != null) this._onHead();
				this.dispatch(3);
				if(this._onUpdate != null) this._onUpdate();
			}
			this._apply(position,repeatNum);
			this.dispatch(3);
			if(this._onUpdate != null) this._onUpdate();
		}
	}
	,_apply: function(p,repeatNum) {
		var t = this._getPosition(p,repeatNum % 2 == 1);
		{
			var _g = this._type;
			switch(_g[1]) {
			case 2:
				var _to = _g[4];
				var _from = _g[3];
				var target = _g[2];
				var t2 = 1 - t;
				if(this._fastMode) {
					var _g1 = 0;
					var _g2 = this._toKeys;
					while(_g1 < _g2.length) {
						var key = _g2[_g1];
						++_g1;
						tweenx909.TweenX.setField(target,key,this._fastCalc(tweenx909.TweenX.field(_from,key),tweenx909.TweenX.field(_to,key),t,t2));
					}
				} else {
					var _g11 = 0;
					var _g21 = this._toKeys;
					while(_g11 < _g21.length) {
						var key1 = _g21[_g11];
						++_g11;
						tweenx909.TweenX.setField(target,key1,this._calc(tweenx909.TweenX.field(_from,key1),tweenx909.TweenX.field(_to,key1),t,t2));
					}
				}
				break;
			case 1:
				var tos = _g[4];
				var froms = _g[3];
				var targets = _g[2];
				var t21 = 1 - t;
				var i = 0;
				var $it0 = $iterator(targets)();
				while( $it0.hasNext() ) {
					var target1 = $it0.next();
					var _to1 = tos[i];
					var _from1 = froms[i++];
					var _g12 = 0;
					var _g22 = this._toKeys;
					while(_g12 < _g22.length) {
						var key2 = _g22[_g12];
						++_g12;
						tweenx909.TweenX.setField(target1,key2,this._calc(tweenx909.TweenX.field(_from1,key2),tweenx909.TweenX.field(_to1,key2),t,t21));
					}
				}
				break;
			case 3:
				var _to2 = _g[4];
				var _from2 = _g[3];
				var func = _g[2];
				var t22 = 1 - t;
				var arr = [];
				var _g23 = 0;
				var _g13 = _to2.length;
				while(_g23 < _g13) {
					var i1 = _g23++;
					arr[i1] = this._calc(_from2[i1],_to2[i1],t,t22);
				}
				func.apply(null,arr);
				break;
			case 0:
				var g = _g[2];
				var ts = g.tweens;
				var spent = (this._time * t - g.current) * 1.00000001;
				if(spent < 0) {
					var _g14 = 1 - ts.length;
					while(_g14 < 1) {
						var i2 = _g14++;
						ts[-i2]._update(spent);
					}
				} else {
					var _g24 = 0;
					var _g15 = ts.length;
					while(_g24 < _g15) {
						var i3 = _g24++;
						ts[i3]._update(spent);
					}
				}
				g.current = g.tweens[0].get_currentTime();
				break;
			case 4:
				var f = _g[2];
				if(t == 1) f();
				break;
			}
		}
	}
	,_fastCalc: function(_from,_to,t1,t2) {
		return _from * t2 + _to * t1;
	}
	,_calc: function(_from,_to,t1,t2) {
		if(typeof(_to) == "number") {
			var d = _from * t2 + _to * t1;
			return d;
		} else {
			var i = 0;
			var l = tweenx909.TweenX._rules.length;
			var f;
			var result = null;
			var ok = false;
			while(i < l) if(js.Boot.__instanceof(_to,(f = tweenx909.TweenX._rules[i++]).inputClass)) {
				ok = true;
				result = f.calc(_from,_to,t1,t2,this);
				break;
			}
			if(!ok) throw this.error("The tween rule for " + Type.getClassName(Type.getClass(_to)) + " is not defined");
			return result;
		}
	}
	,time: function(value) {
		if(value < 0) throw this.error("Can't be negative value");
		this.checkInited();
		this._timeIsDefault = false;
		this._time = value;
		return this;
	}
	,ease: function(value) {
		this.checkInited();
		this._easeIsDefault = false;
		this._ease = value;
		return this;
	}
	,onFinish: function(handler) {
		this._onFinish = handler;
		return this;
	}
	,_getPosition: function(p,back) {
		var t = p / this._time;
		if(this._odd) back = !back;
		if(this._inverted) t = 1 - t;
		if(back) {
			if(this._yoyo) t = 1 - t;
			t = this._ease(t);
			if(this._zigzag) t = 1 - t;
		} else t = this._ease(t);
		return t;
	}
	,checkInited: function() {
		if(this._inited) throw this.error("Can't change params after initialization");
	}
	,dispatch: function(num) {
		var listeners = this._eventListeners[num];
		if(listeners != null) {
			var _g = 0;
			while(_g < listeners.length) {
				var f = listeners[_g];
				++_g;
				f(this);
			}
		}
	}
	,initGroup: function(g) {
		var df = null;
		var gd = false;
		if(g.defaults != null) {
			df = tweenx909.TweenX.dumpDefaults();
			gd = tweenx909.TweenX._groupDefaults;
			tweenx909.TweenX._groupDefaults = true;
			tweenx909.TweenX.setDefaults(g.defaults);
			tweenx909.TweenX.defaultAutoPlay = false;
		}
		var delay = 0.0;
		var max = 0.0;
		var result = [];
		{
			var _g = g.type;
			switch(_g[1]) {
			case 0:
				var $it0 = $iterator(g.source)();
				while( $it0.hasNext() ) {
					var t = $it0.next();
					if(t == null) continue;
					{
						var _g1 = t.command;
						switch(_g1[1]) {
						case 1:
							var d = _g1[2];
							delay += d;
							break;
						case 0:
							var o = _g1[2];
							result.push(o);
							o._autoPlay = false;
							if(tweenx909.TweenX._groupDefaults && o._delayIsDefault) o._delay = tweenx909.TweenX.defaultDelay;
							o._init();
							o._delay += delay;
							o._totalTime += delay;
							var totalTime = o._totalTime;
							if(o._skip != null) delay = delay + o._skip; else delay = totalTime;
							if(max < totalTime) max = totalTime;
							break;
						}
					}
				}
				break;
			case 1:
				var lag = _g[2];
				var $it1 = $iterator(g.source)();
				while( $it1.hasNext() ) {
					var t1 = $it1.next();
					if(t1 == null) continue;
					{
						var _g11 = t1.command;
						switch(_g11[1]) {
						case 1:
							var d1 = _g11[2];
							delay += d1;
							break;
						case 0:
							var o1 = _g11[2];
							result.push(o1);
							o1._init();
							o1._delay += delay;
							o1._totalTime += delay;
							var totalTime1 = o1._totalTime;
							if(o1._skip != null) delay += o1._skip; else delay += lag;
							if(max < totalTime1) max = totalTime1;
							break;
						}
					}
				}
				break;
			}
		}
		var _g2 = 0;
		while(_g2 < result.length) {
			var t2 = result[_g2];
			++_g2;
			var diff = max - t2._totalTime;
			t2._rest += diff;
			t2._totalTime += diff;
		}
		this._time = max;
		g.tweens = result;
		g.source = null;
		if(g.defaults != null) {
			tweenx909.TweenX._groupDefaults = gd;
			tweenx909.TweenX.setDefaults(df);
		}
	}
	,__class__: tweenx909.TweenX
	,__properties__: {get_totalTime:"get_totalTime",get_singleTime:"get_singleTime",get_currentTime:"get_currentTime"}
});
tweenx909.advanced.CommandTypeX = $hxClasses["tweenx909.advanced.CommandTypeX"] = { __ename__ : true, __constructs__ : ["TWEEN","WAIT"] };
tweenx909.advanced.CommandTypeX.TWEEN = function(tween) { var $x = ["TWEEN",0,tween]; $x.__enum__ = tweenx909.advanced.CommandTypeX; $x.toString = $estr; return $x; };
tweenx909.advanced.CommandTypeX.WAIT = function(delay) { var $x = ["WAIT",1,delay]; $x.__enum__ = tweenx909.advanced.CommandTypeX; $x.toString = $estr; return $x; };
tweenx909.advanced.CommandTypeX.__empty_constructs__ = [];
tweenx909.advanced.DefaultsX = function() {
	this._autoPlay = true;
	this._zigzag = false;
	this._yoyo = false;
	this._repeat = 1;
	this._interval = 0;
	this._delay = 0;
	this._time = 0.3;
	this._ease = tweenx909.TweenX.DEFAULT_EASE;
};
$hxClasses["tweenx909.advanced.DefaultsX"] = tweenx909.advanced.DefaultsX;
tweenx909.advanced.DefaultsX.__name__ = ["tweenx909","advanced","DefaultsX"];
tweenx909.advanced.DefaultsX.prototype = {
	dump: function() {
		this._time = tweenx909.TweenX.defaultTime;
		this._ease = tweenx909.TweenX.defaultEase;
		this._delay = tweenx909.TweenX.defaultDelay;
		this._interval = tweenx909.TweenX.defaultInterval;
		this._repeat = tweenx909.TweenX.defaultRepeat;
		this._yoyo = tweenx909.TweenX.defaultYoyo;
		this._zigzag = tweenx909.TweenX.defaultZigZag;
		this._autoPlay = tweenx909.TweenX.defaultAutoPlay;
		return this;
	}
	,apply: function() {
		tweenx909.TweenX.defaultTime = this._time;
		tweenx909.TweenX.defaultEase = this._ease;
		tweenx909.TweenX.defaultDelay = this._delay;
		tweenx909.TweenX.defaultInterval = this._interval;
		tweenx909.TweenX.defaultRepeat = this._repeat;
		tweenx909.TweenX.defaultYoyo = this._yoyo;
		tweenx909.TweenX.defaultZigZag = this._zigzag;
		tweenx909.TweenX.defaultAutoPlay = this._autoPlay;
	}
	,__class__: tweenx909.advanced.DefaultsX
};
tweenx909.advanced.GroupX = function() {
	this.current = 0;
};
$hxClasses["tweenx909.advanced.GroupX"] = tweenx909.advanced.GroupX;
tweenx909.advanced.GroupX.__name__ = ["tweenx909","advanced","GroupX"];
tweenx909.advanced.GroupX.prototype = {
	__class__: tweenx909.advanced.GroupX
};
tweenx909.advanced._GroupX = {};
tweenx909.advanced._GroupX.GroupTypeX = $hxClasses["tweenx909.advanced._GroupX.GroupTypeX"] = { __ename__ : true, __constructs__ : ["SERIAL","LAG"] };
tweenx909.advanced._GroupX.GroupTypeX.SERIAL = ["SERIAL",0];
tweenx909.advanced._GroupX.GroupTypeX.SERIAL.toString = $estr;
tweenx909.advanced._GroupX.GroupTypeX.SERIAL.__enum__ = tweenx909.advanced._GroupX.GroupTypeX;
tweenx909.advanced._GroupX.GroupTypeX.LAG = function(lag) { var $x = ["LAG",1,lag]; $x.__enum__ = tweenx909.advanced._GroupX.GroupTypeX; $x.toString = $estr; return $x; };
tweenx909.advanced._GroupX.GroupTypeX.__empty_constructs__ = [tweenx909.advanced._GroupX.GroupTypeX.SERIAL];
tweenx909.advanced.StandardTweenX = function(type,time,ease,delay,repeat,yoyo,zigzag,interval,autoPlay,posInfos) {
	this._autoFrom = true;
	switch(type[1]) {
	case 1:
		var toArr = type[4];
		var fromArr = type[3];
		var targets = type[2];
		var _from = fromArr.pop();
		var _to = toArr.pop();
		var $it0 = $iterator(targets)();
		while( $it0.hasNext() ) {
			var t = $it0.next();
			toArr.push(tweenx909.advanced.StandardTweenX.clone(_to));
			fromArr.push(tweenx909.advanced.StandardTweenX.clone(_from));
		}
		break;
	default:
	}
	tweenx909.TweenX.call(this,type,time,ease,delay,repeat,yoyo,zigzag,interval,autoPlay,posInfos);
};
$hxClasses["tweenx909.advanced.StandardTweenX"] = tweenx909.advanced.StandardTweenX;
tweenx909.advanced.StandardTweenX.__name__ = ["tweenx909","advanced","StandardTweenX"];
tweenx909.advanced.StandardTweenX.clone = function(obj) {
	var result = { };
	var _g = 0;
	var _g1 = Reflect.fields(obj);
	while(_g < _g1.length) {
		var key = _g1[_g];
		++_g;
		Reflect.setProperty(result,key,Reflect.getProperty(obj,key));
	}
	return result;
};
tweenx909.advanced.StandardTweenX.__super__ = tweenx909.TweenX;
tweenx909.advanced.StandardTweenX.prototype = $extend(tweenx909.TweenX.prototype,{
	_initFromTo: function(target,_from,_to) {
		if(this._autoFrom == null) this._autoFrom = tweenx909.TweenX.defaultAutoFrom;
		this._initFrom(target,_from,_to);
		var data = { };
		var fs = Reflect.fields(_from);
		var _g = 0;
		while(_g < fs.length) {
			var key = fs[_g];
			++_g;
			if(!Object.prototype.hasOwnProperty.call(_to,key)) tweenx909.TweenX.setField(_to,key,tweenx909.TweenX.field(_from,key));
			var t = this._getPosition(this._time,this._repeat % 2 == 0);
			tweenx909.TweenX.setField(data,key,this._calc(tweenx909.TweenX.field(_from,key),tweenx909.TweenX.field(_to,key),t,1 - t));
		}
		var id;
		if(tweenx909.TweenX.dictionary.get(target) != null) id = tweenx909.TweenX.dictionary.get(target); else {
			tweenx909.TweenX._objCounter = 1 + tweenx909.TweenX._objCounter % 33029;
			tweenx909.TweenX.dictionary.set(target,tweenx909.TweenX._objCounter);
			id = tweenx909.TweenX._objCounter;
		}
		if(tweenx909.TweenX._initLog[id] == null) tweenx909.TweenX._initLog[id] = [{ target : target, data : data}]; else {
			var flag = false;
			var _g1 = 0;
			var _g11 = tweenx909.TweenX._initLog[id];
			while(_g1 < _g11.length) {
				var log = _g11[_g1];
				++_g1;
				if(log.target == target) {
					var _g2 = 0;
					var _g3 = Reflect.fields(data);
					while(_g2 < _g3.length) {
						var key1 = _g3[_g2];
						++_g2;
						tweenx909.TweenX.setField(log.data,key1,tweenx909.TweenX.field(data,key1));
					}
					flag = true;
					break;
				}
			}
			if(!flag) tweenx909.TweenX._initLog[id].push({ target : target, data : data});
		}
	}
	,_initFrom: function(target,_from,_to) {
		var data = null;
		var _g = 0;
		var _g1 = Reflect.fields(_to);
		while(_g < _g1.length) {
			var key0 = _g1[_g];
			++_g;
			if(!(typeof(tweenx909.TweenX.field(_to,key0)) == "number")) this._fastMode = false;
			var relative = HxOverrides.substr(key0,0,4) == "$$$$";
			var key;
			if(relative) key = HxOverrides.substr(key0,4,null); else key = key0;
			var fromValue;
			var toValue = tweenx909.TweenX.field(_to,key0);
			if(!Object.prototype.hasOwnProperty.call(_from,key)) {
				if(this._autoFrom) {
					if(data == null) {
						data = { };
						var logs = tweenx909.TweenX._initLog[tweenx909.TweenX.dictionary.get(target) != null?tweenx909.TweenX.dictionary.get(target):(function($this) {
							var $r;
							tweenx909.TweenX._objCounter = 1 + tweenx909.TweenX._objCounter % 33029;
							tweenx909.TweenX.dictionary.set(target,tweenx909.TweenX._objCounter);
							$r = tweenx909.TweenX._objCounter;
							return $r;
						}(this))];
						if(logs != null) {
							var _g2 = 0;
							while(_g2 < logs.length) {
								var log = logs[_g2];
								++_g2;
								if(log.target == target) data = log.data;
							}
						}
					}
					if(Object.prototype.hasOwnProperty.call(data,key)) fromValue = this._defaultFrom(tweenx909.TweenX.field(data,key),toValue); else fromValue = this._defaultFrom(tweenx909.TweenX.field(target,key),toValue);
				} else fromValue = this._defaultFrom(tweenx909.TweenX.field(target,key),toValue);
				tweenx909.TweenX.setField(_from,key,fromValue);
			} else fromValue = tweenx909.TweenX.field(_from,key);
			if(relative) {
				tweenx909.TweenX.setField(_to,key,toValue + fromValue);
				Reflect.deleteField(_to,key0);
			}
		}
	}
	,_defaultFrom: function(value,_to) {
		if(typeof(_to) == "number") return value;
		var _g = 0;
		var _g1 = tweenx909.TweenX._rules;
		while(_g < _g1.length) {
			var r = _g1[_g];
			++_g;
			if(js.Boot.__instanceof(_to,r.inputClass)) return r.defaultFrom(value,_to,this);
		}
		throw this.error("The tween rule for " + Type.getClassName(Type.getClass(_to)) + " is not defined");
		return null;
	}
	,play: function() {
		tweenx909.TweenX.prototype.play.call(this);
		return this;
	}
	,update: function(time) {
		tweenx909.TweenX.prototype.update.call(this,time);
		return this;
	}
	,onFinish: function(handler) {
		tweenx909.TweenX.prototype.onFinish.call(this,handler);
		return this;
	}
	,time: function(value) {
		tweenx909.TweenX.prototype.time.call(this,value);
		return this;
	}
	,ease: function(value) {
		tweenx909.TweenX.prototype.ease.call(this,value);
		return this;
	}
	,__class__: tweenx909.advanced.StandardTweenX
});
tweenx909.advanced.TweenTypeX = $hxClasses["tweenx909.advanced.TweenTypeX"] = { __ename__ : true, __constructs__ : ["GROUP","ARRAY","FROM_TO","FUNC","CALL"] };
tweenx909.advanced.TweenTypeX.GROUP = function(group) { var $x = ["GROUP",0,group]; $x.__enum__ = tweenx909.advanced.TweenTypeX; $x.toString = $estr; return $x; };
tweenx909.advanced.TweenTypeX.ARRAY = function(targets,_from,_to) { var $x = ["ARRAY",1,targets,_from,_to]; $x.__enum__ = tweenx909.advanced.TweenTypeX; $x.toString = $estr; return $x; };
tweenx909.advanced.TweenTypeX.FROM_TO = function(target,_from,_to) { var $x = ["FROM_TO",2,target,_from,_to]; $x.__enum__ = tweenx909.advanced.TweenTypeX; $x.toString = $estr; return $x; };
tweenx909.advanced.TweenTypeX.FUNC = function(func,_from,_to) { var $x = ["FUNC",3,func,_from,_to]; $x.__enum__ = tweenx909.advanced.TweenTypeX; $x.toString = $estr; return $x; };
tweenx909.advanced.TweenTypeX.CALL = function(func) { var $x = ["CALL",4,func]; $x.__enum__ = tweenx909.advanced.TweenTypeX; $x.toString = $estr; return $x; };
tweenx909.advanced.TweenTypeX.__empty_constructs__ = [];
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
$hxClasses.Math = Math;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
haxe.Resource.content = [{ name : "R_p04enjoy_png", data : "iVBORw0KGgoAAAANSUhEUgAAAgAAAACACAIAAADyNUZcAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBQTNGNTE0RDI4N0VFNDExQkU5QjlGRDdFMjlBN0JGNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3OURDNjM4RTdFMkMxMUU0OTFBQUI5MzExRTFFRDIxQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3OURDNjM4RDdFMkMxMUU0OTFBQUI5MzExRTFFRDIxQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkIxM0Y1MTREMjg3RUU0MTFCRTlCOUZEN0UyOUE3QkY1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkFBM0Y1MTREMjg3RUU0MTFCRTlCOUZEN0UyOUE3QkY1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+JALI8gAAEoBJREFUeNrsnV9MHVd+xydVZaMWYwvjheD6DxiwRbkhGCPXWDQgRWG9u4pTmoesvC8rraK+7MtKfVhpH/q+UqWqUiVLW/Wl20ZptEosN11btmwvwhQZ43ihCAXb4FIcO3aQYywt5qnfew8cDvPvzlwuXIw/H1loPPfMzDlzzvy+5/zOb868dvbsWQ8AAF49/ohbAACAAAAAAAIAAAAIAAAAIAAAAIAAAAAAAgAAAAgAAAAgAAAAgAAAAAACAAAACAAAACAAAACAAAAAAAIAAAAIAAAAIAAAAIAAAAAAAgAAAAgAAAAgAAAAgAAAAAACAAAACAAAAAIAAAAIAAAAIAAAAIAAAAAAAgAAAAgAAAAgAAAAgAAAAAACAAAACAAAACAAAACAAAAAAAIAAAAIAAAAIAAAAIAAAAAAAgAAAAgAAAAgAAAAgAAAAAACALFU50ievqys7MCBA7t27eLWvaSo7lSDqsetVzQaZ1r++CXNd2dnZ1VVVUyCoaGhR48euSmfPHly/fp182smk6mrqzPb586dizpJwmRp8+ZmJv4S7qnsr7LXx48fjz+/LX4Uek5aW1tramrsnrm5uenp6bGxsYWFhVCr0dbWpqO2bdtm9iwuLt6/f//evXv666Z89913o4o8Pz8/OTnpO797B6KwZU+V2N49XffKlSvxNRVVv729vdu3b9fGixcvLly44P7U1NR05MgRs/3gwYPh4eGok1+8eFGlDjbFJMWxeSugqfhqvL6+PliDt27devr0aaqWH/w1VUFCeyG2SQebrnvy0Iatxtnc3Hzw4MHy8nK7U0WbmJjwNU5fE52amhodHY3KbVRLtsQfjgCsI2rrrvEK7QvEpNQjHX94qmRp85b8EqGnUtHynj++f3fs2LGjR4/6dlbmaGlpkW368ssvfU/giRMnfOllRxpzSDOssoqovJn97e3tssXuY5nqJqdKbO+e/koDfAY6YU3JSspoWjvlWp+9e/faw3U33PPr/utOWmU1mhe8XBHLHl8WyYPNT7AGBwcHfYYs/lrBXwt7UkKbdLDpuicP/qrGqUZlVc0VPKEOR1D77dkk2zG5ylui+MNxAcFmRE9F0Pq7RkF2La/1d5Fl6enpSehS0PmVeOMH6SpyKk+XZXZ21m4fOnTIdydd+XQLJatqtzWuKm2N64YHrb+L6ld9gpexMZvGGbT+bkXk7cjjAnqJef78ua+7avj2229LlSUNDG3XYMeOHdYWqDOifqjZfvHiRVGu5Z4zYfHr6+vttjrvxsBVVFRolK0uj+6n+oOujXOtv7rDutv6q+3a2lq3/xt0HD18+NDeByWwI3Rta8DuDhosIyMjycueKrHo6uo6f/58qIMrBpVX3WdjYlQEm23Jic/u7Nu3z/pSdHPs/jt37kSd/PHjx24prDC7t26NyLK7aqTL6aIaxyj/agn2J1362bNnoY9SEjagIKFdGbdxGp+PKdqePXukeaaC1EpVg6HtLSFRpVCpEYDSC0BwaF9a3NG02qh9xoLu8rVTwDmlSXbbfSqU7aamJimTayJPnjzpio20wf1VpVPvUlVw7dq10AGyWzUyEB988IF5JqPmSFJVZdp6Vydd9iJ0MiAe3WFTiRIw6wWSufclk9G3Vf/666/b9hn0sLtndqvP2s3gjEJhaFDijvY+++wz68Iyl37y5Im1oZKKggVgvQsSits41brshUxmZmZmTp06ZdqbxGB8fDymIvK6ejabkcEFBEXA5xXR8+8+xtIDO6umTpBMp6/7rMTaeenSpSTdaqWZm5srbXllx1WotXiBrN3XaMCaeJ/R1yXs4KC0/p+GhgbXRAanT6VYtsZV1wXcnBI2XbdxBg20CqsBrv2vBp087wgAZENQ7Pbp06fVhddjH+rBr6iosNu3b9+O6vol71jF+GrXFeOzMnR2dqadgbBeL2v3dQaNJ8yegYEBWzozK+BOoty9e7eEde16olxr6PLFF1+E1vgmxx2BTUxMRI0RbcXlDcx7NXnpXUB6DoOTPG7E50tEsCDWykTR29sb3OkOh4NoLOxOCZo4EC8sbM41H2t3XqnLZosTNQXy4YcfBndeuHAh9OrJE2vkoVG88UvITL/99tuffPJJYV4gM9lrrY+JpNT5TdFk+vVfOzmswUF8MO56NxW7U33kqFGam0O3xktFR0dHa2uru8cN7rTs3r3bVeios6lqbCRYwVk6msO3U7c0eWg4ArBe6HleS9VuKjamIOqwX7161U5sWmLC5grufprYEl3IF6S48fFzUkR13o1B1F9lLJVXd3Z21s7lNDQ0WOtjxGZ6etqcWZdQ52MD/D8Jm0rCIZeEKtTIlqpLlySZeTkjL/Pz81vGPuACguKgHtNHH32kgULQKS8zJ20olpEyXScNOHxvnJXk9ZlLly5Zh4By5QZxpvUCWXe/8afNzMzYvqp9Nazk/h9vte8rhs1j/ZOTMI7ODXmALTgCCA0DLVaQ5QYTjGt0p2GjDgnGoiUJgV1YWBjOYRwaJgbU/GTeBTPWze70vQNVMCaUKOpX36u2QR9FwYnN0Efl6u7uNv89efJkQvsY9AK5xTEXtZ1oe8fWz/+TvKm4DpCysrJQL5AbCBA6Mos6cJ0IRja7AceWb775xkq4yh7lBXKdYGvJ0r1794JPEAKwKQRgy0RoBQuiph8vALL+BXjnXWv+NIe65L29vfaJ0oaJEbSHvPnmm6EGV6eS3oQ+DM9z+PwV4+PjMU9OqrIUUHCZib1799qYzlTH6m64AfXeasf69PS072WrdY3/SdhUZNBdXQ99UlSzdvvZs2fBLtT+/ft95tX1vxedYGTzsWPHggKgUZf1y2vUFSoAOtA6wdzGnBYJUtEDuHEBQWmQyT516tT777/vC4ZRlypoLm2MoyQh6BrSTp0q6j1hHX4uh9td7erqKm3xNf6whUrbDQyaV1cefL+W3P/jrX4HLfRd6Ewm405ZWzNqnVrijTfe8LUfe0gJzaIZdZltyUPwTWbl05Vk9Tx49rfgCGDtBH3B6tYFB+8Jk20we/bsCd2vXnlodKaG8zLB6hZpaPzee+/pgTdB7tu3b3efFvtgq89ofSZKUFVVJaunYYeuq26guSemXxwzdZx8AjbKL6/7HBw3pErs1trly5dPnz6d9lbrQDfCx2de3ReG19v/kxy1Aamv7Smr1MZnaArivgnsG1XoQI1vTL/bBNpNTExoWFBRUdHe3h7vMtowBgYGbBScyqgGad4E3rlz5759++ybwF4uBDb0cdixY0ewFQXbT2iyTWIBEIC1EoykDA3wSphsg4la1ScqElTPhnUU6PFoyRHT1XV9JqarVVhMRX9/v7W5yrM6mKFPTmhUqxcR3Jkqse8Jd81icmTv3P6yz6Z89dVX9teSr//jmnV3PZKYBuPzogwNDdkqC633Uk3mu90UjefsANSEsQWT6TmNCgq3MdDx7Sc0mbclIkFxAb1ayPZ9+umnMRNieqp9k7Tq2sevuqNf80aOGpu7eRxBMosFzAq60hg08W53eDP4f9wajHoLzLrFQt+k1f6oeXK1k/Pnz5e8aFKgmEyaKtsC0fqMAKCYbgE9EplMpra21u0xGRdw6PcAZB3UZ29ubnZXkzdP1/j4eMJR8Boj8YvOxYsX7dpEBXiBgk5/3SLTG90k/h8XdYFnZ2ePHDni1njM9wCseVWhfN+BMO1k80RehGbSi/0eAFheO3v2LHfhVaa6urqsrCxqziDIrl27du7cuQW8n68spgbjZ0qKddQGo5ZswtIKXvcNAQAAgFcC5gAAABAAAABAAAAAYMtDFBBAKal+7JUteN/u9J5WcDMAAYCXh97eXrMq7+3bt6Pi7TKZTF1dnZf7akfUil02jRuybXf6ePDgQaqv12bGvLov4hI82e9d/0t/4om/8L5syHPCcz9atf/df81zcpcDM96RYe/Ab1f2LFZ697u9WydWKYG91tSb3mhL+Hlar8VdCAABgOLjvngZs1qWFMKuKPD111+HxufZNHl3estLy5nXCJLIwPY/eDX9sSm6QhJX/o/39c/De+UrJ1wtAOFXCbzxVvbCe+vzVabfsG3Oa/yNd+Cqd/PMiq2fbPQyn3vld7P5mfw7byGwBr6sv7nu735Jk4TUMAcABeIufN/Y2Jj3O4vmU1wFXGhubu5hDvfrBeXl5d3d3T09PetUOpnjt/8t3SEPu1b9C0XW/wf/smL973/XG/lJ9t/YGe/5oaXrnvjHbMffIIs/+r2l/S2/DxmLGOuvw/EgASMA2CBk7k33f3Fx0bx+2dDQkPftUA0COjs7036t88aNG+7worq6urm52azNor8afCR8K/XCL7z7+1Jct/KW1/m7FH4Vn0fow7ABwdGh7GmFzP3lH3uPnKX8dKFjN7yjv8puSwOeLedWo4G6rqyh1093Dq8YemmJBgdeznc0cpwmCYwAYKOQuTcbN2/eNCuxNDU1JTmwpaUlYcooHj16dOXKFbtgkU4Y+kX7otDya6/pTtHOdmAme0Jjsj//m1XW3zDckR0NGE7++8r+oeVV745fdvL2+6xrKFsFZ0JcQwAIAKwXZg3R58+fj46OGkd8eXl5JpOJOcSuR6ZBwNpNtq5rlmbT+CN0pcY1MnZmaaPzn7N97aJQv7wi/c1oj400wLiPZNyrlz/1JqmY7MtJyG+zKpIdgT3zWn6T3ZhrC58cBkAAYF2QoTduH2P67ac2QoN2LLOzs0YDdOw777yz9mzY61ZVVRW9jLN1Sxqwbc575z+Kc87Xby91/+NN9tTyF7r2Ta/sHOzOHig6/jP7t20wmzFx4/u0Rygc5gAgNYcPHzYb5osoT58+NWtk1tTU7Nq1K2YdruvXr9fW1lZWVppPOK1xRUm7Gl3CD3/LdLYGvgIZEz2p/bXjWZd9Tb937HC2b75GjMdm7s/zJJvZ75kV7neszHlnnTxjfdlpAOWn50I2XkhoWJBqVgOAEQCsierqarOk8+TkpLX1U1NTZqOtrS3+8P7+fjNncPTo0ahPeq0TxpT7/lX9b2xu/3qp3y3Le2Bmg/JpvUM7Hq/aLwUykULG+itjt07QHgEBgA2kubnZbNy7d8/utF8Plk2P9++r237z5k2z3dPTs37zt0Hm2vyRmvqnEUBcbvdk/fVLuf2nok0G5JHYZbs/H5glHvjhyrYGBIR+whrBBQQpkL22M657ctifJADl5eVmSjb+S4H6taqqSsnMZEDBH2yybx7Mz88nSX/j+4U4TEZbvKq+bKfbTAb4Yj1Tof57+d1c5H7sSb6z/J2F+Ur/T8q/ZMwEkq7dJQWAAEAK3A8IR31dNpPJ5P1U7ODg4O7du+1kQGGZsaGowY9zFZfBbm/31MpkQMF81eo15qYBMmNx88B24YqZgyG/LpbTDKFo4AKCFCQJ4dc4IK9zf2Fhob+/3wqJxCBtTqqrq40aLS4uup/qXQ8WtmcnA5Zy+ytv9/+FjY1ehP/3xZ+u7BxfVsz2X6/4eXwcu7H0cu/DrpAXBQAYAUDJrL+Mu7f8tdVggoqKCvNR3Pr6+rzfYjWfiTfDiLSzwRpktLe3m1DU0I8YFx3Z4pGfLL2mG1zGR+a+7x+84b6V9eNOXF3a+ObPVp1k7Ez2XbBtc96pv/f+62d+E2/fBBa336LFAQIAmwYb5j80NBQV66k0NTU1jY2NMZ8atwwPD6vvn9f6d3R0tLa22v+6K8TNzc0ljyUNDQM1JPHsD3dk+/5B6y/eyq3X1v1L7402b7rdO3hzyU0v7qx2GY0cXwotlQac/kV2LSCjENv+4B3876U4UTH4U+I7AQGATYNd/Ofhw4cxln1qasoY6CRLA4lr16719fWZgUUUJuo0iPr+qZYVskY5hGRTu9e+5/VNrphpy+KfrFzCvYrsuC9QZ2G7d/7H3lvVS0KSfbPXd6rKVauBAqwrzAFAImz0pw35D2V0dNQuDZQkxHNhYWFgYCB5NnRyKdDIyMjHH3+cdlG5tSPz7QZiWq70elf/NhufY3l+KLsn1I7rJBf+Krcy3XdX7dchY2e8T3+O9YeN47WzZ89yFwCKxYEZ79F3UqzOZr4IluoQgGKBCwigmKT13RPqAyUEFxAAAAIAAAAIAAAAIAAAAIAAAAAAAgAAAAgAAAAgAAAAgAAAAAACAAAACAAAACAAAACAAAAAAAIAAAAIAAAAIAAAAIAAAAAAAgAAAAgAAAAgAAAAgAAAAAACAAAACAAAACAAAAAIAAAAIAAAAIAAAAAAAgAAAAgAAAAgAAAAgAAAAAACAAAACAAAACAAAACAAAAAAAIAAAAIAAAAIAAAAIAAAAAAAgAAAMXk/wUYAGR72/Tthqj6AAAAAElFTkSuQmCC"},{ name : "R_p02jump_png", data : "iVBORw0KGgoAAAANSUhEUgAAAgAAAACACAIAAADyNUZcAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBQTNGNTE0RDI4N0VFNDExQkU5QjlGRDdFMjlBN0JGNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2RjY2MkE2NjdFMkMxMUU0QjI4MkVEOTUzMjVEOTJEMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2RjY2MkE2NTdFMkMxMUU0QjI4MkVEOTUzMjVEOTJEMiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkIxM0Y1MTREMjg3RUU0MTFCRTlCOUZEN0UyOUE3QkY1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkFBM0Y1MTREMjg3RUU0MTFCRTlCOUZEN0UyOUE3QkY1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+kyRXawAADVJJREFUeNrs3dlvVOUfx/Gy2AJiw2qxCAgBS+koSxECBIE0pqxNJCQSlnBFCTGBRC+84g/wQi9IvChNiDcYIaYkFEQviLEaG3ZQVssSo1jKUtZQQAU/6ZPf9/fkbEyHtgzO+3VBpmfOnHPmzMz38zzPWehRU1OTBwDIPT3ZBQBAAAAACAAAAAEAACAAAAAEAACAAAAAEAAAAAIAAEAAAAAIAAAAAQAAIAAAAAQAAIAAAAAQAAAAAgAAQAAAAAgAAAABAAAgAAAABAAAgAAAABAAAEAAAAAIAAAAAQAAIAAAAAQAAIAAAAAQAAAAAgAAQAAAAAgAAAABAAAgAAAABAAAgAAAABAAAAACAABAAAAACAAAAAEAACAAAAAEAACAAAAAEAAAkOt6swuy6/Po3btXr15xzxYUFMQ91atd5FM9evTIz8/v9DUmvzCzNWa8qU98Yc+e0W0dTX/hhRfiXqin3Au3bNnClxMEAJ5s+fLlGVdVACAAnmOFhYXsBADZj2MAAEAAAAAIAAAAAQAAIAAAAAQAusiNGzcuXLiQbdtz//59PpruNGrUqKKiIvYDuhqngWZLnf3uu+++/fZbm1JcXDy93cCBA23ioUOHDh8+HFkvRowYUVZWFrf8kydP/vjjj+7xO++8M2bMmOTtUdH/6aeffvjhh+TtaW5u3rVrV/KiqqqqXnnllYSZX3zxxZEjR06bNq1Pnz4J+2fHjh3ucWlp6dtvvx052zfffPPbb7+Fpw8dOnTIkCFvvPGGv/FdR7VbO+qJs+3fv7+lpcX+1NtPpVKvvfbaoEGDbGJra+vZs2d/+eWXp1yv7Xl/nsAGJDyrD9HmefDggf9FNQMGDPA/l2vXrukrlLxhd+7c0WxNTU20MAiA3KXq/Pnnn9++fduf+Oeff+5st3LlSvtd3bt378iRI+EluImq0dXV1a7aBqj62wtVcJMDoK6uLvwLd9uzb9++9957b+rUqW5iW1tb5Pb4lDfpzFxfX//BBx9EbryoAtprz507FxcAqv7J2+PvzK6jUj5s2LB0ZvMrb0VFRf/+/QPzKAxmzJhRUlKye/fuJ1bJdNbrzxNO3LhnA4tVlIYzafLkyXFrj9swTRw3blx5ebmaNWmGHBgC+k/Rrzpc/X0HDx5Ms32kGv3pp5+qsRxuPvtlUe368DzJ1d9oO2traxsaGjp9P2jJ2vi4d6rukT+nekKZrWXbtm2K22z7Dqj6L1iwIFz9/RhYvnx5Qg+pm40ePTpc4lXKM1tafn6+Qu7111+nGtADyDknTpyw6j9lyhTXXlZjWR1/V4hXrFgR+ctXY9a6BWqYu4XoX9XKpUuXxlVP693Pnz8/vExV9sAw1Lx582whCpiEN1JZWTlkyJDw9MhRF39mtf1t47U3rHvhD3wFVv3999+HZ/P5W+5C9Ndff7VhooSxsk5x69YtP3FV2lxxv3v3rm2Gm82VTlV/u5FRa2vrzz//fOXKlYKCgpdfflltbfdazbB48eKvvvoq/fVqJ6TTEcmAFjtq1Ch/tC2VSqX52qampjt37gT2jOgD9XcOCICcoPLtj5bY4IyKlJpFly5dihsV8Ycy5s6du2nTJldGGxsb/QBQm1pTAq9VYIQDQN0CNZDjRkv0WPGgGVS7I0dRJk2a9MRDC5EzDx48ePPmzeG9YcKHPVQpmpub4/aMq1CBja+pqXHFsRuqzM2bN/0+igqxBUC476JP2aq/SqofwC0tLSqXqvvuqID+jRx7iVuvSmoXBYDo48ssAC5cuGAv1NZWVVW5jdQuUk8ocEwCDAHlkD/++MP/UwUuuZ3rd8ArKipshCShh5EwiqJuQVz1tzK6du3aQPfi6fXt2zfhWX/8yrbf5VyH1lJaWpqdH7qa0u7Bw4cP1bMJPKv89g/Fl5SUZMlmjxs3bsCAAe6xYinhVqzJzpw543+NKQIEQG5R+9ceq32thqpKc8IYfZx+/fpFTreaUlhYuGbNGrtRXbhZbe0yzTNt2rTIpaUZSOnTOz127Jj9qVKSEEtqLVoGKAA6dOpIZN8iG6q/lU51TSLfkRrF9tH4Jwg9E0opezxhwoTwp6ZeTocW+ODBA4oAQ0C5q6ysrLi42Ma4j7TLax8enTNnTvoF9+DBg5HdbRvxUBdBLawZM2a4QQatRcXXH6C3hvbYsWMzaIt9/PHH4YlxZ91EzqzuReCAgQrivn373GPtEHWJysvL3XbGHTCIpOVYkGTVvVqHDh1qjy9duhQ32/Xr162jEBh872b6OumDcKGlB/osioqKbBz/8uXLbjAn/QUOHz6cIkAPIKdVV1eHT4HQL622tvaTTz5Jp53b0NBghd5flN+4didiKwBsSvjg8DOkpn24FvjjV4pD1wWxCr5nz564pakSNfyPOlWbNm2yiPX3wPMie5rJ6gHoQ3GPFQOpVGrixIn27PHjxzvaAfK/rhwAoAeQi9Sw/fDDDw8dOnTmzBl/wNfFwGeffaZnw69at25d5NLeeusta/baEUWVV9e41rr02DWiGxsbFy5cmCUDr67ro06A36j3x6/sMOOSJUvcwWrVdHVxIo886yn/gLbRcvyzg54XWfU/CJ07d84G4vzTeBS66pr4eRCpsrIycrpey+VgBEDumtpu2bJl58+ft3NAXQbElbmw2bNn25DLgQMH/PIaDozAKIp+zK4boV94Btu/cuXKV199NTAx7srbjz76yN5Rc3PzF1984Va9fft2FXqXSZpu3Rpt6saNG8PLURcn/VOPVLaqqqq652LgNF29etUfDIkb2/EPFHXi+E9muXLz5s2mpiZ31r8/2tPR5r/v7t274QPgYAgoJ9y4ccPaPqp9ZWVlS5cutdP880JnB0UqLi7WS1atWtWhER7/V2dnx6vaxl3qlXCfIlX/MSHpVFt1St59911btfLPPU7nPB/FZGSzUS39Ke38Ef/S0tKEM0efCVVzO6yqAI7sjRUVFdkBgNbW1qdco7v4wAlft+Efk0hw9OjRcAXPLJn09hUndXV1NP/pAeQife+3bt2q7vP69ev9xmy4NR1uRPsN7UCpVaVOvm7Luhd2Qv306dN37tzppm/btk2tzsAFU+46gMAoTadoa2uzx9evX8+LuXwhkjo64ePMY8eOdT0e7Qc74FxfX99ttwPqUAa41nR+fv6cOXMCl2ErEtSrsz/VNUzuRP7+++82kv7SSy9Ftt9VrF3LXZFz6tQpTbF12Yi86nJCQfc7AU76N3JQZ9T6PfqUGfcnAHLa119/7QY6VKcqKytLSkrcefFWi+PCIHnow+7DleddM+yzIXK7cEyVUS1xW+/mzZu1PSNHjhw0aJC6IHYxbW1tbV7U+aBx3ZRwOAVmVqt2+/btgTersm6HfyOvMbYrk/Ug4fY+2kv2prTAHTt2xB07eVa0/+1kUD1YtmyZuxJYf44YMcKuBHY7KqHO6rXq8aRSqRMnTqjCqi1vBTrQb9Dn6AbxtdKFCxdqmdozBQUFb775pq3ric15JastX4mSfgBo257hWUwgALKr+X/x4kV/QCN8H57i4uL0h7ltTMkOJvtHBXynT592h4K1RjsUPHfu3JMnT9rIe8JNgRISJSDyTNC4me3N2vhVYWFh3KVndihY25xwdwe9qf3797u00FtWP6Yb7gfXoe/A3r177W4QilttcORQye7du+MWoo9v1qxZrqb7l8tF9huUEHbwVv+GT4vSusKDPOGOi7qt7iJe7uP2/OIYwLOk3+37779vI+BhKn/V1dUdXaz/g5w5c2bkPOXl5f4oir89/phDeHs2bNjQ6UNAgTfrj18tWbIkcmb/4qPkaqU3tXr1avuzvr4+g+vsulRLS4syIOESKjXhv/zyy4RRcj0VV4VVpgNPuasr4lan6q+NsXGhBIpVd+5WU1MTv2V6AMgwA+bPn68W2bFjxxobG23cQ9VQTbN58+ZlMGZtzeeE3oOK+J49e8KjKNqeVatWTZ48WVXVPydV21NRUaHGaVecNqq3P3r0aHuzydcG28hSZWWl66NoOxctWpSwo7J/IEgZUFdXl0ql/BMr8zry/wG4kZzx48f795ZQYz/yzqmRq3Pj/ulfYt3Sjp/wc61HTU0Ne6FzZdBm90dvpG/fvllyvkpzc3NbW1vkOH5O2bJlS3euTkX8aQ6QFhUV3bp1K806rkR386fT6gc9AHShbCu12XbeZI54ysOkHUoO5QRHZXMWxwAAgAAAABAAAID/PI4BAHmPHj3666+/4p71b4IPEABIi2qKKkvkU48fP04oK3qhZsigVCWs8Wle+PfffycUx8w2NeMXJuycf/75J7NNBQgAdI5uPmUQADLDMQAAIAAAAAQAAIAAAAAQAAAAAgAAQAAAAAgAAAABAAAgAAAABAAAgAAAABAAAAACAABAAAAACAAAAAEAACAAAAAEAACAAAAAEAAAAAIAAEAAAAAIAAAgAAAABAAAgAAAABAAAAACAABAAAAACAAAAAEAACAAAAAEAACAAAAAEAAAAAIAAEAAAAAIAAAAAQAAIAAAAAQAAIAAAAAQAAAAAgAAQAAAAP7vXwEGACVAcSX3KKwsAAAAAElFTkSuQmCC"},{ name : "R_p03add_png", data : "iVBORw0KGgoAAAANSUhEUgAAAgAAAACACAIAAADyNUZcAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBQTNGNTE0RDI4N0VFNDExQkU5QjlGRDdFMjlBN0JGNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3NDVFMzYwNzdFMkMxMUU0OUU2QkYyNDE1MjlCRTU4OCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3NDVFMzYwNjdFMkMxMUU0OUU2QkYyNDE1MjlCRTU4OCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkIxM0Y1MTREMjg3RUU0MTFCRTlCOUZEN0UyOUE3QkY1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkFBM0Y1MTREMjg3RUU0MTFCRTlCOUZEN0UyOUE3QkY1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+84QkZQAAC0RJREFUeNrs3N1LFH8bx/Ee7rIiSyyzjMqkMkKJMgqVHswweoCiB/OoQ4/6czrRgw466kCkQpA8KRMVIY1KQnuyCKMyI7ODDILfh4b74nvPzI6z7uzq7+79OohNZ8drZ2euz3e+M7uLW1paFgEA/j5L2AQAQAAAAAgAAAABAAAgAAAABAAAgAAAABAAAAACAABAAAAACAAAAAEAACAAAAAEAACAAAAAEAAAAAIAAEAAAAAIAAAAAQAAIAAAAAQAAIAAAAAQAABAAAAACAAAAAEAACAAAAAEAACAAAAAEAAAAAIAAEAAAAAIAAAAAQAAIAAAAAQAAIAAAAAQAAAAAgAAQAAAAAgAAAABAAAgAAAABAAAgAAAABAAAEAAAAD+Sv9hE6Srubk5q+tvbW1lIwPgDAAAQAAAAAgAAAABAAAgAAAABAAAgABAlG3bthUXF7MdckDbWVubGthvFxQ+B/Dv7imHDh2adbGBgYFPnz7Zf1esWFFRUVFaWlpYWGg//Pr16+jo6LNnz9KtoaCg4MiRI97jDx8+PHr0KHSxmpqa9evXB3+up0xMTLx79y7+q5uenv7y5cv79++/ffuWpWrTql+VuJvXp7KysqSkxG27P378ePHixfDw8M+fP4MLb9++3Xt89+5d32/r6ury8/O9x11dXb6nu8998uSJu0nnXIOMjIxoyeDrOnDggNYZuo/ZttLb1NfXF3w3feUFFxgbGwvuisnutyAA/vV0SGzcuDHOYu5hVl9fv3r1at8yOqiqq6vLy8s7OjqCTSHCjh07rAatJFVLVUcILdX7ofpRb2+vrymkenX64c6dO1Wt+tfQ0FA2qk2r/v3793/8+DHYkVV/Q0ND8Fna+HqKellnZ6cvOfLy8iLe0PHx8WPHjnmP9XS3eP2tqqqq5cuXexvTtmTmNWjJYAAoR/X0VPtY6LZy302tU380uLlsAcVqMB6S3W/BFNDfeMZw6tSp4FHkHk5NTU3uwTyrXbt22WM1II0f51CYSjp58mS6z1X/Onv2bO6rDY0BVeJrZ/pJRDfXXz937lxaEzJqxEoa77H6r7qwuym87i8WDInUoLcmuMCePXsy2Vxa59GjR+d3vwVnAMm7fv16zLNRtZ5r165l+OempqY0BHa7m3eQeCf47mJeO9BRZG1C585Pnz79/PmzRnwbNmxQPd5ztYC6RltbW8xX4TssNRaL3gJubevWrdu0aZOVpKHc9+/fQ6eDXr58OT097ZVXUlJikwB6oBFucLYkqWqj68/Pz9e5iFWi9dvaVJUV+evXr8HBQW3qmZkZberdu3dbU66rq7t9+3b8uawnT57Yc/ft23f//n3feFwJYeUlVcPevXvdN0U7kpujc6NQcTdX9Plr4vstCICsuHz58vPnz3///h292NKlS7Vk5n9OB607D6DOaAEQnNxQe7WjSMfzvXv37Fc6H1eH1fHj9QtfL4vgThZbH9R4LWJO3FebDm8VZm20trY2NADevHnj/lztQ23LezlqZNmrdtb6VZjOXWz7e2WoHmuvWr69vd1mJ/SWqUGreO8l6yVYH4/j3R/ekFxr8DaL1uAmhKVdUjVoPcoYSwj3bCMTVVVV6uOzbvxs7LdgCihbcyzHjx+fdTEtk/t7GOxEXoPB7u5u32/VHXp6etyh8awrVFOwFmNTE+nOD+jvqvXY0xVgcbaMGoHbsNyrkVmtNrQSjUm9xxqTBuvp7e0Nzk339/erKXuP1YXTmrsYGBhwx+baXBafel0Wk8nW4GZM5sN/m4A6fPhw7vdbEABZdObMGbtVI5R+e/r06dx3fxtGafQXerlM4ylrH+6NFqm4rVNdybqq/la6s7EjIyP2eMuWLel23jgz6QlW66PGlKpnqcLQExptf3eOLq3RgEbiGvba2Ly+vt5+9fDhw2RrsJdmCeFOo1l+zHmLaTerqanJ8X4LAiCLVq5cef78+YgFzp07t2rVqhxXVVRUZI/Hx8dTLTY5ORnsIKHciWC1GB2EY2NjNrKzMWlMoTcazurt27cxl0y2Wt+afVdZ3U4aUeHExETouxOHBu/WQ60dKxVsliapGoaHh+1xRUWFbxptbu+a9PX1Wf1abcQpReL7LQiArNOgJtUwVj+vra1dsJXPzMzEXFJN04Zmo6Oj+vfZs2d2VGdyd030+VPEDE/uq/UuYNh/v3z5suh/b4iM4F2ZnxsNhN3W7I2pHz9+7BaWSA36K26nVm91p9Hc/Eh3N7PPB3jHS4YnYfH3WxAA2d+mS5ZcuXIl9FeNjY367YKt3GaxZ2WTrWoQNiNhXSn03sGYvLt90hV9I02C1aoDNv/X1atX3bOH169fe905znrWrl2byTvltmbvv+4WSKoGrcdmV5Sg7tjFrjbPjfcxNFtzQ0NDbvZb+HAXUFaoL1RVVQ0ODro/1E+SuoCWLnewtnnz5tBJ4UV/7su0x6mW8WYYbLJVR6/6YHCZsrKyiDUEVziHF+VWG73yZKsNNTQ05N3Q4t7WUlpamuqzZu7kxhyG0t4Mvjct45urSbYGnVhYyNl0k3e1OcPJFp0E2B29itXQUXyy+y04A8idixcvLlu2zP6rx/rJfBWjo8IGjAqh0DNu94ti7PpqqDh3zqR1c4u7wpjdsKCgwKp17+rJQbU+2lYPHjxwm6x7TTK0S/pupU/rPlR32idiyJ9UDe41Z2NXUDLU09NjryK0yGT3WxAAuaNRiXtiq8cxR6zZywAbBQc/h6lDy70nz5soD6UlYw79bHwarbKy0saY7tcYRFANJ06ciNOPEq9WLeae4+bNm21tbb7Loe43GdTW1gbbVnV1tXvxNhvfYZBgDe7VBe89Supee6WO79wle/stmALKtZMnT/b29moMpeGqfVxovvT399tNdXpw6dIl7xOVi/5cmnZv71OPizjC3c8B2Qd0XfaBZD0ITj7oudaRi4qKSkpK3LtoZp2sWLNmTX5+vtbsfjQ0e9WGjrtnjSjVs337du91aeVNTU3ep3Cnpqa2bt3qfgrXd/HWFcwt9ej45wqJ1GAnATrHsuWT/aSVtrkGRhEhndR+CwIg1/Ly8i5cuHDjxg39O+/XqdQ+Ojs77VP1hYWF9s1ivgbX0dERsR6bN9CSqT4+6n0zgY5MLewbHevvpspCNehUdxb6vnrMrdb9HFDi1c5ZV1eXfUJVG9y9WcilklJdvg5uJXXhmF96kVQNxr6CIsHhv+nu7lY+pfp0cVL7LZgCmgcHDx6sr6/XvwuhGI0fdSxFfH5HY6hbt25FzAZoCGYDrlQn769evbLHwW9fSGVoaCj+NyJYtcEvs8xNtXHiVv0o4uKEGtadO3eyesUywRq0zNAf8b8/Na06o9/6zPdbcAYwPxYvXtzY2Lhw6tGx1N7e7n36xv1mtJjfq15WVhbaOn0zBhrLe9P6asHu18gEG5D+7ocPH7Sq+F+IpqdMTk6Oj4/POlpPtto59DUN2CsrK8vLy91PqEZ8F382emtSNWSj9fsCJtV5Xub7LVI2qJaWFrZCWpqbm7O6/tbW1py9FrW8tGaWMWfFxcUrVqyY35sUF0IN7LecAWCh4KbpXJ57UQP77ULDNQAAIAAAAAQAAIAAAAAQAACA/yPcBZS2XN6mCQCcAQAACAAAAAEAACAAAAAEAACAAAAAEAAAAAIAAEAAAAABAAAgAAAABAAAgAAAABAAAAACAABAAAAACAAAAAEAACAAAAAEAACAAAAAEAAAAAIAAEAAAAAIAAAAAQAAIAAAAAQAAIAAAAAQAAAAAgAAQAAAAAEAACAAAAAEAACAAAAAEAAAAAIAAEAAAAAIAAAAAQAAIAAAAAQAAIAAAAAQAAAAAgAAkAv/CDAATnpdr1Z04+YAAAAASUVORK5CYII"},{ name : "R_p01move_png", data : "iVBORw0KGgoAAAANSUhEUgAAAgAAAACACAIAAADyNUZcAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBQTNGNTE0RDI4N0VFNDExQkU5QjlGRDdFMjlBN0JGNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2QTAzMjY2NTdFMkMxMUU0QTEwM0E0OEIwQTEzNjY2MSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2QTAzMjY2NDdFMkMxMUU0QTEwM0E0OEIwQTEzNjY2MSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkIxM0Y1MTREMjg3RUU0MTFCRTlCOUZEN0UyOUE3QkY1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkFBM0Y1MTREMjg3RUU0MTFCRTlCOUZEN0UyOUE3QkY1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VPIiZgAADcdJREFUeNrs3NuPTfcbx3HzCypSh6CjIWVG/Eq0Jg4jglATVCsyQpD5A5q6ETe9lBB/gEsX1FWvmnEIE6HGRVunIZSqiVBaRIhzHZpGxyT6iW/6/J7fOs1ae/YcmPfrYrJnZu11+K61n+f7fdZ37Yrt27f3AwD0Pf+hCQCABAAAIAEAAEgAAAASAACABAAAIAEAAEgAAAASAACABAAAIAEAAEgAAAASAACABAAAIAEAAEgAAAASAACABAAAIAEAAEgAAAASAACABAAAIAEAAEgAAEACAACQAAAAJAAAAAkAAEACAACQAAAAJAAAAAkAAEACAACQAAAAJAAAAAkAAEACAACQAAAAJAAAAAkAAEACAACQAAAAJAAAAAkAAEACAACQAAAAJAAAIAEAAPqk/n3wmL/88ssuXf+OHTt6ZFsAwAgAAEACAACQAAAAJAAAAAkAAEgAAAASAJBq/Pjxo0eP7g17Mnz4cO3MoEGDOCk9S9eDTgTt8CbqTxP0tc/q7NmzO1zs9OnT9+7ds18VZD/++OOqqqoRI0bYHx8/fnzlypWLFy/m2e7cuXNHjRplvx49evTJkyfxxZYuXfrOO+/Yr01NTYkZaMKECfo5cODA8Je2trabN2+eP3/er/PDDz+cPHlyeH358uVff/01e6+am5tfvHgR2c+4hw8fnjx5Ms8h+x24cOGC9jBxsfr6+vDizp07Z8+ezVjAbzrtPD5//lyL3bp1K7F5Ozwvfj1y7dq1jPVMnTp1zJgxPvT/+eefaufW1la1ZCcvOamtrdX6/dnJs+eJJ0u7Wl1dnb1w4sVGAsD/3L9/v7Gxcf369WVc57Zt29asWVNZWdk9h6BQ/v777+dZzH+AFy1a9O6770aWUTKYM2fOpEmTDhw4EPlwxumz6rc7ffr077//Ph5QOuxI6mOvVBT5ozLBf19raWmxhKSTtXDhQlsmngA0gLBV3b17NxxCZD87Q9HfVvX333+nJQBbRi8UuCNB0C+Q5zzqj2oHnRdF4XPnzhU9L5GNzpgxQyuJpyVt/dNPP42/UReJ3qJWPXTokB1ICZec9Tksx+t1ZDcKnSn1Ksp1WikB9UV//fXX7t27t2zZkrPDm98vv/yi1Wrl2kTvHDF8/vnn8ejv00BDQ0PROkxi6Ua5JPtddXV18ejvKfCp2xheq+tqMVcffoX7yMITJ06019evXy97ecpHHB1vfAfilGjLVdFSQy1fvrzza1NA11AmEpq15ox4qqi9YsWKThaFlMYs+ofhFFGIEUAPePXqlUaRe/fu1fC2izbR3t5+5MiRU6dOrVy5Uj3cioqKrjucp0+fqk/nP1chuIfBu18sfNQV/e1z+PjxY6Ur9azVn9KQRR328F4toIigHJZ/N/SWSJ9O8cLXl+IU2RUU7FcdxYMHD9TNVIqaMGGC/UsB69mzZ+FYFNYtDE2ZMiVSurGY0tbWFs/rkQYx6svnOUANcSJ/ie9AnNpTOSw+Nsp29erV58+fh1YdM2aMNaNeqJ+es7IROV5f7qupqfH/0jrtX2q6n376SZeEmkWXhB/0KFvv27dPabjQJeeHg5GW0Rv98jq5d+7cCa+HDBliF4C1RtrJ8jsDEkAWXXCNjY0amHfDtnTVfvPNN/rwr127tuv6O/pA+rCreGGfxvhIX8HIor9604cPH7Z/KfLqk6a4H2KBfuoTW2h4pGP0W7RyeVqHWpHdft2/f79VGG6+9vDhQ+2tpYoQKfRTCTUcgiKaj79KDDasSSzOJDZI/jpbvP+r481z80CBTMdSqCV///13fwjatIJvOGqF45znJXK8el1fXx+iuU/MWpuFeL1FHSOrMunSUoNr0yEWawdCoa/QJRc/O6a6utonAH9QWt4SQKQ14ko+rZSA+hD1dr/++uutW7d2T/Q32pw2unPnTu1AjzeCRTF19H788cfIf/XJP3bsWP4CTry3a728MJ8nY2FfrlEPLl4oVziwj33oLVoKj/9RNGiw15cuXSpvu/nyxd27d23QE+nVppk5c2aeelEatYMfQ9h91KKsf+35tZ04cSJ+j6GlpcXGymqH0mpQ/uxYA+Yso4EE0CkaNqqDuWnTph7sKZw5c0Y7oN3IWXDoouhvUUxhNPF2ogKxhd3sAo5RLonnDF8wSSy1+bjT2tqauOaff/7ZXg8dOjS8+O233+yPY8eOjffQtbl4OukkOy4dbHNzsx1y9kQUW0zNvnjx4s7sgE6KdSBKrsX7Eny8T6D1J3a0dZ34fnoJM4Z1dqw7r01cuHAhsR8ASkBl9urVKwX9PXv2/PHHHz2+My9fvjx48OCpU6dWrVpVW1vbpTcGEr333nv2+vbt22mLPXr0yIKCXmSPvkPg6PfvJBPlDL1F8dcPNW7cuBG/02vZxabrJGajeMLQH7XF8PYwTUhv9z30xEJ/2MPEr/Lu8Pu3/c2MkDjVJiGihXvRaRMrldi029Yyc+fOzTnfNJGaMWdKTovCVVVVkczko7nWn/beBw8e+Kuow0siwp/969ev6+1K0qEiFCkblibxtB4+fLjofjICeNvs2rVr586dvSH6+3CpXdKO9eYBU9G3+D7d5MmT/Ww/BUE/RMjujcYljh6uXLniizORnnjaeKJk8eKSLzHFbw57R48etcNXs5Tr6ao8lRNF2Np/1dfXNzQ0xO+R5KznRG7nFmWVOrtL7Ot4OctoIAEUtmbNmi+++GLYsGG9Z5f00dUuacd6baP557byFygsUivG+dk4aeE4MSskRrH4H69eveqLM36Cpvakw5nyJZcvNFgJnX2NQnwhOyOMannf66+rqyvLrNA8D4WFKfyB2sc/ZHf+/Hkr7+TZXGc+QTZHyMd93y3o8HkuUAIqUUVFxaxZs2pqar777rsjR468fPmyB3dmwIABS5Ys+eyzz0qIsGXhB/Jjx45NGyCPHDnSR/acK7948aJN2rEPfOQJ0shIKERt/VRMTFzMFyj8DUwtrBwQ4vKIESP8U6kZ0/+1xTNnzhRtNF++SCwihWfWMqblKOqNGjUqrEcLf/LJJ6WdPn9eSqa8dfr0acsfvshWVVWVVo3xxUN/FeXh43vIRpEFsstoefjJbKbs94FIAG8qBdwVK1bMnz9/165dPTVlWNe9ev2dqeF2nqK5ul2hJ6h+WeJjpf5LYApNW1IEtMcIzLVr19KWV0C3bnv8odBg2rRp9vrZs2f+X7dv37aOub/fkHYDoN+/Xy9Rcvkig0Yh2fMy1dQ2nb+0KpCfVWWDj2w63nAGtV3r/qvZI5FRbRLWHO7fxJtI6dk3QqHA2uFksCDPExXZFzZRjhJQB3R9r1u37quvvvrggw+6c7vanDaqTfds9I98VBK7ovqoK03ar77UnjMHRAo1Gd06nxuUHeNzS/zXSMSf4dKv8dsDGdG/NImz1xMvrey5MZH5tSWUofwkopwPOSv6N73mp5Aq10buH/ih1bx58+IVKg3srBF0TgtV2HJO8uGpYEYA3USX2saNG48fP75v376uexLYKiErV67Uh6r7J/ykaWlpscmgerF69erwJHBIVL4Lr/BR9EsyFB1mzpxpnU0rNCdSblC/2AoCGqKFJ4FDh9Q/Cdwv5UkfhftIPSF7+r92LK03mtaF9M+yJY4dbQfUh83uGuu//nizWcll6NChQ4YM0UXrH94uel50dK2trVaDWrBggX+WWGurrq4OozGd/YaGhvAk8NOnT8eNG+efBPY3D4oW0BIfw7bHfcMTFSV/KUvaaVWbl/eGEAngbaBwrH6uQtXBgwfVOWpvby//Oejfv66ubtmyZYMHD+5Vx67Pw6FDh+zbINR19V+v5qsHBw4cKGHlCjQhxmV3/y2s+yf+04Kj4mZi115jCP8WRcbsLepgly5dmvivxJmgvnyhGJqYhGyWp01IzT5eWz5bWlPovJQ2klAbVlVVheyuHaitrfWH09zcbE+A68KwezkR4Rng/BtVTPdzcxO/gc66Ix2W0TKknda+OROUElAuCs3q/27evPmjjz4q75q1Qq1WK+9t0d+6RcoBGaMfRdJvv/22tK5T+MZKyfksrmJK9qxNRdW0O5MKRr4aXrRgVah8cfny5cRlfDUm+1vtLNTmnP6UeF78V3IWzc0nTpxIKwTpv8r3GbcWtM/79+8vGkzt9m/aZLDwREXOMhpIAOVXWVm5YcOG8q5TK+y274IuOQfs3btXYTqSBhRiFHB3795d8sBZbzz7Wv44dfLkyXhPTSFDY4jGxsbsXqGPv35uaFn42etpsU+7Z22Yp5Ct9in6xXA6KTq0H374QeelMzNbQiHIqmELFiyI7FhTU5POfuTOv45O14k6BEU3nXNurq8pTZkyhYhUhgrH9u3b+9oxJz4KWEa+RNCd2+oeGobr89kbps0pagwbNqxvlm57FXXGBw0axOyaNxH3AFC4b9hL9uTJa5yR3jBGpBHeUJSAAIAEAAAgAQAASAAAABIAAOAt0hengQIAGAEAAAkAAEACAACQAAAAJAAAAAkAAEACAACQAAAAJAAAAAkAAEACAACQAAAAJAAAAAkAAEACAACQAAAAJAAAAAkAAEACAACQAAAAJAAAAAkAAEACAACQAACABAAAIAEAAEgAAAASAACABAAAIAEAAEgAAAASAACABAAAIAEAAEgAAAASAACABAAAIAEAAEgAAAASAACABAAAIAEAAEgAAAASAACABAAAIAEAAP7PPwIMAG0JshocXiMfAAAAAElFTkSuQmCC"}];
format.tools.InflateImpl.LEN_EXTRA_BITS_TBL = [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,-1,-1];
format.tools.InflateImpl.LEN_BASE_VAL_TBL = [3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258];
format.tools.InflateImpl.DIST_EXTRA_BITS_TBL = [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,-1,-1];
format.tools.InflateImpl.DIST_BASE_VAL_TBL = [1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577];
format.tools.InflateImpl.CODE_LENGTHS_POS = [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
h3d.Buffer.GUID = 0;
h3d.impl.GlDriver.TFILTERS = [[[9728,9728],[9729,9729]],[[9728,9984],[9729,9985]],[[9728,9986],[9729,9987]]];
h3d.impl.GlDriver.TWRAP = [33071,10497];
h3d.impl.GlDriver.FACES = [0,1028,1029,1032];
h3d.impl.GlDriver.BLEND = [1,0,770,768,772,774,771,769,773,775,32769,32771,32770,32772,776];
h3d.impl.GlDriver.COMPARE = [519,512,514,517,516,518,513,515];
h3d.impl.GlDriver.OP = [32774,32778,32779];
h3d.impl.MemoryManager.ALL_FLAGS = Type.allEnums(h3d.BufferFlag);
h3d.mat.Texture.UID = 0;
h3d.mat.Texture.COLOR_CACHE = new haxe.ds.IntMap();
h3d.pass._Border.BorderShader.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:5:0y4:namey8:positiony4:typejy9:hxsl.Type:5:2i4jy12:hxsl.VecType:1:0y6:parentoR6r10R8y6:outputR10jR11:12:1ar9oR6r10R8y5:colorR10jR11:5:2i4r11R13r13y2:idi-147ghR16i-145gR16i-146gy1:poy4:filey70:C%3A%5CHaxeToolkit%5Chaxe%5Clib%5Cheaps%2Fgit%2Fh3d%2Fpass%2FBorder.hxy3:maxi295y3:mini280gy1:tr12goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:40:0R17oR18R19R20i302R21i298gR22jR11:13:1ahgaoR3jR4:1:1oR6jR7:1:0R8R9R10jR11:5:2i2r11R13oR6r30R8y5:inputR10jR11:12:1ar29hR16i-143gR16i-144gR17oR18R19R20i317R21i303gR22r31goR3jR4:0:1jy10:hxsl.Const:3:1zR17oR18R19R20i320R21i319gR22jR11:3:0goR3jR4:0:1jR25:3:1i1R17oR18R19R20i323R21i322gR22r41ghR17oR18R19R20i324R21i298gR22jR11:5:2i4r11gR17oR18R19R20i324R21i280gR22r12ghR17oR18R19R20i330R21i274gR22jR11:0:0gR6jy17:hxsl.FunctionKind:0:0y3:refoR6jR7:6:0R8y6:vertexR10jR11:13:1aoR1ahy3:retr53ghR16i-148gR29r53goR1ahR2oR3jR4:4:1aoR3jR4:5:3r7oR3jR4:1:1r15R17oR18R19R20i374R21i362gR22r16goR3jR4:1:1oR6jR7:2:0R8R15R10jR11:5:2i4r11R16i-142gR17oR18R19R20i382R21i377gR22r72gR17oR18R19R20i382R21i362gR22r16ghR17oR18R19R20i388R21i356gR22r53gR6jR26:1:0R27oR6r56R8y8:fragmentR10jR11:13:1aoR1ahR29r53ghR16i-149gR29r53ghR8y29:h3d.pass._Border.BorderShadery4:varsar55r80r13r32r70hg";
h3d.pass.Params.defaultKillAlphaThreshold = 0.5;
h3d.shader.AmbientLight.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:4:0y4:namey10:lightColory4:typejy9:hxsl.Type:5:2i3jy12:hxsl.VecType:1:0y2:idi-30gy1:poy4:filey78:C%3A%5CHaxeToolkit%5Chaxe%5Clib%5Cheaps%2Fgit%2Fh3d%2Fshader%2FAmbientLight.hxy3:maxi316y3:mini306gy1:tr12goR3jR4:1:1oR6jR7:0:0R8y12:ambientLightR10jR11:5:2i3r11y6:parentoR6r17R8y6:globalR10jR11:12:1ar16oR6r17R8y16:perPixelLightingR10jR11:2:0R21r19y10:qualifiersajy17:hxsl.VarQualifier:0:1nhR13i-27ghR13i-25gR13i-26gR14oR15R16R17i338R18i319gR19r18gR14oR15R16R17i338R18i306gR19r12ghR14oR15R16R17i344R18i300gR19jR11:0:0gR6jy17:hxsl.FunctionKind:2:0y3:refoR6jR7:6:0R8y8:__init__R10jR11:13:1aoR1ahy3:retr32ghR13i-31gR29r32goR1ahR2oR3jR4:4:1aoR3jR4:5:3r7oR3jR4:1:1oR6r10R8y15:lightPixelColorR10jR11:5:2i3r11R13i-29gR14oR15R16R17i399R18i384gR19r47goR3jR4:1:1r16R14oR15R16R17i421R18i402gR19r18gR14oR15R16R17i421R18i384gR19r47ghR14oR15R16R17i427R18i378gR19r32gR6jR26:1:0R27oR6r35R8y16:__init__fragmentR10jR11:13:1aoR1ahR29r32ghR13i-32gR29r32goR1ahR2oR3jR4:4:1aoR3jR4:10:3oR3jR4:6:2jy15:haxe.macro.Unop:2:0oR3jR4:1:1r21R14oR15R16R17i485R18i462gR19r22gR14oR15R16R17i485R18i461gR19r22goR3jR4:5:3jR5:20:1jR5:1:0oR3jR4:9:2oR3jR4:1:1oR6r10R8y10:pixelColorR10jR11:5:2i4r11R13i-28gR14oR15R16R17i498R18i488gR19r81gajy14:hxsl.Component:0:0jR34:1:0jR34:2:0hR14oR15R16R17i502R18i488gR19jR11:5:2i3r11goR3jR4:1:1r9R14oR15R16R17i516R18i506gR19r12gR14oR15R16R17i516R18i488gR19r90gnR14oR15R16R17i516R18i457gR19r32ghR14oR15R16R17i522R18i451gR19r32gR6jR26:0:0R27oR6r35R8y6:vertexR10jR11:13:1aoR1ahR29r32ghR13i-33gR29r32goR1ahR2oR3jR4:4:1aoR3jR4:10:3oR3jR4:1:1r21R14oR15R16R17i581R18i558gR19r22goR3jR4:5:3jR5:20:1r76oR3jR4:9:2oR3jR4:1:1r80R14oR15R16R17i594R18i584gR19r81gar85r86r87hR14oR15R16R17i598R18i584gR19jR11:5:2i3r11goR3jR4:1:1r46R14oR15R16R17i617R18i602gR19r47gR14oR15R16R17i617R18i584gR19r123gnR14oR15R16R17i617R18i554gR19r32ghR14oR15R16R17i623R18i548gR19r32gR6r57R27oR6r35R8y8:fragmentR10jR11:13:1aoR1ahR29r32ghR13i-34gR29r32ghR8y23:h3d.shader.AmbientLighty4:varsar101r9r34r133r58r19r80r46hg";
h3d.shader.Base2d.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:4:0y4:namey14:spritePositiony4:typejy9:hxsl.Type:5:2i4jy12:hxsl.VecType:1:0y2:idi-10gy1:poy4:filey72:C%3A%5CHaxeToolkit%5Chaxe%5Clib%5Cheaps%2Fgit%2Fh3d%2Fshader%2FBase2d.hxy3:maxi759y3:mini745gy1:tr12goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:40:0R14oR15R16R17i766R18i762gR19jR11:13:1ahgaoR3jR4:1:1oR6jR7:1:0R8y8:positionR10jR11:5:2i2r11y6:parentoR6r25R8y5:inputR10jR11:12:1ar24oR6r25R8y2:uvR10jR11:5:2i2r11R22r27R13i-3goR6r25R8y5:colorR10jR11:5:2i4r11R22r27R13i-4ghR13i-1gR13i-2gR14oR15R16R17i781R18i767gR19r26goR3jR4:1:1oR6jR7:2:0R8y6:zValueR10jR11:3:0R13i-8gR14oR15R16R17i789R18i783gR19r39goR3jR4:0:1jy10:hxsl.Const:3:1i1R14oR15R16R17i792R18i791gR19r39ghR14oR15R16R17i793R18i762gR19jR11:5:2i4r11gR14oR15R16R17i793R18i745gR19r12goR3jR4:10:3oR3jR4:1:1oR6r38R8y10:isRelativeR10jR11:2:0y10:qualifiersajy17:hxsl.VarQualifier:0:1nhR13i-15gR14oR15R16R17i813R18i803gR19r54goR3jR4:4:1aoR3jR4:5:3r7oR3jR4:9:2oR3jR4:1:1oR6r10R8y16:absolutePositionR10jR11:5:2i4r11R13i-11gR14oR15R16R17i839R18i823gR19r65gajy14:hxsl.Component:0:0hR14oR15R16R17i841R18i823gR19r39goR3jR4:8:2oR3jR4:2:1jR20:29:0R14oR15R16R17i869R18i844gR19jR11:13:1aoR1aoR8y1:_R10jR11:5:2i3r11goR8y1:bR10jR11:5:2i3r11ghy3:retr39ghgaoR3jR4:8:2oR3jR4:2:1jR20:39:0R14oR15R16R17i848R18i844gR19jR11:13:1ahgaoR3jR4:9:2oR3jR4:1:1r9R14oR15R16R17i863R18i849gR19r12gar69jR32:1:0hR14oR15R16R17i866R18i849gR19jR11:5:2i2r11goR3jR4:0:1jR27:3:1i1R14oR15R16R17i868R18i867gR19r39ghR14oR15R16R17i869R18i844gR19r81goR3jR4:1:1oR6r38R8y15:absoluteMatrixAR10jR11:5:2i3r11R13i-17gR14oR15R16R17i889R18i874gR19r111ghR14oR15R16R17i890R18i844gR19r39gR14oR15R16R17i890R18i823gR19r39goR3jR4:5:3r7oR3jR4:9:2oR3jR4:1:1r64R14oR15R16R17i913R18i897gR19r65gar99hR14oR15R16R17i915R18i897gR19r39goR3jR4:8:2oR3jR4:2:1r74R14oR15R16R17i943R18i918gR19jR11:13:1aoR1aoR8R33R10jR11:5:2i3r11gr82hR35r39ghgaoR3jR4:8:2oR3jR4:2:1r88R14oR15R16R17i922R18i918gR19r92gaoR3jR4:9:2oR3jR4:1:1r9R14oR15R16R17i937R18i923gR19r12gar69r99hR14oR15R16R17i940R18i923gR19jR11:5:2i2r11goR3jR4:0:1jR27:3:1i1R14oR15R16R17i942R18i941gR19r39ghR14oR15R16R17i943R18i918gR19r134goR3jR4:1:1oR6r38R8y15:absoluteMatrixBR10jR11:5:2i3r11R13i-18gR14oR15R16R17i963R18i948gR19r158ghR14oR15R16R17i964R18i918gR19r39gR14oR15R16R17i964R18i897gR19r39goR3jR4:5:3r7oR3jR4:9:2oR3jR4:1:1r64R14oR15R16R17i987R18i971gR19r65gajR32:2:0jR32:3:0hR14oR15R16R17i990R18i971gR19jR11:5:2i2r11goR3jR4:9:2oR3jR4:1:1r9R14oR15R16R17i1007R18i993gR19r12gar171r172hR14oR15R16R17i1010R18i993gR19jR11:5:2i2r11gR14oR15R16R17i1010R18i971gR19r175ghR14oR15R16R17i1017R18i816gR19jR11:0:0goR3jR4:5:3r7oR3jR4:1:1r64R14oR15R16R17i1044R18i1028gR19r65goR3jR4:1:1r9R14oR15R16R17i1061R18i1047gR19r12gR14oR15R16R17i1061R18i1028gR19r65gR14oR15R16R17i1061R18i799gR19r188goR3jR4:5:3r7oR3jR4:1:1oR6jR7:3:0R8y12:calculatedUVR10jR11:5:2i2r11R13i-14gR14oR15R16R17i1079R18i1067gR19r204goR3jR4:1:1r29R14oR15R16R17i1090R18i1082gR19r30gR14oR15R16R17i1090R18i1067gR19r204goR3jR4:5:3r7oR3jR4:1:1oR6r10R8y10:pixelColorR10jR11:5:2i4r11R13i-12gR14oR15R16R17i1106R18i1096gR19r215goR3jR4:10:3oR3jR4:1:1r53R14oR15R16R17i1119R18i1109gR19r54goR3jR4:5:3jR5:1:0oR3jR4:1:1oR6r38R8R25R10jR11:5:2i4r11R13i-16gR14oR15R16R17i1127R18i1122gR19r226goR3jR4:1:1r31R14oR15R16R17i1141R18i1130gR19r32gR14oR15R16R17i1141R18i1122gR19jR11:5:2i4r11goR3jR4:1:1r31R14oR15R16R17i1155R18i1144gR19r32gR14oR15R16R17i1155R18i1109gR19r234gR14oR15R16R17i1155R18i1096gR19r215goR3jR4:5:3r7oR3jR4:1:1oR6r10R8y12:textureColorR10jR11:5:2i4r11R13i-13gR14oR15R16R17i1173R18i1161gR19r245goR3jR4:8:2oR3jR4:2:1jR20:33:0R14oR15R16R17i1183R18i1176gR19jR11:13:1aoR1aoR8R33R10jR11:10:0goR8R34R10jR11:5:2i2r11ghR35jR11:5:2i4r11ghgaoR3jR4:1:1oR6r38R8y7:textureR10r257R13i-9gR14oR15R16R17i1183R18i1176gR19r257goR3jR4:1:1r202R14oR15R16R17i1200R18i1188gR19r204ghR14oR15R16R17i1201R18i1176gR19r260gR14oR15R16R17i1201R18i1161gR19r245goR3jR4:5:3jR5:20:1r223oR3jR4:1:1r214R14oR15R16R17i1217R18i1207gR19r215goR3jR4:1:1r244R14oR15R16R17i1233R18i1221gR19r245gR14oR15R16R17i1233R18i1207gR19r215ghR14oR15R16R17i1239R18i739gR19r188gR6jy17:hxsl.FunctionKind:2:0y3:refoR6jR7:6:0R8y8:__init__R10jR11:13:1aoR1ahR35r188ghR13i-22gR35r188goR1ahR2oR3jR4:4:1aoR3jR4:5:3r7oR3jR4:9:2oR3jR4:1:1r64R14oR15R16R17i1285R18i1269gR19r65gar69r99hR14oR15R16R17i1288R18i1269gR19jR11:5:2i2r11goR3jR4:5:3r223oR3jR4:3:1oR3jR4:5:3jR5:0:0oR3jR4:9:2oR3jR4:1:1r64R14oR15R16R17i1308R18i1292gR19r65gar69r99hR14oR15R16R17i1311R18i1292gR19jR11:5:2i2r11goR3jR4:9:2oR3jR4:1:1oR6r38R8y8:viewportR10jR11:5:2i4r11R13i-21gR14oR15R16R17i1322R18i1314gR19r321gar69r99hR14oR15R16R17i1325R18i1314gR19jR11:5:2i2r11gR14oR15R16R17i1325R18i1292gR19jR11:5:2i2r11gR14oR15R16R17i1326R18i1291gR19r330goR3jR4:9:2oR3jR4:1:1r320R14oR15R16R17i1337R18i1329gR19r321gar171r172hR14oR15R16R17i1340R18i1329gR19jR11:5:2i2r11gR14oR15R16R17i1340R18i1291gR19jR11:5:2i2r11gR14oR15R16R17i1340R18i1269gR19r305goR3jR4:10:3oR3jR4:1:1oR6r38R8y10:pixelAlignR10r54R29ajR30:0:1nhR13i-19gR14oR15R16R17i1446R18i1436gR19r54goR3jR4:5:3jR5:20:1jR5:3:0oR3jR4:9:2oR3jR4:1:1r64R14oR15R16R17i1465R18i1449gR19r65gar69r99hR14oR15R16R17i1468R18i1449gR19jR11:5:2i2r11goR3jR4:1:1oR6r38R8y16:halfPixelInverseR10jR11:5:2i2r11R13i-20gR14oR15R16R17i1488R18i1472gR19r366gR14oR15R16R17i1488R18i1449gR19r363gnR14oR15R16R17i1488R18i1432gR19r188goR3jR4:5:3r7oR3jR4:1:1oR6jR7:5:0R8R21R10jR11:5:2i4r11R22oR6r376R8y6:outputR10jR11:12:1ar375oR6r376R8R25R10jR11:5:2i4r11R22r378R13i-7ghR13i-5gR13i-6gR14oR15R16R17i1509R18i1494gR19r377goR3jR4:1:1r64R14oR15R16R17i1528R18i1512gR19r65gR14oR15R16R17i1528R18i1494gR19r377ghR14oR15R16R17i1534R18i1263gR19r188gR6jR42:0:0R43oR6r288R8y6:vertexR10jR11:13:1aoR1ahR35r188ghR13i-23gR35r188goR1ahR2oR3jR4:4:1aoR3jR4:5:3r7oR3jR4:1:1r380R14oR15R16R17i1578R18i1566gR19r381goR3jR4:1:1r214R14oR15R16R17i1591R18i1581gR19r215gR14oR15R16R17i1591R18i1566gR19r381ghR14oR15R16R17i1597R18i1560gR19r188gR6jR42:1:0R43oR6r288R8y8:fragmentR10jR11:13:1aoR1ahR35r188ghR13i-24gR35r188ghR8y17:h3d.shader.Base2dy4:varsar202r393r37r110r287r64r414r264r348r365r244r9r378r53r157r27r225r214r320hg";
h3d.shader.BaseMesh.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:4:0y4:namey16:relativePositiony4:typejy9:hxsl.Type:5:2i3jy12:hxsl.VecType:1:0y2:idi-89gy1:poy4:filey74:C%3A%5CHaxeToolkit%5Chaxe%5Clib%5Cheaps%2Fgit%2Fh3d%2Fshader%2FBaseMesh.hxy3:maxi970y3:mini954gy1:tr12goR3jR4:1:1oR6jR7:1:0R8y8:positionR10jR11:5:2i3r11y6:parentoR6r17R8y5:inputR10jR11:12:1ar16oR6r17R8y6:normalR10jR11:5:2i3r11R21r19R13i-83ghR13i-81gR13i-82gR14oR15R16R17i987R18i973gR19r18gR14oR15R16R17i987R18i954gR19r12goR3jR4:5:3r7oR3jR4:1:1oR6r10R8y19:transformedPositionR10jR11:5:2i3r11R13i-90gR14oR15R16R17i1012R18i993gR19r31goR3jR4:5:3jR5:1:0oR3jR4:1:1r9R14oR15R16R17i1031R18i1015gR19r12goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:50:0R14oR15R16R17i1050R18i1034gR19jR11:13:1ahgaoR3jR4:1:1oR6jR7:0:0R8y9:modelViewR10jR11:7:0R21oR6r49R8y6:globalR10jR11:12:1aoR6r49R8y4:timeR10jR11:3:0R21r51R13i-77goR6r49R8y9:pixelSizeR10jR11:5:2i2r11R21r51R13i-78gr48oR6r49R8y16:modelViewInverseR10r50R21r51y10:qualifiersajy17:hxsl.VarQualifier:3:0hR13i-80ghR13i-76gR31ar59hR13i-79gR14oR15R16R17i1050R18i1034gR19r50ghR14oR15R16R17i1059R18i1034gR19jR11:8:0gR14oR15R16R17i1059R18i1015gR19jR11:5:2i3r11gR14oR15R16R17i1059R18i993gR19r31goR3jR4:5:3r7oR3jR4:1:1oR6r10R8y17:projectedPositionR10jR11:5:2i4r11R13i-92gR14oR15R16R17i1082R18i1065gR19r75goR3jR4:5:3r35oR3jR4:8:2oR3jR4:2:1jR25:40:0R14oR15R16R17i1089R18i1085gR19jR11:13:1ahgaoR3jR4:1:1r30R14oR15R16R17i1109R18i1090gR19r31goR3jR4:0:1jy10:hxsl.Const:3:1i1R14oR15R16R17i1112R18i1111gR19r54ghR14oR15R16R17i1113R18i1085gR19jR11:5:2i4r11goR3jR4:1:1oR6r49R8y8:viewProjR10r50R21oR6r49R8y6:cameraR10jR11:12:1aoR6r49R8y4:viewR10r50R21r99R13i-69goR6r49R8y4:projR10r50R21r99R13i-70goR6r49R8R20R10jR11:5:2i3r11R21r99R13i-71goR6r49R8y8:projDiagR10jR11:5:2i3r11R21r99R13i-72gr98oR6r49R8y15:inverseViewProjR10r50R21r99R13i-74goR6jR7:3:0R8y3:dirR10jR11:5:2i3r11R21r99R13i-75ghR13i-68gR13i-73gR14oR15R16R17i1131R18i1116gR19r50gR14oR15R16R17i1131R18i1085gR19jR11:5:2i4r11gR14oR15R16R17i1131R18i1065gR19r75goR3jR4:5:3r7oR3jR4:1:1oR6r10R8y17:transformedNormalR10jR11:5:2i3r11R13i-91gR14oR15R16R17i1154R18i1137gR19r122goR3jR4:8:2oR3jR4:2:1jR25:31:0R14oR15R16R17i1197R18i1157gR19jR11:13:1aoR1aoR8y1:_R10r69ghy3:retr69ghgaoR3jR4:3:1oR3jR4:5:3r35oR3jR4:1:1r21R14oR15R16R17i1170R18i1158gR19r22goR3jR4:8:2oR3jR4:2:1jR25:48:0R14oR15R16R17i1189R18i1173gR19jR11:13:1ahgaoR3jR4:1:1r48R14oR15R16R17i1189R18i1173gR19r50ghR14oR15R16R17i1196R18i1173gR19jR11:6:0gR14oR15R16R17i1196R18i1158gR19r69gR14oR15R16R17i1197R18i1157gR19r69ghR14oR15R16R17i1209R18i1157gR19r69gR14oR15R16R17i1209R18i1137gR19r122goR3jR4:5:3r7oR3jR4:1:1r108R14oR15R16R17i1225R18i1215gR19r110goR3jR4:8:2oR3jR4:2:1r127R14oR15R16R17i1267R18i1228gR19jR11:13:1aoR1aoR8R43R10jR11:5:2i3r11ghR44r69ghgaoR3jR4:3:1oR3jR4:5:3jR5:3:0oR3jR4:1:1r103R14oR15R16R17i1244R18i1229gR19r104goR3jR4:1:1r30R14oR15R16R17i1266R18i1247gR19r31gR14oR15R16R17i1266R18i1229gR19r175gR14oR15R16R17i1267R18i1228gR19r175ghR14oR15R16R17i1279R18i1228gR19r69gR14oR15R16R17i1279R18i1215gR19r110goR3jR4:5:3r7oR3jR4:1:1oR6r10R8y10:pixelColorR10jR11:5:2i4r11R13i-93gR14oR15R16R17i1295R18i1285gR19r198goR3jR4:1:1oR6jR7:2:0R8y5:colorR10jR11:5:2i4r11R13i-95gR14oR15R16R17i1303R18i1298gR19r204gR14oR15R16R17i1303R18i1285gR19r198goR3jR4:5:3r7oR3jR4:1:1oR6r10R8y5:depthR10r54R13i-94gR14oR15R16R17i1314R18i1309gR19r54goR3jR4:5:3jR5:2:0oR3jR4:9:2oR3jR4:1:1r74R14oR15R16R17i1334R18i1317gR19r75gajy14:hxsl.Component:2:0hR14oR15R16R17i1336R18i1317gR19r54goR3jR4:9:2oR3jR4:1:1r74R14oR15R16R17i1356R18i1339gR19r75gajR48:3:0hR14oR15R16R17i1358R18i1339gR19r54gR14oR15R16R17i1358R18i1317gR19r54gR14oR15R16R17i1358R18i1309gR19r54ghR14oR15R16R17i1364R18i948gR19jR11:0:0gR6jy17:hxsl.FunctionKind:2:0y3:refoR6jR7:6:0R8y8:__init__R10jR11:13:1aoR1ahR44r238ghR13i-96gR44r238goR1ahR2oR3jR4:4:1aoR3jR4:5:3r7oR3jR4:1:1r121R14oR15R16R17i1421R18i1404gR19r122goR3jR4:8:2oR3jR4:2:1r127R14oR15R16R17i1441R18i1424gR19jR11:13:1aoR1aoR8R43R10r122ghR44r69ghgaoR3jR4:1:1r121R14oR15R16R17i1441R18i1424gR19r122ghR14oR15R16R17i1453R18i1424gR19r69gR14oR15R16R17i1453R18i1404gR19r122ghR14oR15R16R17i1459R18i1398gR19r238gR6jR49:1:0R50oR6r241R8y16:__init__fragmentR10jR11:13:1aoR1ahR44r238ghR13i-97gR44r238goR1ahR2oR3jR4:4:1aoR3jR4:5:3r7oR3jR4:1:1oR6jR7:5:0R8R20R10jR11:5:2i4r11R21oR6r286R8y6:outputR10jR11:12:1ar285oR6r286R8R46R10jR11:5:2i4r11R21r288R13i-86goR6r286R8R47R10jR11:5:2i4r11R21r288R13i-87goR6r286R8R23R10jR11:5:2i4r11R21r288R13i-88ghR13i-84gR13i-85gR14oR15R16R17i1504R18i1489gR19r287goR3jR4:1:1r74R14oR15R16R17i1524R18i1507gR19r75gR14oR15R16R17i1524R18i1489gR19r287ghR14oR15R16R17i1530R18i1483gR19r238gR6jR49:0:0R50oR6r241R8y6:vertexR10jR11:13:1aoR1ahR44r238ghR13i-98gR44r238goR1ahR2oR3jR4:4:1aoR3jR4:5:3r7oR3jR4:1:1r290R14oR15R16R17i1574R18i1562gR19r291goR3jR4:1:1r197R14oR15R16R17i1587R18i1577gR19r198gR14oR15R16R17i1587R18i1562gR19r291goR3jR4:5:3r7oR3jR4:1:1r292R14oR15R16R17i1605R18i1593gR19r293goR3jR4:8:2oR3jR4:2:1jR25:52:0R14oR15R16R17i1612R18i1608gR19jR11:13:1aoR1aoR8y5:valueR10r54ghR44jR11:5:2i4r11ghgaoR3jR4:1:1r211R14oR15R16R17i1618R18i1613gR19r54ghR14oR15R16R17i1619R18i1608gR19r338gR14oR15R16R17i1619R18i1593gR19r293goR3jR4:5:3r7oR3jR4:1:1r294R14oR15R16R17i1638R18i1625gR19r295goR3jR4:8:2oR3jR4:2:1jR25:54:0R14oR15R16R17i1651R18i1641gR19jR11:13:1aoR1aoR8R55R10jR11:5:2i3r11ghR44jR11:5:2i4r11ghgaoR3jR4:1:1r121R14oR15R16R17i1669R18i1652gR19r122ghR14oR15R16R17i1670R18i1641gR19r362gR14oR15R16R17i1670R18i1625gR19r295ghR14oR15R16R17i1676R18i1556gR19r238gR6r273R50oR6r241R8y8:fragmentR10jR11:13:1aoR1ahR44r238ghR13i-99gR44r238ghR8y19:h3d.shader.BaseMeshy4:varsar74r211r307r121r240r374r274r9r99r288r51r19r30r202r197hg";
h3d.shader.ScreenShader.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:5:0y4:namey8:positiony4:typejy9:hxsl.Type:5:2i4jy12:hxsl.VecType:1:0y6:parentoR6r10R8y6:outputR10jR11:12:1ar9oR6r10R8y5:colorR10jR11:5:2i4r11R13r13y2:idi-140ghR16i-138gR16i-139gy1:poy4:filey78:C%3A%5CHaxeToolkit%5Chaxe%5Clib%5Cheaps%2Fgit%2Fh3d%2Fshader%2FScreenShader.hxy3:maxi262y3:mini247gy1:tr12goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:40:0R17oR18R19R20i269R21i265gR22jR11:13:1ahgaoR3jR4:1:1oR6jR7:1:0R8R9R10jR11:5:2i2r11R13oR6r30R8y5:inputR10jR11:12:1ar29oR6r30R8y2:uvR10jR11:5:2i2r11R13r32R16i-137ghR16i-135gR16i-136gR17oR18R19R20i284R21i270gR22r31goR3jR4:0:1jy10:hxsl.Const:3:1zR17oR18R19R20i287R21i286gR22jR11:3:0goR3jR4:0:1jR26:3:1i1R17oR18R19R20i290R21i289gR22r43ghR17oR18R19R20i291R21i265gR22jR11:5:2i4r11gR17oR18R19R20i291R21i247gR22r12ghR17oR18R19R20i297R21i241gR22jR11:0:0gR6jy17:hxsl.FunctionKind:0:0y3:refoR6jR7:6:0R8y6:vertexR10jR11:13:1aoR1ahy3:retr55ghR16i-141gR30r55ghR8y23:h3d.shader.ScreenShadery4:varsar57r13r32hg";
h3d.shader.Blur.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:5:0y4:namey8:positiony4:typejy9:hxsl.Type:5:2i4jy12:hxsl.VecType:1:0y6:parentoR6r10R8y6:outputR10jR11:12:1ar9oR6r10R8y5:colorR10jR11:5:2i4r11R13r13y2:idi-155ghR16i-153gR16i-154gy1:poy4:filey78:C%3A%5CHaxeToolkit%5Chaxe%5Clib%5Cheaps%2Fgit%2Fh3d%2Fshader%2FScreenShader.hxy3:maxi262y3:mini247gy1:tr12goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:40:0R17oR18R19R20i269R21i265gR22jR11:13:1ahgaoR3jR4:1:1oR6jR7:1:0R8R9R10jR11:5:2i2r11R13oR6r30R8y5:inputR10jR11:12:1ar29oR6r30R8y2:uvR10jR11:5:2i2r11R13r32R16i-152ghR16i-150gR16i-151gR17oR18R19R20i284R21i270gR22r31goR3jR4:0:1jy10:hxsl.Const:3:1zR17oR18R19R20i287R21i286gR22jR11:3:0goR3jR4:0:1jR26:3:1i1R17oR18R19R20i290R21i289gR22r43ghR17oR18R19R20i291R21i265gR22jR11:5:2i4r11gR17oR18R19R20i291R21i247gR22r12ghR17oR18R19R20i297R21i241gR22jR11:0:0gR6jy17:hxsl.FunctionKind:0:0y3:refoR6jR7:6:0R8y6:vertexR10jR11:13:1aoR1ahy3:retr55ghR16i-163gR30r55goR1ahR2oR3jR4:4:1aoR3jR4:10:3oR3jR4:1:1oR6jR7:2:0R8y7:isDepthR10jR11:2:0y10:qualifiersajy17:hxsl.VarQualifier:0:1nhR16i-158gR17oR18y70:C%3A%5CHaxeToolkit%5Chaxe%5Clib%5Cheaps%2Fgit%2Fh3d%2Fshader%2FBlur.hxR20i376R21i369gR22r71goR3jR4:4:1aoR3jR4:7:2oR6jR7:4:0R8y3:valR10r43R16i-165goR3jR4:0:1jR26:3:1d0R17oR18R34R20i398R21i396gR22r43gR17oR18R34R20i399R21i386gR22r55goR3jR4:13:3oR6r80R8y1:iR10jR11:1:0R16i-166goR3jR4:5:3jR5:21:0oR3jR4:5:3jR5:0:0oR3jR4:6:2jy15:haxe.macro.Unop:3:0oR3jR4:1:1oR6r70R8y7:QualityR10r89R32ajR33:0:1nhR16i-157gR17oR18R34R20i423R21i416gR22r89gR17oR18R34R20i423R21i415gR22r89goR3jR4:0:1jR26:2:1i1R17oR18R34R20i428R21i424gR22r89gR17oR18R34R20i428R21i415gR22r89goR3jR4:1:1r97R17oR18R34R20i435R21i428gR22r89gR17oR18R34R20i435R21i415gR22jR11:14:2r89jy13:hxsl.SizeDecl:0:1zgoR3jR4:5:3jR5:20:1r93oR3jR4:1:1r79R17oR18R34R20i447R21i444gR22r43goR3jR4:5:3jR5:1:0oR3jR4:8:2oR3jR4:2:1jR23:53:0R17oR18R34R20i457R21i451gR22jR11:13:1aoR1aoR8y5:valueR10jR11:5:2i4r11ghR30r43ghgaoR3jR4:8:2oR3jR4:2:1jR23:33:0R17oR18R34R20i465R21i458gR22jR11:13:1aoR1aoR8y1:_R10jR11:10:0goR8y1:bR10jR11:5:2i2r11ghR30jR11:5:2i4r11ghgaoR3jR4:1:1oR6r70R8y7:textureR10r145R16i-156gR17oR18R34R20i465R21i458gR22r145goR3jR4:5:3r93oR3jR4:1:1r34R17oR18R34R20i478R21i470gR22r35goR3jR4:5:3r123oR3jR4:1:1oR6r70R8y5:pixelR10jR11:5:2i2r11R16i-160gR17oR18R34R20i486R21i481gR22r162goR3jR4:8:2oR3jR4:2:1jR23:36:0R17oR18R34R20i494R21i489gR22jR11:13:1aoR1aoR8R40R10r89ghR30r43ghgaoR3jR4:1:1r88R17oR18R34R20i496R21i495gR22r89ghR17oR18R34R20i497R21i489gR22r43gR17oR18R34R20i497R21i481gR22r162gR17oR18R34R20i497R21i470gR22jR11:5:2i2r11ghR17oR18R34R20i498R21i458gR22r148ghR17oR18R34R20i499R21i451gR22r43goR3jR4:16:2oR3jR4:1:1oR6r70R8y6:valuesR10jR11:14:2r43jR39:1:1r97R16i-159gR17oR18R34R20i508R21i502gR22r194goR3jR4:10:3oR3jR4:5:3jR5:9:0oR3jR4:1:1r88R17oR18R34R20i510R21i509gR22r89goR3jR4:0:1jR26:2:1zR17oR18R34R20i514R21i513gR22r89gR17oR18R34R20i514R21i509gR22r71goR3jR4:6:2r95oR3jR4:1:1r88R17oR18R34R20i519R21i518gR22r89gR17oR18R34R20i519R21i517gR22r89goR3jR4:1:1r88R17oR18R34R20i523R21i522gR22r89gR17oR18R34R20i523R21i509gR22r89gR17oR18R34R20i524R21i502gR22r43gR17oR18R34R20i524R21i451gR22r43gR17oR18R34R20i524R21i444gR22r43gR17oR18R34R20i524R21i405gR22r55goR3jR4:5:3r7oR3jR4:1:1r15R17oR18R34R20i543R21i531gR22r16goR3jR4:8:2oR3jR4:2:1jR23:52:0R17oR18R34R20i550R21i546gR22jR11:13:1aoR1aoR8R40R10r43ghR30jR11:5:2i4r11ghgaoR3jR4:8:2oR3jR4:2:1jR23:21:0R17oR18R34R20i554R21i551gR22jR11:13:1aoR1aoR8R41R10r43goR8R42R10r43ghR30r43ghgaoR3jR4:1:1r79R17oR18R34R20i554R21i551gR22r43goR3jR4:0:1jR26:3:1d0.9999999R17oR18R34R20i568R21i559gR22r43ghR17oR18R34R20i569R21i551gR22r43ghR17oR18R34R20i570R21i546gR22r241gR17oR18R34R20i570R21i531gR22r16ghR17oR18R34R20i577R21i379gR22r55goR3jR4:4:1aoR3jR4:7:2oR6r80R8R15R10jR11:5:2i4r11R16i-167goR3jR4:8:2oR3jR4:2:1r22R17oR18R34R20i606R21i602gR22r26gaoR3jR4:0:1jR26:3:1zR17oR18R34R20i608R21i607gR22r43goR3jR4:0:1jR26:3:1zR17oR18R34R20i611R21i610gR22r43goR3jR4:0:1jR26:3:1zR17oR18R34R20i614R21i613gR22r43goR3jR4:0:1jR26:3:1zR17oR18R34R20i617R21i616gR22r43ghR17oR18R34R20i618R21i602gR22r275gR17oR18R34R20i619R21i590gR22r55goR3jR4:13:3oR6r80R8R36R10r89R16i-168goR3jR4:5:3r91oR3jR4:5:3r93oR3jR4:6:2r95oR3jR4:1:1r97R17oR18R34R20i643R21i636gR22r89gR17oR18R34R20i643R21i635gR22r89goR3jR4:0:1jR26:2:1i1R17oR18R34R20i648R21i644gR22r89gR17oR18R34R20i648R21i635gR22r89goR3jR4:1:1r97R17oR18R34R20i655R21i648gR22r89gR17oR18R34R20i655R21i635gR22jR11:14:2r89jR39:0:1zgoR3jR4:5:3jR5:20:1r93oR3jR4:1:1r274R17oR18R34R20i669R21i664gR22r275goR3jR4:5:3r123oR3jR4:8:2oR3jR4:2:1r138R17oR18R34R20i680R21i673gR22jR11:13:1aoR1aoR8R41R10r145gr146hR30r148ghgaoR3jR4:1:1r152R17oR18R34R20i680R21i673gR22r145goR3jR4:5:3r93oR3jR4:1:1r34R17oR18R34R20i693R21i685gR22r35goR3jR4:5:3r123oR3jR4:1:1r161R17oR18R34R20i701R21i696gR22r162goR3jR4:8:2oR3jR4:2:1r167R17oR18R34R20i709R21i704gR22jR11:13:1ar171hgaoR3jR4:1:1r302R17oR18R34R20i711R21i710gR22r89ghR17oR18R34R20i712R21i704gR22r43gR17oR18R34R20i712R21i696gR22r162gR17oR18R34R20i712R21i685gR22jR11:5:2i2r11ghR17oR18R34R20i713R21i673gR22r148goR3jR4:16:2oR3jR4:1:1r192R17oR18R34R20i722R21i716gR22r194goR3jR4:10:3oR3jR4:5:3r199oR3jR4:1:1r302R17oR18R34R20i724R21i723gR22r89goR3jR4:0:1jR26:2:1zR17oR18R34R20i728R21i727gR22r89gR17oR18R34R20i728R21i723gR22r71goR3jR4:6:2r95oR3jR4:1:1r302R17oR18R34R20i733R21i732gR22r89gR17oR18R34R20i733R21i731gR22r89goR3jR4:1:1r302R17oR18R34R20i737R21i736gR22r89gR17oR18R34R20i737R21i723gR22r89gR17oR18R34R20i738R21i716gR22r43gR17oR18R34R20i738R21i673gR22r148gR17oR18R34R20i738R21i664gR22r275gR17oR18R34R20i738R21i625gR22r55goR3jR4:5:3r7oR3jR4:1:1r15R17oR18R34R20i757R21i745gR22r16goR3jR4:1:1r274R17oR18R34R20i765R21i760gR22r275gR17oR18R34R20i765R21i745gR22r16ghR17oR18R34R20i772R21i583gR22r55gR17oR18R34R20i772R21i365gR22r55goR3jR4:10:3oR3jR4:1:1oR6r70R8y13:hasFixedColorR10r71R32ajR33:0:1nhR16i-161gR17oR18R34R20i794R21i781gR22r71goR3jR4:4:1aoR3jR4:5:3r7oR3jR4:9:2oR3jR4:1:1r15R17oR18R34R20i816R21i804gR22r16gajy14:hxsl.Component:0:0jR47:1:0jR47:2:0hR17oR18R34R20i820R21i804gR22jR11:5:2i3r11goR3jR4:9:2oR3jR4:1:1oR6r70R8y10:fixedColorR10jR11:5:2i4r11R16i-162gR17oR18R34R20i833R21i823gR22r441gar432r433r434hR17oR18R34R20i837R21i823gR22jR11:5:2i3r11gR17oR18R34R20i837R21i804gR22r437goR3jR4:5:3jR5:20:1r123oR3jR4:9:2oR3jR4:1:1r15R17oR18R34R20i856R21i844gR22r16gajR47:3:0hR17oR18R34R20i858R21i844gR22r43goR3jR4:9:2oR3jR4:1:1r440R17oR18R34R20i872R21i862gR22r441gar457hR17oR18R34R20i874R21i862gR22r43gR17oR18R34R20i874R21i844gR22r43ghR17oR18R34R20i881R21i797gR22r55gnR17oR18R34R20i881R21i777gR22r55ghR17oR18R34R20i886R21i359gR22r55gR6jR27:1:0R28oR6r58R8y8:fragmentR10jR11:13:1aoR1ahR30r55ghR16i-164gR30r55ghR8y15:h3d.shader.Blury4:varsar57r97r161r419r440r192r476r152r69r13r32hg";
h3d.shader.ColorAdd.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:20:1jR5:0:0oR3jR4:9:2oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:4:0y4:namey10:pixelColory4:typejy9:hxsl.Type:5:2i4jy12:hxsl.VecType:1:0y2:idi-169gy1:poy4:filey74:C%3A%5CHaxeToolkit%5Chaxe%5Clib%5Cheaps%2Fgit%2Fh3d%2Fshader%2FColorAdd.hxy3:maxi180y3:mini170gy1:tr14gajy14:hxsl.Component:0:0jR20:1:0jR20:2:0hR14oR15R16R17i184R18i170gR19jR11:5:2i3r13goR3jR4:1:1oR6jR7:2:0R8y5:colorR10jR11:5:2i3r13R13i-170gR14oR15R16R17i193R18i188gR19r27gR14oR15R16R17i193R18i170gR19r23ghR14oR15R16R17i199R18i164gR19jR11:0:0gR6jy17:hxsl.FunctionKind:1:0y3:refoR6jR7:6:0R8y8:fragmentR10jR11:13:1aoR1ahy3:retr34ghR13i-171gR25r34ghR8y19:h3d.shader.ColorAddy4:varsar36r25r11hg";
h3d.shader.ColorKey.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:7:2oy4:kindjy12:hxsl.VarKind:4:0y4:namey5:cdiffy4:typejy9:hxsl.Type:5:2i4jy12:hxsl.VecType:1:0y2:idi-175goR3jR4:5:3jy16:haxe.macro.Binop:3:0oR3jR4:1:1oR5r8R7y12:textureColorR9jR10:5:2i4r9R12i-173gy1:poy4:filey74:C%3A%5CHaxeToolkit%5Chaxe%5Clib%5Cheaps%2Fgit%2Fh3d%2Fshader%2FColorKey.hxy3:maxi197y3:mini185gy1:tr15goR3jR4:1:1oR5jR6:2:0R7y8:colorKeyR9jR10:5:2i4r9R12i-172gR15oR16R17R18i208R19i200gR20r21gR15oR16R17R18i208R19i185gR20r10gR15oR16R17R18i209R19i173gR20jR10:0:0goR3jR4:10:3oR3jR4:5:3jR13:9:0oR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:29:0R15oR16R17R18i223R19i218gR20jR10:13:1aoR1aoR7y1:_R9r10goR7y1:bR9jR10:5:2i4r9ghy3:retjR10:3:0ghgaoR3jR4:1:1r7R15oR16R17R18i223R19i218gR20r10goR3jR4:1:1r7R15oR16R17R18i233R19i228gR20r10ghR15oR16R17R18i234R19i218gR20r43goR3jR4:0:1jy10:hxsl.Const:3:1d1e-005R15oR16R17R18i244R19i237gR20r43gR15oR16R17R18i244R19i218gR20jR10:2:0goR3jR4:11:0R15oR16R17R18i254R19i247gR20r28gnR15oR16R17R18i254R19i214gR20r28ghR15oR16R17R18i260R19i167gR20r28gR5jy17:hxsl.FunctionKind:1:0y3:refoR5jR6:6:0R7y8:fragmentR9jR10:13:1aoR1ahR25r28ghR12i-174gR25r28ghR7y19:h3d.shader.ColorKeyy4:varsar69r19r14hg";
h3d.shader.ColorMatrix.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:20:1jR5:1:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:4:0y4:namey10:pixelColory4:typejy9:hxsl.Type:5:2i4jy12:hxsl.VecType:1:0y2:idi-176gy1:poy4:filey77:C%3A%5CHaxeToolkit%5Chaxe%5Clib%5Cheaps%2Fgit%2Fh3d%2Fshader%2FColorMatrix.hxy3:maxi184y3:mini174gy1:tr13goR3jR4:1:1oR6jR7:2:0R8y6:matrixR10jR11:7:0R13i-177gR14oR15R16R17i194R18i188gR19r19gR14oR15R16R17i194R18i174gR19r13ghR14oR15R16R17i200R18i168gR19jR11:0:0gR6jy17:hxsl.FunctionKind:1:0y3:refoR6jR7:6:0R8y8:fragmentR10jR11:13:1aoR1ahy3:retr26ghR13i-178gR24r26ghR8y22:h3d.shader.ColorMatrixy4:varsar28r17r10hg";
h3d.shader.Shadow.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:3:0y4:namey9:shadowPosy4:typejy9:hxsl.Type:5:2i3jy12:hxsl.VecType:1:0y10:qualifiersajy17:hxsl.VarQualifier:1:0hy2:idi-128gy1:poy4:filey72:C%3A%5CHaxeToolkit%5Chaxe%5Clib%5Cheaps%2Fgit%2Fh3d%2Fshader%2FShadow.hxy3:maxi341y3:mini332gy1:tr12goR3jR4:5:3jR5:0:0oR3jR4:5:3jR5:1:0oR3jR4:5:3r20oR3jR4:1:1oR6jR7:4:0R8y19:transformedPositionR10jR11:5:2i3r11R15i-127gR16oR17R18R19i363R20i344gR21r25goR3jR4:1:1oR6jR7:0:0R8y4:projR10jR11:8:0y6:parentoR6r30R8y6:shadowR10jR11:12:1aoR6r30R8y3:mapR10jR11:10:0R24r32R15i-121gr29oR6r30R8y5:colorR10jR11:5:2i3r11R24r32R15i-123goR6r30R8y5:powerR10jR11:3:0R24r32R15i-124goR6r30R8y4:biasR10r39R24r32R15i-125ghR15i-120gR15i-122gR16oR17R18R19i377R20i366gR21r31gR16oR17R18R19i377R20i344gR21jR11:5:2i3r11goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:39:0R16oR17R18R19i384R20i380gR21jR11:13:1ahgaoR3jR4:0:1jy10:hxsl.Const:3:1d0.5R16oR17R18R19i388R20i385gR21r39goR3jR4:0:1jR31:3:1d-0.5R16oR17R18R19i394R20i390gR21r39goR3jR4:0:1jR31:3:1i1R16oR17R18R19i397R20i396gR21r39ghR16oR17R18R19i398R20i380gR21jR11:5:2i3r11gR16oR17R18R19i398R20i344gR21jR11:5:2i3r11goR3jR4:8:2oR3jR4:2:1r49R16oR17R18R19i405R20i401gR21r53gaoR3jR4:0:1jR31:3:1d0.5R16oR17R18R19i409R20i406gR21r39goR3jR4:0:1jR31:3:1d0.5R16oR17R18R19i414R20i411gR21r39goR3jR4:0:1jR31:3:1zR16oR17R18R19i417R20i416gR21r39ghR16oR17R18R19i418R20i401gR21jR11:5:2i3r11gR16oR17R18R19i418R20i344gR21jR11:5:2i3r11gR16oR17R18R19i418R20i332gR21r12ghR16oR17R18R19i424R20i326gR21jR11:0:0gR6jy17:hxsl.FunctionKind:0:0y3:refoR6jR7:6:0R8y6:vertexR10jR11:13:1aoR1ahy3:retr100ghR15i-129gR35r100goR1ahR2oR3jR4:4:1aoR3jR4:7:2oR6r24R8y5:depthR10r39R15i-131goR3jR4:8:2oR3jR4:2:1jR30:53:0R16oR17R18R19i474R20i468gR21jR11:13:1aoR1aoR8y5:valueR10jR11:5:2i4r11ghR35r39ghgaoR3jR4:8:2oR3jR4:2:1jR30:33:0R16oR17R18R19i485R20i475gR21jR11:13:1aoR1aoR8y1:_R10r35goR8y1:bR10jR11:5:2i2r11ghR35jR11:5:2i4r11ghgaoR3jR4:1:1r34R16oR17R18R19i485R20i475gR21r35goR3jR4:9:2oR3jR4:1:1r9R16oR17R18R19i499R20i490gR21r12gajy14:hxsl.Component:0:0jR40:1:0hR16oR17R18R19i502R20i490gR21jR11:5:2i2r11ghR16oR17R18R19i503R20i475gR21r137ghR16oR17R18R19i504R20i468gR21r39gR16oR17R18R19i505R20i456gR21r100goR3jR4:7:2oR6r24R8y4:zMaxR10r39R15i-132goR3jR4:8:2oR3jR4:2:1jR30:51:0R16oR17R18R19i697R20i686gR21jR11:13:1aoR1aoR8R38R10r39ghR35r39ghgaoR3jR4:9:2oR3jR4:1:1r9R16oR17R18R19i695R20i686gR21r12gajR40:2:0hR16oR17R18R19i697R20i686gR21r39ghR16oR17R18R19i708R20i686gR21r39gR16oR17R18R19i709R20i675gR21r100goR3jR4:7:2oR6r24R8y5:deltaR10r39R15i-133goR3jR4:5:3jR5:3:0oR3jR4:8:2oR3jR4:2:1jR30:21:0R16oR17R18R19i747R20i726gR21jR11:13:1aoR1aoR8R38R10r39goR8R39R10r39ghR35r39ghgaoR3jR4:3:1oR3jR4:5:3r18oR3jR4:1:1r113R16oR17R18R19i732R20i727gR21r39goR3jR4:1:1r40R16oR17R18R19i746R20i735gR21r39gR16oR17R18R19i746R20i727gR21r39gR16oR17R18R19i747R20i726gR21r39goR3jR4:1:1r160R16oR17R18R19i756R20i752gR21r39ghR16oR17R18R19i757R20i726gR21r39goR3jR4:1:1r160R16oR17R18R19i764R20i760gR21r39gR16oR17R18R19i764R20i726gR21r39gR16oR17R18R19i765R20i714gR21r100goR3jR4:7:2oR6r24R8y5:shadeR10r39R15i-134goR3jR4:8:2oR3jR4:2:1r163R16oR17R18R19i810R20i782gR21jR11:13:1aoR1aoR8R38R10r39ghR35r39ghgaoR3jR4:8:2oR3jR4:2:1jR30:9:0R16oR17R18R19i785R20i782gR21jR11:13:1aoR1aoR8R37R10r39ghR35r39ghgaoR3jR4:5:3r20oR3jR4:1:1r38R16oR17R18R19i799R20i787gR21r39goR3jR4:1:1r185R16oR17R18R19i807R20i802gR21r39gR16oR17R18R19i807R20i787gR21r39ghR16oR17R18R19i810R20i782gR21r39ghR16oR17R18R19i821R20i782gR21r39gR16oR17R18R19i822R20i770gR21r100goR3jR4:5:3jR5:20:1r20oR3jR4:9:2oR3jR4:1:1oR6r24R8y10:pixelColorR10jR11:5:2i4r11R15i-126gR16oR17R18R19i837R20i827gR21r267gar148r149r177hR16oR17R18R19i841R20i827gR21jR11:5:2i3r11goR3jR4:5:3r18oR3jR4:5:3r20oR3jR4:3:1oR3jR4:5:3r187oR3jR4:0:1jR31:3:1i1R16oR17R18R19i847R20i846gR21r39goR3jR4:1:1r225R16oR17R18R19i855R20i850gR21r39gR16oR17R18R19i855R20i846gR21r39gR16oR17R18R19i856R20i845gR21r39goR3jR4:9:2oR3jR4:1:1r36R16oR17R18R19i871R20i859gR21r37gar148r149r177hR16oR17R18R19i875R20i859gR21jR11:5:2i3r11gR16oR17R18R19i875R20i845gR21r296goR3jR4:1:1r225R16oR17R18R19i883R20i878gR21r39gR16oR17R18R19i883R20i845gR21r296gR16oR17R18R19i883R20i827gR21r273ghR16oR17R18R19i889R20i450gR21r100gR6jR32:1:0R33oR6r103R8y8:fragmentR10jR11:13:1aoR1ahR35r100ghR15i-130gR35r100ghR8y17:h3d.shader.Shadowy4:varsar102r309r32r9r23r266hg";
h3d.shader.Skin.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:4:0y4:namey19:transformedPositiony4:typejy9:hxsl.Type:5:2i3jy12:hxsl.VecType:1:0y2:idi-40gy1:poy4:filey70:C%3A%5CHaxeToolkit%5Chaxe%5Clib%5Cheaps%2Fgit%2Fh3d%2Fshader%2FSkin.hxy3:maxi413y3:mini394gy1:tr12goR3jR4:5:3jR5:0:0oR3jR4:5:3r16oR3jR4:5:3jR5:1:0oR3jR4:3:1oR3jR4:5:3r19oR3jR4:1:1oR6jR7:1:0R8y8:positionR10jR11:5:2i3r11y6:parentoR6r24R8y5:inputR10jR11:12:1ar23oR6r24R8y6:normalR10jR11:5:2i3r11R21r26R13i-37goR6r24R8y7:weightsR10jR11:5:2i3r11R21r26R13i-38goR6r24R8y7:indexesR10jR11:9:1i4R21r26R13i-39ghR13i-35gR13i-36gR14oR15R16R17i436R18i422gR19r25goR3jR4:16:2oR3jR4:1:1oR6jR7:2:0R8y13:bonesMatrixesR10jR11:14:2jR11:8:0jy13:hxsl.SizeDecl:1:1oR6r40R8y8:MaxBonesR10jR11:1:0y10:qualifiersajy17:hxsl.VarQualifier:0:1nhR13i-42gR13i-43gR14oR15R16R17i452R18i439gR19r47goR3jR4:9:2oR3jR4:1:1r32R14oR15R16R17i466R18i453gR19r33gajy14:hxsl.Component:0:0hR14oR15R16R17i468R18i453gR19r43gR14oR15R16R17i469R18i439gR19r41gR14oR15R16R17i469R18i422gR19jR11:5:2i3r11gR14oR15R16R17i470R18i421gR19r62goR3jR4:9:2oR3jR4:1:1r30R14oR15R16R17i486R18i473gR19r31gar55hR14oR15R16R17i488R18i473gR19jR11:3:0gR14oR15R16R17i488R18i421gR19r62goR3jR4:5:3r19oR3jR4:3:1oR3jR4:5:3r19oR3jR4:1:1r23R14oR15R16R17i511R18i497gR19r25goR3jR4:16:2oR3jR4:1:1r39R14oR15R16R17i527R18i514gR19r47goR3jR4:9:2oR3jR4:1:1r32R14oR15R16R17i541R18i528gR19r33gajR31:1:0hR14oR15R16R17i543R18i528gR19r43gR14oR15R16R17i544R18i514gR19r41gR14oR15R16R17i544R18i497gR19r62gR14oR15R16R17i545R18i496gR19r62goR3jR4:9:2oR3jR4:1:1r30R14oR15R16R17i561R18i548gR19r31gar90hR14oR15R16R17i563R18i548gR19r72gR14oR15R16R17i563R18i496gR19r62gR14oR15R16R17i563R18i421gR19jR11:5:2i3r11goR3jR4:5:3r19oR3jR4:3:1oR3jR4:5:3r19oR3jR4:1:1r23R14oR15R16R17i586R18i572gR19r25goR3jR4:16:2oR3jR4:1:1r39R14oR15R16R17i602R18i589gR19r47goR3jR4:9:2oR3jR4:1:1r32R14oR15R16R17i616R18i603gR19r33gajR31:2:0hR14oR15R16R17i618R18i603gR19r43gR14oR15R16R17i619R18i589gR19r41gR14oR15R16R17i619R18i572gR19r62gR14oR15R16R17i620R18i571gR19r62goR3jR4:9:2oR3jR4:1:1r30R14oR15R16R17i636R18i623gR19r31gar126hR14oR15R16R17i638R18i623gR19r72gR14oR15R16R17i638R18i571gR19r62gR14oR15R16R17i638R18i421gR19jR11:5:2i3r11gR14oR15R16R17i638R18i394gR19r12goR3jR4:5:3r7oR3jR4:1:1oR6r10R8y17:transformedNormalR10jR11:5:2i3r11R13i-41gR14oR15R16R17i661R18i644gR19r152goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:31:0R14oR15R16R17i673R18i664gR19jR11:13:1aoR1aoR8y5:valueR10r62ghy3:retr62ghgaoR3jR4:5:3r16oR3jR4:5:3r16oR3jR4:5:3r19oR3jR4:3:1oR3jR4:5:3r19oR3jR4:1:1r28R14oR15R16R17i693R18i681gR19r29goR3jR4:8:2oR3jR4:2:1jR33:48:0R14oR15R16R17i700R18i696gR19jR11:13:1ahgaoR3jR4:16:2oR3jR4:1:1r39R14oR15R16R17i714R18i701gR19r47goR3jR4:9:2oR3jR4:1:1r32R14oR15R16R17i728R18i715gR19r33gar55hR14oR15R16R17i730R18i715gR19r43gR14oR15R16R17i731R18i701gR19r41ghR14oR15R16R17i732R18i696gR19jR11:6:0gR14oR15R16R17i732R18i681gR19r62gR14oR15R16R17i733R18i680gR19r62goR3jR4:9:2oR3jR4:1:1r30R14oR15R16R17i749R18i736gR19r31gar55hR14oR15R16R17i751R18i736gR19r72gR14oR15R16R17i751R18i680gR19r62goR3jR4:5:3r19oR3jR4:3:1oR3jR4:5:3r19oR3jR4:1:1r28R14oR15R16R17i772R18i760gR19r29goR3jR4:8:2oR3jR4:2:1r176R14oR15R16R17i779R18i775gR19r180gaoR3jR4:16:2oR3jR4:1:1r39R14oR15R16R17i793R18i780gR19r47goR3jR4:9:2oR3jR4:1:1r32R14oR15R16R17i807R18i794gR19r33gar90hR14oR15R16R17i809R18i794gR19r43gR14oR15R16R17i810R18i780gR19r41ghR14oR15R16R17i811R18i775gR19r197gR14oR15R16R17i811R18i760gR19r62gR14oR15R16R17i812R18i759gR19r62goR3jR4:9:2oR3jR4:1:1r30R14oR15R16R17i828R18i815gR19r31gar90hR14oR15R16R17i830R18i815gR19r72gR14oR15R16R17i830R18i759gR19r62gR14oR15R16R17i830R18i680gR19jR11:5:2i3r11goR3jR4:5:3r19oR3jR4:3:1oR3jR4:5:3r19oR3jR4:1:1r28R14oR15R16R17i851R18i839gR19r29goR3jR4:8:2oR3jR4:2:1r176R14oR15R16R17i858R18i854gR19r180gaoR3jR4:16:2oR3jR4:1:1r39R14oR15R16R17i872R18i859gR19r47goR3jR4:9:2oR3jR4:1:1r32R14oR15R16R17i886R18i873gR19r33gar126hR14oR15R16R17i888R18i873gR19r43gR14oR15R16R17i889R18i859gR19r41ghR14oR15R16R17i890R18i854gR19r197gR14oR15R16R17i890R18i839gR19r62gR14oR15R16R17i891R18i838gR19r62goR3jR4:9:2oR3jR4:1:1r30R14oR15R16R17i907R18i894gR19r31gar126hR14oR15R16R17i909R18i894gR19r72gR14oR15R16R17i909R18i838gR19r62gR14oR15R16R17i909R18i680gR19jR11:5:2i3r11ghR14oR15R16R17i910R18i664gR19r62gR14oR15R16R17i910R18i644gR19r152ghR14oR15R16R17i916R18i388gR19jR11:0:0gR6jy17:hxsl.FunctionKind:0:0y3:refoR6jR7:6:0R8y6:vertexR10jR11:13:1aoR1ahR35r301ghR13i-44gR35r301ghR8y15:h3d.shader.Skiny4:varsar303r151r39r26r9r42hg";
h3d.shader.Texture.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:4:0y4:namey12:calculatedUVy4:typejy9:hxsl.Type:5:2i2jy12:hxsl.VecType:1:0y2:idi-63gy1:poy4:filey73:C%3A%5CHaxeToolkit%5Chaxe%5Clib%5Cheaps%2Fgit%2Fh3d%2Fshader%2FTexture.hxy3:maxi370y3:mini358gy1:tr12goR3jR4:1:1oR6jR7:1:0R8y2:uvR10jR11:5:2i2r11y6:parentoR6r17R8y5:inputR10jR11:12:1ar16hR13i-57gR13i-58gR14oR15R16R17i381R18i373gR19r18gR14oR15R16R17i381R18i358gR19r12ghR14oR15R16R17i387R18i352gR19jR11:0:0gR6jy17:hxsl.FunctionKind:0:0y3:refoR6jR7:6:0R8y6:vertexR10jR11:13:1aoR1ahy3:retr28ghR13i-65gR26r28goR1ahR2oR3jR4:4:1aoR3jR4:7:2oR6r10R8y1:cR10jR11:5:2i4r11R13i-67goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:33:0R14oR15R16R17i434R18i427gR19jR11:13:1aoR1aoR8y1:_R10jR11:10:0goR8y1:bR10jR11:5:2i2r11ghR26r42ghgaoR3jR4:1:1oR6jR7:2:0R8y7:textureR10r52R13i-62gR14oR15R16R17i434R18i427gR19r52goR3jR4:1:1r9R14oR15R16R17i451R18i439gR19r12ghR14oR15R16R17i452R18i427gR19r42gR14oR15R16R17i453R18i419gR19r28goR3jR4:10:3oR3jR4:5:3jR5:14:0oR3jR4:1:1oR6r59R8y9:killAlphaR10jR11:2:0y10:qualifiersajy17:hxsl.VarQualifier:0:1nhR13i-60gR14oR15R16R17i471R18i462gR19r74goR3jR4:5:3jR5:9:0oR3jR4:5:3jR5:3:0oR3jR4:9:2oR3jR4:1:1r41R14oR15R16R17i476R18i475gR19r42gajy14:hxsl.Component:3:0hR14oR15R16R17i478R18i475gR19jR11:3:0goR3jR4:1:1oR6r59R8y18:killAlphaThresholdR10r91R13i-61gR14oR15R16R17i499R18i481gR19r91gR14oR15R16R17i499R18i475gR19r91goR3jR4:0:1jy10:hxsl.Const:3:1zR14oR15R16R17i503R18i502gR19r91gR14oR15R16R17i503R18i475gR19r74gR14oR15R16R17i503R18i462gR19r74goR3jR4:11:0R14oR15R16R17i513R18i506gR19r28gnR14oR15R16R17i513R18i458gR19r28goR3jR4:10:3oR3jR4:1:1oR6r59R8y8:additiveR10r74R33ajR34:0:1nhR13i-59gR14oR15R16R17i531R18i523gR19r74goR3jR4:5:3jR5:20:1jR5:0:0oR3jR4:1:1oR6r10R8y10:pixelColorR10jR11:5:2i4r11R13i-64gR14oR15R16R17i549R18i539gR19r123goR3jR4:1:1r41R14oR15R16R17i554R18i553gR19r42gR14oR15R16R17i554R18i539gR19r123goR3jR4:5:3jR5:20:1jR5:1:0oR3jR4:1:1r122R14oR15R16R17i580R18i570gR19r123goR3jR4:1:1r41R14oR15R16R17i585R18i584gR19r42gR14oR15R16R17i585R18i570gR19r123gR14oR15R16R17i585R18i519gR19r28ghR14oR15R16R17i591R18i413gR19r28gR6jR23:1:0R24oR6r31R8y8:fragmentR10jR11:13:1aoR1ahR26r28ghR13i-66gR26r28ghR8y18:h3d.shader.Texturey4:varsar9r30r147r113r58r93r19r73r122hg";
h3d.shader.UVScroll.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:20:1jR5:0:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:4:0y4:namey12:calculatedUVy4:typejy9:hxsl.Type:5:2i2jy12:hxsl.VecType:1:0y2:idi-106gy1:poy4:filey74:C%3A%5CHaxeToolkit%5Chaxe%5Clib%5Cheaps%2Fgit%2Fh3d%2Fshader%2FUVScroll.hxy3:maxi180y3:mini168gy1:tr13goR3jR4:1:1oR6jR7:2:0R8y7:uvDeltaR10jR11:5:2i2r12R13i-105gR14oR15R16R17i191R18i184gR19r19gR14oR15R16R17i191R18i168gR19r13ghR14oR15R16R17i197R18i162gR19jR11:0:0gR6jy17:hxsl.FunctionKind:0:0y3:refoR6jR7:6:0R8y6:vertexR10jR11:13:1aoR1ahy3:retr26ghR13i-107gR24r26ghR8y19:h3d.shader.UVScrolly4:varsar10r28r17hg";
h3d.shader.VertexColor.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:10:3oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:2:0y4:namey8:additivey4:typejy9:hxsl.Type:2:0y10:qualifiersajy17:hxsl.VarQualifier:0:1nhy2:idi-103gy1:poy4:filey77:C%3A%5CHaxeToolkit%5Chaxe%5Clib%5Cheaps%2Fgit%2Fh3d%2Fshader%2FVertexColor.hxy3:maxi240y3:mini232gy1:tr10goR3jR4:5:3jy16:haxe.macro.Binop:20:1jR20:0:0oR3jR4:9:2oR3jR4:1:1oR5jR6:4:0R7y10:pixelColorR9jR10:5:2i4jy12:hxsl.VecType:1:0R13i-102gR14oR15R16R17i258R18i248gR19r23gajy14:hxsl.Component:0:0jR23:1:0jR23:2:0hR14oR15R16R17i262R18i248gR19jR10:5:2i3r22goR3jR4:1:1oR5jR6:1:0R7y5:colorR9jR10:5:2i3r22y6:parentoR5r35R7y5:inputR9jR10:12:1ar34hR13i-100gR13i-101gR14oR15R16R17i277R18i266gR19r36gR14oR15R16R17i277R18i248gR19r32goR3jR4:5:3jR20:20:1jR20:1:0oR3jR4:9:2oR3jR4:1:1r20R14oR15R16R17i303R18i293gR19r23gar27r28r29hR14oR15R16R17i307R18i293gR19jR10:5:2i3r22goR3jR4:1:1r34R14oR15R16R17i322R18i311gR19r36gR14oR15R16R17i322R18i293gR19r54gR14oR15R16R17i322R18i228gR19jR10:0:0ghR14oR15R16R17i328R18i222gR19r62gR5jy17:hxsl.FunctionKind:1:0y3:refoR5jR6:6:0R7y8:fragmentR9jR10:13:1aoR1ahy3:retr62ghR13i-104gR30r62ghR7y22:h3d.shader.VertexColory4:varsar66r8r37r20hg";
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.crypto.Base64.CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
haxe.crypto.Base64.BYTES = haxe.io.Bytes.ofString(haxe.crypto.Base64.CHARS);
haxe.ds.ObjectMap.count = 0;
hxd.Key.initDone = false;
hxd.Key.keyPressed = [];
hxd.System.LOOP_INIT = false;
hxd.System.setCursor = hxd.System.setNativeCursor;
hxd.impl.Memory.stack = new Array();
hxd.impl.Memory.inst = new hxd.impl.MemoryReader();
hxd.impl.Tmp.bytes = new Array();
hxd.res.Resource.LIVE_UPDATE = true;
hxd.res.EmbedFileSystem.invalidChars = new EReg("[^A-Za-z0-9_]","g");
hxd.res.Image.ALLOW_NPOT = false;
hxd.res.Image.DEFAULT_FILTER = h3d.mat.Filter.Linear;
hxsl.Tools.UID = 0;
hxsl.Tools.SWIZ = Type.allEnums(hxsl.Component);
hxsl.GlslOut.KWD_LIST = ["input","output","discard","dvec2","dvec3","dvec4"];
hxsl.GlslOut.KWDS = (function($this) {
	var $r;
	var _g = new haxe.ds.StringMap();
	{
		var _g1 = 0;
		var _g2 = hxsl.GlslOut.KWD_LIST;
		while(_g1 < _g2.length) {
			var k = _g2[_g1];
			++_g1;
			_g.set(k,true);
		}
	}
	$r = _g;
	return $r;
}(this));
hxsl.GlslOut.GLOBALS = (function($this) {
	var $r;
	var m = new haxe.ds.EnumValueMap();
	{
		var _g = 0;
		var _g1 = Type.allEnums(hxsl.TGlobal);
		while(_g < _g1.length) {
			var g = _g1[_g];
			++_g;
			var n = "" + Std.string(g);
			n = n.charAt(0).toLowerCase() + HxOverrides.substr(n,1,null);
			m.set(g,n);
		}
	}
	m.set(hxsl.TGlobal.ToInt,"int");
	m.set(hxsl.TGlobal.ToFloat,"float");
	m.set(hxsl.TGlobal.ToBool,"bool");
	m.set(hxsl.TGlobal.Texture2D,"_texture2D");
	var $it0 = m.iterator();
	while( $it0.hasNext() ) {
		var g1 = $it0.next();
		hxsl.GlslOut.KWDS.set(g1,true);
	}
	$r = m;
	return $r;
}(this));
hxsl.GlslOut.MAT34 = "struct mat3x4 { vec4 a; vec4 b; vec4 c; };";
hxsl.RuntimeShader.UID = 0;
ld31.gameplay.PolyominoControl.POLYOMINOS = [[[1]],[[1,1]],[[1],[1]],[[1,1],[1,0]],[[1,1],[0,1]],[[0,1],[1,1]],[[1,1,1]],[[1],[1],[1]]];
ld31.graphic.GhostShader.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:4:0y4:namey10:pixelColory4:typejy9:hxsl.Type:5:2i4jy12:hxsl.VecType:1:0y2:idi-112gy1:poy4:filey37:src%2Fld31%2Fgraphic%2FGhostShader.hxy3:maxi1406y3:mini1396gy1:tr12goR3jR4:1:1oR6jR7:2:0R8y5:colorR10jR11:5:2i4r11R13i-114gR14oR15R16R17i1414R18i1409gR19r18gR14oR15R16R17i1414R18i1396gR19r12goR3jR4:5:3r7oR3jR4:1:1oR6r10R8y5:whiteR10jR11:5:2i4r11R13i-113gR14oR15R16R17i1425R18i1420gR19r26goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:40:0R14oR15R16R17i1432R18i1428gR19jR11:13:1ahgaoR3jR4:0:1jy10:hxsl.Const:3:1d1R14oR15R16R17i1436R18i1433gR19jR11:3:0goR3jR4:0:1jR23:3:1d1R14oR15R16R17i1441R18i1438gR19r41goR3jR4:0:1jR23:3:1d1R14oR15R16R17i1446R18i1443gR19r41goR3jR4:0:1jR23:3:1d1R14oR15R16R17i1451R18i1448gR19r41ghR14oR15R16R17i1452R18i1428gR19jR11:5:2i4r11gR14oR15R16R17i1452R18i1420gR19r26ghR14oR15R16R17i1515R18i1055gR19jR11:0:0gR6jy17:hxsl.FunctionKind:2:0y3:refoR6jR7:6:0R8y8:__init__R10jR11:13:1aoR1ahy3:retr61ghR13i-115gR27r61goR1ahR2oR3jR4:4:1aoR3jR4:7:2oR6r10R8R18R10r41R13i-117goR3jR4:0:1jR23:3:1d0.35R14oR15R16R17i1782R18i1778gR19r41gR14oR15R16R17i1783R18i1768gR19r61goR3jR4:7:2oR6r10R8R17R10r41R13i-118goR3jR4:0:1jR23:3:1d0.65R14oR15R16R17i1802R18i1798gR19r41gR14oR15R16R17i1803R18i1788gR19r61goR3jR4:7:2oR6r10R8y1:fR10r41R13i-119goR3jR4:5:3jR5:0:0oR3jR4:5:3jR5:1:0oR3jR4:8:2oR3jR4:2:1jR22:2:0R14oR15R16R17i1824R18i1821gR19jR11:13:1aoR1aoR8y5:valueR10r41ghR27r41ghgaoR3jR4:5:3r94oR3jR4:1:1oR6jR7:0:0R8y4:timeR10r41y6:parentoR6r109R8y6:globalR10jR11:12:1ar108hR13i-108gR13i-109gR14oR15R16R17i1836R18i1825gR19r41goR3jR4:0:1jR23:3:1i7R14oR15R16R17i1840R18i1839gR19r41gR14oR15R16R17i1840R18i1825gR19r41ghR14oR15R16R17i1841R18i1821gR19r41goR3jR4:0:1jR23:3:1d0.5R14oR15R16R17i1847R18i1844gR19r41gR14oR15R16R17i1847R18i1821gR19r41goR3jR4:0:1jR23:3:1d0.5R14oR15R16R17i1853R18i1850gR19r41gR14oR15R16R17i1853R18i1821gR19r41gR14oR15R16R17i1854R18i1813gR19r61goR3jR4:5:3r7oR3jR4:1:1r90R14oR15R16R17i1860R18i1859gR19r41goR3jR4:5:3r92oR3jR4:5:3r94oR3jR4:1:1r90R14oR15R16R17i1864R18i1863gR19r41goR3jR4:3:1oR3jR4:5:3jR5:3:0oR3jR4:1:1r82R14oR15R16R17i1871R18i1868gR19r41goR3jR4:1:1r74R14oR15R16R17i1877R18i1874gR19r41gR14oR15R16R17i1877R18i1868gR19r41gR14oR15R16R17i1878R18i1867gR19r41gR14oR15R16R17i1878R18i1863gR19r41goR3jR4:1:1r74R14oR15R16R17i1884R18i1881gR19r41gR14oR15R16R17i1884R18i1863gR19r41gR14oR15R16R17i1884R18i1859gR19r41goR3jR4:5:3r7oR3jR4:1:1oR6jR7:5:0R8R20R10jR11:5:2i4r11R31oR6r171R8y6:outputR10jR11:12:1ar170hR13i-110gR13i-111gR14oR15R16R17i1907R18i1895gR19r172goR3jR4:5:3r92oR3jR4:5:3r94oR3jR4:1:1r9R14oR15R16R17i1920R18i1910gR19r12goR3jR4:1:1r90R14oR15R16R17i1924R18i1923gR19r41gR14oR15R16R17i1924R18i1910gR19r12goR3jR4:5:3r94oR3jR4:1:1r25R14oR15R16R17i1932R18i1927gR19r26goR3jR4:3:1oR3jR4:5:3r148oR3jR4:0:1jR23:3:1i1R14oR15R16R17i1937R18i1936gR19r41goR3jR4:1:1r90R14oR15R16R17i1939R18i1938gR19r41gR14oR15R16R17i1939R18i1936gR19r41gR14oR15R16R17i1940R18i1935gR19r41gR14oR15R16R17i1940R18i1927gR19r26gR14oR15R16R17i1940R18i1910gR19jR11:5:2i4r11gR14oR15R16R17i1940R18i1895gR19r172ghR14oR15R16R17i2069R18i1715gR19r61gR6jR24:1:0R25oR6r64R8y8:fragmentR10jR11:13:1aoR1ahR27r61ghR13i-116gR27r61ghR8y24:ld31.graphic.GhostShadery4:varsar63r215r173r110r16r9r25hg";
ld31.graphic.OutShader.SRC = "oy4:funsaoy4:argsahy4:exproy1:ejy13:hxsl.TExprDef:4:1aoR3jR4:5:3jy16:haxe.macro.Binop:4:0oR3jR4:1:1oy4:kindjy12:hxsl.VarKind:4:0y4:namey10:pixelColory4:typejy9:hxsl.Type:5:2i4jy12:hxsl.VecType:1:0y2:idi-49gy1:poy4:filey35:src%2Fld31%2Fgraphic%2FOutShader.hxy3:maxi1404y3:mini1394gy1:tr12goR3jR4:1:1oR6jR7:2:0R8y5:colorR10jR11:5:2i4r11R13i-51gR14oR15R16R17i1412R18i1407gR19r18gR14oR15R16R17i1412R18i1394gR19r12goR3jR4:5:3r7oR3jR4:1:1oR6r10R8y5:blackR10jR11:5:2i4r11R13i-50gR14oR15R16R17i1423R18i1418gR19r26goR3jR4:8:2oR3jR4:2:1jy12:hxsl.TGlobal:40:0R14oR15R16R17i1430R18i1426gR19jR11:13:1ahgaoR3jR4:0:1jy10:hxsl.Const:3:1d0R14oR15R16R17i1434R18i1431gR19jR11:3:0goR3jR4:0:1jR23:3:1d0R14oR15R16R17i1439R18i1436gR19r41goR3jR4:0:1jR23:3:1d0R14oR15R16R17i1444R18i1441gR19r41goR3jR4:0:1jR23:3:1d1R14oR15R16R17i1449R18i1446gR19r41ghR14oR15R16R17i1450R18i1426gR19jR11:5:2i4r11gR14oR15R16R17i1450R18i1418gR19r26ghR14oR15R16R17i1513R18i1053gR19jR11:0:0gR6jy17:hxsl.FunctionKind:2:0y3:refoR6jR7:6:0R8y8:__init__R10jR11:13:1aoR1ahy3:retr61ghR13i-52gR27r61goR1ahR2oR3jR4:4:1aoR3jR4:7:2oR6r10R8R18R10r41R13i-54goR3jR4:0:1jR23:3:1d0.35R14oR15R16R17i1780R18i1776gR19r41gR14oR15R16R17i1781R18i1766gR19r61goR3jR4:7:2oR6r10R8R17R10r41R13i-55goR3jR4:0:1jR23:3:1d0.65R14oR15R16R17i1800R18i1796gR19r41gR14oR15R16R17i1801R18i1786gR19r61goR3jR4:7:2oR6r10R8y1:fR10r41R13i-56goR3jR4:5:3jR5:0:0oR3jR4:5:3jR5:1:0oR3jR4:8:2oR3jR4:2:1jR22:2:0R14oR15R16R17i1822R18i1819gR19jR11:13:1aoR1aoR8y5:valueR10r41ghR27r41ghgaoR3jR4:5:3r94oR3jR4:1:1oR6jR7:0:0R8y4:timeR10r41y6:parentoR6r109R8y6:globalR10jR11:12:1ar108hR13i-45gR13i-46gR14oR15R16R17i1834R18i1823gR19r41goR3jR4:0:1jR23:3:1i14R14oR15R16R17i1839R18i1837gR19r41gR14oR15R16R17i1839R18i1823gR19r41ghR14oR15R16R17i1840R18i1819gR19r41goR3jR4:0:1jR23:3:1d0.5R14oR15R16R17i1846R18i1843gR19r41gR14oR15R16R17i1846R18i1819gR19r41goR3jR4:0:1jR23:3:1d0.5R14oR15R16R17i1852R18i1849gR19r41gR14oR15R16R17i1852R18i1819gR19r41gR14oR15R16R17i1853R18i1811gR19r61goR3jR4:5:3r7oR3jR4:1:1r90R14oR15R16R17i1859R18i1858gR19r41goR3jR4:5:3r92oR3jR4:5:3r94oR3jR4:1:1r90R14oR15R16R17i1863R18i1862gR19r41goR3jR4:3:1oR3jR4:5:3jR5:3:0oR3jR4:1:1r82R14oR15R16R17i1870R18i1867gR19r41goR3jR4:1:1r74R14oR15R16R17i1876R18i1873gR19r41gR14oR15R16R17i1876R18i1867gR19r41gR14oR15R16R17i1877R18i1866gR19r41gR14oR15R16R17i1877R18i1862gR19r41goR3jR4:1:1r74R14oR15R16R17i1883R18i1880gR19r41gR14oR15R16R17i1883R18i1862gR19r41gR14oR15R16R17i1883R18i1858gR19r41goR3jR4:5:3r7oR3jR4:1:1oR6jR7:5:0R8R20R10jR11:5:2i4r11R31oR6r171R8y6:outputR10jR11:12:1ar170hR13i-47gR13i-48gR14oR15R16R17i1906R18i1894gR19r172goR3jR4:5:3r92oR3jR4:5:3r94oR3jR4:1:1r9R14oR15R16R17i1919R18i1909gR19r12goR3jR4:1:1r90R14oR15R16R17i1923R18i1922gR19r41gR14oR15R16R17i1923R18i1909gR19r12goR3jR4:5:3r94oR3jR4:1:1r25R14oR15R16R17i1931R18i1926gR19r26goR3jR4:3:1oR3jR4:5:3r148oR3jR4:0:1jR23:3:1i1R14oR15R16R17i1936R18i1935gR19r41goR3jR4:1:1r90R14oR15R16R17i1938R18i1937gR19r41gR14oR15R16R17i1938R18i1935gR19r41gR14oR15R16R17i1939R18i1934gR19r41gR14oR15R16R17i1939R18i1926gR19r26gR14oR15R16R17i1939R18i1909gR19jR11:5:2i4r11gR14oR15R16R17i1939R18i1894gR19r172ghR14oR15R16R17i2068R18i1713gR19r61gR6jR24:1:0R25oR6r64R8y8:fragmentR10jR11:13:1aoR1ahR27r61ghR13i-53gR27r61ghR8y22:ld31.graphic.OutShadery4:varsar63r25r215r173r110r16r9hg";
ld31.math.Dir.DIR_UP = 0;
ld31.math.Dir.DIR_LEFT = 3;
ld31.math.Dir.DIR_RIGHT = 1;
ld31.math.Dir.DIR_DOWN = 2;
tweenx909.rule.BoolRuleX.inputClass = Bool;
tweenx909.rule.ArrayRuleX.inputClass = Array;
tweenx909.rule.TimelineX.inputClass = tweenx909.rule.TimelineX;
tweenx909.rule.RgbX.inputClass = tweenx909.rule.RgbX;
tweenx909.rule.HsvX.inputClass = tweenx909.rule.HsvX;
tweenx909.rule.ArgbX.inputClass = tweenx909.rule.ArgbX;
tweenx909.rule.AhsvX.inputClass = tweenx909.rule.AhsvX;
tweenx909.rule.QuakeX.inputClass = tweenx909.rule.QuakeX;
tweenx909.TweenX._tweens = new Array();
tweenx909.TweenX._addedTweens = new Array();
tweenx909.TweenX.managerInited = false;
tweenx909.TweenX.DEFAULT_EASE = tweenx909.EaseX.linear;
tweenx909.TweenX.defaultEase = tweenx909.TweenX.DEFAULT_EASE;
tweenx909.TweenX.defaultTime = 0.3;
tweenx909.TweenX.defaultDelay = 0;
tweenx909.TweenX.defaultInterval = 0;
tweenx909.TweenX.defaultRepeat = 1;
tweenx909.TweenX.defaultYoyo = false;
tweenx909.TweenX.defaultZigZag = false;
tweenx909.TweenX.defaultAutoPlay = true;
tweenx909.TweenX.defaultAutoFrom = true;
tweenx909.TweenX._rules = [tweenx909.rule.BoolRuleX,tweenx909.rule.ArrayRuleX,tweenx909.rule.TimelineX,tweenx909.rule.RgbX,tweenx909.rule.HsvX,tweenx909.rule.ArgbX,tweenx909.rule.AhsvX,tweenx909.rule.QuakeX];
tweenx909.TweenX.topLevelTimeScale = 1;
tweenx909.TweenX._groupDefaults = false;
tweenx909.TweenX.updateMode = tweenx909.advanced.UpdateModeX.TIME(60);
tweenx909.TweenX._initLog = [];
tweenx909.TweenX.dictionary = new haxe.ds.ObjectMap();
tweenx909.TweenX._objCounter = 0;
tweenx909.TweenX.idCounter = 0;
ld31.Main.main();
})();

//# sourceMappingURL=ludumdare31.js.map