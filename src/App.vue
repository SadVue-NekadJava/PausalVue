<template>
  <v-app>
    <div class="wrapper">
      <router-view/>
        <v-footer class="" app>
          <v-spacer></v-spacer>
            FLM Systems &copy; {{ new Date().getFullYear() }} Copyright
          <v-spacer></v-spacer>
        </v-footer>
    </div>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      fixed:false
    }
  }
}
</script>
<style scoped>
.wrapper{
  background-image: url('./assets/officeBg2.jpg');
background-size: cover;
background-repeat: no-repeat;
background-position: center;
background-attachment: fixed;
/* width:100vw; */
min-height: 100vh;


}
/* .forma {
background-color: rgba(255, 255, 255, 1);
border-radius: 10px;
border: 1px solid light-green;
}
.opacity{
  opacity:0.85;
}
.mainContainer{
  background-color: #98b2e6;
  min-height:97vh;
;
} */
</style>
