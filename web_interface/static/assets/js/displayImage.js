/************************** image frame *************************************/

var imgIndex = 0;

function loadImages(){
  var newImg = document.createElement('img');
  newImg.src= era + "/" + imgIndex + ".jpg";
    //console.log(newImg.src);
  
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

          if (ratio < 0.66)   //horizontally long image
            randomNum = Math.random() < 0.5 ? 0: 2;
          else          //otherwise randomly choose position
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
        .to(newImg, 2, {opacity: 0}, 4)
  
      getImgFrame(left_pos,top_pos, newWidth, newHeight);

    }, 10); 

  imgIndex++;
  if (imgIndex == 150) imgIndex = 0;

}


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
