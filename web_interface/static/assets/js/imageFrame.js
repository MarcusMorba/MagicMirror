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
      console.log("errrr imgFrame1")
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
        console.log("errrr from imgFrame2");
      }
      
    }});

    tl.to([left.el, leftSVG], 2, {height: imgHeight + 16}, 0)
      .to([top.el, topSVG], 2, {width: imgWidth+16, left:"-=" + (imgWidth+8)}, 0)
      .to([right.el, rightSVG], 2, {height: imgHeight+16, top:"-=" + (imgHeight+8)}, 0)
      .to([bottom.el, bottomSVG], 2, {width: imgWidth+16, }, 0)
      .to([left.el, top.el, right.el, bottom.el], 2 ,{opacity: 0}, 4);

}
