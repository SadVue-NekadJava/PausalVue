<template>
<div>

  <v-toolbar v-if="notLogged" class="opacity elevation-15" >
    <v-spacer></v-spacer>
    <v-toolbar-title>Pausalac</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>

    <v-flex xs6 offset-xs2>
      <!-- **************Uspesno resetovanje sifre************** -->
  <div v-if="resetPoruka==1" class="text-xs-center  modal pa-5">
<h2>
Uspesno ste promenili lozinku za {{resetEmail}}, poslata vam je privremena lozinka na vas email
</h2>
  <v-btn @click="uspesanReset" color="primary">Ok</v-btn>
  </div>
<!-- ******************Neuspesno resetovanje sifre**************************** -->
  <div v-if="resetPoruka==2" class="text-xs-center  modal pa-5">
<h2>
Resetovanje lozinke nije uspesno, unesite ispravan email
</h2>
  <v-btn @click="resetPoruka=0" color="primary">Ok</v-btn>
  </div>
</v-flex>

  <v-layout row wrap class="mt-5" v-if="zaboravljenaSifra">
    <v-flex sm6 offset-sm3 md4 offset-md4 xs10 offset-xs1 class="mt-5 text-xs-center">
      <v-form ref="form" v-model="validReset" class="forma pa-5">

        <h2 class="pb-3">Resetovanje lozinke</h2>
        <v-text-field v-model="resetEmail" :rules="emailRules" type="email" label="Email"></v-text-field>
        <v-btn large :disabled="!validReset" @click="resetPassword" color="primary mt-3">Resetuj</v-btn>
      </v-form>
    </v-flex>
  </v-layout>
  <v-layout row wrap class="mt-3 pa-0" v-if="!registerUser&&!zaboravljenaSifra">
    <v-flex sm6 offset-sm3 md4 offset-md4 xs10 offset-xs1 class="mt-5 text-sm-center">

      <!-- *****************LOGIN****************** -->

      <v-form ref="form" v-model="validLogin" class="forma pa-5">
        <v-text-field v-model="loginEmail" :rules="emailRules" type="email" label="Email"></v-text-field>
        <v-text-field v-model="loginPassword" class="mt-3" :append-icon="show1 ? 'visibility_off' : 'visibility'" :rules="passwordRules" :type="show1 ? 'text' : 'password'" label="Korisnicka sifra" hint="Minimum 6 karaktera" counter @click:append="show1 = !show1">

        </v-text-field>
        <h3 class="error--text ">{{errorMsgLogin}}</h3>
        <v-btn large :disabled="!validLogin" @click="login" color="primary mt-3">Prijavi se</v-btn><br>

        <p @click="zaboravljenaSifra=true" class="zaboravljenaSifra pt-3">Zaboravljena sifra</p>
        <v-layout row wrap class="mb-0">
          <v-flex xs8 class="mb-0">
          </v-flex>
          <v-flex xs4>
            <v-btn @click="registerUser=!registerUser" small color="secondary mt-5 mb-0">Registruj se</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
    </v-flex>
  </v-layout>
  <v-layout row wrap v-if="registerUser">
    <v-flex xs10 offset-xs1 md6 offset-md3 class="mt-4">
      <v-stepper class="forma" v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">Korisnik</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="e1 > 2" step="2">Korisnicki podaci</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">Podaci o firmi</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-flex xs10 offset-xs1>
              <v-card class="mb-3" color="grey lighten-5"></v-card>
              <v-layout row wrap>
                <!-- ***********************Korak 1************************ -->
                <v-form ref="form" v-model="validKorak1">
                  <v-text-field v-model="usrEmail" type="email" :rules="emailRules" label="Email"></v-text-field>
                  <v-layout row wrap class="mt-3 mb-3">
                    <v-flex xs5>
                      <v-text-field v-model="password" :append-icon="show1 ? 'visibility_off' : 'visibility'" :rules="passwordRules" :type="show1 ? 'text' : 'password'" label="Korisnicka sifra" hint="Minimum 6 karaktera" counter @click:append="show1 = !show1">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs1>
                    </v-flex>
                    <v-flex xs5>
                      <v-text-field v-model="passwordConfirm" :rules="passwordRules" :type="show1 ? 'text' : 'password'" label="Potvrdi  sifru" hint="Minimum 6 karaktera" counter>
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                  <div class="text-sm-center">
                    <h3 class="error--text">{{porukaKorak1}}</h3>
                  </div>
                </v-form>
              </v-layout>
              <v-btn :disabled="!validKorak1" color="primary" @click="korak1">
                Nastavi <v-icon right>arrow_right_alt</v-icon>
              </v-btn>
              <v-btn @click="registerUser=!registerUser" flat>Povratak na login</v-btn>
            </v-flex>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card class="mb-5">
              <v-layout row wrap>
                <v-flex xs10 offset-xs1>

                  <!-- ************************************Korak 2**************************** -->

                  <v-form ref="form" v-model="validKorak2">
                    <v-text-field v-model="korIme" :rules="obaveznoPoljeRules" label="Ime"></v-text-field>
                    <v-text-field v-model="korPrezime" :rules="obaveznoPoljeRules" label="Prezime"></v-text-field>
                    <v-text-field v-model="korImeOca" :rules="obaveznoPoljeRules" label="Ime oca"></v-text-field>
                    <v-checkbox label="Strani Drzavljanin" v-model="stranac" value="true"></v-checkbox>
                    <v-text-field v-if="stranac" v-model="korJmbg" :rules="obaveznoPoljeRules" label="Broj Pasosa"></v-text-field>
                    <v-text-field v-if="!stranac" v-model="korJmbg" mask="#############" :rules='jmbgRules' :counter="13" label="Jbmg"></v-text-field>
                    <v-text-field v-model="korSprema" :rules="obaveznoPoljeRules" label="Strucna sprema"></v-text-field>
                    <v-checkbox label="U radnom odnosu" v-model="zaposlen">
                    </v-checkbox>
                    <v-radio-group :rules="polRules" v-model="korPol" :mandatory="false">
                      <label class="labela mb-3">Pol</label>
                      <v-radio label="Muski" value="1"></v-radio>
                      <v-radio label="Zenski" value="2"></v-radio>
                    </v-radio-group>
                    <v-select :items="gradovi" :rules="selectRules" @change="spisakOpstinaKorisnik($event)" name="grad" item-text="gra_naziv" item-value="gra_id" v-model="korGrad" label="Izaberite Grad"></v-select>
                    <v-select :items="opstine" :rules="selectRules" name="opstina" item-text="ops_naziv" item-value="ops_id" v-model="korOpstina" label="Izaberite Opstinu"></v-select>
                    <v-text-field class="mb-4" v-model="korAdresa" :rules="obaveznoPoljeRules" label="Adresa "></v-text-field>
                    <v-btn <v-btn :disabled="!validKorak2" color="primary" @click="korak2">
                      Nastavi<v-icon right>arrow_right_alt</v-icon>
                    </v-btn>
                    <v-btn flat @click="e1--"> Nazad</v-btn>
                  </v-form>
                </v-flex>
              </v-layout>
            </v-card>


          </v-stepper-content>
          <v-stepper-content step="3">
            <v-card class="mb-5">

              <!-- **************************Korak 3***************************** -->

              <v-form ref="form" v-model="validKorak3" class="forma mt-3 pa-3">
                <v-text-field v-model="imeFirme" :rules="obaveznoPoljeRules" label="Ime Firme"></v-text-field>
                <v-text-field v-model="punNaziv" :rules="obaveznoPoljeRules" label="Pun naziv sa resenja"></v-text-field>
                <v-text-field v-model="pib" mask="#########" :counter="9" :rules="pibRules" label="Pib"></v-text-field>
                <v-text-field v-model="matBroj" mask="########" :counter="8" :rules="maticniBrojRules" label="Maticni broj"></v-text-field>
                <v-text-field v-model="sifraDelatnosti" :counter="4" mask="####" :rules="obaveznoPoljeRules" label="Sifra delatnosti"></v-text-field>
                <v-text-field v-model="opisDelatnosti" :rules="obaveznoPoljeRules" label="Opis delatnosti"></v-text-field>
                <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent lazy full-width width="290px">
                  <v-text-field slot="activator" :rules="obaveznoPoljeRules" v-model="date" label="Datum registracije Firme " prepend-icon="event" readonly></v-text-field>
                  <v-date-picker v-model="date" locale="sr-Latn-CS" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
                <v-text-field v-model="racun" mask="###-#############-##" label="Broj Ziro racuna"></v-text-field>
                <v-select :items="gradovi" :rules="obaveznoPoljeRules" name="grad" item-text="gra_naziv" item-value="gra_id" v-model="grad" @change="spisakOpstinaFirma($event)" label="Izaberite grad"></v-select>
                <v-select :items="opstineFirma" :rules="obaveznoPoljeRules" name="opstina" item-text="ops_naziv" item-value="ops_id" v-model="opstina" label="Izaberite opstinu"></v-select>
                <v-text-field v-model="adresa" :rules="obaveznoPoljeRules" label="Adresa"></v-text-field>
                <v-text-field v-model="email" :rules="emailRules" label="E-mail"></v-text-field>
                <v-text-field v-model="telefon" mask="+(###)##-###-######" :rules="obaveznoPoljeRules" label="Telefon"></v-text-field>
                <v-checkbox v-model="spreman" :rules="obaveznoPoljeRules" label="Proverili ste tacnost podataka?"></v-checkbox>
                <v-btn :disabled="!validKorak3" color="primary" @click="register">
                  Potvrdi
                </v-btn>
                <v-btn @click="e1--" flat>Nazad</v-btn>
              </v-form>
            </v-card>

          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
