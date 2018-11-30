<template>
  <div>
<nav-bar/>
<v-layout row wrap class="mt-5 align-center">


<v-flex class="forma pa-4"  xs10 offset-xs1>
<h1>Ukupan promet u poslednjih 12 meseci</h1>
<div class="mt-5 mr-5 ml-5 bar" >
<div class="barHealth d-flex align-center":class='{barHealthRed:procenatFakturisanogMesecno>80}' :style="{width:procenatFakturisanogMesecno +'%'}">
<h3 v-if="procenatFakturisanogMesecno<50">{{cifraMesecno|thousandSeparator}} RSD</h3>
<h2 v-if="procenatFakturisanogMesecno>=50&&procenatFakturisanogMesecno<80">{{cifraMesecno|thousandSeparator}} RSD</h2>
<h1 v-if="procenatFakturisanogMesecno>=80">{{cifraMesecno|thousandSeparator}} RSD</h1>
</div>
</div>
<p class="mt-1"><em>Promet od 8 miliona dinara</em></p>
</v-flex>

<v-flex class="forma mt-5 pa-4"  xs10 offset-xs1>
<h1>Ukupan promet u kalendarskoj godini</h1>
<div class="mt-5 mr-5 ml-5 bar" >
<div class="barHealth d-flex align-center":class='{barHealthRed:procenatFakturisanogGodisnje>80}' :style="{width:procenatFakturisanogGodisnje +'%'}">
<h3 v-if="procenatFakturisanogGodisnje<50">{{cifraGodisnje|thousandSeparator  }} RSD</h3>
<h2 v-if="procenatFakturisanogGodisnje>=50&&procenatFakturisanogGodisnje<80">{{cifraGodisnje|thousandSeparator}} RSD</h2>
<h1 v-if="procenatFakturisanogGodisnje>=80">{{cifraGodisnje|thousandSeparator}} RSD</h1>
</div>
</div>
<p class="mt-1"><em>Promet od 6 miliona dinara</em></p>
</v-flex>
</v-layout>
</div>
</template>

<script>
import Navbar from '@/components/navBar'
export default {
  components:{
    'nav-bar':Navbar
  },
data(){
  return{
    procenatFakturisanogMesecno:0,
    cifraMesecno:0,
    procenatFakturisanogGodisnje:0,
    cifraGodisnje:0
  }
},
methods:{

},
  mounted(){
    this.logged=this.$store.state.logged;

    axios.get("http://837s121.mars-e1.mars-hosting.com/annualIncome", {
      params: {
          sid: localStorage.getItem('sessionid')
      }
    }).then(response => {
    this.cifraMesecno=response.data.  income ;
this.procenatFakturisanogMesecno=response.data.incomePercentage;
this.procenatFakturisanogGodisnje=response.data.curYearincomePercentage;
this.cifraGodisnje=response.data.curYearincome;
    });
  }
}
</script>

<style >
.barHealthRed{
  background-color:red !important;
  color:white;
}
.barHealth{
  transition:width 1s;
  height: 100%;

  background-color:rgb(127, 172, 244);

}



.bar{
  background-color:#f5f5f5;
 overflow:hidden;
  height:60px;
  border-radius: 13px;
  border: 3px solid silver;
}

</style>
