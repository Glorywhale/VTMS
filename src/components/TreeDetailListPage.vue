<template>
  <div>
    <div class="control" style="margin : 10px">
      <div class="field is-grouped is-grouped-multiline">
        <h1>과수 목록</h1>
        <!-- <b-button
          icon-right="refresh"
          type="is-info"
          @click="getList"
        ></b-button> -->
      </div>

      <div class="field is-grouped is-grouped-multiline">
        <b-field label="관리 지역" :label-position="labelPosition">
          <b-select placeholder="관리 지역 선택" v-model="selectedLoc">
            <option value="">전체</option>
            <option
              v-for="loc in locationList"
              :value="loc.docID"
              :key="loc.docID"
            >
              {{ "[" + loc.year + "]" + loc.name }}
            </option>
          </b-select>
        </b-field>
        <!-- <b-field label="관리연도" :label-position="labelPosition">
          <b-numberinput v-model="year" rounded></b-numberinput>
        </b-field> -->
        <b-button
          icon-right="magnify"
          type="is-success"
          @click="getList"
          style="margin : 32px 0px 0px 0px;"
          >검 색</b-button
        >
      </div>
      <div class="scroll_horizontal">
        <b-table
          :data="treeList"
          :paginated="false"
          :sort-icon="sortIcon"
          :sort-icon-size="sortIconSize"
          default-sort="props.row.year"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
          focusable
        >
          <template slot-scope="props">
            <b-table-column field="year" label="적용연도" width="40" sortable>
              {{ props.row.year }}
            </b-table-column>
            <b-table-column field="name" label="지역명" width="40" sortable>
              {{ props.row.locationName }}
            </b-table-column>
            <b-table-column field="line" label="라인 번호" width="40" sortable>
              {{ props.row.line }}
            </b-table-column>
            <b-table-column
              field="section"
              label="구역 번호"
              width="40"
              sortable
            >
              {{ props.row.section }}
            </b-table-column>
            <b-table-column
              field="section"
              label="나무 번호"
              width="40"
              sortable
            >
              {{ props.row.treeNo }}
            </b-table-column>
            <b-table-column field="section" label="품종" width="20" sortable>
              {{ getTreeType(props.row.treeType) }}
            </b-table-column>
            <b-table-column
              field="section"
              label="개화개시일"
              width="40"
              sortable
            >
              {{ props.row.floreInfo.st_date }}
            </b-table-column>
            <b-table-column
              field="section"
              label="개화종료일"
              width="40"
              sortable
            >
              {{ props.row.floreInfo.ed_date }}
            </b-table-column>
            <b-table-column
              field="section"
              label="결실처리일"
              width="40"
              sortable
            >
              {{ props.row.fruit_date }}
            </b-table-column>
            <b-table-column
              field="section"
              label="초기평균착립수"
              width="40"
              sortable
            >
              {{ props.row.countDeg }}
            </b-table-column>
            <b-table-column
              field="section"
              label="무핵탈립성"
              width="40"
              sortable
            >
              {{ props.row.countLevel }}
            </b-table-column>
            <b-table-column
              field="section"
              label="초기착과량(송이)"
              width="40"
              sortable
            >
              {{ props.row.floreInfo.ed_date }}
            </b-table-column>
            <b-table-column
              field="section"
              label="착색일자"
              width="40"
              sortable
            >
              {{ props.row.colorDate }}
            </b-table-column>
            <b-table-column field="section" label="착색도" width="40" sortable>
              {{ props.row.colorLevel }}
            </b-table-column>
            <b-table-column
              field="section"
              label="수확가능도"
              width="40"
              sortable
            >
              {{ props.row.harvestAvailable }}
            </b-table-column>
            <b-table-column
              field="section"
              label="수확개시일"
              width="40"
              sortable
            >
              {{ convertTimeStamp(props.row.harvestDate) }}
            </b-table-column>
            <b-table-column
              field="section"
              label="후기착과량"
              width="40"
              sortable
            >
              {{ props.row.postAmount }}
            </b-table-column>

            <b-table-column field="section" label="800g" width="20" sortable>
              {{ props.row.harvestInfo.tp_800 }}
            </b-table-column>
            <b-table-column field="section" label="700g" width="20" sortable>
              {{ props.row.harvestInfo.tp_700 }}
            </b-table-column>
            <b-table-column field="section" label="600g" width="20" sortable>
              {{ props.row.harvestInfo.tp_600 }}
            </b-table-column>
            <b-table-column field="section" label="500g" width="20" sortable>
              {{ props.row.harvestInfo.tp_500 }}
            </b-table-column>
            <b-table-column field="section" label="400g" width="20" sortable>
              {{ props.row.harvestInfo.tp_400 }}
            </b-table-column>
            <b-table-column field="section" label="300g" width="20" sortable>
              {{ props.row.harvestInfo.tp_300 }}
            </b-table-column>
            <b-table-column field="section" label="200g" width="20" sortable>
              {{ props.row.harvestInfo.tp_200 }}
            </b-table-column>
            <b-table-column
              field="section"
              label="총 송이수"
              width="20"
              sortable
            >
              {{ props.row.harvestInfo.total_count }}
            </b-table-column>
            <b-table-column
              field="section"
              label="총 중량(kg)"
              width="20"
              sortable
            >
              {{ props.row.harvestInfo.total_weight.toFixed(1) }}
            </b-table-column>
            <b-table-column label="삭제" width="60" sortable>
              <b-button
                icon-right="delete"
                type="is-danger"
                @click="deleteData(props.row.docID, props.index)"
              ></b-button>
            </b-table-column>
          </template>
        </b-table>
      </div>
    </div>
    <b-modal
      :active.sync="isModalActive"
      width="auto"
      scroll="keep"
      full-screen
    >
      <tree-info-modal-page :treeInfo="selectedItem"></tree-info-modal-page>
    </b-modal>
    <b-loading
      :is-full-page="true"
      :active.sync="isLoading"
      :can-cancel="true"
    ></b-loading>
  </div>
