<template>
  <div class="main">
    <b-navbar type="is-info">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/Home' }">
          <b-icon icon="home"></b-icon>
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/Base' }">
          지역정보 관리
        </b-navbar-item>
      </template>
    </b-navbar>
    <b-tabs v-model="activeTab">
      <b-tab-item label="과수정보 추가">
        <section class="section">
          <h1>과수 정보 추가</h1>
          <div class="field is-grouped is-grouped-multiline">
            <b-field label="적용연도" :label-position="labelPosition">
              <b-numberinput
                v-model="locationInfo.year"
                min="2018"
                rounded
              ></b-numberinput>
            </b-field>
            <b-field label="관리 지역명" :label-position="labelPosition">
              <b-select placeholder="관리 지역명 선택" v-model="selectedLoc">
                <option
                  v-for="loc in locationList"
                  :value="loc.name"
                  :key="loc.docID"
                >
                  {{ loc.name }}
                </option>
              </b-select>
            </b-field>
            <b-field label="라인 번호">
              <b-numberinput
                v-model="treeInfo.line"
                min="0"
                rounded
              ></b-numberinput>
            </b-field>
            <b-field label="구역번호">
              <b-numberinput
                v-model="treeInfo.section"
                min="0"
                rounded
              ></b-numberinput>
            </b-field>
            <b-field label="나무 번호">
              <b-numberinput
                v-model="treeInfo.treeNo"
                min="0"
                rounded
              ></b-numberinput>
            </b-field>
            <b-field label="품종">
              <b-select placeholder="품종 선택" v-model="treeInfo.treeType">
                <option
                  v-for="type in treeTypeList"
                  :value="type.id"
                  :key="type.id"
                >
                  {{ type.name }}
                </option>
              </b-select>
            </b-field>
          </div>
          <div class="field is-grouped is-grouped-multiline">
            <b-field label="개화개시일">
              <b-datepicker
                :show-week-number="showWeekNumber"
                :month-names="months"
                v-model="treeInfo.floreInfo.st_date"
                placeholder="개화개시일 선택"
                icon="calendar-today"
              >
              </b-datepicker>
            </b-field>
            <b-field label="개화종료일">
              <b-datepicker
                :show-week-number="showWeekNumber"
                :month-names="months"
                v-model="treeInfo.floreInfo.ed_date"
                placeholder="개화종료일 선택"
                icon="calendar-today"
              >
              </b-datepicker>
            </b-field>
            <b-field label="결실처리일">
              <b-datepicker
                :show-week-number="showWeekNumber"
                :month-names="months"
                v-model="treeInfo.fruitDate"
                placeholder="개화종료일 선택"
                icon="calendar-today"
              >
              </b-datepicker>
            </b-field>
            <b-field label="초기평균착립수">
              <b-numberinput
                v-model="treeInfo.countDegree"
                min="0"
                rounded
              ></b-numberinput>
            </b-field>
            <b-field label="무핵탈립성">
              <b-select placeholder="무핵탈립성" v-model="treeInfo.countLevel">
                <option value="0">용이(○)</option>
                <option value="1">보통(△)</option>
                <option value="2">나쁨(X)</option>
              </b-select>
            </b-field>
            <b-field label="초기 착과량(송이)">
              <b-numberinput
                v-model="treeInfo.earlyAmount"
                min="0"
                rounded
              ></b-numberinput>
            </b-field>
          </div>
          <div class="field is-grouped is-grouped-multiline">
            <b-field label="착색일자">
              <b-datepicker
                :show-week-number="showWeekNumber"
                :month-names="months"
                v-model="treeInfo.colorDate"
                placeholder="착색일자 선택"
                icon="calendar-today"
              >
              </b-datepicker>
            </b-field>
            <b-field label="착색도">
              <b-numberinput
                v-model="treeInfo.colorLevel"
                min="0"
                rounded
              ></b-numberinput>
            </b-field>
            <b-field label="수확가능도">
              <b-numberinput
                v-model="treeInfo.harvestAvailable"
                min="0"
                rounded
              ></b-numberinput>
            </b-field>
            <b-field label="수확개시일">
              <b-datepicker
                :show-week-number="showWeekNumber"
                :month-names="months"
                v-model="treeInfo.harvestDate"
                placeholder="수확일자 선택"
                icon="calendar-today"
              >
              </b-datepicker>
            </b-field>
            <b-field label="후기착과량">
              <b-numberinput
                v-model="treeInfo.postAmount"
                min="0"
                rounded
              ></b-numberinput>
            </b-field>
          </div>
          <div class="tile">
            <div class="tile is-parent is-vertical">
              <article class="tile is-child notification is-info">
                <h1>수확량 정보</h1>
                <div class="field is-grouped is-grouped-multiline">
                  <b-field label="800g">
                    <b-numberinput
                      v-model="treeInfo.harvestInfo.tp_800"
                      min="0"
                      rounded
                      @input="updateHarvest"
                    ></b-numberinput>
                  </b-field>
                  <b-field label="700g">
                    <b-numberinput
                      v-model="treeInfo.harvestInfo.tp_700"
                      min="0"
                      rounded
                      @input="updateHarvest"
                    ></b-numberinput>
                  </b-field>
                  <b-field label="600g">
                    <b-numberinput
                      v-model="treeInfo.harvestInfo.tp_600"
                      min="0"
                      rounded
                      @input="updateHarvest"
                    ></b-numberinput>
                  </b-field>
                  <b-field label="500g">
                    <b-numberinput
                      v-model="treeInfo.harvestInfo.tp_500"
                      min="0"
                      rounded
                      @input="updateHarvest"
                    ></b-numberinput>
                  </b-field>
                  <b-field label="400g">
                    <b-numberinput
                      v-model="treeInfo.harvestInfo.tp_400"
                      min="0"
                      rounded
                      @input="updateHarvest"
                    ></b-numberinput>
                  </b-field>
                  <b-field label="300g">
                    <b-numberinput
                      v-model="treeInfo.harvestInfo.tp_300"
                      min="0"
                      rounded
                      @input="updateHarvest"
                    ></b-numberinput>
                  </b-field>
                  <b-field label="200g">
                    <b-numberinput
                      v-model="treeInfo.harvestInfo.tp_200"
                      min="0"
                      rounded
                      @input="updateHarvest"
                    ></b-numberinput>
                  </b-field>
                  <b-field label="총 송이 수">
                    <b-input
                      v-model="treeInfo.harvestInfo.total_count"
                      min="0"
                      disabled
                    ></b-input>
                  </b-field>
                  <b-field label="총 중량(kg)">
                    <b-input
                      v-model="treeInfo.harvestInfo.total_weight"
                      min="0"
                      disabled
                    ></b-input>
                  </b-field>
                </div>
              </article>
              <div class="tile is-parent">
                <article class="tile is-child notification is-warning">
                  <h1>질병 정보</h1>
                  <div class="field is-grouped is-grouped-multiline">
                    <b-field label="질병 정보 선택">
                      <b-select
                        placeholder="질병 종류"
                        v-model="selectedDisease"
                      >
                        <option
                          v-for="d in diseaseList"
                          :value="d.name"
                          :key="d.id"
                        >
                          {{ d.name }}
                        </option>
                      </b-select>
                    </b-field>
                    <b-field label="발병일자">
                      <b-datepicker
                        :show-week-number="showWeekNumber"
                        :month-names="months"
                        v-model="selectedDiseaseDate"
                        placeholder="발병일자 선택"
                        icon="calendar-today"
                      >
                      </b-datepicker>
                    </b-field>
                    <div class="control">
                      <b-button
                        class="button"
                        style="margin : 12px"
                        @click="addDiseaseInfo"
                      >
                        질병정보 추가
                      </b-button>
                      <table
                        class="table is-fullwidth is-bordered is-striped is-narrow is-hoverable"
                      >
                        <thead>
                          <tr>
                            <th>병명</th>
                            <th>발병일자</th>
                            <th>삭제</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, index) in treeInfo.diseaseList"
                            :key="item.id"
                          >
                            <td>{{ item.diseaseName }}</td>
                            <td>{{ item.diseaseDate }}</td>
                            <td>
                              <b-button
                                class="is-danger"
                                @click="removeDisease(index)"
                                >삭제</b-button
                              >
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </article>

                <article class="tile is-child notification is-primary">
                  <h1>해충 정보</h1>
                  <div class="field is-grouped is-grouped-multiline">
                    <b-field label="해충 정보 선택">
                      <b-select placeholder="해충 종류" v-model="selectedBug">
                        <option
                          v-for="d in bugList"
                          :value="d.name"
                          :key="d.id"
                        >
                          {{ d.name }}
                        </option>
                      </b-select>
                    </b-field>
                    <b-field label="해충발생일자">
                      <b-datepicker
                        :show-week-number="showWeekNumber"
                        :month-names="months"
                        v-model="selectedBugDate"
                        placeholder="해충발생일자 선택"
                        icon="calendar-today"
                      >
                      </b-datepicker>
                    </b-field>
                    <div class="control">
                      <b-button
                        class="button"
                        style="margin : 12px"
                        @click="addBugInfo"
                      >
                        해충정보 추가
                      </b-button>
                      <table
                        class="table is-fullwidth is-bordered is-striped is-narrow is-hoverable"
                      >
                        <thead>
                          <tr>
                            <th>해충명</th>
                            <th>해충 발생일자</th>
                            <th>삭제</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, index) in treeInfo.bugList"
                            :key="item.id"
                          >
                            <td>{{ item.bugName }}</td>
                            <td>{{ item.bugDate }}</td>
                            <td>
                              <b-button
                                class="is-danger"
                                @click="removeBug(index)"
                                >삭제</b-button
                              >
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </article>

                <article class="tile is-child notification is-info">
                  <h1>장해 정보</h1>
                  <div class="field is-grouped is-grouped-multiline">
                    <b-field label="장해 종류 선택">
                      <b-select
                        placeholder="장해 종류"
                        v-model="selectedPeriod"
                      >
                        <option>고온장해</option>
                        <option>저온장해</option>
                      </b-select>
                    </b-field>
                    <b-field label="장해발생일자">
                      <b-datepicker
                        :show-week-number="showWeekNumber"
                        :month-names="months"
                        v-model="selectedPeriodDate"
                        placeholder="장해발생일자 선택"
                        icon="calendar-today"
                      >
                      </b-datepicker>
                    </b-field>
                    <div class="control">
                      <b-button
                        class="button"
                        style="margin : 12px"
                        @click="addPeriodInfo"
                      >
                        장해정보 추가
                      </b-button>
                      <table
                        class="table is-fullwidth is-bordered is-striped is-narrow is-hoverable"
                      >
                        <thead>
                          <tr>
                            <th>장해명</th>
                            <th>장해 발생일자</th>
                            <th>삭제</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(item, index) in treeInfo.periodList"
                            :key="item.id"
                          >
                            <td>{{ item.periodName }}</td>
                            <td>{{ item.periodDate }}</td>
                            <td>
                              <b-button
                                class="is-danger"
                                @click="removePeriod(index)"
                                >삭제</b-button
                              >
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
          <b-field label="엑셀 데이터로 추가하기">
            <input
              type="text"
              class="input is-success"
              placeholder="엑셀 데이터 입력"
              v-model="excelStr"
              @keyup.enter="parseExcelData()"
              @keyup.esc="excelStr = ''"
            />
          </b-field>
          <div class="field is-grouped is-grouped-multiline">
            <div class="control">
              <b-button
                class="button is-info"
                size="is-large"
                @click="saveTreeInfo"
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
          <b-button class="is-info" style="float:right" @click="scrollToTop"
            >△ TOP</b-button
          >
        </section>
      </b-tab-item>
      <b-tab-item label="과수정보 관리">
        <div>
          <tree-list-page></tree-list-page>
        </div>
      </b-tab-item>
      <b-tab-item label="목록 상세 보기">
        <div>
          <tree-detail-list-page></tree-detail-list-page>
        </div>
      </b-tab-item>
      <b-tab-item label="품종별 수확가능량 조회">
        <div>      
          <tree-type-statistics></tree-type-statistics>    
        </div>
      </b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import functions from "../mixins/functions.js";
