/*-----------Proges bar-----------*/
let interval;
let width = 0;

let isBaking = false;
let button = document.querySelector(".btn");
let flour = document.querySelector(".flour");
let counter = document.querySelector(".cookies");
let cookieNumber = document.querySelector(".bakedCookies");

let divek = document.querySelector(".notEnoughFlour");
let notEnoughFlour;
notEnoughFlour = document.createElement("div");
notEnoughFlour.textContent = "Za mało mąki!";
notEnoughFlour.id = "notEnoughFlour";

let table = document.querySelector(".table");

let ovenCookies = document.querySelector(".bakingCookies");

let ovenButton = document.querySelector(".oven-button");
let flourButton = document.querySelector(".buyFlourButton");

let numberOfDough = 0;
let numberOfFlour = 100;
let numberOfCookies = 0;
let numberOfOvenCookies = 0;
let brownCookies = 0;
let money = 0;

let fullOven = document.querySelector(".notEnoughSpaceInOven");
let notEnoughSpaceInOven;
notEnoughSpaceInOven = document.createElement("div");
notEnoughSpaceInOven.textContent = "Piec jest pełen!";
notEnoughSpaceInOven.id = "notEnoughSpaceInOven";

let noCookies = document.querySelector(".cookie-oven-button");
let notEnoughCookies;
notEnoughCookies = document.createElement("div");
notEnoughCookies.textContent =
  "Robiliśmy co w naszej mocy, ale mamy za mało ciastek!";
notEnoughCookies.id = "notEnoughCookies";

let oven = document.querySelector(".oven");

let readyCookies = document.querySelector(".readyCookies");


let earnedMoney = document.querySelector(".plny");

function updateMoneyDisplay() {
  earnedMoney.textContent = money;
}
function updateReadyCookiesDisplay() {
  readyCookies.textContent = brownCookies;
}

function updateOvenDisplay() {
  ovenCookies.textContent = numberOfOvenCookies;
}

function updateCookieDisplay() {
  cookieNumber.textContent = numberOfCookies;
}

function updateFlourDisplay() {
  flour.textContent = numberOfFlour;
}

function updateCounterDisplay() {
  counter.textContent = numberOfDough;
}

function move() {
  if (isBaking == false) {
    let elem = document.querySelector("#myBar");
    button.innerText = "Przestań lepić";
    interval = setInterval(frame, 5);

    function frame() {
      let isFlourSubstracted = false;
      if (width === 0) {
        numberOfFlour -= 10;
        isFlourSubstracted = true;
        updateFlourDisplay();
      }
      if (width >= 100) {
        numberOfDough++;
        updateCounterDisplay();
        width = 0;
        elem.style.width = 0 + "%";

        let balls = document.createElement("div");
        balls.classList.add("yellowBalls");
        table.append(balls);

        balls.addEventListener("click", doughShrink);
        let currentWidth = 50;
        let currentHeight = 50;

        function doughShrink() {
          currentWidth -= 5;
          balls.style.width = currentWidth + "px";
          currentHeight -= 5;
          balls.style.height = currentHeight + "px";
          numberOfCookies++;
          updateCookieDisplay();

          if (currentWidth == 0) {
            balls.remove();
            numberOfDough--;
            counter.textContent = numberOfDough;
            return;
          }
        }

        if (numberOfFlour < 10 && isFlourSubstracted === false) {
          clearInterval(interval);
          isFlourSubstracted = false;
          isBaking == false;
          divek.append(notEnoughFlour);
          button.disabled = true;
          return;
        }
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
    isBaking = true;
  } else {
    button.innerText = "Ulep ciasto";
    clearInterval(interval);
    isBaking = false;
  }
}

/*----------- Yellow Balls -----------*/
function createBall() {
  let balls = document.createElement("div");
  balls.classList.add("yellowBalls");
  table.append(balls);
}

// /*----------- Oven -----------*/

ovenButton.addEventListener("click", function () {
  if (numberOfCookies >= 1 && numberOfOvenCookies < 9) {
    numberOfCookies--;
    numberOfOvenCookies++;
    updateCookieDisplay();
    updateOvenDisplay();
    const freshCookies = document.createElement("div");
    freshCookies.classList.add("freshCookies");
    oven.append(freshCookies);

    function removeCookie() {
      freshCookies.remove();
      if (numberOfOvenCookies >= 1) {
        numberOfOvenCookies--;
        updateOvenDisplay();

      }
      
    }

    setTimeout(removeCookie, 12000);

    freshCookies.addEventListener("click", function () {
      
      if (
        window.getComputedStyle(freshCookies).backgroundColor ===
        "rgb(165, 42, 42)"
      ) {
        brownCookies++;
        updateReadyCookiesDisplay();
      }

      removeCookie();

    });
  }

  if (numberOfOvenCookies === 9) {
    fullOven.append(notEnoughSpaceInOven);
  }

  setTimeout(ovenAlert, 3000);

  if (numberOfCookies === 0) {
    noCookies.append(notEnoughCookies);
    setTimeout(cookieRemove, 4000);
  }
});

/*----------- Alert -----------*/
function cookieRemove() {
  notEnoughCookies.remove();
}

function ovenAlert() {
  notEnoughSpaceInOven.remove();
}

/*---------- SELL ----------*/



function randomCookie() {
  let soldCookies = Math.floor(Math.random() * 10) + 1;
  console.log({ soldCookies });

  if (brownCookies > soldCookies) {
    
    brownCookies = brownCookies - soldCookies;

    if (soldCookies >= 5) {
      money = money + soldCookies * 4;
      updateMoneyDisplay();
      
    } else {
      money = money + soldCookies * 5;
      updateMoneyDisplay();
    }

    updateReadyCookiesDisplay();
  }
  
  let time = Math.round(Math.random() * (6000 - 3000)) + 3000;
  setTimeout(randomCookie, time);
}

randomCookie();

/*---------- BUY FLOUR ----------*/
flourButton.addEventListener("click", function () {
  if (money >= 50) {
    money = money - 50;
    numberOfFlour = numberOfFlour + 100;
    updateMoneyDisplay();
    updateFlourDisplay();
    button.disabled = false;
    notEnoughFlour.remove();
  }
});
