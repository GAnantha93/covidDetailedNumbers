<template>
  <header class="text-left bg-gradient-to-r to-green-400 from-blue-500 text-white p-4 mb-10" @click="goToHome" title="Home">
    <div class="text-3xl md:text-5xl font-bold mb-1"><i class="fa fa-viruses"></i> Covid-19 Tracker</div>
    <p class="ml-3 md:ml-10 pl-9">by Gowtham Anantha</p>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods:{
    goToHome(){
      this.$router.push('/');
    }
  }
}
</script>
<style>
header div{
  cursor: pointer;
}
</style>
