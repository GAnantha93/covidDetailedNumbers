<template>
    <div class="">
        <DataTitle :text="title" :dataDate="dataDate" @get-country="getCountryData" :countries="statesDpdn"></DataTitle>
        <div class="grid md:grid-cols-1 mb-10 gap-4">
            <div class="border-2 rounded mb-2" v-for="(data, variableName, index) in status" :key="index">
                <div v-if="variableName != 'Foreign Evacuees'">
                    <div v-if="variableName != 'Other State'">
                        <div class="bg-gradient-to-r from-green-400 to-blue-500 text-3xl text-center text-white p-4 font-bold rounded">
                            {{variableName}}
                        </div>
                        <div class="text-lg p-2 border-2 rounded grid md:grid-cols-3 gap-4">
                            <div class="mb-4 text-center">
                                <span class="font-bold text-3xl text-blue-500">
                                    Today
                                </span>
                                <div class="grid sm:grid-cols-2 mt-2" v-for="(val, varb, indx) in data.delta" :key="indx">
                                    <span class="font-bold md:text-right text-left">
                                        {{Headings[varb]}} : 
                                    </span>
                                    <span class="text-left mb-4 md:mb-0 ml-1">
                                        {{val}}
                                    </span>
                                </div>
                            </div>
                            <div class="mb-4 text-center">
                                <span class="font-bold text-3xl text-blue-500">
                                    Last 7 days
                                </span>
                                <div class="grid sm:grid-cols-2 mt-2" v-for="(val, varb, indx) in data.delta7" :key="indx">
                                    <span class="font-bold md:text-right text-left">
                                        {{Headings[varb]}} : 
                                    </span>
                                    <span class="text-left mb-4 md:mb-0 ml-1">
                                        {{val}}
                                    </span>
                                </div>
                            </div>
                            <div class="mb-4 text-center">
                                <span class="font-bold text-3xl text-blue-500">
                                    Total
                                </span>
                                <div class="grid sm:grid-cols-2 mt-2" v-for="(val, varb, indx) in data.total" :key="indx">
                                    <span class="font-bold md:text-right text-left">
                                        {{Headings[varb]}} : 
                                    </span>
                                    <span class="text-left mb-4 md:mb-0 ml-1">
                                        {{val}}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import DataTitle from '@/components/DataTitle'
import IndiaBoxes from '@/components/IndiaBoxes'
import { constants } from 'fs';
export default {
  name: 'StateDetails',
  components: {DataTitle, IndiaBoxes},
  data() {
    return {
        loading: true,
        title: this.statesName,
        stateID: '',
        dataDate: '',
        status: {},
        today: {},
        total: {},
        countries: [],
        loadingImage: require('../assets/loader.gif'),
        Headings: {
            confirmed: 'Confirmed',
            deceased: 'Deceased',
            recovered: 'Recovered',
            tested: 'Tested',
            vaccinated1: '1st Dose Vaccinated',
            vaccinated2: '2nd Dose Vaccinated'
        },
        allStatesData: {},
        statesDpdn: [
            {ID: 'AP', Country: 'Andhra Pradesh'},
            {ID: 'AN', Country: 'Andaman and Nicobar Islands'},
            {ID: 'AR', Country: 'Arunachal Pradesh'},
            {ID: 'AS', Country: 'Assam'},
            {ID: 'BR', Country: 'Bihar'},
            {ID: 'CH', Country: 'Chandigarh'},
            {ID: 'CT', Country: 'Chhattisgarh'},
            {ID: 'DL', Country: 'Delhi'},
            {ID: 'DN', Country: 'Dadra and Nagar Haveli and Daman and Diu'},
            {ID: 'GA', Country: 'Goa'},
            {ID: 'GJ', Country: 'Gujarat'},
            {ID: 'HP', Country: 'Himachal Pradesh'},
            {ID: 'HR', Country: 'Haryana'},
            {ID: 'JH', Country: 'Jharkhand'},
            {ID: 'JK', Country: 'Jammu and Kashmir'},
            {ID: 'KA', Country: 'Karnataka'},
            {ID: 'KL', Country: 'Kerala'},
            {ID: 'LA', Country: 'Ladakh'},
            {ID: 'LD', Country: 'Lakshadweep Islands'},
            {ID: 'MH', Country: 'Maharashtra'},
            {ID: 'ML', Country: 'Meghalaya'},
            {ID: 'MP', Country: 'Madhya Pradesh'},
            {ID: 'MN', Country: 'Manipur'},
            {ID: 'MZ', Country: 'Mizoram'},
            {ID: 'NL', Country: 'Nagaland'},
            {ID: 'OR', Country: 'Odisha'},
            {ID: 'PB', Country: 'Punjab'},
            {ID: 'PY', Country: 'Puducherry'},
            {ID: 'RJ', Country: 'Rajasthan'},
            {ID: 'SK', Country: 'Sikkim'},
            {ID: 'TG', Country: 'Telangana'},
            {ID: 'TN', Country: 'Tamil Nadu'},
            {ID: 'TR', Country: 'Tripura'},
            {ID: 'UP', Country: 'Uttar Pradesh'},
            {ID: 'UT', Country: 'Uttarakhand'},
            {ID: 'WB', Country: 'West Bengal'}
        ],
    }
  },
  props:{
      stateIDgiven: '',
      statesName: '',
  },
  methods: {
    async fetchCovidData(){
      const res = await fetch('https://data.covid19india.org/v4/min/data.min.json');
      const data = await res.json();
      this.allStatesData = data;
      delete data.tt;
      this.status = data[this.stateIDgiven].districts;
      this.loading = false;
     },
     getCountryData(state){
       this.title = state.Country;
       this.stateID = state.ID;
       this.status = this.allStatesData[state.ID].districts;
     },
     async ClearCountryData(){
       this.loading = true;
       this.fetchCovidData();
       this.title = 'India';
       this.stateID = '';
       this.getIndiaValues();
     },
     getStateValues(){
        this.today.confirmed = this.stats[this.stateID].delta7.confirmed;
        this.today.recovered = this.stats[this.stateID].delta7.recovered;
        this.today.deceased = this.stats[this.stateID].delta7.deceased;
        this.today.vaccinated1 = this.stats[this.stateID].delta7.vaccinated1;
        this.today.vaccinated2 = this.stats[this.stateID].delta7.vaccinated2;
        this.total.confirmed = this.stats[this.stateID].total.confirmed;
        this.total.recovered = this.stats[this.stateID].total.recovered;
        this.total.deceased = this.stats[this.stateID].total.deceased;
        this.total.vaccinated1 = this.stats[this.stateID].total.vaccinated1;
        this.total.vaccinated2 = this.stats[this.stateID].total.vaccinated2;
    },
    getIndiaValues(){
        this.today.confirmed = this.stats.TT.delta7.confirmed;
        this.today.recovered = this.stats.TT.delta7.recovered;
        this.today.deceased = this.stats.TT.delta7.deceased;
        this.today.vaccinated1 = this.stats.TT.delta7.vaccinated1;
        this.today.vaccinated2 = this.stats.TT.delta7.vaccinated2;
        this.total.confirmed = this.stats.TT.total.confirmed;
        this.total.recovered = this.stats.TT.total.recovered;
        this.total.deceased = this.stats.TT.total.deceased;
        this.total.vaccinated1 = this.stats.TT.total.vaccinated1;
        this.total.vaccinated2 = this.stats.TT.total.vaccinated2;
    },
  },
  created(){
    if(this.stateIDgiven == undefined){
        this.$router.push('IndiaDetailed');
    }
    this.fetchCovidData();
    this.dataDate = new Date();
  }
}
</script>
