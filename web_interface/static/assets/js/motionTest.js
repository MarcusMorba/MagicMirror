/************************** #1 dot matrix *************************************/

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

function dotMatrix(pos_x, pos_y, time_diff, explode){

  var dotsArr = [];
  var dotsIndexShuffle = [];
  var shapeArr = [];
  //var div_el = document.createElement('div');

  for (var i=0; i< 25; i++){
    dotsIndexShuffle.push(i);
  }
  
  shuffle(dotsIndexShuffle);
  
  for (var k=0; k < 25; k++){
    var dot;
  
    if(k==12){
      dot = {
        index: k,
        delay: dotsIndexShuffle[k]/8 + time_diff,
        origPosX: pos_x + k % 5 * 30 - 60,
        origPosY: pos_y + Math.floor(k / 5) * 30 - 60,
        finalPosX: pos_x + 1800,
        finalPosY: pos_y + 2000 
      };
    }else{
      dot = {
        index: k,
        delay: dotsIndexShuffle[k]/8 + time_diff,
        origPosX: pos_x + k % 5 * 30 - 60,
        origPosY: pos_y + Math.floor(k / 5) * 30 - 60,
        finalPosX: pos_x + (k % 5 * 30 - 60) * 40 + (Math.random() * 500 - 250),
        finalPosY: pos_y + (Math.floor(k/ 5) * 30 - 60) * 40 + (Math.random() * 500 - 250) 
      };
    }
  
    dotsArr.push(dot);
  }
  
  for(var j=0; j< 25; j++){
    //console.log(dotsArr[j]);
    var shape = new mojs.Shape({
      shape: 'circle',
      radius: 3,
      fill: 'white',
      left: dotsArr[j].origPosX,
      top: dotsArr[j].origPosY,
      delay: dotsArr[j].delay,
      opacity: 0,
      isShowStart: true
    });
    shapeArr.push(shape.el);
    //div_el.appendChild(shape.el);
  }
  
  //console.log(dotsArr);
  
  for(var a = 0; a < 25; a++){
    var stringX = "+=" + dotsArr[a].finalPosX + "px";
    var stringY = "+=" + dotsArr[a].finalPosY + "px";
  

    
    if(explode == true){
      var tl = new TimelineMax({repeat: -1, repeatDelay: 8});
      tl.to(shapeArr[a],0.5, {opacity:1, delay: dotsArr[a].delay})
        .to(shapeArr[a], 2, {left: stringX, top:stringY}, 10+time_diff) //explode
        .to(shapeArr[a], 0.5, {opacity: 0});    
    }else{
      var tl = new TimelineMax({repeat: -1, repeatDelay: 8});
      tl.to(shapeArr[a],0.5, {opacity:1, delay: dotsArr[a].delay})
        .to(shapeArr[a], 0.5, {opacity: 0}, 16);  
    
    }
  }  

  //return div_el;
  //document.body.appendChild(div_el);
}



/************************** #2 three rect *************************************/
function threeRect(pos_x, pos_y){

  var rect1 = new mojs.Shape({
      shape: 'rect',
      radiusX: 40,
      radiusY: 8,
      left: pos_x,
      top: pos_y - 35,
      fill: 'white',
      isShowStart: true
  });
  
  var rect2 = new mojs.Shape({
      shape: 'rect',
      radiusX: 40,
      radiusY: 8,
      left: pos_x,
      top: pos_y,
      fill: 'white',
      isShowStart: true
  });
  
  var rect3 = new mojs.Shape({
      shape: 'rect',
      radiusX: 40,
      radiusY: 8,
      left: pos_x,
      top: pos_y + 35,
      fill: 'white',
      isShowStart: true
  });

  var tl = new TimelineMax({repeat: -1, repeatDelay: 2.5, delay: 1});
  tl.staggerTo([rect1.el, rect2.el, rect3.el], 0.5 ,{left: "+=100px", ease:Power4.easeOut}, 0.08)
  .to([rect1.el, rect2.el], 0.5, {top:"+=35"}, 3)
  .to(rect3.el, 0.5, {top:"-=70"}, 3)
  .staggerTo([rect3.el, rect1.el, rect2.el], 0.5 ,{left: "-=100px", ease:Power4.easeOut}, 0.08);

}


/************************** #3 half circle *************************************/

