<template>
    <div>
        <div class="grid md:grid-cols-1 mb-10 gap-4">
            <div class="border-4 border-blue-300 border-opacity-60 rounded mb-2">
                <div class="bg-gradient-to-r from-green-400 to-blue-500 text-3xl text-center text-white p-4 font-bold rounded">
                    {{title}}
                </div>
                <div class="p-2 rounded grid md:grid-cols-2 gap-4">
                    <div class="text-2xl mb-4 text-center">
                        <span class="font-bold text-3xl  text-blue-500">
                            Today
                        </span>
                        <div class="grid sm:grid-cols-2 mt-2">
                            <span class="font-bold md:text-right text-left">
                                Confirmed : 
                            </span>
                            <span class="text-left mb-4 md:mb-0" v-if="today.confirmed!=undefined">
                                {{today.confirmed}}
                            </span>
                            <span class="text-left mb-4 md:mb-0" v-else>0</span>
                        </div>
                        <div class="grid sm:grid-cols-2">
                            <span class="font-bold md:text-right text-left">
                                Recovered : 
                            </span>
                            <span class="text-left mb-4 md:mb-0" v-if="today.recovered!=undefined">
                                {{today.recovered}}
                            </span>
                            <span class="text-left mb-4 md:mb-0" v-else>0</span>
                        </div>
                        <div class="grid sm:grid-cols-2">
                            <span class="font-bold md:text-right text-left">
                                Deaths : 
                            </span>
                            <span class="text-left mb-4 md:mb-0" v-if="today.deceased!=undefined">
                                {{today.deceased}}
                            </span>
                            <span class="text-left mb-4 md:mb-0" v-else>0</span>
                        </div>
                        <div class="grid sm:grid-cols-2">
                            <span class="font-bold md:text-right text-left">
                                1<sup>st</sup> Dose Vaccinated : 
                            </span>
                            <span class="text-left mb-4 md:mb-0">
                                {{today.vaccinated1}}
                            </span>
                        </div>
                        <div class="grid sm:grid-cols-2">
                            <span class="font-bold md:text-right text-left ">
                                2<sup>nd</sup> Dose Vaccinated : 
                            </span>
                            <span class="text-left mb-4 md:mb-0">
                                {{today.vaccinated2}}
                            </span>
                        </div>
                    </div>
                    <div class="text-2xl mb-4 text-center">
                        <span  class="font-bold text-3xl text-blue-500">
                            Total
                        </span>
                        <div class="mt-2 grid sm:grid-cols-2">
                            <span class="font-bold md:text-right text-left">
                                Confirmed : 
                            </span>
                            <span class="text-left mb-4 md:mb-0">
                                {{total.confirmed}}
                            </span>
                        </div>
                        <div class="grid sm:grid-cols-2">
                            <span class="font-bold md:text-right text-left ">
                                Recovered : 
                            </span>
                            <span class="text-left mb-4 md:mb-0">
                                {{total.recovered}}
                            </span>
                        </div>
                        <div class="grid sm:grid-cols-2">
                            <span class="font-bold md:text-right text-left">
                                Deaths : 
                            </span>
                            <span class="text-left mb-4 md:mb-0">
                                {{total.deceased}}
                            </span>
                        </div>
                        <div class="grid sm:grid-cols-2">
                            <span class="font-bold md:text-right text-left">
                                1<sup>st</sup> Dose Vaccinated : 
                            </span>
                            <span class="text-left mb-4 md:mb-0">
                                {{total.vaccinated1}}
                            </span>
                        </div>
                        <div class="grid sm:grid-cols-2">
                            <span class="font-bold md:text-right text-left">
                                2<sup>nd</sup> Dose Vaccinated : 
                            </span>
                            <span class="text-left mb-4 md:mb-0">
                                {{total.vaccinated2}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Accordion from '@/components/Accordion'
export default {
    name: 'IndiaBoxes',
    props: {
        stats: {},
        states: {},
        title: String,
        stateID: String,
    },
    components: {Accordion},
    data() {
        return{
            selected: null,
            today: {},
            total: {},
        }
    },
    watch: {
        title: function(val) {
            if(val == 'India'){
                this.getIndiaValues();
            } else{
                this.getStateValues();
            }
        }
    },
    methods: {
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
        this.getIndiaValues();
    }
}
</script>