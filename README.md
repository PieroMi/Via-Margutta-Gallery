<h1 align="center">Artist Portfolio & Biography</h1>

<h2 align="center">

<img src="images\VIAMARGUTTALOGO_WHITE.png" width="35%">

_A Responsive website for the portfolio & biography of Luis Miranda Neira and Via Margutta Gallery_

👉<a href="https://viamarguttaec.com/" target="_blank">Open Live</a>👈

</h2>

# 🥅Goal of this project

To be able to have a website where I could demonstrate to the world the work that a prolific painter from Ecuador left behind. A strive to push forward the culture of Ecuador and its roots, and I am honored to put my part in this. I've implemented my other business with the programming knowledge that I've learned so far, and the idea came from that. I questioned myself what can I do as a computer science student to make my business better? I wanted to push myself with my programming knowledge and understand the logic of certain tools that I wanted to implement here. Such as making different kind of image sliders throughout the website by using different javascript functions. Also, wanted to find a way to create a Contact Us form in the website in case anyone is interested in pursuing a painting. 

<h2 align="center">

<img src="https://media.giphy.com/media/yKpP7hc6ueryag34kH/giphy.gif" width="50%">

</h2>

---

### 🟢First Objective

I wanted to improve the user interface right from the start of the main page of the website to catch the viewers attention by displaying an automatic slideshow. This was the first time I used DOM methods in javascript to create variables with the images that are displayed. In addition, using `for loops` to understand the function of how the images slide and are displayed was fun to play around with, as seen in the code source below. The first loop initiates the display of the slideshow at index  0 until all images are displayed. Using the DOM methods I applied the value 'none' to make the element invisible, to not show it in inline, or block, etc. As slideIndex continues to iterate I did another for loop to make sure that once it reaches the last image it will start again at the first image. Then, this code ``` x[slideIndex - 1].style.display = "block"; ``` the logic behind this is that for every time variable x it will display the image at slideIndex - 1 array position. In other words, it displays the image at index 0 every time it loops through every image and **ONLY** that image.

```javascript {
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

```
<img src="https://media.giphy.com/media/H5DbcF94r7uKtyw6pi/giphy.gif" width="50%">

---

### ✌️Second Objective

I wanted to continue to make more interactive functions so that the visitor could continue to be engage while browsing through the website. Under About -> Via Margutta I used another slideshow but this time applying the onclick attribute from HTML to click onto the next image with the caption of clicked image. 
Initializing plusSlides function to click to the next or previous image. 

```javascript {
function plusSlides(n) {   
   showSlides(slideImageIndex += n); // When clicking the next or prev arrow it will move one slide
 }
 
function currentSlide(n) {
   showSlides(slideImageIndex = n) // When clicking the O buttons it will display the current Image that was clicked with the 'dot' function
 } 
```
plusSlides function will return when clicked the slideImageIndex + n parameter which is either +1 or -1. Same logic is applied for currentSlide function it will return the nth image if slideImageIndex = n. 

```javascript {
for (i = 0; i < dots.length; i++){
    dots[i].className = dots[i].className.replace(" active", ""); // A for loop to replace the black dots to empty once it clicks the next image.
}
```
This was another fun exercise to apply because I used the JavaScript ``className`` property to manipulate CSS classes of the elements. In this case when selecting a different image the dot will turn from 'active' to empty when the next or prev image is selected and the next image will have the 'active' selector. 

As shown here 👇

<img src="https://media.giphy.com/media/g6ysqKpRgUvqH2lCgd/giphy.gif" width="50%">

```javascript {
dots[slideImageIndex - 1].className += " active";
```
dots at array position slideImageIndex - 1 will activate the 'active' selector

---

### 🎨Art Gallery Images Function

```html {
<div class="full-img" id="clickedImgBox">
    <figure>
    <img id="clickedImg"> 
    </figure>
</div>
```

Created a container named clickedImgBox to expand the specific image that is clicked inside that container. As shown below once 'clickedImgBox' is clicked it will activate the clickedImg.src that was named 'pic' from the grid.

```javascript {
var clickedImgBox = document.getElementById("clickedImgBox");
var clickedImg = document.getElementById("clickedImg");


function openImg(pic){
  clickedImgBox.style.display = "flex";  // Whenever is clicked the image will be displayed 
  clickedImg.src = pic; // ----Very Important----    Once image is clicked it will change the clicked image to the parameter pic
}

var closeImg = document.getElementById('clickedImgBox'); //  A Variable that once click the screen it will exit 

closeImg.addEventListener('click', function(){  // addEventListener for once clicked

this.style.display = "none";  // The style property to display none once click the screen

});
```
<img src="https://media.giphy.com/media/vZkaNndQ7rEXqrzlKe/giphy.gif" width="50%">

---

### ✍️Contact Us Form Using AWS & SES

I came across a couple issues when I started doing research on how to build a proper contact us form as it seemed that to create a contact us form through javascript only functions it could put my personal information on the code source and the same issue would happen if I used the basic ```href``` link to attach my email to. I wanted to remain anonymous and using href would force the user to open the default mail program from their device, or if they're using a public computer it will be inconvenient and non practical. 

#### Steps
- Verify my email in Simple Email Server to receive emails
- Create lambda function to call the AWS services.
- Set up the API Gateway to send the HTTP request to the lambda function
- Code the JavaScript to handle the sending request when submitted


***Lambda Function***
```javascript {
const aws = require("aws-sdk");
const ses = new aws.SES({ region: "us-east-1" });
exports.handler = async function (event) {
  console.log('EVENT: ', event)
  
  const { senderEmail, senderName, message } = JSON.parse(event.body) // parsing a string to the body hence JSON
  const params = {
    Destination: {
      ToAddresses: ["myemail@gmail.com"],
    },
    Message: {
      Body: {
        Text: { 
            Data: `You just got a message from ${senderName} - ${senderEmail} : ${message}` 
        },
      },
      Subject: { Data: `Message from ${senderName}` },
    },
    Source: "myemail@gmail.com",
  };

  return ses.sendEmail(params).promise()
};
```
***Javascript in the html file to handle the request***
```javascript {
const form = document.querySelector('form') // Will query all the info submitted in the form

form.addEventListener('submit', event => {
    event.preventDefault() // not let the submit button to refresh page

    const { name, email, message } = event.target;  // Creating a constant for each of the inputs submitted

    const endpoint =
        "https://hwktxokt9e.execute-api.us-east-1.amazonaws.com/default/sendContactEmail"
        
        // Used JSON.stringify so the data can be sent as a string via HTTP
        const body = JSON.stringify({
            senderName: name.value,
            senderEmail: email.value,
            message: message.value
        });

        const requestOptions = {
            method: "POST",
            body
        };
});
```

***When Receiving the Email***

<img src="images\aaa.png">

---

## 👨‍💻Technology Stack

- HTML
- CSS
- JavaScript
- AWS