function halfCircle(pos_x, pos_y, rotation, remove){
  var circle1 = new mojs.Shape({
    shape:        'circle',
    fill:         'none',
    radius:       100,
    stroke:       'white',
    strokeWidth:  20,
    strokeDasharray: '100%',
    strokeDashoffset: '-100%',
    angle:        180 + rotation,  
    left: pos_x,
    top: pos_y,
    isShowStart:  true,
  });
  
  var circle2 = new mojs.Shape({
    shape:        'circle',
    fill:         'none',
    radius:       100,
    stroke:       'white',
    strokeWidth:  20,
    strokeDasharray: '100%',
    strokeDashoffset: '50%',
    angle: rotation,
    opacity: 0,
    left: pos_x,
    top: pos_y,
    isShowStart:  true,
  
  });
  
  var circle1SVG = circle1.el.childNodes[0].childNodes[0];
  var circle2SVG = circle2.el.childNodes[0].childNodes[0];
  
  if (remove){
    var tl = new TimelineMax({onComplete: function(){
      document.body.removeChild(circle1.el);
      document.body.removeChild(circle2.el);
    }});

    tl.to(circle1SVG, 1, {strokeDashoffset: -314.1592653589793})
    .to(circle2.el, 1, {opacity: 1}, 2)
    .to(circle1.el, 1, {opacity: 0}, 3)
    .to(circle2SVG, 1, {strokeDashoffset: 628.3185307179587}, 9);

  }else{
    var tl = new TimelineMax({repeat: -1, repeatDelay: 8});
    tl.to(circle1SVG, 1, {strokeDashoffset: -314.1592653589793})
    .to(circle2.el, 1, {opacity: 1}, 2)
    .to(circle1.el, 1, {opacity: 0}, 3)
    .to(circle2SVG, 1, {strokeDashoffset: 628.3185307179587}, 9);
  }


}



/************************** #4 two skew rect *************************************/

function twoSkewRect(pos_x, pos_y){
  var shape_left = new mojs.Shape({
    shape:          'rect',
    fill:           'white',
    radius:         15,
    radiusY:      40,
    opacity: 0,
    left: pos_x,
    top: pos_y,
    isShowStart: true
  });
  
  var shape_right = new mojs.Shape({
    shape:          'rect',
    fill:           'white',
    radius:         15,
    radiusY:      40,
    opacity: 0,
    left: pos_x,
    top: pos_y,
    isShowStart: true
  });
    
  TweenMax.to([shape_left.el, shape_right.el], 0.1, {skewX:"30deg", opacity:1});
  
  var tl = new TimelineMax({repeat: -1, repeatDelay: 8});
  tl.to(shape_left.el, 0.8, {top:"+=15px"}, 0.2)
    .to(shape_right.el, 0.8, {top:"-=15px"}, 0.2)
    .to(shape_left.el, 0.8, {left:"-=30px"}, 1)
    .to(shape_right.el, 0.8, {left:"+=30px"}, 1)
    .to(shape_left.el, 0.8, {top:"-=15px"}, 1.8)
    .to(shape_right.el, 0.8, {top:"+=15px"}, 1.8)
    .to(shape_left.el, 0.8, {left:"+=30px"}, 2.6)
    .to(shape_right.el, 0.8, {left:"-=30px"}, 2.6)
}


/************************** #5 two half circles *************************************/

function twoHalfCircles(pos_x, pos_y){
  var circle1 = new mojs.Shape({
   shape: 'circle',
   fill:  'none',
   stroke: 'white',
   strokeWidth: 12,
   radius: 45,
   left: pos_x - 70,
   top: pos_y,
   strokeDasharray: '100%',
   strokeDashoffset: '50%',
   isShowStart: true
  });
  
  var circle2 = new mojs.Shape({
   shape: 'circle',
   fill:  'none',
   stroke: 'white',
   strokeWidth: 12,
   radius: 45,
   left: pos_x + 70,
   top: pos_y,
   strokeDasharray: '100%',
   strokeDashoffset: '50%',
   angle: 90,
   isShowStart: true
  });
  
  var tl = new TimelineMax({repeat:-1,repeatDelay:8});
  tl.to([circle1.el, circle2.el], 2, {rotation: "+=90"})
   .to([circle1.el, circle2.el], 2, {rotation: "+=90",delay: 8})
   .to([circle1.el, circle2.el], 2, {rotation: "+=90",delay: 8})
   .to([circle1.el, circle2.el], 2, {rotation: "+=90",delay: 8});

}


/************************** #6 line and dots *************************************/

