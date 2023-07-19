//-------------------- start global ----------------------------

//-------------------- end global ----------------------------






//-------------------- start header section ----------------------------

// change active class on header
let navLisA = document.querySelectorAll(".header .navbar-nav li a");
navLisA.forEach(function(a){
    a.onclick = function(){
        navLisA.forEach(function(a){
            a.classList.remove("active");
        });
        this.classList.add("active");

        sessionStorage.setItem("heaerSelected",this.dataset.header);
    }
})

// header session storage
let ssHeaderSelected = sessionStorage.getItem("heaerSelected");
if (ssHeaderSelected != null){
    navLisA.forEach(function(a){
        a.classList.remove("active");
        if (ssHeaderSelected == a.dataset.header){
            a.classList.add("active")
        }
    })
}
// change active on scrolling
let sectionss = document.querySelectorAll("section");

sectionss.forEach(function(section){
window.addEventListener("scroll", function(event){
    
        if (window.scrollY < sectionss[0].offsetHeight - 100){
            document.querySelector(`[data-header="home"]`).classList.add("active");
        }
        if (window.scrollY >= section.offsetTop - 100 && window.scrollY <= (section.offsetTop + section.offsetHeight) - 100){
            navLisA.forEach(function(a){
                a.classList.remove("active");
                if (section.classList.contains("scroll-active")){
                    document.querySelector(`[data-header="${section.id}"]`).classList.add("active")
                }
            })
        }
    })
})
//-------------------- end header section ------------------------------



//-------------------- start progress indicator ----------------

// progress-indicator
window.addEventListener("scroll", function(){ 
    let unVisibleScrollArea = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let currentScrollPoint = document.documentElement.scrollTop;
    document.querySelector(".progress-indicator-bar").style.width = `${(currentScrollPoint / unVisibleScrollArea) * 100}%`; 
})


//-------------------- end progress indicator ------------------






//-------------------- start home section ------------------------------

//-------------------- end home section --------------------------------






//-------------------- start setting section ----------------------------

//add toggle class to spin icon and open menu
document.querySelector(".setting-icon").onclick = function(){
    document.querySelector(".setting-icon i").classList.toggle("fa-spin");
    document.querySelector(".setting").classList.toggle("setting-open");
}



document.addEventListener("click", function(event){
    if (event.target !== document.querySelector(".setting")){
        if (document.querySelector(".setting").classList.contains("setting-open")){
            document.querySelector(".setting-icon i").classList.toggle("fa-spin");
            document.querySelector(".setting").classList.toggle("setting-open");
        }
    }
})
document.querySelector(".setting").onclick = function(event){
    event.stopPropagation();
}



//change --main-color and set colors in local storage
let colorsLis = document.querySelectorAll(".setting-colors .colors li");
colorsLis.forEach(function(li){
    li.addEventListener("click",function(event){
        // change active class on setting colors
        colorsLis.forEach(function(li){
            li.classList.remove("active");
        });
        event.target.classList.add("active");
        //set colors in local storage
        localStorage.setItem("selectedColor", event.target.dataset.color);
        document.documentElement.style.setProperty("--main-color", event.target.dataset.color);
    })
})
//using colors in local storage
let lsColor = localStorage.getItem("selectedColor");
if (lsColor != null){
    colorsLis.forEach(function(li){
        li.classList.remove("active");
        if (li.dataset.color === lsColor){
            li.classList.add("active")
        }
    })
    document.documentElement.style.setProperty("--main-color", lsColor);
}



// random background
let randomBackground = true;
let bgInterval;
let rBackgroundSpan = document.querySelectorAll(".setting .r-background span");
rBackgroundSpan.forEach(function(span){
    span.onclick = function(){
        // change active class on random background
        rBackgroundSpan.forEach(function(span){
            span.classList.remove("active");
        });
        this.classList.add("active");
        localStorage.setItem("selectedRandom", this.dataset.background);
        if (this.dataset.background === "yes"){
            randomBackground = true;
            startRandomBackground()
        } else {
            randomBackground = false;
            clearInterval(bgInterval);
        }
    }
})

function startRandomBackground(){
    if ( randomBackground === true){
        // background changes
    bgInterval= setInterval(() => {
        let home = document.querySelector(".home");
        let backgroundImgs = ["chernobylite_Home01.jpg", "chernobylite_Home02.jpg", "chernobylite_Home03.jpg", "chernobylite_Home04.jpg", "chernobylite_Home05.jpg", "chernobylite_Home06.jpg", "chernobylite_Home07.jpg", "chernobylite_Home08.jpg", "chernobylite_Home09.jpg", "chernobylite_Home10.jpg", "chernobylite_Home11.jpg", "chernobylite_Home12.jpg", "chernobylite_Home13.jpg", "chernobylite_Home14.jpg", "chernobylite_Home15.jpg", "chernobylite_Home16.jpg", "chernobylite_Home17.jpg", "chernobylite_Home18.jpg", "chernobylite_Home19.jpg", "chernobylite_Home20.jpg", "chernobylite_Home21.jpg", "chernobylite_Home22.jpg", "chernobylite_Home23.jpg", "chernobylite_Home24.jpg", "chernobylite_Home25.jpg", "chernobylite_Home26.jpg", "chernobylite_Home27.jpg"];
        let randomNum = Math.floor(Math.random() * backgroundImgs.length);
        home.style.backgroundImage = `url('/images/${backgroundImgs[randomNum]}')`;
    }, 5000);
    } else {
        clearInterval(bgInterval);
    
    }
}

