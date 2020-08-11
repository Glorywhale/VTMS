<template>
  <div>
    <div class="control" style="margin : 10px">
      <div class="field is-grouped is-grouped-multiline">
        <h1>품종별 수확가능량 계산</h1>
      </div>

      <div class="field is-grouped is-grouped-multiline">
        <b-field label="관리 지역" :label-position="labelPosition">
          <b-select placeholder="관리 지역 선택" v-model="selectedLoc">
            <option value="전체">전체</option>
            <option
              v-for="loc in locationList"
              :value="loc"
              :key="loc.docID"
            >{{ "[" + loc.year + "]" + loc.name }}</option>
          </b-select>
        </b-field>
        <b-field label="품종">
          <b-select placeholder="품종 선택" v-model="treeType">
            <option value="0">전체</option>
            <option v-for="type in treeTypeList" :value="type.id" :key="type.id">{{ type.name }}</option>
          </b-select>
        </b-field>
        <b-field label="라인번호">
          <b-select placeholder="라인번호 선택" v-model="selectedLine">
            <option value="0">전체</option>
            <option v-for="index in maxLine" :key=index>{{index}}</option>           
          </b-select>
        </b-field>    
        <b-field label="검색 종료 수확개시일">
          <b-datepicker
            :show-week-number="showWeekNumber"
            :month-names="months"
            v-model="ed_date"
            placeholder="수확일자 선택"
            icon="calendar-today"
          ></b-datepicker>
        </b-field>
        <b-button
          icon-right="magnify"
          type="is-success"
          @click="getTotal"
          style="margin : 32px 0px 0px 0px;"
        >검 색</b-button>
      </div>

      <div class="field is-grouped is-grouped-multiline">
        <b-field label="지역명">
          <b-input v-model="selectedLoc.name" disabled></b-input>
        </b-field>
        <b-field label="품종">
          <b-input v-model="treeTypeName" disabled></b-input>
        </b-field>
        <b-field label="800g">
          <b-input v-model="g800" disabled></b-input>
        </b-field>
        <b-field label="700g">
          <b-input v-model="g700" disabled></b-input>
        </b-field>
        <b-field label="600g">
          <b-input v-model="g600" disabled></b-input>
        </b-field>
        <b-field label="500g">
          <b-input v-model="g500" disabled></b-input>
        </b-field>
        <b-field label="400g">
          <b-input v-model="g400" disabled></b-input>
        </b-field>
        <b-field label="300g">
          <b-input v-model="g300" disabled></b-input>
        </b-field>
        <b-field label="200g">
          <b-input v-model="g200" disabled></b-input>
        </b-field>
        <b-field label="총 수량">
          <b-input v-model="totalCount" disabled></b-input>
        </b-field>
        <b-field label="총 중량">
          <b-input v-model="totalWeight" disabled></b-input>
        </b-field>
        <b-field label="수확 가능 나무 수">
          <b-input v-model="totalTreeCount" disabled></b-input>
        </b-field>
      </div>

      <div class="scroll_horizontal">
        <b-table
          :data="resultsList"
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
            <b-table-column
              field="section"
              label="라인번호"
              width="40"
              sortable
            >{{ props.row.line }}</b-table-column>
            <b-table-column
              field="section"
              label="수확개시일"
              width="40"
              sortable
            >{{ props.row.harvestDate }}</b-table-column>
            <b-table-column
              field="section"
              label="품종"
              width="40"
              sortable
            >{{ getTreeType(props.row.treeType) }}</b-table-column>
            <b-table-column
              field="section"
              label="800g"
              width="20"
              sortable
            >{{ props.row.harvestInfo.tp_800 }}</b-table-column>
            <b-table-column
              field="section"
              label="700g"
              width="20"
              sortable
            >{{ props.row.harvestInfo.tp_700 }}</b-table-column>
            <b-table-column
              field="section"
              label="600g"
              width="20"
              sortable
            >{{ props.row.harvestInfo.tp_600 }}</b-table-column>
            <b-table-column
              field="section"
              label="500g"
              width="20"
              sortable
            >{{ props.row.harvestInfo.tp_500 }}</b-table-column>
            <b-table-column
              field="section"
              label="400g"
              width="20"
              sortable
            >{{ props.row.harvestInfo.tp_400 }}</b-table-column>
            <b-table-column
              field="section"
              label="300g"
              width="20"
              sortable
            >{{ props.row.harvestInfo.tp_300 }}</b-table-column>
            <b-table-column
              field="section"
              label="200g"
              width="20"
              sortable
            >{{ props.row.harvestInfo.tp_200 }}</b-table-column>
            <b-table-column
              field="section"
              label="총 송이수"
              width="20"
              sortable
            >{{ props.row.harvestInfo.total_count }}</b-table-column>
            <b-table-column
              field="section"
              label="총 중량(kg)"
              width="20"
              sortable
            >{{ props.row.harvestInfo.total_weight.toFixed(1) }}</b-table-column>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import functions from "../mixins/functions.js";
import moment from "moment";

