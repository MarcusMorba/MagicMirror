
function windowTimeline(){
  var tl_circle = displayCircle(300,600,200);
  //var tl_triangle = displayTriangle();

  // var root_timeline = new TimelineMax();
  // root_timeline.add(function(){
  //   displayCircle(300,600,200);
  // }, 2);
  // root_timeline.add(displayTriangle, 4);
}


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
    isShowStart: true
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
    // setTimeout(function(){
    //   try{
    //     document.body.removeChild(circle.el);
    //     document.body.removeChild(arc_in.el);
    //     document.body.removeChild(arc_out.el);
    //     displayTriangle(); 
    //   }catch(err){
    //     console.log("err from displayCircle");
    //   }
    // }, 3000);
    
}});

  tl.to(arc_in.el, 6, {rotation: "-=1080", ease: Sine.easeInOut}, 5)
    .to(arcInSVG, 2, {strokeDashoffset: 1000, ease: Sine.easeIn}, 5)
    .to(arc_out.el, 6, {rotation: "-=1080", ease: Sine.easeInOut}, 5)
    .to(arcOutSVG, 2, {strokeDashoffset: 1000, ease: Sine.easeIn}, 5)
    .to(arcInSVG, 2, {strokeDashoffset: 1382.300767579509  , ease: Sine.easeOut},11)
    .to(arcOutSVG, 2, {strokeDashoffset: 1507.9644737231006  , ease: Sine.easeOut}, 11);

  return tl;
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
  //   setTimeout(function(){
  //     try{
  //       document.body.removeChild(triangle.el);
  //       displaySpotlight(); 
  //     }catch(err){
  //       console.log("err from displayTriangle");
  //     }
      
     
  //   }, 3000);
   }});
  tl.to(triangle.el, 0.5, {rotation: 90}, 1)
    .to(triangle.el, 0.5, {rotation: 180}, 4)
    .to(triangle.el, 0.5, {rotation:270},7 )
    .to(triangle.el, 0.5, {rotation:360}, 10);
  
  return tl;

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
      try{
        document.body.removeChild(circle.el);
        displayRect();
      }catch(err){
        console.log("err from displaySpotlight");
      }
    
     
    }, 3000);
  }});

  tl.to(circle.el, 0.5, {scale:0})
    .to(circle.el, 0.5, {scale: 1, opacity: 1})
    .to(circle.el, 0.5, {left:"-=120px", top:"+=150px"}, 2.5)
    .to(circle.el, 0.5, {left:"+=120px", top:"+=150px"}, 5)
    .to(circle.el, 0.5, {scale: 0}, 7.5);
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
      try{
        document.body.removeChild(square.el);
        displayCircle(300,600,200);
      }catch(err){
        console.log("err from displayRect")
      }
    
     
    }, 3000);
  }});

  tl.to([square.el, squareSVG], 1, {width: 400, height: 400, left:"-=150px", top:"-=150px"})
    .to(square.el, 0.5, {width: 50, left:"+=350px"}, 10)
    .to(square.el, 0.5, {height:0, top:"-=150px"});
}