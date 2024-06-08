'use strict'
const sideNav = document.getElementById("sideNav");
const closeBtn = document.querySelector(".closeBtn");

hamburger.addEventListener("click", () => {
    sideNav.style.width = "250px";
    content.style.transition = "margin-left 0.5s";
    content.style.marginLeft = '16%';
    content.style.width = '84%';
});

closeBtn.addEventListener("click", () => {
    sideNav.style.width = "0";
    content.style.transition = "margin-left 0.5s";
    content.style.marginLeft = '0%';
    content.style.width = '100%';

});