let lsBackground = localStorage.getItem("selectedRandom");
if (lsBackground !== null){
    rBackgroundSpan.forEach(function(span){
        span.classList.remove("active");
        if (span.dataset.background === lsBackground){
            span.classList.add("active")
        }
    });

    if (lsBackground === "yes"){
        startRandomBackground()
    } else {
        clearInterval(bgInterval);
    }
    
}



// show navigation bullets or not
let showBulletsSpans = document.querySelectorAll(".setting .show-bullets span");
showBulletsSpans.forEach(function(span){
    span.addEventListener("click", function(event){
        // active class
        showBulletsSpans.forEach(function(span){
            span.classList.remove("active");
        })
        event.target.classList.add("active");
        // set local storage
        localStorage.setItem("showBullets", event.target.dataset.show);

        if (event.target.dataset.show === "yes"){
            document.querySelector(".nav-bullets").style.display = "block";
        } else {
            document.querySelector(".nav-bullets").style.display = "none";
        }
    })
});
// get local storage
let lsShowBullets = localStorage.getItem("showBullets");
if (lsShowBullets !== null){
    // active class
    showBulletsSpans.forEach(function(span){
        span.classList.remove("active");
        if (lsShowBullets === span.dataset.show ){
            span.classList.add("active");
        }
    });

    if (lsShowBullets === "yes"){
        document.querySelector(".nav-bullets").style.display = "block";
    } else {
        document.querySelector(".nav-bullets").style.display = "none";
    }
}



// progress indicator setting
let progressIndicatorSpan = document.querySelectorAll(".setting .show-progress-indicator span");
progressIndicatorSpan.forEach(function(span){
    span.addEventListener("click", function(event){
        // active class
        progressIndicatorSpan.forEach(function(span){
            span.classList.remove("active");
        });
        event.target.classList.add("active");
        // local storage
        localStorage.setItem("enableProgressIndicator", event.target.dataset.indicator);

        if (event.target.dataset.indicator === "yes"){
            document.querySelector(".progress-indicator").style.display = "block";
        } else {
            document.querySelector(".progress-indicator").style.display = "none";
        }
    })
})
// progress indicator local storage
let lsProgressIndicator = localStorage.getItem("enableProgressIndicator");
if (lsProgressIndicator !== null){
    // active class
    progressIndicatorSpan.forEach(function(span){
        span.classList.remove("active");
        if (lsProgressIndicator === span.dataset.indicator){
            span.classList.add("active");
        }
    });

    if (lsProgressIndicator === "yes"){
        document.querySelector(".progress-indicator").style.display = "block";
    } else {
        document.querySelector(".progress-indicator").style.display = "none";
    }
}




// reset settings
let resetButton = document.querySelector(".setting .reset-button");
resetButton.onclick = function(){
    // color select
    document.documentElement.style.setProperty("--main-color", "#dc3545");
    // random background
    clearInterval(bgInterval);
    // navigation bullets
    document.querySelector(".nav-bullets").style.display = "none";
    // progress indicator
    document.querySelector(".progress-indicator").style.display = "none";
    // clear local storage
    localStorage.clear();

    colorsLis.forEach(function(li){
        // active for colors
        li.classList.remove("active")
    });
    document.querySelector(".setting .colors li:nth-child(1)").classList.add("active"); 
    // active for random background
    rBackgroundSpan.forEach(function(span){
        span.classList.remove("active");
    });
    document.querySelector(".setting .r-background span:nth-child(2)").classList.add("active");
    // active for show bullets
    showBulletsSpans.forEach(function(span){
        span.classList.remove("active");
    });
    document.querySelector(".setting .show-bullets span:nth-child(2)").classList.add("active");
    // active for progress indicator
    progressIndicatorSpan.forEach(function(span){
        span.classList.remove("active");
    });
    document.querySelector(".setting .show-progress-indicator span:nth-child(2)").classList.add("active");
}


//-------------------- end setting section ------------------------------






//-------------------- start navigation bullets section -----------------

// create navigation bullets ul 
let sections = document.querySelectorAll("section");
let navBulletsSection = document.querySelector(".nav-bullets") 
let ul = document.createElement("ul"); 

sections.forEach(function(section){
    let li = document.createElement("li");
    li.className = "bullet";
    li.setAttribute("data-section", section.id)
    let span = document.createElement("span");
    span.appendChild(document.createTextNode(section.id.charAt(0).toUpperCase() + section.id.slice(1))) 
    li.appendChild(span);
    ul.appendChild(li);
})
navBulletsSection.appendChild(ul);
document.querySelector(".bullet").classList.add("active");


// direct navigation bullets to its section
let navbullets = document.querySelectorAll(".nav-bullets li");
navbullets.forEach(function(li){
    li.addEventListener("click", function(event){
        document.getElementById(event.target.dataset.section).scrollIntoView()
    })
})



// add background-color to navigation bullets when section reached
sections.forEach(function(section, i){ 
    window.addEventListener("scroll", function(){
        if (window.scrollY >= section.offsetTop - 100 && window.scrollY <= (section.offsetTop + section.offsetHeight) - 100){
            document.querySelector(`.nav-bullets li:nth-child(${i+1})`).style.backgroundColor = "var(--main-color)"
        } else {
            document.querySelector(`.nav-bullets li:nth-child(${i+1})`).style.background = "none"
        }
    })
})


// activate top button

let topIcon = document.querySelector(".top-icon");

window.addEventListener("scroll", function(){
    if (this.scrollY >= 1100){
        topIcon.style.display = "block"
    } else {
        topIcon.style.display = "none"
    }
})

