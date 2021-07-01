/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_countTimer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/countTimer */ \"./src/modules/countTimer.js\");\n/* harmony import */ var _modules_toggleMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/toggleMenu */ \"./src/modules/toggleMenu.js\");\n/* harmony import */ var _modules_togglePopup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/togglePopup */ \"./src/modules/togglePopup.js\");\n/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/tabs */ \"./src/modules/tabs.js\");\n/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ \"./src/modules/slider.js\");\n/* harmony import */ var _modules_photoTeam__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/photoTeam */ \"./src/modules/photoTeam.js\");\n/* harmony import */ var _modules_checks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/checks */ \"./src/modules/checks.js\");\n/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/calc */ \"./src/modules/calc.js\");\n/* harmony import */ var _modules_sendForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/sendForm */ \"./src/modules/sendForm.js\");\n\n\n\n\n\n\n\n\n\n\n //Таймер\n\n(0,_modules_countTimer__WEBPACK_IMPORTED_MODULE_0__.default)('21 June 2022'); //Меню\n\n(0,_modules_toggleMenu__WEBPACK_IMPORTED_MODULE_1__.default)(); //Popup\n\n(0,_modules_togglePopup__WEBPACK_IMPORTED_MODULE_2__.default)(); //Табы\n\n(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__.default)(); //Slider\n\n(0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__.default)(); //НАша команда\n\n(0,_modules_photoTeam__WEBPACK_IMPORTED_MODULE_5__.default)(); //Разрешение ввода\n\n(0,_modules_checks__WEBPACK_IMPORTED_MODULE_6__.default)(); //Калькулятор\n\n(0,_modules_calc__WEBPACK_IMPORTED_MODULE_7__.default)(100); //Send-ajax-form\n\n(0,_modules_sendForm__WEBPACK_IMPORTED_MODULE_8__.default)();\n\n//# sourceURL=webpack://glo/./src/index.js?");

/***/ }),

/***/ "./src/modules/calc.js":
/*!*****************************!*\
  !*** ./src/modules/calc.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar calc = function calc() {\n  var price = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;\n  var calcBlock = document.querySelector('.calc-block'),\n      calcType = document.querySelector('.calc-type'),\n      calcSquare = document.querySelector('.calc-square'),\n      calcDay = document.querySelector('.calc-day'),\n      calcCount = document.querySelector('.calc-count'),\n      totalValue = document.getElementById('total');\n\n  var countSum = function countSum() {\n    var total = 0,\n        countValue = 1,\n        dayValue = 1,\n        count = 0;\n    var typeValue = calcType.options[calcType.selectedIndex].value;\n    var squareValue = +calcSquare.value;\n\n    if (calcCount.value > 1) {\n      countValue += (calcCount.value - 1) / 10;\n    }\n\n    if (calcDay.value && calcDay.value < 5) {\n      dayValue *= 2;\n    } else if (calcDay.value && calcDay.value < 10) {\n      dayValue *= 1.5;\n    }\n\n    if (typeValue && squareValue) {\n      total = price * typeValue * squareValue * countValue * dayValue;\n    }\n\n    function n(t) {\n      var id = setInterval(function () {\n        if (count <= total - 1000) {\n          totalValue.textContent = count;\n          count += 500;\n        }\n\n        if (count <= total - 100) {\n          totalValue.textContent = count;\n          count += 50;\n        } else if (count <= total - 10) {\n          totalValue.textContent = count;\n          count += 5;\n        } else if (count <= total) {\n          totalValue.textContent = count;\n          count += 1;\n        } else {\n          clearInterval(id);\n        }\n      }, t);\n    }\n\n    n(0.1);\n    /* totalValue.textContent = total; */\n  };\n\n  calcBlock.addEventListener('change', function (event) {\n    var target = event.target;\n\n    if (target.matches('select') || target.matches('input')) {\n      countSum();\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);\n\n//# sourceURL=webpack://glo/./src/modules/calc.js?");

/***/ }),

