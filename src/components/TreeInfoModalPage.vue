<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">
        과수 상세 정보보기
      </p>
    </header>
    <section class="modal-card-body">
      <div class="field is-grouped is-grouped-multiline">
        <b-field label="적용연도" :label-position="labelPosition">
          <b-numberinput
            v-model="treeInfo.year"
            min="2018"
            rounded
          ></b-numberinput>
        </b-field>
        <b-field label="관리 지역명" :label-position="labelPosition">
          <b-select
            placeholder="관리 지역명 선택"
            v-model="treeInfo.locationName"
          >
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
          <b-input v-model="treeInfo.line" disabled></b-input>
        </b-field>
        <b-field label="구역번호">
          <b-input v-model="treeInfo.section" disabled></b-input>
        </b-field>
        <b-field label="나무 번호">
          <b-input v-model="treeInfo.treeNo" disabled></b-input>
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
            v-model="treeInfo.section"
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
            placeholder="착색일자 선택"
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
                  @input="updateHarvest"
                  min="0"
                  rounded
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
                  <b-select placeholder="질병 종류" v-model="selectedDisease">
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
                    <option v-for="d in bugList" :value="d.name" :key="d.id">
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
                          <b-button class="is-danger" @click="removeBug(index)"
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
                  <b-select placeholder="장해 종류" v-model="selectedPeriod">
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
    </section>
    <footer class="modal-card-foot">
      <button class="button is-primary" @click="save">저 장</button>
      <button class="button" type="button" @click="$parent.close()">
        닫 기
      </button>
    </footer>
  </div>
</template>

<script>
import functions from "../mixins/functions.js";
import moment from "moment";

export default {
  name: "TreeInfoModalPage",
  props: ["treeInfo", "userid"],
  mixins: [functions],
  data() {
    return {
      labelPosition: "",
      locationInfo: {},
      locationList: [],
      memberInfo: {
        uid: "",
        pw: ""
      },
      months: moment.monthsShort(),
      showWeekNumber: true,
      treeTypeList: [],
      selectedLoc: "",
      selectedType: {},
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
      p_counter: 0
    };
  },
  mounted() {
    var member = localStorage.getItem("member");
    this.memberInfo = JSON.parse(member);

    this.treeInfo.userid = this.memberInfo.uid;

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

    this.getLocationList();
    this.getDBInfo();
  },
  methods: {
    getDate(dateStr) {
      var results= "";
      if (dateStr.length > 0) {
        results = this.formatShortDate(dateStr);
      }
      return results;
    },
    getLocationList() {
      var results = this.locDB.where("userid", "==", this.memberInfo.uid);
      var list = [];
      results.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var item = doc.data();
          item.docID = doc.id;
          list.push(item);
        });
      });

      this.locationList = list;
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
    save() {
      this.treeDB.doc(this.treeInfo.docID).set(this.treeInfo);

      alert("과수 정보가 변경되었습니다.");
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
    }
  }
};
</script>
