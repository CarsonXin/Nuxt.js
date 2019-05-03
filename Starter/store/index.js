import Vue from 'vue';
import Vuex from 'vuex';
import systemConfig from './modules/systemConfig';

Vue.use(Vuex);

const state = {};

const mutations = {};
const getters = {};

const actions = {};
const index = () => {
  return new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules: {systemConfig},
  });
};
export default index;