/***/ "./src/modules/checks.js":
/*!*******************************!*\
  !*** ./src/modules/checks.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar checks = function checks() {\n  var calcItem = document.querySelectorAll('.calc-item'),\n      mainFormInput = document.querySelector('.main-form-input'),\n      mainForm = document.getElementById('form3'),\n      foterFormInput = document.querySelector('.footer-form-input');\n  calcItem.forEach(function (item, i) {\n    if (i > 0) {\n      item.addEventListener('input', function () {\n        item.value = item.value.replace(/[^0-9]/, '');\n      });\n    }\n  });\n\n  var checkValue = function checkValue(event) {\n    var target = event.target;\n\n    if (target.name === 'user_name') {\n      target.value = target.value.replace(/[^а-яё ]/gi, '');\n    } else if (target.closest('#form2-message')) {\n      target.value = target.value.replace(/[^а-яё 0-9,]/gi, '');\n    } else if (target.name === 'user_email') {\n      target.value = target.value.replace(/[^a-z@_\\-.!~*']/gi, '');\n    } else if (target.name === 'user_phone') {\n      target.value = target.value.replace(/[^0-9\\+]/gi, '');\n    }\n\n    target.addEventListener('blur', function () {\n      if (target.name === 'user_name') {\n        target.value = target.value.replace(/\\s+/gi, ' ');\n        target.value = target.value.replace(/-+/gi, '-');\n        target.value = target.value.replace(/(^\\s+|\\s+$)/g, '');\n        target.value = target.value.replace(/(^|\\s|-)\\S/g, function (a) {\n          return a.toUpperCase();\n        });\n      } else if (target.closest('#form2-message')) {\n        target.value = target.value.replace(/\\s+/gi, ' ');\n        target.value = target.value.replace(/-+/gi, '-');\n        target.value = target.value.replace(/(^\\s+|\\s+$)/g, '');\n      }\n    });\n  };\n\n  foterFormInput.addEventListener('input', function (event) {\n    checkValue(event);\n  });\n  mainFormInput.addEventListener('input', function (event) {\n    checkValue(event);\n  });\n  mainForm.addEventListener('input', function (event) {\n    checkValue(event);\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (checks);\n\n//# sourceURL=webpack://glo/./src/modules/checks.js?");

/***/ }),

/***/ "./src/modules/countTimer.js":
/*!***********************************!*\
  !*** ./src/modules/countTimer.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction countTimer(deadline) {\n  var timerHours = document.getElementById('timer-hours'),\n      timerMinutes = document.getElementById('timer-minutes'),\n      timerSeconds = document.getElementById('timer-seconds');\n\n  function getTimeRemainning() {\n    var dataStop = new Date(deadline).getTime(),\n        dateNow = new Date().getTime(),\n        timeRemaining = (dataStop - dateNow) / 1000,\n        seconds = Math.floor(timeRemaining % 60),\n        minutes = Math.floor(timeRemaining / 60 % 60),\n        hours = Math.floor(timeRemaining / 60 / 60);\n    return {\n      timeRemaining: timeRemaining,\n      seconds: seconds,\n      minutes: minutes,\n      hours: hours\n    };\n  }\n\n  var idSetInt = setInterval(function () {\n    var timer = getTimeRemainning();\n\n    if (timer.hours < 10) {\n      timerHours.textContent = '0' + timer.hours;\n    } else {\n      timerHours.textContent = timer.hours;\n    }\n\n    if (timer.minutes < 10) {\n      timerMinutes.textContent = '0' + timer.minutes;\n    } else {\n      timerMinutes.textContent = timer.minutes;\n    }\n\n    if (timer.seconds < 10) {\n      timerSeconds.textContent = '0' + timer.seconds;\n    } else {\n      timerSeconds.textContent = timer.seconds;\n    }\n\n    if (timer.timeRemaining < 0) {\n      clearInterval(idSetInt);\n      timerHours.textContent = '00';\n      timerMinutes.textContent = '00';\n      timerSeconds.textContent = '00';\n    }\n  }, 1000);\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (countTimer);\n\n//# sourceURL=webpack://glo/./src/modules/countTimer.js?");

/***/ }),

/***/ "./src/modules/photoTeam.js":
/*!**********************************!*\
  !*** ./src/modules/photoTeam.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar photoTeam = function photoTeam() {\n  var commandPhoto = document.querySelectorAll('.command__photo');\n  commandPhoto.forEach(function (event) {\n    event.addEventListener('mouseenter', function (event) {\n      var srcImg = event.target.src;\n      event.target.src = event.target.dataset.img;\n      event.target.dataset.img = srcImg;\n    });\n  });\n  commandPhoto.forEach(function (event) {\n    event.addEventListener('mouseleave', function (event) {\n      var srcImg = event.target.src;\n      event.target.src = event.target.dataset.img;\n      event.target.dataset.img = srcImg;\n    });\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (photoTeam);\n\n//# sourceURL=webpack://glo/./src/modules/photoTeam.js?");

/***/ }),

