// ==UserScript==
// @name         TestRandomNumber
// @version      0.0.1
// @author       shivshrm@
// @description  Test Description for RandomNumber
// @match        https://www.google.com/*
// ==/UserScript==

(() => {
  function getRandomNumber(max: number = 10) {
    return Math.floor(Math.random() * max);
  }
  console.log(getRandomNumber(20));
})();
