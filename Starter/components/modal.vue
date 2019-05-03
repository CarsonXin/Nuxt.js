<template>
    <div class="mask" v-show="visible" :class="customClass">
        <div class="modal-container flex-col" :style="{width}">
            <div class="close-btn" v-show="!customClose" @click="closeModal">✖</div>
            <div class="modal-header">
                <slot name="header"></slot>
            </div>
            <div class="modal-body flex-1">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <slot name="footer"></slot>
            </div>
        </div>
        <slot name="mask"></slot>
    </div>
</template>

<script>
  export default {
    name: 'modal',
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: '',
      },
      customClass: {
        type: [Object, Boolean, String],
        default: false,
      },
      width: {
        type: [Object, String],
        default: '80%',
      },
      customClose: {
        type: Boolean,
        default: false,
      },
    },
    methods: {
      closeModal() {
        this.$emit('update:visible', false);
      },
    },
  };
</script>

<style scoped lang="scss">
    .mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(#000, .3);
        z-index: 1001;
    }

    .modal-container {
        margin-top: 10vh;
        max-height: 80vh;
        margin-right: auto;
        margin-left: auto;
        background-color: #fff;
        border-radius: 4px;
        padding: 8px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;

        .modal-header,
        .modal-body,
        .modal-footer {
            width: 100%;
            position: relative;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;

            &:empty {
                display: none;
            }
        }

        .close-btn {
            position: absolute;
            right: 0;
            top: 0;
        }

        .modal-header {
            margin-bottom: 8px;
        }

        .modal-body {
            overflow: scroll;
        }
    }
</style>