/***/ "./src/modules/sendForm.js":
/*!*********************************!*\
  !*** ./src/modules/sendForm.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar sendForm = function sendForm() {\n  var errorNessage = 'Что то пошло не так',\n      loadMessage = '<img src=\"../images/loading.gif\" style=\"width:50px;height:auto;\">',\n      successMesage = 'Спасибо! Мы скоро с Вами свяжемся.';\n  var form = document.querySelectorAll('form');\n  var statusMessage = document.createElement('div');\n  statusMessage.style.cssText = 'font-size: 3rem;';\n  statusMessage.style.cssText = 'color: white;';\n\n  var resetInput = function resetInput(form) {\n    var inputs = form.querySelectorAll('input');\n    inputs.forEach(function (input) {\n      input.value = '';\n    });\n  };\n\n  var postData = function postData(body) {\n    return fetch('./server.php', {\n      method: 'POST',\n      headers: {\n        'Conternt-Type': 'application/json'\n      },\n      body: body\n    });\n    /* return new Promise((resolve, reject) => {\r\n        const request = new XMLHttpRequest();\r\n        request.addEventListener('readystatechange', () => {\r\n            if (request.readyState !==4) {\r\n                return;\r\n            }\r\n            if (request.status === 200) {\r\n                resolve();\r\n            } else {\r\n                console.warn(request.status);\r\n                reject();\r\n              }\r\n        });\r\n        request.open('POST', './server.php');\r\n        request.setRequestHeader('Conternt-Type', 'application/json');\r\n        \r\n        request.send(JSON.stringify(body));\r\n    }); */\n  };\n\n  form.forEach(function (item) {\n    item.addEventListener('submit', function (event) {\n      event.preventDefault();\n      item.appendChild(statusMessage);\n      statusMessage.innerHTML = loadMessage;\n      var formData = new FormData(item);\n      /* let body = {};\r\n      formData.forEach((value, i) => {\r\n          body[i] = value;                \r\n      }); */\n\n      postData(formData).then(function (response) {\n        if (response.status !== 200) {\n          throw new Error('status not 200');\n        }\n\n        statusMessage.textContent = successMesage;\n      })[\"catch\"](function () {\n        statusMessage.textContent = errorNessage;\n      });\n      /* .then(statusMessage.textContent = successMesage)\r\n      .catch(statusMessage.textContent = errorNessage); */\n\n      resetInput(item);\n    });\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendForm);\n\n//# sourceURL=webpack://glo/./src/modules/sendForm.js?");

/***/ }),

/***/ "./src/modules/slider.js":
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar slider = function slider() {\n  var slide = document.querySelectorAll('.portfolio-item'),\n      btn = document.querySelectorAll('.portfolio-btn'),\n      portfolioDot = document.querySelector('.portfolio-dots'),\n      slider = document.querySelector('.portfolio-content');\n\n  for (var i = 0; i < slide.length; i++) {\n    // Создаем li с классом dot\n    var newDot = document.createElement('li');\n    newDot.classList.add('dot');\n    portfolioDot.insertAdjacentElement('beforeend', newDot);\n  }\n\n  var dot = document.querySelectorAll('.dot');\n  var currentSlide = 0,\n      interval;\n\n  var prevSlide = function prevSlide(elem, index, strClass) {\n    elem[index].classList.remove(strClass);\n  };\n\n  var nextSlide = function nextSlide(elem, index, strClass) {\n    elem[index].classList.add(strClass);\n  };\n\n  var autoPlay = function autoPlay() {\n    prevSlide(slide, currentSlide, 'portfolio-item-active');\n    prevSlide(dot, currentSlide, 'dot-active');\n    currentSlide++;\n\n    if (currentSlide >= slide.length) {\n      currentSlide = 0;\n    }\n\n    nextSlide(slide, currentSlide, 'portfolio-item-active');\n    nextSlide(dot, currentSlide, 'dot-active');\n  };\n\n  var startSlide = function startSlide() {\n    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;\n    interval = setInterval(autoPlay, time);\n  };\n\n  startSlide(1500);\n\n  var stopSlide = function stopSlide() {\n    clearInterval(interval);\n  };\n\n  slider.addEventListener('click', function (event) {\n    event.preventDefault();\n    var target = event.target;\n\n    if (!target.matches('.portfolio-btn, .dot')) {\n      return;\n    }\n\n    prevSlide(slide, currentSlide, 'portfolio-item-active');\n    prevSlide(dot, currentSlide, 'dot-active');\n\n    if (target.matches('#arrow-left')) {\n      currentSlide--;\n    } else if (target.matches('#arrow-right')) {\n      currentSlide++;\n    } else if (target.matches('.dot')) {\n      dot.forEach(function (elem, index) {\n        if (elem === target) {\n          currentSlide = index;\n        }\n      });\n    }\n\n    if (currentSlide >= slide.length) {\n      currentSlide = 0;\n    } else if (currentSlide < 0) {\n      currentSlide = slide.length - 1;\n    }\n\n    nextSlide(slide, currentSlide, 'portfolio-item-active');\n    nextSlide(dot, currentSlide, 'dot-active');\n  });\n  slider.addEventListener('mouseover', function (event) {\n    if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {\n      stopSlide(1500);\n    }\n  });\n  slider.addEventListener('mouseout', function (event) {\n    if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {\n      startSlide(1500);\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);\n\n//# sourceURL=webpack://glo/./src/modules/slider.js?");

/***/ }),

/***/ "./src/modules/tabs.js":
/*!*****************************!*\
  !*** ./src/modules/tabs.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar tabs = function tabs() {\n  var serviceHeader = document.querySelector('.service-header'),\n      tab = serviceHeader.querySelectorAll('.service-header-tab'),\n      serviceTab = document.querySelectorAll('.service-tab');\n\n  var toggleTabContent = function toggleTabContent(index) {\n    for (var i = 0; i < serviceTab.length; i++) {\n      if (index === i) {\n        tab[i].classList.add('active');\n        serviceTab[i].classList.remove('d-none');\n      } else {\n        tab[i].classList.remove('active');\n        serviceTab[i].classList.add('d-none');\n      }\n    }\n  };\n\n  serviceHeader.addEventListener('click', function (event) {\n    var target = event.target;\n    target = target.closest('.service-header-tab');\n\n    if (target) {\n      tab.forEach(function (item, i) {\n        if (item === target) {\n          toggleTabContent(i);\n        }\n      });\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);\n\n//# sourceURL=webpack://glo/./src/modules/tabs.js?");

/***/ }),

