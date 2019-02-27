<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-btn color="pink" slot="activator" dark absolute bottom right fab>
        <v-icon>add</v-icon>
      </v-btn>

      <v-card>
        <v-card-title class="headline">Envoyer de nouveaux fichiers</v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-layout>
                <v-flex xs12 md4>
                  <v-btn color @click="$refs.inputUpload.click()">Ajouter un fichier</v-btn>
                  <input v-show="false" ref="inputUpload" type="file" @change="addFiles" multiple>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>

          <v-container>
            <v-layout>
              <v-flex xs12 md4>
                <v-list class="pt-0" dense>
                  <v-list-tile v-for="file in files" :key="file.name">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ file.name }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click="dialog = false">Annuler</v-btn>
          <v-btn color="green darken-1" flat @click="sendFiles">Envoyer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      :left="true"
      :timeout="3000"
      :color="this.snackColor"
    >{{ snackText }}</v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      files: [],
      snackbar: false,
      snackText: "Hello, I'm a snackbar",
      snackColor: "red darken-1"
    };
  },
  methods: {
    addFiles() {
      for (var i = 0; i < this.$refs.inputUpload.files.length; i++) {
        var element = this.$refs.inputUpload.files.item(i);
        for (var file = 0; file < this.files.length; file++) {
          if (this.files[file].name == element.name) {
            this.snackbar = false;
            this.snackColor = "red darken-1"
            this.snackText = "Un des fichiers ajouté existe deja : Ignoré";
            this.snackbar = true;
            return;
          }
        }
        this.files.push(element);
      }
    },

    sendFiles() {
      this.snackbar = false;
      this.snackColor = "green darken-1"
      this.snackText = "Envoi des fichiers en cours";
      this.snackbar = true;
    }
  }
};
</script>