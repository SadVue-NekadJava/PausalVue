<template>
<div>
  <nav-bar />
  <v-layout row wrap class="justify-center white ma-3">



   <v-flex md5 lg4 class="ma-1 pa-1">
    <v-flex class=" pa-4 ma-1">
      <h1>Ukupan promet u poslednjih 12 meseci</h1>
      <div class="bar">
        <div class="barHealth align-center d-flex text-xs-center" :class='{barHealthRed:procenatFakturisanogMesecno>80}' :style="{width:procenatFakturisanogMesecno +'%'}">
          <h3 v-if="procenatFakturisanogMesecno<50">{{cifraMesecno|thousandSeparator}} RSD</h3>
          <h2 v-if="procenatFakturisanogMesecno>=50&&procenatFakturisanogMesecno<80">{{cifraMesecno|thousandSeparator}} RSD</h2>
          <h1 v-if="procenatFakturisanogMesecno>=80">{{cifraMesecno|thousandSeparator}} RSD</h1>
        </div>
      </div>
      <p class="mt-1"><em>Promet od 8 miliona dinara</em></p>
    </v-flex>

    <v-flex class=" pa-4 ma-1">
      <h1>Ukupan promet u kalendarskoj godini</h1>
      <div class="bar">
        <div class="barHealth align-center d-flex text-xs-center" :class='{barHealthRed:procenatFakturisanogGodisnje>80}' :style="{width:procenatFakturisanogGodisnje +'%'}">
          <h3 v-if="procenatFakturisanogGodisnje<50">{{cifraGodisnje|thousandSeparator  }} RSD</h3>
          <h2 v-if="procenatFakturisanogGodisnje>=50&&procenatFakturisanogGodisnje<80">{{cifraGodisnje|thousandSeparator}} RSD</h2>
          <h1 v-if="procenatFakturisanogGodisnje>=80">{{cifraGodisnje|thousandSeparator}} RSD</h1>
        </div>
      </div>
      <p class="mt-1"><em>Promet od 6 miliona dinara</em></p>
    </v-flex>
    </v-flex>

    <!-- dupli probni kod  -->
  <v-flex row wrap md6 lg7 class="ma-1 pa-1">
        <div lg3 class=" text-xs-center" style="background-color:green;">
          <h1>KOMITENTI</h1>
        </div>
        <div lg3 class=" text-xs-center" style="background-color:yellow;">
          <h1>MESEC</h1>
        </div>

  </v-flex>

  </v-layout>
</div>
</template>

<script>
import Navbar from '@/components/navBar'
export default {
  components: {
    'nav-bar': Navbar
  },
  data() {
    return {
      procenatFakturisanogMesecno: 0,
      cifraMesecno: 0,
      procenatFakturisanogGodisnje: 0,
      cifraGodisnje: 0
    }
  },
  methods: {

  },
  mounted() {
    this.logged = this.$store.state.logged;

    axios.get("http://837s121.mars-e1.mars-hosting.com/annualIncome", {
      params: {
        sid: localStorage.getItem('sessionid')
      }
    }).then(response => {
      this.cifraMesecno = response.data.income;
      this.procenatFakturisanogMesecno = response.data.incomePercentage;
      this.procenatFakturisanogGodisnje = response.data.curYearincomePercentage;
      this.cifraGodisnje = response.data.curYearincome;
    });
  }
}
</script>

<style >
.barHealthRed {
  background-color: red !important;
  color: white;
}

.barHealth {
  transition: width 1s;
  height: 100%;

  background-color: rgb(36, 125, 179);

}



.bar {
  background-color: #f5f5f5;
  overflow: hidden;
  height: 60px;
  border-radius: 13px;
  border: 3px solid silver;
}
</style>
