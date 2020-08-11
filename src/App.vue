<template>
  <div id="app">    
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {    
  },
  data() {
    return {
      member: {},
      visibleMemberForm: false
    }
  },
  mounted() {    
    // if (this.$router.currentRoute.path != '/') {
    //   var member = localStorage.getItem('member');
    //   if (member) {
    //     this.member = JSON.parse(member);
    //   }
    //   else {
    //     this.logout();
    //   }
    // }
  },
 updated() {
    if (this.$router.currentRoute.path != '/') {
      if (!this.member.MEMBER_INDEX) {
        if (localStorage.getItem('member')) {
          this.member = JSON.parse(localStorage.getItem('member'));
        }
        else {
          this.logout();
        }
      }
    }
  },
  methods: {  
    logout() {
      // this.$http.get(`${this.baseUrl}/members/logout`)
      // .then(() => {
      //   this.member = {};
      //   localStorage.removeItem('member');
      //   this.$router.push('/');
      // });
    },
    saveMember() {
      // this.$http.put(`${this.baseUrl}/members/${this.member.MEMBER_INDEX}`, this.member)
      // .then(() => {
      //   this.member.MEMBER_PW = null;
      //   localStorage.setItem('member', JSON.stringify(this.member));
      //   alert('정보가 저장 되었습니다.');
      //   this.visibleMemberForm = false;
      // });
    },  
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
