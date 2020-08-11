<template>
  <div>
    <div class="control" style="margin : 10px">
      <div class="field is-grouped is-grouped-multiline">
        <h1>과수 목록</h1>
        <!-- <b-button
          icon-right="refresh"
          type="is-info"
          @click="getList"
        ></b-button>-->
      </div>

      <div class="field is-grouped is-grouped-multiline">
        <b-field label="관리 지역" :label-position="labelPosition">
          <b-select placeholder="관리 지역 선택" v-model="selectedLoc">
            <option value>전체</option>
            <option
              v-for="loc in locationList"
              :value="loc.docID"
              :key="loc.docID"
            >{{ "[" + loc.year + "]" + loc.name }}</option>
          </b-select>
        </b-field>        
        <b-button
          icon-right="magnify"
          type="is-info"
          @click="getList"
          style="margin : 32px 0px 0px 0px;"
        >검 색</b-button>
        <b-button
          type="is-success"
          @click="getExcelFile"
          style="margin : 32px 10px 10px 10px;"
        >엑셀 다운로드</b-button>
      </div>

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
          <b-table-column field="year" label="적용연도" width="40" sortable>{{ props.row.year }}</b-table-column>
          <b-table-column field="name" label="지역명" width="40" sortable>{{ props.row.locationName }}</b-table-column>
          <b-table-column field="line" label="라인 번호" width="40" sortable>{{ props.row.line }}</b-table-column>
          <b-table-column field="section" label="구역 번호" width="40" sortable>{{ props.row.section }}</b-table-column>
          <b-table-column field="section" label="나무 번호" width="40" sortable>{{ props.row.treeNo }}</b-table-column>
          <b-table-column label="상세보기" width="60" sortable>
            <b-button icon-right="magnify" type="is-info" @click="showDetail(props.row)"></b-button>
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
    <b-modal :active.sync="isModalActive" width="auto" scroll="keep" full-screen>
      <tree-info-modal-page :treeInfo="selectedItem"></tree-info-modal-page>
    </b-modal>
  </div>
</template>

<script>
import functions from "../mixins/functions.js";
import TreeInfoModalPage from "../components/TreeInfoModalPage.vue";
import moment from "moment";
import XLSX from "xlsx";

