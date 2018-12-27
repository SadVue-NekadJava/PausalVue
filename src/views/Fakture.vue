<template>
<div>
  <nav-bar/>

  <v-form ref="form" v-model="valid" class="pa-5">
    <div v-if="novafaktura" row wrap class="forma pa-4" >
          <v-layout row wrap class="mb-1">
            <v-flex sm3>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Pretraga faktura"
                single-line
                autofocus
              ></v-text-field>
            </v-flex>
            <v-flex sm6>
              <v-btn class="success" @click="novaFakturaDugme" v-if="novafaktura">Kreiraj novu Fakturu</v-btn>
              <v-btn @click="stampaj" color="primary">Stampaj KPO</v-btn>

            </v-flex>
          </v-layout>
          <v-data-table
            :headers="tabeleHederi.listaFaktura"
            :items="fakture" class="elevation-1 tabela"
            :search="search" item-key="redniBroj"
            no-data-text="Trenutno nemate fakture."
            no-results-text="Nema rezultata."
            rows-per-page-text="Prikazi:"
            :rows-per-page-items="tabelaPaginacija"
          >
            <template slot="items" slot-scope="faktura">
              <tr data-v-710df83a @click="faktura.expanded = !faktura.expanded" class="tabela__red" :class="{'grey lighten-1': faktura.expanded && faktura.item.fak_status==1,'blue lighten-1 white--text': faktura.item.fak_status==2, 'red lighten-1 white--text':  faktura.item.fak_status==3}">
                <td>{{ faktura.item.redniBroj }}</td>
                <td class="text-xs-center text-truncate">{{ faktura.item.kom_naziv}}</td>
                <td class="text-xs-center">{{ faktura.item.fak_brojFakture}}</td>
                <td class="text-xs-center">{{ faktura.item.fak_total | thousandSeparator}}</td>
                <td class="text-xs-center">{{ faktura.item.fak_datumIzdavanja}}</td>
                <td class="text-xs-center">{{ faktura.item.fak_datumPrometaIspis}}</td>
                <td class="text-xs-center">{{ faktura.item.fak_valutaIspis}}</td>
                <td class="text-xs-center">
                  <v-icon small @click="storiniranjeFakture(faktura.item.fak_id)" :class="{'white--text':faktura.item.fak_status==2||faktura.item.fak_status==3}">
                    delete
                  </v-icon>
                </td>
                <td v-show="false" v-for="stavka in faktura.item.stavkeFakture">{{stavka.usp_naziv}}</td>
              </tr>
            </template>
            <template slot="expand" slot-scope="faktura">
              <v-data-table
                :headers="tabeleHederi.listaStavki"
                :items="faktura.item.stavkeFakture"
                hide-actions class="elevation-1 forma__sirina-tabele"
                no-data-text="Trenutno nemate fakture."
                no-results-text="Nema rezultata."
                rows-per-page-text="Prikazi:"
                :rows-per-page-items="tabelaPaginacija"
              >
                <tr slot="items" slot-scope="stavkeFakture" class="grey lighten-2" :class="{}">
                  <td class="text-xs-center">{{ stavkeFakture.item.usp_naziv }}</td>
                  <td class="text-xs-center">{{ tipSelekt[stavkeFakture.item.usp_tip].tipTekst }}</td>
                  <td class="text-xs-center">{{ stavkeFakture.item.usp_cena|thousandSeparator }}</td>
                  <td class="text-xs-center">{{ stavkeFakture.item.usp_mera }}</td>
                  <td class="text-xs-center">{{ stavkeFakture.item.usp_kolicina }}</td>
                  <td class="text-xs-center">{{ stavkeFakture.item.ukupno | thousandSeparator }}</td>
                </tr>
              </v-data-table>
            </template>
            <template slot="pageText" slot-scope="props">
              Prikazujem {{ props.pageStart }} - {{ props.pageStop }} od {{ props.itemsLength }}
            </template>
          </v-data-table>
          <v-layout row wrap justify-end>
            <v-flex xs12 md2 pa-1>
              <div class="d-inline-block legendIcon--dimensions blue lighten-1 vertical_align"></div>
              <div class="d-inline-block vertical_align">
                 - Nacrt faktura
              </div>
            </v-flex>
            <v-flex xs12 md2 pa-1>
              <div>
                <div class="d-inline-block legendIcon--dimensions red lighten-1"></div> - Stornirana faktura
              </div>
            </v-flex>
          </v-layout>
          <!--<v-expansion-panel-content class="listaFaktura" v-for="(faktura,index) in fakture" :key="faktura.id">
            <div slot="header">
              <v-layout row wrap>
                <v-flex xs5>
                  <h2 :class="{'grey--text':faktura.fak_status==3}">{{faktura.kom_naziv}}</h2>
                  <h3>{{faktura.date}}</h3>
                </v-flex>
                <v-flex xs4>
                  <div class="mr-5">
                    <h2 v-if="faktura.fak_status==3" class="storno text-xs-center">Stornirano</h2>
                    <h2 v-if="faktura.fak_status==2" class="izrada text-xs-center">U izradi</h2>

                  </div>
                </v-flex>
                <v-flex xs3>
                  <h2 :class="{'grey--text':faktura.fak_status==3}">{{faktura.fak_total|thousandSeparator}} RSD</h2>
                </v-flex>
              </v-layout>
            </div>
            <v-card class="pa-2">
              <v-card-text class="pa-0">
                <h2 class="text-xs-center pb-3" v-if="faktura.fak_brojFakture!=='Samo izdate fakture mogu imati broj.'">Broj fakture: {{faktura.fak_brojFakture}}</h2>
                <h2 class="text-xs-center pb-3" v-else><em>{{faktura.fak_brojFakture}}</em></h2>
                <v-data-table :items="faktura.stavkeFakture" class="elevation-1" hide-actions hide-headers no-data-text="Faktura nema stavke.">
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-center"> {{tipSelekt[props.item.usp_tip].tipTekst}}</td>
                    <td class="text-xs-center">{{ props.item.usp_naziv }}</td>
                    <td class="text-xs-center">{{ props.item.usp_cena|thousandSeparator }}</td>
                    <td class="text-xs-center">{{ props.item.usp_mera }}</td>
                    <td class="text-xs-center">{{ props.item.usp_kolicina }}</td>
                    <td class="text-xs-center">{{ (props.item.usp_cena * props.item.usp_kolicina)|thousandSeparator}}</td>
                  </template>
                </v-data-table>
                <h2 class="pt-5 text-xs-center">Ukupna cena: {{faktura.fak_total|thousandSeparator}} RSD</h2>
                <v-layout row wrap>
                  <v-flex xs7>
                    <h2 class="pt-5 text-xs-left">Mesto: {{faktura.grad}}, {{faktura.fak_datumPrometaIspis}}</h2>
                  </v-flex>
                  <v-flex xs5>
                    <h2 class="pt-5 text-xs-right">Plativo do: {{faktura.fak_valutaIspis}}</h2>
                  </v-flex>
                </v-layout>
                <v-layout row wrap class="justify-center mb-1">
                  <v-tooltip bottom>
                    <v-btn slot="activator" v-if="faktura.fak_status==1" @click="dugmeStoriniranjeFakture(faktura) " icon>
                      <v-icon size="35px" color="primary">close</v-icon>
                    </v-btn>
                    Storniraj
                  </v-tooltip>
                  <v-tooltip bottom>
                    <v-btn slot="activator" v-if="faktura.fak_status==1" icon>
                      <v-icon size="35px" color="primary">print</v-icon>
                    </v-btn>
                    Stampaj
                  </v-tooltip>


                  <v-tooltip bottom>
                    <v-btn @click="izmeniFakturu(index)" slot="activator" v-if="faktura.fak_status==2" large icon>
                      <v-icon size="35px" color="primary">edit
                      </v-icon>
                    </v-btn>
                    Izmeni
                  </v-tooltip>
                  <v-tooltip bottom>
                    <v-btn slot="activator" @click="izbrisiRadnuVerzijuFakture(faktura.fak_id)" v-if="faktura.fak_status==2" large icon>
                      <v-icon size="35px" color="primary">delete</v-icon>
                    </v-btn>
                    Izbrisi
                  </v-tooltip>
                  <v-tooltip bottom>

                    <v-btn slot="activator" v-if="faktura.fak_status==2&&!faktura.isteklaValuta" large @click="fakturisiDraft(faktura.fak_id)" icon>
                      <v-icon size="35px" color="primary">check</v-icon>
                    </v-btn>
                    Fakturisi
                  </v-tooltip>
                  <v-tooltip bottom>

                    <v-btn slot="activator" v-if="faktura.fak_status==2&&faktura.isteklaValuta" disabled large @click="fakturisiDraft(faktura.fak_id)" icon>
                      <v-icon size="35px" color="primary">check</v-icon>
                    </v-btn>
                    Valuta je istekla
                  </v-tooltip>
                </v-layout>
              </v-card-text>
            </v-card>
            BRISANJE FAKTURE
            <div v-if="modal2" class="text-xs-center  modal pa-5">
              <h1>Da li ste sigurni da zelite da stornirate fakturu "{{odabranaFaktura.kom_naziv}}"?</h1>
              <v-btn @click="storiniranjeFakture(1)" color="warning">Da</v-btn>
              <v-btn @click="storiniranjeFakture(0)" color="secondary">Ne</v-btn>
            </div>
          </v-expansion-panel-content>-->
    </div>
    <v-layout row wrap>
      <v-flex xs12 class="fadeIn text-xs-center" v-if="!novafaktura">

        <v-form v-model="valid" class="forma pa-3">
          <v-layout class="justify-end">
            <v-icon @click="novaFakturaDugme" class="iks">clear</v-icon>
          </v-layout>
          <v-layout row wrap>
            <v-flex md3 pr-3>
              <h1 class="faktura__naslov text-xs-left">Opis fakture</h1>
              <v-layout row wrap>
                <v-flex xs12 sm4 md12 mb-1 pa-1>
                  <v-select :rules="obaveznoPoljeRules" :items="komitenti" item-text="kom_naziv" item-value="kom_id" v-model="komitentId" label=" Komitent" no-data-text="Trenutno nema stavki." light></v-select>
                </v-flex>

                <v-flex xs12 sm4 md12 mb-1 pa-1>
                  <v-dialog ref="datumPrometa" v-model="modal" :return-value.sync="datumPrometa" persistent lazy full-width width="290px">
                    <v-text-field :rules="obaveznoPoljeRules" slot="activator" v-model="datumPrometa" label="Datum prometa" prepend-icon="event" readonly></v-text-field>
                    <v-date-picker v-model="datumPrometa" locale="sr-Latn-CS" :min="danasnjiDatum" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal=false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.datumPrometa.save(datumPrometa)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>

                <v-flex xs12 sm4 md12 mb-1 pa-1>
                  <v-dialog ref="datumValute" v-model="modal1" :return-value.sync="datumValute" persistent lazy full-width width="290px">
                    <v-text-field :rules="obaveznoPoljeRules" slot="activator" v-model="datumValute" label="Datum valute" prepend-icon="event" readonly></v-text-field>
                    <v-date-picker v-model="datumValute" locale="sr-Latn-CS" :min="datumPrometa" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="modal1 = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.datumValute.save(datumValute)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>

                <v-flex xs12 sm4 md12 mb-1 pa-1>
                  <v-select light :rules="obaveznoPoljeRules" :items="mesta" item-text="gra_naziv" item-value="gra_id" v-model="mesto" label="Mesto"></v-select>
                </v-flex>
                <v-flex xs12 sm4 md12 mb-1 pa-1>
                  <v-text-field label="Opis" v-model="opisFakture"></v-text-field>
                </v-flex>
              </v-layout>



              <!-- <v-textarea
                name="input-7-1"
                box
                label="Opis"
                auto-grow
                v-model="opisFakture"
                value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
              ></v-textarea> -->

            </v-flex>

            <v-flex md9>
              <h1 class="faktura__naslov text-xs-left">Stavke fakture</h1>
              <v-layout row wrap class="theme--light v-table elevation-1">
                <v-flex xs12 sm4 lg2 class="pa-1">
                  <v-text-field v-model="proizvodNazivUsluge" label="Naziv usluge/proizvoda"></v-text-field>
                </v-flex>

                <v-flex xs12 sm4 lg2 class="pa-1">
                  <v-select
                    :items="tipSelekt"
                    v-model="tipTrenutnaVrednost"
                    item-text="tipTekst"
                    item-value="tipVrednost"
                    :rules="selektRules"
                  ></v-select>
                </v-flex>

                <v-flex xs12 sm4 lg2 class="pa-1">
                  <v-text-field v-model="proizvodJedinicnaCena" type="number" label="Jedinicna cena"></v-text-field>
                </v-flex>

                <v-flex xs12 sm4 lg2 class="pa-1">
                  <v-text-field v-model="proizvodJedinicaMere" label="Jedinica mere"></v-text-field>
                </v-flex>

                <v-flex xs12 sm4 lg2 class="pa-1">
                  <v-text-field v-model="proizvodKolicina" type="number" label="Kolicina"></v-text-field>
                </v-flex>

                <v-flex xs12 sm4 lg2 class="pa-1">
                  <v-btn class="px-1" color="success" @click="dodajProizvod()">Dodaj novu stavku</v-btn>
                </v-flex>
              </v-layout>
              <div class="nevidljiviInput">
                <v-text-field :rules="obaveznoPoljeRules" v-model="promenljiva"></v-text-field>
              </div>

              <!-- VELIKI EKRANI -->
              <v-layout hidden-md-and-down>
                <v-flex md12>
                  <v-data-table
                    :headers="tabeleHederi.stavkeFakture"
                    :items="proizvodi" class="elevation-1"
                    no-data-text="Trenutno nema stavki."
                    rows-per-page-text="Prikazi:"
                    hidden-lg-and-down
                    :rows-per-page-items="tabelaPaginacija"
                  >
                    <tr slot="items" slot-scope="props">
                      <td>{{ props.index+1 }}</td>
                      <td class="text-xs-center">{{ props.item.naziv }}</td>
                      <td class="text-xs-center">{{ tipSelekt[props.item.tip].tipTekst }}</td>
                      <td class="text-xs-center">{{ props.item.cena|thousandSeparator }}</td>
                      <td class="text-xs-center">{{ props.item.mera }}</td>
                      <td class="text-xs-center">{{ props.item.kolicina }}</td>
                      <td class="text-xs-center">{{ props.item.ukupnaCena|thousandSeparator }}</td>
                      <td class="text-xs-center">
                        <v-icon small @click="ukloniStavku(props.item)">
                          delete
                        </v-icon>
                      </td>
                    </tr>
                    <template slot="pageText" slot-scope="props">
                      Prikazujem {{ props.pageStart }} - {{ props.pageStop }} od {{ props.itemsLength }}
                    </template>
                  </v-data-table>
                </v-flex>
              </v-layout>

              <!-- MALI I SREDNJI EKRANI -->
              <v-layout hidden-lg-and-up>
                <v-flex xs12>
                  <v-data-iterator
                    :items="proizvodi"
                    content-tag="v-layout"
                    no-data-text="Trenutno nema stavki."
                    rows-per-page-text="Prikazi:"
                    :rows-per-page-items="iteratorTabelaPaginacija"
                    row
                    wrap
                    light
                    class="theme--light v-table pt-2"
                  >
                    <v-flex
                      slot="item"
                      slot-scope="proizvod"
                      xs12
                      sm6
                      md4
                      pa-1
                    >
                      <v-card>
                        <v-card-title><h4>{{ proizvod.item.naziv }}</h4></v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                          <v-list-tile>
                            <v-list-tile-content>Proizvod/usluga:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ tipSelekt[proizvod.item.tip].tipTekst }}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>Jedinicna cena (RSD):</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ proizvod.item.cena|thousandSeparator }}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>Jedinica mere:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ proizvod.item.mera }}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>Kolicina:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ proizvod.item.kolicina }}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>Ukupna cena:</v-list-tile-content>
                            <v-list-tile-content class="align-end">{{ proizvod.item.ukupnaCena|thousandSeparator }}</v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>Ukloni stavku:</v-list-tile-content>
                            <v-list-tile-content class="align-end">
                              <v-icon small @click="ukloniStavku(proizvod.item)">
                                delete
                              </v-icon>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-card>
                    </v-flex>
                  </v-data-iterator>
                </v-flex>
              </v-layout>
              <h2 v-if="ukupno!=0" class="theme--light v-table elevation-1 text-xs-right tabela__ukupno pr-5 py-2">Ukupan iznos fakture: {{ukupno|thousandSeparator}}</h2>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="justify-center">
            <v-btn color="success" :disabled="!valid" @click="posaljiFakturu(1)">Fakturisi</v-btn>
            <v-btn color="primary" :disabled="!valid" @click="posaljiFakturu(2)">Sacuvaj radnu verziju</v-btn>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-form>
