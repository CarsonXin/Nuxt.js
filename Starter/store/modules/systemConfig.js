const state = {
  bgmState: 0, // 1 play 0 pause
  gameLogAvailable: false, // 可查看游戏记录
  role: '',
  userData: {
    rank: -1,
    headimgurl: '',
    unionid: '',
    nickname: '',
    character: 0,                //角色，0表示未选择角色。
  },
  awardInfo: {
    announcement_start_time: '',            //公布获奖 开始时间
    announcement_end_time: '',            //公布获奖 结束时间
    has_award: false,                                                                    //是否获奖，true：是，false：否
  },
  token: '',
};

const getters = {};

const mutations = {
  BGM_PLAY(state) {
    state.bgmState = 1;
  },
  BGM_PAUSE(state) {
    state.bgmState = 0;
  },
  SELECT_ROLE(state, commit) {
    state.role = commit.role;
  },
  SET_USER_DATA(state, payload) {
    state.userData = {
      ...state.userData,
      ...payload.userData,
    };
  },
  SET_AWARD_INFO(state, payload) {
    state.awardInfo = payload.awardInfo;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};