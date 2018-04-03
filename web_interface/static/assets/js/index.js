// hide scrollbar
$("body").css("overflow", "hidden");

var era;
var animationPlaying = false;   //to prevent if receiving start_animation signal for multiple times the interface becomes a mess

var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function() {
    console.log("SocketIO: Connected");
});

socket.on('start_animation', function(msg){
    console.log("animationPlaying", animationPlaying);
    if(!animationPlaying){
        console.log("start animation.", msg);
        era = msg;
        startAnimation();
        animationPlaying = true;
    }

});

socket.on('stop_animation', function(){
    console.log("stop animation");

    stopAnimation();
    animationPlaying = false
});


function startAnimation(){
    initFlashLightElem();

    windowTimeline();
    setTimeout(loadMotionGraphics, 5000);
    startImgAnim();

}

function stopAnimation(){
    flashLights();

    clearCanvas();
    stopImgAnim();
    removeElements();

    // remove SVG
    var layer1 = document.getElementById("Layer_1");
    while (layer1.firstChild) {
        layer1.removeChild(layer1.firstChild);
    }
}


function loadMotionGraphics(){
	dotMatrix(1500, 150, 0, true);
	dotMatrix(1000, 950, 6, true);
	dotMatrix(200, 400, 3, false);
	
	threeRect(800, 800);
	twoSkewRect(300, 900);
	twoSkewRect(260, 930);
	
	dotCross(1500, 800);
	
	halfCircle(1900,800,90, false);
	twoHalfCircles(1600, 250);
	
	rotatingCross(600, 300);
	
	lineAndDots();
	sineWaveInit();

    generateSVG(era);
}