</div>
</template>


<script>
// import RegistracijaFirme from '@/components/registracijaFirme'
import Navbar from '@/components/navBar'
export default {
  components:{
    'nav-bar':Navbar
  },
  data() {
    return {
      idFakture: null,
      danasnjiDatum: null,
      promenljiva: '',
      date: null,
      datumPrometa: null,
      datumValute: null,
      mesto: '',
      menu: false,
      modal: false,
      modal1: false,
      menu2: false,
      value: '',
      novafaktura: true,
      mesta: [],
      // POPUNJAVA LISTU FAKTURA
      fakture: [],
      proizvodNazivUsluge: '',
      proizvodJedinicaMere: '',
      proizvodKolicina: '',
      proizvodJedinicnaCena: '',
      // TABELE
      tabelaPaginacija: [5, 10, 25, {
        "text": "Sve",
        "value": -1
      }],
      iteratorTabelaPaginacija: [6, 12, 24, {
        "text": "Sve",
        "value": -1
      }],
      tabeleHederi: {
        // GLAVNA TABELA NA STRANI FAKTURE
        listaFaktura: [
          {
            // PRVA CELIJA U TABELI, REDNI BROJEVI
            value: 'redniBroj',
            align: 'center'
          },
          {
            text: 'Komitent',
            value: "kom_naziv",
            align: 'center'
          },
          {
            text: 'Broj fakture',
            value: "fak_brojFakture",
            align: 'center'
          },
          {
            text: 'Ukupna cena (RSD)',
            value: 'fak_total',
            align: 'center'
          },
          {
            text: 'Datum izdavanja',
            value: 'fak_datumIzdavanja',
            align: 'center'
          },
          {
            text: 'Datum prometa',
            value: 'fak_datumPrometa',
            align: 'center'
          },
          {
            text: 'Datum valute',
            value: 'fak_valuta',
            align: 'center'
          },
          {
            text: 'Storniraj/Ukloni nacrt',
            sortable: false,
            align: 'center'
          }
        ],

        listaStavki: [
          {
            text: 'Naziv proizvoda',
            value: "usp_naziv",
            align: 'center',
            class: "grey lighten-2"
          },
          {
            text: 'Proizvod/usluga',
            value: 'usp_tip',
            align: 'center',
            class: "grey lighten-2"
          },
          {
            text: 'Jedinicna cena (RSD)',
            value: 'usp_cena',
            align: 'center',
            class: "grey lighten-2"
          },
          {
            text: 'Jedinica mere',
            value: "usp_mera",
            align: 'center',
            class: "grey lighten-2"
          },
          {
            text: 'Kolicina',
            value: 'usp_kolicina',
            align: 'center',
            class: "grey lighten-2"
          },
          {
            text: 'Ukupna cena (RSD)',
            value: 'ukupno',
            align: 'center',
            class: "grey lighten-2"
          }
        ],

        stavkeFakture: [
          {
            align: 'left',
            sortable: false,
            width: '10px'
          },
          {
            text: 'Naziv proizvoda',
            value: "nazivProizvoda",
            sortable: false
          },
          {
            text: 'Proizvod/usluga',
            value: "tip",
            sortable: false
          },
          {
            text: 'Jedinicna cena (RSD)',
            value: 'jedinicnaCena'
          },
          {
            text: 'Jedinica mere',
            value: "jedinicaMere",
            sortable: false
          },
          {
            text: 'Kolicina',
            value: 'kolicina'
          },
          {
            text: 'Ukupna cena (RSD)',
            value: 'ukupnaCena'
          },
          {
            text: 'Ukloni stavku',
            value: 'ukloniStavku',
            sortable: false
          }
        ],


      },
      proizvodi: [],
      ukupno: 0,
      komitenti: [],
      // ID ODABRANOG KOMITENTA
      komitentId: '',
      // REQUIRED POLJA
      obaveznoPoljeRules: [
        v => !!v || 'Obavezno polje.'
      ],
      // KONTROLA ZA DUGMAD
      valid: true,
      opisFakture: '',
      // BRISANJE/ARHIVIRANJE FAKTURE
      modal2: false,
      odabranaFaktura: {},
      tipTrenutnaVrednost: 0,
      tipSelekt:[
        {
          tipTekst: 'Usluga',
          tipVrednost: 0
        },
        {
          tipTekst: 'Proizvod',
          tipVrednost: 1
        }
      ],
      selektRules: [
        v => (v == 0 || v == 1) || 'Izaberite jednu od opcija'
      ],
      search: ''
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
    izbrisiRadnuVerzijuFakture(fakId){
      axios.delete("http://837s121.mars-e1.mars-hosting.com/deleteTemplate", {
      params:{  sid: localStorage.getItem('sessionid'),
        fakId}

      }).then(response => {

        this.preuzmiFakture();
      });

    },
    novaFakturaDugme() {
      this.novafaktura = !this.novafaktura;
      this.datumValute = null;
      this.mesto = '';
      this.proizvodi = [];
      this.ukupno = 0;
      this.komitentId = '';
      this.proizvodNazivUsluge = '';
      this.proizvodJedinicaMere = '';
      this.proizvodKolicina = '';
      this.proizvodJedinicnaCena = '';
      this.tipPocetnaVrednost=0;
    },
    preuzmiFakture() {
      axios.get("http://837s121.mars-e1.mars-hosting.com/getInvoices", {
        params: {
          sid: localStorage.getItem('sessionid')
        }
      }).then(response => {

        // MENJAM FORMAT DATUMA GDE POSTOJI, KONTROLISEM DA LI POSTOJI BROJ FAKTURE I DODAJEM REDNI BROJ ZA PRVU KOLONU TABELE
        for(var i=0; i<response.data.fakture.length; i++){
          let faktura=response.data.fakture[i];
          faktura.expanded=false;
          // REDNI BROJ FAKTURE NA TABELI
          faktura.redniBroj=i+1;
          faktura.isteklaValuta=false;
          if (faktura.fak_status == 2) {
            if (new Date() >= new Date(faktura.fak_valuta)) {
              faktura.isteklaValuta = true;

            }
          }
          else {
            // RASTAVLJAM DATUM NA OSNOVU MINUSA
            faktura.fak_datumIzdavanja = faktura.fak_datumIzdavanja.split('-');
            // ISPISUJEM DATUM U FORMATU KOJI ZELIM PREKO TRENUTNOG PRIKAZA
            faktura.fak_datumIzdavanja = faktura.fak_datumIzdavanja[2] + '.' + faktura.fak_datumIzdavanja[1] + '.' + faktura.fak_datumIzdavanja[0] + '.';
          } // RASTAVLJAM DATUM NA OSNOVU MINUSA
          faktura.fak_datumPrometaIspis = faktura.fak_datumPrometa.split('-');
          // ISPISUJEM DATUM U FORMATU KOJI ZELIM PREKO TRENUTNOG PRIKAZA
          faktura.fak_datumPrometaIspis = faktura.fak_datumPrometaIspis[2] + '.' + faktura.fak_datumPrometaIspis[1] + '.' + faktura.fak_datumPrometaIspis[0] + '.';
          // RASTAVLJAM DATUM NA OSNOVU MINUSA
          faktura.fak_valutaIspis = faktura.fak_valuta.split('-');
          // ISPISUJEM DATUM U FORMATU KOJI ZELIM PREKO TRENUTNOG PRIKAZA
          faktura.fak_valutaIspis = faktura.fak_valutaIspis[2] + '.' + faktura.fak_valutaIspis[1] + '.' + faktura.fak_valutaIspis[0] + '.';
          // DA LI POSTOJI BROJ FAKTURE?
          if (faktura.fak_brojFakture === null) {
            faktura.fak_brojFakture = 'Samo izdate fakture mogu imati broj.'
            faktura.fak_datumIzdavanja = 'Samo izdate fakture mogu imati datum izdavanja.'
          }

          // OMOGUCAVA SORTIRANJE STAVKI FAKTURA PO UKUPNOJ CENI
          for(var stavkeFakture of faktura.stavkeFakture){
            stavkeFakture.ukupno=stavkeFakture.usp_cena*stavkeFakture.usp_kolicina;
          }
        }
        this.fakture = response.data.fakture;
      });
    },
    izmeniFakturu(index) {
      this.novafaktura = false;
      this.komitentId = this.fakture[index].kom_id;
      this.datumPrometa = this.fakture[index].fak_datumPrometa;
      this.datumValute = this.fakture[index].fak_valuta;
      this.mesto = this.fakture[index].fak_mestoPrometa;
      this.idFakture = this.fakture[index].fak_id;
      this.promenljiva = 1;
      for (var j = 0; j < this.fakture[index].stavkeFakture.length; j++) {
        this.ukupno += this.fakture[index].stavkeFakture[j].usp_cena * this.fakture[index].stavkeFakture[j].usp_kolicina;
        this.proizvodi.push({
          naziv: this.fakture[index].stavkeFakture[j].usp_naziv,
          cena: this.fakture[index].stavkeFakture[j].usp_cena,
          mera: this.fakture[index].stavkeFakture[j].usp_mera,
          kolicina: this.fakture[index].stavkeFakture[j].usp_kolicina,
          ukupnaCena: this.fakture[index].stavkeFakture[j].usp_cena * this.fakture[index].stavkeFakture[j].usp_kolicina


        })
      }
    },

    fakturisiDraft(fakId) {
      axios.post("http://837s121.mars-e1.mars-hosting.com/postInvoice", {
        sid: localStorage.getItem('sessionid'),
        fakId

      }).then(response => {
          setTimeout(this.preuzmiFakture, 700);
      });

    },


    dodajProizvod() {

      if (this.proizvodNazivUsluge === '' || this.proizvodJedinicaMere === '' || this.proizvodKolicina === '' || this.proizvodJedinicnaCena === '') {
        alert('Morate popuniti sve podatke vezane za proizvod!');
      } else {
        var noviProizvod = {
          tip: this.tipTrenutnaVrednost,
          naziv: this.proizvodNazivUsluge,
          mera: this.proizvodJedinicaMere,
          kolicina: this.proizvodKolicina,
          cena: this.proizvodJedinicnaCena,
          ukupnaCena: this.proizvodKolicina * this.proizvodJedinicnaCena
        }
        this.proizvodi.push(noviProizvod);
        // DODAJEM NA UKUPNU CENU FAKTURE
        this.ukupno += this.proizvodKolicina * this.proizvodJedinicnaCena;
        this.promenljiva = this.proizvodi.length;
      }
    },
    ukloniStavku(stavka) {
      const zaBrisanje = this.proizvodi.indexOf(stavka)
      confirm('Da li ste sigurni?') && this.proizvodi.splice(zaBrisanje, 1)
      this.ukupno -= stavka.ukupnaCena;
      if (this.proizvodi.length == 0) {
        this.promenljiva = '';
      }
    },
    posaljiFakturu(statusFakture) {

      if (new Date(this.datumPrometa) >= new Date(this.datumValute)) {
        alert('Datum valute ne moze biti pre datuma prometa.')
      }
      // SVE KONTROLE SU USPESNE
      else {
        if (statusFakture === 1) {
          axios.post("http://837s121.mars-e1.mars-hosting.com/postInvoice", {
              sid: localStorage.getItem('sessionid'),
              valuta: this.datumValute,
              datumPrometa: this.datumPrometa,
              mestoPrometa: this.mesto,
              total: this.ukupno,
              statusFakture: statusFakture,
              uputstva: this.opisFakture,
              komId: this.komitentId,
              stavkeFakture: this.proizvodi,
              fakId: this.idFakture
            })
            .then(response => {
              if (response.data.status) {
                alert('Uspesno ste uneli fakturu. Broj fatkure: ' + response.data.brojFakture);
                this.preuzmiFakture();
                this.novafaktura = true;
              } else {
                alert('Doslo je do greske, faktura nije uneta.');
              }
            });
        } else {
          // CUVAM FAKTURU KAO NACRT
          axios.post("http://837s121.mars-e1.mars-hosting.com/postTemplate", {
              sid: localStorage.getItem('sessionid'),
              valuta: this.datumValute,
              datumPrometa: this.datumPrometa,
              mestoPrometa: this.mesto,
              total: this.ukupno,
              statusFakture: statusFakture,
              uputstva: this.opisFakture,
              komId: this.komitentId,
              stavkeFakture: this.proizvodi,
              fakId: this.idFakture
            })
            .then(response => {

              this.preuzmiFakture();
              this.novafaktura = true;
            });
        }
        this.proizvodi=[];
        this.ukupno=0;

      }
    },
    dugmeStoriniranjeFakture(faktura) {
      this.odabranaFaktura = faktura;
      this.modal2 = true;

    },
    storiniranjeFakture(n) {
      if(confirm('Da li ste sigurni?')){
        if (n) {
          axios.post("http://837s121.mars-e1.mars-hosting.com/cancelInvoice", {
              sid: localStorage.getItem('sessionid'),
              fakId: n
            })
            .then(response => {

              this.preuzmiFakture();
            });
        }
        this.modal2 = false;
      }
    }
  },
  mounted() {
    // PREUZIMA SVE FAKTURE
    this.preuzmiFakture();
    this.danasnjiDatum = new Date().toISOString().split('T')[0];

    this.datumPrometa = new Date().toISOString().split('T')[0];

    axios.get("http://837s121.mars-e1.mars-hosting.com/getComittents", {
      params: {
        sid: localStorage.getItem('sessionid')
      }
    }).then(response => {
      this.komitenti = response.data.komitenti;
    });
    // POPUNJAVANJE SELEKTA GRADOVI
    axios.get("http://837s121.mars-e1.mars-hosting.com/getCity")
      .then(response => {
        this.mesta = response.data.gradovi;
      });
  },
}
</script>
<style scoped>
.faktura__naslov{
  font-weight: 300;
}

.nevidljiviInput {
  display: none;
}

.forma{
  width: 90vw;
  margin: auto;
  margin-top: 10px;
}

.tabela{
  max-width: inherit;
}

.tabela__ukupno{
  font-weight: 300;
}

.tabela__red:hover{
  cursor: pointer;
}

.storno {
  color: #f10000;
  border: 3px ridge #f10000;
  border-radius: 4px;
  min-height: 30px;

}

.izrada {
  color: #2980b9;
  border: 3px ridge #2980b9;
  border-radius: 4px;
  min-height: 30px;

}

.klasa {
  width: 60%;
  background-color: red;
  color: white !important;
  text-align: center;
  transform: rotateZ(25deg);

  border-radius: 5px;
}

.fadeIn {
  animation: test 0.5s;
}

/* RESETOVANJE STILOVA */

.listaFaktura {
  opacity: 0.9;
  border-radius: 6px;
  max-width: 100%;
}

/* DUGME IKS PRILIKOM PRAVLJENJA FAKTURE */
.iks {
  cursor: pointer;

}

.iks:hover {
  transform: scale(1.4);
}

@keyframes test {
  from {
    transform: scale(0.9);
    opacity: 0.8;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }

}

/* GAZIM STILOVE SA DRUGIH FAJLOVA */
.active{
  background-color: white;
}
.v-datatable__actions__pagination{
  display: none;
}

/* STIL ZA TABELU */
th {
  padding: 5px;
}

.theme--light.v-table {
  cursor: pointer;
}

@media (min-width: 0) .flex .xs2 {
  max-width: 20%;
}

/* MODAL ZA BRISANJE FAKTURE */
.modal {
  width: 50%;
  z-index: 100;
  opacity: 1;
  top: 30%;
  left: 25%;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: white;
  -webkit-box-shadow: 0px 2px 241px -3px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 2px 241px -3px rgba(0, 0, 0, 1);
  box-shadow: 0px 2px 241px -3px rgba(0, 0, 0, 1);
  position: fixed;
}

.legendIcon--dimensions{
  height: 14px;
  width: 14px;
}

.vertical_align{
  vertical-align: center;
}
</style>