function lineAndDots(){
    var shape = new mojs.Shape({
          shape:          'rect',
          fill:           'white',
          radiusX:        1,
          radiusY:      200, 
          left: 780,
          top : 300,
          opacity: 0,
          duration:       1000,
          isShowStart: true
        });
        
    var circle_top = new mojs.Shape({
      shape: 'circle',
      fill: 'white',
      radius: 3,
      y:-200,
      opacity: 0,
      delay: 1000,
      duration: 1000,
      isShowStart: true,
    });
        
    var circle_bottom = new mojs.Shape({
      shape: 'circle',
      fill: 'white',
      radius: 3,
      y:-200,
      opacity: 0,
      duration: 1000,
      isShowStart: true
    });
    
    shape.el.append(circle_top.el);
    shape.el.append(circle_bottom.el);
    
    var line_svg = shape.el.childNodes[0].childNodes[0];
  
    TweenMax.to(line_svg, 0.1, {height: 0});
    var tl = new TimelineMax({repeat: -1, repeatDelay: 6});
    tl.to([shape.el, circle_bottom.el, circle_top.el], 0.1, {opacity: 1}, 0.4)
      .to(line_svg, 1, {height:400}, 0.5)
      .to(circle_bottom.el, 1, {top:"+=400"}, 0.5)
      .to(line_svg, 1, {height: 0, y:"+=400"}, 1.5)
      .to(circle_top.el, 1, {top:"+=400"}, 1.5)
      .to(shape.el, 0.1, {rotation:"+=90" , transformOrigin:"bottom left"}, 2.4)
      .to(line_svg, 1, {height: 400, y:"-=400"}, 2.5)
      .to(circle_bottom.el, 1, {top:"-=400"}, 2.5)
      .to(line_svg, 1, {height: 0}, 3.5)
      .to(circle_top.el, 1, { top:"-=400"}, 3.5)
      .to(shape.el, 1, {opacity: 0});
  
}

/************************** #7 dot alpha *************************************/

  // var circle = new mojs.Shape({
  //   shape: 'circle',
  //   fill: 'white',
  //   radius: 8,
  //   isShowStart: true
  // });

  // var tl = new TimelineMax({repeat: -1});
  // tl.to(circle.el, 2, {opacity: 0}, 8)
  //   .to(circle.el, 2, {opacity: 1}, 16);

/************************** #8 dot -> cross *************************************/
function dotCross(pos_x, pos_y){

  var rect1 = new mojs.Shape({
    shape:          'rect',
    fill:           'white',
    radiusX:        40, 
    radiusY:        10,
    left: pos_x,
    top: pos_y,
    isShowStart: true
  });
  
  var rect2 = new mojs.Shape({
    shape:          'rect',
    fill:           'white',
    radiusX:        10,
    radiusY:        40,
    left: pos_x,
    top: pos_y,
    isShowStart: true
  });
  
  var rect1SVG = rect1.el.childNodes[0].childNodes[0];
  var rect2SVG = rect2.el.childNodes[0].childNodes[0];
  
  //TweenMax.to(rect1SVG, 1, {width: 20, x:"+=30"});
  //TweenMax.to(rect2SVG, 1, {height: 20, y:"+=30"});
  
  var tl = new TimelineMax({delay: 4, repeat: -1, repeatDelay: 8});
  tl.to(rect1SVG, 2, {width: 20, x:"+=30"},0)
    .to(rect2SVG, 2, {height: 20, y:"+=30"},0)
    .to(rect1SVG, 2, {width: 80, x:"-=30"},10)
    .to(rect2SVG, 2, {height: 80, y:"-=30"},10);  
}



/************************** #9 rotating cross *************************************/

function rotatingCross(pos_x, pos_y){
  var rect1 = new mojs.Shape({
    shape:          'rect',
    fill:           'white',
    radiusX:        40, 
    radiusY:        10,
    left: pos_x,
    top: pos_y,
    isShowStart: true
  });
  
  var rect2 = new mojs.Shape({
    shape:          'rect',
    fill:           'white',
    radiusX:        10,
    radiusY:        40,
    left: pos_x,
    top: pos_y,
    isShowStart: true
  });
  
  var tl = new TimelineMax({delay: 6, repeat: -1, repeatDelay: 8});
  tl.to(rect1.el, 2, {rotation:"+=90"},0)
    .to(rect2.el, 2, {rotation:"-=90"},0)
    .to(rect1.el, 2, {rotation:"-=90"},10)
    .to(rect2.el, 2, {rotation:"+=90"},10);

}



