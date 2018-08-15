<template>
  <v-container grid-list-md text-xs_left>
      <v-layout row wrap>
      <v-flex xs6>
        <v-text-field
            v-model="etf1"
            label="ETF 1">
          </v-text-field>
          <v-btn color="info" @click.native="loadEtf1">Load</v-btn>
          <v-data-table
          :headers="headers"
          :items="isActive == false ?  etf1Holdings: commenEtf1"
          hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td v-html="props.item.holding" ></td>
            <td v-html="props.item.ticker" ></td>
            <td class="text-xs-left">{{ props.item.weight }}</td>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          v-model="etf2"
          label="ETF 2">
          </v-text-field>
          <v-btn color="info" @click.native="loadEtf2">Load</v-btn>
           <v-btn @click.native='isActive = !isActive' 
           :color='isActive ? "info":""'>
           show overlap</v-btn>
          <v-data-table
          :headers="headers"
          :items="isActive == false ?  etf2Holdings: commenEtf2"
          hide-actions
          class="elevation-1">
          <template slot="items" slot-scope="props">
            <td v-html="props.item.holding" ></td>
            <td v-html="props.item.ticker" ></td>
            <td class="text-xs-left">{{ props.item.weight }}</td>
          </template>
        </v-data-table>
      </v-flex>  
    </v-layout>
  </v-container>
</template>

<script>
import { getHoldings} from "./etfDb";
export default {
  data() {
    return {
      headers: [
        { text: "holding", value: "holding" },
        {text:"ticker",value:"ticker"},
        { text: "weight", value: "weight" },
        
      ],
      isActive:false,

      etf1: "",
      etf2: "",
      etf1Holdings: [],
      etf2Holdings: [],

    };
  },
  methods: {
    async loadEtf1() {
      let res = await getHoldings(this.etf1);
      this.etf1Holdings = res;
    },
    async loadEtf2() {
      let res = await getHoldings(this.etf2);
      this.etf2Holdings = res;
    }
  },
  computed: {
  commenEtf1: function () {
    let foundEtf1 = []
    this.etf1Holdings.forEach(e1 => this.etf2Holdings.forEach(e2=>{
      if (e1.holding==e2.holding){
        foundEtf1.push(e1)
        }
    }))
    return foundEtf1
  },
    commenEtf2: function () {
    let foundEtf2 = []
    this.etf1Holdings.forEach(e1 => this.etf2Holdings.forEach(e2=>{
      if (e1.holding==e2.holding){
        foundEtf2.push(e2)
        }
    }))
    return foundEtf2
  }
}
};
</script>
