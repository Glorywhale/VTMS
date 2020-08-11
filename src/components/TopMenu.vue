<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">    
    <div class="navbar-brand">
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="TMS"
        aria-expanded="false"
        @click="toggleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div ref="navbarMain" class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">메뉴</a>
          <div class="navbar-dropdown">
            <a class="navbar-item">기본정보 관리</a>
            <a class="navbar-item">지역정보 관리</a>
            <a class="navbar-item">과수 정보 관리</a>
            <a class="navbar-item">기준 정보 관리</a>
            <a class="navbar-item">기타 설정</a>
          </div>
        </div>
      </div>     
    </div>
  </nav>
</template>

<script>
export default {
  name: "TopMenu",
  props: ["member"],
  methods: {
    toggleMenu() {
      this.$refs.navbarMain.classList.toggle("is-active");
    },
    logout() {
      this.$emit("logout");
    },
    saveMember() {
      this.$emit("saveMember");
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
