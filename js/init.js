;
/* PARÁMETOS GLOBALES ********************************************************/

	var rel;
	if(window.innerWidth<2480){rel=(window.innerWidth*0.9)/2480;}else{rel=2480/(window.innerWidth*1.1);}

	var WIDTH=2480*rel;
	var HEIGHT=3508*rel;
	var mouseX=0;
	var mouseY=0;
	var PSIZE=1;
	var saveTimeOut;
	var brush;
	var STORAGE=window.localStorage;
	var canvas;
	var context;


	function downPaper(){

		//comprobar que no se baja mas del folio
		var v = (canvas.style.top).substr(0,(canvas.style.top).length-2);
		canvas.style.top = v-15+"px";
	}

	function upPaper(){
		var v = (canvas.style.top).substr(0,(canvas.style.top).length-2);
		canvas.style.top = (parseInt(v)+15)+"px";

	}

	function plusPSize(){
		PSIZE++;
	}

	function minusPSize(){
		if(PSIZE > 1){PSIZE--;}
	}

	function nuevo(){
		canvas.width=canvas.width;
	}

/* FUNCION CREAR UNA PÁGINA **************************************************/
	function init(){

		canvas=document.createElement("canvas");
		canvas.id="canvas";
		canvas.className="paper";
		canvas.width=WIDTH;
		canvas.height=HEIGHT;
		canvas.style.cursor="crosshair";
		canvas.style.top = "0px"
		document.body.appendChild(canvas);
		context=canvas.getContext("2d");

		if(!brush){
			brush=new simple(context);//"+BRUSHES[0]+"(context)")
		}

		window.addEventListener("mousemove",onWindowMouseMove,false);
		window.addEventListener("resize",onWindowResize,false);
		document.addEventListener("mousedown",onDocumentMouseDown,false);
		canvas.addEventListener("mousedown",onCanvasMouseDown,false);
		canvas.addEventListener("touchstart",onCanvasTouchStart,false);
		onWindowResize(null);

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

	// Click en el canvas
	function onCanvasMouseDown(b){
		var c,a;
		clearTimeout(saveTimeOut);
		//BRUSH_PRESSURE=wacom&&wacom.isWacom?wacom.pressure:1;*/
		brush.strokeStart(b.clientX-canvas.offsetLeft,b.clientY-canvas.offsetTop);
		window.addEventListener("mousemove",onCanvasMouseMove,false);
		window.addEventListener("mouseup",onCanvasMouseUp,false);
	}

	// Mover el raton con click sobre el canvas
	function onCanvasMouseMove(a){
		//BRUSH_PRESSURE=wacom&&wacom.isWacom?wacom.pressure:1;
		brush.stroke(a.clientX-canvas.offsetLeft,a.clientY-canvas.offsetTop);
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

	function onWindowResize(){

		if(window.innerWidth<2480){rel=(window.innerWidth*0.9)/2480;}else{rel=2480/(window.innerWidth*1.1);}

		WIDTH=2480*rel;
		HEIGHT=3508*rel;

		canvas.width=WIDTH;
		canvas.height=HEIGHT;
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
			this.context.lineWidth=PSIZE;
			this.context.strokeStyle="rgba(0,0,0,1)";//+COLOR[0]+", "+COLOR[1]+", "+COLOR[2]+", "+0.5*BRUSH_PRESSURE+")";
			this.context.beginPath();
			this.context.moveTo(this.prevMouseX,this.prevMouseY);
			this.context.lineTo(b,a);
			this.context.lineCap="round";
			this.context.stroke();
			this.prevMouseX=b;
			this.prevMouseY=a
		},strokeEnd:function(){}
	};

function circles(a){this.init(a)}

circles.prototype={
	context:null,
	prevMouseX:null,
	prevMouseY:null,
	count:null,
	init:function(a){
		this.context=a;
		this.context.globalCompositeOperation="source-over"
	},
	destroy:function(){},
	strokeStart:function(b,a){
		this.prevMouseX=b;
		this.prevMouseY=a},
	stroke:function(e,b){
		var g,l,k,h,f,c,j,a;
		this.context.lineWidth=BRUSH_SIZE;
		this.context.strokeStyle="rgba("+COLOR[0]+", "+COLOR[1]+", "+COLOR[2]+", "+0.1*BRUSH_PRESSURE+")";
		l=e-this.prevMouseX;
		k=b-this.prevMouseY;
		h=Math.sqrt(l*l+k*k)*2;
		f=Math.floor(e/100)*100+50;
		c=Math.floor(b/100)*100+50;
		j=Math.floor(Math.random()*10);
		a=h/j;
		for(g=0; g<j; g++){
			this.context.beginPath();
			this.context.arc(f,c,(j-g)*a,0,Math.PI*2,true);
			this.context.stroke()}this.prevMouseX=e;
			this.prevMouseY=b
		},strokeEnd:function(){}
	};



	init();