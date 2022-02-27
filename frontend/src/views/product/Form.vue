<template>
  <div>
    <div>
      <router-link class="p-col-align-center" to="/product">
        <Button icon="pi pi-chevron-left" label="Назад" />
      </router-link>
      <h3 class="page-title">Добавление товара</h3>
    </div>
    <ProgressSpinner class="p-align-center" v-if="loading" />

    <form @submit.prevent="handleSubmit(!v$.$invalid)" v-else>
      <div class="p-fluid">
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
          <label for="categoryId">Категория</label>
          <Dropdown
            id="categoryId"
            v-model="v$.categoryId.$model"
            :options="categories"
            optionValue="id"
            optionLabel="name"
            placeholder="Выберите категорию"
            :showClear="true"
          />
        </div>
        <div class="p-field">
          <label
            for="barcode"
            :class="{ 'p-error': v$.barcode.$invalid && submitted }"
            >Штрихкод</label
          >
          <InputText
            id="barcode"
            v-model="v$.barcode.$model"
            :class="{ 'p-invalid': v$.barcode.$invalid && submitted }"
            type="text"
          />
        </div>
        <div class="p-field">
          <label :class="{ 'p-error': v$.price.$invalid && submitted }" for="priceRetail">Цена</label>
          <div class="p-inputgroup">
            <InputNumber id="priceRetail" v-model="v$.price.$model" :class="{ 'p-invalid': v$.price.$invalid && submitted }" />
            <span class="p-inputgroup-addon">₸</span>
          </div>
        </div>
        <div class="p-field">
          <label for="img">Фотография</label>
          <FileUpload
            id="img"
            mode="advanced"
            name="img"
            url="http://localhost:4090/product/upload"
            accept="image/*"
            :maxFileSize="1000000"
            @upload="uploadFileHandler"
            :fileLimit="1"
          />
          <h6>Загруженный файл: {{ state.img || "Не выбрано" }}</h6>
          <div v-if="state.img">
            <img class="w-100" :src="apiAddress + '/' + state.img" alt="img" />
          </div>
        </div>
        <Button label="Сохранить" type="submit" />
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";
import FileUpload from "primevue/fileupload";
import { ProductActions } from "@/store/product/actions";
import { ProductGetters } from "@/store/product/getters";
import { CategoryActions } from "@/store/category/actions";
import { CategoryGetters } from "@/store/category/getters";
import { CategoryTypes } from "@/store/category/state";
import { getIpAddress } from "@/store/config";

const state = reactive({
  id: undefined,
  name: "",
  barcode: "",
  categoryId: null,
  price: 0,
  img: "",
});
const rules = {
  id: {},
  name: { required },
  barcode: { required },
  categoryId: {},
  price: { required },
  img: {},
};

const loading = ref(false);

const id = ref(0);
const price = ref<number | null>(null);

const categories = ref([]);

const submitted = ref(false);
const v$ = useVuelidate(rules, state);
const store = useStore();
const toast = useToast();
const route = useRoute();

const handleSubmit = async (isFormValid: boolean) => {
  submitted.value = true;

  if (!isFormValid) {
    return;
  }

  if (id.value === 0) {
    loading.value = true;
    await store.dispatch(ProductActions.CREATE_ITEM, state).then(
      () => {
        toast.add({
          severity: "success",
          summary: "Успех",
          detail: "Товар успешно создан",
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
    await store.dispatch(ProductActions.UPDATE_ITEM, state).then(
      () => {
        toast.add({
          severity: "success",
          summary: "Успех",
          detail: "Товар успешно обновлен",
        });
      },
      (error) => {
        console.error(error);
      }
    );
    loading.value = false;
  }
};

function resetForm() {
  submitted.value = false;
  state.name = "";
  state.barcode = "";
  state.price = 0;
  state.img = "";
  state.categoryId = null;
}

function uploadFileHandler(event: any) {
  state.img = event.files[0].name;
}

const apiAddress = ref<string | null>(null);

onMounted(async () => {
  apiAddress.value = getIpAddress();

  if (typeof route.query.id !== "undefined") {
    loading.value = true;
    await store.dispatch(ProductActions.FETCH_ONE, route.query.id);
    const model = await store.getters[ProductGetters.GET_CURRENT];
    id.value = model.id;
    state.name = model.name;
    state.barcode = model.barcode;
    state.price = model.price;
    state.img = model.img;
    state.categoryId = model.categoryId;

    loading.value = false;
  }

  await store.dispatch(CategoryActions.FETCH_ALL, {
    type: CategoryTypes.PRODUCT_AND_DISHES,
  });
  categories.value = await store.getters[CategoryGetters.GET_ALL];
});
</script>
