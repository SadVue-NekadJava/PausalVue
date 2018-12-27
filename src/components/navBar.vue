<template>

  <div class="main ">


    <v-navigation-drawer  class="opacity" temporary
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>


<v-list-group
  no-action
  prepend-icon="settings"
>

<v-list-tile slot="activator">
  <v-list-tile-title>Podesavanja</v-list-tile-title>
</v-list-tile>
  <v-list-tile to="/MojaFirma" >
    <v-list-tile-title>Moja Firma</v-list-tile-title>
  </v-list-tile>
  <v-list-tile to="/MojiPodaci">
    <v-list-tile-title>Moji Podaci</v-list-tile-title>
  </v-list-tile>
</v-list-group>







        <v-list-tile @click="logout"  class="white--text secondary" >
          <v-list-tile-action>
          </v-list-tile-action>
          <v-list-tile-title >Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar  class=" elevation-15" >
      <v-toolbar-side-icon
       class="hidden-md-and-up" @click="drawer = !drawer">
     </v-toolbar-side-icon>
      <v-toolbar-title><router-link to="/home" tag="span" style="cursor:pointer;">Pausalac</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="(item,i) in items" :key="i" :to="item.to"><v-icon left>{{item.icon}}</v-icon>{{item.title}}</v-btn>
        <v-menu offset-y open-on-hover
          transition="slide-y-transition">
              <v-btn
                slot="activator">
                <v-icon left>settings</v-icon>
                Podesavanje
              </v-btn>
              <v-list   >
                <v-list-tile

            to="/MojaFirma">
                  <v-list-tile-title>Moja Firma</v-list-tile-title>
                </v-list-tile>
                <v-list-tile
            to="/MojiPodaci">
                  <v-list-tile-title  >Moji Podaci</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>








<v-btn @click="logout" color="secondary">logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>



      </div>


</template>

<script>
export default {
  data () {
    return {

      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { icon: 'description', title: 'Fakture', to: '/Fakture' },
        { icon: 'folder_special', title: 'Porez', to: '/Porez' },
          { icon: 'account_box', title: 'Komitenti', to: '/Komitenti' },
                  // { icon: 'local_hospital', title: 'Zdravstvene knjizice', to: '/ZKnjizice' }
                          // { icon: 'business', title: 'Moja Firma', to: '/MojaFirma' },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },




  mounted(){

  },
  methods:{
    logout(){
      axios.get("http://837s121.mars-e1.mars-hosting.com/logout",{
                    params:{ sid: localStorage.getItem('sessionid')  }
                   }).then(response => {

                   });
      localStorage.removeItem('sessionid');
      this.logged=false;
      this.$router.push('/');
            this.$store.commit('changeFalse');
    }
  }
}
</script>

<style  >
html{
font-family: 'Patua One', cursive;
}
.opacity{
opacity:0.85;
}

/* .main{
background-image: url('../assets/officeBg1.jpg');
background-size: cover;
background-repeat: no-repeat;
background-position: center;
background-attachment: fixed;
width:100%;
min-height: 100vh;

} */
.forma {
background-color: rgba(255, 255, 255, 1);
/* border-radius: 10px; */
border: 1px solid light-green;
}

</style>
