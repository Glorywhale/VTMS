<template>
  <div class="main">
    <b-field label="TITLE">
      <b-input v-model="title" label="Title" required></b-input>
    </b-field>
    <b-field label="Contents">
      <b-input v-model="isStandard" label="기준 여부" required></b-input>
    </b-field>    
    <b-button fab dark large color="cyan" @click="save">저장</b-button>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey : "",
  authDomain : "",
  databaseURL : "",
  projectId : "treemanagementsystem-46ac7",
  storageBucket : "",
  messageingSenderId : "",
  appId:""
};

firebase.initializeApp(firebaseConfig);


export default {
  name: "HelloWorld",
  props: {
    
  },
  data: () => ({
    title: "노지",
    isStandard: true,
    counter : 1
  }),
  methods: {
    save() {
      this.counter = this.counter + 1;

      firebase
        .firestore()
        .collection("TMS")
        .doc("TB_Location")
        .collection("Locations")        
        .doc("Location" + this.counter) //// ID를 변경하여 입력하는 경우        
        .set({
            title: this.title,
          isStandard: this.isStandard
        })
        .then(() => {});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
