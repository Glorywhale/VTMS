<template>
  <section class="hero">
    <b-button
      type="is-info"
      icon-right="logout"
      style="width:100px; margin:10px"
      @click="logout"
      >로그아웃</b-button
    >
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            메뉴 선택
          </h1>
          <div class="field">
            <b-field>
              <b-button type="is-warning is-large" @click="toBaseInfo"
                >지역 정보 관리</b-button
              >
            </b-field>
            <b-field>
              <b-button type="is-success is-large" @click="toTreeInfo">과수 정보 관리</b-button>
            </b-field>
            <!-- <b-field>
              <b-button type="is-primary is-large">기준 정보 관리</b-button>
            </b-field> -->
            <!-- <b-field>
              <b-button type="is-info is-large" @click="toSetting">기타 설정</b-button>
            </b-field> -->
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: "HomePage",
  components: {},
  methods: {
    toBaseInfo() {
      this.$router.push("/Base");
    },
    toTreeInfo() {
      this.$router.push("/Tree");
    },
    toInoutList() {
      this.$router.push("/InOutList");
    },
    toSetting() {
      this.$router.push("/Setting");
    },
    logout() {
      this.$buefy.dialog.confirm({
        message: "로그아웃 하시겠습니까?",
        cancelText: "취소",
        confirmText: "확인",
        type: "is-success",
        onConfirm: () => {
          this.$router.push("/");
          localStorage.removeItem("member");
        }
      });
    }
  }
};
</script>

<style scoped>
.h4 {
  margin-bottom: 0;
}
.btn {
  font-size: 2rem;
}
.card {
  box-shadow: none;
}
.card-header:first-child {
  border-radius: 0;
}
.btn-back {
  box-shadow: none;
  margin: 0;
  font-size: 0.5rem;
  padding: 6px;
}
</style>
