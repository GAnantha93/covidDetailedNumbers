<template>
  <main v-if="!loading">
    <DataTitle :text="title" :dataDate="dataDate" @get-country="getCountryData" :countries="statesDpdn"></DataTitle>
    <div class="text-right">
      <button class="bg-green-700 text-white rounded p-3 mb-5 mr-2 focus:outline-none hover:bg-green-600" v-if="title != 'India'" @click="getStateDetails">
        Get Detailed Values
      </button>
      <button class="bg-red-700 text-white rounded p-3 mb-5 focus:outline-none hover:bg-red-600" v-if="title != 'India'" @click="ClearCountryData">
        Clear State
      </button>
    </div>
    <IndiaBoxes :stats="status" :states="states" :title="title" :stateID="stateID"></IndiaBoxes>
  </main>
  
  <main class="flex flex-col align-center justify-center text-center" v-else>
    <div class="text-gray-500 text-3xl mt-10 mb-6">
      Fetching Data
    </div>
    <img :src="loadingImage" class="w-24 m-auto" alt=""/>
  </main>

</template>

<script>
import DataTitle from '@/components/DataTitle'
import IndiaBoxes from '@/components/IndiaBoxes'
export default {
  name: 'IndiaDetailed',
  components: {DataTitle, IndiaBoxes},
  data() {
    return {
        loading: true,
        title: 'India',
        stateID: '',
        dataDate: '',
        status: {},
        countries: [],
        loadingImage: require('../assets/loader.gif'),
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
        states: {
            AP: 'Andhra Pradesh',
            AN: 'Andaman and Nicobar Islands',
            AR: 'Arunachal Pradesh',
            AS: 'Assam',
            BR: 'Bihar',
            CH: 'Chandigarh',
            CT: 'Chhattisgarh',
            DL: 'Delhi',
            DN: 'Dadra and Nagar Haveli and Daman and Diu',
            GA: 'Goa',
            GJ: 'Gujarat',
            HP: 'Himachal Pradesh',
            HR: 'Haryana',
            JH: 'Jharkhand',
            JK: 'Jammu and Kashmir',
            KA: 'Karnataka',
            KL: 'Kerala',
            LA: 'Ladakh',
            LD: 'Lakshadweep Islands',
            MH: 'Maharashtra',
            ML: 'Meghalaya',
            MP: 'Madhya Pradesh',
            MN: 'Manipur',
            MZ: 'Mizoram',
            NL: 'Nagaland',
            OR: 'Odisha',
            PB: 'Punjab',
            PY: 'Puducherry',
            RJ: 'Rajasthan',
            SK: 'Sikkim',
            TG: 'Telangana',
            TN: 'Tamil Nadu',
            TR: 'Tripura',
            UP: 'Uttar Pradesh',
            UT: 'Uttarakhand',
            WB: 'West Bengal'
        }
    }
  },
  methods: {
    async fetchCovidData(){
      const res = await fetch('https://data.covid19india.org/v4/min/data.min.json');
      const data = await res.json();
      delete data.tt;
      this.status = data;
      this.loading = false;
     },
     getCountryData(state){
       this.title = state.Country;
       this.stateID = state.ID;
     },
     async ClearCountryData(){
       this.loading = true;
       this.fetchCovidData();
       this.title = 'India';
       this.stateID = '';
     },
     getStateDetails(){
       this.$router.replace({name:'StateDetails', params: {stateIDgiven: this.stateID, statesName: this.title}});
     }
  },
  created(){
    this.fetchCovidData();
    this.dataDate = new Date();
  }
}
</script>