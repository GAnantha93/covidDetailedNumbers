<template>
    <div class="grid md:grid-cols-2 gap-4">
        <div class="text-center">
            <h2 class="text-3xl font-bold">
                {{text}}
            </h2>
            <div class="text-2xl mt-4 mb-10">
                {{timestamp}}
            </div>
        </div>
        <select v-model="selected" @change="onChange" class="form-select mt-2 mb-12 block w-full border-2 p-3 rounded">
            <option value="0" v-if="$router.currentRoute.value.name == 'IndiaDetailed'">Select State</option>
            <option value="0" v-else-if="$router.currentRoute.value.name == 'StateDetails'">Select State</option>
            <option value="0" v-else>Select Country</option>
            <option v-for="country in countries" :value="country.ID">{{country.Country}}</option>
        </select>
    </div>
</template>

<script>
import moment from 'moment'
import { PatchFlagNames } from '@vue/shared';
export default {
    name: 'DataTitle',
    props: {
        text : '',
        dataDate : '',
        countries : [],
    },
    data() {
        return {
            selected: 0,
        }
    },
    computed: {
        timestamp: function() {
            return moment(this.dataDate).format('MMMM Do YYYY, h:mm:ss A')
        }
    },
    methods:{
        onChange(){
            const country = this.countries.find((item) => item.ID === this.selected)            
            this.$emit('get-country', country)
        }
    }
}
</script>
