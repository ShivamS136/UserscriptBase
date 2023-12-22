// ==UserScript==
// @name         TestSayHello
// @version      0.0.1
// @author       shivshrm@
// @description  Test Description for SayHello Script
// @match        https://www.google.com/*
// ==/UserScript==

(() => {
  function sayHello(name) {
    return `Hi, ${name}!`;
  }
  console.log(sayHello('Shivam'));
})();
