<template>
  <div className="about">
    <div className="photo">
      <Loader
        v-if="imageLoading"
        absolute
      />
      <img
        :alt="name"
        :src="image"
      />
    </div>
    <div className="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '@/components/Loader'

export default {
  name: "About",
  components: {
    Loader
  },
  data () {
    return {
      imageLoading: true
    }
  },
  mounted () {
    this.init();
  },
  methods: {
    async init () {
      await this.$loadImage(this.image);
      this.imageLoading = false;
    }
  },
  computed: {
    ...mapState('about', [
      'name',
      'email',
      'blog',
      'phone',
      'image'
    ])
  }
}

</script>

<style lang="scss" scoped>
.about {
  text-align: center;

  .photo {
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;

    img {
      width: 100%;
    }
  }

  .name {
    font-size: 40px;
    font-family: "Oswald", sans-serif;
    margin-bottom: 20px;
  }
}
</style>