export default {
  name: "TreeListPage",
  mixins: [functions],
  components: {
    TreeInfoModalPage,
  },
  data() {
    return {
      treeTypeList: [],
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
      excelData: {
        year: "",
        locationName: "",
        line: 0,
        section: 0,
        treeNo: 0,
        treeType: 0,
        floreSTDate: "",
        floreEDDate: "",
        fruit_date: "",
        countDeg: 0, //// 초기 평균착립수
        countLevel: "", //// 무핵탈립성
        earlyAmount: 0,
        colorDate: "", //// 착색일자
        colorLevel: 0, //// 착색도
        harvestAvailable: 0, //// 수확가능도
        harvestDate: "",
        harvestDegree: 0, //// 수확가능도
        tp_200: 0,
        tp_300: 0,
        tp_400: 0,
        tp_500: 0,
        tp_600: 0,
        tp_700: 0,
        tp_800: 0,
        total_count: 0,
        total_weight: 0.0,
      },
      excelItems: [],
    };
  },
  mounted() {
    var member = localStorage.getItem("member");
    this.memberInfo = JSON.parse(member);
    this.db = this.getFirebase().firestore().collection("TreeInfo");

    this.locDB = this.getFirebase().firestore().collection("LOCATION");

    this.treeTypeDB = this.getFirebase().firestore().collection("TreeType");

    this.year = moment().year();

    this.locationList = this.getLocationList(this.memberInfo.uid);

    this.getList();
  },
  computed: {},
  methods: {
    showDetail(treeInfo) {
      this.selectedItem = treeInfo;
      this.isModalActive = true;
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
          item.harvestDate = new Date(item.harvestDate);
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
    },
    addLocation() {
      this.getList();
    },
    getExcelFile() {
      this.$buefy.dialog.confirm({
        title: "엑셀 다운로드",
        message: `조회된 내용을 엑셀 파일로 저장하시겠습니까?`,
        cancelText: "취소",
        confirmText: "저장",
        type: "is-success",
        onConfirm: () => this.onexport(),
      });
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
    onexport() {
      this.excelItems = [];

      var selectedLocInfo = {};
      for (var locInfo of this.locationList) {
        if (this.selectedLoc == locInfo.docID) {
          selectedLocInfo = locInfo;
        }
      }

      this.treeTypeList = [];
      this.treeTypeDB.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var item = doc.data();
          item.docID = doc.id;
          this.treeTypeList.push(item);
        });
      });

      //// 제품박스 출력용
      //// 출력을 위한 데이터 구성
      var counter = 1;
      for (var item of this.treeList) {
        this.excelData = {};
        this.excelData.No = counter++;
        this.excelData.year = selectedLocInfo.year;
        this.excelData.locationName = selectedLocInfo.name;
        this.excelData.line = item.line;
        this.excelData.section = item.section;
        this.excelData.treeNo = item.treeNo;
        this.excelData.treeType = this.getTreeType(item.treeType);
        this.excelData.floreSTDate = item.floreInfo.st_date;
        this.excelData.floreEDDate = item.floreInfo.ed_date;
        this.excelData.fruit_date = item.fruit_date;
        this.excelData.countDeg = item.countDeg;
        this.excelData.countLevel = item.countLevel;
        this.excelData.earlyAmount = item.earlyAmount;
        this.excelData.colorDate = item.colorDate;
        this.excelData.colorDegree = item.colorDegree;
        this.excelData.harvestAvailable = item.harvestAvailable;
        this.excelData.harvestDate = item.harvestDate;
        this.excelData.harvestDegree = item.harvestDegree;
        this.excelData.tp_200 = item.tp_200;
        this.excelData.tp_300 = item.tp_300;
        this.excelData.tp_400 = item.tp_400;
        this.excelData.tp_500 = item.tp_500;
        this.excelData.tp_600 = item.tp_600;
        this.excelData.tp_700 = item.tp_700;
        this.excelData.tp_800 = item.tp_800;
        this.excelData.total_count = item.total_count;
        this.excelData.total_weight = item.total_weight;

        this.excelItems.push(this.clone(this.excelData));
      }

      var ws = XLSX.utils.json_to_sheet(this.excelItems);

      // A workbook is the name given to an Excel file
      var wb = XLSX.utils.book_new(); // make Workbook of Excel

      //// 각 컬럼별 Width 설정
      var wscols = [
        { wch: 6 }, // No
        { wch: 10 }, // 관리연도
        { wch: 12 }, // 지역명
        { wch: 8 }, // 라인번호
        { wch: 8 }, // 구역번호
        { wch: 8 }, // 과수번호
        { wch: 10 }, // 품종
        { wch: 12 }, // 개화시작일시
        { wch: 12 }, // 개화종료일시
        { wch: 12 }, // 결실일자
        { wch: 15 }, // 초기 평균착립수
        { wch: 15 }, // 무핵탈립성
        { wch: 15 }, // 초기수확량
        { wch: 12 }, // 착색일자
        { wch: 5 }, // 착색도
        { wch: 5 }, // 수확가능도
        { wch: 12 }, // 수확일자
        { wch: 5 }, // 수확가능도
      ];
      ws["!cols"] = wscols;

      ws.A1.v = "No.";
      ws.B1.v = "관리연도";
      ws.C1.v = "지역명";
      ws.D1.v = "라인번호";
      ws.E1.v = "구역번호";
      ws.F1.v = "과수번호";
      ws.G1.v = "품종";
      ws.H1.v = "개화시작일시";
      ws.I1.v = "개화종료일시";
      ws.J1.v = "결실일자";
      ws.K1.v = "초기 평균착립수";
      ws.L1.v = "무핵탈립성";
      ws.M1.v = "초기수확량";
      ws.N1.v = "착색일자";
      ws.O1.v = "착색도";
      ws.P1.v = "수확가능도";
      ws.Q1.v = "수확일자";
      ws.R1.v = "수확가능도";
      ws.S1.v = "200g";
      ws.T1.v = "300g";
      ws.U1.v = "400g";
      ws.V1.v = "500g";
      ws.W1.v = "600g";
      ws.X1.v = "700g";
      ws.Y1.v = "800g";
      ws.Z1.v = "총 수량";
      ws.AA1.v = "총 중량";

      // add Worksheet to Workbook
      // Workbook contains one or more worksheets
      XLSX.utils.book_append_sheet(wb, ws, "조회결과");

      // export Excel file
      XLSX.writeFile(wb, "조회결과_" + moment().format("YYYYMMDD") + ".xlsx"); // name of the file is 'book.xlsx'
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
