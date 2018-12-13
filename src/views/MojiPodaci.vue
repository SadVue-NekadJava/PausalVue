<template >
<div>
<nav-bar/>


  <v-layout row wrap>
    <v-flex class="tabColor elevation-24 mt-4  pa-5" md4 offset-md4 xl4 offset-xl4>

      <div>
        <h1 class="text-xs-center">Licni podaci</h1>



        <div class="text-xs-center">



          <v-btn v-if="izmenaPodataka" @click="dugmeIzmena" color="warning ">Izmeni</v-btn>
          <v-btn v-if="!izmenaPodataka" @click="odustani" color="secondary">Odustani</v-btn>

          <v-btn :disabled="!valid" @click="sacuvajIzmeneKorisika" v-if="!izmenaPodataka" color="primary">Sacuvaj</v-btn>

        </div>
      </div>
      <hr class="pb-1">




      <v-layout row wrap>
        <v-flex>
          <v-form refs="form" v-model="valid">
            <v-layout class="pt-4" row wrap>
              <v-flex xs4>
                <h3>Ime i prezime</h3>
              </v-flex>
              <v-flex class="pa-4" hidden-sm-and-up xs9>
              </v-flex>
              <v-flex xs7 v-if="izmenaPodataka">
                <h3 class="podaci">{{ime}} {{prezime}}</h3>
              </v-flex>
              <v-flex xs7 v-else>
                <v-layout row wrap>


                <v-flex xs2>
                <v-text-field class="podaciIzmena pr-2 pa-0" v-model="ime" :rules="obaveznoPoljeRules"></v-text-field>
</v-flex>

<v-flex xs2>
                <v-text-field class="podaciIzmena pa-0" v-model="prezime" :rules="obaveznoPoljeRules"></v-text-field>
              </v-flex>
