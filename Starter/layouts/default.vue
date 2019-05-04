<template>
    <div id="app">
        <audio class="hidden" id="bgm-player" loop>
            <source src="https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/audio/bgm.mp3">
        </audio>
        <div>
            <audio class="hidden" id="kid-win">
                <source src="https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotop/roshambo/assets/audio/kid-win.mp3">
            </audio>
            <audio class="hidden" id="xjy-win">
                <source src="https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotop/roshambo/assets/audio/xjy-win.mp3">
            </audio>
            <audio class="hidden" id="lr-win">
                <source src="https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotop/roshambo/assets/audio/lr-win.mp3">
            </audio>
            <audio class="hidden" id="lady-win">
                <source src="https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotop/roshambo/assets/audio/lady-win.mp3">
            </audio>
            <audio class="hidden" id="master-win">
                <source src="https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotop/roshambo/assets/audio/master-win.mp3">
            </audio>
            <audio class="hidden" id="kid-fail">
                <source src="https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotop/roshambo/assets/audio/kid-fail.mp3">
            </audio>
            <audio class="hidden" id="xjy-fail">
                <source src="https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotop/roshambo/assets/audio/xjy-fail.mp3">
            </audio>
            <audio class="hidden" id="lr-fail">
                <source src="https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotop/roshambo/assets/audio/lr-fail.mp3">
            </audio>
            <audio class="hidden" id="lady-fail">
                <source src="https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotop/roshambo/assets/audio/lady-fail.mp3">
            </audio>
            <audio class="hidden" id="master-fail">
                <source src="https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotop/roshambo/assets/audio/master-fail.mp3">
            </audio>
        </div>
        <button @click="toggleBgm" class="player-btn" :class="{'player-btn-rotate' : systemConfig.bgmState === 1}">
            <i class="fa fa-music"></i>
        </button>
        <!-- <div class="mask" v-show="showShareTips" @click="showShareTips = false">
            <img src="./assets/images/home/share-tips.png" alt="" class="share-tips">
        </div> -->
        <nuxt/>
    </div>
