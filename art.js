// Art Gallery Collection

function openImg(pic){
var clickedImgBox = document.getElementById("clickedImgBox");
var clickedImg = document.getElementById("clickedImg");

clickedImgBox.style.display = "flex";  // Whenever is clicked the image will be displayed 
clickedImg.src = pic; // ----Very Important----    Once image is clicked it will change the clicked image to the parameter pic

  var closeImg = document.getElementById('clickedImgBox'); //  A Variable that once click the screen it will exit 
  closeImg.addEventListener('click', function(){  // addEventListener for once clicked
  this.style.display = "none";  // The style property to display none once click the screen
  });

}


// Image Slider on Main Page

var slideIndex = 0;

slides(slideIndex);

function slides() {
  var i;
  var x = document.getElementsByClassName("spinimages");

  for (i = 0; i < x.length; i++) { //  A for loop to iterate over the images and to not display the images all at once only the one at the current index
    x[i].style.display = "none"; // style display property will display none images except for the 1st index image every time it loops
  }
  
  slideIndex++; 
  
  if (slideIndex > x.length) { // Once the slide show loops over all the images it will loop over again at index 1 
    slideIndex = 1
  }

  x[slideIndex - 1].style.display = "block"; // When looping over images it will display the image value as block level element

  setTimeout(slides, 2000); // Change image every 2 seconds
}
