module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sdk_aliSpeechSdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sdk/aliSpeechSdk */ \"./src/sdk/aliSpeechSdk.js\");\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (_sdk_aliSpeechSdk__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/sdk/aliSpeechSdk.js":
/*!*********************************!*\
  !*** ./src/sdk/aliSpeechSdk.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ \"./src/sdk/config.json\");\nvar _config__WEBPACK_IMPORTED_MODULE_0___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./config */ \"./src/sdk/config.json\", 1);\n/* harmony import */ var _recorder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recorder */ \"./src/sdk/recorder.js\");\n/* eslint-disable no-console */\r\n\r\n\r\n\r\nfunction AliSpeechWebSocket({enableIntermediateResult, enablePunctuation, enableITN, onTranscriptionResultChange, onSentenceEnd, deviceId}) {\r\n\r\n  let that = this;\r\n  let config = {enableIntermediateResult, enablePunctuation, enableITN, onTranscriptionResultChange, onSentenceEnd};\r\n\r\n\r\n  /**\r\n   * WebSocket对象，这里需要自行绑定事件监听程序到ws对象上\r\n   */\r\n  this.ws = null;\r\n  /**\r\n   * 音频采集对象\r\n   * @type {null}\r\n   */\r\n  this.recorder = null;\r\n\r\n  /**\r\n   * 开始传递音频数据到服务器，需要自行绑定ws的事件\r\n   * @param baseUrl\r\n   * @param socketUrl\r\n   * @returns {AliSpeechWebSocket}\r\n   */\r\n  this.start = (baseUrl, socketUrl) => {\r\n    let url = getConnectionUrl(baseUrl, socketUrl);\r\n    this.ws = new WebSocket(url);\r\n    registryFn(this.ws);\r\n    this.recorder = new _recorder__WEBPACK_IMPORTED_MODULE_1__[\"Recorder\"](deviceId, (e) => {\r\n      // 转换采样率\r\n      let buffer = e.inputBuffer.getChannelData(0);\r\n      buffer = that.recorder.downsampleBuffer(buffer);\r\n      // 转换Float32Array to Int8Array\r\n      buffer = that.recorder.encodePCM(buffer);\r\n      let result = new Int8Array(buffer.buffer);\r\n      if (that.ws.readyState === WebSocket.OPEN) {\r\n        that.ws.send(result.buffer);\r\n      }\r\n\r\n      // 白噪音测试代码\r\n      // // The input buffer is the song we loaded earlier\r\n      // var inputBuffer = e.inputBuffer;\r\n      //\r\n      // // The output buffer contains the samples that will be modified and played\r\n      // var outputBuffer = e.outputBuffer;\r\n      //\r\n      // // Loop through the output channels (in this case there is only one)\r\n      // for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {\r\n      //   var inputData = inputBuffer.getChannelData(channel);\r\n      //   var outputData = outputBuffer.getChannelData(channel);\r\n      //\r\n      //   // Loop through the 4096 samples\r\n      //   for (var sample = 0; sample < inputBuffer.length; sample++) {\r\n      //     // make output equal to the same as the input\r\n      //     outputData[sample] = inputData[sample];\r\n      //\r\n      //     // add noise to each output sample\r\n      //     // outputData[sample] += ((Math.random() * 2) - 1) * 0.2;\r\n      //   }\r\n      // }\r\n    });\r\n    return this;\r\n  }\r\n\r\n  this.stop = () => {\r\n    this.recorder.stop();\r\n    this.ws.close();\r\n  }\r\n\r\n  // 获取连接url\r\n  function getConnectionUrl(baseUrl, socketUrl) {\r\n    baseUrl = baseUrl ? baseUrl : AliSpeechWebSocket.prototype.baseUrl;\r\n    socketUrl = socketUrl ? socketUrl : AliSpeechWebSocket.prototype.socketUrl;\r\n    let url = [];\r\n    url.push('ws://');\r\n    url.push(baseUrl);\r\n    url.push(socketUrl);\r\n    url.push('?enableIntermediateResult=' + config.enableIntermediateResult);\r\n    url.push('&enablePunctuation=' + config.enablePunctuation);\r\n    url.push('&enableITN=' + config.enableITN);\r\n    return url.join('');\r\n  }\r\n\r\n  // 注册方法\r\n  function registryFn(ws) {\r\n    // ws.onclose = (e)=>{}\r\n    ws.onerror = (e) => {\r\n      console.error(e);\r\n    }\r\n    ws.onmessage = (e) => {\r\n      let data = JSON.parse(e.data);\r\n      console.log(data);\r\n      if (data.data) {\r\n        if (data.data.eventType === EventType.onSentenceEnd) {\r\n          if (data.data.result.trim() !== '') {\r\n            config.onSentenceEnd(e);\r\n          }\r\n        } else if (data.data.eventType === EventType.onTranscriptionResultChange) {\r\n          if (data.data.result.trim() !== '') {\r\n            config.onTranscriptionResultChange(e);\r\n          }\r\n        }\r\n      }\r\n    }\r\n    ws.onopen = (e) => {\r\n      console.log('握手成功');\r\n      console.log(e);\r\n    }\r\n  }\r\n}\r\n\r\nAliSpeechWebSocket.prototype.baseUrl = _config__WEBPACK_IMPORTED_MODULE_0__.baseUrl;\r\nAliSpeechWebSocket.prototype.socketUrl = _config__WEBPACK_IMPORTED_MODULE_0__.socketUrl;\r\n\r\n/**\r\n * 设置连接配置\r\n * @param config\r\n */\r\nfunction setConnectionConfig(config) {\r\n  AliSpeechWebSocket.prototype.baseUrl = config.baseUrl ? config.baseUrl : AliSpeechWebSocket.prototype.baseUrl;\r\n  AliSpeechWebSocket.prototype.socketUrl = config.socketUrl ? config.socketUrl : AliSpeechWebSocket.prototype.socketUrl;\r\n}\r\n\r\nfunction createWebSocket({enableIntermediateResult, enablePunctuation, enableITN, onSentenceEnd, onTranscriptionResultChange, deviceId}) {\r\n  let config = {enableIntermediateResult, enablePunctuation, enableITN, deviceId};\r\n  config.enableIntermediateResult = !!config.enableIntermediateResult;\r\n  config.enablePunctuation = !!config.enablePunctuation;\r\n  config.enableITN = !!config.enableITN;\r\n  config.onTranscriptionResultChange = onTranscriptionResultChange && typeof onTranscriptionResultChange === 'function' && !!enableIntermediateResult ? onTranscriptionResultChange : () => {\r\n  };\r\n  config.onSentenceEnd = onSentenceEnd && typeof onSentenceEnd === 'function' ? onSentenceEnd : () => {\r\n  };\r\n  return new AliSpeechWebSocket(config);\r\n}\r\n\r\n/**\r\n * 阿里云发起的事件回调类型\r\n * @type {{onTranscriptionResultChange: string, onSentenceEnd: string}}\r\n */\r\nconst EventType = {\r\n  /**\r\n   * 识别结果发生变化\r\n   */\r\n  onTranscriptionResultChange: 'onTranscriptionResultChange',\r\n  /**\r\n   * 识别完一句话\r\n   */\r\n  onSentenceEnd: 'onSentenceEnd'\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\r\n  AliSpeechWebSocket,\r\n  setConnectionConfig,\r\n  createWebSocket,\r\n  EventType\r\n});\n\n//# sourceURL=webpack:///./src/sdk/aliSpeechSdk.js?");