/***/ "./src/modules/toggleMenu.js":
/*!***********************************!*\
  !*** ./src/modules/toggleMenu.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar toggleMenu = function toggleMenu() {\n  var bodyContent = document.querySelector('body'),\n      menu = document.querySelector('menu');\n\n  var handlerMenu = function handlerMenu() {\n    menu.classList.toggle('active-menu');\n  };\n\n  bodyContent.addEventListener('click', function (event) {\n    var target = event.target;\n\n    if (target.closest('.menu') || target.closest('.close-btn') || target.closest('menu > ul > li')) {\n      handlerMenu();\n    } else if (!target.closest('menu')) {\n      menu.classList.remove('active-menu');\n    }\n  }); //Анимация перехода меню\n\n  menu.querySelectorAll('a[href^=\"#\"').forEach(function (link) {\n    //ищем все ссылки с #\n    link.addEventListener('click', function (e) {\n      //вешаем на них событие\n      e.preventDefault(); //отменяем стандартные действия\n\n      var href = this.getAttribute('href').substring(1); //получаем атрибуты ссылки\n\n      if (href === 'close' || href === '') {\n        return;\n      } else {\n        var scrollTarget = document.getElementById(href),\n            topOffset = 0,\n            elementPosition = scrollTarget.getBoundingClientRect().top,\n            offsetPosition = elementPosition - topOffset;\n        window.scrollBy({\n          top: offsetPosition,\n          behavior: 'smooth'\n        });\n      }\n    });\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toggleMenu);\n\n//# sourceURL=webpack://glo/./src/modules/toggleMenu.js?");

/***/ }),

/***/ "./src/modules/togglePopup.js":
/*!************************************!*\
  !*** ./src/modules/togglePopup.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar togglePopup = function togglePopup() {\n  var popup = document.querySelector('.popup'),\n      popupContent = document.querySelector('.popup-content'),\n      popupBtn = document.querySelectorAll('.popup-btn');\n  var count = 0,\n      leftInterval;\n\n  var leftAnimate = function leftAnimate() {\n    leftInterval = requestAnimationFrame(leftAnimate);\n    count++;\n\n    if (count < 39) {\n      popupContent.style.left = count + '%';\n    } else {\n      cancelAnimationFrame(leftInterval);\n      count = 0;\n    }\n  };\n\n  popupBtn.forEach(function (elem) {\n    elem.addEventListener('click', function () {\n      popupContent.style.left = 0;\n      popup.style.display = \"block\";\n\n      if (screen.width >= 768) {\n        leftInterval = requestAnimationFrame(leftAnimate);\n      }\n    });\n  });\n  popup.addEventListener('click', function (event) {\n    var target = event.target;\n\n    if (target.classList.contains('popup-close')) {\n      popup.style.display = \"none\";\n    } else {\n      target = target.closest('.popup-content');\n\n      if (!target) {\n        popup.style.display = \"none\";\n      }\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (togglePopup);\n\n//# sourceURL=webpack://glo/./src/modules/togglePopup.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;