<template>
<div>
  <nav-bar/>
  <v-flex xs6 offset-xs2>


    <div v-if="idKomitentaZaBrisanje!=0" class="text-xs-center  modal pa-5">
      <h1>Da li ste sigurni da zelite da obrisete komitenta "{{komitentZaBrisanje}}"?</h1>
      <v-btn @click="brisanjeKomitentaPotvrdjeno" color="success">Da</v-btn>
      <v-btn @click="idKomitentaZaBrisanje=0" color="secondary">Ne</v-btn>
    </div>
    <div v-if="statusIzbrisanog" class="text-xs-center  modal pa-5">
      <h1>
        Uspesno ste izbrisali komitenta "{{komitentZaBrisanje}}"
      </h1>
      <v-btn @click="uspesnoBrisanje" color="primary">Ok</v-btn>
    </div>
  </v-flex>
  <transition name="animacijaForme">
    <v-flex xs12 sm6 offset-sm3 class="forma text-xs-center" v-if="kreirajNovog">
      <v-layout row wrap>



        <v-flex xs10>

        </v-flex>

        <v-flex xs2>
          <v-icon @click="kreirajNovog=false" class="iks pt-3">clear</v-icon>
        </v-flex>
      </v-layout>
      <v-form v-if="kreirajNovog" ref="form" v-model="valid" class=" pt-2 pb-5 pr-5 pl-5">
        <v-text-field v-model="komImeFirme" :rules="obaveznoPoljeRules" label="Ime Firme"></v-text-field>
        <v-text-field v-model="komPunNaziv" :rules="obaveznoPoljeRules" label="Pun naziv sa resenja"></v-text-field>
        <v-text-field v-model="komPib" mask="#########" :counter="9" :rules="pibRules" label="Pib"></v-text-field>
        <v-text-field v-model="komRacun" :rules="obaveznoPoljeRules" mask="###-#############-##" label="Broj Ziro racuna"></v-text-field>
        <v-select :items="gradovi" :rules="obaveznoPoljeRules" name="grad" item-text="gra_naziv" item-value="gra_id" v-model="komGrad" @change="spisakOpstina($event)" label="Izaberite grad"></v-select>
        <v-select :items="komOpstine" :rules="obaveznoPoljeRules" name="opstina" item-text="ops_naziv" item-value="ops_id" v-model="komOpstina" label="Izaberite opstinu"></v-select>
        <v-text-field v-model="komAdresa" :rules="obaveznoPoljeRules" label="Adresa"></v-text-field>
        <v-text-field v-model="komEmail" label="E-mail"></v-text-field>
        <v-text-field v-model="komTelefon" mask="+(###)##-###-######" label="Telefon"></v-text-field>

        <v-btn :disabled="!valid" color="success" @click="sacuvajNovogKomitenta">
          Sacuvaj
        </v-btn>
        <v-btn @click="kreirajNovog=!kreirajNovog" class="secondary mb-4 mt-4" v-if="kreirajNovog">Odustani</v-btn>

      </v-form>
    </v-flex>
  </transition>
  <transition name="animacijaListe">
    <v-flex xs12 md6 offset-md3 v-if="!kreirajNovog" class="forma">
      <v-layout align-center justify-center row wrap>



        <v-btn @click="kreiranjeNovog" v-if="!kreirajNovog" color="success" class="mb-4 mt-4">Dodaj novog komitenta</v-btn>


      </v-layout>


      <h1 class="ml-5">Spisak Komitenata</h1>
      <v-expansion-panel class="pa-5">
        <v-expansion-panel-content v-for="(komitent,i) in komitenti" :key="i">
          <div slot="header">
            <h2>{{komitent.kom_naziv }}</h2>
          </div>
          <v-card>
            <v-card-text>

              <h1 class="display-2">{{komitent.kom_punNaziv}}</h1>
              <hr>
              <h3 class="pt-3">Adresa:{{komitent.kom_adresa}} </h3>
              <h3 class="pt-2">Email: {{komitent.kom_mejl}}</h3>
              <h3 class="pt-2">Pib: {{komitent.kom_pib}} </h3>
              <h3 class="pt-2">Telefon: {{komitent.kom_telefon|phoneNumber}}</h3>
              <v-btn @click="izmeniKomitenta(komitent.kom_id)" color="warning">Izmeni</v-btn>
              <v-btn @click="brisanjeKomitenta(komitent.kom_id,komitent.kom_naziv)" color="error">Obrisi</v-btn>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

    </v-flex>
  </transition>
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
      komitentIdIzmena: 0,
      statusIzbrisanog: false,
      idKomitentaZaBrisanje: 0,
      komitentZaBrisanje: '',
      komitenti: [],
      valid: true,
      kreirajNovog: false,
      komImeFirme: '',
      komPunNaziv: '',
      komPib: '',
      komRacun: '',
      komGrad: '',
      komOpstina: '',
      komAdresa: '',
      komEmail: '',
      komTelefon: '',
      gradovi: [],
      komOpstine: ['Prvo izaberite grad  '],
      obaveznoPoljeRules: [
        v => !!v || 'Obavezno polje.'
      ],
      pibRules: [
        v => !!v || 'Morate uneti Pib',
        v => (v && v.length == 9) || 'Pib mora sadrzati 9 cifara'
      ]

    }
  },
  mounted() {
      this.preuzmiKomitente();
    axios.get("http://837s121.mars-e1.mars-hosting.com/getCity")
      .then(response => {
        this.gradovi = response.data.gradovi;



      });
  },
  methods: {

    preuzmiKomitente(){
      axios.get("http://837s121.mars-e1.mars-hosting.com/getComittents", {
        params: {
          sid: localStorage.getItem('sessionid')
        }
      }).then(response => {
        this.komitenti = response.data.komitenti;



      });

    },

    izmeniKomitenta(komId) {
      this.komitentIdIzmena = komId;
      axios.get("http://837s121.mars-e1.mars-hosting.com/getComittents", {
        params: {
          sid: localStorage.getItem('sessionid'),
          komId
        }
      }).then(response => {
        this.komImeFirme = response.data.komitent[0].kom_naziv,
          this.komPunNaziv = response.data.komitent[0].kom_punNaziv,
          this.komPib = response.data.komitent[0].kom_pib,
          this.komRacun = response.data.komitent[0].kom_ziroRacun,
          this.komGrad = response.data.komitent[0].gra_id,
          this.komOpstina = response.data.komitent[0].ops_id,
          this.komAdresa = response.data.komitent[0].kom_adresa,
          this.komEmail = response.data.komitent[0].kom_mejl,
          this.komTelefon = response.data.komitent[0].kom_telefon


      });
      setTimeout(() => {
        axios.get("http://837s121.mars-e1.mars-hosting.com/getMunicipality", {
          params: {
            gradId: this.komGrad
          }
        }).then(response => {
          this.komOpstine = response.data.opstine;
        });
        this.kreirajNovog = true;
      }, 100)

    },

    uspesnoBrisanje() {

      this.idKomitentaZaBrisanje = 0;
      this.statusIzbrisanog = false;

      axios.get("http://837s121.mars-e1.mars-hosting.com/getComittents", {
        params: {
          sid: localStorage.getItem('sessionid')
        }
      }).then(response => {
        this.komitenti = response.data.komitenti;


      });
    },

    brisanjeKomitentaPotvrdjeno() {
      axios.patch("http://837s121.mars-e1.mars-hosting.com/deleteComittent", {
        // params: {
        sid: localStorage.getItem('sessionid'),
        komId: this.idKomitentaZaBrisanje
        // }
      }).then(response => {
        this.statusIzbrisanog = response.data.status;
        this.idKomitentaZaBrisanje = 0;
      });
    },
    brisanjeKomitenta(id, naziv) {
      this.komitentZaBrisanje = naziv;
      this.idKomitentaZaBrisanje = id;


    },
    sacuvajNovogKomitenta() {
      axios.post("http://837s121.mars-e1.mars-hosting.com/addNewComittent", {

          sid: localStorage.getItem('sessionid'),
          naziv: this.komImeFirme,
          punNaziv: this.komPunNaziv,
          pib: this.komPib,
          ziroRacun: this.komRacun,
          adresaFirme: this.komAdresa,
          telefon: this.komTelefon,
          mejlFirme: this.komEmail,
          opstinaFirme: this.komOpstina
        })
        .then(response => {
        });
      axios.patch("http://837s121.mars-e1.mars-hosting.com/deleteComittent", {
        // params: {
        sid: localStorage.getItem('sessionid'),
        komId: this.komitentIdIzmena
        // }
      }).then(response => {
        this.komitentIdIzmena = 0;
        this.idKomitentaZaBrisanje = 0;

          this.preuzmiKomitente();
      });
  this.kreirajNovog=false;
    },
    kreiranjeNovog() {
      this.kreirajNovog = !this.kreirajNovog;
      this.komImeFirme = '',
        this.komPunNaziv = '',
        this.komPib = '',
        this.komRacun = '',
        this.komGrad = '',
        this.komOpstina = '',
        this.komAdresa = '',
        this.komEmail = '',
        this.komTelefon = ''

    },
    spisakOpstina(gradId) {
      axios.get("http://837s121.mars-e1.mars-hosting.com/getMunicipality", {
        params: {
          gradId
        }
      }).then(response => {
        this.komOpstine = response.data.opstine;
        this.komOpstina = response.data.opstine[0].ops_id;
      });
    },
  }
}
</script>

<style>
.iks {
  cursor: pointer;
}

.iks:hover {
  transform: scale(1.4);
}

.modal {
  position: absolute;
  width: 50%;
  z-index: 100;
  opacity: 1;
  top: 30%;
  border-radius: 10px;
  background-color: white;
  -webkit-box-shadow: 0px 2px 241px -3px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 2px 241px -3px rgba(0, 0, 0, 1);
  box-shadow: 0px 2px 241px -3px rgba(0, 0, 0, 1);
  position: fixed;
}

.animacijaForme-enter {
  opacity: 0;
}

.animacijaForme-enter-active {
  transition: opacity 0.3s;
  transition-delay: 0.3s;
}

.animacijaForme-leave-active {
  transition: opacity 0.3s;
}

.animacijaForme-leave-to {
  opacity: 0;
}

.animacijaListe-enter {
  opacity: 0;
}

.animacijaListe-enter-active {
  transition: opacity 0.3s;
  transition-delay: 0.3s;
}

.animacijaListe-leave-active {
  transition: opacity 0.3s;
}

.animacijaListe-leave-to {
  opacity: 0;
}
</style>
