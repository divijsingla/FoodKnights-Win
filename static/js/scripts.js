/*!
* Start Bootstrap - Freelancer v7.0.6 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts

// 

let yourcart=document.getElementById('yourcart')
yourcart.addEventListener('mouseover',()=>{
    console.log("hi")
    yourcart.classList.add('active')
})
yourcart.addEventListener('mouseout',()=>{
    console.log("hi")
    yourcart.classList.remove('active')
})
  


window.addEventListener('DOMContentLoaded', event => {
    console.log("Hiii")
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});



const searchInput = document.getElementById('search');

// Set a variable to hold the timeout ID for the debounce function
let timeoutId = null;
let reslis=document.getElementById('reslis')
// Define a function to handle the search query
function handleSearchQuery() {
  // Get the current search query value
  const searchQuery = searchInput.value;
  
  // Perform the search query here
  // ...
  const myData = { key: searchQuery };
  const myDataString = JSON.stringify(myData);

  // create XHR object and send request
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/searchquery');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      
      reslis.innerHTML=xhr.responseText
      console.log(xhr.responseText);
    }
  };
  xhr.send(myDataString);
  console.log(`Search query: ${searchQuery}`);
}

// Add event listener to track user input on the search input field
searchInput.addEventListener('input', function(event) {
  // Clear the previous timeout
  clearTimeout(timeoutId);

  // Set a new timeout for 500 milliseconds
  timeoutId = setTimeout(handleSearchQuery, 500);
});

function replaceImage(image) {
    image.onerror = null; // remove the onerror event to avoid an infinite loop
    image.src = "https://cdn.discordapp.com/attachments/1060989317180301363/1085202759583801344/da8377c5-15bd-4625-b3b2-5d2c3f03c494.jpg"; // replace the image source with a new image
    image.style.width=508
    image.style.height=320
}