import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  namespaced: true,
  state: () => ({
    movies: [],
    loading: false,
    message: 'Search for the movie Title!',
    theMovie: {}
  }),
  getters: {},
  mutations: {
    updateState (state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },
  actions: {
    async searchMovies ({
      state,
      commit
    }, payload) {
      if (state.loading) {
        return
      }

      commit('updateState', {
        loading: true,
        message: ''
      })

      try {
        const res = await _fetchMovie(payload)
        const {
          Search,
          totalResults
        } = res.data

        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })

        const total = parseInt(totalResults, 10)
        // const totalLength = Math.ceil(total / 10);

        const datasCount = total >= payload.number ? payload.number : total

        let page = 2

        while (state.movies.length < datasCount) {
          const res = await _fetchMovie({
            ...payload,
            page
          })
          const { Search } = res.data
          commit('updateState', {
            movies: _uniqBy([
              ...state.movies,
              ...Search
            ], 'imdbID')
          })
          page += 1
        }

        if (state.movies.length > datasCount) {
          commit('updateState', {
            movies: [...state.movies.slice(0, datasCount)]
          })
        }
      } catch (e) {
        commit('updateState', {
          message: e.message,
          movies: []
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }

    },
    async searchMovieWithId ({
      state,
      commit
    }, payload) {
      if (state.loading) {
        return
      }

      commit('updateState', {
        loading: true
      })

      try {
        const res = await _fetchMovie({
          id: payload.id
        })
        console.log(res.data)
        commit('updateState', {
          theMovie: res.data
        })
      } catch (e) {
        commit('updateState', {
          message: e.message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

async function _fetchMovie (payload) {
  // CSR: '/api/movie' => 'address/api/movie'
  // SSR: '/api/movie' => '/api/movie'
  const url = process.client
    ? '/api/movie'
    : `${process.env.CLIENT_URL}/api/movie`
  return await axios.post(url, payload)
}
