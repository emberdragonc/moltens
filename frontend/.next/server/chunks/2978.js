exports.id=2978,exports.ids=[2978],exports.modules={3296:(a,b,c)=>{let d=c(12202),e=c(93340);b.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},b.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},b.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},b.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},b.MIXED={bit:-1},b.getCharCountIndicator=function(a,b){if(!a.ccBits)throw Error("Invalid mode: "+a);if(!d.isValid(b))throw Error("Invalid version: "+b);return b>=1&&b<10?a.ccBits[0]:b<27?a.ccBits[1]:a.ccBits[2]},b.getBestModeForData=function(a){return e.testNumeric(a)?b.NUMERIC:e.testAlphanumeric(a)?b.ALPHANUMERIC:e.testKanji(a)?b.KANJI:b.BYTE},b.toString=function(a){if(a&&a.id)return a.id;throw Error("Invalid mode")},b.isValid=function(a){return a&&a.bit&&a.ccBits},b.from=function(a,c){if(b.isValid(a))return a;try{if("string"!=typeof a)throw Error("Param is not a string");switch(a.toLowerCase()){case"numeric":return b.NUMERIC;case"alphanumeric":return b.ALPHANUMERIC;case"kanji":return b.KANJI;case"byte":return b.BYTE;default:throw Error("Unknown mode: "+a)}}catch(a){return c}}},3725:(a,b,c)=>{let d=c(3296),e=c(21418);function f(a){this.mode=d.KANJI,this.data=a}f.getBitsLength=function(a){return 13*a},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(a){let b;for(b=0;b<this.data.length;b++){let c=e.toSJIS(this.data[b]);if(c>=33088&&c<=40956)c-=33088;else if(c>=57408&&c<=60351)c-=49472;else throw Error("Invalid SJIS character: "+this.data[b]+"\nMake sure your charset is UTF-8");c=(c>>>8&255)*192+(255&c),a.put(c,13)}},a.exports=f},6207:(a,b)=>{let c=new Uint8Array(512),d=new Uint8Array(256);!function(){let a=1;for(let b=0;b<255;b++)c[b]=a,d[a]=b,256&(a<<=1)&&(a^=285);for(let a=255;a<512;a++)c[a]=c[a-255]}(),b.log=function(a){if(a<1)throw Error("log("+a+")");return d[a]},b.exp=function(a){return c[a]},b.mul=function(a,b){return 0===a||0===b?0:c[d[a]+d[b]]}},6465:(a,b,c)=>{let d=c(3296),e=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function f(a){this.mode=d.ALPHANUMERIC,this.data=a}f.getBitsLength=function(a){return 11*Math.floor(a/2)+a%2*6},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(a){let b;for(b=0;b+2<=this.data.length;b+=2){let c=45*e.indexOf(this.data[b]);c+=e.indexOf(this.data[b+1]),a.put(c,11)}this.data.length%2&&a.put(e.indexOf(this.data[b]),6)},a.exports=f},8972:(a,b,c)=>{let d=c(26442),e={WW:" ",WB:"▄",BB:"█",BW:"▀"},f={BB:" ",BW:"▄",WW:"█",WB:"▀"};b.render=function(a,b,c){let g=d.getOptions(b),h=e;("#ffffff"===g.color.dark.hex||"#000000"===g.color.light.hex)&&(h=f);let i=a.modules.size,j=a.modules.data,k="",l=Array(i+2*g.margin+1).join(h.WW);l=Array(g.margin/2+1).join(l+"\n");let m=Array(g.margin+1).join(h.WW);k+=l;for(let a=0;a<i;a+=2){k+=m;for(let b=0;b<i;b++){var n;let c=j[a*i+b],d=j[(a+1)*i+b];k+=(n=h,c&&d?n.BB:c&&!d?n.BW:!c&&d?n.WB:n.WW)}k+=m+"\n"}return k+=l.slice(0,-1),"function"==typeof c&&c(null,k),k},b.renderToFile=function(a,d,e,f){void 0===f&&(f=e,e=void 0);let g=c(29021),h=b.render(d,e);g.writeFile(a,h,f)}},11203:(a,b,c)=>{let d=c(92190),e=c(37592);b.render=function(a,b,c){return b&&b.small?e.render(a,b,c):d.render(a,b,c)}},12202:(a,b)=>{b.isValid=function(a){return!isNaN(a)&&a>=1&&a<=40}},12557:a=>{"use strict";let b=[];!function(){for(let a=0;a<256;a++){let c=a;for(let a=0;a<8;a++)1&c?c=0xedb88320^c>>>1:c>>>=1;b[a]=c}}();let c=a.exports=function(){this._crc=-1};c.prototype.write=function(a){for(let c=0;c<a.length;c++)this._crc=b[(this._crc^a[c])&255]^this._crc>>>8;return!0},c.prototype.crc32=function(){return -1^this._crc},c.crc32=function(a){let c=-1;for(let d=0;d<a.length;d++)c=b[(c^a[d])&255]^c>>>8;return -1^c}},16805:(a,b,c)=>{let d=c(3296);function e(a){this.mode=d.NUMERIC,this.data=a.toString()}e.getBitsLength=function(a){return 10*Math.floor(a/3)+(a%3?a%3*3+1:0)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(a){let b,c;for(b=0;b+3<=this.data.length;b+=3)c=parseInt(this.data.substr(b,3),10),a.put(c,10);let d=this.data.length-b;d>0&&(c=parseInt(this.data.substr(b),10),a.put(c,3*d+1))},a.exports=e},16943:(a,b,c)=>{let d=c(26442);b.render=function(a,b,c){var e;let f=c,g=b;void 0!==f||b&&b.getContext||(f=b,b=void 0),b||(g=function(){try{return document.createElement("canvas")}catch(a){throw Error("You need to specify a canvas element")}}()),f=d.getOptions(f);let h=d.getImageWidth(a.modules.size,f),i=g.getContext("2d"),j=i.createImageData(h,h);return d.qrToImageData(j.data,a,f),e=g,i.clearRect(0,0,e.width,e.height),e.style||(e.style={}),e.height=h,e.width=h,e.style.height=h+"px",e.style.width=h+"px",i.putImageData(j,0,0),g},b.renderToDataURL=function(a,c,d){let e=d;void 0!==e||c&&c.getContext||(e=c,c=void 0),e||(e={});let f=b.render(a,c,e),g=e.type||"image/png",h=e.rendererOpts||{};return f.toDataURL(g,h.quality)}},17462:(a,b,c)=>{"use strict";let d=c(28354),e=c(27910),f=a.exports=function(){e.call(this),this._buffers=[],this._buffered=0,this._reads=[],this._paused=!1,this._encoding="utf8",this.writable=!0};d.inherits(f,e),f.prototype.read=function(a,b){this._reads.push({length:Math.abs(a),allowLess:a<0,func:b}),process.nextTick((function(){this._process(),this._paused&&this._reads&&this._reads.length>0&&(this._paused=!1,this.emit("drain"))}).bind(this))},f.prototype.write=function(a,b){let c;return this.writable?(c=Buffer.isBuffer(a)?a:Buffer.from(a,b||this._encoding),this._buffers.push(c),this._buffered+=c.length,this._process(),this._reads&&0===this._reads.length&&(this._paused=!0),this.writable&&!this._paused):(this.emit("error",Error("Stream not writable")),!1)},f.prototype.end=function(a,b){a&&this.write(a,b),this.writable=!1,this._buffers&&(0===this._buffers.length?this._end():(this._buffers.push(null),this._process()))},f.prototype.destroySoon=f.prototype.end,f.prototype._end=function(){this._reads.length>0&&this.emit("error",Error("Unexpected end of input")),this.destroy()},f.prototype.destroy=function(){this._buffers&&(this.writable=!1,this._reads=null,this._buffers=null,this.emit("close"))},f.prototype._processReadAllowingLess=function(a){this._reads.shift();let b=this._buffers[0];b.length>a.length?(this._buffered-=a.length,this._buffers[0]=b.slice(a.length),a.func.call(this,b.slice(0,a.length))):(this._buffered-=b.length,this._buffers.shift(),a.func.call(this,b))},f.prototype._processRead=function(a){this._reads.shift();let b=0,c=0,d=Buffer.alloc(a.length);for(;b<a.length;){let e=this._buffers[c++],f=Math.min(e.length,a.length-b);e.copy(d,b,0,f),b+=f,f!==e.length&&(this._buffers[--c]=e.slice(f))}c>0&&this._buffers.splice(0,c),this._buffered-=a.length,a.func.call(this,d)},f.prototype._process=function(){try{for(;this._buffered>0&&this._reads&&this._reads.length>0;){let a=this._reads[0];if(a.allowLess)this._processReadAllowingLess(a);else if(this._buffered>=a.length)this._processRead(a);else break}this._buffers&&!this.writable&&this._end()}catch(a){this.emit("error",a)}}},17506:(a,b,c)=>{let d=c(97393),e=c(3296);function f(a){this.mode=e.BYTE,"string"==typeof a&&(a=d(a)),this.data=new Uint8Array(a)}f.getBitsLength=function(a){return 8*a},f.prototype.getLength=function(){return this.data.length},f.prototype.getBitsLength=function(){return f.getBitsLength(this.data.length)},f.prototype.write=function(a){for(let b=0,c=this.data.length;b<c;b++)a.put(this.data[b],8)},a.exports=f},18721:(a,b,c)=>{"use strict";let d=c(49386),e=[function(){},function(a,b,c,d){if(d===b.length)throw Error("Ran out of data");let e=b[d];a[c]=e,a[c+1]=e,a[c+2]=e,a[c+3]=255},function(a,b,c,d){if(d+1>=b.length)throw Error("Ran out of data");let e=b[d];a[c]=e,a[c+1]=e,a[c+2]=e,a[c+3]=b[d+1]},function(a,b,c,d){if(d+2>=b.length)throw Error("Ran out of data");a[c]=b[d],a[c+1]=b[d+1],a[c+2]=b[d+2],a[c+3]=255},function(a,b,c,d){if(d+3>=b.length)throw Error("Ran out of data");a[c]=b[d],a[c+1]=b[d+1],a[c+2]=b[d+2],a[c+3]=b[d+3]}],f=[function(){},function(a,b,c,d){let e=b[0];a[c]=e,a[c+1]=e,a[c+2]=e,a[c+3]=d},function(a,b,c){let d=b[0];a[c]=d,a[c+1]=d,a[c+2]=d,a[c+3]=b[1]},function(a,b,c,d){a[c]=b[0],a[c+1]=b[1],a[c+2]=b[2],a[c+3]=d},function(a,b,c){a[c]=b[0],a[c+1]=b[1],a[c+2]=b[2],a[c+3]=b[3]}];b.dataToBitMap=function(a,b){let c,g,h,i,j,k,l=b.width,m=b.height,n=b.depth,o=b.bpp,p=b.interlace;8!==n&&(c=[],g=0,h={get:function(b){for(;c.length<b;)!function(){let b,d,e,f;if(g===a.length)throw Error("Ran out of data");let h=a[g];switch(g++,n){default:throw Error("unrecognised depth");case 16:e=a[g],g++,c.push((h<<8)+e);break;case 4:e=15&h,f=h>>4,c.push(f,e);break;case 2:b=3&h,d=h>>2&3,e=h>>4&3,f=h>>6&3,c.push(f,e,d,b);break;case 1:b=h>>4&1,d=h>>5&1,e=h>>6&1,f=h>>7&1,c.push(f,e,d,b,h>>3&1,h>>2&1,h>>1&1,1&h)}}();let d=c.slice(0,b);return c=c.slice(b),d},resetAfterLine:function(){c.length=0},end:function(){if(g!==a.length)throw Error("extra data found")}}),i=n<=8?Buffer.alloc(l*m*4):new Uint16Array(l*m*4);let q=Math.pow(2,n)-1,r=0;if(p)j=d.getImagePasses(l,m),k=d.getInterlaceIterator(l,m);else{let a=0;k=function(){let b=a;return a+=4,b},j=[{width:l,height:m}]}for(let b=0;b<j.length;b++)8===n?r=function(a,b,c,d,f,g){let h=a.width,i=a.height,j=a.index;for(let a=0;a<i;a++)for(let i=0;i<h;i++){let h=c(i,a,j);e[d](b,f,h,g),g+=d}return g}(j[b],i,k,o,a,r):function(a,b,c,d,e,g){let h=a.width,i=a.height,j=a.index;for(let a=0;a<i;a++){for(let i=0;i<h;i++){let h=e.get(d),k=c(i,a,j);f[d](b,h,k,g)}e.resetAfterLine()}}(j[b],i,k,o,h,q);if(8===n){if(r!==a.length)throw Error("extra data found")}else h.end();return i}},19276:(a,b)=>{b.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};let c={N1:3,N2:3,N3:40,N4:10};b.isValid=function(a){return null!=a&&""!==a&&!isNaN(a)&&a>=0&&a<=7},b.from=function(a){return b.isValid(a)?parseInt(a,10):void 0},b.getPenaltyN1=function(a){let b=a.size,d=0,e=0,f=0,g=null,h=null;for(let i=0;i<b;i++){e=f=0,g=h=null;for(let j=0;j<b;j++){let b=a.get(i,j);b===g?e++:(e>=5&&(d+=c.N1+(e-5)),g=b,e=1),(b=a.get(j,i))===h?f++:(f>=5&&(d+=c.N1+(f-5)),h=b,f=1)}e>=5&&(d+=c.N1+(e-5)),f>=5&&(d+=c.N1+(f-5))}return d},b.getPenaltyN2=function(a){let b=a.size,d=0;for(let c=0;c<b-1;c++)for(let e=0;e<b-1;e++){let b=a.get(c,e)+a.get(c,e+1)+a.get(c+1,e)+a.get(c+1,e+1);(4===b||0===b)&&d++}return d*c.N2},b.getPenaltyN3=function(a){let b=a.size,d=0,e=0,f=0;for(let c=0;c<b;c++){e=f=0;for(let g=0;g<b;g++)e=e<<1&2047|a.get(c,g),g>=10&&(1488===e||93===e)&&d++,f=f<<1&2047|a.get(g,c),g>=10&&(1488===f||93===f)&&d++}return d*c.N3},b.getPenaltyN4=function(a){let b=0,d=a.data.length;for(let c=0;c<d;c++)b+=a.data[c];return Math.abs(Math.ceil(100*b/d/5)-10)*c.N4},b.applyMask=function(a,c){let d=c.size;for(let e=0;e<d;e++)for(let f=0;f<d;f++)c.isReserved(f,e)||c.xor(f,e,function(a,c,d){switch(a){case b.Patterns.PATTERN000:return(c+d)%2==0;case b.Patterns.PATTERN001:return c%2==0;case b.Patterns.PATTERN010:return d%3==0;case b.Patterns.PATTERN011:return(c+d)%3==0;case b.Patterns.PATTERN100:return(Math.floor(c/2)+Math.floor(d/3))%2==0;case b.Patterns.PATTERN101:return c*d%2+c*d%3==0;case b.Patterns.PATTERN110:return(c*d%2+c*d%3)%2==0;case b.Patterns.PATTERN111:return(c*d%3+(c+d)%2)%2==0;default:throw Error("bad maskPattern:"+a)}}(a,f,e))},b.getBestMask=function(a,c){let d=Object.keys(b.Patterns).length,e=0,f=1/0;for(let g=0;g<d;g++){c(g),b.applyMask(g,a);let d=b.getPenaltyN1(a)+b.getPenaltyN2(a)+b.getPenaltyN3(a)+b.getPenaltyN4(a);b.applyMask(g,a),d<f&&(f=d,e=g)}return e}},20142:(a,b,c)=>{"use strict";let d=c(12412).ok,e=c(74075),f=c(28354),g=c(79428).kMaxLength;function h(a){if(!(this instanceof h))return new h(a);a&&a.chunkSize<e.Z_MIN_CHUNK&&(a.chunkSize=e.Z_MIN_CHUNK),e.Inflate.call(this,a),this._offset=void 0===this._offset?this._outOffset:this._offset,this._buffer=this._buffer||this._outBuffer,a&&null!=a.maxLength&&(this._maxLength=a.maxLength)}function i(a,b){b&&process.nextTick(b),a._handle&&(a._handle.close(),a._handle=null)}function j(a,b){var c=new h(b),d=a;if("string"==typeof d&&(d=Buffer.from(d)),!(d instanceof Buffer))throw TypeError("Not a string or buffer");let f=c._finishFlushFlag;return null==f&&(f=e.Z_FINISH),c._processChunk(d,f)}h.prototype._processChunk=function(a,b,c){let f,h;if("function"==typeof c)return e.Inflate._processChunk.call(this,a,b,c);let j=this,k=a&&a.length,l=this._chunkSize-this._offset,m=this._maxLength,n=0,o=[],p=0;this.on("error",function(a){f=a}),d(this._handle,"zlib binding closed");do h=(h=this._handle.writeSync(b,a,n,k,this._buffer,this._offset,l))||this._writeState;while(!this._hadError&&function(a,b){if(j._hadError)return;let c=l-b;if(d(c>=0,"have should not go down"),c>0){let a=j._buffer.slice(j._offset,j._offset+c);if(j._offset+=c,a.length>m&&(a=a.slice(0,m)),o.push(a),p+=a.length,0==(m-=a.length))return!1}return(0===b||j._offset>=j._chunkSize)&&(l=j._chunkSize,j._offset=0,j._buffer=Buffer.allocUnsafe(j._chunkSize)),0===b&&(n+=k-a,k=a,!0)}(h[0],h[1]));if(this._hadError)throw f;if(p>=g)throw i(this),RangeError("Cannot create final Buffer. It would be larger than 0x"+g.toString(16)+" bytes");let q=Buffer.concat(o,p);return i(this),q},f.inherits(h,e.Inflate),a.exports=b=j,b.Inflate=h,b.createInflate=function(a){return new h(a)},b.inflateSync=j},20242:(a,b,c)=>{let d=c(90569),e=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],f=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];b.getBlocksCount=function(a,b){switch(b){case d.L:return e[(a-1)*4+0];case d.M:return e[(a-1)*4+1];case d.Q:return e[(a-1)*4+2];case d.H:return e[(a-1)*4+3];default:return}},b.getTotalCodewordsCount=function(a,b){switch(b){case d.L:return f[(a-1)*4+0];case d.M:return f[(a-1)*4+1];case d.Q:return f[(a-1)*4+2];case d.H:return f[(a-1)*4+3];default:return}}},21418:(a,b)=>{let c,d=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];b.getSymbolSize=function(a){if(!a)throw Error('"version" cannot be null or undefined');if(a<1||a>40)throw Error('"version" should be in range from 1 to 40');return 4*a+17},b.getSymbolTotalCodewords=function(a){return d[a]},b.getBCHDigit=function(a){let b=0;for(;0!==a;)b++,a>>>=1;return b},b.setToSJISFunction=function(a){if("function"!=typeof a)throw Error('"toSJISFunc" is not a valid function.');c=a},b.isKanjiModeEnabled=function(){return void 0!==c},b.toSJIS=function(a){return c(a)}},22016:(a,b,c)=>{"use strict";let d=c(28354),e=c(27910),f=c(83945),g=c(60504),h=c(42982),i=b.O=function(a){e.call(this),a=a||{},this.width=0|a.width,this.height=0|a.height,this.data=this.width>0&&this.height>0?Buffer.alloc(4*this.width*this.height):null,a.fill&&this.data&&this.data.fill(0),this.gamma=0,this.readable=this.writable=!0,this._parser=new f(a),this._parser.on("error",this.emit.bind(this,"error")),this._parser.on("close",this._handleClose.bind(this)),this._parser.on("metadata",this._metadata.bind(this)),this._parser.on("gamma",this._gamma.bind(this)),this._parser.on("parsed",(function(a){this.data=a,this.emit("parsed",a)}).bind(this)),this._packer=new g(a),this._packer.on("data",this.emit.bind(this,"data")),this._packer.on("end",this.emit.bind(this,"end")),this._parser.on("close",this._handleClose.bind(this)),this._packer.on("error",this.emit.bind(this,"error"))};d.inherits(i,e),i.sync=h,i.prototype.pack=function(){return this.data&&this.data.length?process.nextTick((function(){this._packer.pack(this.data,this.width,this.height,this.gamma)}).bind(this)):this.emit("error","No data provided"),this},i.prototype.parse=function(a,b){if(b){let a,c;a=(function(a){this.removeListener("error",c),this.data=a,b(null,this)}).bind(this),c=(function(c){this.removeListener("parsed",a),b(c,null)}).bind(this),this.once("parsed",a),this.once("error",c)}return this.end(a),this},i.prototype.write=function(a){return this._parser.write(a),!0},i.prototype.end=function(a){this._parser.end(a)},i.prototype._metadata=function(a){this.width=a.width,this.height=a.height,this.emit("metadata",a)},i.prototype._gamma=function(a){this.gamma=a},i.prototype._handleClose=function(){this._parser.writable||this._packer.readable||this.emit("close")},i.bitblt=function(a,b,c,d,e,f,g,h){if(d|=0,e|=0,f|=0,g|=0,h|=0,(c|=0)>a.width||d>a.height||c+e>a.width||d+f>a.height)throw Error("bitblt reading outside image");if(g>b.width||h>b.height||g+e>b.width||h+f>b.height)throw Error("bitblt writing outside image");for(let i=0;i<f;i++)a.data.copy(b.data,(h+i)*b.width+g<<2,(d+i)*a.width+c<<2,(d+i)*a.width+c+e<<2)},i.prototype.bitblt=function(a,b,c,d,e,f,g){return i.bitblt(this,a,b,c,d,e,f,g),this},i.adjustGamma=function(a){if(a.gamma){for(let b=0;b<a.height;b++)for(let c=0;c<a.width;c++){let d=a.width*b+c<<2;for(let b=0;b<3;b++){let c=a.data[d+b]/255;c=Math.pow(c,1/2.2/a.gamma),a.data[d+b]=Math.round(255*c)}}a.gamma=0}},i.prototype.adjustGamma=function(){i.adjustGamma(this)}},22567:(a,b,c)=>{"use strict";let d=c(62060),e={0:function(a,b,c,d,e){for(let f=0;f<c;f++)d[e+f]=a[b+f]},1:function(a,b,c,d,e,f){for(let g=0;g<c;g++){let c=g>=f?a[b+g-f]:0,h=a[b+g]-c;d[e+g]=h}},2:function(a,b,c,d,e){for(let f=0;f<c;f++){let g=b>0?a[b+f-c]:0,h=a[b+f]-g;d[e+f]=h}},3:function(a,b,c,d,e,f){for(let g=0;g<c;g++){let h=g>=f?a[b+g-f]:0,i=b>0?a[b+g-c]:0,j=a[b+g]-(h+i>>1);d[e+g]=j}},4:function(a,b,c,e,f,g){for(let h=0;h<c;h++){let i=h>=g?a[b+h-g]:0,j=b>0?a[b+h-c]:0,k=b>0&&h>=g?a[b+h-(c+g)]:0,l=a[b+h]-d(i,j,k);e[f+h]=l}}},f={0:function(a,b,c){let d=0,e=b+c;for(let c=b;c<e;c++)d+=Math.abs(a[c]);return d},1:function(a,b,c,d){let e=0;for(let f=0;f<c;f++){let c=f>=d?a[b+f-d]:0;e+=Math.abs(a[b+f]-c)}return e},2:function(a,b,c){let d=0,e=b+c;for(let f=b;f<e;f++){let e=b>0?a[f-c]:0;d+=Math.abs(a[f]-e)}return d},3:function(a,b,c,d){let e=0;for(let f=0;f<c;f++){let g=f>=d?a[b+f-d]:0,h=b>0?a[b+f-c]:0;e+=Math.abs(a[b+f]-(g+h>>1))}return e},4:function(a,b,c,e){let f=0;for(let g=0;g<c;g++){let h=g>=e?a[b+g-e]:0,i=b>0?a[b+g-c]:0,j=b>0&&g>=e?a[b+g-(c+e)]:0;f+=Math.abs(a[b+g]-d(h,i,j))}return f}};a.exports=function(a,b,c,d,g){let h;if("filterType"in d&&-1!==d.filterType)if("number"==typeof d.filterType)h=[d.filterType];else throw Error("unrecognised filter types");else h=[0,1,2,3,4];16===d.bitDepth&&(g*=2);let i=b*g,j=0,k=0,l=Buffer.alloc((i+1)*c),m=h[0];for(let b=0;b<c;b++){if(h.length>1){let b=1/0;for(let c=0;c<h.length;c++){let d=f[h[c]](a,k,i,g);d<b&&(m=h[c],b=d)}}l[j]=m,j++,e[m](a,k,i,l,j,g),j+=i,k+=i}return l}},26442:(a,b)=>{function c(a){if("number"==typeof a&&(a=a.toString()),"string"!=typeof a)throw Error("Color should be defined as hex string");let b=a.slice().replace("#","").split("");if(b.length<3||5===b.length||b.length>8)throw Error("Invalid hex color: "+a);(3===b.length||4===b.length)&&(b=Array.prototype.concat.apply([],b.map(function(a){return[a,a]}))),6===b.length&&b.push("F","F");let c=parseInt(b.join(""),16);return{r:c>>24&255,g:c>>16&255,b:c>>8&255,a:255&c,hex:"#"+b.slice(0,6).join("")}}b.getOptions=function(a){a||(a={}),a.color||(a.color={});let b=void 0===a.margin||null===a.margin||a.margin<0?4:a.margin,d=a.width&&a.width>=21?a.width:void 0,e=a.scale||4;return{width:d,scale:d?4:e,margin:b,color:{dark:c(a.color.dark||"#000000ff"),light:c(a.color.light||"#ffffffff")},type:a.type,rendererOpts:a.rendererOpts||{}}},b.getScale=function(a,b){return b.width&&b.width>=a+2*b.margin?b.width/(a+2*b.margin):b.scale},b.getImageWidth=function(a,c){let d=b.getScale(a,c);return Math.floor((a+2*c.margin)*d)},b.qrToImageData=function(a,c,d){let e=c.modules.size,f=c.modules.data,g=b.getScale(e,d),h=Math.floor((e+2*d.margin)*g),i=d.margin*g,j=[d.color.light,d.color.dark];for(let b=0;b<h;b++)for(let c=0;c<h;c++){let k=(b*h+c)*4,l=d.color.light;b>=i&&c>=i&&b<h-i&&c<h-i&&(l=j[+!!f[Math.floor((b-i)/g)*e+Math.floor((c-i)/g)]]),a[k++]=l.r,a[k++]=l.g,a[k++]=l.b,a[k]=l.a}}},34351:(a,b,c)=>{"use strict";a.exports=c(84368)},35116:(a,b,c)=>{let d=c(26442);function e(a,b){let c=a.a/255,d=b+'="'+a.hex+'"';return c<1?d+" "+b+'-opacity="'+c.toFixed(2).slice(1)+'"':d}function f(a,b,c){let d=a+b;return void 0!==c&&(d+=" "+c),d}b.render=function(a,b,c){let g=d.getOptions(b),h=a.modules.size,i=a.modules.data,j=h+2*g.margin,k=g.color.light.a?"<path "+e(g.color.light,"fill")+' d="M0 0h'+j+"v"+j+'H0z"/>':"",l="<path "+e(g.color.dark,"stroke")+' d="'+function(a,b,c){let d="",e=0,g=!1,h=0;for(let i=0;i<a.length;i++){let j=Math.floor(i%b),k=Math.floor(i/b);j||g||(g=!0),a[i]?(h++,i>0&&j>0&&a[i-1]||(d+=g?f("M",j+c,.5+k+c):f("m",e,0),e=0,g=!1),j+1<b&&a[i+1]||(d+=f("h",h),h=0)):e++}return d}(i,h,g.margin)+'"/>',m='<svg xmlns="http://www.w3.org/2000/svg" '+(g.width?'width="'+g.width+'" height="'+g.width+'" ':"")+('viewBox="0 0 '+j+" ")+j+'" shape-rendering="crispEdges">'+k+l+"</svg>\n";return"function"==typeof c&&c(null,m),m}},37592:(a,b)=>{let c="\x1b[37m",d="\x1b[30m",e="\x1b[0m",f="\x1b[47m"+d,g="\x1b[40m"+c,h=function(a,b,c,d){let e=b+1;return c>=e||d>=e||d<-1||c<-1?"0":c>=b||d>=b||d<0||c<0?"1":a[d*b+c]?"2":"1"},i=function(a,b,c,d){return h(a,b,c,d)+h(a,b,c,d+1)};b.render=function(a,b,h){var j,k;let l=a.modules.size,m=a.modules.data,n=!!(b&&b.inverse),o=b&&b.inverse?g:f,p={"00":e+" "+o,"01":e+(j=n?d:c)+"▄"+o,"02":e+(k=n?c:d)+"▄"+o,10:e+j+"▀"+o,11:" ",12:"▄",20:e+k+"▀"+o,21:"▀",22:"█"},q=e+"\n"+o,r=o;for(let a=-1;a<l+1;a+=2){for(let b=-1;b<l;b++)r+=p[i(m,l,b,a)];r+=p[i(m,l,l,a)]+q}return r+=e,"function"==typeof h&&h(null,r),r}},37689:a=>{"use strict";a.exports=function(a,b){let c=b.depth,d=b.width,e=b.height,f=b.colorType,g=b.transColor,h=b.palette,i=a;return 3===f?!function(a,b,c,d,e){let f=0;for(let g=0;g<d;g++)for(let d=0;d<c;d++){let c=e[a[f]];if(!c)throw Error("index "+a[f]+" not in palette");for(let a=0;a<4;a++)b[f+a]=c[a];f+=4}}(a,i,d,e,h):(g&&function(a,b,c,d,e){let f=0;for(let g=0;g<d;g++)for(let d=0;d<c;d++){let c=!1;if(1===e.length?e[0]===a[f]&&(c=!0):e[0]===a[f]&&e[1]===a[f+1]&&e[2]===a[f+2]&&(c=!0),c)for(let a=0;a<4;a++)b[f+a]=0;f+=4}}(a,i,d,e,g),8!==c&&(16===c&&(i=Buffer.alloc(d*e*4)),!function(a,b,c,d,e){let f=Math.pow(2,e)-1,g=0;for(let e=0;e<d;e++)for(let d=0;d<c;d++){for(let c=0;c<4;c++)b[g+c]=Math.floor(255*a[g+c]/f+.5);g+=4}}(a,i,d,e,c))),i}},38869:(a,b,c)=>{let d=c(21418).getSymbolSize;b.getRowColCoords=function(a){if(1===a)return[];let b=Math.floor(a/7)+2,c=d(a),e=145===c?26:2*Math.ceil((c-13)/(2*b-2)),f=[c-7];for(let a=1;a<b-1;a++)f[a]=f[a-1]-e;return f.push(6),f.reverse()},b.getPositions=function(a){let c=[],d=b.getRowColCoords(a),e=d.length;for(let a=0;a<e;a++)for(let b=0;b<e;b++)(0!==a||0!==b)&&(0!==a||b!==e-1)&&(a!==e-1||0!==b)&&c.push([d[a],d[b]]);return c}},40908:(a,b,c)=>{let d=c(29021),e=c(22016).O,f=c(26442);b.render=function(a,b){let c=f.getOptions(b),d=c.rendererOpts,g=f.getImageWidth(a.modules.size,c);d.width=g,d.height=g;let h=new e(d);return f.qrToImageData(h.data,a,c),h},b.renderToDataURL=function(a,c,d){void 0===d&&(d=c,c=void 0),b.renderToBuffer(a,c,function(a,b){a&&d(a);let c="data:image/png;base64,";c+=b.toString("base64"),d(null,c)})},b.renderToBuffer=function(a,c,d){void 0===d&&(d=c,c=void 0);let e=b.render(a,c),f=[];e.on("error",d),e.on("data",function(a){f.push(a)}),e.on("end",function(){d(null,Buffer.concat(f))}),e.pack()},b.renderToFile=function(a,c,e,f){void 0===f&&(f=e,e=void 0);let g=!1,h=(...a)=>{g||(g=!0,f.apply(null,a))},i=d.createWriteStream(a);i.on("error",h),i.on("close",h),b.renderToFileStream(i,c,e)},b.renderToFileStream=function(a,c,d){b.render(c,d).pack().pipe(a)}},42982:(a,b,c)=>{"use strict";let d=c(49030),e=c(94545);b.read=function(a,b){return d(a,b||{})},b.write=function(a,b){return e(a,b)}},49030:(a,b,c)=>{"use strict";let d=!0,e=c(74075),f=c(20142);e.deflateSync||(d=!1);let g=c(61798),h=c(84587),i=c(64064),j=c(18721),k=c(37689);a.exports=function(a,b){let c,l,m,n;if(!d)throw Error("To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0");let o=[],p=new g(a);if(new i(b,{read:p.read.bind(p),error:function(a){c=a},metadata:function(a){l=a},gamma:function(a){m=a},palette:function(a){l.palette=a},transColor:function(a){l.transColor=a},inflateData:function(a){o.push(a)},simpleTransparency:function(){l.alpha=!0}}).start(),p.process(),c)throw c;let q=Buffer.concat(o);if(o.length=0,l.interlace)n=e.inflateSync(q);else{let a=((l.width*l.bpp*l.depth+7>>3)+1)*l.height;n=f(q,{chunkSize:a,maxLength:a})}if(q=null,!n||!n.length)throw Error("bad png - invalid inflate data response");let r=h.process(n,l);q=null;let s=j.dataToBitMap(r,l);r=null;let t=k(s,l);return l.data=t,l.gamma=m||0,l}},49386:(a,b)=>{"use strict";let c=[{x:[0],y:[0]},{x:[4],y:[0]},{x:[0,4],y:[4]},{x:[2,6],y:[0,4]},{x:[0,2,4,6],y:[2,6]},{x:[1,3,5,7],y:[0,2,4,6]},{x:[0,1,2,3,4,5,6,7],y:[1,3,5,7]}];b.getImagePasses=function(a,b){let d=[],e=a%8,f=b%8,g=(a-e)/8,h=(b-f)/8;for(let a=0;a<c.length;a++){let b=c[a],i=g*b.x.length,j=h*b.y.length;for(let a=0;a<b.x.length;a++)if(b.x[a]<e)i++;else break;for(let a=0;a<b.y.length;a++)if(b.y[a]<f)j++;else break;i>0&&j>0&&d.push({width:i,height:j,index:a})}return d},b.getInterlaceIterator=function(a){return function(b,d,e){let f=b%c[e].x.length,g=(b-f)/c[e].x.length*8+c[e].x[f],h=d%c[e].y.length;return 4*g+((d-h)/c[e].y.length*8+c[e].y[h])*a*4}}},53057:(a,b,c)=>{let d=c(6207);b.mul=function(a,b){let c=new Uint8Array(a.length+b.length-1);for(let e=0;e<a.length;e++)for(let f=0;f<b.length;f++)c[e+f]^=d.mul(a[e],b[f]);return c},b.mod=function(a,b){let c=new Uint8Array(a);for(;c.length-b.length>=0;){let a=c[0];for(let e=0;e<b.length;e++)c[e]^=d.mul(b[e],a);let e=0;for(;e<c.length&&0===c[e];)e++;c=c.slice(e)}return c},b.generateECPolynomial=function(a){let c=new Uint8Array([1]);for(let e=0;e<a;e++)c=b.mul(c,new Uint8Array([1,d.exp(e)]));return c}},53923:(a,b,c)=>{"use strict";let d=c(49386),e=c(62060);function f(a,b,c){let d=a*b;return 8!==c&&(d=Math.ceil(d/(8/c))),d}let g=a.exports=function(a,b){let c=a.width,e=a.height,g=a.interlace,h=a.bpp,i=a.depth;if(this.read=b.read,this.write=b.write,this.complete=b.complete,this._imageIndex=0,this._images=[],g){let a=d.getImagePasses(c,e);for(let b=0;b<a.length;b++)this._images.push({byteWidth:f(a[b].width,h,i),height:a[b].height,lineIndex:0})}else this._images.push({byteWidth:f(c,h,i),height:e,lineIndex:0});8===i?this._xComparison=h:16===i?this._xComparison=2*h:this._xComparison=1};g.prototype.start=function(){this.read(this._images[this._imageIndex].byteWidth+1,this._reverseFilterLine.bind(this))},g.prototype._unFilterType1=function(a,b,c){let d=this._xComparison,e=d-1;for(let f=0;f<c;f++){let c=a[1+f],g=f>e?b[f-d]:0;b[f]=c+g}},g.prototype._unFilterType2=function(a,b,c){let d=this._lastLine;for(let e=0;e<c;e++){let c=a[1+e],f=d?d[e]:0;b[e]=c+f}},g.prototype._unFilterType3=function(a,b,c){let d=this._xComparison,e=d-1,f=this._lastLine;for(let g=0;g<c;g++){let c=a[1+g],h=f?f[g]:0,i=Math.floor(((g>e?b[g-d]:0)+h)/2);b[g]=c+i}},g.prototype._unFilterType4=function(a,b,c){let d=this._xComparison,f=d-1,g=this._lastLine;for(let h=0;h<c;h++){let c=a[1+h],i=g?g[h]:0,j=e(h>f?b[h-d]:0,i,h>f&&g?g[h-d]:0);b[h]=c+j}},g.prototype._reverseFilterLine=function(a){let b,c=a[0],d=this._images[this._imageIndex],e=d.byteWidth;if(0===c)b=a.slice(1,e+1);else switch(b=Buffer.alloc(e),c){case 1:this._unFilterType1(a,b,e);break;case 2:this._unFilterType2(a,b,e);break;case 3:this._unFilterType3(a,b,e);break;case 4:this._unFilterType4(a,b,e);break;default:throw Error("Unrecognised filter type - "+c)}this.write(b),d.lineIndex++,d.lineIndex>=d.height?(this._lastLine=null,this._imageIndex++,d=this._images[this._imageIndex]):this._lastLine=b,d?this.read(d.byteWidth+1,this._reverseFilterLine.bind(this)):(this._lastLine=null,this.complete())}},60190:a=>{"use strict";a.exports={PNG_SIGNATURE:[137,80,78,71,13,10,26,10],TYPE_IHDR:0x49484452,TYPE_IEND:0x49454e44,TYPE_IDAT:0x49444154,TYPE_PLTE:0x504c5445,TYPE_tRNS:0x74524e53,TYPE_gAMA:0x67414d41,COLORTYPE_GRAYSCALE:0,COLORTYPE_PALETTE:1,COLORTYPE_COLOR:2,COLORTYPE_ALPHA:4,COLORTYPE_PALETTE_COLOR:3,COLORTYPE_COLOR_ALPHA:6,COLORTYPE_TO_BPP_MAP:{0:1,2:3,3:1,4:2,6:4},GAMMA_DIVISION:1e5}},60504:(a,b,c)=>{"use strict";let d=c(28354),e=c(27910),f=c(60190),g=c(72641),h=a.exports=function(a){e.call(this),this._packer=new g(a||{}),this._deflate=this._packer.createDeflate(),this.readable=!0};d.inherits(h,e),h.prototype.pack=function(a,b,c,d){this.emit("data",Buffer.from(f.PNG_SIGNATURE)),this.emit("data",this._packer.packIHDR(b,c)),d&&this.emit("data",this._packer.packGAMA(d));let e=this._packer.filterData(a,b,c);this._deflate.on("error",this.emit.bind(this,"error")),this._deflate.on("data",(function(a){this.emit("data",this._packer.packIDAT(a))}).bind(this)),this._deflate.on("end",(function(){this.emit("data",this._packer.packIEND()),this.emit("end")}).bind(this)),this._deflate.end(e)}},61589:(a,b,c)=>{let d=c(21418),e=d.getBCHDigit(1335);b.getEncodedBits=function(a,b){let c=a.bit<<3|b,f=c<<10;for(;d.getBCHDigit(f)-e>=0;)f^=1335<<d.getBCHDigit(f)-e;return(c<<10|f)^21522}},61798:a=>{"use strict";let b=a.exports=function(a){this._buffer=a,this._reads=[]};b.prototype.read=function(a,b){this._reads.push({length:Math.abs(a),allowLess:a<0,func:b})},b.prototype.process=function(){for(;this._reads.length>0&&this._buffer.length;){let a=this._reads[0];if(this._buffer.length&&(this._buffer.length>=a.length||a.allowLess)){this._reads.shift();let b=this._buffer;this._buffer=b.slice(a.length),a.func.call(this,b.slice(0,a.length))}else break}return this._reads.length>0?Error("There are some read requests waitng on finished stream"):this._buffer.length>0?Error("unrecognised content at end of stream"):void 0}},62060:a=>{"use strict";a.exports=function(a,b,c){let d=a+b-c,e=Math.abs(d-a),f=Math.abs(d-b),g=Math.abs(d-c);return e<=f&&e<=g?a:f<=g?b:c}},62978:(a,b,c)=>{"use strict";c.r(b),c.d(b,{W3mAllWalletsView:()=>bJ,W3mConnectingWcBasicView:()=>a3,W3mDownloadsView:()=>bN});var d=c(29856),e=c(26990),f=c(13295),g=c(10306),h=c(20828),i=c(36087),j=c(35198);c(58581);var k=c(22734),l=c(95209),m=c(26641),n=c(87977);c(72330),c(29272),c(1222);var o=c(77292),p=c(14143);c(64222),c(67332);let q=(0,d.AH)`
  :host {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-size);
    height: var(--local-size);
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host([name='Extension'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  :host([data-wallet-icon='allWallets']) {
    background-color: var(--wui-all-wallets-bg-100);
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 18px;
    height: 18px;
  }

  wui-icon[data-parent-size='md'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='lg'] {
    width: 42px;
    height: 42px;
  }

  wui-icon[data-parent-size='full'] {
    width: 100%;
    height: 100%;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid var(--wui-color-bg-150, #1e1f1f);
    padding: 1px;
  }
`;var r=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let s=class extends d.WF{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let a="xxs";return a="lg"===this.size?"m":"md"===this.size?"xs":"xxs",this.style.cssText=`
       --local-border-radius: var(--wui-border-radius-${a});
       --local-size: var(--wui-wallet-image-size-${this.size});
   `,this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),(0,d.qy)`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?(0,d.qy)`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?(0,d.qy)`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`:(0,d.qy)`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};s.styles=[o.fD,o.W5,q],r([(0,e.MZ)()],s.prototype,"size",void 0),r([(0,e.MZ)()],s.prototype,"name",void 0),r([(0,e.MZ)()],s.prototype,"imageSrc",void 0),r([(0,e.MZ)()],s.prototype,"walletIcon",void 0),r([(0,e.MZ)({type:Boolean})],s.prototype,"installed",void 0),r([(0,e.MZ)()],s.prototype,"badgeSize",void 0),s=r([(0,p.E)("wui-wallet-image")],s);let t=(0,d.AH)`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`;var u=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let v=class extends d.WF{constructor(){super(...arguments),this.walletImages=[]}render(){let a=this.walletImages.length<4;return(0,d.qy)`${this.walletImages.slice(0,4).map(({src:a,walletName:b})=>(0,d.qy)`
            <wui-wallet-image
              size="inherit"
              imageSrc=${a}
              name=${(0,k.J)(b)}
            ></wui-wallet-image>
          `)}
      ${a?[...Array(4-this.walletImages.length)].map(()=>(0,d.qy)` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`):null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`}};v.styles=[o.W5,t],u([(0,e.MZ)({type:Array})],v.prototype,"walletImages",void 0),v=u([(0,p.E)("wui-all-wallets-image")],v),c(86851);let w=(0,d.AH)`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`;var x=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let y=class extends d.WF{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.tabIdx=void 0,this.installed=!1,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100"}render(){return(0,d.qy)`
      <button ?disabled=${this.disabled} tabindex=${(0,k.J)(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?(0,d.qy)` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?(0,d.qy)` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?(0,d.qy)`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`:this.showAllWallets||this.imageSrc?null:(0,d.qy)`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`}templateStatus(){return this.loading?(0,d.qy)`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?(0,d.qy)`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:this.icon?(0,d.qy)`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`:null}};y.styles=[o.W5,o.fD,w],x([(0,e.MZ)({type:Array})],y.prototype,"walletImages",void 0),x([(0,e.MZ)()],y.prototype,"imageSrc",void 0),x([(0,e.MZ)()],y.prototype,"name",void 0),x([(0,e.MZ)()],y.prototype,"tagLabel",void 0),x([(0,e.MZ)()],y.prototype,"tagVariant",void 0),x([(0,e.MZ)()],y.prototype,"icon",void 0),x([(0,e.MZ)()],y.prototype,"walletIcon",void 0),x([(0,e.MZ)()],y.prototype,"tabIdx",void 0),x([(0,e.MZ)({type:Boolean})],y.prototype,"installed",void 0),x([(0,e.MZ)({type:Boolean})],y.prototype,"disabled",void 0),x([(0,e.MZ)({type:Boolean})],y.prototype,"showAllWallets",void 0),x([(0,e.MZ)({type:Boolean})],y.prototype,"loading",void 0),x([(0,e.MZ)({type:String})],y.prototype,"loadingSpinnerColor",void 0),y=x([(0,p.E)("wui-list-wallet")],y);var z=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let A=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=l.a.state.connectors,this.count=g.N.state.count,this.filteredCount=g.N.state.filteredWallets.length,this.isFetchingRecommendedWallets=g.N.state.isFetchingRecommendedWallets,this.unsubscribe.push(l.a.subscribeKey("connectors",a=>this.connectors=a),g.N.subscribeKey("count",a=>this.count=a),g.N.subscribeKey("filteredWallets",a=>this.filteredCount=a.length),g.N.subscribeKey("isFetchingRecommendedWallets",a=>this.isFetchingRecommendedWallets=a))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){let a=this.connectors.find(a=>"walletConnect"===a.id),{allWallets:b}=h.H.state;if(!a||"HIDE"===b||"ONLY_MOBILE"===b&&!f.w.isMobile())return null;let c=g.N.state.featured.length,e=this.count+c,i=e<10?e:10*Math.floor(e/10),j=this.filteredCount>0?this.filteredCount:i,l=`${j}`;return this.filteredCount>0?l=`${this.filteredCount}`:j<e&&(l=`${j}+`),(0,d.qy)`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${l}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${(0,k.J)(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets?"fg-300":"accent-100"}
      ></wui-list-wallet>
    `}onAllWallets(){m.E.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),n.I.push("AllWallets")}};z([(0,e.MZ)()],A.prototype,"tabIdx",void 0),z([(0,e.wk)()],A.prototype,"connectors",void 0),z([(0,e.wk)()],A.prototype,"count",void 0),z([(0,e.wk)()],A.prototype,"filteredCount",void 0),z([(0,e.wk)()],A.prototype,"isFetchingRecommendedWallets",void 0),A=z([(0,j.EM)("w3m-all-wallets-widget")],A);var B=c(40190),C=c(32243),D=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let E=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=l.a.state.connectors,this.unsubscribe.push(l.a.subscribeKey("connectors",a=>this.connectors=a))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){let a=this.connectors.filter(a=>"ANNOUNCED"===a.type);return a?.length?(0,d.qy)`
      <wui-flex flexDirection="column" gap="xs">
        ${a.filter(C.g.showConnector).map(a=>(0,d.qy)`
              <wui-list-wallet
                imageSrc=${(0,k.J)(B.$.getConnectorImage(a))}
                name=${a.name??"Unknown"}
                @click=${()=>this.onConnector(a)}
                tagVariant="success"
                tagLabel="installed"
                data-testid=${`wallet-selector-${a.id}`}
                .installed=${!0}
                tabIdx=${(0,k.J)(this.tabIdx)}
              >
              </wui-list-wallet>
            `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(a){"walletConnect"===a.id?f.w.isMobile()?n.I.push("AllWallets"):n.I.push("ConnectingWalletConnect"):n.I.push("ConnectingExternal",{connector:a})}};D([(0,e.MZ)()],E.prototype,"tabIdx",void 0),D([(0,e.wk)()],E.prototype,"connectors",void 0),E=D([(0,j.EM)("w3m-connect-announced-widget")],E);var F=c(86402),G=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let H=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=l.a.state.connectors,this.loading=!1,this.unsubscribe.push(l.a.subscribeKey("connectors",a=>this.connectors=a)),f.w.isTelegram()&&f.w.isIos()&&(this.loading=!F.x.state.wcUri,this.unsubscribe.push(F.x.subscribeKey("wcUri",a=>this.loading=!a)))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){let{customWallets:a}=h.H.state;if(!a?.length)return this.style.cssText="display: none",null;let b=this.filterOutDuplicateWallets(a);return(0,d.qy)`<wui-flex flexDirection="column" gap="xs">
      ${b.map(a=>(0,d.qy)`
          <wui-list-wallet
            imageSrc=${(0,k.J)(B.$.getWalletImage(a))}
            name=${a.name??"Unknown"}
            @click=${()=>this.onConnectWallet(a)}
            data-testid=${`wallet-selector-${a.id}`}
            tabIdx=${(0,k.J)(this.tabIdx)}
            ?loading=${this.loading}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`}filterOutDuplicateWallets(a){let b=i.i.getRecentWallets(),c=this.connectors.map(a=>a.info?.rdns).filter(Boolean),d=b.map(a=>a.rdns).filter(Boolean),e=c.concat(d);if(e.includes("io.metamask.mobile")&&f.w.isMobile()){let a=e.indexOf("io.metamask.mobile");e[a]="io.metamask"}return a.filter(a=>!e.includes(String(a?.rdns)))}onConnectWallet(a){this.loading||n.I.push("ConnectingWalletConnect",{wallet:a})}};G([(0,e.MZ)()],H.prototype,"tabIdx",void 0),G([(0,e.wk)()],H.prototype,"connectors",void 0),G([(0,e.wk)()],H.prototype,"loading",void 0),H=G([(0,j.EM)("w3m-connect-custom-widget")],H);var I=c(85601),J=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let K=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=l.a.state.connectors,this.unsubscribe.push(l.a.subscribeKey("connectors",a=>this.connectors=a))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){let a=this.connectors.filter(a=>"EXTERNAL"===a.type).filter(C.g.showConnector).filter(a=>a.id!==I.o.CONNECTOR_ID.COINBASE_SDK);return a?.length?(0,d.qy)`
      <wui-flex flexDirection="column" gap="xs">
        ${a.map(a=>(0,d.qy)`
            <wui-list-wallet
              imageSrc=${(0,k.J)(B.$.getConnectorImage(a))}
              .installed=${!0}
              name=${a.name??"Unknown"}
              data-testid=${`wallet-selector-external-${a.id}`}
              @click=${()=>this.onConnector(a)}
              tabIdx=${(0,k.J)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(a){n.I.push("ConnectingExternal",{connector:a})}};J([(0,e.MZ)()],K.prototype,"tabIdx",void 0),J([(0,e.wk)()],K.prototype,"connectors",void 0),K=J([(0,j.EM)("w3m-connect-external-widget")],K);var L=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let M=class extends d.WF{constructor(){super(...arguments),this.tabIdx=void 0,this.wallets=[]}render(){return this.wallets.length?(0,d.qy)`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(a=>(0,d.qy)`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${a.id}`}
              imageSrc=${(0,k.J)(B.$.getWalletImage(a))}
              name=${a.name??"Unknown"}
              @click=${()=>this.onConnectWallet(a)}
              tabIdx=${(0,k.J)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(a){l.a.selectWalletConnector(a)}};L([(0,e.MZ)()],M.prototype,"tabIdx",void 0),L([(0,e.MZ)()],M.prototype,"wallets",void 0),M=L([(0,j.EM)("w3m-connect-featured-widget")],M);var N=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let O=class extends d.WF{constructor(){super(...arguments),this.tabIdx=void 0,this.connectors=[]}render(){let a=this.connectors.filter(C.g.showConnector);return 0===a.length?(this.style.cssText="display: none",null):(0,d.qy)`
      <wui-flex flexDirection="column" gap="xs">
        ${a.map(a=>(0,d.qy)`
            <wui-list-wallet
              imageSrc=${(0,k.J)(B.$.getConnectorImage(a))}
              .installed=${!0}
              name=${a.name??"Unknown"}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${a.id}`}
              @click=${()=>this.onConnector(a)}
              tabIdx=${(0,k.J)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `}onConnector(a){l.a.setActiveConnector(a),n.I.push("ConnectingExternal",{connector:a})}};N([(0,e.MZ)()],O.prototype,"tabIdx",void 0),N([(0,e.MZ)()],O.prototype,"connectors",void 0),O=N([(0,j.EM)("w3m-connect-injected-widget")],O);var P=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let Q=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=l.a.state.connectors,this.unsubscribe.push(l.a.subscribeKey("connectors",a=>this.connectors=a))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){let a=this.connectors.filter(a=>"MULTI_CHAIN"===a.type&&"WalletConnect"!==a.name);return a?.length?(0,d.qy)`
      <wui-flex flexDirection="column" gap="xs">
        ${a.map(a=>(0,d.qy)`
            <wui-list-wallet
              imageSrc=${(0,k.J)(B.$.getConnectorImage(a))}
              .installed=${!0}
              name=${a.name??"Unknown"}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${a.id}`}
              @click=${()=>this.onConnector(a)}
              tabIdx=${(0,k.J)(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(a){l.a.setActiveConnector(a),n.I.push("ConnectingMultiChain")}};P([(0,e.MZ)()],Q.prototype,"tabIdx",void 0),P([(0,e.wk)()],Q.prototype,"connectors",void 0),Q=P([(0,j.EM)("w3m-connect-multi-chain-widget")],Q);var R=c(57339),S=c(58775),T=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let U=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=l.a.state.connectors,this.loading=!1,this.unsubscribe.push(l.a.subscribeKey("connectors",a=>this.connectors=a)),f.w.isTelegram()&&f.w.isIos()&&(this.loading=!F.x.state.wcUri,this.unsubscribe.push(F.x.subscribeKey("wcUri",a=>this.loading=!a)))}render(){let a=i.i.getRecentWallets().filter(a=>!S.A.isExcluded(a)).filter(a=>!this.hasWalletConnector(a)).filter(a=>this.isWalletCompatibleWithCurrentChain(a));return a.length?(0,d.qy)`
      <wui-flex flexDirection="column" gap="xs">
        ${a.map(a=>(0,d.qy)`
            <wui-list-wallet
              imageSrc=${(0,k.J)(B.$.getWalletImage(a))}
              name=${a.name??"Unknown"}
              @click=${()=>this.onConnectWallet(a)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${(0,k.J)(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(a){this.loading||l.a.selectWalletConnector(a)}hasWalletConnector(a){return this.connectors.some(b=>b.id===a.id||b.name===a.name)}isWalletCompatibleWithCurrentChain(a){let b=R.W.state.activeChain;return!b||!a.chains||a.chains.some(a=>b===a.split(":")[0])}};T([(0,e.MZ)()],U.prototype,"tabIdx",void 0),T([(0,e.wk)()],U.prototype,"connectors",void 0),T([(0,e.wk)()],U.prototype,"loading",void 0),U=T([(0,j.EM)("w3m-connect-recent-widget")],U);var V=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let W=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.wallets=[],this.loading=!1,f.w.isTelegram()&&f.w.isIos()&&(this.loading=!F.x.state.wcUri,this.unsubscribe.push(F.x.subscribeKey("wcUri",a=>this.loading=!a)))}render(){let{connectors:a}=l.a.state,{customWallets:b,featuredWalletIds:c}=h.H.state,e=i.i.getRecentWallets(),f=a.find(a=>"walletConnect"===a.id),g=a.filter(a=>"INJECTED"===a.type||"ANNOUNCED"===a.type||"MULTI_CHAIN"===a.type).filter(a=>"Browser Wallet"!==a.name);if(!f)return null;if(c||b||!this.wallets.length)return this.style.cssText="display: none",null;let j=Math.max(0,2-(g.length+e.length)),m=S.A.filterOutDuplicateWallets(this.wallets).slice(0,j);return m.length?(0,d.qy)`
      <wui-flex flexDirection="column" gap="xs">
        ${m.map(a=>(0,d.qy)`
            <wui-list-wallet
              imageSrc=${(0,k.J)(B.$.getWalletImage(a))}
              name=${a?.name??"Unknown"}
              @click=${()=>this.onConnectWallet(a)}
              tabIdx=${(0,k.J)(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(a){if(this.loading)return;let b=l.a.getConnector(a.id,a.rdns);b?n.I.push("ConnectingExternal",{connector:b}):n.I.push("ConnectingWalletConnect",{wallet:a})}};V([(0,e.MZ)()],W.prototype,"tabIdx",void 0),V([(0,e.MZ)()],W.prototype,"wallets",void 0),V([(0,e.wk)()],W.prototype,"loading",void 0),W=V([(0,j.EM)("w3m-connect-recommended-widget")],W);var X=c(69710),Y=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let Z=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=l.a.state.connectors,this.connectorImages=X.j.state.connectorImages,this.unsubscribe.push(l.a.subscribeKey("connectors",a=>this.connectors=a),X.j.subscribeKey("connectorImages",a=>this.connectorImages=a))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){if(f.w.isMobile())return this.style.cssText="display: none",null;let a=this.connectors.find(a=>"walletConnect"===a.id);if(!a)return this.style.cssText="display: none",null;let b=a.imageUrl||this.connectorImages[a?.imageId??""];return(0,d.qy)`
      <wui-list-wallet
        imageSrc=${(0,k.J)(b)}
        name=${a.name??"Unknown"}
        @click=${()=>this.onConnector(a)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${(0,k.J)(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `}onConnector(a){l.a.setActiveConnector(a),n.I.push("ConnectingWalletConnect")}};Y([(0,e.MZ)()],Z.prototype,"tabIdx",void 0),Y([(0,e.wk)()],Z.prototype,"connectors",void 0),Y([(0,e.wk)()],Z.prototype,"connectorImages",void 0),Z=Y([(0,j.EM)("w3m-connect-walletconnect-widget")],Z);let $=(0,d.AH)`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`;var _=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let aa=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=l.a.state.connectors,this.recommended=g.N.state.recommended,this.featured=g.N.state.featured,this.unsubscribe.push(l.a.subscribeKey("connectors",a=>this.connectors=a),g.N.subscribeKey("recommended",a=>this.recommended=a),g.N.subscribeKey("featured",a=>this.featured=a))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){return(0,d.qy)`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){let{custom:a,recent:b,announced:c,injected:e,multiChain:f,recommended:g,featured:h,external:i}=C.g.getConnectorsByType(this.connectors,this.recommended,this.featured);return C.g.getConnectorTypeOrder({custom:a,recent:b,announced:c,injected:e,multiChain:f,recommended:g,featured:h,external:i}).map(a=>{switch(a){case"injected":return(0,d.qy)`
            ${f.length?(0,d.qy)`<w3m-connect-multi-chain-widget
                  tabIdx=${(0,k.J)(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`:null}
            ${c.length?(0,d.qy)`<w3m-connect-announced-widget
                  tabIdx=${(0,k.J)(this.tabIdx)}
                ></w3m-connect-announced-widget>`:null}
            ${e.length?(0,d.qy)`<w3m-connect-injected-widget
                  .connectors=${e}
                  tabIdx=${(0,k.J)(this.tabIdx)}
                ></w3m-connect-injected-widget>`:null}
          `;case"walletConnect":return(0,d.qy)`<w3m-connect-walletconnect-widget
            tabIdx=${(0,k.J)(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;case"recent":return(0,d.qy)`<w3m-connect-recent-widget
            tabIdx=${(0,k.J)(this.tabIdx)}
          ></w3m-connect-recent-widget>`;case"featured":return(0,d.qy)`<w3m-connect-featured-widget
            .wallets=${h}
            tabIdx=${(0,k.J)(this.tabIdx)}
          ></w3m-connect-featured-widget>`;case"custom":return(0,d.qy)`<w3m-connect-custom-widget
            tabIdx=${(0,k.J)(this.tabIdx)}
          ></w3m-connect-custom-widget>`;case"external":return(0,d.qy)`<w3m-connect-external-widget
            tabIdx=${(0,k.J)(this.tabIdx)}
          ></w3m-connect-external-widget>`;case"recommended":return(0,d.qy)`<w3m-connect-recommended-widget
            .wallets=${g}
            tabIdx=${(0,k.J)(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;default:return console.warn(`Unknown connector type: ${a}`),null}})}};aa.styles=$,_([(0,e.MZ)()],aa.prototype,"tabIdx",void 0),_([(0,e.wk)()],aa.prototype,"connectors",void 0),_([(0,e.wk)()],aa.prototype,"recommended",void 0),_([(0,e.wk)()],aa.prototype,"featured",void 0),aa=_([(0,j.EM)("w3m-connector-list")],aa);var ab=c(50957),ac=c(33504);let ad=(0,d.AH)`
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    min-height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`;var ae=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let af=class extends d.WF{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.buttons=[],this.disabled=!1,this.localTabWidth="100px",this.activeTab=0,this.isDense=!1}render(){return this.isDense=this.tabs.length>3,this.style.cssText=`
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `,this.dataset.type=this.isDense?"flex":"block",this.tabs.map((a,b)=>{let c=b===this.activeTab;return(0,d.qy)`
        <button
          ?disabled=${this.disabled}
          @click=${()=>this.onTabClick(b)}
          data-active=${c}
          data-testid="tab-${a.label?.toLowerCase()}"
        >
          ${this.iconTemplate(a)}
          <wui-text variant="small-600" color="inherit"> ${a.label} </wui-text>
        </button>
      `})}firstUpdated(){this.shadowRoot&&this.isDense&&(this.buttons=[...this.shadowRoot.querySelectorAll("button")],setTimeout(()=>{this.animateTabs(0,!0)},0))}iconTemplate(a){return a.icon?(0,d.qy)`<wui-icon size="xs" color="inherit" name=${a.icon}></wui-icon>`:null}onTabClick(a){this.buttons&&this.animateTabs(a,!1),this.activeTab=a,this.onTabChange(a)}animateTabs(a,b){let c=this.buttons[this.activeTab],d=this.buttons[a],e=c?.querySelector("wui-text"),f=d?.querySelector("wui-text"),g=d?.getBoundingClientRect(),h=f?.getBoundingClientRect();c&&e&&!b&&a!==this.activeTab&&(e.animate([{opacity:0}],{duration:50,easing:"ease",fill:"forwards"}),c.animate([{width:"34px"}],{duration:500,easing:"ease",fill:"forwards"})),d&&g&&h&&f&&(a!==this.activeTab||b)&&(this.localTabWidth=`${Math.round(g.width+h.width)+6}px`,d.animate([{width:`${g.width+h.width}px`}],{duration:500*!b,fill:"forwards",easing:"ease"}),f.animate([{opacity:1}],{duration:125*!b,delay:200*!b,fill:"forwards",easing:"ease"}))}};af.styles=[o.W5,o.fD,ad],ae([(0,e.MZ)({type:Array})],af.prototype,"tabs",void 0),ae([(0,e.MZ)()],af.prototype,"onTabChange",void 0),ae([(0,e.MZ)({type:Array})],af.prototype,"buttons",void 0),ae([(0,e.MZ)({type:Boolean})],af.prototype,"disabled",void 0),ae([(0,e.MZ)()],af.prototype,"localTabWidth",void 0),ae([(0,e.wk)()],af.prototype,"activeTab",void 0),ae([(0,e.wk)()],af.prototype,"isDense",void 0),af=ae([(0,p.E)("wui-tabs")],af);var ag=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let ah=class extends d.WF{constructor(){super(...arguments),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0}disconnectCallback(){this.unsubscribe.forEach(a=>a())}render(){let a=this.generateTabs();return(0,d.qy)`
      <wui-flex justifyContent="center" .padding=${["0","0","l","0"]}>
        <wui-tabs .tabs=${a} .onTabChange=${this.onTabChange.bind(this)}></wui-tabs>
      </wui-flex>
    `}generateTabs(){let a=this.platforms.map(a=>{if("browser"===a)return{label:"Browser",icon:"extension",platform:"browser"};if("mobile"===a)return{label:"Mobile",icon:"mobile",platform:"mobile"};if("qrcode"===a)return{label:"Mobile",icon:"mobile",platform:"qrcode"};if("web"===a)return{label:"Webapp",icon:"browser",platform:"web"};if("desktop"===a)return{label:"Desktop",icon:"desktop",platform:"desktop"};return{label:"Browser",icon:"extension",platform:"unsupported"}});return this.platformTabs=a.map(({platform:a})=>a),a}onTabChange(a){let b=this.platformTabs[a];b&&this.onSelectPlatfrom?.(b)}};ag([(0,e.MZ)({type:Array})],ah.prototype,"platforms",void 0),ag([(0,e.MZ)()],ah.prototype,"onSelectPlatfrom",void 0),ah=ag([(0,j.EM)("w3m-connecting-header")],ah);var ai=c(5119);c(79763);let aj=(0,d.AH)`
  :host {
    width: var(--local-width);
    position: relative;
  }

  button {
    border: none;
    border-radius: var(--local-border-radius);
    width: var(--local-width);
    white-space: nowrap;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='md'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-l);
    height: 36px;
  }

  button[data-size='md'][data-icon-left='true'][data-icon-right='false'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-s);
  }

  button[data-size='md'][data-icon-right='true'][data-icon-left='false'] {
    padding: 8.2px var(--wui-spacing-s) 9px var(--wui-spacing-l);
  }

  button[data-size='lg'] {
    padding: var(--wui-spacing-m) var(--wui-spacing-2l);
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='inverse'] {
    background-color: var(--wui-color-inverse-100);
    color: var(--wui-color-inverse-000);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='accent-error'] {
    background: var(--wui-color-error-glass-015);
    color: var(--wui-color-error-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-error-glass-010);
  }

  button[data-variant='accent-success'] {
    background: var(--wui-color-success-glass-015);
    color: var(--wui-color-success-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-success-glass-010);
  }

  button[data-variant='neutral'] {
    background: transparent;
    color: var(--wui-color-fg-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-variant='main']:focus-visible:enabled {
    background-color: var(--wui-color-accent-090);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='inverse']:focus-visible:enabled {
    background-color: var(--wui-color-inverse-100);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent']:focus-visible:enabled {
    background-color: var(--wui-color-accent-glass-010);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent-error']:focus-visible:enabled {
    background: var(--wui-color-error-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-error-100),
      0 0 0 4px var(--wui-color-error-glass-020);
  }
  button[data-variant='accent-success']:focus-visible:enabled {
    background: var(--wui-color-success-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-success-100),
      0 0 0 4px var(--wui-color-success-glass-020);
  }
  button[data-variant='neutral']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='accent-error']:hover:enabled {
      background: var(--wui-color-error-glass-020);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-error']:active:enabled {
      background: var(--wui-color-error-glass-030);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-success']:hover:enabled {
      background: var(--wui-color-success-glass-020);
      color: var(--wui-color-success-100);
    }

    button[data-variant='accent-success']:active:enabled {
      background: var(--wui-color-success-glass-030);
      color: var(--wui-color-success-100);
    }

    button[data-variant='neutral']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='neutral']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }

    button[data-size='lg'][data-icon-left='true'][data-icon-right='false'] {
      padding-left: var(--wui-spacing-m);
    }

    button[data-size='lg'][data-icon-right='true'][data-icon-left='false'] {
      padding-right: var(--wui-spacing-m);
    }
  }

  /* -- Disabled state --------------------------------------------------- */
  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    color: var(--wui-color-gray-glass-020);
    cursor: not-allowed;
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  wui-loading-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: var(--local-opacity-000);
  }
`;var ak=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let al={main:"inverse-100",inverse:"inverse-000",accent:"accent-100","accent-error":"error-100","accent-success":"success-100",neutral:"fg-100",disabled:"gray-glass-020"},am={lg:"paragraph-600",md:"small-600"},an={lg:"md",md:"md"},ao=class extends d.WF{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="main",this.hasIconLeft=!1,this.hasIconRight=!1,this.borderRadius="m"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
    --local-opacity-100: ${+!this.loading};
    --local-opacity-000: ${+!!this.loading};
    --local-border-radius: var(--wui-border-radius-${this.borderRadius});
    `;let a=this.textVariant??am[this.size];return(0,d.qy)`
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled}
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${()=>this.handleSlotLeftChange()}></slot>
        <wui-text variant=${a} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${()=>this.handleSlotRightChange()}></slot>
      </button>
    `}handleSlotLeftChange(){this.hasIconLeft=!0}handleSlotRightChange(){this.hasIconRight=!0}loadingTemplate(){if(this.loading){let a=an[this.size],b=this.disabled?al.disabled:al[this.variant];return(0,d.qy)`<wui-loading-spinner color=${b} size=${a}></wui-loading-spinner>`}return(0,d.qy)``}};ao.styles=[o.W5,o.fD,aj],ak([(0,e.MZ)()],ao.prototype,"size",void 0),ak([(0,e.MZ)({type:Boolean})],ao.prototype,"disabled",void 0),ak([(0,e.MZ)({type:Boolean})],ao.prototype,"fullWidth",void 0),ak([(0,e.MZ)({type:Boolean})],ao.prototype,"loading",void 0),ak([(0,e.MZ)()],ao.prototype,"variant",void 0),ak([(0,e.MZ)({type:Boolean})],ao.prototype,"hasIconLeft",void 0),ak([(0,e.MZ)({type:Boolean})],ao.prototype,"hasIconRight",void 0),ak([(0,e.MZ)()],ao.prototype,"borderRadius",void 0),ak([(0,e.MZ)()],ao.prototype,"textVariant",void 0),ao=ak([(0,p.E)("wui-button")],ao),c(24307);let ap=(0,d.AH)`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`;var aq=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let ar=class extends d.WF{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return(0,d.qy)`
      <button ?disabled=${this.disabled} tabindex=${(0,k.J)(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};ar.styles=[o.W5,o.fD,ap],aq([(0,e.MZ)()],ar.prototype,"tabIdx",void 0),aq([(0,e.MZ)({type:Boolean})],ar.prototype,"disabled",void 0),aq([(0,e.MZ)()],ar.prototype,"color",void 0),ar=aq([(0,p.E)("wui-link")],ar);let as=(0,d.AH)`
  :host {
    display: block;
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  svg {
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  rect {
    fill: none;
    stroke: var(--wui-color-accent-100);
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`;var at=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let au=class extends d.WF{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){let a=this.radius>50?50:this.radius,b=36-a;return(0,d.qy)`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${a}
          stroke-dasharray="${116+b} ${245+b}"
          stroke-dashoffset=${360+1.75*b}
        />
      </svg>
    `}};au.styles=[o.W5,as],at([(0,e.MZ)({type:Number})],au.prototype,"radius",void 0),au=at([(0,p.E)("wui-loading-thumbnail")],au),c(77041);let av=(0,d.AH)`
  button {
    border: none;
    border-radius: var(--wui-border-radius-3xl);
  }

  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='gray'] {
    background-color: transparent;
    color: var(--wui-color-fg-200);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='shade'] {
    background-color: transparent;
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-size='sm'] {
    height: 32px;
    padding: 0 var(--wui-spacing-s);
  }

  button[data-size='md'] {
    height: 40px;
    padding: 0 var(--wui-spacing-l);
  }

  button[data-size='sm'] > wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] > wui-icon {
    width: 14px;
    height: 14px;
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  button.disabled > wui-icon,
  button.disabled > wui-image {
    filter: grayscale(1);
  }

  button[data-variant='main'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  button[data-variant='shade'] > wui-image,
  button[data-variant='gray'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:focus-visible {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='shade']:focus-visible,
    button[data-variant='gray']:focus-visible,
    button[data-variant='shade']:hover,
    button[data-variant='gray']:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    button[data-variant='gray']:active,
    button[data-variant='shade']:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  button.disabled {
    color: var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    pointer-events: none;
  }
`;var aw=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let ax=class extends d.WF{constructor(){super(...arguments),this.variant="accent",this.imageSrc="",this.disabled=!1,this.icon="externalLink",this.size="md",this.text=""}render(){let a="sm"===this.size?"small-600":"paragraph-600";return(0,d.qy)`
      <button
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc?(0,d.qy)`<wui-image src=${this.imageSrc}></wui-image>`:null}
        <wui-text variant=${a} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `}};ax.styles=[o.W5,o.fD,av],aw([(0,e.MZ)()],ax.prototype,"variant",void 0),aw([(0,e.MZ)()],ax.prototype,"imageSrc",void 0),aw([(0,e.MZ)({type:Boolean})],ax.prototype,"disabled",void 0),aw([(0,e.MZ)()],ax.prototype,"icon",void 0),aw([(0,e.MZ)()],ax.prototype,"size",void 0),aw([(0,e.MZ)()],ax.prototype,"text",void 0),ax=aw([(0,p.E)("wui-chip-button")],ax);let ay=(0,d.AH)`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`;var az=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let aA=class extends d.WF{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return(0,d.qy)`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs","2l","1xs","2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `}};aA.styles=[o.W5,o.fD,ay],az([(0,e.MZ)({type:Boolean})],aA.prototype,"disabled",void 0),az([(0,e.MZ)()],aA.prototype,"label",void 0),az([(0,e.MZ)()],aA.prototype,"buttonLabel",void 0),aA=az([(0,p.E)("wui-cta-button")],aA);let aB=(0,d.AH)`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`;var aC=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let aD=class extends d.WF{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;let{name:a,app_store:b,play_store:c,chrome_store:e,homepage:g}=this.wallet,h=f.w.isMobile(),i=f.w.isIos(),k=f.w.isAndroid(),l=[b,c,g,e].filter(Boolean).length>1,m=j.Zv.getTruncateString({string:a,charsStart:12,charsEnd:0,truncate:"end"});return l&&!h?(0,d.qy)`
        <wui-cta-button
          label=${`Don't have ${m}?`}
          buttonLabel="Get"
          @click=${()=>n.I.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!l&&g?(0,d.qy)`
        <wui-cta-button
          label=${`Don't have ${m}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:b&&i?(0,d.qy)`
        <wui-cta-button
          label=${`Don't have ${m}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:c&&k?(0,d.qy)`
        <wui-cta-button
          label=${`Don't have ${m}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){this.wallet?.app_store&&f.w.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&f.w.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&f.w.openHref(this.wallet.homepage,"_blank")}};aD.styles=[aB],aC([(0,e.MZ)({type:Object})],aD.prototype,"wallet",void 0),aD=aC([(0,j.EM)("w3m-mobile-download-links")],aD);let aE=(0,d.AH)`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }
`;var aF=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};class aG extends d.WF{constructor(){super(),this.wallet=n.I.state.data?.wallet,this.connector=n.I.state.data?.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=B.$.getWalletImage(this.wallet)??B.$.getConnectorImage(this.connector),this.name=this.wallet?.name??this.connector?.name??"Wallet",this.isRetrying=!1,this.uri=F.x.state.wcUri,this.error=F.x.state.wcError,this.ready=!1,this.showRetry=!1,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(F.x.subscribeKey("wcUri",a=>{this.uri=a,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,this.onConnect?.())}),F.x.subscribeKey("wcError",a=>this.error=a)),(f.w.isTelegram()||f.w.isSafari())&&f.w.isIos()&&F.x.state.wcUri&&this.onConnect?.()}firstUpdated(){this.onAutoConnect?.(),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(a=>a()),F.x.setWcError(!1),clearTimeout(this.timeout)}render(){this.onRender?.(),this.onShowRetry();let a=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel,b=`Continue in ${this.name}`;return this.error&&(b="Connection declined"),(0,d.qy)`
      <wui-flex
        data-error=${(0,k.J)(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${(0,k.J)(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error?"error-100":"fg-100"}>
            ${b}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${a}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?(0,d.qy)`
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying||this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            `:null}
      </wui-flex>

      ${this.isWalletConnect?(0,d.qy)`
            <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onShowRetry(){if(this.error&&!this.showRetry){this.showRetry=!0;let a=this.shadowRoot?.querySelector("wui-button");a?.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"})}}onTryAgain(){F.x.setWcError(!1),this.onRetry?(this.isRetrying=!0,this.onRetry?.()):this.onConnect?.()}loaderTemplate(){let a=ai.W.state.themeVariables["--w3m-border-radius-master"],b=a?parseInt(a.replace("px",""),10):4;return(0,d.qy)`<wui-loading-thumbnail radius=${9*b}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(f.w.copyToClopboard(this.uri),ac.P.showSuccess("Link copied"))}catch{ac.P.showError("Failed to copy")}}}aG.styles=aE,aF([(0,e.wk)()],aG.prototype,"isRetrying",void 0),aF([(0,e.wk)()],aG.prototype,"uri",void 0),aF([(0,e.wk)()],aG.prototype,"error",void 0),aF([(0,e.wk)()],aG.prototype,"ready",void 0),aF([(0,e.wk)()],aG.prototype,"showRetry",void 0),aF([(0,e.wk)()],aG.prototype,"secondaryBtnLabel",void 0),aF([(0,e.wk)()],aG.prototype,"secondaryLabel",void 0),aF([(0,e.wk)()],aG.prototype,"isLoading",void 0),aF([(0,e.MZ)({type:Boolean})],aG.prototype,"isMobile",void 0),aF([(0,e.MZ)()],aG.prototype,"onRetry",void 0);let aH=class extends aG{constructor(){if(super(),!this.wallet)throw Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),m.E.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}async onConnectProxy(){try{this.error=!1;let{connectors:a}=l.a.state,b=a.find(a=>"ANNOUNCED"===a.type&&a.info?.rdns===this.wallet?.rdns||"INJECTED"===a.type||a.name===this.wallet?.name);if(b)await F.x.connectExternal(b,b.chain);else throw Error("w3m-connecting-wc-browser: No connector found");ab.W.close(),m.E.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:this.wallet?.name||"Unknown"}})}catch(a){m.E.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:a?.message??"Unknown"}}),this.error=!0}}};aH=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,j.EM)("w3m-connecting-wc-browser")],aH);let aI=class extends aG{constructor(){if(super(),!this.wallet)throw Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),m.E.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop"}})}onRenderProxy(){!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onConnectProxy(){if(this.wallet?.desktop_link&&this.uri)try{this.error=!1;let{desktop_link:a,name:b}=this.wallet,{redirect:c,href:d}=f.w.formatNativeUrl(a,this.uri);F.x.setWcLinking({name:b,href:d}),F.x.setRecentWallet(this.wallet),f.w.openHref(c,"_blank")}catch{this.error=!0}}};aI=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,j.EM)("w3m-connecting-wc-desktop")],aI);var aJ=c(851),aK=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let aL=class extends aG{constructor(){if(super(),this.btnLabelTimeout=void 0,this.redirectDeeplink=void 0,this.redirectUniversalLink=void 0,this.target=void 0,this.preferUniversalLinks=h.H.state.experimental_preferUniversalLinks,this.isLoading=!0,this.onConnect=()=>{if(this.wallet?.mobile_link&&this.uri)try{this.error=!1;let{mobile_link:a,link_mode:b,name:c}=this.wallet,{redirect:d,redirectUniversalLink:e,href:g}=f.w.formatNativeUrl(a,this.uri,b);this.redirectDeeplink=d,this.redirectUniversalLink=e,this.target=f.w.isIframe()?"_top":"_self",F.x.setWcLinking({name:c,href:g}),F.x.setRecentWallet(this.wallet),this.preferUniversalLinks&&this.redirectUniversalLink?f.w.openHref(this.redirectUniversalLink,this.target):f.w.openHref(this.redirectDeeplink,this.target)}catch(a){m.E.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:a instanceof Error?a.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw Error("w3m-connecting-wc-mobile: No wallet provided");this.secondaryBtnLabel="Open",this.secondaryLabel=aJ.oU.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.onHandleURI(),this.unsubscribe.push(F.x.subscribeKey("wcUri",()=>{this.onHandleURI()})),m.E.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile"}})}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.btnLabelTimeout)}onHandleURI(){this.isLoading=!this.uri,!this.ready&&this.uri&&(this.ready=!0,this.onConnect?.())}onTryAgain(){F.x.setWcError(!1),this.onConnect?.()}};aK([(0,e.wk)()],aL.prototype,"redirectDeeplink",void 0),aK([(0,e.wk)()],aL.prototype,"redirectUniversalLink",void 0),aK([(0,e.wk)()],aL.prototype,"target",void 0),aK([(0,e.wk)()],aL.prototype,"preferUniversalLinks",void 0),aK([(0,e.wk)()],aL.prototype,"isLoading",void 0),aL=aK([(0,j.EM)("w3m-connecting-wc-mobile")],aL);var aM=c(34351);function aN(a,b,c){return a!==b&&(a-b<0?b-a:a-b)<=c+.1}let aO={generate({uri:a,size:b,logoSize:c,dotColor:e="#141414"}){let f=[],g=function(a,b){let c=Array.prototype.slice.call(aM.create(a,{errorCorrectionLevel:"Q"}).modules.data,0),d=Math.sqrt(c.length);return c.reduce((a,b,c)=>(c%d==0?a.push([b]):a[a.length-1].push(b))&&a,[])}(a,0),h=b/g.length,i=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];i.forEach(({x:a,y:b})=>{let c=(g.length-7)*h*a,j=(g.length-7)*h*b;for(let a=0;a<i.length;a+=1){let b=h*(7-2*a);f.push((0,d.JW)`
            <rect
              fill=${2===a?e:"transparent"}
              width=${0===a?b-5:b}
              rx= ${0===a?(b-5)*.45:.45*b}
              ry= ${0===a?(b-5)*.45:.45*b}
              stroke=${e}
              stroke-width=${5*(0===a)}
              height=${0===a?b-5:b}
              x= ${0===a?j+h*a+2.5:j+h*a}
              y= ${0===a?c+h*a+2.5:c+h*a}
            />
          `)}});let j=Math.floor((c+25)/h),k=g.length/2-j/2,l=g.length/2+j/2-1,m=[];g.forEach((a,b)=>{a.forEach((a,c)=>{!g[b][c]||b<7&&c<7||b>g.length-8&&c<7||b<7&&c>g.length-8||b>k&&b<l&&c>k&&c<l||m.push([b*h+h/2,c*h+h/2])})});let n={};return m.forEach(([a,b])=>{n[a]?n[a]?.push(b):n[a]=[b]}),Object.entries(n).map(([a,b])=>{let c=b.filter(a=>b.every(b=>!aN(a,b,h)));return[Number(a),c]}).forEach(([a,b])=>{b.forEach(b=>{f.push((0,d.JW)`<circle cx=${a} cy=${b} fill=${e} r=${h/2.5} />`)})}),Object.entries(n).filter(([a,b])=>b.length>1).map(([a,b])=>{let c=b.filter(a=>b.some(b=>aN(a,b,h)));return[Number(a),c]}).map(([a,b])=>{b.sort((a,b)=>a<b?-1:1);let c=[];for(let a of b){let b=c.find(b=>b.some(b=>aN(a,b,h)));b?b.push(a):c.push([a])}return[a,c.map(a=>[a[0],a[a.length-1]])]}).forEach(([a,b])=>{b.forEach(([b,c])=>{f.push((0,d.JW)`
              <line
                x1=${a}
                x2=${a}
                y1=${b}
                y2=${c}
                stroke=${e}
                stroke-width=${h/1.25}
                stroke-linecap="round"
              />
            `)})}),f}},aP=(0,d.AH)`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: var(--local-size);
  }

  :host([data-theme='dark']) {
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px);
    background-color: var(--wui-color-inverse-100);
    padding: var(--wui-spacing-l);
  }

  :host([data-theme='light']) {
    box-shadow: 0 0 0 1px var(--wui-color-bg-125);
    background-color: var(--wui-color-bg-125);
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: var(--local-icon-color) !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }
`;var aQ=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let aR=class extends d.WF{constructor(){super(...arguments),this.uri="",this.size=0,this.theme="dark",this.imageSrc=void 0,this.alt=void 0,this.arenaClear=void 0,this.farcaster=void 0}render(){return this.dataset.theme=this.theme,this.dataset.clear=String(this.arenaClear),this.style.cssText=`
     --local-size: ${this.size}px;
     --local-icon-color: ${this.color??"#3396ff"}
    `,(0,d.qy)`${this.templateVisual()} ${this.templateSvg()}`}templateSvg(){let a="light"===this.theme?this.size:this.size-32;return(0,d.JW)`
      <svg height=${a} width=${a}>
        ${aO.generate({uri:this.uri,size:a,logoSize:this.arenaClear?0:a/4,dotColor:this.color})}
      </svg>
    `}templateVisual(){return this.imageSrc?(0,d.qy)`<wui-image src=${this.imageSrc} alt=${this.alt??"logo"}></wui-image>`:this.farcaster?(0,d.qy)`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`:(0,d.qy)`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};aR.styles=[o.W5,aP],aQ([(0,e.MZ)()],aR.prototype,"uri",void 0),aQ([(0,e.MZ)({type:Number})],aR.prototype,"size",void 0),aQ([(0,e.MZ)()],aR.prototype,"theme",void 0),aQ([(0,e.MZ)()],aR.prototype,"imageSrc",void 0),aQ([(0,e.MZ)()],aR.prototype,"alt",void 0),aQ([(0,e.MZ)()],aR.prototype,"color",void 0),aQ([(0,e.MZ)({type:Boolean})],aR.prototype,"arenaClear",void 0),aQ([(0,e.MZ)({type:Boolean})],aR.prototype,"farcaster",void 0),aR=aQ([(0,p.E)("wui-qr-code")],aR);let aS=(0,d.AH)`
  :host {
    display: block;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-200) 5%,
      var(--wui-color-bg-200) 48%,
      var(--wui-color-bg-300) 55%,
      var(--wui-color-bg-300) 60%,
      var(--wui-color-bg-300) calc(60% + 10px),
      var(--wui-color-bg-200) calc(60% + 12px),
      var(--wui-color-bg-200) 100%
    );
    background-size: 250%;
    animation: shimmer 3s linear infinite reverse;
  }

  :host([variant='light']) {
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-150) 5%,
      var(--wui-color-bg-150) 48%,
      var(--wui-color-bg-200) 55%,
      var(--wui-color-bg-200) 60%,
      var(--wui-color-bg-200) calc(60% + 10px),
      var(--wui-color-bg-150) calc(60% + 12px),
      var(--wui-color-bg-150) 100%
    );
    background-size: 250%;
  }

  @keyframes shimmer {
    from {
      background-position: -250% 0;
    }
    to {
      background-position: 250% 0;
    }
  }
