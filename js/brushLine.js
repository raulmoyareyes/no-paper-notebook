noPaperNotebook.prototype.brushes.line = function () {

};

noPaperNotebook.prototype.brushes.line.prototype.stroke = function (NPN) {
    var ctx = NPN.actualLayer.ctx;
    
    ctx.lineWidth = NPN.brush.size;
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.beginPath();
    ctx.moveTo( NPN.events.mousedown.x,
                NPN.events.mousedown.y);
    ctx.lineTo( NPN.brush.position.x,
                NPN.brush.position.y);
    ctx.lineCap = "round";
    ctx.stroke();

    NPN.events.mousedown.x = NPN.brush.position.x;
    NPN.events.mousedown.y = NPN.brush.position.y;
};