topIcon.addEventListener("click", function(){
    window.scrollTo(0, 0)
})



//-------------------- end navigation bullets section -------------------






//-------------------- start gallery section ----------------------------

// img gallery preview
let imageGallery = document.querySelectorAll(".gallery img");
anyImagePreview(imageGallery);

function anyImagePreview(images, sectionClassName){ 
    images.forEach(function(img){
        img.addEventListener("click",function(event){
            let overlay = document.createElement("div");
            overlay.className = "gallery-overlay";
            let imageCard = document.createElement("div");
            imageCard.className = "image-card";
            let imageHeading = document.createElement("h3");
            imageHeading.className = "image-heading";
            let imageHeadingText = document.createTextNode(img.title);
            imageHeading.appendChild(imageHeadingText);
            let imagePreview = document.createElement("img");
            imagePreview.src = img.src; 
            imagePreview.className = "image-preview";
            let closeButton = document.createElement("i");
            closeButton.className = "fa-solid fa-rectangle-xmark close-button";
            imageCard.appendChild(imageHeading);
            imageCard.appendChild(imagePreview);
            imageCard.appendChild(closeButton);
            overlay.appendChild(imageCard);
            document.body.appendChild(overlay);
            document.body.style.setProperty("height", "100%");
            document.body.style.setProperty("overflow", "hidden");
        })
    })
}



//activate close icon
document.addEventListener("click", function(event){
    if (event.target.classList.contains("close-button")){
        document.querySelector(".gallery-overlay").remove();
        document.body.style.removeProperty("height")
        document.body.style.removeProperty("overflow");
    }
})
// activate Esc key
document.addEventListener("keyup", function(event){
    if (event.key == "Escape"){
        document.querySelector(".gallery-overlay").remove();
        document.body.style.removeProperty("height")
        document.body.style.removeProperty("overflow");
    }
})

document.addEventListener("click",function(event){
    if (event.target == document.querySelector(".gallery-overlay")){
        document.querySelector(".gallery-overlay").remove();
        document.body.style.removeProperty("height")
        document.body.style.removeProperty("overflow");
    }
})


//-------------------- end gallery section ------------------------------






//-------------------- start skills section ----------------------------

// animated progress bar while scrolling
window.onscroll = function(){
    if (scrollY >= document.querySelector(".skills").offsetTop - 200){
        let progress = document.querySelectorAll(".skills .progress .progress-bar");
        progress.forEach(function(div){
            div.style.width = div.dataset.progress;
        })
    }
}


//-------------------- end skills section ------------------------------






//-------------------- start timeline section --------------------------

//-------------------- end timeline section -----------------------------






//-------------------- start slideshow section --------------------------

//infinte loop sequence background images
let slideshowBackgroundImages = ["chernobylite_Home04","chernobylite_Home05","chernobylite_Home06","chernobylite_Home07","chernobylite_Home08","chernobylite_Home09","chernobylite_Home10","chernobylite_Home11","chernobylite_Home12","chernobylite_Home13","chernobylite_Home14","chernobylite_Home15","chernobylite_Home16","chernobylite_Home17","chernobylite_Home18","chernobylite_Home19","chernobylite_Home20","chernobylite_Home21","chernobylite_Home22","chernobylite_Home23","chernobylite_Home24","chernobylite_Home25","chernobylite_Home26","chernobylite_Home27"];
let slideshowCounter = 0;
let slIntervalID;

function slideshowBG(){ 
    slIntervalID = setInterval(() => {

        document.querySelector(".slideshow").style.backgroundImage = `url(images/${slideshowBackgroundImages[slideshowCounter++]}.jpg)`;
    
        if (slideshowCounter == slideshowBackgroundImages.length){
            slideshowCounter = 0;
        }
    }, 5000);
    
}
slideshowBG() 


let stopSlideshowBgBTN = document.querySelector(".slideshow .background-button");
stopSlideshowBgBTN.addEventListener("click", function(event){
    if (stopSlideshowBgBTN.textContent == "Stop BG Images"){
        stopSlideshowBgBTN.textContent = "Resume BG Images";
        clearInterval(slIntervalID);
        sessionStorage.setItem("slideshowBgStopSelectd", "yes");
    } else {
        stopSlideshowBgBTN.textContent = "Stop BG Images";
        slideshowBG();
        sessionStorage.setItem("slideshowBgStopSelectd", "no");
    }

    
});


let ssSlideshowBgStopSelected = sessionStorage.getItem("slideshowBgStopSelectd");
if (ssSlideshowBgStopSelected !== null){
    if (ssSlideshowBgStopSelected == "yes"){
        clearInterval(slIntervalID);
        stopSlideshowBgBTN.textContent = "Resume BG Images";
    }
    if (ssSlideshowBgStopSelected == "no") {
        stopSlideshowBgBTN.textContent = "Stop BG Images";
    }
}


let slideshowImages = document.querySelectorAll(".slideshow img");
anyImagePreview(slideshowImages);

slideshowImages.forEach(function(img){
    img.addEventListener("click",function(){
        document.querySelector(".gallery-overlay i").style.setProperty("top", "-17px")
    })
})
//-------------------- end slideshow section ----------------------------






//-------------------- Start community Section --------------------------

let communitySection2 = document.querySelector(".community");
let communityCardSpans = document.querySelectorAll(".community-card span");
let start = false;

window.addEventListener("scroll", function(){
    if (this.scrollY >= communitySection2.offsetTop - 200){
        if (!start){
            communityCardSpans.forEach(function(span){
                communityCount(span);
            })
        };
        start = true;
    }
})

