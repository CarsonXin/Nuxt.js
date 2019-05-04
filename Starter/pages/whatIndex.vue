<template>
    <el-row>{{msg}}
        <img src="~assets/images/home/green-btn.png" alt="">
    </el-row>
</template>
<script>
  import {mapState} from 'vuex';

  export default {
    data() {
      return {
        msg: 'hold on',
      };
    },
    asyncData(context) {
      console.log('asyncData context', context);
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('asyncData done');
          resolve({
            msg: 'delay msg',
          });
        }, 3000);
      });
    },
    async fetch() {
      console.log('fetching');  // 页面停止渲染
      await setTimeout(() => {
        console.log('fetch done');
        return 'hi there';  // 页面继续渲染
      }, 2000);
    },
    computed: {
      ...mapState(['systemConfig']),
    },
    beforeMount() {
      console.log('before mount');
    },
    mounted() {
      console.log('page mounted');
      console.log('this.store', this.systemConfig);
    },
  };
</script>