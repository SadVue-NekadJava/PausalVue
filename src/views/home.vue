<template>
<div>
  <nav-bar />
  <v-layout row wrap class="justify-center  white ma-3">



   <v-flex  lg5 class="ma-1 pa-1" style="border-right:1px solid black; border-left:1px solid black;">
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

        <v-flex xs12  lg3 class="pa-4 ma-1 text-xs-center" style="background-color:white;">
          <h1>Fakture sa najvecim iznosom:</h1>
          <hr>
          <table class="pa-4 ma-2 d-inline-block">
            <thead>
              <th class="pa-2 ma-5">Naziv firme</th>
              <th class="pa-2 ma-5">Broj fakture</th>
              <th class="pa-2 ma-5">Iznos fakture</th>
            </thead>
            <tr v-for="komitent in topKomitenti">
              <td>{{ komitent.kom_naziv }}</td>
              <td>{{ komitent.fak_brojFakture }}</td>
              <td>{{ komitent.fak_total }}</td>
            </tr>
          </table>
        </v-flex >
        <v-flex xs12 lg3 class="pa-4 ma-1 text-xs-center" style="border-right:1px solid black; border-left:1px solid black;">
          <h1>Fakturisano u poslednja tri meseca:</h1>
          <hr>

          <table class="pa-4 ma-2 d-inline-block">
            <thead>
              <th class="pa-2 ma-5">Mesec</th>
              <th class="pa-2 ma-5">Broj izdatih faktura</th>
              <th class="pa-2 ma-5">Iznos izdatih faktura</th>
            </thead>
            <tr>
              <td>{{ this.mesecIme1 }}</td>
              <td>{{ this.ovajMesec.brojFaktura }}</td>
              <td>{{ this.ovajMesec.total }}</td>
            </tr>
            <tr>
              <td>{{ this.mesecIme2 }}</td>
              <td>{{ this.prosliMesec.brojFaktura }}</td>
              <td>{{ this.prosliMesec.total }}</td>
            </tr>
            <tr>
              <td>{{ this.mesecIme3 }}</td>
              <td>{{ this.pretprosliMesec.brojFaktura }}</td>
              <td>{{ this.pretprosliMesec.total }}</td>
            </tr>
          </table>
<!--
          <h3 class="pa-2 ma-4">{{ this.mesecIme1 }} - {{ this.ovajMesec.total }} - {{ this.ovajMesec.brojFaktura }}</h3>
          <h3 class="pa-2 ma-4">{{ this.mesecIme2 }} - {{ this.prosliMesec.total }} - {{ this.prosliMesec.brojFaktura }}</h3>
          <h3 class="pa-2 ma-4">{{ this.mesecIme3 }} - {{ this.pretprosliMesec.total }} - {{ this.pretprosliMesec.brojFaktura }}</h3> -->
        </v-flex >


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
      cifraGodisnje: 0,
      topKomitenti: '',
      ovajMesec:'',
      prosliMesec:'',
      pretprosliMesec:'',
      mesecIme1:'',
      mesecIme2:'',
      mesecIme3:'',
      meseci:{
        0: 'Januar',
        1: 'Februar',
        2: 'Mart',
        3: 'April',
        4: 'Maj',
        5: 'Jun',
        6: 'Jul',
        7: 'Avgust',
        8: 'Septembar',
        9: 'Oktobar',
        10: 'Novembar',
        11: 'Decembar'
      }
    }
  },
  methods: {

  },
  mounted() {
    this.mesecIme1 = this.meseci[new Date().getMonth()];
    if(this.mesecIme1==0){
      this.mesecIme2 = 11;
      this.mesecIme3 = 10;
    }else if(this.mesecIme1==1){
      this.mesecIme2 = 0;
      this.mesecIme3 = 11;
    }else{
      this.mesecIme2 = this.meseci[new Date().getMonth()-1];
      this.mesecIme3 = this.meseci[new Date().getMonth()-2];
    }
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
      this.topKomitenti = response.data.topComittents;
      this.ovajMesec = response.data.thisMonth;
      this.prosliMesec = response.data.lastMonth;
      this.pretprosliMesec = response.data.twoMonthsAgo;
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