function communityCount(span){
    let countInterval = setInterval(() => {
        span.textContent++;
        if (span.textContent == span.dataset.goal){
            clearInterval(countInterval);
        }
    }, 2000 / span.dataset.goal);
}


// days-counddown
let communityCountInterval =  setInterval(() => {
    let futureDate = new Date("2022/11/25 23:59:59").getTime(); 
    let presentDate = new Date().getTime();
    let diffDate = futureDate - presentDate;
    let days = Math.floor(diffDate / (1000 * 60 * 60 * 24)); 
    let hours = Math.floor(diffDate % (1000 * 60 * 60 * 24) / (1000 *60 *60)); 
    let minutes = Math.floor(diffDate % (1000 * 60 * 60) / (1000 * 60));
    let seconds = Math.floor(diffDate % (1000 * 60) / 1000);
    document.querySelector(".community .days-count-card:nth-child(1) span").textContent = days < 10 ? `0${days}` : days ;
    document.querySelector(".community .days-count-card:nth-child(2) span").textContent = hours < 10 ? `0${hours}` : hours;
    document.querySelector(".community .days-count-card:nth-child(3) span").textContent = minutes < 10 ? `0${minutes}` : minutes;
    document.querySelector(".community .days-count-card:nth-child(4) span").textContent = seconds < 10 ? `0${seconds}` : seconds;


    if (diffDate < 0){
        clearInterval(communityCountInterval)
        document.querySelector(".days-count-card:nth-child(1)").style.display = "none";
        document.querySelector(".days-count-card:nth-child(2)").style.display = "none";
        document.querySelector(".days-count-card:nth-child(3)").style.display = "none";
        document.querySelector(".days-count-card:nth-child(4)").style.display = "none";
    }
}, 1000);

// input progress

let input = document.querySelector(".gift input");
let Maxlength = input.getAttribute("maxlength");
let giftLength = document.querySelector(".gift-length");
let giftProgress = document.querySelector(".gift-progress");

input.oninput = function(){
    giftProgress.style.width = `${(input.value.length / Maxlength) * 100}%`;
    giftLength.innerHTML = `${input.value.length}  of ${Maxlength}`;

    if (input.value.length == Maxlength ){
        giftLength.classList.add("warning")
    } else {
        giftLength.classList.remove("warning")
    }
}
input.onfocus = function(){
    document.querySelector(".community .gift form legend").style.color = "white";
    document.querySelector(".community .gift .gift-length").style.color = "white";
}
input.onblur = function(){
    document.querySelector(".community .gift form legend").style.color = "#777";
    document.querySelector(".community .gift .gift-length").style.color = "#777";
}




//-------------------- end community Section ----------------------------





//-------------------- start category Section --------------------------

//infinte loop sequence background images
let categoryBackgroundImages = ["chernobylite_Home02","chernobylite_Home03","chernobylite_Home04","chernobylite_Home05","chernobylite_Home06","chernobylite_Home07","chernobylite_Home08","chernobylite_Home09","chernobylite_Home10","chernobylite_Home11","chernobylite_Home12","chernobylite_Home13","chernobylite_Home14","chernobylite_Home15","chernobylite_Home16","chernobylite_Home17","chernobylite_Home18","chernobylite_Home19","chernobylite_Home20","chernobylite_Home21","chernobylite_Home22","chernobylite_Home23","chernobylite_Home24","chernobylite_Home25","chernobylite_Home26","chernobylite_Home27"];
let counter = 0;
let cbiIntervalID;
function categoryBG(){
    cbiIntervalID = setInterval(() => {

        document.querySelector(".category").style.backgroundImage = `url(images/${categoryBackgroundImages[counter++]}.jpg)`;
    
        if (counter == categoryBackgroundImages.length){
            counter = 0;
        }
    }, 5000);
}
categoryBG();


let stopCategoryBgBTN = document.querySelector(".category .background-button");
stopCategoryBgBTN.addEventListener("click", function(event){
    if (stopCategoryBgBTN.textContent == "Stop BG Images"){
        stopCategoryBgBTN.textContent = "Resume BG Images";
        clearInterval(cbiIntervalID);
        sessionStorage.setItem("categoryBgStopSelectd", "yes");
    } else {
        stopCategoryBgBTN.textContent = "Stop BG Images";
        categoryBG();
        sessionStorage.setItem("categoryBgStopSelectd", "no");
    }

    
});


let ssCategoryBgStopSelected = sessionStorage.getItem("categoryBgStopSelectd");
if (ssCategoryBgStopSelected !== null){
    if (ssCategoryBgStopSelected == "yes"){
        clearInterval(cbiIntervalID);
        stopCategoryBgBTN.textContent = "Resume BG Images";
    }
    if (ssCategoryBgStopSelected == "no") {
        stopCategoryBgBTN.textContent = "Stop BG Images";
    }
}



// category filter
let categoryLi = document.querySelectorAll(".category ul li");

