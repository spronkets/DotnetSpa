<template>
  <div class="not-found">
    <h1>Not Found</h1>
    <p>The resource you were looking for wasn't found. It may have been deleted, or it never existed.</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class NotFound extends Vue {}
</script>

<style lang="scss" scoped>
</style>