</template>
<script>
  import EventBus from '../utils/event-bus';
  import {mapState} from 'vuex';
  import wx from 'weixin-js-sdk';
  import {getParams} from '../utils/utils';
  import {projectTokenName} from '../utils/properties';

  export default {
    name: 'app',
    data() {
      let data = {};
      let status = {
        gettingJsTicket: false,
        showShareTips: false,
      };
      return {
        ...data,
        ...status,
      };
    },
    computed: {
      ...mapState(['systemConfig']),
    },
    methods: {
      toggleBgm() {
        let that = this;
        EventBus.$emit(that.systemConfig.bgmState === 0 ? 'playBgm' : 'pauseBgm');
      },
      getJsTicket() {
        if (!this.gettingJsTicket) {
          this.gettingJsTicket = false;
          // let location = window.location;
          // let currentUrl = location.origin + this.$route.fullPath + location.search;
          let currentUrl = encodeURIComponent(window.location.href.split('#')[0]);
          // console.log('location', location);
          // console.log('currentUrl', currentUrl);
          // console.log('router', this.$route);
          this.$axios.post('/finger_guessing/getJsTicket', {
            url: currentUrl,
          }).then(({data}) => {
            if (Number(data.code) === 0) {
              // console.log('got je ticket ');
              this.initJsTicket(data.js_ticket);
            }
          });
        }
      },
      initJsTicket(ticket) {
        wx.config({
          debug: false,
          appId: ticket.appid,
          timestamp: ticket.timestamp, // 必填，生成签名的时间戳
          nonceStr: ticket.noncestr, // 必填，生成签名的随机串
          signature: ticket.signature, // 必填，签名
          // url: ticket.url, // 必填，签名
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'hideMenuItems', 'hideOptionMenu'],
        });
      },
      resetWxApiConfig() {
        //this.getJsTicket();
        let that = this;
        wx.ready(() => {
          EventBus.$emit('playBgm');

          EventBus.$emit('xjy-win-play');
          EventBus.$emit('xjy-win-pause');

          EventBus.$emit('master-win-play');
          EventBus.$emit('master-win-pause');

          EventBus.$emit('lady-win-play');
          EventBus.$emit('lady-win-pause');

          EventBus.$emit('lr-win-play');
          EventBus.$emit('lr-win-pause');

          EventBus.$emit('kid-win-play');
          EventBus.$emit('kid-win-pause');

          //

          EventBus.$emit('xjy-fail-play');
          EventBus.$emit('xjy-fail-pause');

          EventBus.$emit('master-fail-play');
          EventBus.$emit('master-fail-pause');

          EventBus.$emit('lady-fail-play');
          EventBus.$emit('lady-fail-pause');

          EventBus.$emit('lr-fail-play');
          EventBus.$emit('lr-fail-pause');

          EventBus.$emit('kid-fail-play');
          EventBus.$emit('kid-fail-pause');

          let shareConfig = {
            link: 'https://xxx.vdoou.cn/api/baotop/index/entry?act=roshambo',
            desc: '玩游戏，赢金包！',
            title: '情寻糯米叉烧包之鲜味拳王争霸赛',
            imgUrl: 'https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotop/roshambo/assets/images/cover.jpg',
            success() {
              that.showShareTips = false;
              that.$axios.get('/finger_guessing/share', {
                params: {
                  unionid: that.systemConfig.userData.unionid,
                },
              });
            },
          };
          wx.hideMenuItems({
            menuList: ['menuItem:copyUrl'],
            success(res) {
              console.log('menu hide succeed', res);
            },
            fail(err) {
              console.log('hide failed', err);
            },
          });
          wx.updateTimelineShareData(shareConfig);
          wx.updateAppMessageShareData(shareConfig);
        });
      },
      getUserData() {
        this.$axios.get('/finger_guessing/getUserData').then(({data}) => {
          if (Number(data.code) === 0) {
            this.$store.commit(`systemConfig/SET_USER_DATA`, {
              userData: data.data.user_data,
            });
          }
        });
      },
      getAwardWinning() {
        this.$axios.get('/finger_guessing/getAwardWinning', {
          params: {
            // unionid: this.systemConfig.userData.unionid,
          },
        }).then(({data}) => {
          if (Number(data.code) === 0) {
            this.$store.commit(`systemConfig/SET_AWARD_INFO`, {
              awardInfo: data.data.award_winning,
            });
          }
        });
      },
    },
    mounted() {
      let audio = document.getElementById('bgm-player');
      let that = this;
      localStorage.setItem(`${projectTokenName}`, getParams('token'));

      EventBus.$on('playBgm', () => {
        console.log('play Bgm.');
        that.$store.commit(`systemConfig/BGM_PLAY`);
        audio.play();
      });
      EventBus.$on('pauseBgm', () => {
        console.log('pause Bgm.');
        that.$store.commit(`systemConfig/BGM_PAUSE`);
        audio.pause();
      });

      EventBus.$on('share-game', () => {
        that.showShareTips = true;
      });

      EventBus.$on('pageEntered', () => {
        // console.log('page entered, get js ticket');
      });

      EventBus.$on('start-game', () => {
        console.log('game started');
      });

      //xjy
      let XJYWin = document.getElementById('xjy-win');
      EventBus.$on('xjy-win-play', () => {
        XJYWin.play();
      });
      EventBus.$on('xjy-win-pause', () => {
        XJYWin.pause();
      });
      //kid
      let KidWin = document.getElementById('kid-win');
      EventBus.$on('kid-win-play', () => {
        KidWin.play();
      });
      EventBus.$on('kid-win-pause', () => {
        KidWin.pause();
      });
      //lady
      let ladyWin = document.getElementById('lady-win');
      EventBus.$on('lady-win-play', () => {
        ladyWin.play();
      });
      EventBus.$on('lady-win-pause', () => {
        ladyWin.pause();
      });
      //master
      let masterWin = document.getElementById('master-win');
      EventBus.$on('master-win-play', () => {
        masterWin.play();
      });
      EventBus.$on('master-win-pause', () => {
        masterWin.pause();
      });
      //lr
      let lrWin = document.getElementById('lr-win');
      EventBus.$on('lr-win-play', () => {
        lrWin.play();
      });
      EventBus.$on('lr-win-pause', () => {
        lrWin.pause();
      });

      //xjy
      let XJYFail = document.getElementById('xjy-fail');
      EventBus.$on('xjy-fail-play', () => {
        XJYFail.play();
      });
      EventBus.$on('xjy-fail-pause', () => {
        XJYFail.pause();
      });
      //kid
      let KidFail = document.getElementById('kid-fail');
      EventBus.$on('kid-fail-play', () => {
        KidFail.play();
      });
      EventBus.$on('kid-fail-pause', () => {
        KidFail.pause();
      });
      //lady
      let ladyFail = document.getElementById('lady-fail');
      EventBus.$on('lady-fail-play', () => {
        ladyFail.play();
      });
      EventBus.$on('lady-fail-pause', () => {
        ladyFail.pause();
      });
      //master
      let masterFail = document.getElementById('master-fail');
      EventBus.$on('master-fail-play', () => {
        masterFail.play();
      });
      EventBus.$on('master-fail-pause', () => {
        masterFail.pause();
      });
      //lr
      let lrFail = document.getElementById('lr-fail');
      EventBus.$on('lr-fail-play', () => {
        lrFail.play();
      });
      EventBus.$on('lr-fail-pause', () => {
        lrFail.pause();
      });

      //  for testing wx ready
      this.$nextTick(() => {
        // this.getUserData();
        // this.getAwardWinning();
        // this.resetWxApiConfig();
        // this.getJsTicket();
      });

      window.onbeforeunload = function() {
        let n = window.event.screenX - window.screenLeft;
        let b = n > document.documentElement.scrollWidth - 20;
        if (!(b && window.event.clientY < 0 || window.event.altKey)) {
          localStorage.setItem(projectTokenName, '');
        }
      };
    },
  };