categoryLi.forEach(function(li){
    li.addEventListener("click", function(event){
        // active class
        categoryLi.forEach(function(li){
            li.classList.remove("active");
        });
        event.target.classList.add("active");

        //session storage
        sessionStorage.setItem("activeCategory", event.target.dataset.category);

        document.querySelectorAll(".category .all").forEach(function(all){
            all.style.display = "none"
        });
        document.querySelectorAll(event.target.dataset.category).forEach(function(targetElement){
            targetElement.style.display = "block";
        })




        let categoryHorror = document.querySelectorAll(".category .horror");
        let categoryScienceFiction = document.querySelectorAll(".category .science-fiction");
        let categoryGameplay = document.querySelectorAll(".category .gameplay");

        let gameplay = categoryLi[3];
        if (gameplay.classList.contains("active")){
            categoryGameplay[4].className = "col-sm-6 col-md-4 col-lg-4 all gameplay";
            categoryGameplay[5].className = "col-sm-6 col-md-4 col-lg-4 all gameplay";
            categoryGameplay[6].className = "col-sm-12 col-md-12 col-lg-4 all gameplay";
        } else {

            categoryGameplay[4].className = "col-sm-6 col-md-4 col-lg-3 all gameplay";
            categoryGameplay[5].className = "col-sm-6 col-md-6 col-lg-3 all gameplay";
            categoryGameplay[6].className = "col-sm-12 col-md-6 col-lg-12 all gameplay";
        }

        let scienceFiction = categoryLi[2];
        if (scienceFiction.classList.contains("active")){

            categoryScienceFiction[4].className = "col-sm-6 col-md-4 col-lg-4 all science-fiction";
            categoryScienceFiction[5].className = "col-sm-6 col-md-4 col-lg-4 all science-fiction";
            categoryScienceFiction[6].className = "col-sm-12 col-md-12 col-lg-4 all science-fiction";
        } else {

            categoryScienceFiction[4].className = "col-sm-6 col-md-4 col-lg-3 all science-fiction";
            categoryScienceFiction[5].className = "col-sm-6 col-md-4 col-lg-3 all science-fiction";
            categoryScienceFiction[6].className = "col-sm-6 col-md-4 col-lg-3 all science-fiction";
        }


        let horror = categoryLi[1];
        if (horror.classList.contains("active")){
            categoryHorror[0].className = "col-sm-6 col-md-4 col-lg-4 all horror";
            categoryHorror[1].className = "col-sm-6 col-md-4 col-lg-4 all horror";
            categoryHorror[2].className = "col-sm-12 col-md-4 col-lg-4 all horror";
        } else {

            categoryHorror[0].className = "col-sm-6 col-md-4 col-lg-3 all horror";
            categoryHorror[1].className = "col-sm-6 col-md-4 col-lg-3 all horror";
            categoryHorror[2].className = "col-sm-6 col-md-4 col-lg-3 all horror";
        }

    })
})




// session storage
let ssActiveCategory = sessionStorage.getItem("activeCategory")
if (ssActiveCategory != null){
    // active class
    categoryLi.forEach(function(li){
        li.classList.remove("active");
        if (ssActiveCategory == li.dataset.category){
            li.classList.add("active")
        }
    });
    document.querySelectorAll(".category .all").forEach(function(all){
        all.style.display = "none"
    });
    document.querySelectorAll(ssActiveCategory).forEach(function(targetElement){
        targetElement.style.display = "block";
    });


    let categoryHorror = document.querySelectorAll(".category .horror");
    let categoryScienceFiction = document.querySelectorAll(".category .science-fiction");
    let categoryGameplay = document.querySelectorAll(".category .gameplay");

    let gameplay = categoryLi[3];
    if (gameplay.classList.contains("active")){
        categoryGameplay[4].className = "col-sm-6 col-md-4 col-lg-4 all gameplay";
        categoryGameplay[5].className = "col-sm-6 col-md-4 col-lg-4 all gameplay";
        categoryGameplay[6].className = "col-sm-12 col-md-12 col-lg-4 all gameplay";
    } else {

        categoryGameplay[4].className = "col-sm-6 col-md-4 col-lg-3 all gameplay";
        categoryGameplay[5].className = "col-sm-6 col-md-6 col-lg-3 all gameplay";
        categoryGameplay[6].className = "col-sm-12 col-md-6 col-lg-12 all gameplay";
    }

    let scienceFiction = categoryLi[2];
    if (scienceFiction.classList.contains("active")){

        categoryScienceFiction[4].className = "col-sm-6 col-md-4 col-lg-4 all science-fiction";
        categoryScienceFiction[5].className = "col-sm-6 col-md-4 col-lg-4 all science-fiction";
        categoryScienceFiction[6].className = "col-sm-12 col-md-12 col-lg-4 all science-fiction";
    } else {

        categoryScienceFiction[4].className = "col-sm-6 col-md-4 col-lg-3 all science-fiction";
        categoryScienceFiction[5].className = "col-sm-6 col-md-4 col-lg-3 all science-fiction";
        categoryScienceFiction[6].className = "col-sm-6 col-md-4 col-lg-3 all science-fiction";
    }


    let horror = categoryLi[1];
    if (horror.classList.contains("active")){
        categoryHorror[0].className = "col-sm-6 col-md-4 col-lg-4 all horror";
        categoryHorror[1].className = "col-sm-6 col-md-4 col-lg-4 all horror";
        categoryHorror[2].className = "col-sm-12 col-md-4 col-lg-4 all horror";
    } else {

        categoryHorror[0].className = "col-sm-6 col-md-4 col-lg-3 all horror";
        categoryHorror[1].className = "col-sm-6 col-md-4 col-lg-3 all horror";
        categoryHorror[2].className = "col-sm-6 col-md-4 col-lg-3 all horror";
    }






}



let categoryImages = document.querySelectorAll(".category img");
anyImagePreview(categoryImages);

categoryImages.forEach(function(img){
    img.addEventListener("click",function(){
        document.querySelector(".gallery-overlay i").style.setProperty("top", "-17px")
    })
})




