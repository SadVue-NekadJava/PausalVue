<template >
<div  >
<nav-bar/>


  <v-layout  row wrap>
    <v-flex   class="tabColor mb-5 elevation-24   pa-5 mt-4"  md8 offset-md2 xl6 offset-xl3>
      <div class="relativni">


<img :src="logo" class="slika" alt="">
  </div>
<div   >
<h1 class="text-xs-center">{{imeFirme}}</h1>



<div class="text-xs-center">



<v-btn v-if="izmenaPodataka"  @click="dugmeIzmena "    color="warning ">Izmeni</v-btn>
<v-btn v-if="!izmenaPodataka" @click="odustani"    color="secondary">Odustani</v-btn>

<v-btn :disabled="!valid" @click="sacuvajIzmeneFirme" v-if="!izmenaPodataka" color="primary">Sacuvaj</v-btn>

</div>
</div >
<hr class="pb-1">
<v-form class="relativni " refs="form" v-model="valid">



<v-layout row wrap>
  <v-flex>
    <v-layout class="pt-4" row wrap>
<v-flex  xs3>
<h3  >Pun naziv:</h3>
</v-flex>
<v-flex class="pa-3" hidden-sm-and-up xs10>
</v-flex>
<v-flex xs9>
  <h3 v-if="izmenaPodataka" class="podaci">{{punNaziv}}</h3>
<v-text-field v-else
  class="podaciIzmena pa-0"


v-model="punNaziv"
  :rules="obaveznoPoljeRules"

></v-text-field>
</v-flex>
    </v-layout>
    <v-layout class="pt-4" row wrap>
      <v-flex  xs3>
        <h3 >Maticni broj:</h3>
</v-flex>
<v-flex class="pa-3" hidden-sm-and-up xs10>
</v-flex>
<v-flex xs9>
  <h3 v-if="izmenaPodataka" class="podaci">{{maticniBroj}}</h3>
  <v-text-field v-else
    class="podaciIzmena pa-0"
:rules="maticniBrojRules"
  v-model="maticniBroj"
    mask="########"

  ></v-text-field>
</v-flex>
    </v-layout>
    <v-layout class="pt-4" row wrap>
<v-flex  xs3>
<h3 >Pib:</h3>
</v-flex>
<v-flex class="pa-3" hidden-sm-and-up xs10>
</v-flex>
<v-flex xs9>
  <h3 v-if="izmenaPodataka" class="podaci">{{pib}}</h3>
  <v-text-field v-else
    class="podaciIzmena pa-0"
  v-model="pib"
    :rules="pibRules"
    mask="#########"
  ></v-text-field>
</v-flex>
    </v-layout>
    <v-layout class="pt-4" row wrap>
<v-flex  xs3>
<h3 >Ziro racun:</h3>
</v-flex>
<v-flex class="pa-3" hidden-sm-and-up xs10>
</v-flex>
<v-flex xs9>
  <h3 v-if="izmenaPodataka" class="podaci">{{ziroRacun|accNumber}}</h3>
  <v-text-field v-else
    class="podaciIzmena pa-0"
  v-model="ziroRacun"
        mask="###-#############-##"
  :rules="obaveznoPoljeRules"
  ></v-text-field>
</v-flex>
    </v-layout>
    <v-layout class="pt-4" row wrap>
<v-flex  xs3>
<h3 >Sifra delatnosti:</h3>
</v-flex>
<v-flex class="pa-3" hidden-sm-and-up xs10>
</v-flex>
<v-flex xs9>
  <h3 v-if="izmenaPodataka" class="podaci">{{sifraDelatnosti}}</h3>
  <v-text-field v-else
    class="podaciIzmena pa-0"
      :rules="obaveznoPoljeRules"
  v-model="sifraDelatnosti"
  ></v-text-field>
</v-flex>
    </v-layout>
    <v-layout class="pt-4" row wrap>
  <v-flex  xs3>
  <h3 >Opis delatnosti:</h3>
  </v-flex>
  <v-flex class="pa-3" hidden-sm-and-up xs10>
  </v-flex>
  <v-flex xs9>
  <h3 v-if="izmenaPodataka" class="podaci">{{opisDelatnosti}}</h3>
  <v-text-field v-else
  :rules="obaveznoPoljeRules"
    class="podaciIzmena pa-0"
  v-model="opisDelatnosti"
  ></v-text-field>
  </v-flex>
    </v-layout>