</script>
<style>
    #app {
        font-family: 'Avenir', '微软雅黑', "Helvetica Neue", "PingFang SC", 'Droid Sans', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        height: 100%;
    }

    html, body {
        height: 100%;
        width: 100%;
        /*background-color: #2C9090;*/
        position: fixed;
        overflow: hidden;
    }

    .hidden {
        display: none;
        visibility: hidden;
        opacity: 0;
    }
</style>

<style lang="scss">
    #__nuxt, #__layout {
        height: 100%;
    }

    @keyframes rotate {
        0% {
            -webkit-transform: rotate(0);
            -moz-transform: rotate(0);
            -ms-transform: rotate(0);
            -o-transform: rotate(0);
            transform: rotate(0);
        }
        100% {
            -webkit-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -o-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }

    .player-btn {
        position: absolute;
        outline: none;
        top: 16px;
        right: 16px;
        margin: auto;
        border-radius: 50%;
        width: 32px;
        height: 32px;
        border: 1px solid #da2033;
        background-color: transparent;
        padding: 2px;
        color: #ffc792;
        text-shadow: 1px 1px 2px rgba(#da2033, 0.5);
        text-align: center;
        font-size: 16px;
        z-index: 1000;
    }

    .player-btn-rotate {
        -webkit-animation: rotate 2s infinite;
        -o-animation: rotate 2s infinite;
        animation: rotate 2s infinite;
        -webkit-animation-timing-function: linear;
        -moz-animation-timing-function: linear;
        -o-animation-timing-function: linear;
        animation-timing-function: linear;
        -webkit-animation-direction: normal;
        -moz-animation-direction: normal;
        -o-animation-direction: normal;
        animation-direction: normal;
        /*will-change: transform;*/
    }

    .mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(#000, .3);
        z-index: 1001;
    }

    .share-tips {
        width: 64%;
        position: absolute;
        top: 0;
        right: 20px;
    }
</style>