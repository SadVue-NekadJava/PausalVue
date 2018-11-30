<template>
<div class="pozadina" >
  <v-container  >
  <v-layout row wrap class="lejaut align-center text-xs-center" >
    <v-flex xs8 offset-xs2 class=" forma fleks">
      <h1 class="hidden-md-and-down display-3 ">{{msg}}</h1>
        <h1 class="hidden-lg-and-up display-1 mt-3">{{msg}}</h1>
        <v-btn   color="primary  ">Login</v-btn>
    </v-flex>
  </v-layout>
  </v-container>
</div>

</template>

<script>



export default {
  components:{

  },
  data() {
    return {
      hash: '',
      msg: ''

    }
  },
  mounted() {
    this.hash = decodeURIComponent(location.href);
    this.hash = this.hash.split('=');
    this.hash = this.hash[1];
    axios.get("http://837s121.mars-e1.mars-hosting.com/validateEmail", {
      params: {
        hash: this.hash
      },
    }).then(response => {
      this.msg = response.data.msg;

    });
  }
}
</script>

<style scoped >
.fleks{
  height:20vh;
}
.lejaut{
  height:80vh;
}
.pozadina{
  position:absolute;
  top:0;
  left:0;
  height:100vh;
  width:100vw;
  background:rgba(0, 0, 0, 0.7);
}
</style>
