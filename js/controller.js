
var noPaperNotebook = function (canvas) {
    this.id = ++this.ID;

    this.position = {
        x: 0,
        y: 0
    };

    // Añade una capa al canvas
    this.layers = [{
        can: canvas,
        ctx: canvas.getContext("2d")
    }];
    canvas.className = "paper";
    this.actualLayer = this.layers[0];

    // Establece el pincel
    this.brush = {
        size: 1,
        position: {
            x: 0,
            y: 0
        },
        type: "line"
    }

    // Eventos del ratón
    this.events = {
        mousedown: null //< Guarda la posicion en la que se pulsó el raton si se hace, en caso contrario guarda null
    };

    var me = this;
    /**
     * @brief Añade los eventos a las capas
     */
    this.addEvents = function () {
        for (var i = 0; i < this.layers.length; i++) {
            this.layers[i].can.onmousedown = function (e) {
                me.events.mousedown = {
                    x: e.clientX - me.actualLayer.can.offsetLeft,
                    y: e.clientY - me.actualLayer.can.offsetTop
                };
            };
            this.layers[i].can.onmouseup = function () {
                me.events.mousedown = null;
            };
            this.layers[i].can.onmousemove = function (e) {
                me.brush.position.x = e.clientX - me.actualLayer.can.offsetLeft;
                me.brush.position.y = e.clientY - me.actualLayer.can.offsetTop;

                if (me.events.mousedown !== null) {
                    me.constructor.prototype.brushes[me.brush.type].prototype.stroke(me);
                }
            };
        }
    };


    this.adjust();
    this.addEvents();
};

// Identificación de cada noPaperNotebook
noPaperNotebook.prototype.ID = 0;

// Objeto para guardar las brochas
noPaperNotebook.prototype.brushes = {};

/**
 * @brief Ajusta el tamaño de las capas
 */
noPaperNotebook.prototype.adjust = function () {
    var rel = (window.innerWidth < 2480) ?
                window.innerWidth * 0.9 / 2480 :
                2480 / window.innerWidth * 1.1;

    for (var i = 0; i < this.layers.length; i++) {
        this.layers[i].can.style.top = this.position.y + "px";
        this.layers[i].can.style.left = this.position.x + "px";
        this.layers[i].can.width = 2480 * rel;
        this.layers[i].can.height = 3508 * rel;
    }
};

/**
 * @brief Mueve las capas hacia arriba
 */
noPaperNotebook.prototype.moveUp = function () {
    for (var i = 0; i < this.layers.length; i++) {
        this.position.y -= 15;
    }
    this.adjust();
};

/**
 * @brief Mueve las capas hacia abajo
 */
noPaperNotebook.prototype.moveDown = function () {
    for (var i = 0; i < this.layers.length; i++) {
        this.position.y += 15;
    }
    this.adjust();
};
