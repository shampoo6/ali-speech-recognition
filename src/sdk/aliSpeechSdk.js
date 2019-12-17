/* eslint-disable no-console */
import _config from './config';
import {Recorder} from "./recorder";

function AliSpeechWebSocket({enableIntermediateResult, enablePunctuation, enableITN, onTranscriptionResultChange, onSentenceEnd, deviceId}) {

  let that = this;
  let config = {enableIntermediateResult, enablePunctuation, enableITN, onTranscriptionResultChange, onSentenceEnd};


  /**
   * WebSocket对象，这里需要自行绑定事件监听程序到ws对象上
   */
  this.ws = null;
  /**
   * 音频采集对象
   * @type {null}
   */
  this.recorder = null;

  /**
   * 开始传递音频数据到服务器，需要自行绑定ws的事件
   * @param baseUrl
   * @param socketUrl
   * @returns {AliSpeechWebSocket}
   */
  this.start = (baseUrl, socketUrl) => {
    let url = getConnectionUrl(baseUrl, socketUrl);
    this.ws = new WebSocket(url);
    registryFn(this.ws);
    this.recorder = new Recorder(deviceId, (e) => {
      // 转换采样率
      let buffer = e.inputBuffer.getChannelData(0);
      buffer = that.recorder.downsampleBuffer(buffer);
      // 转换Float32Array to Int8Array
      buffer = that.recorder.encodePCM(buffer);
      let result = new Int8Array(buffer.buffer);
      if (that.ws.readyState === WebSocket.OPEN) {
        that.ws.send(result.buffer);
      }

      // 白噪音测试代码
      // // The input buffer is the song we loaded earlier
      // var inputBuffer = e.inputBuffer;
      //
      // // The output buffer contains the samples that will be modified and played
      // var outputBuffer = e.outputBuffer;
      //
      // // Loop through the output channels (in this case there is only one)
      // for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
      //   var inputData = inputBuffer.getChannelData(channel);
      //   var outputData = outputBuffer.getChannelData(channel);
      //
      //   // Loop through the 4096 samples
      //   for (var sample = 0; sample < inputBuffer.length; sample++) {
      //     // make output equal to the same as the input
      //     outputData[sample] = inputData[sample];
      //
      //     // add noise to each output sample
      //     // outputData[sample] += ((Math.random() * 2) - 1) * 0.2;
      //   }
      // }
    });
    return this;
  }

  this.stop = () => {
    this.recorder.stop();
    this.ws.close();
  }

  // 获取连接url
  function getConnectionUrl(baseUrl, socketUrl) {
    baseUrl = baseUrl ? baseUrl : AliSpeechWebSocket.prototype.baseUrl;
    socketUrl = socketUrl ? socketUrl : AliSpeechWebSocket.prototype.socketUrl;
    let url = [];
    url.push('ws://');
    url.push(baseUrl);
    url.push(socketUrl);
    url.push('?enableIntermediateResult=' + config.enableIntermediateResult);
    url.push('&enablePunctuation=' + config.enablePunctuation);
    url.push('&enableITN=' + config.enableITN);
    return url.join('');
  }

  // 注册方法
  function registryFn(ws) {
    // ws.onclose = (e)=>{}
    ws.onerror = (e) => {
      console.error(e);
    }
    ws.onmessage = (e) => {
      let data = JSON.parse(e.data);
      console.log(data);
      if (data.data) {
        if (data.data.eventType === EventType.onSentenceEnd) {
          if (data.data.result.trim() !== '') {
            config.onSentenceEnd(e);
          }
        } else if (data.data.eventType === EventType.onTranscriptionResultChange) {
          if (data.data.result.trim() !== '') {
            config.onTranscriptionResultChange(e);
          }
        }
      }
    }
    ws.onopen = (e) => {
      console.log('握手成功');
      console.log(e);
    }
  }
}

AliSpeechWebSocket.prototype.baseUrl = _config.baseUrl;
AliSpeechWebSocket.prototype.socketUrl = _config.socketUrl;

/**
 * 设置连接配置
 * @param config
 */
function setConnectionConfig(config) {
  AliSpeechWebSocket.prototype.baseUrl = config.baseUrl ? config.baseUrl : AliSpeechWebSocket.prototype.baseUrl;
  AliSpeechWebSocket.prototype.socketUrl = config.socketUrl ? config.socketUrl : AliSpeechWebSocket.prototype.socketUrl;
}

function createWebSocket({enableIntermediateResult, enablePunctuation, enableITN, onSentenceEnd, onTranscriptionResultChange, deviceId}) {
  let config = {enableIntermediateResult, enablePunctuation, enableITN, deviceId};
  config.enableIntermediateResult = !!config.enableIntermediateResult;
  config.enablePunctuation = !!config.enablePunctuation;
  config.enableITN = !!config.enableITN;
  config.onTranscriptionResultChange = onTranscriptionResultChange && typeof onTranscriptionResultChange === 'function' && !!enableIntermediateResult ? onTranscriptionResultChange : () => {
  };
  config.onSentenceEnd = onSentenceEnd && typeof onSentenceEnd === 'function' ? onSentenceEnd : () => {
  };
  return new AliSpeechWebSocket(config);
}

/**
 * 阿里云发起的事件回调类型
 * @type {{onTranscriptionResultChange: string, onSentenceEnd: string}}
 */
const EventType = {
  /**
   * 识别结果发生变化
   */
  onTranscriptionResultChange: 'onTranscriptionResultChange',
  /**
   * 识别完一句话
   */
  onSentenceEnd: 'onSentenceEnd'
}

export default {
  AliSpeechWebSocket,
  setConnectionConfig,
  createWebSocket,
  EventType
}