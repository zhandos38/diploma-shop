<template>
  <di>
    <div>
      <router-link class="p-col-align-center" to="/category">
        <Button icon="pi pi-chevron-left" label="Назад" />
      </router-link>
      <h3 class="page-title">{{ state.id ? 'Обновить категорий для товаров' : 'Создание категорий для товаров' }}</h3>
    </div>
    <ProgressSpinner class="p-align-center" v-if="loading" />
    <div class="p-fluid" v-else>
      <form @submit.prevent="handleSubmit(!v$.$invalid)">
        <div class="p-field">
          <label
            for="name"
            :class="{ 'p-error': v$.name.$invalid && submitted }"
            >Название</label
          >
          <InputText
            id="name"
            v-model="v$.name.$model"
            :class="{ 'p-invalid': v$.name.$invalid && submitted }"
            type="text"
          />
        </div>
        <div class="p-field">
          <label for="parentId">Категория</label>
          <Dropdown
            id="parentId"
            v-model="v$.parentId.$model"
            :options="categories"
            optionValue="id"
            optionLabel="name"
            placeholder="Выберите родительскую категорию"
          />
        </div>
        <Button label="Сохранить" type="submit" />
      </form>
    </div>
  </di>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useStore } from "vuex";
import { CategoryActions } from "@/store/category/actions";
import { CategoryGetters } from "@/store/category/getters";
import { useToast } from "primevue/usetoast";
import { useRoute, useRouter } from "vue-router";
import { CategoryTypes } from "@/store/category/state";

const state = reactive({
  id: undefined,
  name: "",
  parentId: null,
});
const rules = {
  id: {},
  name: { required },
  parentId: {},
};

const loading = ref(false);

const submitted = ref(false);
const v$ = useVuelidate(rules, state);
const store = useStore();
const toast = useToast();
const route = useRoute();
const router = useRouter();
const categories = ref([]);

const handleSubmit = async (isFormValid: boolean) => {
  submitted.value = true;

  if (!isFormValid) {
    return;
  }

  if (state.id === 0) {
    loading.value = true;
    await store.dispatch(CategoryActions.CREATE_ITEM, state).then(
      () => {
        toast.add({
          severity: "success",
          summary: "Успех",
          detail: "Категория успешно создан",
        });

        resetForm();
      },
      (error) => {
        console.error(error);
      }
    );
    loading.value = false;
  } else {
    loading.value = true;
    await store.dispatch(CategoryActions.UPDATE_ITEM, state).then(
      () => {
        toast.add({
          severity: "success",
          summary: "Успех",
          detail: "Категория успешно обновлена",
        });

        resetForm();
      },
      (error) => {
        console.error(error);
      }
    );
    loading.value = false;
  }

  await router.push("/product");
};

function resetForm() {
  submitted.value = false;
  state.id = undefined;
  state.name = "";
  state.parentId = null;
}

onMounted(async () => {
  if (typeof route.query.id !== "undefined") {
    loading.value = true;
    await store.dispatch(CategoryActions.FETCH_ONE, route.query.id);
    const categoryProduct = await store.getters[CategoryGetters.GET_CURRENT];
    state.id = categoryProduct.id;
    state.name = categoryProduct.name;
    state.parentId = categoryProduct.parentId;

    loading.value = false;
  }

  await store.dispatch(CategoryActions.FETCH_ALL);
  categories.value = await store.getters[CategoryGetters.GET_ALL];
});
</script>
