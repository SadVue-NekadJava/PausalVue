<template>
  <v-app>
    <div class="wrapper">
<v-container class="mainContainer" pa-0 >


      <router-view/>
      <v-footer class="opacity" :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span><v-flex xs4 offset-xs4>

    <span >Copyright@ FLM Systems</span>  </v-flex>
    </v-footer>
    </v-container>
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
<style>
.wrapper{
  background-image: url('./assets/officeBg2.jpg');
background-size: cover;
background-repeat: no-repeat;
background-position: center;
background-attachment: fixed;
width:100vw;
min-height: 100vh;

}
.forma {
background-color: rgba(255, 255, 255, 0.9);
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
}
</style>