</template>

<script>
import functions from "../mixins/functions.js";
import moment from "moment";

export default {
  name: "TreeDetailListPage",
  mixins: [functions],
  components: {},
  data() {
    return {
      isModalActive: false,
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      locList: [],
      treeList: [],
      db: {},
      locDB: {},
      treeTypeDB: {},
      selectedItem: {},
      memberInfo: {
        uid: "",
        pw: "",
      },
      year: 0,
      locationList: [],
      selectedLoc: "",
      labelPosition: "",
      treeTypeList: [],
      isLoading: false,
    };
  },
  mounted() {
    var member = localStorage.getItem("member");
    this.memberInfo = JSON.parse(member);
    this.db = this.getFirebase()
      .firestore()
      .collection("TreeInfo");

    this.locDB = this.getFirebase()
      .firestore()
      .collection("LOCATION");

    this.treeTypeDB = this.getFirebase()
      .firestore()
      .collection("TreeType");

    this.year = moment().year();

    this.locationList = this.getLocationList(this.memberInfo.uid);

    this.getList();

    this.treeTypeDB = this.getFirebase()
      .firestore()
      .collection("TreeType");
    
    this.treeTypeDB.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        var item = doc.data();
        item.docID = doc.id;
        this.treeTypeList.push(item);
      });
    });

  },
  computed: {},
  methods: {
    convertTimeStamp(value) {
      // Unixtimestamp
      var unixtimestamp = value;
      if (value == undefined || value == 0) return "";

      // Months array
      var months_arr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // Convert timestamp to milliseconds
      var date = new Date(unixtimestamp * 1000);

      // Year
      var year = date.getFullYear();

      // Month
      var month = months_arr[date.getMonth()];

      // Day
      var day = date.getDate();

      // Display date time in MM-dd-yyyy h:m:s format
      var convdataTime = year + "-" + month + "-" + day;
      return convdataTime;
    },
    getTreeType(value) {
      var results = "";
      try {
        var typeItem = this.treeTypeList.filter((x) => x.id == value);
        results = typeItem[0].name;
      } catch (e) {
        results = "";
      }
      return results;
    },
    showDetail(treeInfo) {
      this.selectedItem = treeInfo;

      this.isModalActive = true;
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
    deleteData(docID, index) {
      this.$buefy.dialog.confirm({
        message: "해당 과수 정보를 삭제하시겠습니까?",
        cancelText: "취소",
        confirmText: "삭제",
        type: "is-danger",
        onConfirm: () => {
          this.db.doc(docID).delete();
          this.$buefy.toast.open("과수정보 삭제 완료");

          this.treeList.splice(index, 1);
        },
      });
    },
    getLocationName() {
      var results = this.locDB.where("userid", "==", this.memberInfo.uid);
      var list = [];

      results.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var item = doc.data();
          item.docID = doc.id;
          list.push(item);
        });
      });

      this.locList = list;
    },
    getList() {
      //this.openLoading();
      var results = {};
      if (this.selectedLoc.length > 0) {
        var selectedLocInfo = {};
        for (var locInfo of this.locationList) {
          if (this.selectedLoc == locInfo.docID) {
            selectedLocInfo = locInfo;
          }
        }

        results = this.db
          .where("userid", "==", this.memberInfo.uid)
          .where("year", "==", selectedLocInfo.year)
          .where("locationName", "==", selectedLocInfo.name);
      } else {
        results = results = this.db.where("userid", "==", this.memberInfo.uid);
      }

      var list = [];
      results.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          var item = doc.data();
          item.docID = doc.id;
          list.push(item);
        });
      });

      function comp(val1, val2) {
        return val1.line < val2.line;
      }
      list.sort(comp);

      this.treeList = list;

      this.isLoading = false;
    },
    addLocation() {
      this.getList();
    },
  },
  openLoading() {
    this.$buefy.toast.open({
      message: "데이터 로딩 중입니다. 잠시만 기다려주세요.",
      type: "is-info",
    });

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 10 * 1000);
  },
};
</script>

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

.scroll_horizontal {
  width: auto;
  overflow: auto;
}
</style>
