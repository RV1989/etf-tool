<template>
  <v-app>
    <v-toolbar
      app
    >
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    
    </v-toolbar>
    <v-content>
        <v-container>
           <etfCompare/>
        </v-container>
    </v-content>
    
  </v-app>
</template>

<script>
import etfCompare from './components/etfCompare'

export default {
  name: 'App',
  components: {
    etfCompare
  },
  data () {
    return {
      title: 'Etf Tool'
    }
  }
}
</script>