//-------------------- end category Section ----------------------------






//-------------------- start video Section ----------------------------

// video hover
let miniVideosVideo = document.querySelectorAll(".mini-video video");
miniVideosVideo.forEach(function(video){
    video.currentTime = 8;
    video.addEventListener("mouseover", function(event){
        event.target.play();

        // video hover progress
        let videoProgressInterval = setInterval(() => {
            event.target.previousElementSibling.style.width = `${(video.currentTime / video.duration * 100)}%`;
        }, 100);
    })
});

miniVideosVideo.forEach(function(video){
    video.addEventListener("mouseleave", function(event){
        event.target.pause()
    });
});


let videoElement = document.querySelector(".video-preview");
let videoPreview = document.querySelector(".video-preview source");
let videoProgress = document.querySelector(".video-progress")
miniVideosVideo.forEach(function(video){
    video.addEventListener("click", function(event){

        // local
        // videoPreview.src = video.firstElementChild.src.slice(video.firstElementChild.src.indexOf("v"));
        // const videoSRC = video.firstElementChild.src.split("/")
        // videoPreview.src = `${videoSRC[3]}/${videoSRC[4]}`;

        // github
        const videoSRC = video.firstElementChild.src.split("/")
        videoPreview.src = `${videoSRC[4]}/${videoSRC[5]}`;
        console.log(videoSRC)
        console.log(videoPreview.src)
        
        



        videoElement.load()

    })
})

// video preview progress
let videoPreviewProgress = document.querySelector(".video-preview-progress");
videoElement.addEventListener("play",function(event){
    let videoPreviewInterval = setInterval(() => {
        videoPreviewProgress.style.height = `${(videoElement.currentTime / videoElement.duration * 100)}%`;

        if (videoElement.paused){
            clearInterval(videoPreviewInterval)
        };

        if (videoElement.currentTime == videoElement.duration){
            clearInterval(videoPreviewInterval);
        }
    }, 100);
})

// play video when section reached
let videoSection = document.getElementById("video");
window.addEventListener("scroll", function(){
    if (this.scrollY >= videoSection.offsetTop - 400 && this.scrollY <= (videoSection.offsetTop + videoSection.offsetHeight) - 300 ){
        videoElement.setAttribute("autoplay","");
        videoElement.play();
        if (videoElement.paused){
            videoElement.pause()
        }
    } else {
        videoElement.pause()
        videoElement.removeAttribute("autoplay");
    }
})





// video play and pause on click
videoElement.addEventListener("click", function(){
    if (videoElement.paused){
        videoElement.play()
    } else {
        videoElement.pause();
    }
})


let miniVideoSVideopan = document.querySelectorAll(".mini-video span");
miniVideoSVideopan.forEach(function(span, i){
    span.innerHTML = i+1;
})



//-------------------- end video Section ----------------------------







//-------------------- start picture Section ----------------------------

// picture slider

// create lis
let pictures = ["images/chernobylite_Home05.jpg", "images/chernobylite_Home12.jpg", "images/chernobylite_Home13.jpg", "images/chernobylite_Home15.jpg", "images/chernobylite_Home16.jpg"];
let pictureUL = document.querySelector(".picture ul");

pictures.forEach(function(image, i){
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(i+1));
    li.setAttribute("data-picture", i)
    pictureUL.appendChild(li);
    document.querySelector(".picture li").className = "active"; 
})


let pictureLi = document.querySelectorAll(".picture ul li");
let picturePreview = document.querySelector(".picture img");
let pictureCounter = 0; 

pictureLi.forEach(function(li){
    li.addEventListener("click", function(event){
        clearInterval(pictureInterval); 
        pictureLi.forEach(function(li){
            li.classList.remove("active");
        });
        event.target.classList.add("active");
        
        picturePreview.src = pictures[event.target.dataset.picture];
        pictureCounter = parseInt(event.target.dataset.picture); 
        picturePreviewTopCounter(); 
    })
})


let nextBTN = document.querySelector(".picture .next");
nextBTN.addEventListener("click", function(){
    clearInterval(pictureInterval);
    if (pictureCounter == pictures.length - 1){
        pictureCounter = -1;
    }
    pictureLi.forEach(function(li){
        li.classList.remove("active");
    })
    pictureUL.children[pictureCounter + 1].classList.add("active");
    picturePreview.src = pictures[pictureCounter + 1];
    pictureCounter++;
    picturePreviewTopCounter();
})


let previousBtn = document.querySelector(".picture .previous");
previousBtn.addEventListener("click",function(){
    clearInterval(pictureInterval);
    if (pictureCounter == 0){
        pictureCounter = pictures.length;
    }
    pictureLi.forEach(function(li){
        li.classList.remove("active");
    })
    pictureUL.children[pictureCounter - 1].classList.add("active");
    picturePreview.src = pictures[pictureCounter - 1];
    pictureCounter--;
    picturePreviewTopCounter();
})


let pictureInterval = setInterval(() => {
    if (pictureCounter == pictures.length - 1){ 
        pictureCounter = -1;
    }
    pictureLi.forEach(function(li){
        li.classList.remove("active");
    })
    pictureUL.children[pictureCounter + 1].classList.add("active");
    picturePreview.src = pictures[pictureCounter + 1];
    pictureCounter++;
    picturePreviewTopCounter();
}, 2000);


