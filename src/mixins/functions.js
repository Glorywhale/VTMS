import firebase from "firebase/app";
import "firebase/firestore";
import moment from "moment";

const firebaseConfig = {
  apiKey: "AIzaSyBgXlpKcLLdR_HMaWwHFOq0O6h3TGFrxs0",
  authDomain: "treemanagementsystem-46ac7.firebaseapp.com",
  databaseURL: "https://treemanagementsystem-46ac7.firebaseio.com",
  projectId: "treemanagementsystem-46ac7",
  storageBucket: "treemanagementsystem-46ac7.appspot.com",
  messagingSenderId: "481672805953",
  appId: "1:481672805953:web:b191ab68d62e2c6ae4d0c0"
};

firebase.initializeApp(firebaseConfig);

export default {
  methods: {
    getFirebase() {
      return firebase;
    },
    clone(obj) {
      if (obj === null || typeof obj !== "object") return obj;

      var copy = obj.constructor();

      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = obj[attr];
        }
      }

      return copy;
    },
    login(uid, pw) {
      var results = false;
      firebase
        .firestore()
        .collection("USER")
        .get()
        .then(querySnapshot => {
          var isExist = false;
          querySnapshot.forEach(doc => {
            var userInfo = doc.data();
            if (uid == userInfo.id) {
              isExist = true;
              if (pw == userInfo.password) {
                results = true;
                this.$buefy.toast.open({
                  message: "로그인 성공!",
                  type: "is-success",
                  position: "is-bottom"
                });
                return results;
              } else {
                this.alertMsg("비밀번호가 일치하지 않습니다.");
              }
            }
          });

          if (isExist == false) {
            this.alertMsg("일치하는 이용자 정보가 없습니다.");
          }
        });
      return results;
    },    
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    formatMonth(date) {
      return moment(date).format("YYYY-MM");
    },
    formatBarcodeDateTime() {
      var str = "";
      moment.locale("en");
      str = moment()
        .format("DDMMMYY")
        .toUpperCase();
      moment.locale("ko");
      return str;
    },
    formatDateTime(date) {
      moment.locale("ko");
      return moment(date).format("YY-MM-DD HH:mm:ss");
    },
    formatShortDate(date) {
      moment.locale("ko");
      return moment(date).format("YYYYMMDD");
    },
  }
};
