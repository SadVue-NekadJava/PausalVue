<template >
<div>
<nav-bar/>

<div class=" mainPorez">


  <v-layout class="mt-5 tabColor elevation-24  pa-5" row wrap>


    <v-flex  class="mt-2  "  md3>


      <v-flex md11>
        <div @click="svrhaIsplateIzabrana=svrhaIsplate[0]" class="forma tabovi  pa-3 ma-2" :class="{active:svrhaIsplateIzabrana.svrha==1}">


          <h3>Porez na prihode</h3>
        </div>
      </v-flex>
      <v-flex md11>
        <div @click="svrhaIsplateIzabrana=svrhaIsplate[1]" class="forma tabovi pa-3 ma-2" :class="{active:svrhaIsplateIzabrana.svrha==2}">
          <h3>Doprinos za zdravstveno osiguranje</h3>
        </div>
      </v-flex>
      <v-flex md11>
        <div @click="svrhaIsplateIzabrana=svrhaIsplate[2]" class="forma tabovi pa-3 ma-2" :class="{active:svrhaIsplateIzabrana.svrha==3}">


          <h3>Doprinos za osiguranje za slucaj nezaposlenosti</h3>
        </div>
      </v-flex>
      <v-flex md11>
        <div @click="svrhaIsplateIzabrana=svrhaIsplate[3]" class="forma tabovi pa-3 ma-2" :class="{active:svrhaIsplateIzabrana.svrha==4}">


          <h3>Doprinos za pio</h3>
        </div>
      </v-flex>
    </v-flex>

    <v-flex class="forma pa-3" md9>
      <div class="uplatnica">
        <v-layout row wrap>


          <v-flex class="mt-4 pr-2 pb-2" xs12 lg6>
            <p class="textLabel mt-2 ml-3">Isplatilac</p>

            <div class=" ml-2 uplatnica">
              <p class="poljeUnosa">{{punNaziv}}, {{adresa}}, {{opstinaNaziv}}, {{gradNaziv}}</p>
            </div>
            <p class="textLabel mt-2 ml-3">Svrha placanja</p>
            <div class="ml-2 uplatnica">
              <p class="poljeUnosa">{{svrhaIsplateIzabrana.poruka}}</p>
            </div>
            <p class="textLabel mt-2 ml-3">Primalac</p>
            <div class="ml-2 uplatnica">
              <p class="poljeUnosa">Ministarstvo Finansija <br>Poreska Uprava </p>
            </div>
            <div>
              <div class="d-flex mt-5">
                <v-flex xs12 lg9 class="text-xs-center">
                  <hr>
                  <p>pecat i potpis platioca</p>
                </v-flex>
              </div>
              <div class="d-flex justify-end">
                <v-flex xs12 lg9 class="text-xs-center">
                  <hr>
                  <p>mesto i datum prijema</p>
                </v-flex>
              </div>
            </div>
          </v-flex>

          <v-flex xs12 lg6 class="pa-2">
            <v-layout row wrap class="mt-1">
              <v-flex class="malaPolja pr-2" xs2>
                <p class="textLabel">Sifra placanja</p>
                <div class="  manjaUplatnica">
                  <p class="poljeUnosa ">253</p>
                </div>
              </v-flex>
              <v-flex class="malaPolja pr-2" xs2>
                <p class="textLabel ">Valuta</p>
                  <div class=" manjaUplatnica">
                  <p class="ma-auto align-center">RSD</p>
                </div>
              </v-flex>
              <v-flex class="malaPolja" xs8>
                <p class="textLabel ">Iznos</p>
                <div class="blue-grey lighten-4 manjaUplatnica">
                  <p class=" poljeUnosa">=
                    <input class="unosiUplatnica" v-model="svrhaIsplateIzabrana.iznos" type="text" placeholder="Iznos" >
                  </p>
                </div>
              </v-flex>
            </v-layout>
            <p class="textLabel">Racun platioca</p>
            <div class="mt-1 manjaUplatnica">
              <p class="poljeUnosa">{{ziroRacun|accNumber}}</p>
            </div>
            <p class="textLabel">Model i poziv na broj (zaduzenje)</p>
            <v-layout row wrap>
              <v-flex xs2>
                <div class=" manjaUplatnica">

                </div>
              </v-flex>
              <v-flex xs9 offset-xs1>
                <div class=" manjaUplatnica">
                </div>
              </v-flex>
            </v-layout>
            <p class="textLabel">Racun primaoca</p>
            <div class="mt-1 manjaUplatnica">
              <p class="poljeUnosa">{{svrhaIsplateIzabrana.racun}}</p>
            </div>
            <p class="textLabel">Model i poziv na broj (odobrenje)</p>
            <v-layout row wrap>
              <v-flex xs2>
                <div class="blue-grey lighten-4 manjaUplatnica">
                          <p class="poljeUnosa"> <input class="unosiUplatnica" v-model="svrhaIsplateIzabrana.modelPlacanja" type="text" placeholder="model"></p>
                </div>
              </v-flex>
              <v-flex xs9 offset-xs1>
                <div class="blue-grey lighten-4 manjaUplatnica">
                  <p class="poljeUnosa"> <input class="unosiUplatnica" v-model="svrhaIsplateIzabrana.pozivNaBroj"  type="text" placeholder="poziv na broj"></p>

                </div>
              </v-flex>
            </v-layout>
            <div class="d-flex mt-5">
              <v-flex xs12 lg9 class="text-xs-center">
                <hr>
                <p>datum izvrsenja</p>
              </v-flex>

              <v-btn @click="stampaj(svrhaIsplateIzabrana.svrha-1)" small flat  class="mt-4" color="success">Stampaj </v-btn>
            <v-btn small flat @click="sacuvajIzmeneNaloga"  class="mt-4" color="primary">Sacuvaj </v-btn>
            </div>



          </v-flex>
        </v-layout>
      </div>
    </v-flex>

  </v-layout>
  <div class="text-xs-center ">


    <v-btn @click="stampaj(4)" large  class="mt-4" color="success">Stampaj sve</v-btn>
