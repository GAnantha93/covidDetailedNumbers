<template>
  <main v-if="!loading">
    <DataTitle :text="title" :dataDate="dataDate" @get-country="getCountryData" :countries="countries"></DataTitle>
    <div class="text-right">
      <button class="bg-green-700 text-white rounded p-3 mb-5 mr-2 focus:outline-none hover:bg-green-600" v-if="title == 'India'" @click="goToIndia">
        Get Detailed Values
      </button>
      <button class="bg-red-700 text-white rounded p-3 mb-5 focus:outline-none hover:bg-red-600" v-if="title != 'Global'" @click="ClearCountryData">
        Clear Country
      </button>
    </div>
    <DataBoxes :stats="status"></DataBoxes>
  </main>
  
  <main class="flex flex-col align-center justify-center text-center" v-else>
    <div class="text-gray-500 text-3xl mt-10 mb-6">
      Fetching Data
    </div>
    <img :src="loadingImage" class="w-60 m-auto" alt=""/>
  </main>

</template>

<script>
import DataTitle from '@/components/DataTitle'
import DataBoxes from '@/components/DataBoxes'
export default {
  name: 'Home',
  components: {DataTitle, DataBoxes},
  data() {
    return {
      loading: true,
      title: 'Global',
      dataDate: '',
      status: {},
      countries: [],
      loadingImage: require('../assets/loader.gif')
    }
  },
  methods: {
    async fetchCovidData(){
      const res = await fetch('https://api.covid19api.com/summary')
      const data = await res.json()
      this.dataDate = data.Date;
      this.status = data.Global;
      this.countries = data.Countries;
      this.loading = false;
     },
     getCountryData(country){
       this.status = country;
       this.title = country.Country;
     },
     async ClearCountryData(){
       this.loading = true;
       this.fetchCovidData();
       this.title = 'Global';
     },
     goToIndia(){
       this.$router.push('IndiaDetailed');
     }
  },
  created(){
    this.fetchCovidData();
  }
}
</script>
