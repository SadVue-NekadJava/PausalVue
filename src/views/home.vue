<template>
<div>
  <nav-bar />
<v-flex xs10 offset-xs1>
<v-btn @click="stampaj" color="primary">Stampaj KPO</v-btn>

  <v-layout row wrap class="justify-center white ma-3 ">


   <v-flex   lg5 class="ma-1 pa-1" style="border-right:1px solid black; border-left:1px solid black;">
    <v-flex class="pa-4 ma-1">
        <h1 class="tableCell pa-3 ma-1">Ukupan promet:</h1>

      <h3 class="pt-4 ma-1">Ukupan promet u poslednjih 12 meseci</h3>
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
      <h3 class="pt-4 ma-1">Ukupan promet u kalendarskoj godini</h3>
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


        <v-flex xs12  lg3 class="pa-4 ma-1 text-xs-center" style="background-color:white;">
          <h1>Fakture sa najvecim iznosom:</h1>
          <hr>
          <table class="pa-1 ma-1 d-inline-block">
            <thead>
              <th class="tableCell pa-2 ma-5">Naziv firme</th>
              <th class="tableCell pa-2 ma-5">Broj fakture</th>
              <th class="tableCell pa-2 ma-5">Iznos fakture</th>
            </thead>
            <tr v-for="komitent in topKomitenti">
              <td class="tableCell pa-2 ma-5">{{ komitent.kom_naziv }}</td>
              <td class="tableCell pa-2 ma-5">{{ komitent.fak_brojFakture }}</td>
              <td class="tableCell pa-2 ma-5 text-xs-right">{{ komitent.fak_total }}</td>
            </tr>
          </table>



        </v-flex >
        <v-flex xs12 lg3 class="pa-4 ma-1 text-xs-center" style="border-right:1px solid black; border-left:1px solid black;">
          <h1>Fakturisano u poslednja tri meseca:</h1>
          <hr>

          <table class="pa-1 ma-1 d-inline-block">
            <thead>
              <th class="tableCell pa-2 ma-5">Mesec</th>
              <th class="tableCell pa-2 ma-5">Broj izdatih faktura</th>
              <th class="tableCell pa-2 ma-5">Iznos izdatih faktura</th>
            </thead>
            <tr>
              <td class="tableCell pa-2 ma-5">{{ this.mesecIme1 }}</td>
              <td class="tableCell pa-2 ma-5">{{ this.ovajMesec.brojFaktura }}</td>
              <td class="tableCell pa-2 ma-5 text-xs-right">{{ this.ovajMesec.total }}</td>
            </tr>
            <tr>
              <td class="tableCell pa-2 ma-5">{{ this.mesecIme2 }}</td>
              <td class="tableCell pa-2 ma-5">{{ this.prosliMesec.brojFaktura }}</td>
              <td class="tableCell pa-2 ma-5 text-xs-right">{{ this.prosliMesec.total }}</td>
            </tr>
            <tr>
              <td  class="pa-2 ma-5 tableCell">{{ this.mesecIme3 }}</td>
              <td  class="pa-2 ma-5 tableCell">{{ this.pretprosliMesec.brojFaktura }}</td>
              <td  class="pa-2 ma-5 tableCell text-xs-right">{{ this.pretprosliMesec.total }}</td>
            </tr>
          </table>

          <vc-donut
            background="white" foreground="lightgrey"
            :size="200" unit="px" :thickness="60"
            hasLegend legendPlacement="bottom"
            :sections="sections" :total="100"
          >
            <h1>8 mil</h1>
          </vc-donut>


</v-flex>
  </v-layout>
</v-flex>
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
      sections: [
          { label: '', value: 0, color: '#20327c' },
          { label: '', value: 0, color: '#4b60b7' },
          { label: '', value: 0, color: '#8e9fe5' }
        ],
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
    stampaj(){

      axios.get("http://837s121.mars-e1.mars-hosting.com/getUrl", {
        params: {
          sid: localStorage.getItem('sessionid'),
          tipUplatnice:5
        }
      }).then(response => {
        console.log(response.data);
        window.open(response.data.url);
      });

    },
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

    this.sections[0].label = this.mesecIme1;
    this.sections[1].label = this.mesecIme2;
    this.sections[2].label = this.mesecIme3;

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

      this.sections[0].value = this.ovajMesec.total/8000000 * 100;
      this.sections[1].value = this.prosliMesec.total/8000000 * 100;
      this.sections[2].value = this.pretprosliMesec.total/8000000 * 100;
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

.tableCell{
  border-bottom:1px solid black;
}

.bar {
  background-color: #f5f5f5;
  overflow: hidden;
  height: 60px;
  border-radius: 13px;
  border: 3px solid silver;
}
</style>
