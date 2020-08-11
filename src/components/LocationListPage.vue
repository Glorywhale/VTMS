<template>
  <div>
    <div class="control" style="margin : 10px">
      <h1>지역정보 목록</h1>
      <b-table
        :data="locList"
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
            {{ props.row.name }}
          </b-table-column>
          <b-table-column field="line" label="라인 수" width="40" sortable>
            {{ props.row.line }}
          </b-table-column>
          <b-table-column field="section" label="구역 수" width="40" sortable>
            {{ props.row.section }}
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
</template>

<script>
import functions from "../mixins/functions.js";

export default {
  name: "LocationListPage",
  mixins: [functions],
  data() {
    return {
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      locList: [],
      db: {},
      selectedItem: {},
      memberInfo: {
        uid: "",
        pw: ""
      }
    };
  },
  mounted() {
    var member = localStorage.getItem("member");
    this.memberInfo = JSON.parse(member);
    this.db = this.getFirebase()
      .firestore()
      .collection("LOCATION");

    this.getList();
  },
  computed: {},
  methods: {
    deleteData(docID, index) {
      this.$buefy.dialog.confirm({
        message: "해당 지역 정보를 삭제하시겠습니까?",
        cancelText: "취소",
        confirmText: "삭제",
        type: "is-danger",
        onConfirm: () => {
          this.db.doc(docID).delete();
          this.$buefy.toast.open("지역정보 삭제 완료");

          this.locList.splice(index, 1);
        }
      });
    },
    getList() {
      var results = this.db.where("userid", "==", this.memberInfo.uid);
      var list = [];
      results.get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          //  this.msg = doc.data();
          var item = doc.data();
          item.docID = doc.id;
          list.push(item);
          //console.log("name", tempcc.name);
        });
      });

      this.locList = list;
    },
    addLocation() {
      this.getList();
    }
  }
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