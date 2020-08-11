<template>
  <section class="section">
    <h1>기타 설정</h1>
    <div class="field is-grouped is-grouped-multiline">
      <!-- <b-button class="button" style="margin : 12px" @click="uploadExcel">
        기존 데이터 엑셀 업로드
      </b-button> -->
      <input
        type="file"
        @change="readFile"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      />
    </div>
  </section>
</template>

<script>
import XLSX from "xlsx";

export default {
  name: "SettingPage",
  data() {
    return {
      results: []
    };
  },
  props: [],
  methods: {
    readFile(event) {
      // get File object from input tag
      const file = event.target.files[0];
      //const fileName = file.name; // declare FileReader, temp result
      const reader = new FileReader();
      let tmpResult = {}; // if you use "this", don't use "function(e) {...}"
      reader.onload = e => {
        let data = e.target.result;
        data = new Uint8Array(data); // get excel file
        let excelFile = XLSX.read(data, { type: "array" }); // get prased object
        excelFile.SheetNames.forEach(function(sheetName) {
          const roa = XLSX.utils.sheet_to_json(excelFile.Sheets[sheetName], {
            header: 1
          });
          if (roa.length) tmpResult[sheetName] = roa;
        });
        this.result = tmpResult.Sheet1;
      };
      reader.readAsArrayBuffer(file);
    }
  }
};
</script>

<style scoped>
.nested.dropdown:hover > .dropdown-menu {
  display: block;
}
.nested.dropdown .dropdown-menu {
  top: -12px;
  margin-left: 100%;
}
.nested.dropdown .dropdown-trigger button {
  margin: -4px 0px;
  padding: 0px 0px;
  border: 0px;
  font-size: 1em;
  height: 2em;
}
</style>
