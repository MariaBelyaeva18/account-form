<template>
  <div class="d-flex align-center ga-3">
    <b>Учетные записи</b>
    <v-btn
      size="30"
      prepend-icon="mdi-plus"
    />
  </div>

  <v-alert
    class="my-5"
    icon="mdi-help-circle-outline"
    text="Для указания нескольких меток для одной пары логин/пароль используйте ;"
    density="compact"
  />

  <div class="form-container">
    <div class="header-row">
      <div class="header-cell">Метки</div>
      <div class="header-cell">Тип записи</div>
      <div class="header-cell">Логин</div>
      <div class="header-cell">Пароль</div>
      <div class="header-cell"></div>
    </div>
    <div class="fields-row">
      <v-text-field
          class="form-field"
          label="Метки"
          density="compact"
          hide-details
      />
      <v-select
          class="form-field"
          label="Тип записи"
          density="compact"
          hide-details
          />
      <v-text-field
          class="form-field"
          label="Логин"
          density="compact"
          hide-details
          />
      <v-text-field
          class="form-field"
          label="Пароль"
          density="compact"
          hide-details
          />
      <v-icon>mdi-delete</v-icon>
    </div>

  </div>

</template>

<script setup lang="ts">


</script>

<style scoped lang="sass">
.form-container
  display: grid
  grid-template-columns: minmax(100px, 1fr) minmax(100px, 1fr) minmax(120px, 1.5fr) minmax(120px, 1.5fr) 24px
  gap: 12px
  align-items: center

  .header-row
    display: contents

    .header-cell
      padding: 0 8px
      font-weight: 500
      font-size: 0.8125rem
      color: rgba(0, 0, 0, 0.6)

  .fields-row
    display: contents

    .form-field
      width: 100%

    .combined-field
      grid-column: 3 / span 2

    .action-cell
      grid-column: 5
      display: flex
      justify-content: center
</style>