<h3 class="pt-5 pb-1 blue-grey--text"><em>Kontakt podaci</em></h3>
<hr class="pb-1">
<v-layout class="pt-3" row wrap>
  <v-flex xs3>
    <h3 >Adresa:</h3>

  </v-flex>
  <v-flex class="pa-3" hidden-sm-and-up xs10>
  </v-flex>
  <v-flex xs9>
<h3 v-if="izmenaPodataka" class="podaci">{{adresa}}</h3>
<v-text-field v-else
  class="podaciIzmena pa-0"
    :rules="obaveznoPoljeRules"
v-model="adresa"
></v-text-field>
  </v-flex>
</v-layout>

<v-layout class="pt-3" row wrap>
  <v-flex xs3>
    <h3 >Mesto:</h3>

  </v-flex>
  <v-flex class="pa-3" hidden-sm-and-up xs10>
  </v-flex>
  <v-flex xs9>
<h3 v-if="izmenaPodataka" class="podaci"> {{gradNaziv}}, {{opstinaNaziv}}</h3>
<v-layout v-if="!izmenaPodataka" row wrap>
  <v-flex xs5>

<v-select
  class="d-inline"
  :items="gradovi"
  v-model="grad"
    item-text="gra_naziv"
    item-value="gra_id"
:rules="obaveznoPoljeRules"
    @change="spisakOpstina($event)"

></v-select>
  </v-flex>
  <v-flex xs2>

  </v-flex>
  <v-flex xs5>



<v-select
  class="d-inline"

  :items="opstine"
  v-model="opstina"
    item-text="ops_naziv"
      item-value="ops_id"
:rules="obaveznoPoljeRules"

></v-select>
  </v-flex>

</v-layout>
</v-flex>
</v-layout>
<v-layout class="pt-3" row wrap>
  <v-flex xs3>
    <h3 >Telefon:</h3>

  </v-flex>
  <v-flex class="pa-3" hidden-sm-and-up xs10>
  </v-flex>
  <v-flex xs9>
<h3 v-if="izmenaPodataka" class="podaci">{{telefon|phoneNumber}}</h3>
<v-text-field v-else
  class="podaciIzmena pa-0"
v-model="telefon"
  :rules="obaveznoPoljeRules"
mask="+(###)##-###-######"
></v-text-field>
  </v-flex>
</v-layout>
<v-layout class="pt-3"  row wrap>
  <v-flex  xs3>
    <h3 >Email:</h3>

  </v-flex>
  <v-flex class="pa-4 " hidden-sm-and-up xs10>
  </v-flex>
  <v-flex xs9>
<h3 v-if="izmenaPodataka" class="podaci">{{email}}</h3>
<v-text-field v-else
  class="podaciIzmena pa-0"
v-model="email"
  :rules="obaveznoPoljeRules"

></v-text-field>
  </v-flex>
</v-layout>
<div  v-if="!izmenaPodataka" class="">

<label class="labelSlike" for="izborSlike">Kliknite ovde da izmenite logo<input  id="izborSlike" type="file" @change="onFilePicked"></label>

</div>
  </v-flex>