</div>
  </div>
</div>
</template>

<script>
import Navbar from '@/components/navBar'
export default {
  components:{
    'nav-bar':Navbar
  },

  data() {
    return {
      svrhaIsplateIzabrana: {},
      svrhaIsplate: [
         {
          poruka: 'Uplata poreza na dohodak',
          racun: '840-711122843-32',
          iznos:'',
          modelPlacanja:'',
          pozivNaBroj:'',
          svrha:1
        },
       {
          poruka: 'Uplata doprinosa za zdravstveno osiguranje',
          racun: '840-721325843-61',
          iznos:'',
          modelPlacanja:'',
            pozivNaBroj:'',
            svrha:2
        },
       {
          poruka: 'Uplata doprinosa za osiguranje od nezaposlenosti',
          racun: '840-721331843-06',
          iznos:'',
          modelPlacanja:'',
            pozivNaBroj:'',
            svrha:3
        },
         {
          poruka: 'Uplata doprinosa za PIO',
          racun: '840-721313843-74',
          iznos:'',
          modelPlacanja:'',
            pozivNaBroj:'',
            svrha:4
        }]


      ,
      punNaziv: '',
      ziroRacun: '',
      adresa: '',
      opstinaNaziv: '',
      gradNaziv: ''
    }
  },
  methods:{
stampaj(tipUplatnice){

  axios.get("http://837s121.mars-e1.mars-hosting.com/getUrl", {
    params: {
      sid: localStorage.getItem('sessionid'),
      tipUplatnice
    }
  }).then(response => {
    console.log(response.data);
    window.open(response.data.url);
  });

},
sacuvajIzmeneNaloga(){

    axios.post("http://837s121.mars-e1.mars-hosting.com/postTaxDetails", {
        sid: localStorage.getItem('sessionid'),
        cifra:this.svrhaIsplateIzabrana.iznos,
        poziv:this.svrhaIsplateIzabrana.pozivNaBroj,
        svrha: this.svrhaIsplateIzabrana.svrha,
        model:this.svrhaIsplateIzabrana.modelPlacanja

    }).then(response => {






    });
}
  },
  mounted() {
    this.svrhaIsplateIzabrana = this.svrhaIsplate[0];
    axios.get("http://837s121.mars-e1.mars-hosting.com/getTaxDetails", {
      params: {
        sid: localStorage.getItem('sessionid')
      }
    }).then(response => {

      for(var i=0;i<response.data.res.length; i++){
          this.svrhaIsplate[i].iznos=response.data.res[i].por_cifra;
              this.svrhaIsplate[i].modelPlacanja=response.data.res[i].por_model;
                  this.svrhaIsplate[i].pozivNaBroj=response.data.res[i].por_poziv;

      }




    });

    axios.get("http://837s121.mars-e1.mars-hosting.com/getCompany", {
      params: {
        sid: localStorage.getItem('sessionid')
      }
    }).then(response => {

      this.punNaziv = response.data.res[0].fir_pun_naziv;
      this.ziroRacun = response.data.res[0].fir_ziro_racun;
      this.adresa = response.data.res[0].fir_adresa;
      this.opstinaNaziv = response.data.res[0].ops_naziv;
      this.gradNaziv = response.data.res[0].gra_naziv;
    });

  }

}
</script>

<style scoped>
.mainPorez{
position:absolute;
width: 60%;
top:50%;
left:50%;
transform: translate(-50%, -50%);
}

.active{
  background-color:black;
  transform: scale(1.05);
  color:white;
}
.unosiUplatnica{
  display: inline-block;
width: 90%;
}
.unosiUplatnica::placeholder{
  color:red;
}
.unosiUplatnica:focus::placeholder{
  visibility: hidden;
}
.unosiUplatnica:focus{
  outline:none;
}
.poljeUnosa {
  width:100%;
  margin-top: auto;
  margin-bottom: auto;
  padding-left: 8px;

}

.malaPolja {
  flex-direction: column;
  min-height: 45px;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
}

.manjaUplatnica {
  min-height: 30px;
  border: 1px solid black;
  display: flex;
}

.textLabel {
  margin-bottom: 0px;
}

.uplatnica {
  border: 1px solid black;
  min-height: 60px;
  display: flex;
}

.tabovi {
  cursor: pointer;
  border:1px solid black;
  min-height: 101px;

}

.tabovi:hover {
  transform: scale(1.05);
}

.potpis {
  width: 60%;
}
</style>