export default {
  name:'index',
  data() {
    return {
      notLogged: true,
      resetPoruka:0,
      resetEmail: '',
      validReset: true,
      zaboravljenaSifra: false,
      registerUser: false,
      loginEmail: '',
      loginPassword: '',
      usrEmail: '',
      password: '',
      passwordConfirm: '',
      korIme: '',
      korPrezime: '',
      korImeOca: '',
      stranac: false,
      korJmbg: '',
      korSprema: '',
      zaposlen: false,
      korPol: 0,
      korGrad: '',
      korOpstina: '',
      korAdresa: '',
      imeFirme: '',
      punNaziv: '',
      pib: '',
      matBroj: '',
      sifraDelatnosti: '',
      opisDelatnosti: '',
      date: null,
      racun: '',
      grad: '',
      opstina: '',
      adresa: '',
      email: '',
      telefon: '',
      spreman: false,
      porukaKorak1: '',
      validKorak1: true,
      validKorak2: true,
      validKorak3: true,
      validLogin: true,
      errorMsgRegister: '',
      errorMsgLogin: '',
      menu: false,
      modal: false,
      menu2: false,
      gradovi: [],
      opstine: [],
      opstineFirma: [],
      show1: false,
      show2: false,
      passwordRules: [
        v => !!v || 'Morate uneti lozinku',
        v => (v && v.length >= 6) || 'Lozinka mora biti duza od 6 karaktera'
      ],
      emailRules: [
        v => !!v || 'Morate uneti email',
        v => /.+@.+/.test(v) || 'Email mora biti validan'
      ],
      jmbgRules: [
        v => !!v || 'Morate uneti JMBG',
        v => (v && v.length == 13) || 'JMBG mora da sadrzi  13 cifara'
      ],
      polRules: [
        v => v != 0 || 'Niste izabrali pol'
      ],
      selectRules: [
        v => v != '' || 'Izaberite opstinu/grad'
      ],
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
      e1: 0
    }
  },
  mounted() {
    axios.get("http://837s121.mars-e1.mars-hosting.com/getCity")
      .then(response => {
        this.gradovi = response.data.gradovi;



      });
    axios.get("http://837s121.mars-e1.mars-hosting.com/checkSid", {
      params: {
        sid: localStorage.getItem('sessionid')
      }
    }).then(response => {
      if (response.data.status) {
        this.$router.push('/home');

      }

    });
  },
  methods: {
    uspesanReset(){
      this.resetPoruka=0;
      this.zaboravljenaSifra=false;
    },
    resetPassword() {
      axios.get("http://837s121.mars-e1.mars-hosting.com/forgotPassword", {
        params: {
          mejl: this.resetEmail
        }
      }).then(response => {
        if (response.data.status) {
          this.resetPoruka=1;
        } else {
          this.resetPoruka=2;
        }
      });
    },
    spisakOpstinaFirma(gradId) {
      axios.get("http://837s121.mars-e1.mars-hosting.com/getMunicipality", {
        params: {
          gradId
        }
      }).then(response => {
        this.opstineFirma = response.data.opstine;
        this.opstina=response.data.opstine[0].ops_id;
      });
    },
    spisakOpstinaKorisnik(gradId) {
      axios.get("http://837s121.mars-e1.mars-hosting.com/getMunicipality", {
        params: {
          gradId
        }
      }).then(response => {
        this.opstine = response.data.opstine;
        this.korOpstina=response.data.opstine[0].ops_id;
      });
    },
    korak2() {
      this.e1 = 3;


    },
    korak1() {
      if (this.password == this.passwordConfirm) {
        this.e1 = 2
      } else {
        this.porukaKorak1 = 'lozinke se ne poklapaju'
      }
    },
    login() {

      axios.post("http://837s121.mars-e1.mars-hosting.com/login", {
        mejl: this.loginEmail,
        sifra: this.loginPassword
      }).then(response => {
        this.errorMsgLogin = response.data.msg;
        setTimeout(() => this.errorMsgLogin = '', 2000);
        if (response.data.status) {
          var sid = response.data.sid;
          window.localStorage.setItem("sessionid", sid);
          this.$store.commit('change');
          this.notLogged = false;
          this.$router.push('/home');
        }
      });

    },

    register() {
      axios.post("http://837s121.mars-e1.mars-hosting.com/register", {
        mejl: this.usrEmail,
        sifra: this.password,
        ponovoSifra: this.passwordConfirm,
        ime: this.korIme,
        prezime: this.korPrezime,
        srednjeIme: this.korImeOca,
        jmbg: this.korJmbg,
        strucnaSprema: this.korSprema,
        uRadnomOdnosu: this.zaposlen,
        pol: this.korPol,
        opstina: this.korOpstina,
        adresa: this.korAdresa,
        naziv: this.imeFirme,
        punNaziv: this.punNaziv,
        pib: this.pib,
        maticniBroj: this.matBroj,
        ziroRacun: this.racun,
        sifraDelatnosti: this.sifraDelatnosti,
        opisDelatnosti: this.opisDelatnosti,
        datumRegistracije: this.date,
        adresaFirme: this.adresa,
        telefon: this.telefon,
        mejlFirme: this.email,
        opstinaFirme: this.opstina
      }).then(response => {
        this.errorMsgRegister = response.data.msg;
        if (response.data.status) {
          this.$router.push('/');
        }


      });

    }
  }
}
</script>

<style scoped>
.zaboravljenaSifra {
  cursor: pointer;
}

.zaboravljenaSifra:hover {
  color: blue;
  text-decoration: underline;
}

.labela {
  color: grey;
}

.forma {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  border: 1px solid light-green;
}
.modal{
  position:absolute;
  width:50%;
  z-index: 100;
  opacity:1;
  top:30%;
  border-radius: 10px;
  background-color:white;
  -webkit-box-shadow: 0px 2px 241px -3px rgba(0,0,0,1);
  -moz-box-shadow: 0px 2px 241px -3px rgba(0,0,0,1);
  box-shadow: 0px 2px 241px -3px rgba(0,0,0,1);
  position:fixed;
}
</style>