export default {
  name: "TreeTypeStatistics",
  mixins: [functions],
  components: {},
  data() {
    return {
      months: moment.monthsShort(),
      showWeekNumber: true,
      treeType: 0,
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
      resultsList: [],
      st_date: [],
      ed_date: [],
      g800: 0,
      g700: 0,
      g600: 0,
      g500: 0,
      g400: 0,
      g300: 0,
      g200: 0,
      totalCount: 0,
      totalWeight: "",
      treeTypeName: "",
      totalTreeCount: 0,
      selectedLine: 0,
      maxLine : 20,
    };
  },
  mounted() {
    var member = localStorage.getItem("member");
    this.memberInfo = JSON.parse(member);
    this.db = this.getFirebase().firestore().collection("TreeInfo");

    this.locDB = this.getFirebase().firestore().collection("LOCATION");

    this.year = moment().year();

    this.locationList = this.getLocationList(this.memberInfo.uid);

    this.treeTypeDB = this.getFirebase().firestore().collection("TreeType");

    this.getList();
    
  },
  computed: {},
  methods: {
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
    getLocationList(member_uid) {
      var results = this.locDB.where("userid", "==", member_uid);
      var list = [];
      results.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var item = doc.data();
          item.docID = doc.id;
          list.push(item);
        });
      });

      return list;
    },
    getLocationName() {
      var results = this.locDB.where("userid", "==", this.memberInfo.uid);
      var list = [];

      results.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var item = doc.data();
          item.docID = doc.id;
          list.push(item);
        });
      });

      this.locList = list;
    },
    getList() {
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
      results.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var item = doc.data();
          item.docID = doc.id;
          // item.harvestDate = item.harvestDate.length > 10 ? this.convertTimeStamp(item.harvestDate) : item.harvestDate;
          item.fruitDate = new Date(item.fruitDate);
          item.floreInfo.st_date = new Date(item.floreInfo.st_date);
          item.floreInfo.ed_date = new Date(item.floreInfo.ed_date);
          item.colorDate = new Date(item.colorDate);
          list.push(item);
        });
      });

      function comp(val1, val2) {
        return val1.line < val2.line;
      }
      list.sort(comp);

      this.treeList = list;

      var treeTypelist = [];
      this.treeTypeDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var item = doc.data();
          item.docID = doc.id;
          treeTypelist.push(item);
        });
      });

      this.treeTypeList = treeTypelist;      
    },
    addLocation() {
      this.getList();
    },
    getTotal() {
      // this.resultsList = this.treeList.filter(
      //   (x) => x.treeType == this.treeType
      // );
      var tempList = this.treeList;

      if (this.selectedLoc != undefined && this.selectedLoc != "") {
        tempList = tempList.filter(
          (x) => x.locationID == this.selectedLoc.docID
        );
      }
      if (this.treeType > 0) {
        tempList = tempList.filter((x) => x.treeType == this.treeType);
      }
      if (this.ed_date > 0) {
        tempList = tempList.filter(
          (x) =>
            new Date(x.harvestDate) <=
            new Date(moment(this.ed_date).add(1, "d"))
        );
      }

      if(this.selectedLine > 0){
        tempList = tempList.filter(x=> x.line == this.selectedLine);
      }

      this.resultsList = tempList;

      this.g800 = 0;
      this.g700 = 0;
      this.g600 = 0;
      this.g500 = 0;
      this.g400 = 0;
      this.g300 = 0;
      this.g200 = 0;
      this.totalCount = 0;
      this.totalWeight = "";

      //// 총계 내기
      for (var item of tempList) {
        if (item.harvestInfo.tp_800 > 0) this.g800 += item.harvestInfo.tp_800;
        if (item.harvestInfo.tp_700 > 0) this.g700 += item.harvestInfo.tp_700;
        if (item.harvestInfo.tp_600 > 0) this.g600 += item.harvestInfo.tp_600;
        if (item.harvestInfo.tp_500 > 0) this.g500 += item.harvestInfo.tp_500;
        if (item.harvestInfo.tp_400 > 0) this.g400 += item.harvestInfo.tp_400;
        if (item.harvestInfo.tp_300 > 0) this.g300 += item.harvestInfo.tp_300;
        if (item.harvestInfo.tp_200 > 0) this.g200 += item.harvestInfo.tp_200;
      }

      this.totalCount =
        this.g800 +
        this.g700 +
        this.g600 +
        this.g500 +
        this.g400 +
        this.g300 +
        this.g200;
      this.totalWeight =
        this.g800 * 0.8 +
        this.g700 * 0.7 +
        this.g600 * 0.6 +
        this.g500 * 0.5 +
        this.g400 * 0.4 +
        this.g300 * 0.3 +
        this.g200 * 0.2;
      this.totalWeight = this.totalWeight.toFixed(2) + "kg";

      if (this.treeType == 0) {
        this.treeTypeName = "전체";
      } else {
        this.treeTypeName = this.getTreeType(this.treeType);
      }

      function comp(val1, val2) {
        return val1.harvestDate < val2.harvestDate;
      }
      this.resultsList.sort(comp);

      this.totalTreeCount = this.resultsList.length;
    },
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
</style>
