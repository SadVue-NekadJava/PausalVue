<template>
  <div >
    <template>
      <v-container class="forma" mt-5>
<v-flex class=" text-xs-center mb-5" >
<v-btn dark color="success">Dodaj novu knjizicu  </v-btn>
</v-flex>

<v-layout class="justify-center" >

  <v-flex  sm4>
<v-toolbar>
  <v-toolbar-title>
    <v-icon large class="primary grey--text text--lighten-4">local_hospital</v-icon></v-toolbar-title>
  <v-spacer></v-spacer>
    <v-toolbar-items>
          <v-btn  icon  >
      <v-icon color="primary">refresh</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon color="primary">edit</v-icon>
    </v-btn>
    </v-toolbar-items>
    <v-btn icon>
      <v-icon color="primary">delete</v-icon>
    </v-btn>
</v-toolbar>
<v-card>
 <v-container
   fluid
   grid-list-lg
 >
   <v-layout row wrap>
     <v-flex xs12 >
       <v-card color=""  class="grey lighten-4 text-xs-center pa-3">
          <h2>Ime Roditelj prezime</h2>
           <h5><em>(Ime,ime rodtelja, prezime)</em></h5>




       </v-card>
     </v-flex>

     <v-flex xs12>
       <v-card color="grey lighten-5" class=" text-xs-center pa-2">
         <v-layout>

           <v-flex xs12>

               <div>
                 <h2>51587795844</h2>
<h5><em>(JMBG/Broj Pasosa)</em></h5>
               </div>

           </v-flex>
         </v-layout>

       </v-card>
     </v-flex>

     <v-flex xs12>
       <v-card color="" class=" pa-3 text-xs-center">
         <v-layout row>
           <v-flex xs12>

               <div >
              <h2>Mite Balije 12, Beograd</h2>
              <h5 ><em>(Adresa, mesto)</em></h5>

               </div>

           </v-flex>

         </v-layout>


       </v-card>
     </v-flex>
   </v-layout>
 </v-container>
</v-card>
  </v-flex>
</v-layout>





      <!-- <v-layout row>


        <div
        id="e3"
        style="max-width: 400px; margin: auto;"
        class="grey lighten-3"
      >
            <v-toolbar color="grey lighten-2"   >
              <v-toolbar-title>
                <v-icon large class="red blue-grey--text text--lighten-4">local_hospital</v-icon></v-toolbar-title>
              <v-spacer></v-spacer>
                <v-toolbar-items>
                      <v-btn  icon  >
                  <v-icon>refresh</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>edit</v-icon>
                </v-btn>
                </v-toolbar-items>
                <v-btn icon>
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-toolbar>


              <v-card>
               <v-container
                 fluid
                 grid-list-lg
               >
                 <v-layout row wrap>
                   <v-flex xs12 >
                     <v-card color="blue-grey darken-2 "  class="white--text text-xs-center pa-3">
                        <h2>Ime Roditelj prezime</h2>
                         <h5><em>(Ime,ime rodtelja, prezime)</em></h5>




                     </v-card>
                   </v-flex>

                   <v-flex xs12>
                     <v-card color="blue-grey" class="white--text text-xs-center pa-2">
                       <v-layout>

                         <v-flex xs12>

                             <div>
                               <h2>51587795844</h2>
   <h5><em>(JMBG/Broj Pasosa)</em></h5>
                             </div>

                         </v-flex>
                       </v-layout>

                     </v-card>
                   </v-flex>

                   <v-flex xs12>
                     <v-card color="blue-grey lighten-2" class="white--text pa-3 text-xs-center">
                       <v-layout row>
                         <v-flex xs12>

                             <div >
                            <h2>Mite Balije 12, Beograd</h2>
                            <h5 ><em>(Adresa, opstina, mesto)</em></h5>

                             </div>

                         </v-flex>

                       </v-layout>


                     </v-card>
                   </v-flex>
                 </v-layout>
               </v-container>
             </v-card>
        </div>

        <v-flex xs4 sm3 ma-5 >
          <v-card>
            <v-toolbar color="grey lighten-2"   >


              <v-toolbar-title>
                <v-icon  color="red"  >local_hospital</v-icon></v-toolbar-title>
              <v-spacer></v-spacer>
                <v-toolbar-items>
                      <v-btn  icon  >
                  <v-icon>refresh</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>edit</v-icon>
                </v-btn>
                </v-toolbar-items>
                <v-btn icon>
                  <v-icon>delete</v-icon>
                </v-btn>
              </v-toolbar>

            <v-list>
              <v-list-tile>
                <v-list-tile-action>
                  <h3>  Ime i prezime</h3>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title ></v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-avatar>
                </v-list-tile-avatar>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout> -->
          </v-container>
    </template>



  </div>
</template>

<script>


export default{
  components:{

  }
}

</script>
