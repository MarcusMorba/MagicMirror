// hide scrollbar
$("body").css("overflow", "hidden");

var era;
var imgLoadInterval;

var socket = io.connect('http://' + document.domain + ':' + location.port);
socket.on('connect', function() {
    console.log("SocketIO: Connected");
});

socket.on('start_animation', function(msg){
    console.log("start animation.", msg);
    era = msg;
    circleWithTail (300, 600, 200);
    setTimeout(loadMotionGraphics, 5000);
    imgLoadInterval = setInterval(loadImages, 12000);
});

socket.on('stop_animation', function(){
    console.log("stop animation");
    var all_element = document.querySelectorAll('[data-name]');

    for (var i=0; i< all_element.length; i++){
        if(all_element[i].parentNode.nodeName == 'BODY')
             document.body.removeChild(all_element[i]);      
    } 

    // remove all images
    // var all_image = document.getElementsByTagName('img'); 
    
    clearInterval(imgLoadInterval);
    clearInterval(animFlag);
    
    // SVG for era
    //var layer1 = document.getElementById("Layer_1");

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

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
	//animateSVG();
}


var imgIndex = 0;

function loadImages(){

	var newImg = document.createElement('img');
	newImg.src= era + "/" + imgIndex + ".jpg";
    console.log(newImg.src);
	
    newImg.style.position = "absolute";
	newImg.style.opacity = "0";
	document.body.appendChild(newImg);
	
	var left_pos, top_pos;
	var newWidth, newHeight;

    //get image size before load to calculate the aspect ratio
    var poll = setInterval(function () {
        if (newImg.naturalWidth) {
        	clearInterval(poll);
        	//console.log(imgIndex, newImg.naturalWidth, newImg.naturalHeight);

         	var ratio = newImg.height / newImg.width;
         	var randomNum;

         	if (ratio < 0.66)		//horizontally long image
         		randomNum = Math.random() < 0.5 ? 0: 2;
         	else					//otherwise randomly choose position
         		randomNum = Math.floor(Math.random() * 4);
       
         	switch(randomNum){
         		case 0: 
         			left_pos = 800;
         			top_pos = 80;
         			break;

         		case 1: 
         			left_pos = 1200;
         			top_pos = 80;
         			break;

         		case 2: 
         			left_pos = 800;
         			top_pos = 550;
         			break;
         		
         		case 3: 
         			left_pos = 1200;
         			top_pos = 550;
         			break;

         		default: break;

         	}
         	newHeight = 400;
         	newWidth = newHeight / ratio;
			newImg.height = newHeight;
         	
         }

            newImg.style.left = left_pos + "px";
			newImg.style.top = top_pos + "px";
        	
        	var tl = new TimelineMax({onComplete: function(){
				document.body.removeChild(newImg);
			}});
			tl.to(newImg, 2, {opacity: 1},0)
	  		.to(newImg, 2, {opacity: 0}, 10)
	
			getImgFrame(left_pos,top_pos, newWidth, newHeight);

    }, 10); 

	imgIndex++;
	if (imgIndex == 150) imgIndex = 0;

}