//Problem: No user interaction currently works
//Solution: Allow interaction
var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $("canvas")[0].getContext("2d");

//When clicking on control list items
$(".controls").on("click", "li", function() {
    //Deselect sibling items
    $(this).siblings().removeClass("selected");
    //Select clicked item
    $(this).addClass("selected");
    //Cache color
    color = $(this).css("background-color");
});
    
//When new color is clicked
$("#revealColorSelect").click(function() {
    //Show or hide color select
    changeColor();
    $("#colorSelect").toggle();
});
  //change color in the <span>
  function changeColor() {
      var r = $("#red").val();
      var g = $("#green").val();
      var b = $("#blue").val();

  $("#newColor").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
                      
  }  

//When color sliders change
$("input[type=range]").on("input", changeColor);

//When Add Color button is clicked
$("#addNewColor").click(function(){
    //Append the color to the controls ui
    var $newColor = $("<li></li>");
    $newColor.css("background-color", $("#newColor").css("background-color"));
    $(".controls ul").append($newColor);
    //Select the new color
    $newColor.click();
});

//on mouse events on the canvas

$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e){
  //draw lines
  if(mouseDown) {
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(e.offsetX, e.offsetY);
    context.strokeStyle = color;
    context.stroke();
    lastEvent = e;
   }
}).mouseup(function(){
  mouseDown = false;
}).mouseleave(function(){
  $canvas.mouseup();
});