let rightArrow = document.querySelector(".picture .right-arrow");
rightArrow.addEventListener("click", function(){
    clearInterval(pictureInterval);
    if (pictureCounter == pictures.length - 1){
        pictureCounter = -1;
    }
    pictureLi.forEach(function(li){
        li.classList.remove("active");
    })
    pictureUL.children[pictureCounter + 1].classList.add("active");
    picturePreview.src = pictures[pictureCounter + 1];
    pictureCounter++;
    picturePreviewTopCounter();
})


let leftArrow = document.querySelector(".picture .left-arrow");
leftArrow.addEventListener("click",function(){
    clearInterval(pictureInterval);
    if (pictureCounter == 0){
        pictureCounter = pictures.length;
    }
    pictureLi.forEach(function(li){
        li.classList.remove("active");
    })
    pictureUL.children[pictureCounter - 1].classList.add("active");
    picturePreview.src = pictures[pictureCounter - 1];
    pictureCounter--;
    picturePreviewTopCounter();
})


function picturePreviewTopCounter(){
    let picturePreviewTopCounter = document.querySelector(".picture .counter");
    picturePreviewTopCounter.innerHTML = `${pictureCounter + 1} of ${pictures.length}`
}



//-------------------- end picture Section ----------------------------






//-------------------- start photo Section ----------------------------


let mainPhoto = document.querySelector(".main-photo img");
let subPhototDiv = document.querySelectorAll(".sub-photo");
let subPhototImg = document.querySelectorAll(".sub-photo img");
subPhototImg.forEach(function(img){
    img.addEventListener("click", function(event){
        mainPhoto.src = event.target.src;
        subPhototDiv.forEach(function(div){
            div.classList.remove("active");
        });
        event.target.parentElement.classList.add("active");
    })
})


let GalleryImages = document.querySelector(".gallery-images");
let lastSubPhoto = document.querySelector(".last-sub-photo");
lastSubPhoto.addEventListener("click",function(){
    document.body.style.setProperty("height","100%");
    document.body.style.setProperty("overflow","hidden");
    GalleryImages.style.display = "block";
})


let galleryCloseBTN = document.querySelector(".gallery-images .gallery-images-header .gallery-images-close");
galleryCloseBTN.addEventListener("click", function(){
    document.body.style.removeProperty("height");
    document.body.style.removeProperty("overflow");
    GalleryImages.style.display = "none";
})


document.addEventListener("keyup", function(event){
    if (event.key == "Escape"){
        document.body.style.removeProperty("height");
        document.body.style.removeProperty("overflow");
        GalleryImages.style.display = "none";
    }
})


let galleryFooter = document.querySelector(".gallery-images-footer");
let galleryFooterCloseBTN = document.querySelector(".gallery-images .gallery-images-footer .gallery-images-footer-close");
galleryFooterCloseBTN.addEventListener("click", function(){
    galleryFooter.classList.toggle("hide");
})


let galleryPreview = document.querySelector(".gallery-images-preview");
galleryPreview.addEventListener("click", function(){
    galleryFooter.classList.toggle("hide");
})



let galleryPreviewSection = document.querySelector(".gallery-images");
let galleryLeftArrow = document.querySelector(".gallery-images-left-arrow");
let galleryrightArrow = document.querySelector(".gallery-images-right-arrow");
let gpTimeOut;
function galleryTimeout(){
    gpTimeOut = setTimeout(() => {
        galleryLeftArrow.classList.add("hide");
        galleryrightArrow.classList.add("hide");
    }, 5000);
};

lastSubPhoto.addEventListener("click",function(){
    galleryTimeout();
});

galleryPreviewSection.addEventListener("mousemove", function(event){
    if (galleryLeftArrow.classList.contains("hide") && galleryrightArrow.classList.contains("hide")){
        galleryLeftArrow.classList.remove("hide");
        galleryrightArrow.classList.remove("hide");
    } else {
        clearTimeout(gpTimeOut);
        galleryTimeout()
    }
});

let hoverInterval;

galleryrightArrow.addEventListener("mouseenter", function(){
    hoverInterval = setInterval(() => {
        clearTimeout(gpTimeOut);
    }, 4000);
});

galleryrightArrow.addEventListener("mouseleave", function(){
    clearInterval(hoverInterval);
});

galleryLeftArrow.addEventListener("mouseenter", function(){
    hoverInterval = setInterval(() => {
        clearTimeout(gpTimeOut);
    }, 4000); 
});
galleryLeftArrow.addEventListener("mouseleave", function(){
    clearInterval(hoverInterval);
})