</v-layout>
              </v-flex>
            </v-layout>
            <v-layout class="pt-4" row wrap>
              <v-flex xs4>
                <h3>Ime roditelja</h3>
              </v-flex>
              <v-flex class="pa-4" hidden-sm-and-up xs9>
              </v-flex>
              <v-flex xs2>
                <h3 v-if="izmenaPodataka" class="podaci">{{imeRoditelja}}</h3>
                <v-text-field v-else class="podaciIzmena pa-0" v-model="imeRoditelja" :rules="obaveznoPoljeRules"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout class="pt-4" row wrap>
              <v-flex xs4>
                <h3>Jmbg</h3>
              </v-flex>
              <v-flex class="pa-4" hidden-sm-and-up xs9>
              </v-flex>
              <v-flex xs2>
                <h3 v-if="izmenaPodataka" class="podaci">{{jmbg}}</h3>
                <v-text-field v-else class="podaciIzmena pa-0" v-model="jmbg" mask="#############" :rules="obaveznoPoljeRules"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout class="pt-4" row wrap>
              <v-flex xs4>
                <h3>Strucna sprema: </h3>
              </v-flex>
              <v-flex class="pa-4" hidden-sm-and-up xs9>
              </v-flex>
              <v-flex xs1>
                <h3 v-if="izmenaPodataka" class="podaci">{{strucnaSprema}}</h3>
                <v-text-field v-else class="podaciIzmena pa-0" v-model="strucnaSprema" :rules="obaveznoPoljeRules"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout class="pt-4" row wrap>
              <v-flex xs4>
                <h3>U radnom odnosu: </h3>
              </v-flex>
              <v-flex class="pa-4" hidden-sm-and-up xs9>
              </v-flex>
              <v-flex xs1>
                <h3 v-if="izmenaPodataka" class="podaci">{{uRadnomOdnosuNiz[uRadnomOdnosu].uRadnomOdnosuTekst}}</h3>
                <v-select v-if="!izmenaPodataka" :items="uRadnomOdnosuNiz" v-model="uRadnomOdnosu" item-text="uRadnomOdnosuTekst" item-value="uRadnomOdnosuVrednost" :rules="polIRadniOdnosRules"></v-select>
              </v-flex>
            </v-layout>
            <v-layout class="pt-4" row wrap>
              <v-flex xs4>
                <h3>Pol: </h3>
              </v-flex>
              <v-flex class="pa-4" hidden-sm-and-up xs9>
              </v-flex>
              <v-flex xs1>
                <h3 v-if="izmenaPodataka" class="podaci">{{polNiz[pol].polNizTekst}}</h3>
                <v-select v-if="!izmenaPodataka" :items="polNiz" v-model="pol" item-text="polNizTekst" item-value="polNizVrednost" :rules="polIRadniOdnosRules"></v-select>
              </v-flex>
            </v-layout>
            <h3 class="pt-5   pb-1 blue-grey--text"><em>Kontakt podaci</em></h3>
            <hr class="pb-1">
            <v-layout class="pt-3" row wrap>
              <v-flex xs4>
                <h3>Adresa:</h3>

              </v-flex>
              <v-flex class="pa-4" hidden-sm-and-up xs9>
              </v-flex>
              <v-flex xs4>
                <h3 v-if="izmenaPodataka" class="podaci">{{adresa}}</h3>
                <v-text-field v-else class="podaciIzmena pa-0" :rules="obaveznoPoljeRules" v-model="adresa"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout class="pt-3" row wrap>
              <v-flex xs4>
                <h3>Mesto:</h3>

              </v-flex>
              <v-flex class="pa-4" hidden-sm-and-up xs9>
              </v-flex>
              <v-flex xs7>
                <h3 v-if="izmenaPodataka" class="podaci">{{opstina}}, {{grad}}</h3>
                <v-layout row wrap>
                  <v-flex xs3>
                    <v-select v-if="!izmenaPodataka" :items="opstine" v-model="opstinaId" item-text="ops_naziv" item-value="ops_id" :rules="obaveznoPoljeRules"></v-select>

                  </v-flex>
                <v-flex xs1>

                </v-flex>
                <v-flex xs3>
                  <v-select v-if="!izmenaPodataka" :items="gradovi" v-model="gradId" item-text="gra_naziv" item-value="gra_id" :rules="obaveznoPoljeRules" @change="spisakOpstina($event)"></v-select>

                </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-form>
          <div v-if="!izmenaPodataka">
            <label @click="izmenaSifre=!izmenaSifre" class="labelSlike" for="izborSlike">Kliknite ovde da izmenite lozinku</label>
            <v-flex v-if="izmenaSifre  ">
              <hr class="pb-1">

              <v-form refs="form" v-model="validPassword">




                <v-layout class="pt-3" row wrap>
                  <v-flex xs7>
                    <h3>Stara Lozinka: </h3>
                  </v-flex>
                  <v-flex class="pa-4" hidden-sm-and-up xs5>
                  </v-flex>
                  <v-flex xs5>
                    <v-text-field class="podaciIzmena pa-0" type="password" :rules="passwordRules" v-model="staraLozinka"></v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout class="pt-3" row wrap pl-2>
                  <v-flex xs2>
                    <h3>Nova lozinka: </h3>
                  </v-flex>
                  <v-flex class="pa-4" hidden-sm-and-up xs12>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field type="password" class="podaciIzmena pa-0" :rules="passwordRules" v-model="novaLozinka"></v-text-field>

                  </v-flex>
                  <v-flex xs1>

                  </v-flex>
                  <v-flex xs5>
                    <v-text-field type="password" class="podaciIzmena pa-0" :rules="passwordRules" v-model="novaLozinkaPotvrdjena"></v-text-field>

                  </v-flex>
                </v-layout>
              </v-form>
              <div class="text-xs-center pt-3">

                <p class="error--text">{{poruka}}</p>
                <v-btn @click="izmenaLozinke" :disabled="!validPassword" color="primary">Izmeni lozinku</v-btn>
              </div>
            </v-flex>
          </div>

        </v-flex>

      </v-layout>



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
  data() {
    return {
      // NOVE PROMENLJIVE
      validPassword: true,
      poruka: null,
      izmenaSifre: false,
      // KORISNICKI PODACI
      staraLozinka: '',
      novaLozinka: '',
      novaLozinkaPotvrdjena: '',
      ime: '',
      prezime: '',
      imeRoditelja: '',
      jmbg: '',
      strucnaSprema: '',
      uRadnomOdnosu: 0,
      uRadnomOdnosuNiz: [{
          uRadnomOdnosuVrednost: 0,
          uRadnomOdnosuTekst: 'Ne'
        },
        {
          uRadnomOdnosuVrednost: 1,
          uRadnomOdnosuTekst: 'Da'
        }
      ],
      pol: 0,
      polNiz: [{
          polNizVrednost: 0,
          polNizTekst: 'zenski'
        },
        {
          polNizVrednost: 1,
          polNizTekst: 'muski'
        }
      ],
      adresa: '',
      opstina: '',
      opstinaId: '',
      grad: '',
      graId: '',
      // BOOLEAN KOJI SALTA INPUT-> P
      izmenaPodataka: true,
      // NIZOVI ZA SELEKT
      gradovi: '',
      opstine: '',
      // KONTROLOR ZA FORMU - POPUNJENA POLJA
      valid: true,
      // STARE PROMENLJIVE
      image: '',
      logo: '',
      opstinaNaziv: '',
      gradNaziv: '',
      opstine: [],
      gradovi: [],
      imeFirme: '',
      punNaziv: '',
      maticniBroj: '',
      pib: '',
      sifraDelatnosti: '',
      opisDelatnosti: '',
      ziroRacun: '',
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
      ],
      polIRadniOdnosRules: [
        v => (v == 0 || v == 1) || 'Izaberite jednu od opcija'
      ],
      passwordRules: [
        v => !!v || 'Morate uneti lozinku',
        v => (v && v.length >= 6) || 'Lozinka mora biti minimum 6 karaktera'
      ]
    }
  },

  mounted() {

    this.preuzmiKorisnickePodatke();

  },
  methods: {
    izmenaLozinke() {

      if (this.novaLozinka == this.novaLozinkaPotvrdjena) {
        axios.patch('http://837s121.mars-e1.mars-hosting.com/patchPassword', {
          sid: localStorage.getItem('sessionid'),
          staraSifra: this.staraLozinka,
          novaSifra: this.novaLozinka,
          novaSifraProvera: this.novaLozinkaPotvrdjena

        }).then(response => {
          this.poruka = response.data.msg;
        });
      } else {
        this.poruka = 'nova lozinka se ne poklapa';

      }
      setTimeout(() => this.poruka = null, 5000)
    },
    preuzmiKorisnickePodatke() {
      axios.get("http://837s121.mars-e1.mars-hosting.com/getUser", {
        params: {
          sid: localStorage.getItem('sessionid')
        }
      }).then(response => {
        var podaci = response.data.res[0];
        this.ime = podaci.kpd_ime;
        this.prezime = podaci.kpd_prezime;
        this.imeRoditelja = podaci.kpd_imeRoditelja;
        this.jmbg = podaci.kpd_jmbg;
        this.strucnaSprema = podaci.kpd_strucnaSprema;
        this.uRadnomOdnosu = Number(podaci.kpd_uRadnomOdnosu);
        this.pol = Number(podaci.kpd_pol);
        this.adresa = podaci.kpd_adresa;
        this.opstina = podaci.opstina;
        this.opstinaId = podaci.ops_id;
        this.grad = podaci.grad;
        this.gradId = podaci.gradId;
      });
    },

    sacuvajIzmeneKorisika() {

      axios.patch('http://837s121.mars-e1.mars-hosting.com/updateUser', {
        sid: localStorage.getItem('sessionid'),
        ime: this.ime,
        prezime: this.prezime,
        imeRoditelja: this.imeRoditelja,
        jmbg: this.jmbg,
        strucnaSprema: this.strucnaSprema,
        uRadnomOdnosu: this.uRadnomOdnosu,
        pol: this.pol,
        adresa: this.adresa,
        opstina: this.opstinaId

      }).then(response => {
        if (!response.data.status) {
          alert('Doslo je do greske prilikom pravljenja izmena.')
        }
        this.preuzmiKorisnickePodatke();
      });

      this.izmenaPodataka = true;
      // this.izmenaPodataka=true;

    },

    odustani() {
      this.izmenaSifre = false;
      this.novaLozinka = '';
      this.novaLozinkaPotvrdjena = '';
      this.staraLozinka = '';
      this.preuzmiKorisnickePodatke();
      this.izmenaPodataka = !this.izmenaPodataka;
    },
    spisakOpstina(gradId) {
      axios.get("http://837s121.mars-e1.mars-hosting.com/getMunicipality", {
        params: {
          gradId
        }
      }).then(response => {
        this.opstine = response.data.opstine;
        this.opstinaId = response.data.opstine[0].ops_id;
      });
    },
    dugmeIzmena() {
      this.izmenaPodataka = !this.izmenaPodataka;
      axios.get("http://837s121.mars-e1.mars-hosting.com/getCity")
        .then(response => {
          this.gradovi = response.data.gradovi;
        });

      setTimeout(() => {
        axios.get("http://837s121.mars-e1.mars-hosting.com/getMunicipality", {
          params: {
            gradId: this.gradId
          }
        }).then(response => {
          this.opstine = response.data.opstine;
        });

      }, 100)
    }

  }
}
</script>

<style scoped >
h3{
  color: #68645a;
  font-weight: 400;
}
.labelSlike {
  color: blue;
  cursor: pointer;
  display: block;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 20px;
}

.labelSlike:hover {
  text-decoration: underline;
}

#izborSlike {
  display: none;
}

.relativni {
  position: relative;
}

.slika {

  width: 200px;
  height: 200px;
  margin-top: 200px;
  left: 35%;
  opacity: 0.5;

  position: absolute;
}

.levoDugme {
  margin-right: 100px;
}

.v-messages {
  min-height: 0;
}

.podaciIzmena {

  margin-top: -14px;
}

.relativno {
  position: relative;
}

.podaci{
  color:black;
  font-weight:600;
}

input {
  padding-bottom: 1px;
  padding-top: 9px;
}
</style>
