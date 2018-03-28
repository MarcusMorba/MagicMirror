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
      try{
        document.body.removeChild(circle1.el);
        document.body.removeChild(circle2.el);  
      }catch(err){
        document.body.removeChild(circle1.el);
        document.body.removeChild(circle2.el);
      }
      
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



/********************** #10 change hole shape for display objects behind *************************/
function displayCircle(pos_x, pos_y, size){

  var arc_in = new mojs.Shape({
    shape: 'circle',
    fill: 'none',
    left: pos_x,
    top: pos_y,
    radius:  size + 20,
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

  var beforeShow = new TimelineMax();
  beforeShow.to(circle.el, 5, {opacity:1}, 0)
            .to(arc_out.el, 1, {rotation: -90} , 0)
            .to(dot_out.el, 1, {opacity: 1}, 1);


  var tl = new TimelineMax({repeat: 1, repeatDelay: 6, onComplete:function(){
    TweenMax.to([circle.el, arc_in.el, arc_out.el], 1, {opacity: 0});
    setTimeout(function(){
      document.body.removeChild(circle.el);
      document.body.removeChild(arc_in.el);
      document.body.removeChild(arc_out.el);
      displayTriangle(); 
    }, 3000);
    
}});

  tl.to(arc_in.el, 6, {rotation: "-=1080", ease: Sine.easeInOut}, 5)
    .to(arcInSVG, 2, {strokeDashoffset: 1000, ease: Sine.easeIn}, 5)
    .to(arc_out.el, 6, {rotation: "-=1080", ease: Sine.easeInOut}, 5)
    .to(arcOutSVG, 2, {strokeDashoffset: 1000, ease: Sine.easeIn}, 5)
    .to(arcInSVG, 2, {strokeDashoffset: 1382.300767579509  , ease: Sine.easeOut},11)
    .to(arcOutSVG, 2, {strokeDashoffset: 1507.9644737231006  , ease: Sine.easeOut}, 11);

}


function displayTriangle(){
  var triangle = new mojs.Shape({
    shape: 'polygon',
    points: 3,
    fill: 'white',
    left: 300,
    top: 600,
    radius: 250,
    opacity: 0,
    isShowStart: true,
  });
  
  TweenMax.to(triangle.el, 0.5, {opacity: 1});

  var tl = new TimelineMax({repeat:1, repeatDelay:3, onComplete:function(){
    TweenMax.to(triangle.el, 0.5, {opacity: 0}, 3);
    flashLights();
    setTimeout(function(){
      document.body.removeChild(triangle.el);
      displaySpotlight(); 
    }, 3000);
  }});
  tl.to(triangle.el, 0.5, {rotation: 90}, 1)
    .to(triangle.el, 0.5, {rotation: 180}, 4)
    .to(triangle.el, 0.5, {rotation:270},7 )
    .to(triangle.el, 0.5, {rotation:360}, 10);
}


function displayRect(){
  var square = new mojs.Shape({
      shape: 'rect',
      fill: 'white',
      radius: 10,
      left: 300, 
      top: 600,
      //opacity: 0,
      isShowStart: true
  });

  var squareSVG = square.el.childNodes[0].childNodes[0];
  var tl = new TimelineMax({onComplete: function(){
   
  setTimeout(function(){
    displayCircle(300,600,200);
    document.body.removeChild(square.el);
  }, 3000);

  }});
  tl.to([square.el, squareSVG], 1, {width: 400, height: 400, left:"-=150px", top:"-=150px"})
    .to(square.el, 0.5, {width: 50, left:"+=350px"}, 10)
    .to(square.el, 0.5, {height:0, top:"-=150px"});
}

function displaySpotlight(){
  var circle = new mojs.Shape({
    shape: 'circle',
    fill: 'white',
    left: 400,
    top: 500,
    radius: 150,
    opacity:0,
    isShowStart: true,
  });
  
  var tl = new TimelineMax({repeat: 1, repeatDelay: 2, onComplete:function(){
    setTimeout(function(){
      document.body.removeChild(circle.el);
      displayRect()
    }, 3000);
  }});

  tl.to(circle.el, 0.5, {scale:0})
    .to(circle.el, 0.5, {scale: 1, opacity: 1})
    .to(circle.el, 0.5, {left:"-=120px", top:"+=150px"}, 2.5)
    .to(circle.el, 0.5, {left:"+=120px", top:"+=150px"}, 5)
    .to(circle.el, 0.5, {scale: 0}, 7.5);
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

/************************** #12 SVG for era *************************************/

function generateSVG(era){

  newpath1 = document.createElementNS('http://www.w3.org/2000/svg',"path");
  newpath1.setAttributeNS(null,"id", "nine")
  newpath1.setAttributeNS(null,"fill", "none"); 
  newpath1.setAttributeNS(null,"stroke", "#FFFFFF");
  newpath1.setAttributeNS(null,"stroke-width", "50");
  newpath1.setAttributeNS(null,"stroke-dashoffset", "0");
  newpath1.setAttributeNS(null,"stroke-dasharray", "100%");
  //newpath1.setAttributeNS(null,"d", "M89.8,95.6c-4.9,8.5-25.6,35-51.6,16.2C23.3,101,22.8,85.3,30.5,74.1c9-13,34.1-27.4,52-1.8s1.8,59.5-3.6,67.8c-8.5,13-35.4,24.7-52-4");
  
  newpath2 = document.createElementNS('http://www.w3.org/2000/svg',"path");
  newpath2.setAttributeNS(null,"id", "zero")
  newpath2.setAttributeNS(null,"fill", "none");
  newpath2.setAttributeNS(null,"stroke", "#FFFFFF");
  newpath2.setAttributeNS(null,"stroke-width", "50");
  newpath2.setAttributeNS(null,"stroke-dashoffset", "0");
  newpath2.setAttributeNS(null,"stroke-dasharray", "100%");
  newpath2.setAttributeNS(null,"d", "M353.28,76.83C374.58,49,447.49,5.45,492.71,90.71s33.92,224.06-9.19,285.52c-39.68,56.59-120.19,58.27-147.2,0C298.63,294.94,298.63,148.21,353.28,76.83Z");
  //newpath2.setAttributeNS(null,"d", "M174,107.7c0,25.5-15.6,46.2-31,46.2s-31-20.7-31-46.2s15.6-46.2,31-46.2S174,82.2,174,107.7z");


  switch (era){
    case "50s":
      newpath1.setAttributeNS(null,"d","M227,44.39H58.51V193.08S227.12,198,227.12,301.75c0,91.29-101.41,128-199.06,105.58");
      break;
    case "60s": 
      newpath1.setAttributeNS(null,"d", "M39.32,249.86c25.24-39.61,177.86-96.13,199.19,41.41C258.87,422.59,79.63,472.15,44.06,330.84,15.67,218,49.48,82.12,119.2,50.09c50.36-23.14,87.88-13.19,119.31,0");
      break;
    case "70s":
      newpath1.setAttributeNS(null,"d","M31,40.89H236.3s23.28,2.51,11.36,30.63S123.88,251.32,95.8,430");
      break;
    case "80s":
      newpath1.setAttributeNS(null,"d", "M45.54,315.79c1.79-95.2,181.55-99,180.22-203C225.17,1.08,46.88,1.11,58.66,129c8,87.43,171.35,94.44,178,187C246.17,449.64,42.83,459.23,45.54,315.79Z");
      break;
    case "90s":
      newpath1.setAttributeNS(null,"d","M229.8,201.33c-25.24,39.61-177.86,96.13-199.19-41.41C10.25,28.6,189.49-21,225.05,120.35c28.39,112.81-5.42,248.72-75.13,280.75-50.36,23.14-87.88,13.19-119.31,0");
      break;
    case "00s":
      newpath1.setAttributeNS(null,"d", "M79.28,75.83C100.58,48,166,0,218.71,89.71c45.22,85.26,33.92,224.06-9.19,285.52C169.84,431.82,96,431,62.32,375.23,21,297,24.63,147.21,79.28,75.83Z");
      break;
    default: break;
  }
  var layer1 = document.getElementById("Layer_1");
  layer1.appendChild(newpath1);
  layer1.appendChild(newpath2);

  TweenMax.to(layer1, 1, {opacity: 1 });
  var tl = new TimelineMax({repeat: -1, repeatDelay: 6, yoyo: true});
  tl.to(newpath1, 3, {strokeDashoffset: 5000, ease: Sine.easeInOut},0)
    .to(newpath2, 3, {strokeDashoffset: 5000, ease: Sine.easeInOut}, 0);

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
    try{
      document.body.removeChild(left.el);
      document.body.removeChild(right.el);
      document.body.removeChild(top.el);
      document.body.removeChild(bottom.el);
    }catch(err){
      console.log("errrr whatever")
    }

  }});

  tl.to([left.el, leftSVG], 2, {height: imgHeight + 16}, 0)
    .to([top.el, topSVG], 2, {width: imgWidth+16}, 0)
    .to([right.el, rightSVG], 2, {height: imgHeight+16, top:"-=" + (imgHeight+8)}, 0)
    .to([bottom.el, bottomSVG], 2, {width: imgWidth+16, left:"-=" + (imgWidth+8)}, 0)
    .to([left.el, top.el, right.el, bottom.el], 2 ,{opacity: 0}, 4);

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
      try{
        document.body.removeChild(left.el);
        document.body.removeChild(right.el);
        document.body.removeChild(top.el);
        document.body.removeChild(bottom.el);  
      }catch(err){
        console.log("errrr whatever")
      }
      
    }});

    tl.to([left.el, leftSVG], 2, {height: imgHeight + 16}, 0)
      .to([top.el, topSVG], 2, {width: imgWidth+16, left:"-=" + (imgWidth+8)}, 0)
      .to([right.el, rightSVG], 2, {height: imgHeight+16, top:"-=" + (imgHeight+8)}, 0)
      .to([bottom.el, bottomSVG], 2, {width: imgWidth+16, }, 0)
      .to([left.el, top.el, right.el, bottom.el], 2 ,{opacity: 0}, 4);

}


/***********************************************************************************/
function flashLights(){
    var shape_left = new mojs.Shape({
    shape:          'rect',
    fill:           'white',
    radius:         10,
    radiusY:      1500,
    left: -100,
    top: 0,
    opacity: 0,
    isShowStart: true
  });
  
  var shape_right = new mojs.Shape({
    shape:          'rect',
    fill:           'white',
    radius:         30,
    radiusY:      1500,
    left: -30,
    top: 0,
    opacity: 0,
    isShowStart: true
  });
    
  TweenMax.to([shape_left.el, shape_right.el], 0.1, {skewX:"-35deg", opacity:1});
  var tl = new TimelineMax({onComplete: function(){
    document.body.removeChild(shape_left.el);
    document.body.removeChild(shape_right.el);
  }});
  tl.to([shape_left.el, shape_right.el], 0.1, {opacity: 1})
    .to([shape_left.el, shape_right.el], 1, {left:"+=3000px", ease:Power0.easeNone});
}