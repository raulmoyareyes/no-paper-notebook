;
/* PARÁMETOS GLOBALES ********************************************************/
	var WIDTH=window.innerWidth;//744;
	var HEIGHT=window.innerHeight;//1052;
	var mouseX=0;
	var mouseY=0;
	var PSIZE=1;
	var saveTimeOut;
	var brush;
	var STORAGE=window.localStorage;


/* FUNCION CREAR UNA PÁGINA **************************************************/
	function init(){

		canvas=document.createElement("canvas");
		canvas.className="paper";
		canvas.style.width=WIDTH+"px";
		canvas.style.height=HEIGHT+"px";
		canvas.style.cursor="crosshair";
		document.body.appendChild(canvas);
		context=canvas.getContext("2d");

		if(!brush){
			brush=new simple(context);//"+BRUSHES[0]+"(context)")
		}

		window.addEventListener("mousemove",onWindowMouseMove,false);
		document.addEventListener("mousedown",onDocumentMouseDown,false);
		canvas.addEventListener("mousedown",onCanvasMouseDown,false);
		canvas.addEventListener("touchstart",onCanvasTouchStart,false);

	}


/* EVENTOS *******************************************************************/
	// Guarda la posicion en la que se ha movido el raton
	function onWindowMouseMove(a){
		mouseX=a.clientX;
		mouseY=a.clientY;
	}

	function onDocumentMouseDown(a){
		a.preventDefault();
	}

	/* Si te sales del canvas deja de dibujar
	function onDocumentMouseOut(a){
		onCanvasMouseUp();
	}*/

	// Click en el canvas
	function onCanvasMouseDown(b){
		var c,a;
		clearTimeout(saveTimeOut);
		//BRUSH_PRESSURE=wacom&&wacom.isWacom?wacom.pressure:1;*/
		brush.strokeStart(b.clientX,b.clientY);
		window.addEventListener("mousemove",onCanvasMouseMove,false);
		window.addEventListener("mouseup",onCanvasMouseUp,false);
	}

	// Mover el raton con click sobre el canvas
	function onCanvasMouseMove(a){
		//BRUSH_PRESSURE=wacom&&wacom.isWacom?wacom.pressure:1;
		brush.stroke(a.clientX,a.clientY);
	}

	// soltar click del canvas
	function onCanvasMouseUp(){
		brush.strokeEnd();
		window.removeEventListener("mousemove",onCanvasMouseMove,false);
		window.removeEventListener("mouseup",onCanvasMouseUp,false);
	}

	// Al tocar el canvas
	function onCanvasTouchStart(a){
		if(a.touches.length==1){
			a.preventDefault();
			brush.strokeStart(a.touches[0].pageX,a.touches[0].pageY);
			window.addEventListener("touchmove",onCanvasTouchMove,false);
			window.addEventListener("touchend",onCanvasTouchEnd,false);
		}
	}

	// Moverse tocando el canvas
	function onCanvasTouchMove(a){
		if(a.touches.length==1){
			a.preventDefault();
			brush.stroke(a.touches[0].pageX,a.touches[0].pageY);
		}
	}

	// Dejar de tocar el canvas
	function onCanvasTouchEnd(a){
		if(a.touches.length==0){
			a.preventDefault();
			brush.strokeEnd();
			window.removeEventListener("touchmove",onCanvasTouchMove,false);
			window.removeEventListener("touchend",onCanvasTouchEnd,false);
		}
	}


/* PINCELES ******************************************************************/
	function simple(a){
		this.init(a)
	}

	simple.prototype={
		context:null,prevMouseX:null,prevMouseY:null,init:function(a){
			this.context=a;
			this.context.globalCompositeOperation="source-over"
		},destroy:function(){},strokeStart:function(b,a){
			this.prevMouseX=b;
			this.prevMouseY=a
		},stroke:function(b,a){
			console.log("has cliclado en x: "+this.prevMouseX);
			this.context.lineWidth=5;
			this.context.strokeStyle="rgba(0,0,0,1)";//+COLOR[0]+", "+COLOR[1]+", "+COLOR[2]+", "+0.5*BRUSH_PRESSURE+")";
			this.context.beginPath();
			this.context.moveTo(this.prevMouseX,this.prevMouseY);
			this.context.lineTo(b,a);
			this.context.stroke();
			this.prevMouseX=b;
			this.prevMouseY=a
		},strokeEnd:function(){}
	};


//http://www.esedeerre.com/ejemplo/20/182/html5-pizarra-con-canvas-y-javascript