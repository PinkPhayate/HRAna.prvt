$(function() { 
  $("img.rollover") 
    .each(function() { 
      var baseImage = $(this).attr("src"); 
      var ext = baseImage.substring(baseImage.lastIndexOf('.'), baseImage.length); 
      var overImage = baseImage.replace(ext, '_over' + ext); 
      new Image().src = overImage; 
      $(this).attr({basesrc: baseImage, oversrc: overImage}); 
    }) 
    .hover(function() { 
        $(this).attr({src: $(this).attr("oversrc")}); 
      }, 
      function() { 
        $(this).attr({src: $(this).attr("basesrc")}); 
    } 
  ); 
});