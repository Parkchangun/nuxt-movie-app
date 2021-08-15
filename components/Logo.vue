<template>
  <RouterLink
    class="logo"
    to="/">
    <span>OMDbAPI</span>.COM
  </RouterLink>
</template>

<script>
export default {
  name: "Logo"
}
</script>

<style lang="scss" scoped>
.logo {
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  color: $black;
  text-decoration: none;

  &:hover {
    color: $black;
  }

  span {
    color: $primary;
  }
}
</style>