/***/ }),

/***/ "./src/sdk/config.json":
/*!*****************************!*\
  !*** ./src/sdk/config.json ***!
  \*****************************/
/*! exports provided: baseUrl, socketUrl, default */
/***/ (function(module) {

eval("module.exports = {\"baseUrl\":\"222.180.202.110:10400\",\"socketUrl\":\"/speech\"};\n\n//# sourceURL=webpack:///./src/sdk/config.json?");

/***/ }),

/***/ "./src/sdk/recorder.js":
/*!*****************************!*\
  !*** ./src/sdk/recorder.js ***!
  \*****************************/
/*! exports provided: Recorder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Recorder\", function() { return Recorder; });\nfunction Recorder(deviceId, onaudioprocess) {\r\n  let bufferSize = 4096;\r\n  let sampleBits = 16;\r\n  let sampleRate = 16000;\r\n\r\n  let context = null;\r\n  this.audioInput = null;\r\n  this.processor = null;\r\n\r\n  // 获取音频流\r\n  navigator.mediaDevices.getUserMedia({\r\n    audio: {\r\n      deviceId: deviceId && typeof deviceId === 'string' ? deviceId.trim() : 'default'\r\n    }\r\n  }).then((stream) => {\r\n    context = new AudioContext();\r\n    this.audioInput = context.createMediaStreamSource(stream);\r\n    this.processor = context.createScriptProcessor(bufferSize, 1, 1);\r\n    this.audioInput.connect(this.processor);\r\n    this.processor.connect(context.destination);\r\n    this.processor.onaudioprocess = onaudioprocess;\r\n  });\r\n\r\n  /**\r\n   * 停止音频采集\r\n   */\r\n  this.stop = () => {\r\n    this.processor.disconnect();\r\n  }\r\n\r\n  // 降低采样率\r\n  this.downsampleBuffer = (buffer) => {\r\n    if (sampleRate === context.sampleRate) {\r\n      return buffer\r\n    }\r\n    if (sampleRate > context.sampleRate) {\r\n      throw new Error('downsampling rate show be smaller than original sample rate')\r\n    }\r\n    let sampleRateRatio = context.sampleRate / sampleRate;\r\n    let newLength = Math.round(buffer.length / sampleRateRatio);\r\n    let result = new Float32Array(newLength);\r\n    let offsetResult = 0;\r\n    let offsetBuffer = 0;\r\n    while (offsetResult < result.length) {\r\n      let nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);\r\n      // Use average value of skipped samples\r\n      let accum = 0;\r\n      let count = 0;\r\n      for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {\r\n        accum += buffer[i];\r\n        count++;\r\n      }\r\n      result[offsetResult] = accum / count;\r\n      // Or you can simply get rid of the skipped samples:\r\n      // result[offsetResult] = buffer[nextOffsetBuffer];\r\n      offsetResult++;\r\n      offsetBuffer = nextOffsetBuffer;\r\n    }\r\n    return result;\r\n  }\r\n\r\n  // 转换32位FloatPCM为8位IntPCM\r\n  this.encodePCM = (bytes) => {\r\n    let dataLength = bytes.length * (sampleBits / 8);\r\n    let buffer = new ArrayBuffer(dataLength); // 这是个空的ArrayBuffer\r\n    let data = new DataView(buffer); // 这是个空的DataView\r\n    // let channelCount = 1// 单声道\r\n    let offset = 0;\r\n    // 写入采样数据\r\n    if (sampleBits === 8) {\r\n      for (let i = 0; i < bytes.length; i++, offset++) {\r\n        let s = Math.max(-1, Math.min(1, bytes[i]));\r\n        let val = s < 0 ? s * 0x8000 : s * 0x7FFF;\r\n        val = Math.round(255 / (65535 / (val + 32768)));\r\n        data.setInt8(offset, val);\r\n      }\r\n    } else {\r\n      for (let i = 0; i < bytes.length; i++, offset += 2) {\r\n        let s = Math.max(-1, Math.min(1, bytes[i]));\r\n        data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);\r\n      }\r\n    }\r\n    return data;\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/sdk/recorder.js?");

/***/ })

/******/ });