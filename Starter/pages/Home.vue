<template>
    <div class="home flex-col">
        <div style="color:#ffffff;position: absolute;left: 3vw;top:3vw;width: 30vw;font-size: 5vw;text-decoration: underline;font-style: oblique" @click="showGameRule">游戏规则</div>
        <div class="options-container flex-1 flex-col flex-center">
            <img src="~assets/images/home/start-game.png" class="btn btn-block" alt="" @click="startGame">
            <div class="btn opt-btn yellow-btn" @click="showBroad">
                排行榜
            </div>

            <div class="btn opt-btn red-btn" @click="showGameLog"
                 v-show="systemConfig.gameLogAvailable">
                游戏记录
            </div>
            <div class="btn opt-btn red-btn" @click="editUserInfo" v-show="showEditUserInfoBtn">
                填写获奖信息
            </div>
            <!--<button class="btn btn-block opt-btn" @click="shareGame">邀请好友参与</button>-->
            <!-- <div class="btn opt-btn green-btn" @click="shareGame">
                邀请好友参与
            </div> -->

        </div>

        <Modal class="flex-center flex-col" title="排行榜" custom-class="winning-streak-modal" width="70vw"
               :visible.sync="broadVisible" :custom-close="true">
            <div slot="header" style="height: 100%;text-align: center;margin: auto">
                <img src="https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/images/home/broad-header.png" alt="">
            </div>
            <div class="broad-table-container flex-col">
                <div class="table-overview">
                    <div class="title">排行榜</div>
                    <div class="flex-row champion-info">
                        <div class="flex-1 flex-col flex-center" style="height: 100%;line-height: 1.2;text-align:left;">
                            <div style="width: 100%;font-weight: 600">
                                {{Number(systemConfig.userData.rank) > 0 ? `No.${systemConfig.userData.rank}` : '未上榜'}}
                            </div>
                            <div style="width: 100%;font-size: 14px">
                                我的排名
                            </div>
                            <!--<img src="https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/images/home/cup.png" style="max-height: 100%" alt="">-->
                        </div>
                        <div class="champion-avatar">
                            <img src="https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/images/home/crown.png" v-show="Number(systemConfig.userData.rank) === 1"
                                 class="crown" alt="">
                            <img :src="systemConfig.userData.headimgurl" class="avatar-img" alt="">
                        </div>
                        <div class="flex-1 flex-row flex-center">
                            {{systemConfig.userData.streak}}胜
                        </div>
                    </div>
                </div>
                <div class="broad-table flex-1 flex-col">
                    <div class="table-row" v-for="item in winningStreak.tableData" :key="item.unionid">
                        <div class="flex-row" style="width: 100%;height: 100%">
                            <div class="rank flex-row flex-center">
                                <template v-if="Number(item.rank) > 0 && Number(item.rank) <= 3">
                                    <img src="https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/images/home/gold-medal.png"
                                         v-show="Number(item.rank) === 1" alt="">
                                    <img src="https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/images/home/silver-medal.png"
                                         v-show="Number(item.rank) === 2" alt="">
                                    <img src="https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/images/home/bronze-medal.png"
                                         v-show="Number(item.rank) === 3" alt="">
                                </template>
                                <template v-else>
                                    {{item.rank}}
                                </template>
                            </div>
                            <div class="avatar">
                                <img :src="item.headimgurl" alt="">
                            </div>
                            <div class="flex-1 nickname">
                                {{item.nickname || '-'}}
                            </div>
                            <div class="score flex-row flex-center" style="text-align:left;margin-left: 8px">
                                {{item.winning_streak}}胜
                            </div>
                        </div>
                    </div>
                </div>
                <div class="broad-table-tool-bar" style="display: none">
                    <button class="btn" style="margin-bottom: 0;margin-right: 8px" @click="broadTablePrevPage"
                            :disabled="winningStreak.currentPage <= 1">
                        &lt; 上一页
                    </button>
                    <button class="btn" style="margin-bottom: 0;" @click="broadTableNextPage"
                            :disabled="winningStreak.currentPage >= winningStreak.totalPages">
                        下一页 &gt;
                    </button>
                </div>
            </div>
            <div class="footer" slot="footer">
                <img src="https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/images/home/broad-side.png" alt=""
                     class="broad-side">
                <button class="close-button" @click="broadVisible = false">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </Modal>
        <Modal class="game-rule-modal" :visible.sync="gameRuleVisible" title="游戏规则" width="90%"
               :custom-close="true">
            <div class="main-title" slot="header">猜拳H5规则说明</div>
            <div class="rule-container">
                <div class="section">
                    <div class="title">
                        玩法
                    </div>
                    <div class="paragraph">
                        1、活动时间：2019年4月30日6：00—5月30日20：00。
                    </div>
                    <div class="paragraph">
                        2、本活动发放的奖品请登录 包道会员中心 查看。请在有效期使用，过期失效，恕不补领。
                    </div>
                    <div class="paragraph">
                        3、在活动期间，符合参与资格的用户可不限次数挑战。每一局猜拳开始后，用户在“剪刀”“石头”“布”中选择当局要出的手势，并与其他玩家所出的手势pk，按照“布>石头>剪刀>布”的规则判定当局输赢。
                    </div>
                    <div class="paragraph">
                        4. 活动奖励按照用户参与猜拳获胜累计次数而定，排名越前，奖励越丰富。如完胜次数相同，则根据完成时间判定先后，较早完成该次数的玩家排名在前。
                    </div>
                    <div class="paragraph">
                        5、游戏期间会设置彩蛋礼品，连胜10局的玩家，有机会获得广州长隆动物世界家庭套票。
                    </div>
                    <div class="paragraph">
                        6. 排行榜成绩以5月30日20：00活动结束时显示的排名数据为最终结果。
                    </div>
                    <div class="paragraph">
                        7. 获胜用户有机会获得一份蜜汁叉烧包兑换券。
                    </div>
                </div>
                <div class="section">
                    <div class="title">奖品设置:</div>
                    <div class="title">终极连胜记录排名奖：</div>
                    <div class="paragraph">
                        一等奖：黄金叉烧包一个（价值4999元）名额：1名
                    </div>
                    <div class="paragraph">
                        二等奖：包年全年早餐（每天定额10元。共计价值3650元）；名额3名
                    </div>
                    <div class="paragraph">
                        三等奖：包道品牌背包，名额：100名
                    </div>
                    <div class="title">
                        额外彩蛋：
                    </div>
                    <div class="paragraph">
                        连胜是有机会抽取到广州长隆野生动物园家庭套票（价值800元，两大一小家庭套票），名额：5组家庭。
                    </div>
                    <div class="title">
                        胜利随机奖品：
                    </div>
                    <div class="paragraph">
                        蜜汁叉烧包兑换券
                    </div>
                </div>
            </div>
            <div class="footer" slot="footer">
                <button class="close-button" @click="gameRuleVisible = false">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </Modal>
        <Modal :visible.sync="gameLogVisible" title="游戏记录">
            <div>
                游戏记录
            </div>
        </Modal>
        <Modal :visible.sync="userInfoFormVisible" title="用户信息表单" custom-class="user-info-modal"
               custom-close>
            <div class="user-info-form">
                <div class="title">
                    用户信息
                </div>
                <div class="form-container">
                    <div class="form-item flex-row flex-center">
                        <div class="form-label">姓名：</div>
                        <div class="flex-1">
                            <input type="text" class="form-control" v-model="userInfo.name" placeholder="请填写姓名">
                        </div>
                    </div>
                    <div class="form-item flex-row flex-center">
                        <div class="form-label">手机：</div>
                        <div class="flex-1">
                            <input type="text" class="form-control" v-model="userInfo.phone" placeholder="请填写手机">
                        </div>
                    </div>
                    <div class="form-item flex-row flex-center">
                        <div class="form-label">地址：</div>
                        <div class="flex-1">
                            <input type="text" class="form-control" v-model="userInfo.address" placeholder="请填写地址">
                        </div>
                    </div>
                    <div class="form-item">
                        <div class="commit-user-info-btn" @click="commitUserInfo"></div>
                    </div>
                </div>
            </div>
            <div class="footer" slot="footer">
                <button class="close-button" @click="userInfoFormVisible = false">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        </Modal>
    </div>