`;var aT=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let aU=class extends d.WF{constructor(){super(...arguments),this.width="",this.height="",this.borderRadius="m",this.variant="default"}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
      border-radius: clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px);
    `,(0,d.qy)`<slot></slot>`}};aU.styles=[aS],aT([(0,e.MZ)()],aU.prototype,"width",void 0),aT([(0,e.MZ)()],aU.prototype,"height",void 0),aT([(0,e.MZ)()],aU.prototype,"borderRadius",void 0),aT([(0,e.MZ)()],aU.prototype,"variant",void 0),aU=aT([(0,p.E)("wui-shimmer")],aU);let aV=(0,d.AH)`
  .reown-logo {
    height: var(--wui-spacing-xxl);
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    opacity: 0.9;
  }
`,aW=class extends d.WF{render(){return(0,d.qy)`
      <a
        data-testid="ux-branding-reown"
        href=${"https://reown.com"}
        rel="noreferrer"
        target="_blank"
        style="text-decoration: none;"
      >
        <wui-flex
          justifyContent="center"
          alignItems="center"
          gap="xs"
          .padding=${["0","0","l","0"]}
        >
          <wui-text variant="small-500" color="fg-100"> UX by </wui-text>
          <wui-icon name="reown" size="xxxl" class="reown-logo"></wui-icon>
        </wui-flex>
      </a>
    `}};aW.styles=[o.W5,o.fD,aV],aW=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,p.E)("wui-ux-by-reown")],aW);let aX=(0,d.AH)`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`,aY=class extends aG{constructor(){super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate),m.E.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet?.name??"WalletConnect",platform:"qrcode"}})}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribe?.forEach(a=>a()),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),(0,d.qy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","xl","xl","xl"]}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;let a=this.getBoundingClientRect().width-40,b=this.wallet?this.wallet.name:void 0;return F.x.setWcLinking(void 0),F.x.setRecentWallet(this.wallet),(0,d.qy)` <wui-qr-code
      size=${a}
      theme=${ai.W.state.themeMode}
      uri=${this.uri}
      imageSrc=${(0,k.J)(B.$.getWalletImage(this.wallet))}
      color=${(0,k.J)(ai.W.state.themeVariables["--w3m-qr-color"])}
      alt=${(0,k.J)(b)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){let a=!this.uri||!this.ready;return(0,d.qy)`<wui-link
      .disabled=${a}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}};aY.styles=aX,aY=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,j.EM)("w3m-connecting-wc-qrcode")],aY);let aZ=class extends d.WF{constructor(){if(super(),this.wallet=n.I.state.data?.wallet,!this.wallet)throw Error("w3m-connecting-wc-unsupported: No wallet provided");m.E.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}render(){return(0,d.qy)`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${(0,k.J)(B.$.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};aZ=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,j.EM)("w3m-connecting-wc-unsupported")],aZ);var a$=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let a_=class extends aG{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel=aJ.oU.CONNECT_LABELS.MOBILE,this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(F.x.subscribeKey("wcUri",()=>{this.updateLoadingState()})),m.E.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web"}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){if(this.wallet?.webapp_link&&this.uri)try{this.error=!1;let{webapp_link:a,name:b}=this.wallet,{redirect:c,href:d}=f.w.formatUniversalUrl(a,this.uri);F.x.setWcLinking({name:b,href:d}),F.x.setRecentWallet(this.wallet),f.w.openHref(c,"_blank")}catch{this.error=!0}}};a$([(0,e.wk)()],a_.prototype,"isLoading",void 0),a_=a$([(0,j.EM)("w3m-connecting-wc-web")],a_);var a0=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let a1=class extends d.WF{constructor(){super(),this.wallet=n.I.state.data?.wallet,this.unsubscribe=[],this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!h.H.state.siwx,this.remoteFeatures=h.H.state.remoteFeatures,this.determinePlatforms(),this.initializeConnection(),this.unsubscribe.push(h.H.subscribeKey("remoteFeatures",a=>this.remoteFeatures=a))}disconnectedCallback(){this.unsubscribe.forEach(a=>a())}render(){return(0,d.qy)`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      ${this.reownBrandingTemplate()}
    `}reownBrandingTemplate(){return this.remoteFeatures?.reownBranding?(0,d.qy)`<wui-ux-by-reown></wui-ux-by-reown>`:null}async initializeConnection(a=!1){if("browser"!==this.platform&&(!h.H.state.manualWCControl||a))try{let{wcPairingExpiry:b,status:c}=F.x.state;(a||h.H.state.enableEmbedded||f.w.isPairingExpired(b)||"connecting"===c)&&(await F.x.connectWalletConnect(),this.isSiwxEnabled||ab.W.close())}catch(a){m.E.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:a?.message??"Unknown"}}),F.x.setWcError(!0),ac.P.showError(a.message??"Connection error"),F.x.resetWcConnection(),n.I.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;let{mobile_link:a,desktop_link:b,webapp_link:c,injected:d,rdns:e}=this.wallet,g=d?.map(({injected_id:a})=>a).filter(Boolean),i=[...e?[e]:g??[]],j=!h.H.state.isUniversalProvider&&i.length,k=F.x.checkInstalled(i),l=j&&k,m=b&&!f.w.isMobile();l&&!R.W.state.noAdapters&&this.platforms.push("browser"),a&&this.platforms.push(f.w.isMobile()?"mobile":"qrcode"),c&&this.platforms.push("web"),m&&this.platforms.push("desktop"),l||!j||R.W.state.noAdapters||this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return(0,d.qy)`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return(0,d.qy)`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return(0,d.qy)`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return(0,d.qy)`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return(0,d.qy)`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return(0,d.qy)`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?(0,d.qy)`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(a){let b=this.shadowRoot?.querySelector("div");b&&(await b.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=a,b.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};a0([(0,e.wk)()],a1.prototype,"platform",void 0),a0([(0,e.wk)()],a1.prototype,"platforms",void 0),a0([(0,e.wk)()],a1.prototype,"isSiwxEnabled",void 0),a0([(0,e.wk)()],a1.prototype,"remoteFeatures",void 0),a1=a0([(0,j.EM)("w3m-connecting-wc-view")],a1);var a2=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let a3=class extends d.WF{constructor(){super(...arguments),this.isMobile=f.w.isMobile()}render(){if(this.isMobile){let{featured:a,recommended:b}=g.N.state,{customWallets:c}=h.H.state,e=i.i.getRecentWallets(),f=a.length||b.length||c?.length||e.length;return(0,d.qy)`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${["3xs","s","s","s"]}
      >
        ${f?(0,d.qy)`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return(0,d.qy)`<wui-flex flexDirection="column" .padding=${["0","0","l","0"]}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${["0","m","0","m"]}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`}};a2([(0,e.wk)()],a3.prototype,"isMobile",void 0),a3=a2([(0,j.EM)("w3m-connecting-wc-basic-view")],a3);var a4=c(49422),a5=c(12979),a6=c(76738);let a7=()=>new a8;class a8{}let a9=new WeakMap,ba=(0,a6.u$)(class extends a5.Kq{render(a){return a4.s6}update(a,[b]){let c=b!==this.G;return c&&void 0!==this.G&&this.rt(void 0),(c||this.lt!==this.ct)&&(this.G=b,this.ht=a.options?.host,this.rt(this.ct=a.element)),a4.s6}rt(a){if(this.isConnected||(a=void 0),"function"==typeof this.G){let b=this.ht??globalThis,c=a9.get(b);void 0===c&&(c=new WeakMap,a9.set(b,c)),void 0!==c.get(this.G)&&this.G.call(this.ht,void 0),c.set(this.G,a),void 0!==a&&this.G.call(this.ht,a)}else this.G.value=a}get lt(){return"function"==typeof this.G?a9.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),bb=(0,d.AH)`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 22px;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--wui-color-blue-100);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-002);
    border-radius: 999px;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color;
  }

  span:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
    background-color: var(--wui-color-inverse-100);
    transition: transform var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    will-change: transform;
    border-radius: 50%;
  }

  input:checked + span {
    border-color: var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-blue-100);
  }

  input:not(:checked) + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }
`;var bc=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let bd=class extends d.WF{constructor(){super(...arguments),this.inputElementRef=a7(),this.checked=void 0}render(){return(0,d.qy)`
      <label>
        <input
          ${ba(this.inputElementRef)}
          type="checkbox"
          ?checked=${(0,k.J)(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){this.dispatchEvent(new CustomEvent("switchChange",{detail:this.inputElementRef.value?.checked,bubbles:!0,composed:!0}))}};bd.styles=[o.W5,o.fD,o.ck,bb],bc([(0,e.MZ)({type:Boolean})],bd.prototype,"checked",void 0),bd=bc([(0,p.E)("wui-switch")],bd);let be=(0,d.AH)`
  :host {
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--wui-spacing-1xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`;var bf=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let bg=class extends d.WF{constructor(){super(...arguments),this.checked=void 0}render(){return(0,d.qy)`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${(0,k.J)(this.checked)}></wui-switch>
      </button>
    `}};bg.styles=[o.W5,o.fD,be],bf([(0,e.MZ)({type:Boolean})],bg.prototype,"checked",void 0),bg=bf([(0,p.E)("wui-certified-switch")],bg);let bh=(0,d.AH)`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }

    button:active:enabled {
      background-color: var(--wui-color-fg-225);
    }
  }
`;var bi=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let bj=class extends d.WF{constructor(){super(...arguments),this.icon="copy"}render(){return(0,d.qy)`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `}};bj.styles=[o.W5,o.fD,bh],bi([(0,e.MZ)()],bj.prototype,"icon",void 0),bj=bi([(0,p.E)("wui-input-element")],bj);var bk=c(66705);let bl=(0,d.AH)`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  input {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
    color: var(--wui-color-fg-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
    caret-color: var(--wui-color-accent-100);
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  input:disabled::placeholder,
  input:disabled + wui-icon {
    color: var(--wui-color-fg-300);
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  input:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px var(--wui-spacing-s);
  }

  wui-icon + .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px 36px;
  }

  wui-icon[data-input='sm'] {
    left: var(--wui-spacing-s);
  }

  .wui-size-md {
    padding: 15px var(--wui-spacing-m) var(--wui-spacing-l) var(--wui-spacing-m);
  }

  wui-icon + .wui-size-md,
  wui-loading-spinner + .wui-size-md {
    padding: 10.5px var(--wui-spacing-3xl) 10.5px var(--wui-spacing-3xl);
  }

  wui-icon[data-input='md'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-lg {
    padding: var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-l);
    letter-spacing: var(--wui-letter-spacing-medium-title);
    font-size: var(--wui-font-size-medium-title);
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    color: var(--wui-color-fg-100);
    height: 64px;
  }

  .wui-padding-right-xs {
    padding-right: var(--wui-spacing-xs);
  }

  .wui-padding-right-s {
    padding-right: var(--wui-spacing-s);
  }

  .wui-padding-right-m {
    padding-right: var(--wui-spacing-m);
  }

  .wui-padding-right-l {
    padding-right: var(--wui-spacing-l);
  }

  .wui-padding-right-xl {
    padding-right: var(--wui-spacing-xl);
  }

  .wui-padding-right-2xl {
    padding-right: var(--wui-spacing-2xl);
  }

  .wui-padding-right-3xl {
    padding-right: var(--wui-spacing-3xl);
  }

  .wui-padding-right-4xl {
    padding-right: var(--wui-spacing-4xl);
  }

  .wui-padding-right-5xl {
    padding-right: var(--wui-spacing-5xl);
  }

  wui-icon + .wui-size-lg,
  wui-loading-spinner + .wui-size-lg {
    padding-left: 50px;
  }

  wui-icon[data-input='lg'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-m) 17.25px var(--wui-spacing-m);
  }
  wui-icon + .wui-size-mdl,
  wui-loading-spinner + .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-3xl) 17.25px 40px;
  }
  wui-icon[data-input='mdl'] {
    left: var(--wui-spacing-m);
  }

  input:placeholder-shown ~ ::slotted(wui-input-element),
  input:placeholder-shown ~ ::slotted(wui-icon) {
    opacity: 0;
    pointer-events: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  ::slotted(wui-input-element),
  ::slotted(wui-icon) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  ::slotted(wui-input-element) {
    right: var(--wui-spacing-m);
  }

  ::slotted(wui-icon) {
    right: 0px;
  }
`;var bm=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let bn=class extends d.WF{constructor(){super(...arguments),this.inputElementRef=a7(),this.size="md",this.disabled=!1,this.placeholder="",this.type="text",this.value=""}render(){let a=`wui-padding-right-${this.inputRightPadding}`,b={[`wui-size-${this.size}`]:!0,[a]:!!this.inputRightPadding};return(0,d.qy)`${this.templateIcon()}
      <input
        data-testid="wui-input-text"
        ${ba(this.inputElementRef)}
        class=${(0,bk.H)(b)}
        type=${this.type}
        enterkeyhint=${(0,k.J)(this.enterKeyHint)}
        ?disabled=${this.disabled}
        placeholder=${this.placeholder}
        @input=${this.dispatchInputChangeEvent.bind(this)}
        .value=${this.value||""}
        tabindex=${(0,k.J)(this.tabIdx)}
      />
      <slot></slot>`}templateIcon(){return this.icon?(0,d.qy)`<wui-icon
        data-input=${this.size}
        size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}dispatchInputChangeEvent(){this.dispatchEvent(new CustomEvent("inputChange",{detail:this.inputElementRef.value?.value,bubbles:!0,composed:!0}))}};bn.styles=[o.W5,o.fD,bl],bm([(0,e.MZ)()],bn.prototype,"size",void 0),bm([(0,e.MZ)()],bn.prototype,"icon",void 0),bm([(0,e.MZ)({type:Boolean})],bn.prototype,"disabled",void 0),bm([(0,e.MZ)()],bn.prototype,"placeholder",void 0),bm([(0,e.MZ)()],bn.prototype,"type",void 0),bm([(0,e.MZ)()],bn.prototype,"keyHint",void 0),bm([(0,e.MZ)()],bn.prototype,"value",void 0),bm([(0,e.MZ)()],bn.prototype,"inputRightPadding",void 0),bm([(0,e.MZ)()],bn.prototype,"tabIdx",void 0),bn=bm([(0,p.E)("wui-input-text")],bn);let bo=(0,d.AH)`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`,bp=class extends d.WF{constructor(){super(...arguments),this.inputComponentRef=a7()}render(){return(0,d.qy)`
      <wui-input-text
        ${ba(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `}clearValue(){let a=this.inputComponentRef.value,b=a?.inputElementRef.value;b&&(b.value="",b.focus(),b.dispatchEvent(new Event("input")))}};bp.styles=[o.W5,bo],bp=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,p.E)("wui-search-bar")],bp);let bq=(0,d.JW)`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`,br=(0,d.AH)`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`;var bs=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let bt=class extends d.WF{constructor(){super(...arguments),this.type="wallet"}render(){return(0,d.qy)`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `}shimmerTemplate(){return"network"===this.type?(0,d.qy)` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${bq}`:(0,d.qy)`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}};bt.styles=[o.W5,o.fD,br],bs([(0,e.MZ)()],bt.prototype,"type",void 0),bt=bs([(0,p.E)("wui-card-select-loader")],bt);var bu=c(16627);let bv=(0,d.AH)`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`;var bw=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let bx=class extends d.WF{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&bu.Z.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&bu.Z.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&bu.Z.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&bu.Z.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&bu.Z.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&bu.Z.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&bu.Z.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&bu.Z.getSpacingStyles(this.margin,3)};
    `,(0,d.qy)`<slot></slot>`}};bx.styles=[o.W5,bv],bw([(0,e.MZ)()],bx.prototype,"gridTemplateRows",void 0),bw([(0,e.MZ)()],bx.prototype,"gridTemplateColumns",void 0),bw([(0,e.MZ)()],bx.prototype,"justifyItems",void 0),bw([(0,e.MZ)()],bx.prototype,"alignItems",void 0),bw([(0,e.MZ)()],bx.prototype,"justifyContent",void 0),bw([(0,e.MZ)()],bx.prototype,"alignContent",void 0),bw([(0,e.MZ)()],bx.prototype,"columnGap",void 0),bw([(0,e.MZ)()],bx.prototype,"rowGap",void 0),bw([(0,e.MZ)()],bx.prototype,"gap",void 0),bw([(0,e.MZ)()],bx.prototype,"padding",void 0),bw([(0,e.MZ)()],bx.prototype,"margin",void 0),bx=bw([(0,p.E)("wui-grid")],bx);let by=(0,d.AH)`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-s) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: var(--wui-color-fg-100);
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`;var bz=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let bA=class extends d.WF{constructor(){super(),this.observer=new IntersectionObserver(()=>void 0),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.wallet=void 0,this.observer=new IntersectionObserver(a=>{a.forEach(a=>{a.isIntersecting?(this.visible=!0,this.fetchImageSrc()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){let a=this.wallet?.badge_type==="certified";return(0,d.qy)`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${(0,k.J)(a?"certified":void 0)}
            >${this.wallet?.name}</wui-text
          >
          ${a?(0,d.qy)`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){return(this.visible||this.imageSrc)&&!this.imageLoading?(0,d.qy)`
      <wui-wallet-image
        size="md"
        imageSrc=${(0,k.J)(this.imageSrc)}
        name=${this.wallet?.name}
        .installed=${this.wallet?.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `:this.shimmerTemplate()}shimmerTemplate(){return(0,d.qy)`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=B.$.getWalletImage(this.wallet),this.imageSrc||(this.imageLoading=!0,this.imageSrc=await B.$.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}};bA.styles=by,bz([(0,e.wk)()],bA.prototype,"visible",void 0),bz([(0,e.wk)()],bA.prototype,"imageSrc",void 0),bz([(0,e.wk)()],bA.prototype,"imageLoading",void 0),bz([(0,e.MZ)()],bA.prototype,"wallet",void 0),bA=bz([(0,j.EM)("w3m-all-wallets-list-item")],bA);let bB=(0,d.AH)`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`;var bC=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let bD="local-paginator",bE=class extends d.WF{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!g.N.state.wallets.length,this.wallets=g.N.state.wallets,this.recommended=g.N.state.recommended,this.featured=g.N.state.featured,this.filteredWallets=g.N.state.filteredWallets,this.unsubscribe.push(g.N.subscribeKey("wallets",a=>this.wallets=a),g.N.subscribeKey("recommended",a=>this.recommended=a),g.N.subscribeKey("featured",a=>this.featured=a),g.N.subscribeKey("filteredWallets",a=>this.filteredWallets=a))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){this.unsubscribe.forEach(a=>a()),this.paginationObserver?.disconnect()}render(){return(0,d.qy)`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","s","s","s"]}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){this.loading=!0;let a=this.shadowRoot?.querySelector("wui-grid");a&&(await g.N.fetchWalletsByPage({page:1}),await a.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,a.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(a,b){return[...Array(a)].map(()=>(0,d.qy)`
        <wui-card-select-loader type="wallet" id=${(0,k.J)(b)}></wui-card-select-loader>
      `)}walletsTemplate(){let a=this.filteredWallets?.length>0?f.w.uniqueBy([...this.featured,...this.recommended,...this.filteredWallets],"id"):f.w.uniqueBy([...this.featured,...this.recommended,...this.wallets],"id");return S.A.markWalletsAsInstalled(a).map(a=>(0,d.qy)`
        <w3m-all-wallets-list-item
          @click=${()=>this.onConnectWallet(a)}
          .wallet=${a}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){let{wallets:a,recommended:b,featured:c,count:d}=g.N.state,e=window.innerWidth<352?3:4,f=a.length+b.length,h=Math.ceil(f/e)*e-f+e;return(h-=a.length?c.length%e:0,0===d&&c.length>0)?null:0===d||[...c,...a,...b].length<d?this.shimmerTemplate(h,bD):null}createPaginationObserver(){let a=this.shadowRoot?.querySelector(`#${bD}`);a&&(this.paginationObserver=new IntersectionObserver(([a])=>{if(a?.isIntersecting&&!this.loading){let{page:a,count:b,wallets:c}=g.N.state;c.length<b&&g.N.fetchWalletsByPage({page:a+1})}}),this.paginationObserver.observe(a))}onConnectWallet(a){l.a.selectWalletConnector(a)}};bE.styles=bB,bC([(0,e.wk)()],bE.prototype,"loading",void 0),bC([(0,e.wk)()],bE.prototype,"wallets",void 0),bC([(0,e.wk)()],bE.prototype,"recommended",void 0),bC([(0,e.wk)()],bE.prototype,"featured",void 0),bC([(0,e.wk)()],bE.prototype,"filteredWallets",void 0),bE=bC([(0,j.EM)("w3m-all-wallets-list")],bE);let bF=(0,d.AH)`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;var bG=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let bH=class extends d.WF{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.query=""}render(){return this.onSearch(),this.loading?(0,d.qy)`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await g.N.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){let{search:a}=g.N.state,b=S.A.markWalletsAsInstalled(a);return a.length?(0,d.qy)`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","s","s","s"]}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${b.map(a=>(0,d.qy)`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(a)}
              .wallet=${a}
              data-testid="wallet-search-item-${a.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:(0,d.qy)`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(a){l.a.selectWalletConnector(a)}};bH.styles=bF,bG([(0,e.wk)()],bH.prototype,"loading",void 0),bG([(0,e.MZ)()],bH.prototype,"query",void 0),bG([(0,e.MZ)()],bH.prototype,"badge",void 0),bH=bG([(0,j.EM)("w3m-all-wallets-search")],bH);var bI=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let bJ=class extends d.WF{constructor(){super(...arguments),this.search="",this.onDebouncedSearch=f.w.debounce(a=>{this.search=a})}render(){let a=this.search.length>=2;return(0,d.qy)`
      <wui-flex .padding=${["0","s","s","s"]} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${a||this.badge?(0,d.qy)`<w3m-all-wallets-search
            query=${this.search}
            badge=${(0,k.J)(this.badge)}
          ></w3m-all-wallets-search>`:(0,d.qy)`<w3m-all-wallets-list badge=${(0,k.J)(this.badge)}></w3m-all-wallets-list>`}
    `}onInputChange(a){this.onDebouncedSearch(a.detail)}onClick(){if("certified"===this.badge){this.badge=void 0;return}this.badge="certified",ac.P.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})}qrButtonTemplate(){return f.w.isMobile()?(0,d.qy)`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){n.I.push("ConnectingWalletConnect")}};bI([(0,e.wk)()],bJ.prototype,"search",void 0),bI([(0,e.wk)()],bJ.prototype,"badge",void 0),bJ=bI([(0,j.EM)("w3m-all-wallets-view")],bJ);let bK=(0,d.AH)`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 11px 18px 11px var(--wui-spacing-s);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      color var(--wui-ease-out-power-1) var(--wui-duration-md),
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: color, background-color;
  }

  button[data-iconvariant='square'],
  button[data-iconvariant='square-blue'] {
    padding: 6px 18px 6px 9px;
  }

  button > wui-flex {
    flex: 1;
  }

  button > wui-image {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }

  button > wui-icon {
    width: 36px;
    height: 36px;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  button > wui-icon-box[data-variant='blue'] {
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-005);
  }

  button > wui-icon-box[data-variant='overlay'] {
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='square-blue']::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-accent-glass-010);
    pointer-events: none;
  }

  button > wui-icon:last-child {
    width: 14px;
    height: 14px;
  }

  button:disabled {
    color: var(--wui-color-gray-glass-020);
  }

  button[data-loading='true'] > wui-icon {
    opacity: 0;
  }

  wui-loading-spinner {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`;var bL=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g};let bM=class extends d.WF{constructor(){super(...arguments),this.tabIdx=void 0,this.variant="icon",this.disabled=!1,this.imageSrc=void 0,this.alt=void 0,this.chevron=!1,this.loading=!1}render(){return(0,d.qy)`
      <button
        ?disabled=${!!this.loading||!!this.disabled}
        data-loading=${this.loading}
        data-iconvariant=${(0,k.J)(this.iconVariant)}
        tabindex=${(0,k.J)(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `}visualTemplate(){if("image"===this.variant&&this.imageSrc)return(0,d.qy)`<wui-image src=${this.imageSrc} alt=${this.alt??"list item"}></wui-image>`;if("square"===this.iconVariant&&this.icon&&"icon"===this.variant)return(0,d.qy)`<wui-icon name=${this.icon}></wui-icon>`;if("icon"===this.variant&&this.icon&&this.iconVariant){let a=["blue","square-blue"].includes(this.iconVariant)?"accent-100":"fg-200",b="square-blue"===this.iconVariant?"mdl":"md",c=this.iconSize?this.iconSize:b;return(0,d.qy)`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${c}
          background="transparent"
          iconColor=${a}
          backgroundColor=${a}
          size=${b}
        ></wui-icon-box>
      `}return null}loadingTemplate(){return this.loading?(0,d.qy)`<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>`:(0,d.qy)``}chevronTemplate(){return this.chevron?(0,d.qy)`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`:null}};bM.styles=[o.W5,o.fD,bK],bL([(0,e.MZ)()],bM.prototype,"icon",void 0),bL([(0,e.MZ)()],bM.prototype,"iconSize",void 0),bL([(0,e.MZ)()],bM.prototype,"tabIdx",void 0),bL([(0,e.MZ)()],bM.prototype,"variant",void 0),bL([(0,e.MZ)()],bM.prototype,"iconVariant",void 0),bL([(0,e.MZ)({type:Boolean})],bM.prototype,"disabled",void 0),bL([(0,e.MZ)()],bM.prototype,"imageSrc",void 0),bL([(0,e.MZ)()],bM.prototype,"alt",void 0),bL([(0,e.MZ)({type:Boolean})],bM.prototype,"chevron",void 0),bL([(0,e.MZ)({type:Boolean})],bM.prototype,"loading",void 0),bM=bL([(0,p.E)("wui-list-item")],bM);let bN=class extends d.WF{constructor(){super(...arguments),this.wallet=n.I.state.data?.wallet}render(){if(!this.wallet)throw Error("w3m-downloads-view");return(0,d.qy)`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s","s","l","s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){return this.wallet?.chrome_store?(0,d.qy)`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){return this.wallet?.app_store?(0,d.qy)`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){return this.wallet?.play_store?(0,d.qy)`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){return this.wallet?.homepage?(0,d.qy)`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){this.wallet?.chrome_store&&f.w.openHref(this.wallet.chrome_store,"_blank")}onAppStore(){this.wallet?.app_store&&f.w.openHref(this.wallet.app_store,"_blank")}onPlayStore(){this.wallet?.play_store&&f.w.openHref(this.wallet.play_store,"_blank")}onHomePage(){this.wallet?.homepage&&f.w.openHref(this.wallet.homepage,"_blank")}};bN=function(a,b,c,d){var e,f=arguments.length,g=f<3?b:null===d?d=Object.getOwnPropertyDescriptor(b,c):d;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)g=Reflect.decorate(a,b,c,d);else for(var h=a.length-1;h>=0;h--)(e=a[h])&&(g=(f<3?e(g):f>3?e(b,c,g):e(b,c))||g);return f>3&&g&&Object.defineProperty(b,c,g),g}([(0,j.EM)("w3m-downloads-view")],bN)},63759:a=>{function b(){this.buffer=[],this.length=0}b.prototype={get:function(a){let b=Math.floor(a/8);return(this.buffer[b]>>>7-a%8&1)==1},put:function(a,b){for(let c=0;c<b;c++)this.putBit((a>>>b-c-1&1)==1)},getLengthInBits:function(){return this.length},putBit:function(a){let b=Math.floor(this.length/8);this.buffer.length<=b&&this.buffer.push(0),a&&(this.buffer[b]|=128>>>this.length%8),this.length++}},a.exports=b},64064:(a,b,c)=>{"use strict";let d=c(60190),e=c(12557),f=a.exports=function(a,b){this._options=a,a.checkCRC=!1!==a.checkCRC,this._hasIHDR=!1,this._hasIEND=!1,this._emittedHeadersFinished=!1,this._palette=[],this._colorType=0,this._chunks={},this._chunks[d.TYPE_IHDR]=this._handleIHDR.bind(this),this._chunks[d.TYPE_IEND]=this._handleIEND.bind(this),this._chunks[d.TYPE_IDAT]=this._handleIDAT.bind(this),this._chunks[d.TYPE_PLTE]=this._handlePLTE.bind(this),this._chunks[d.TYPE_tRNS]=this._handleTRNS.bind(this),this._chunks[d.TYPE_gAMA]=this._handleGAMA.bind(this),this.read=b.read,this.error=b.error,this.metadata=b.metadata,this.gamma=b.gamma,this.transColor=b.transColor,this.palette=b.palette,this.parsed=b.parsed,this.inflateData=b.inflateData,this.finished=b.finished,this.simpleTransparency=b.simpleTransparency,this.headersFinished=b.headersFinished||function(){}};f.prototype.start=function(){this.read(d.PNG_SIGNATURE.length,this._parseSignature.bind(this))},f.prototype._parseSignature=function(a){let b=d.PNG_SIGNATURE;for(let c=0;c<b.length;c++)if(a[c]!==b[c])return void this.error(Error("Invalid file signature"));this.read(8,this._parseChunkBegin.bind(this))},f.prototype._parseChunkBegin=function(a){let b=a.readUInt32BE(0),c=a.readUInt32BE(4),f="";for(let b=4;b<8;b++)f+=String.fromCharCode(a[b]);let g=!!(32&a[4]);return this._hasIHDR||c===d.TYPE_IHDR?(this._crc=new e,this._crc.write(Buffer.from(f)),this._chunks[c])?this._chunks[c](b):g?void this.read(b+4,this._skipChunk.bind(this)):void this.error(Error("Unsupported critical chunk type "+f)):void this.error(Error("Expected IHDR on beggining"))},f.prototype._skipChunk=function(){this.read(8,this._parseChunkBegin.bind(this))},f.prototype._handleChunkEnd=function(){this.read(4,this._parseChunkEnd.bind(this))},f.prototype._parseChunkEnd=function(a){let b=a.readInt32BE(0),c=this._crc.crc32();if(this._options.checkCRC&&c!==b)return void this.error(Error("Crc error - "+b+" - "+c));this._hasIEND||this.read(8,this._parseChunkBegin.bind(this))},f.prototype._handleIHDR=function(a){this.read(a,this._parseIHDR.bind(this))},f.prototype._parseIHDR=function(a){this._crc.write(a);let b=a.readUInt32BE(0),c=a.readUInt32BE(4),e=a[8],f=a[9],g=a[10],h=a[11],i=a[12];if(8!==e&&4!==e&&2!==e&&1!==e&&16!==e)return void this.error(Error("Unsupported bit depth "+e));if(!(f in d.COLORTYPE_TO_BPP_MAP))return void this.error(Error("Unsupported color type"));if(0!==g)return void this.error(Error("Unsupported compression method"));if(0!==h)return void this.error(Error("Unsupported filter method"));if(0!==i&&1!==i)return void this.error(Error("Unsupported interlace method"));this._colorType=f;let j=d.COLORTYPE_TO_BPP_MAP[this._colorType];this._hasIHDR=!0,this.metadata({width:b,height:c,depth:e,interlace:!!i,palette:!!(f&d.COLORTYPE_PALETTE),color:!!(f&d.COLORTYPE_COLOR),alpha:!!(f&d.COLORTYPE_ALPHA),bpp:j,colorType:f}),this._handleChunkEnd()},f.prototype._handlePLTE=function(a){this.read(a,this._parsePLTE.bind(this))},f.prototype._parsePLTE=function(a){this._crc.write(a);let b=Math.floor(a.length/3);for(let c=0;c<b;c++)this._palette.push([a[3*c],a[3*c+1],a[3*c+2],255]);this.palette(this._palette),this._handleChunkEnd()},f.prototype._handleTRNS=function(a){this.simpleTransparency(),this.read(a,this._parseTRNS.bind(this))},f.prototype._parseTRNS=function(a){if(this._crc.write(a),this._colorType===d.COLORTYPE_PALETTE_COLOR){if(0===this._palette.length)return void this.error(Error("Transparency chunk must be after palette"));if(a.length>this._palette.length)return void this.error(Error("More transparent colors than palette size"));for(let b=0;b<a.length;b++)this._palette[b][3]=a[b];this.palette(this._palette)}this._colorType===d.COLORTYPE_GRAYSCALE&&this.transColor([a.readUInt16BE(0)]),this._colorType===d.COLORTYPE_COLOR&&this.transColor([a.readUInt16BE(0),a.readUInt16BE(2),a.readUInt16BE(4)]),this._handleChunkEnd()},f.prototype._handleGAMA=function(a){this.read(a,this._parseGAMA.bind(this))},f.prototype._parseGAMA=function(a){this._crc.write(a),this.gamma(a.readUInt32BE(0)/d.GAMMA_DIVISION),this._handleChunkEnd()},f.prototype._handleIDAT=function(a){this._emittedHeadersFinished||(this._emittedHeadersFinished=!0,this.headersFinished()),this.read(-a,this._parseIDAT.bind(this,a))},f.prototype._parseIDAT=function(a,b){if(this._crc.write(b),this._colorType===d.COLORTYPE_PALETTE_COLOR&&0===this._palette.length)throw Error("Expected palette not found");this.inflateData(b);let c=a-b.length;c>0?this._handleIDAT(c):this._handleChunkEnd()},f.prototype._handleIEND=function(a){this.read(a,this._parseIEND.bind(this))},f.prototype._parseIEND=function(a){this._crc.write(a),this._hasIEND=!0,this._handleChunkEnd(),this.finished&&this.finished()}},70164:(a,b,c)=>{let d=c(53057);function e(a){this.genPoly=void 0,this.degree=a,this.degree&&this.initialize(this.degree)}e.prototype.initialize=function(a){this.degree=a,this.genPoly=d.generateECPolynomial(this.degree)},e.prototype.encode=function(a){if(!this.genPoly)throw Error("Encoder not initialized");let b=new Uint8Array(a.length+this.degree);b.set(a);let c=d.mod(b,this.genPoly),e=this.degree-c.length;if(e>0){let a=new Uint8Array(this.degree);return a.set(c,e),a}return c},a.exports=e},70356:(a,b,c)=>{let d=c(21418).getSymbolSize;b.getPositions=function(a){let b=d(a);return[[0,0],[b-7,0],[0,b-7]]}},72641:(a,b,c)=>{"use strict";let d=c(60190),e=c(12557),f=c(89130),g=c(22567),h=c(74075),i=a.exports=function(a){if(this._options=a,a.deflateChunkSize=a.deflateChunkSize||32768,a.deflateLevel=null!=a.deflateLevel?a.deflateLevel:9,a.deflateStrategy=null!=a.deflateStrategy?a.deflateStrategy:3,a.inputHasAlpha=null==a.inputHasAlpha||a.inputHasAlpha,a.deflateFactory=a.deflateFactory||h.createDeflate,a.bitDepth=a.bitDepth||8,a.colorType="number"==typeof a.colorType?a.colorType:d.COLORTYPE_COLOR_ALPHA,a.inputColorType="number"==typeof a.inputColorType?a.inputColorType:d.COLORTYPE_COLOR_ALPHA,-1===[d.COLORTYPE_GRAYSCALE,d.COLORTYPE_COLOR,d.COLORTYPE_COLOR_ALPHA,d.COLORTYPE_ALPHA].indexOf(a.colorType))throw Error("option color type:"+a.colorType+" is not supported at present");if(-1===[d.COLORTYPE_GRAYSCALE,d.COLORTYPE_COLOR,d.COLORTYPE_COLOR_ALPHA,d.COLORTYPE_ALPHA].indexOf(a.inputColorType))throw Error("option input color type:"+a.inputColorType+" is not supported at present");if(8!==a.bitDepth&&16!==a.bitDepth)throw Error("option bit depth:"+a.bitDepth+" is not supported at present")};i.prototype.getDeflateOptions=function(){return{chunkSize:this._options.deflateChunkSize,level:this._options.deflateLevel,strategy:this._options.deflateStrategy}},i.prototype.createDeflate=function(){return this._options.deflateFactory(this.getDeflateOptions())},i.prototype.filterData=function(a,b,c){let e=f(a,b,c,this._options),h=d.COLORTYPE_TO_BPP_MAP[this._options.colorType];return g(e,b,c,this._options,h)},i.prototype._packChunk=function(a,b){let c=b?b.length:0,d=Buffer.alloc(c+12);return d.writeUInt32BE(c,0),d.writeUInt32BE(a,4),b&&b.copy(d,8),d.writeInt32BE(e.crc32(d.slice(4,d.length-4)),d.length-4),d},i.prototype.packGAMA=function(a){let b=Buffer.alloc(4);return b.writeUInt32BE(Math.floor(a*d.GAMMA_DIVISION),0),this._packChunk(d.TYPE_gAMA,b)},i.prototype.packIHDR=function(a,b){let c=Buffer.alloc(13);return c.writeUInt32BE(a,0),c.writeUInt32BE(b,4),c[8]=this._options.bitDepth,c[9]=this._options.colorType,c[10]=0,c[11]=0,c[12]=0,this._packChunk(d.TYPE_IHDR,c)},i.prototype.packIDAT=function(a){return this._packChunk(d.TYPE_IDAT,a)},i.prototype.packIEND=function(){return this._packChunk(d.TYPE_IEND,null)}},73349:a=>{a.exports=function(){return"function"==typeof Promise&&Promise.prototype&&Promise.prototype.then}},74508:a=>{function b(a){if(!a||a<1)throw Error("BitMatrix size must be defined and greater than 0");this.size=a,this.data=new Uint8Array(a*a),this.reservedBit=new Uint8Array(a*a)}b.prototype.set=function(a,b,c,d){let e=a*this.size+b;this.data[e]=c,d&&(this.reservedBit[e]=!0)},b.prototype.get=function(a,b){return this.data[a*this.size+b]},b.prototype.xor=function(a,b,c){this.data[a*this.size+b]^=c},b.prototype.isReserved=function(a,b){return this.reservedBit[a*this.size+b]},a.exports=b},78187:(a,b,c)=>{let d=c(73349),e=c(82301),f=c(16943),g=c(35116);function h(a,b,c,f,g){let h=[].slice.call(arguments,1),i=h.length,j="function"==typeof h[i-1];if(!j&&!d())throw Error("Callback required as last argument");if(j){if(i<2)throw Error("Too few arguments provided");2===i?(g=c,c=b,b=f=void 0):3===i&&(b.getContext&&void 0===g?(g=f,f=void 0):(g=f,f=c,c=b,b=void 0))}else{if(i<1)throw Error("Too few arguments provided");return 1===i?(c=b,b=f=void 0):2!==i||b.getContext||(f=c,c=b,b=void 0),new Promise(function(d,g){try{let g=e.create(c,f);d(a(g,b,f))}catch(a){g(a)}})}try{let d=e.create(c,f);g(null,a(d,b,f))}catch(a){g(a)}}e.create,b.toCanvas=h.bind(null,f.render),h.bind(null,f.renderToDataURL),h.bind(null,function(a,b,c){return g.render(a,c)})},80529:(a,b,c)=>{b.render=c(35116).render,b.renderToFile=function(a,d,e,f){void 0===f&&(f=e,e=void 0);let g=c(29021),h=b.render(d,e);g.writeFile(a,'<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'+h,f)}},82301:(a,b,c)=>{let d=c(21418),e=c(90569),f=c(63759),g=c(74508),h=c(38869),i=c(70356),j=c(19276),k=c(20242),l=c(70164),m=c(85383),n=c(61589),o=c(3296),p=c(89569);function q(a,b,c){let d,e,f=a.size,g=n.getEncodedBits(b,c);for(d=0;d<15;d++)e=(g>>d&1)==1,d<6?a.set(d,8,e,!0):d<8?a.set(d+1,8,e,!0):a.set(f-15+d,8,e,!0),d<8?a.set(8,f-d-1,e,!0):d<9?a.set(8,15-d-1+1,e,!0):a.set(8,15-d-1,e,!0);a.set(f-8,8,1,!0)}b.create=function(a,b){let c,n;if(void 0===a||""===a)throw Error("No input text");let r=e.M;return void 0!==b&&(r=e.from(b.errorCorrectionLevel,e.M),c=m.from(b.version),n=j.from(b.maskPattern),b.toSJISFunc&&d.setToSJISFunction(b.toSJISFunc)),function(a,b,c,e){let n;if(Array.isArray(a))n=p.fromArray(a);else if("string"==typeof a){let d=b;if(!d){let b=p.rawSplit(a);d=m.getBestVersionForData(b,c)}n=p.fromString(a,d||40)}else throw Error("Invalid data");let r=m.getBestVersionForData(n,c);if(!r)throw Error("The amount of data is too big to be stored in a QR Code");if(b){if(b<r)throw Error("\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: "+r+".\n")}else b=r;let s=function(a,b,c){let e=new f;c.forEach(function(b){e.put(b.mode.bit,4),e.put(b.getLength(),o.getCharCountIndicator(b.mode,a)),b.write(e)});let g=(d.getSymbolTotalCodewords(a)-k.getTotalCodewordsCount(a,b))*8;for(e.getLengthInBits()+4<=g&&e.put(0,4);e.getLengthInBits()%8!=0;)e.putBit(0);let h=(g-e.getLengthInBits())/8;for(let a=0;a<h;a++)e.put(a%2?17:236,8);return function(a,b,c){let e,f,g=d.getSymbolTotalCodewords(b),h=g-k.getTotalCodewordsCount(b,c),i=k.getBlocksCount(b,c),j=g%i,m=i-j,n=Math.floor(g/i),o=Math.floor(h/i),p=o+1,q=n-o,r=new l(q),s=0,t=Array(i),u=Array(i),v=0,w=new Uint8Array(a.buffer);for(let a=0;a<i;a++){let b=a<m?o:p;t[a]=w.slice(s,s+b),u[a]=r.encode(t[a]),s+=b,v=Math.max(v,b)}let x=new Uint8Array(g),y=0;for(e=0;e<v;e++)for(f=0;f<i;f++)e<t[f].length&&(x[y++]=t[f][e]);for(e=0;e<q;e++)for(f=0;f<i;f++)x[y++]=u[f][e];return x}(e,a,b)}(b,c,n),t=new g(d.getSymbolSize(b));!function(a,b){let c=a.size,d=i.getPositions(b);for(let b=0;b<d.length;b++){let e=d[b][0],f=d[b][1];for(let b=-1;b<=7;b++)if(!(e+b<=-1)&&!(c<=e+b))for(let d=-1;d<=7;d++)f+d<=-1||c<=f+d||(b>=0&&b<=6&&(0===d||6===d)||d>=0&&d<=6&&(0===b||6===b)||b>=2&&b<=4&&d>=2&&d<=4?a.set(e+b,f+d,!0,!0):a.set(e+b,f+d,!1,!0))}}(t,b);let u=t.size;for(let a=8;a<u-8;a++){let b=a%2==0;t.set(a,6,b,!0),t.set(6,a,b,!0)}return!function(a,b){let c=h.getPositions(b);for(let b=0;b<c.length;b++){let d=c[b][0],e=c[b][1];for(let b=-2;b<=2;b++)for(let c=-2;c<=2;c++)-2===b||2===b||-2===c||2===c||0===b&&0===c?a.set(d+b,e+c,!0,!0):a.set(d+b,e+c,!1,!0)}}(t,b),q(t,c,0),b>=7&&function(a,b){let c,d,e,f=a.size,g=m.getEncodedBits(b);for(let b=0;b<18;b++)c=Math.floor(b/3),d=b%3+f-8-3,e=(g>>b&1)==1,a.set(c,d,e,!0),a.set(d,c,e,!0)}(t,b),!function(a,b){let c=a.size,d=-1,e=c-1,f=7,g=0;for(let h=c-1;h>0;h-=2)for(6===h&&h--;;){for(let c=0;c<2;c++)if(!a.isReserved(e,h-c)){let d=!1;g<b.length&&(d=(b[g]>>>f&1)==1),a.set(e,h-c,d),-1==--f&&(g++,f=7)}if((e+=d)<0||c<=e){e-=d,d=-d;break}}}(t,s),isNaN(e)&&(e=j.getBestMask(t,q.bind(null,t,c))),j.applyMask(e,t),q(t,c,e),{modules:t,version:b,errorCorrectionLevel:c,maskPattern:e,segments:n}}(a,c,r,n)}},83462:(a,b,c)=>{"use strict";let d=c(28354),e=c(17462),f=c(53923),g=a.exports=function(a){e.call(this);let b=[],c=this;this._filter=new f(a,{read:this.read.bind(this),write:function(a){b.push(a)},complete:function(){c.emit("complete",Buffer.concat(b))}}),this._filter.start()};d.inherits(g,e)},83945:(a,b,c)=>{"use strict";let d=c(28354),e=c(74075),f=c(17462),g=c(83462),h=c(64064),i=c(18721),j=c(37689),k=a.exports=function(a){f.call(this),this._parser=new h(a,{read:this.read.bind(this),error:this._handleError.bind(this),metadata:this._handleMetaData.bind(this),gamma:this.emit.bind(this,"gamma"),palette:this._handlePalette.bind(this),transColor:this._handleTransColor.bind(this),finished:this._finished.bind(this),inflateData:this._inflateData.bind(this),simpleTransparency:this._simpleTransparency.bind(this),headersFinished:this._headersFinished.bind(this)}),this._options=a,this.writable=!0,this._parser.start()};d.inherits(k,f),k.prototype._handleError=function(a){this.emit("error",a),this.writable=!1,this.destroy(),this._inflate&&this._inflate.destroy&&this._inflate.destroy(),this._filter&&(this._filter.destroy(),this._filter.on("error",function(){})),this.errord=!0},k.prototype._inflateData=function(a){if(!this._inflate)if(this._bitmapInfo.interlace)this._inflate=e.createInflate(),this._inflate.on("error",this.emit.bind(this,"error")),this._filter.on("complete",this._complete.bind(this)),this._inflate.pipe(this._filter);else{let a=((this._bitmapInfo.width*this._bitmapInfo.bpp*this._bitmapInfo.depth+7>>3)+1)*this._bitmapInfo.height,b=Math.max(a,e.Z_MIN_CHUNK);this._inflate=e.createInflate({chunkSize:b});let c=a,d=this.emit.bind(this,"error");this._inflate.on("error",function(a){c&&d(a)}),this._filter.on("complete",this._complete.bind(this));let f=this._filter.write.bind(this._filter);this._inflate.on("data",function(a){c&&(a.length>c&&(a=a.slice(0,c)),c-=a.length,f(a))}),this._inflate.on("end",this._filter.end.bind(this._filter))}this._inflate.write(a)},k.prototype._handleMetaData=function(a){this._metaData=a,this._bitmapInfo=Object.create(a),this._filter=new g(this._bitmapInfo)},k.prototype._handleTransColor=function(a){this._bitmapInfo.transColor=a},k.prototype._handlePalette=function(a){this._bitmapInfo.palette=a},k.prototype._simpleTransparency=function(){this._metaData.alpha=!0},k.prototype._headersFinished=function(){this.emit("metadata",this._metaData)},k.prototype._finished=function(){this.errord||(this._inflate?this._inflate.end():this.emit("error","No Inflate block"))},k.prototype._complete=function(a){let b;if(!this.errord){try{let c=i.dataToBitMap(a,this._bitmapInfo);b=j(c,this._bitmapInfo),c=null}catch(a){this._handleError(a);return}this.emit("parsed",b)}}},84368:(a,b,c)=>{let d=c(73349),e=c(82301),f=c(40908),g=c(8972),h=c(11203),i=c(80529);function j(a,b,c){if(void 0===a)throw Error("String required as first argument");if(void 0===c&&(c=b,b={}),"function"!=typeof c)if(d())b=c||{},c=null;else throw Error("Callback required as last argument");return{opts:b,cb:c}}function k(a){switch(a){case"svg":return i;case"txt":case"utf8":return g;default:return f}}function l(a,b,c){if(!c.cb)return new Promise(function(d,f){try{let g=e.create(b,c.opts);return a(g,c.opts,function(a,b){return a?f(a):d(b)})}catch(a){f(a)}});try{let d=e.create(b,c.opts);return a(d,c.opts,c.cb)}catch(a){c.cb(a)}}b.create=e.create,b.toCanvas=c(78187).toCanvas,b.toString=function(a,b,c){let d=j(a,b,c);return l(function(a){switch(a){case"svg":return i;case"terminal":return h;default:return g}}(d.opts?d.opts.type:void 0).render,a,d)},b.toDataURL=function(a,b,c){let d=j(a,b,c);return l(k(d.opts.type).renderToDataURL,a,d)},b.toBuffer=function(a,b,c){let d=j(a,b,c);return l(k(d.opts.type).renderToBuffer,a,d)},b.toFile=function(a,b,c,e){if("string"!=typeof a||"string"!=typeof b&&"object"!=typeof b)throw Error("Invalid argument");if(arguments.length<3&&!d())throw Error("Too few arguments provided");let f=j(b,c,e);return l(k(f.opts.type||a.slice((a.lastIndexOf(".")-1>>>0)+2).toLowerCase()).renderToFile.bind(null,a),b,f)},b.toFileStream=function(a,b,c){if(arguments.length<2)throw Error("Too few arguments provided");let d=j(b,c,a.emit.bind(a,"error"));l(k("png").renderToFileStream.bind(null,a),b,d)}},84587:(a,b,c)=>{"use strict";let d=c(61798),e=c(53923);b.process=function(a,b){let c=[],f=new d(a);return new e(b,{read:f.read.bind(f),write:function(a){c.push(a)},complete:function(){}}).start(),f.process(),Buffer.concat(c)}},85383:(a,b,c)=>{let d=c(21418),e=c(20242),f=c(90569),g=c(3296),h=c(12202),i=d.getBCHDigit(7973);function j(a,b){return g.getCharCountIndicator(a,b)+4}b.from=function(a,b){return h.isValid(a)?parseInt(a,10):b},b.getCapacity=function(a,b,c){if(!h.isValid(a))throw Error("Invalid QR Code version");void 0===c&&(c=g.BYTE);let f=(d.getSymbolTotalCodewords(a)-e.getTotalCodewordsCount(a,b))*8;if(c===g.MIXED)return f;let i=f-j(c,a);switch(c){case g.NUMERIC:return Math.floor(i/10*3);case g.ALPHANUMERIC:return Math.floor(i/11*2);case g.KANJI:return Math.floor(i/13);case g.BYTE:default:return Math.floor(i/8)}},b.getBestVersionForData=function(a,c){let d,e=f.from(c,f.M);if(Array.isArray(a)){if(a.length>1){for(let c=1;c<=40;c++)if(function(a,b){let c=0;return a.forEach(function(a){let d=j(a.mode,b);c+=d+a.getBitsLength()}),c}(a,c)<=b.getCapacity(c,e,g.MIXED))return c;return}if(0===a.length)return 1;d=a[0]}else d=a;return function(a,c,d){for(let e=1;e<=40;e++)if(c<=b.getCapacity(e,d,a))return e}(d.mode,d.getLength(),e)},b.getEncodedBits=function(a){if(!h.isValid(a)||a<7)throw Error("Invalid QR Code version");let b=a<<12;for(;d.getBCHDigit(b)-i>=0;)b^=7973<<d.getBCHDigit(b)-i;return a<<12|b}},89130:(a,b,c)=>{"use strict";let d=c(60190);a.exports=function(a,b,c,e){let f=-1!==[d.COLORTYPE_COLOR_ALPHA,d.COLORTYPE_ALPHA].indexOf(e.colorType);if(e.colorType===e.inputColorType){let b,c=(new DataView(b=new ArrayBuffer(2)).setInt16(0,256,!0),256!==new Int16Array(b)[0]);if(8===e.bitDepth||16===e.bitDepth&&c)return a}let g=16!==e.bitDepth?a:new Uint16Array(a.buffer),h=255,i=d.COLORTYPE_TO_BPP_MAP[e.inputColorType];4!==i||e.inputHasAlpha||(i=3);let j=d.COLORTYPE_TO_BPP_MAP[e.colorType];16===e.bitDepth&&(h=65535,j*=2);let k=Buffer.alloc(b*c*j),l=0,m=0,n=e.bgColor||{};void 0===n.red&&(n.red=h),void 0===n.green&&(n.green=h),void 0===n.blue&&(n.blue=h);for(let a=0;a<c;a++)for(let a=0;a<b;a++){let a=function(){let a,b,c,i=h;switch(e.inputColorType){case d.COLORTYPE_COLOR_ALPHA:i=g[l+3],a=g[l],b=g[l+1],c=g[l+2];break;case d.COLORTYPE_COLOR:a=g[l],b=g[l+1],c=g[l+2];break;case d.COLORTYPE_ALPHA:i=g[l+1],b=a=g[l],c=a;break;case d.COLORTYPE_GRAYSCALE:b=a=g[l],c=a;break;default:throw Error("input color type:"+e.inputColorType+" is not supported at present")}return e.inputHasAlpha&&!f&&(i/=h,a=Math.min(Math.max(Math.round((1-i)*n.red+i*a),0),h),b=Math.min(Math.max(Math.round((1-i)*n.green+i*b),0),h),c=Math.min(Math.max(Math.round((1-i)*n.blue+i*c),0),h)),{red:a,green:b,blue:c,alpha:i}}(g,l);switch(e.colorType){case d.COLORTYPE_COLOR_ALPHA:case d.COLORTYPE_COLOR:8===e.bitDepth?(k[m]=a.red,k[m+1]=a.green,k[m+2]=a.blue,f&&(k[m+3]=a.alpha)):(k.writeUInt16BE(a.red,m),k.writeUInt16BE(a.green,m+2),k.writeUInt16BE(a.blue,m+4),f&&k.writeUInt16BE(a.alpha,m+6));break;case d.COLORTYPE_ALPHA:case d.COLORTYPE_GRAYSCALE:{let b=(a.red+a.green+a.blue)/3;8===e.bitDepth?(k[m]=b,f&&(k[m+1]=a.alpha)):(k.writeUInt16BE(b,m),f&&k.writeUInt16BE(a.alpha,m+2));break}default:throw Error("unrecognised color Type "+e.colorType)}l+=i,m+=j}return k}},89569:(a,b,c)=>{let d=c(3296),e=c(16805),f=c(6465),g=c(17506),h=c(3725),i=c(93340),j=c(21418),k=c(91008);function l(a){return unescape(encodeURIComponent(a)).length}function m(a,b,c){let d,e=[];for(;null!==(d=a.exec(c));)e.push({data:d[0],index:d.index,mode:b,length:d[0].length});return e}function n(a){let b,c,e=m(i.NUMERIC,d.NUMERIC,a),f=m(i.ALPHANUMERIC,d.ALPHANUMERIC,a);return j.isKanjiModeEnabled()?(b=m(i.BYTE,d.BYTE,a),c=m(i.KANJI,d.KANJI,a)):(b=m(i.BYTE_KANJI,d.BYTE,a),c=[]),e.concat(f,b,c).sort(function(a,b){return a.index-b.index}).map(function(a){return{data:a.data,mode:a.mode,length:a.length}})}function o(a,b){switch(b){case d.NUMERIC:return e.getBitsLength(a);case d.ALPHANUMERIC:return f.getBitsLength(a);case d.KANJI:return h.getBitsLength(a);case d.BYTE:return g.getBitsLength(a)}}function p(a,b){let c,i=d.getBestModeForData(a);if((c=d.from(b,i))!==d.BYTE&&c.bit<i.bit)throw Error('"'+a+'" cannot be encoded with mode '+d.toString(c)+".\n Suggested mode is: "+d.toString(i));switch(c===d.KANJI&&!j.isKanjiModeEnabled()&&(c=d.BYTE),c){case d.NUMERIC:return new e(a);case d.ALPHANUMERIC:return new f(a);case d.KANJI:return new h(a);case d.BYTE:return new g(a)}}b.fromArray=function(a){return a.reduce(function(a,b){return"string"==typeof b?a.push(p(b,null)):b.data&&a.push(p(b.data,b.mode)),a},[])},b.fromString=function(a,c){let e=function(a,b){let c={},e={start:{}},f=["start"];for(let g=0;g<a.length;g++){let h=a[g],i=[];for(let a=0;a<h.length;a++){let j=h[a],k=""+g+a;i.push(k),c[k]={node:j,lastCount:0},e[k]={};for(let a=0;a<f.length;a++){let g=f[a];c[g]&&c[g].node.mode===j.mode?(e[g][k]=o(c[g].lastCount+j.length,j.mode)-o(c[g].lastCount,j.mode),c[g].lastCount+=j.length):(c[g]&&(c[g].lastCount=j.length),e[g][k]=o(j.length,j.mode)+4+d.getCharCountIndicator(j.mode,b))}}f=i}for(let a=0;a<f.length;a++)e[f[a]].end=0;return{map:e,table:c}}(function(a){let b=[];for(let c=0;c<a.length;c++){let e=a[c];switch(e.mode){case d.NUMERIC:b.push([e,{data:e.data,mode:d.ALPHANUMERIC,length:e.length},{data:e.data,mode:d.BYTE,length:e.length}]);break;case d.ALPHANUMERIC:b.push([e,{data:e.data,mode:d.BYTE,length:e.length}]);break;case d.KANJI:b.push([e,{data:e.data,mode:d.BYTE,length:l(e.data)}]);break;case d.BYTE:b.push([{data:e.data,mode:d.BYTE,length:l(e.data)}])}}return b}(n(a,j.isKanjiModeEnabled())),c),f=k.find_path(e.map,"start","end"),g=[];for(let a=1;a<f.length-1;a++)g.push(e.table[f[a]].node);return b.fromArray(g.reduce(function(a,b){let c=a.length-1>=0?a[a.length-1]:null;return c&&c.mode===b.mode?a[a.length-1].data+=b.data:a.push(b),a},[]))},b.rawSplit=function(a){return b.fromArray(n(a,j.isKanjiModeEnabled()))}},90569:(a,b)=>{b.L={bit:1},b.M={bit:0},b.Q={bit:3},b.H={bit:2},b.isValid=function(a){return a&&void 0!==a.bit&&a.bit>=0&&a.bit<4},b.from=function(a,c){if(b.isValid(a))return a;try{if("string"!=typeof a)throw Error("Param is not a string");switch(a.toLowerCase()){case"l":case"low":return b.L;case"m":case"medium":return b.M;case"q":case"quartile":return b.Q;case"h":case"high":return b.H;default:throw Error("Unknown EC Level: "+a)}}catch(a){return c}}},91008:a=>{"use strict";var b={single_source_shortest_paths:function(a,c,d){var e,f,g,h,i,j,k,l={},m={};m[c]=0;var n=b.PriorityQueue.make();for(n.push(c,0);!n.empty();)for(g in f=(e=n.pop()).value,h=e.cost,i=a[f]||{})i.hasOwnProperty(g)&&(j=h+i[g],k=m[g],(void 0===m[g]||k>j)&&(m[g]=j,n.push(g,j),l[g]=f));if(void 0!==d&&void 0===m[d])throw Error("Could not find a path from "+c+" to "+d+".");return l},extract_shortest_path_from_predecessor_list:function(a,b){for(var c=[],d=b;d;)c.push(d),a[d],d=a[d];return c.reverse(),c},find_path:function(a,c,d){var e=b.single_source_shortest_paths(a,c,d);return b.extract_shortest_path_from_predecessor_list(e,d)},PriorityQueue:{make:function(a){var c,d=b.PriorityQueue,e={};for(c in a=a||{},d)d.hasOwnProperty(c)&&(e[c]=d[c]);return e.queue=[],e.sorter=a.sorter||d.default_sorter,e},default_sorter:function(a,b){return a.cost-b.cost},push:function(a,b){this.queue.push({value:a,cost:b}),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return 0===this.queue.length}}};a.exports=b},92190:(a,b)=>{b.render=function(a,b,c){let d=a.modules.size,e=a.modules.data,f="\x1b[47m  \x1b[0m",g="",h=Array(d+3).join(f),i=[,,].join(f);g+=h+"\n";for(let a=0;a<d;++a){g+=f;for(let b=0;b<d;b++)g+=e[a*d+b]?"\x1b[40m  \x1b[0m":f;g+=i+"\n"}return g+=h+"\n","function"==typeof c&&c(null,g),g}},93340:(a,b)=>{let c="[0-9]+",d="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+",e="(?:(?![A-Z0-9 $%*+\\-./:]|"+(d=d.replace(/u/g,"\\u"))+")(?:.|[\r\n]))+";b.KANJI=RegExp(d,"g"),b.BYTE_KANJI=RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),b.BYTE=RegExp(e,"g"),b.NUMERIC=RegExp(c,"g"),b.ALPHANUMERIC=RegExp("[A-Z $%*+\\-./:]+","g");let f=RegExp("^"+d+"$"),g=RegExp("^"+c+"$"),h=RegExp("^[A-Z0-9 $%*+\\-./:]+$");b.testKanji=function(a){return f.test(a)},b.testNumeric=function(a){return g.test(a)},b.testAlphanumeric=function(a){return h.test(a)}},94545:(a,b,c)=>{"use strict";let d=!0,e=c(74075);e.deflateSync||(d=!1);let f=c(60190),g=c(72641);a.exports=function(a,b){if(!d)throw Error("To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0");let c=new g(b||{}),h=[];h.push(Buffer.from(f.PNG_SIGNATURE)),h.push(c.packIHDR(a.width,a.height)),a.gamma&&h.push(c.packGAMA(a.gamma));let i=c.filterData(a.data,a.width,a.height),j=e.deflateSync(i,c.getDeflateOptions());if(i=null,!j||!j.length)throw Error("bad png - invalid compressed data response");return h.push(c.packIDAT(j)),h.push(c.packIEND()),Buffer.concat(h)}},97393:a=>{"use strict";a.exports=function(a){for(var b=[],c=a.length,d=0;d<c;d++){var e=a.charCodeAt(d);if(e>=55296&&e<=56319&&c>d+1){var f=a.charCodeAt(d+1);f>=56320&&f<=57343&&(e=(e-55296)*1024+f-56320+65536,d+=1)}if(e<128){b.push(e);continue}if(e<2048){b.push(e>>6|192),b.push(63&e|128);continue}if(e<55296||e>=57344&&e<65536){b.push(e>>12|224),b.push(e>>6&63|128),b.push(63&e|128);continue}if(e>=65536&&e<=1114111){b.push(e>>18|240),b.push(e>>12&63|128),b.push(e>>6&63|128),b.push(63&e|128);continue}b.push(239,191,189)}return new Uint8Array(b).buffer}}};