/************************** #10 circle with tail *************************************/
function circleWithTail(pos_x, pos_y, size){

  var arc_in = new mojs.Shape({
    shape: 'circle',
    fill: 'none',
    left: pos_x,
    top: pos_y,
    radius: size + 20,
    stroke: 'white',
    strokeWidth: 2,
    strokeDasharray: '100%',
    strokeDashoffset: '100%',
    isShowStart: true,
  });
  
  var dot_in = new mojs.Shape({
    shape: 'circle',
    fill: 'white',
    radius: 5,
    angle: 20,
    x: size + 20,
    isShowStart:true
  });
  
  var arc_out = new mojs.Shape({
    shape: 'circle',
    fill: 'none',
    left: pos_x,
    top: pos_y,
    radius: size + 40,
    stroke: 'white',
    strokeWidth: 2,
    strokeDasharray: '100%',
    strokeDashoffset: '100%',
    isShowStart: true,
  });
  
  var dot_out = new mojs.Shape({
    shape: 'circle',
    fill: 'white',
    radius: 5,
    angle: 20,
    x: size + 40,
    opacity: 0,
    isShowStart:true
  });

  var circle = new mojs.Shape({
    shape: 'circle',
    fill: 'white',
    left: pos_x,
    top: pos_y,
    radius: size,
    stroke: 'white',
    strokeWidth: 2,
    opacity: 0,
    isShowStart: true,
  });
  
  arc_in.el.appendChild(dot_in.el);
  arc_out.el.appendChild(dot_out.el);
  
  var arcInSVG = arc_in.el.childNodes[0].childNodes[0];
  var arcOutSVG = arc_out.el.childNodes[0].childNodes[0];

  TweenMax.to(circle.el, 5, {opacity:1});
  
  var beforeShow = new TimelineMax();
  beforeShow.to(arc_out.el, 1, {rotation: -90})
  .to(dot_out.el, 1, {opacity: 1});


  var tl = new TimelineMax({repeat: -1, repeatDelay: 6});
  tl.to(arc_in.el, 6, {rotation: "-=1080", ease: Sine.easeInOut}, 5)
    .to(arcInSVG, 2, {strokeDashoffset: 1000, ease: Sine.easeIn}, 5)
    .to(arc_out.el, 6, {rotation: "-=1080", ease: Sine.easeInOut}, 5)
    .to(arcOutSVG, 2, {strokeDashoffset: 1000, ease: Sine.easeIn}, 5)
    .to(arcInSVG, 2, {strokeDashoffset: 1382.300767579509  , ease: Sine.easeOut},11)
    .to(arcOutSVG, 2, {strokeDashoffset: 1507.9644737231006  , ease: Sine.easeOut}, 11);

}


/************************** #11 sine wave across the screen *************************************/


var y = 1400;
var animFlag;

function sineWaveInit() {
  animFlag = setInterval(function() {sineWave()}, 1)
}

function sineWave(){
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

  var x = Math.sin(y * Math.PI/90);
  x = x * 30 + 100;
  ctx.fillStyle = "white";  
  ctx.fillRect(x, y, 18 , 5);
  y -= 0.6;

  var y_delay = y + 150;
  var x_delay = Math.sin(y_delay * Math.PI/90);
  x_delay = x_delay * 30 + 100;
  ctx.fillStyle = "black";
  ctx.fillRect(x_delay-1, y_delay, 20 , 5);


  if(y < -200)
    y = 1400;
  }
}  

/************************** #12 "90" *************************************/

function eraSVG(){

  var nine = document.getElementById("nine");
  var zero = document.getElementById("zero");
  var layer1 = document.getElementById("Layer_1");

  //console.log(zero.getTotalLength())
  TweenMax.to(layer1, 1, {opacity: 1 });
  var tl = new TimelineMax({repeat: -1, repeatDelay: 6, yoyo: true});
  tl.to(nine, 3, {strokeDashoffset: 1500, ease: Sine.easeInOut},0)
    .to(zero, 3, {strokeDashoffset: 1500, ease: Sine.easeInOut}, 0);
}

/************************** image frame *************************************/