</template>

<script>
  // @ is an alias to /src
  import EventBus from '../utils/event-bus';
  import Modal from '../components/modal';
  import {mapState} from 'vuex';
  import {DATE} from '../utils/properties';
  import {pathPrefix} from '../utils/properties';

  export default {
    name: 'home',
    components: {Modal},
    data() {
      let data = {
        winningStreak: {
          tableData: [],
          params: {
            offset: 0,
            limit: 10,
            // unionid: '2355',
          },
          currentPage: 1,
          total: 0,
          totalPages: 1,
        },
        userInfo: {
          name: '',
          phone: '',
          address: '',
        },
      };
      let status = {
        broadVisible: false,
        gameRuleVisible: false,
        gameLogVisible: false,
        gettingWinningStreak: false,
        userInfoFormVisible: false,
      };
      return {
        ...data,
        ...status,
      };
    },
    computed: {
      ...mapState(['systemConfig']),
      showEditUserInfoBtn() {
        let startTime = new Date(this.systemConfig.awardInfo.announcement_start_time).getTime();
        let endTime = new Date(this.systemConfig.awardInfo.announcement_end_time).getTime();
        let hasAward = this.systemConfig.awardInfo.has_award;
        let current = DATE.getTime();
        return hasAward && current < endTime && current > startTime;
      },
    },
    watch: {
      'winningStreak.currentPage'(newPage) {
        if (newPage < 1) {
          this.winningStreak.currentPage = 1;
        }
        this.winningStreak.params.offset = (this.winningStreak.currentPage - 1) * this.winningStreak.params.limit;
        this.getWinningStreak();
      },
    },
    methods: {
      getWinningStreak() {
        if (!this.gettingWinningStreak) {
          this.gettingWinningStreak = true;
          let that = this;
          this.$axios.get('/finger_guessing/getWinningStreak', {
            params: that.winningStreak.params,
          }).then(({data}) => {
            if (Number(data.code) === 0) {
              this.winningStreak.tableData = data.data.winning_streak;
              this.winningStreak.total = Number(data.data.total);
              this.winningStreak.totalPages = Math.ceil(that.winningStreak.total / that.winningStreak.params.limit);
              this.$store.commit(`systemConfig/SET_USER_DATA`, {
                userData: {
                  rank: data.data.my_rank,
                  streak: data.data.my_winning_streak,
                },
              });
            }
          }).finally(() => {
            this.gettingWinningStreak = false;
          });
        }
      },
      broadTablePrevPage() {
        this.winningStreak.currentPage -= 1;
      },
      broadTableNextPage() {
        this.winningStreak.currentPage += 1;
      },
      getGameLog() {
      },
      startGame() {
        EventBus.$emit('start-game');
        this.$router.push({
          path: `${pathPrefix}/selectRole`,
        });
      },
      shareGame() {
        EventBus.$emit('share-game');
      },
      showBroad() {
        this.getWinningStreak();
        this.broadVisible = true;
      },
      showGameRule() {
        this.gameRuleVisible = true;
      },
      showGameLog() {
        this.gameLogVisible = true;
      },
      editUserInfo() {
        this.userInfoFormVisible = true;
      },
      commitUserInfo() {
      },
    },
    mounted() {
      if(this.$route.query.broadVisible){
        this.broadVisible = this.$route.query.broadVisible
      }
      // this.getWinningStreak();
    },
  };
