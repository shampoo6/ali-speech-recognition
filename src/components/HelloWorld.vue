<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <div>当前状态：{{currentState}}</div>
        <el-form>
            <el-button @click="start">开始</el-button>
            <el-button @click="stop">停止</el-button>
            <el-form-item label="转写内容">
                <el-input
                        readonly
                        type="textarea"
                        :rows="4"
                        placeholder="转写内容"
                        v-model="text">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="choosedDevice">
                    <el-option :key="index" v-for="(item, index) in devices" :label="item.label"
                               :value="item.deviceId"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
  /* eslint-disable no-console */

  import sdk from './../sdk/aliSpeechSdk';

  export default {
    name: 'HelloWorld',
    props: {
      msg: String
    },
    created() {
      //b0c89fa7e59024c8482a85c4cb9ee841e2a62fc36fc7a2dbb45dfe324506a857
      //c5edabf5cf12fc734c9591ba9ac2dc4e12ef65fc33cfec21a01d83cf725857e8

      // 测试获取设备列表
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        console.log(devices);
        this.devices = devices;
      });
    },
    data() {
      return {
        currentState: '停止',
        aliSpeechWebSocket: null,
        text: '',
        lastText: '',
        currentText: '',
        devices: [],
        choosedDevice: null
      }
    },
    methods: {
      start() {
        this.currentState = '连接中';
        let that = this;
        // 创建socket对象
        this.aliSpeechWebSocket = sdk.createWebSocket({
          deviceId: this.choosedDevice,
          enableIntermediateResult: true,
          enablePunctuation: true,
          enableITN: true,
          onSentenceEnd: (e) => {
            let data = JSON.parse(e.data);
            that.currentText = data.data.result;
            that.lastText += that.currentText;
            that.text = that.lastText;
          },
          onTranscriptionResultChange: (e) => {
            let data = JSON.parse(e.data);
            that.currentText = data.data.result;
            that.text = that.lastText + that.currentText;
          }
        });

        this.aliSpeechWebSocket.start();
      },
      stop() {
        this.currentState = '停止';
        this.aliSpeechWebSocket.stop();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
