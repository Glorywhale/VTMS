<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-3-widescreen ">
            <form class="box">
              <p style="font-size:25px; font-weight:bold;">
                포도 과수 관리 시스템
              </p>
              <div class="field" style="margin: 20px 0px 0px 0px">
                <label for="" class="label">사용자 ID</label>
                <div class="control has-icons-left">
                  <input
                    ref="uid"
                    type="text"
                    placeholder="ID 입력"
                    class="input"
                    v-model="uid"
                    @keypress.enter="focusPw"
                    required
                    autofocus
                  />
                  <span class="icon is-small is-left">
                    <b-icon icon="account"></b-icon>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">비밀번호</label>
                <div class="control has-icons-left">
                  <input
                    ref="pw"
                    type="password"
                    placeholder="*******"
                    class="input"
                    v-model="pw"
                    @keypress.enter="submitLogin"
                    required
                  />
                  <span class="icon is-small is-left">
                    <b-icon icon="lock"></b-icon>
                  </span>
                </div>
              </div>
              <div class="field">
                <a class="button is-success" @click="submitLogin">로그인</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import functions from "../mixins/functions.js";

export default {
  name: "LoginPage",
  mixins: [functions],
  data() {
    return {
      uid: "",
      pw: "",

      memberInfo : {
        uid : "",
        pw : "",
        name : ""
      }
    };
  },
  mounted() {
    localStorage.removeItem("member");
  },
  methods: {
    focusPw() {
      this.$nextTick(() => this.$refs.pw.focus());
    },
    alertMsg(msg) {
      this.$buefy.toast.open({
        duration: 3000,
        message: msg,
        position: "is-bottom",
        type: "is-danger"
      });
    },
    toHomePage() {
      this.$router.push("/Home");
    },
    submitLogin() {
      if (!this.uid) {
        this.alertMsg("사용자 ID를 입력하세요.");
        this.$refs.uid.focus();
        return;
      }

      if (!this.pw) {
        this.alertMsg("패스워드를 입력하세요.");
        this.$refs.pw.focus();
        return;
      }

      this.getFirebase().firestore().collection("USER")
        .get()
        .then(querySnapshot => {
          var isExist = false;
          querySnapshot.forEach(doc => {
            var userInfo = doc.data();
            if (this.uid == userInfo.id) {
              isExist = true;
              if (this.pw == userInfo.password) {   
                
                this.name = userInfo.name;
                this.$buefy.toast.open({
                  message: this.name + " 님, 로그인 되었습니다.",
                  type: "is-success",
                  position: "is-bottom"
                });             
                
                this.memberInfo.uid = this.uid;
                this.memberInfo.pw = this.pw;
                this.memberInfo.name = this.name;
                
                localStorage.setItem("member", JSON.stringify(this.memberInfo));

                this.toHomePage();
              } else {
                this.alertMsg("비밀번호가 일치하지 않습니다.");
              }
            }
          });

          if (isExist == false) {
            this.alertMsg("일치하는 이용자 정보가 없습니다.");
          }
        });      
    },   
  }
};
</script>
