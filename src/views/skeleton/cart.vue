<template>
  <div class="page page-grey page-pad">
    <skeleton-card-list>
      <skeleton-card class="shop-card" v-for="item in 8" :key="item">
        <skeleton-item class="shop-card__title"/>
        <div class="shop-card__content">
          <skeleton-item class="content-a"/>
          <skeleton-item class="content-b"/>
          <skeleton-item class="content-c"/>
          <skeleton-item class="content-d"/>
        </div>
      </skeleton-card>
    </skeleton-card-list>
  </div>
</template>

<script setup lang="ts" name="Cart">
//
</script>
<style lang="less" scoped>
.page {
  height: 100vh;
  overflow: hidden;

  .shop-card {
    &__title {
      width: 40%;
    }

    &__content {
      display: grid;
      grid-template-columns: 72px 1fr;
      grid-column-gap: var(--skeleton-row-gap);
      grid-row-gap: var(--skeleton-row-gap);
      grid-template-areas: 'a b'
                           'a c'
                           'a d';
      margin-top: var(--skeleton-row-gap);

      .content-a {
        grid-area: a;
        height: 70px;
      }

      .content-b {
        grid-area: b;
      }

      .content-c {
        grid-area: c;
      }

      .content-d {
        grid-area: d;
      }
    }
  }
}
</style>
