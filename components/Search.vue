<template>
  <div class="container">
    <input
      v-model="title"
      class="form-control"
      placeholder="Search for Movies"
      type="text" 
      @keyup.enter="apply" />
    <div class="selects">
      <select
        v-for="filter in filters"
        v-model="$data[filter.name]"
        :key="filter.name"
        class="form-select">
        <option
          v-if="filter.name === 'year'"
          value="">
          All years
        </option>
        <option
          v-for="item in filter.items"
          :key="item">
          {{ item }}
        </option>
      </select>
    </div>
    <button
      class="btn btn-danger"
      @click="apply">
      Apply
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      type: 'movie',
      number: 10,
      year: '',
      filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          items: (() => {
            const years = [];
            const thisYear = new Date().getFullYear();
            for(let i = thisYear; i >= 1985; i -= 1) {
              years.push(i);
            }
            return years;
          })()
        }
      ]
    }
  },
  methods: {
    apply() {
      this.$store.dispatch(`movie/searchMovies`, {
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  > * {
    margin-right: 1rem;
    font-size: 1.5rem;
    &:last-child {
      margin-right: 0;
    }
  }

  .selects {
    display: flex;
    select {
      width: 10rem;
      margin-right: 1rem;
      &:last-child {
        margin-right: 0;
      }
    }
  }

  .btn {
    width: 10rem;
    height: 4.5rem;
    font-weight: 700;
    flex-shrink: 0;
  }
}
</style>