<template>
  <div>
    <NavBar />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import Footer from "@/components/core/Footer.vue";
import NavBar from "@/components/core/NavBar.vue";
export default {
  components: {
    Footer,
    NavBar
  }
};
</script>
