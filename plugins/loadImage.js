export default {
  install(Vue) {
    Vue.prototype.$loadImage = src => {
      return new Promise(resolve => {
        if (process.server) {
          resolve();
          return;
        }

        const img = document.createElement('img');
        //이미지 스프라이트로 poster와 같은 이미지 사용
        img.src = src;
        img.addEventListener('load', () => {
          resolve();
        })
      })
    }
  }
}
