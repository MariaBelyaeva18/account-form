<template>
  <div class="d-flex align-center ga-3">
    <b>Учетные записи</b>
    <v-btn
      size="30"
      prepend-icon="mdi-plus"
      @click="mainStore.addAccount()"
    />
  </div>

  <v-alert
    class="my-5"
    icon="mdi-help-circle-outline"
    text="Для указания нескольких меток для одной пары логин/пароль используйте ;"
    density="compact"
  />

    <v-row class="header-row">
      <v-col cols="3" class="header-cell">Метки</v-col>
      <v-col cols="2" class="header-cell">Тип записи</v-col>
      <v-col cols="3" class="header-cell">Логин</v-col>
      <v-col cols="3" class="header-cell">Пароль</v-col>
      <v-col cols="1" class="header-cell" />
    </v-row>
    <v-row v-for="(item, index) in mainStore.data" :key="index" class="d-flex align-center">
      <AccountTemplate :item="item"/>
    </v-row>

</template>

<script setup lang="ts">
import AccountTemplate from "@/components/AccountTemplate.vue";
import {useMainStore} from "@/store/mainStore.ts";


const mainStore = useMainStore();
</script>

<style scoped lang="sass">
.header
  &-row
    padding-top: 18px
  &-cell
    padding: 0 18px
    font-weight: 500
    font-size: 0.8125rem
    color: rgba(0, 0, 0, 0.6)
</style>

