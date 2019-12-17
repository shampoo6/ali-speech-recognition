export function Recorder(deviceId, onaudioprocess) {
  let bufferSize = 4096;
  let sampleBits = 16;
  let sampleRate = 16000;

  let context = null;
  this.audioInput = null;
  this.processor = null;

  // 获取音频流
  navigator.mediaDevices.getUserMedia({
    audio: {
      deviceId: deviceId && typeof deviceId === 'string' ? deviceId.trim() : 'default'
    }
  }).then((stream) => {
    context = new AudioContext();
    this.audioInput = context.createMediaStreamSource(stream);
    this.processor = context.createScriptProcessor(bufferSize, 1, 1);
    this.audioInput.connect(this.processor);
    this.processor.connect(context.destination);
    this.processor.onaudioprocess = onaudioprocess;
  });

  /**
   * 停止音频采集
   */
  this.stop = () => {
    this.processor.disconnect();
  }

  // 降低采样率
  this.downsampleBuffer = (buffer) => {
    if (sampleRate === context.sampleRate) {
      return buffer
    }
    if (sampleRate > context.sampleRate) {
      throw new Error('downsampling rate show be smaller than original sample rate')
    }
    let sampleRateRatio = context.sampleRate / sampleRate;
    let newLength = Math.round(buffer.length / sampleRateRatio);
    let result = new Float32Array(newLength);
    let offsetResult = 0;
    let offsetBuffer = 0;
    while (offsetResult < result.length) {
      let nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
      // Use average value of skipped samples
      let accum = 0;
      let count = 0;
      for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
        accum += buffer[i];
        count++;
      }
      result[offsetResult] = accum / count;
      // Or you can simply get rid of the skipped samples:
      // result[offsetResult] = buffer[nextOffsetBuffer];
      offsetResult++;
      offsetBuffer = nextOffsetBuffer;
    }
    return result;
  }

  // 转换32位FloatPCM为8位IntPCM
  this.encodePCM = (bytes) => {
    let dataLength = bytes.length * (sampleBits / 8);
    let buffer = new ArrayBuffer(dataLength); // 这是个空的ArrayBuffer
    let data = new DataView(buffer); // 这是个空的DataView
    // let channelCount = 1// 单声道
    let offset = 0;
    // 写入采样数据
    if (sampleBits === 8) {
      for (let i = 0; i < bytes.length; i++, offset++) {
        let s = Math.max(-1, Math.min(1, bytes[i]));
        let val = s < 0 ? s * 0x8000 : s * 0x7FFF;
        val = Math.round(255 / (65535 / (val + 32768)));
        data.setInt8(offset, val);
      }
    } else {
      for (let i = 0; i < bytes.length; i++, offset += 2) {
        let s = Math.max(-1, Math.min(1, bytes[i]));
        data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
      }
    }
    return data;
  }
}