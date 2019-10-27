/*! echo.js v1.7.0 | (c) 2015 @toddmotto | https://github.com/toddmotto/echo */
!function(t,e){"function"==typeof define&&define.amd?define(function(){return e(t)}):"object"==typeof exports?module.exports=e:t.echo=e(t)}(this,function(t){"use strict";var e,n,o,r,c,a={},u=function(){},d=function(t){return null===t.offsetParent},i=function(t,e){if(d(t))return!1;var n=t.getBoundingClientRect();return n.right>=e.l&&n.bottom>=e.t&&n.left<=e.r&&n.top<=e.b},l=function(){(r||!n)&&(clearTimeout(n),n=setTimeout(function(){a.render(),n=null},o))};return a.init=function(n){n=n||{};var d=n.offset||0,i=n.offsetVertical||d,f=n.offsetHorizontal||d,s=function(t,e){return parseInt(t||e,10)};e={t:s(n.offsetTop,i),b:s(n.offsetBottom,i),l:s(n.offsetLeft,f),r:s(n.offsetRight,f)},o=s(n.throttle,250),r=n.debounce!==!1,c=!!n.unload,u=n.callback||u,a.render(),document.addEventListener?(t.addEventListener("scroll",l,!1),t.addEventListener("load",l,!1)):(t.attachEvent("onscroll",l),t.attachEvent("onload",l))},a.render=function(){for(var n,o,r=document.querySelectorAll("img[data-echo], [data-echo-background]"),d=r.length,l={l:0-e.l,t:0-e.t,b:(t.innerHeight||document.documentElement.clientHeight)+e.b,r:(t.innerWidth||document.documentElement.clientWidth)+e.r},f=0;d>f;f++)o=r[f],i(o,l)?(c&&o.setAttribute("data-echo-placeholder",o.src),null!==o.getAttribute("data-echo-background")?o.style.backgroundImage="url("+o.getAttribute("data-echo-background")+")":o.src=o.getAttribute("data-echo"),c||(o.removeAttribute("data-echo"),o.removeAttribute("data-echo-background")),u(o,"load")):c&&(n=o.getAttribute("data-echo-placeholder"))&&(null!==o.getAttribute("data-echo-background")?o.style.backgroundImage="url("+n+")":o.src=n,o.removeAttribute("data-echo-placeholder"),u(o,"unload"));d||a.detach()},a.detach=function(){document.removeEventListener?t.removeEventListener("scroll",l):t.detachEvent("onscroll",l),clearTimeout(n)},a});

window.addEventListener('load', function() {
  echo.init({ offsetVertical: 10000 });
})

var themes = [
  
  {
    "title": "Streamer Theme",
    "date": "2019-10-19 00:00:00 +0000",
    "thumbnail": "/thumbnails/streamer-theme.png",
    "author": "Brady Kondek",
    "url": "/streamer-theme/",
    "stars": "",
    "demo": "https://www.streamertheme.ga"
  }
  
];

var articleElement = document.getElementById('demo');

if(articleElement) {
  
  loadDemo('Streamer Theme');
}

function loadDemo(title) {
  for(var i = 0; i < themes.length; i++) {
    if(themes[i].title === title) {
      articleElement.innerHTML = '<a href="' + themes[i].url + '">' +
                                   '<h1>' + title + '</h1>' +
                                 '</a>' +
                                 '<iframe src="' + themes[i].demo + '" />';
      return;
    }
  }
}
var transparentImage = '/assets/placeholder.png';
var indexList = document.getElementById('index-list');
if(indexList) { sort('loadOrder'); }

function sort(method) {
  this[method]();
  var html = '';

  for(var i = 0; i < themes.length; i++) {
    if(!themes[i]) { continue; }

    html += '<li>' +
              '<a href="' + themes[i].url + '">' +
                '<img src="' + transparentImage + '"' +
                      'data-echo="'+ themes[i].thumbnail +'">' +
                '<div>' + themes[i].title + '</div>' +
              '</a>' +
            '</li>';
  }

  indexList.innerHTML = html;
  echo.render();
  saveOrder();
}

function saveOrder() {
  var themeTitles = themes.map(function(theme) { return theme.title; });
  sessionStorage.setItem('order', JSON.stringify(themeTitles));
}

function loadOrder() {
  var newOrder = [];
  var themeTitles = JSON.parse(sessionStorage.getItem('order'));
  if(!themeTitles) { shuffle(); return; }

  themes.forEach(function(theme) {
    newOrder[themeTitles.indexOf(theme.title)] = theme;
  });

  themes = newOrder;
}

function shuffle() {
  var currentIndex = themes.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = themes[currentIndex];
    themes[currentIndex] = themes[randomIndex];
    themes[randomIndex] = temporaryValue;
  }
}

function alphabetical() {
  themes.sort(function(a, b){
    var titleA = a.title.toLowerCase();
    var titleB = b.title.toLowerCase();
    if(titleA < titleB) return -1;
    if(titleA > titleB) return 1;
    return 0;
  });
}

function latest() {
  themes.sort(function(a, b){
    if(a.date < b.date) return 1;
    if(a.date > b.date) return -1;
    return 0;
  });
}

function popularity() {
  themes.sort(function(a, b){
    return b.stars - a.stars;
  });
}

var post = document.getElementsByClassName('post')[0];
if(post) { loadOrder(); }

function previous(title) {
  var i = findThemeIndex(title);
  var previous = (i + themes.length - 1) % themes.length;
  window.location.href = themes[previous].url;
}

function next(title) {
  var i = findThemeIndex(title);
  var next = (i + 1) % themes.length;
  window.location.href = themes[next].url;
}

function findThemeIndex(title) {
  for(var i = 0; i < themes.length; i++) {
    if(themes[i].title === title) {
      return i;
    }
  }
}