function getImgFrame(pos_x, pos_y, imgWidth, imgHeight){

  var randomNum = Math.floor(Math.random() * 3);
  if (randomNum == 0)
    imgFrame1(pos_x, pos_y, imgWidth, imgHeight);
  else if (randomNum == 1){
    imgFrame2(pos_x, pos_y, imgWidth, imgHeight);
    halfCircle(pos_x+imgWidth- 50, pos_y + imgHeight, 0, true);
  }

}


function imgFrame1(pos_x, pos_y, imgWidth, imgHeight){
  var left = new mojs.Shape({
      shape: 'rect',
      fill: 'white',
      radiusX: 4,
      radiusY: 4,
      left: pos_x - 4, 
      top: pos_y - 4,
      isShowStart: true
  });

  var top = new mojs.Shape({
      shape: 'rect',
      fill: 'white',
      radiusX: 4,
      radiusY: 4,
      left: pos_x - 4, 
      top: pos_y - 4,
      isShowStart: true
  });

  var right = new mojs.Shape({
      shape: 'rect',
      fill: 'white',
      radiusX: 4,
      radiusY: 4,
      left: pos_x + imgWidth + 4, 
      top: pos_y + imgHeight + 4,
      isShowStart: true
  });

  var bottom = new mojs.Shape({
      shape: 'rect',
      fill: 'white',
      radiusX: 4,
      radiusY: 4,
      left: pos_x + imgWidth + 4, 
      top: pos_y + imgHeight + 4,
      isShowStart: true
  });
  var leftSVG = left.el.childNodes[0].childNodes[0];
  var topSVG = top.el.childNodes[0].childNodes[0];
  var rightSVG = right.el.childNodes[0].childNodes[0];
  var bottomSVG = bottom.el.childNodes[0].childNodes[0];

  var tl = new TimelineMax({onComplete: function(){
    document.body.removeChild(left.el);
    document.body.removeChild(right.el);
    document.body.removeChild(top.el);
    document.body.removeChild(bottom.el);
  }});

  tl.to([left.el, leftSVG], 2, {height: imgHeight + 16}, 0)
    .to([top.el, topSVG], 2, {width: imgWidth+16}, 0)
    .to([right.el, rightSVG], 2, {height: imgHeight+16, top:"-=" + (imgHeight+8)}, 0)
    .to([bottom.el, bottomSVG], 2, {width: imgWidth+16, left:"-=" + (imgWidth+8)}, 0)
    .to([left.el, top.el, right.el, bottom.el], 2 ,{opacity: 0}, 10);

}

function imgFrame2(pos_x, pos_y, imgWidth, imgHeight){
  var left = new mojs.Shape({
        shape: 'rect',
        fill: 'white',
        radiusX: 4,
        radiusY: 4,
        left: pos_x - 4, 
        top: pos_y - 4,
        isShowStart: true
    });
  
    var top = new mojs.Shape({
        shape: 'rect',
        fill: 'white',
        radiusX: 4,
        radiusY: 4,
        left: pos_x + imgWidth + 4, 
        top: pos_y - 4,
        isShowStart: true
    });
  
    var right = new mojs.Shape({
        shape: 'rect',
        fill: 'white',
        radiusX: 4,
        radiusY: 4,
        left: pos_x + imgWidth + 4, 
        top: pos_y + imgHeight + 4,
        isShowStart: true
    });
  
    var bottom = new mojs.Shape({
        shape: 'rect',
        fill: 'white',
        radiusX: 4,
        radiusY: 4,
        left: pos_x - 4, 
        top: pos_y + imgHeight + 4,
        isShowStart: true
    });
    var leftSVG = left.el.childNodes[0].childNodes[0];
    var topSVG = top.el.childNodes[0].childNodes[0];
    var rightSVG = right.el.childNodes[0].childNodes[0];
    var bottomSVG = bottom.el.childNodes[0].childNodes[0];
  
    var tl = new TimelineMax({onComplete: function(){
      document.body.removeChild(left.el);
      document.body.removeChild(right.el);
      document.body.removeChild(top.el);
      document.body.removeChild(bottom.el);
    }});

    tl.to([left.el, leftSVG], 2, {height: imgHeight + 16}, 0)
      .to([top.el, topSVG], 2, {width: imgWidth+16, left:"-=" + (imgWidth+8)}, 0)
      .to([right.el, rightSVG], 2, {height: imgHeight+16, top:"-=" + (imgHeight+8)}, 0)
      .to([bottom.el, bottomSVG], 2, {width: imgWidth+16, }, 0)
      .to([left.el, top.el, right.el, bottom.el], 2 ,{opacity: 0}, 10);

}