</script>
<style lang="scss">

    img {
        max-width: 100%;
        vertical-align: top !important;
    }

    .home, .banner, .btn {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        overflow: hidden;
    }

    .home {
        height: 100%;
        padding: 16px;
        background-image: url('https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/images/home/background.jpg');
        -webkit-background-size: 100% auto;
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-position: top center;
    }


    .banner {
        text-align: center;
        padding: 16px;
        margin-bottom: 32px;

        .title {
            padding: 16px 0;
            font-size: 36px;
            line-height: 1.4;
        }
    }

    .btn {
        margin-bottom: 12px;
        display: inline-block;
        padding: 8px 0;
        outline: none;
        position: relative;
        background-color: transparent;
        border: none;

        &.btn-block {
            width: 100%;
        }

        &:after {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            margin: auto;
            text-align: center;
            height: max-content;
            letter-spacing: 1px;
            color: #fff;
            font-size: 24px;
            font-weight: 600;
            text-shadow: 1px 1px 1px rgba(#000, .5);
        }
    }

    img.btn {
        padding: 0;
    }

    .opt-btn {
        -webkit-background-size: 100% auto;
        background-size: 100% auto;
        background-position: center;
        background-repeat: no-repeat;
        height: 17vw;
        width: 100%;
        line-height: calc(17vw - 16px);
        text-align: center;
        letter-spacing: 1px;
        color: #fff;
        font-size: 24px;
        font-weight: 600;
        text-shadow: 1px 1px 1px rgba(#000, .5);

        &.yellow-btn {
            background-image: url('https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/images/home/yellow-btn.png');
            -webkit-text-stroke: 1px #e88a12;
        }

        &.red-btn {
            background-image: url('https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/images/home/red-btn.png');
            -webkit-text-stroke: 1px #fa3701;
        }

        &.green-btn {
            background-image: url('https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/images/home/green-btn.png');
            -webkit-text-stroke: 1px #3d9412;
        }
    }

    .options-container {
        width: 53%;
        margin: auto auto 16px auto;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .game-rule-modal {
        .main-title {
            font-weight: 700;
            font-size: 24px;
            text-align: center;
            margin-bottom: 12px;
        }

        .rule-container {
            line-height: 1.47;

            .section {
                margin-bottom: 8px;
            }

            .title {
                font-weight: 600;
                margin-bottom: 4px;
            }

            .paragraph {
                text-indent: 16px;
            }
        }

        .footer {
            text-align: center;
        }
    }

    .close-button {
        border-radius: 50%;
        width: 40px;
        height: 40px;
        outline: none;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        top: -10px;
        border: 1px solid #fa3701;
        color: #fa3701;
        text-align: center;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0;
        background-color: #fcdc95;
    }


    .winning-streak-modal {
        color: #fff;
        background-color: rgba(#000, .75) !important;

        .modal-container {
            height: 64vh;
            /*height: auto;*/
            max-height: 70vh;
            border: 8px solid #fa3701;
            background-color: #fa3701;
            border-radius: 16px;
            padding: 0;
        }

        .modal-header {
            position: absolute !important;
            top: -128px;
            left: 0;
            right: 0;
            margin: auto;
            height: 120px;
            /*display: none;*/
            img {
                height: 100%;
            }
        }

        .modal-body {
            border-radius: 6px;
            background-color: #fcdc95;
            padding: 8px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            height: 100%;
        }

        .broad-table-container {
            width: 100%;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            background-color: #fdb73c;
            margin-bottom: 0;
            border-radius: 8px;
            padding: 8px;
            height: 100%;
            overflow: hidden;

            .broad-table {
                width: 100%;
                text-align: center;
                height: 100%;
                overflow: scroll;

                .table-row {
                    $cell-height: 24px;

                    padding: 8px;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    background-color: #f90;
                    border-radius: 4px;
                    margin-bottom: 8px;
                    line-height: $cell-height;
                    height: 40px;
                    width: 100%;
                    display: block;

                    .rank, .avatar, .score {
                        height: $cell-height
                    }

                    .avatar {
                        width: $cell-height;
                        border-radius: 50%;
                        overflow: hidden;
                        margin: auto 16px;
                        background-color: #ffb84d;
                    }

                    .nickname {
                        white-space: nowrap;
                        font-size: 12px;
                        text-overflow: ellipsis;
                        overflow-wrap: break-word;
                        overflow: hidden;
                    }

                    .rank {
                        width: 20px;
                        text-align: center;

                        img {
                            height: $cell-height;
                            margin: auto;
                        }
                    }
                }
            }

            .broad-table-tool-bar {
                text-align: center;
            }
        }

        .broad-side {
            position: absolute;
            left: calc(100% + 8px);
            bottom: 0;
            width: 50px;
            z-index: 0;
        }

        .table-overview {
            color: #fcdc95;
            background-color: #bd3030;
            border-radius: 6px;
            padding: 8px;
            margin-bottom: 8px;

            .title {
                text-align: center;
                -webkit-text-stroke: 1px #ac1c1c;
                font-size: 28px;
                letter-spacing: 1px;
                font-weight: 800;
            }

            .champion-info {
                height: 40px;
                margin: 16px auto;
            }

            .champion-avatar {
                height: 32px;
                width: 32px;
                border-radius: 50%;
                border: 1px solid #fbd629;
                margin: auto 16px;
                position: relative;
                text-align: center;

                .avatar-img {
                    overflow: hidden;
                    border-radius: 50%;
                    margin: auto;
                    height: 32px;
                    width: 32px;
                }

                .crown {
                    position: absolute;
                    height: 16px;
                    width: 16px;
                    left: -7px;
                    top: -7px;
                }
            }
        }

        .footer {
            text-align: center;
            position: relative;
            width: 100%;
        }
    }

    .user-info-modal {


        .modal-container {
            width: 80vw;
            height: 80vw;
            background-image: url('https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/images/home/border.png');
            -webkit-background-size: cover;
            background-size: cover;
            background-position: center;
            background-color: transparent;
        }

        .modal-body {
            padding: 5.4vw;
            margin: auto;
        }

        .user-info-form {
            height: 100%;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 16px 0 0 0;
        }

        .title {
            font-size: 24px;
            text-align: center;
            margin-bottom: 16px;
        }

        .form-container {
            display: block;
            width: 100%;
            padding: 16px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            margin: auto;

            .form-item {
                margin-bottom: 16px;
            }

            .form-label {

            }

            .form-control {
                width: 100%;
                padding: 4px;
                border: 1px solid #ccc;
                outline: none;
                border-radius: 2px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
            }

            .commit-user-info-btn {
                height: 24px;
                width: 50%;
                background-image: url('https://vdoou-mmd.oss-cn-shenzhen.aliyuncs.com/baotopv2/images/home/confirm-btn.png');
                -webkit-background-size: cover;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                margin: auto;
                position: relative;

                &:after {
                    content: '提交';
                    color: #fff;
                    line-height: 24px;
                    width: 100%;
                    display: block;
                    text-align: center;
                }
            }
        }
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
    .game-rule-modal{
        .modal-container{
            border: 2vw solid #f84c24;
            border-radius: 20px;
            padding: 5vw;
        }
    }
</style>
