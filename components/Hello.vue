<template>
  <div>
    <button
      @click="fetchMovie"
      class="btn btn-primary">
      Get Movie!
    </button>
    <h1>{{ title }}</h1>
    <p>{{ director }}</p>
    <img
      :src="poster"
      :alt="title" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      poster: '',
      director: ''
    }
  },
  computed: {
    msg() {
      return this.$store.state.message.msg
    },
    reversedMsg() {
      return this.store.getters('message/reversedMsg');
    }
  },
  methods: {
    updateMsg() {
      this.$store.commit('message/updateMsg', 'changeon')
    },
    reverseMsg() {
      this.$store.dispatch('message/reverseMsg')
    },
    async fetchMovie() {
      const res = await fetch('https://www.omdbapi.com/?apikey=7035c60c&i=tt3896198');
      const movie = await res.json();
      console.log(movie);
      this.title = movie.Title;
      this.director = movie.Director;
      this.poster = movie.Poster;
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  display: flex;
  $color: orange;
  background-color: $color;
}
</style>