</v-layout>
</v-form>
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

      image:'',
      valid:true,
      logo:'',
      opstinaNaziv:'',
      gradNaziv:'',
      opstine:[],
      gradovi:[],
      izmenaPodataka:true,
      imeFirme:'',
      punNaziv:'',
      maticniBroj:'',
      pib:'',
      sifraDelatnosti:'',
      opisDelatnosti:'',
      ziroRacun:'',
      adresa:'',
      opstina:'',
      grad:'',
      telefon:'',
      email:'',
      obaveznoPoljeRules: [
        v => !!v || 'Obavezno polje.'
      ],
  maticniBrojRules: [
        v => !!v || 'Morate uneti Maticni Broj',
        v => (v && v.length == 8) || 'Maticni Broj mora sadrzati 8 cifara'
      ],
  pibRules: [
        v => !!v || 'Morate uneti Pib',
        v => (v && v.length == 9) || 'Pib mora sadrzati 9 cifara'
      ]
    }
  },

  mounted(){
    axios.get("http://837s121.mars-e1.mars-hosting.com/getCompany",{
                  params:{ sid: localStorage.getItem('sessionid')  }
                 }).then(response => {
this.imeFirme=response.data.res[0].fir_naziv;
this.punNaziv=response.data.res[0].fir_pun_naziv;
this.maticniBroj=response.data.res[0].fir_maticni_broj;
this.pib=response.data.res[0].fir_pib;
this.sifraDelatnosti=response.data.res[0].fir_sifra_delatnosti;
this.opisDelatnosti=response.data.res[0].fir_opis_delatnosti;
this.ziroRacun=response.data.res[0].fir_ziro_racun;
this.adresa=response.data.res[0].fir_adresa;
this.opstina=response.data.res[0].ops_id;
this.grad=response.data.res[0].gra_id;
this.telefon=response.data.res[0].fir_telefon;
this.email=response.data.res[0].fir_mejl;
this.opstinaNaziv=response.data.res[0].ops_naziv;
this.gradNaziv=response.data.res[0].gra_naziv;
this.logo=response.data.res[0].imgurl;
                 });

  },
  methods:{
onFilePicked(e){
    this.image=e.target.files[0];

},







sacuvajIzmeneFirme(){
  var fd=new FormData();
  fd.append('logo',this.image);
  fd.append('sid', localStorage.getItem('sessionid'));
  fd.append('naziv', this.imeFirme);
fd.append('punNaziv', this.punNaziv);
fd.append('maticniBroj',this.maticniBroj);
fd.append('pib', this.pib);
fd.append('ziroRacun', this.ziroRacun);
fd.append('sifraDelatnosti', this.sifraDelatnosti);
fd.append('opisDelatnosti', this.opisDelatnosti);
fd.append('adresa', this.adresa);
fd.append('telefon', this.telefon);
fd.append('mejl', this.email);
fd.append('opstina', this.opstina);
  axios.patch('http://837s121.mars-e1.mars-hosting.com/updateCompany',fd).then(
    function (response) {
    if(!response.data.status){
      alert('Doslo je do greske prilikom pravljenja izmena.')
    }
  })
  .catch(function (error) {
  });
  this.izmenaPodataka=true;
},

    odustani(){
      axios.get("http://837s121.mars-e1.mars-hosting.com/getCompany",{
                    params:{ sid: localStorage.getItem('sessionid')  }
                   }).then(response => {
    this.imeFirme=response.data.res[0].fir_naziv;
    this.punNaziv=response.data.res[0].fir_pun_naziv;
    this.maticniBroj=response.data.res[0].fir_maticni_broj;
    this.pib=response.data.res[0].fir_pib;
    this.sifraDelatnosti=response.data.res[0].fir_sifra_delatnosti;
    this.opisDelatnosti=response.data.res[0].fir_opis_delatnosti;
    this.ziroRacun=response.data.res[0].fir_ziro_racun;
    this.adresa=response.data.res[0].fir_adresa;
    this.opstina=response.data.res[0].ops_id;
    this.grad=response.data.res[0].gra_id;
    this.telefon=response.data.res[0].fir_telefon;
    this.email=response.data.res[0].fir_mejl;
    this.opstinaNaziv=response.data.res[0].ops_naziv;
    this.gradNaziv=response.data.res[0].gra_naziv;

                   });
                   this.izmenaPodataka=true;
    },
    spisakOpstina(gradId) {
      axios.get("http://837s121.mars-e1.mars-hosting.com/getMunicipality", {
        params: {
          gradId
        }
      }).then(response => {
        this.opstine = response.data.opstine;
        this.opstina=response.data.opstine[0].ops_id;
      });
    },
    dugmeIzmena(){
      this.izmenaPodataka=!this.izmenaPodataka;
      axios.get("http://837s121.mars-e1.mars-hosting.com/getCity")
        .then(response => {
          this.gradovi = response.data.gradovi;



        });

        setTimeout(()=>{
          axios.get("http://837s121.mars-e1.mars-hosting.com/getMunicipality", {
            params: {
              gradId:this.grad
            }
          }).then(response => {
            this.opstine = response.data.opstine;
          });

        },100)
    }

  }
}

</script>

<style scoped >
h3{
  color: #68645a;
  font-weight: 400;
}
.labelSlike{
  color:blue;
  cursor:pointer;
  display: block;
  text-align: center;
  margin-top:10px;
  margin-bottom: 5px;
  font-size: 20px;
}
.labelSlike:hover{
text-decoration:underline;
}
#izborSlike{
display:none;
}

.relativni{
  position:relative;
}
.unutrasnjaForma{
  background-color: rgba(255,255,255,0.5);
  border-radius: 5px;
  padding: 10px;
  margin-top: 15px;
}
.slika{
  width: 200px;
  height: 200px;
  margin-top: 200px;
  right:0%;
  opacity: 0.5;
  position: absolute;
}
.levoDugme{
  margin-right: 100px;
}
.v-messages{
  min-height: 0;
}
.podaciIzmena{
  margin-top: -14px;
}
.relativno{
  position: relative;
}
.podaci{
  color:black;
  font-weight:600;
}
input{
  padding-bottom:1px;
  padding-top:9px;
}
</style>
