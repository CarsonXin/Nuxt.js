<template>
  <div id="app">
    <nuxt/>
  </div>
</template>

<script>
  import 'reset-css/sass/_reset.scss';
  import '../assets/styles/common.scss';
  import {mapState} from 'vuex';
  import {getParams} from '../utils/utils';
  import {projectTokenName} from '../utils/properties';

  export default {
    name: 'app',
    data() {
      let data = {};
      let status = {
        gettingJsTicket: false,
      };
      return {
        ...data,
        ...status,
      };
    },
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }

  html, body {
    height: 100%;
    width: 100%;
    background-color: #efefef;
    position: absolute;
    overflow: hidden;
  }

  .hidden {
    display: none;
    visibility: hidden;
    opacity: 0;
  }
</style>

<style lang="scss">
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
</style>