import moment from "moment";
import TreeListPage from "../components/TreeListPage.vue";
import TreeDetailListPage from "../components/TreeDetailListPage.vue";
import TreeTypeStatistics from "../components/TreeTypeStatistics.vue";

export default {
  name: "TreeManagementPage",
  mixins: [functions],
  components: {
    TreeListPage,
    TreeDetailListPage,
    TreeTypeStatistics
  },
  props: {},
  data: () => ({
    months: moment.monthsShort(),
    showWeekNumber: true,
    activeTab: 0,
    title: "기본정보",
    isStandard: true,
    counter: 1,
    selectedOptions: [],
    memberInfo: {
      uid: "",
      pw: ""
    },
    docInfo: {},
    labelPosition: "",
    selectedLoc: "",
    selectedType: {},
    locationInfo: {},
    treeInfo: {
      userid: "",
      year: 2020,
      line: 0,
      section: 0,
      treeNo: 0,
      treeType: 0,
      floreInfo: {
        st_date: [],
        ed_date: []
      },
      fruit_date: [],
      countDeg: 0, //// 초기 평균착립수
      countLevel: "", //// 무핵탈립성
      earlyAmount: 0,
      colorDate: [], //// 착색일자
      colorLevel: 0, //// 착색도
      harvestAvailable: 0, //// 수확가능도
      harvestDate: [],
      harvestDegree: 0, //// 수확가능도
      harvestInfo: {
        tp_200: 0,
        tp_300: 0,
        tp_400: 0,
        tp_500: 0,
        tp_600: 0,
        tp_700: 0,
        tp_800: 0,
        total_count: 0,
        total_weight: 0.0,
        diameter: 0
      },
      postAmount: 0,
      diseaseList: [],
      bugList: [],
      periodList: [],
      description: "",
      isStandard: false,
      locationID: "",
      locationName: "",
      processType: 0 //// 현재 단계
    },
    locationList: [],
    db: {},
    treeTypeList: [],
    bugList: [],
    selectedBug: "",
    selectedBugDate: new Date(),
    diseaseList: [],
    selectedDisease: "",
    selectedDiseaseDate: new Date(),
    periodList: [],
    selectedPeriod: "",
    selectedPeriodDate: new Date(),
    d_counter: 0,
    b_counter: 0,
    p_counter: 0,
    excelStr: ""
  }),
  mounted() {
    var member = localStorage.getItem("member");
    this.memberInfo = JSON.parse(member);

    this.treeInfo.userid = this.memberInfo.uid;

    this.locationInfo.year = this.getYear();
    this.locationInfo.userid = this.memberInfo.uid;

    this.treeDB = this.getFirebase()
      .firestore()
      .collection("TreeInfo");

    this.locDB = this.getFirebase()
      .firestore()
      .collection("LOCATION");

    this.treeTypeDB = this.getFirebase()
      .firestore()
      .collection("TreeType");

    this.bugDB = this.getFirebase()
      .firestore()
      .collection("BugInfo");

    this.diseaseDB = this.getFirebase()
      .firestore()
      .collection("DiseaseInfo");

    this.locationList = this.getLocationList(this.memberInfo.uid);
    this.getDBInfo();
  },
  methods: {
    scrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    },
    clear() {
      this.locationInfo.year = this.getYear();
      this.locationInfo.name = "";
      this.locationInfo.address = "";
      this.locationInfo.line = 0;
      this.locationInfo.section = 0;
      this.locationInfo.comment = "";
      this.locationInfo.userid = "";
    },
    getDBInfo() {
      var list = [];
      this.treeTypeDB.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var item = doc.data();
          item.docID = doc.id;
          list.push(item);
        });
      });

      this.treeTypeList = list;
      var list1 = [];

      this.bugDB.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var item = doc.data();
          item.docID = doc.id;
          list1.push(item);
        });
      });

      this.bugList = list1;
      var list2 = [];
      this.diseaseDB.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var item = doc.data();
          item.docID = doc.id;
          list2.push(item);
        });
      });

      this.diseaseList = list2;
    },
    getLocationList(member_uid) {
      var results = this.locDB.where("userid", "==", member_uid);
      var list = [];
      results.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var item = doc.data();
          item.docID = doc.id;
          list.push(item);
        });
      });

      return list;
    },
    checkInputData() {
      var msg = "";
      if (this.selectedLoc.length == 0) {
        msg = "관리 지역이 없습니다. 입력 후 저장해주세요.";
      }
      if (this.locationInfo.userid == "") {
        msg = "로그인 정보가 없습니다. 다시 로그인해주세요.";
      }
      if (this.treeInfo.year == "") {
        msg = "적용연도 정보가 없습니다. 입력 후 저장해주세요.";
      }
      if (this.treeInfo.line == 0) {
        msg = "라인 번호 정보가 없습니다. 입력 후 저장해주세요.";
      }
      if (this.treeInfo.section == 0) {
        msg = "구역 번호 정보가 없습니다. 입력 후 저장해주세요.";
      }
      if (this.treeInfo.treeNo == 0) {
        msg = "나무 번호 정보가 없습니다. 입력 후 저장해주세요.";
      }
      if (this.treeInfo.treeType == 0) {
        msg = "품종 정보가 없습니다. 입력 후 저장해주세요.";
      }

      if (msg.length > 0) {
        this.$buefy.toast.open({
          message: msg,
          type: "is-info",
          position: "is-bottom"
        });

        this.scrollToTop();

        return false;
      } else {
        return true;
      }
    },
    getYear() {
      return Number(moment().format("YYYY"));
    },
    saveTreeInfo() {
      if (this.checkInputData()) {
        // 중복 체크
        var checklist = [];
        var db = this.treeDB;

        var selectedLocInfo = this.locationList.filter(
          x => x.name == this.selectedLoc
        );

        this.treeInfo.locationID = selectedLocInfo[0].docID;
        this.treeInfo.locationName = selectedLocInfo[0].name;
        var treeInfo = this.treeInfo;

        //// 날짜포맷 정리
        if(this.treeInfo.harvestDate != []) this.treeInfo.harvestDate = this.formatDate(this.treeInfo.harvestDate);
        if(this.treeInfo.fruitDate != []) this.treeInfo.fruitDate = this.formatDate(this.treeInfo.fruitDate);
        if(this.treeInfo.floreInfo.st_date != []) this.treeInfo.floreInfo.st_date = this.formatDate(this.treeInfo.floreInfo.st_date);
        if(this.treeInfo.floreInfo.ed_date != []) this.treeInfo.floreInfo.ed_date = this.formatDate(this.treeInfo.floreInfo.ed_date);
        if(this.treeInfo.colorDate != []) this.treeInfo.colorDate = this.formatDate(this.treeInfo.colorDate);
        
        try {         
          var results = this.treeDB
          .where("userid", "==", this.memberInfo.uid)
          .where("year", "==", selectedLocInfo[0].year)
          .where("line", "==", this.treeInfo.line)
          .where("section", "==", this.treeInfo.section)
          .where("treeNo", "==", this.treeInfo.treeNo)
          .where("locationName", "==", selectedLocInfo[0].name);

          results.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              var item = doc.data();
              checklist.push(item);
            });
            if (checklist.length == 0) {
              db.add(treeInfo);
              alert("과수 정보를 추가하였습니다.");
            } else {
              alert("기존에 등록된 정보가 있습니다.!! [저장 실패]");
            }
          });
        } catch (e) {
          db.add(treeInfo);
          alert("과수 정보를 추가하였습니다.");
        } 
      }
    },
    addTreeInfo() {
      this.treeDB.add(this.treeInfo);

      //// 리스트에도 추가한다.
      //this.$refs.locList.addLocation(this.treeInfo);

      this.$buefy.toast.open({
        message: "과수 정보를 추가하였습니다.",
        type: "is-success",
        position: "is-bottom"
      });
      this.clear();
    },
    addDiseaseInfo() {
      if (this.selectedDisease.length > 0) {
        var date = this.formatDate(this.selectedDiseaseDate);
        var exist = this.treeInfo.diseaseList.filter(
          x => x.diseaseName == this.selectedDisease && x.diseaseDate == date
        );

        if (exist.length == 0) {
          ////병명, 발병일자
          this.treeInfo.diseaseList.push({
            id: moment(new Date()).format("YYYYMMDD") + this.d_counter++,
            diseaseName: this.selectedDisease,
            diseaseDate: this.formatDate(this.selectedDiseaseDate)
          });
        }
      }
    },
    removeDisease(index) {
      this.treeInfo.diseaseList.splice(index, 1);
    },
    addBugInfo() {
      if (this.selectedBug.length > 0) {
        var date = this.formatDate(this.selectedBugDate);
        var exist = this.treeInfo.bugList.filter(
          x => x.bugName == this.selectedBug && x.bugDate == date
        );

        if (exist.length == 0) {
          ////병명, 발병일자
          this.treeInfo.bugList.push({
            id: moment(new Date()).format("YYYYMMDD") + this.b_counter++,
            bugName: this.selectedBug,
            bugDate: this.formatDate(this.selectedBugDate)
          });
        }
      }
    },
    removeBug(index) {
      this.treeInfo.bugList.splice(index, 1);
    },
    addPeriodInfo() {
      if (this.selectedPeriod.length > 0) {
        var date = this.formatDate(this.selectedPeriodDate);
        var exist = this.treeInfo.periodList.filter(
          x => x.periodName == this.selectedPeriod && x.periodDate == date
        );

        if (exist.length == 0) {
          ////장해명, 장해일자
          this.treeInfo.periodList.push({
            id: moment(new Date()).format("YYYYMMDD") + this.p_counter++,
            periodName: this.selectedPeriod,
            periodDate: this.formatDate(this.selectedPeriodDate)
          });
        }
      }
    },
    removePeriod(index) {
      this.treeInfo.periodList.splice(index, 1);
    },
    updateHarvest() {
      this.treeInfo.harvestInfo.total_count =
        this.treeInfo.harvestInfo.tp_800 +
        this.treeInfo.harvestInfo.tp_700 +
        this.treeInfo.harvestInfo.tp_600 +
        this.treeInfo.harvestInfo.tp_500 +
        this.treeInfo.harvestInfo.tp_400 +
        this.treeInfo.harvestInfo.tp_300 +
        this.treeInfo.harvestInfo.tp_200;

      this.treeInfo.harvestInfo.total_weight =
        this.treeInfo.harvestInfo.tp_800 * 0.8 +
        this.treeInfo.harvestInfo.tp_700 * 0.7 +
        this.treeInfo.harvestInfo.tp_600 * 0.6 +
        this.treeInfo.harvestInfo.tp_500 * 0.5 +
        this.treeInfo.harvestInfo.tp_400 * 0.4 +
        this.treeInfo.harvestInfo.tp_300 * 0.3 +
        this.treeInfo.harvestInfo.tp_200 * 0.2;
    },
    parseExcelData() {
      //// 엑셀데이터를 구분하여 처리
      //// 지역	관리연도	라인번호	구역번호	과수번호	품종	착색도	수확개시일	800g	700g	600g	500g	400g	300g	200g	지름
      //// 노지(사월90)	2019	1	23	2	거봉	80		0	0	6	8	14	3	7	0

      var data = this.excelStr.split(" ");

      for (var str of data) {
        var temp = str.split("\t");

        this.treeInfo.userid = this.memberInfo.uid;

        this.locationInfo.userid = this.memberInfo.uid;
        this.locationInfo.name = temp[0];
        this.locationInfo.year = Number(temp[1]);
        this.treeInfo.locationName = temp[0];

        for (var loc of this.locationList) {
          if (loc.name == temp[0] && loc.year == temp[1]) {
            this.treeInfo.locationID = loc.docID;
            this.selectedLoc = loc.name;
          }
        }

        for (var type of this.treeTypeList) {
          if (type.name == temp[5]) {
            this.treeInfo.treeType = type.id;
          }
        }

        this.treeInfo.line = Number(temp[2]);
        this.treeInfo.section = Number(temp[3]);
        this.treeInfo.treeNo = Number(temp[4]);

        this.treeInfo.colorLevel = Number(temp[6]);
        if (temp[7].length > 0) {
          this.treeInfo.harvestDate = moment(temp[7], "YYYY-MM-DD").toDate();
        } else {
          this.treeTypeList.harvestDate = [];
        }
        this.treeInfo.harvestInfo.tp_800 = Number(temp[8]);
        this.treeInfo.harvestInfo.tp_700 = Number(temp[9]);
        this.treeInfo.harvestInfo.tp_600 = Number(temp[10]);
        this.treeInfo.harvestInfo.tp_500 = Number(temp[11]);
        this.treeInfo.harvestInfo.tp_400 = Number(temp[12]);
        this.treeInfo.harvestInfo.tp_300 = Number(temp[13]);
        this.treeInfo.harvestInfo.tp_200 = Number(temp[14]);

        this.updateHarvest();

        this.excelStr = "";

        // this.addTreeInfo();
      }
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
