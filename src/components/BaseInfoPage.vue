<template>
  <div class="main">
    <b-navbar type="is-info">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/Home' }">
          <b-icon icon="home"></b-icon>
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/Tree' }">
          과수정보 관리
        </b-navbar-item>        
      </template>
    </b-navbar>
    <b-tabs v-model="activeTab">
      <b-tab-item label="지역정보 추가">
        <section class="section">
          <h1>지역 정보 추가</h1>
          <b-field label="적용연도" :label-position="labelPosition">
            <b-numberinput
              v-model="locationInfo.year"
              min="2018"
              rounded
            ></b-numberinput>            
          </b-field>
          <b-field label="관리 지역명" :label-position="labelPosition">
            <b-input v-model="locationInfo.name" />
          </b-field>
          <b-field label="주소" :label-position="labelPosition">
            <b-input v-model="locationInfo.address" />
          </b-field>
          <p>라인 수</p>
          <b-field>
            <b-numberinput
              v-model="locationInfo.line"
              min="1"
              rounded
            ></b-numberinput>
          </b-field>
          <p>구역 수</p>
          <b-field>
            <b-numberinput
              v-model="locationInfo.section"
              min="1"
              rounded
            ></b-numberinput>
          </b-field>
          <div class="field is-grouped is-grouped-multiline">
            <div class="control">
              <b-button
                class="button is-info"
                @click="setLocationInfo"
                size="is-large"
              >
                저장
              </b-button>
            </div>
            <div class="control">
              <b-button class="button is-light" @click="clear" size="is-large">
                초기화
              </b-button>
            </div>
          </div>
        </section>
      </b-tab-item>
      <b-tab-item label="지역정보 관리">
        <div>
          <location-list-page ref="locList"></location-list-page>
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import functions from "../mixins/functions.js";
import moment from "moment";
import LocationListPage from "../components/LocationListPage.vue";

export default {
  name: "BaseInfoPage",
  mixins: [functions],
  components :{
    LocationListPage
  },
  props: {},
  data: () => ({
    activeTab: 0,
    title: "기본정보",
    isStandard: true,
    counter: 1,
    selectedOptions: [],
    memberInfo: {
      uid: "",
      pw: "",      
    },
    docInfo: {},
    labelPosition: "",
    locationInfo: {
      year: 2020,
      name: "",
      address: "",
      line: 0,
      section: 0,
      comment: "",
      userid: ""
    }
  }),
  mounted() {
    var member = localStorage.getItem("member");
    this.memberInfo = JSON.parse(member);

    this.locationInfo.year = this.getYear();
    this.locationInfo.userid = this.memberInfo.uid;
  },
  methods: {
    clear() {
      this.locationInfo.year = this.getYear();
      this.locationInfo.name = "";
      this.locationInfo.address = "";
      this.locationInfo.line = 0;
      this.locationInfo.section = 0;
      this.locationInfo.comment = "";
      this.locationInfo.userid = "";
    },
    setLocationInfo() {
      if (this.checkInputData()) {
        var col = this.getFirebase()
          .firestore()
          .collection("LOCATION");

        this.locationInfo.userid = this.memberInfo.uid;

        col.add(this.locationInfo);

        //// 리스트에도 추가한다.
        this.$refs.locList.addLocation(this.locationInfo);
        
        this.$buefy.toast.open({
          message: "지역 정보를 추가하였습니다.",
          type: "is-success",
          position: "is-bottom"
        });
        this.clear();
      }
    },
    checkInputData() {
      var msg = "";
      if (this.locationInfo.userid == "") {
        msg = "로그인 정보가 없습니다. 다시 로그인해주세요.";
      }
      if (this.locationInfo.year == "") {
        msg = "적용연도 정보가 없습니다. 입력 후 저장해주세요.";
      }
      if (this.locationInfo.name == "") {
        msg = "관리 지역명 정보가 없습니다. 입력 후 저장해주세요.";
      }
      if (this.locationInfo.line <= 0) {
        msg = "라인 수 정보가 없습니다. 입력 후 저장해주세요.";
      }
      if (this.locationInfo.section <= 0) {
        msg = "구역 수 정보가 없습니다. 입력 후 저장해주세요.";
      }

      if (msg.length > 0) {
        this.$buefy.toast.open({
          message: msg,
          type: "is-info",
          position: "is-bottom"
        });
        return false;
      } else {
        return true;
      }
    },
    getYear() {
      return Number(moment().format("YYYY"));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 25px;
  font-weight: bold;
  margin: 10px;
}
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