let photoAndInfo = {
    src : 
    ["chernobylite_Home06","chernobylite_Home22","chernobylite_Home03","chernobylite_Home15","chernobylite_Home05","chernobylite_Home07","chernobylite_Home08","chernobylite_ScienceFiction05","chernobylite_ScienceFiction06","chernobylite_Horror03","chernobylite_ScienceFiction07","chernobylite_Home12","chernobylite_Home13","chernobylite_Home14","chernobylite_Home01","chernobylite_Home16","chernobylite_Home17","chernobylite_Home18","chernobylite_Home19","chernobylite_Home20","chernobylite_Home21","chernobylite_Home02","chernobylite_Home04","chernobylite_Horror01","chernobylite_Horror02","chernobylite_ScienceFiction01","chernobylite_ScienceFiction02","chernobylite_ScienceFiction03","chernobylite_ScienceFiction04"],
    gameplay : 
    ["Easy","Hard","Medium","Hard","Hard","Easy","Easy","Hard","Medium","Medium","Hard","Easy","Easy","Hard","Hard","Easy","Easy","Easy","Easy","Hard","Medium","Hard","Easy","Hard","Medium","Medium","Hard","Hard","Easy"],
    type : 
    ["General","General","General","General","General","General","General","Science Fiction","Science Fiction","Horror","Science Fiction","General","General","General","General","General","General","General","General","General","General","General","General","Horror","Horror","Science Fiction","Science Fiction","Science Fiction","Science Fiction"],
    description : 
    ["Chernobylite is a Science Fiction Survival Horror RPG from developers Farm 51.","Set in the hyper-realistic, 3D scanned wasteland of Chernobyl's exclusion zone,","you'll take on the role of Igor, a physicist and ex-employee of the Chernobyl Power Plant,"," returning to Pripyat to investigate the mysterious disappearance of his fiancée, 30 years prior.","No playthrough is the same. Like your choices, the story is in your hands. Choose wisely whether to trust your comrades or not, Get ready for a thrilling adventure of survival, conspiracy, horror, love, and obsession.","Compete with the hostile military presence, other stalkers and supernatural creatures,","as well as the harsh and unforgiving environment in your search to uncover the truth.","Get ready for a thrilling adventure of survival, conspiracy, horror, love, and obsession.","Construct a base from which to plan your daily operations and excursions.","Utilise workstations to craft gadgets,","create traps and weapons or modify existing equipment to your needs.","Survival in the Zone is not easy, and each day brings fresh challenges as comrades die and supplies diminish.","Avoid detection with stealth takedowns or engage in open armed","Danger lurks in every corner.","Companions are key to your survival and the resolution of your journey.","Each day requires the careful planning and assignment of resources and tasks to your comrades.","use resources for survival or research, and confront conflicts or evade them.","The future is up to you.","Can you survive your fears?","Stealth, Survival & Combat","Non-Linear Storytelling & Strategy","Charity Pack","The Art of Chernobylite","Short Story: The Arrival","Zone Bard Pack"," each day brings fresh challenges as comrades die and supplies diminish.","Adventure of survival, conspiracy, horror, love, and obsession.","Utilise workstations to craft gadgets, create traps and weapons or modify existing equipment to your needs.","The future is up to you."]
}

let previewImage = document.querySelector(".gallery-images-preview img");
let gameplay = document.querySelector(".gallery-images-footer .gameplay");
let type = document.querySelector(".gallery-images-footer .type");
let description = document.querySelector(".gallery-images-footer .description");
let photoCounter = 4;

galleryrightArrow.addEventListener("click", function(event){
    if (photoCounter == photoAndInfo.src.length - 1){
        photoCounter = -1;
    }

    photoCounter++;
    previewImage.src = `images/${photoAndInfo.src[photoCounter]}.jpg`;
    gameplay.textContent = photoAndInfo.gameplay[photoCounter];
    type.textContent = photoAndInfo.type[photoCounter];
    description.textContent = photoAndInfo.description[photoCounter];

    let galleryImagesCounter = document.querySelector(".gallery-images-counter");
    galleryImagesCounter.innerHTML = `${photoCounter + 1} of ${photoAndInfo.src.length}`

    clearTimeout(gpTimeOut);
    galleryTimeout()
});

document.addEventListener("keyup",function(event){
    if (event.key == "ArrowRight"){
        if (photoCounter == photoAndInfo.src.length - 1 ){
        photoCounter = -1;
        }

        photoCounter++;
        previewImage.src = `images/${photoAndInfo.src[photoCounter]}.jpg`;
        gameplay.textContent = photoAndInfo.gameplay[photoCounter];
        type.textContent = photoAndInfo.type[photoCounter];
        description.textContent = photoAndInfo.description[photoCounter];

        let galleryImagesCounter = document.querySelector(".gallery-images-counter");
        galleryImagesCounter.innerHTML = `${photoCounter + 1} of ${photoAndInfo.src.length}`
    }
});

galleryLeftArrow.addEventListener("click", function(event){
    if (photoCounter == 0){
        photoCounter = photoAndInfo.src.length;
        }

    photoCounter--;
    previewImage.src = `images/${photoAndInfo.src[photoCounter]}.jpg`;
    gameplay.textContent = photoAndInfo.gameplay[photoCounter];
    type.textContent = photoAndInfo.type[photoCounter];
    description.textContent = photoAndInfo.description[photoCounter];

    let galleryImagesCounter = document.querySelector(".gallery-images-counter");
    galleryImagesCounter.innerHTML = `${photoCounter + 1} of ${photoAndInfo.src.length}`

    clearTimeout(gpTimeOut);
    galleryTimeout()
});

document.addEventListener("keyup",function(event){
    if (event.key == "ArrowLeft"){
        if (photoCounter == 0){
        photoCounter = photoAndInfo.src.length;
        }

        photoCounter--;
        previewImage.src = `images/${photoAndInfo.src[photoCounter]}.jpg`;
        gameplay.textContent = photoAndInfo.gameplay[photoCounter];
        type.textContent = photoAndInfo.type[photoCounter];
        description.textContent = photoAndInfo.description[photoCounter];

        let galleryImagesCounter = document.querySelector(".gallery-images-counter");
        galleryImagesCounter.innerHTML = `${photoCounter + 1} of ${photoAndInfo.src.length}`
    }
});

let galleryImagesCounter = document.querySelector(".gallery-images-counter");
galleryImagesCounter.innerHTML = `${photoCounter + 1} of ${photoAndInfo.src.length}`

let lastSubPhotoCounter = document.querySelector(".last-sub-photo .photo-counter");
lastSubPhotoCounter.innerHTML = `+${photoAndInfo.src.length}`




//-------------------- end photo Section ----------------------------







