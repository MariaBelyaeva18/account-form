<template>
    <v-col cols="3">
      <v-text-field
        label="Метки"
        density="compact"
        hide-details
        :model-value="localItem.labels"
        :error="item.errors.tag"
        maxlength="50"
        @input="localItem.labels = $event.target.value"
        @blur="updateLabels()"
      />
    </v-col>
    <v-col cols="2">
      <v-select
        :items="['LDAP', 'Локальная']"
        label="Тип записи"
        density="compact"
        hide-details
        :model-value="localItem.type"
        :error="item.errors.type"
        @update:modelValue="updateType($event)"
      />
    </v-col>
      <v-col :cols="localItem.type !== 'LDAP' ? 3 : 6">
        <v-text-field
            label="Логин"
            density="compact"
            hide-details
            :model-value="localItem.login"
            :error="item.errors.login"
            maxlength="100"
            @input="localItem.login = $event.target.value"
            @blur="updateParams('login')"
        />
      </v-col>
      <v-col cols="3" v-if="localItem.type !== 'LDAP'">
        <v-text-field
            label="Пароль"
            density="compact"
            hide-details
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            :model-value="localItem.password"
            :error="item.errors.password"
            maxlength="100"
            @input="localItem.password = $event.target.value"
            @click:append="showPassword = !showPassword"
            @blur="updateParams('password')"
        />
      </v-col>
    <v-col cols="1">
      <v-icon @click="mainStore.removeAccount(item.id)">mdi-delete</v-icon>
    </v-col>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useMainStore} from "@/store/mainStore.ts";

const mainStore = useMainStore();

const showPassword = ref(false);

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const localItem = ref(props.item)

watch(() => props.item, (newItem) => {
  localItem.value = {
    ...newItem,
    labels: newItem.labels?.map((item: { text: string }) => item.text).join('; ')
  };
}, { immediate: true });

// Обновление меток
const updateLabels = () => {
  const labels = mainStore.parseLabels(localItem.value.labels || '')
  console.log(labels)
  mainStore.updateAccount(props.item.id, { labels })
}

const updateParams = (key: string) => {
  mainStore.updateAccount(props.item.id, { [key]: localItem.value[key] })
}

const updateType = (value: string) => {
  localItem.value.type = value;
  if (localItem.value.type === 'LDAP') {
    localItem.value.password = null;
  }
  updateParams('type');
}
</script>
