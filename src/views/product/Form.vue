<template>
  <div class="card">
    <div>
      <router-link class="p-col-align-center" to="/menu/product">
        <Button icon="pi pi-chevron-left" label="Назад" />
      </router-link>
      <h3 class="page-title">Добавление товара</h3>
    </div>
    <ProgressSpinner class="p-align-center" v-if="loading" />
    <div class="p-fluid p-col-12 p-md-6 p-lg-5 p-xl-4" v-else>
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
          <label for="categoryId">Категория</label>
          <Dropdown
            id="categoryId"
            v-model="categoryId"
            :options="categories"
            optionValue="id"
            optionLabel="name"
            placeholder="Выберите категорию"
            :showClear="true"
          />
        </div>
        <div class="p-field">
          <label for="workshopId">Цех</label>
          <Dropdown
            id="workshopId"
            v-model="workshopId"
            :options="workshops"
            optionValue="id"
            optionLabel="name"
            placeholder="Выберите цех"
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
          <label for="priceIn">Себестоимость без НДС</label>
          <div class="p-inputgroup">
            <InputNumber id="priceIn" v-model="priceIn" type="text" />
            <span class="p-inputgroup-addon">₸</span>
          </div>
        </div>
        <div class="p-field">
          <label for="markup">Наценка</label>
          <div class="p-inputgroup">
            <InputNumber id="markup" v-model="markup" type="text" />
            <span class="p-inputgroup-addon">%</span>
          </div>
        </div>
        <div class="p-field">
          <label for="priceRetail">Итого</label>
          <div class="p-inputgroup">
            <InputNumber id="priceRetail" v-model="priceRetail" type="text" />
            <span class="p-inputgroup-addon">₸</span>
          </div>
        </div>
        <div class="p-field">
          <label for="img">Фотография</label>
          <FileUpload
            id="img"
            mode="advanced"
            name="img"
            url="http://localhost:4040/product/upload"
            accept="image/*"
            :maxFileSize="1000000"
            @upload="uploadFileHandler"
            :fileLimit="1"
          />
          <h6>Загруженный файл: {{ img || "Не выбрано" }}</h6>
          <div v-if="img">
            <img class="w-100" :src="apiAddress + '/' + img" alt="img" />
          </div>
        </div>
        <div class="p-field">
          <h6>Цвет</h6>
          <ColorPicker v-model="color" />
        </div>
        <div class="p-field-checkbox">
          <Checkbox
            id="isWeight"
            name="isWeight"
            :value="true"
            v-model="isWeight"
            :binary="true"
          />
          <label for="isWeight">Весовой товар</label>
        </div>
        <div class="p-field-checkbox">
          <Checkbox
            id="isNotStock"
            name="isNotStock"
            :value="true"
            v-model="isNotStock"
            :binary="true"
          />
          <label for="isNotStock">Не участвует в скидках</label>
        </div>
        <Button label="Сохранить" type="submit" />
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, computed } from "vue";
import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { useStore } from "vuex";
import { useToast } from "primevue/usetoast";
import { useRoute } from "vue-router";
import FileUpload from "primevue/fileupload";
import ColorPicker from "primevue/colorpicker";
import { ProductActions } from "@/store/product/actions";
import { ProductGetters } from "@/store/product/getters";
import { CategoryActions } from "@/store/category/actions";
import { CategoryGetters } from "@/store/category/getters";
import { WorkshopActions } from "@/store/workshop/actions";
import { WorkshopGetters } from "@/store/workshop/getters";
import { ProductTypes } from "@/store/product/state";
import { CategoryTypes } from "@/store/category/state";
import { getIpAddress } from "@/store/config";

export default defineComponent({
  name: "ProductForm",
  components: {
    FileUpload,
    ColorPicker,
  },
  setup() {
    const state = reactive({
      name: "",
      barcode: "",
    });
    const rules = {
      name: { required },
      barcode: { required },
    };

    const loading = ref(false);

    const id = ref(0);
    const categoryId = ref(null);
    const workshopId = ref(null);
    const color = ref("");
    const img = ref("");
    const isWeight = ref(false);
    const isNotStock = ref(false);
    const markup = ref<number | null>(null);
    const priceIn = ref<number | null>(null);
    const priceRetail = computed(() => {
      return priceIn.value && markup.value
        ? (priceIn.value * ((100 + markup.value) / 100))
        : 0;
    });

    const categories = ref([]);
    const workshops = ref([]);

    const submitted = ref(false);
    const v$ = useVuelidate(rules, state);
    const store = useStore();
    const toast = useToast();
    const route = useRoute();

    const handleSubmit = async (isFormValid: boolean) => {
      if (!priceRetail.value) {
        toast.add({
          severity: "warn",
          summary: "Внимание",
          detail: "Нужно заполнить себестоимость",
        });

        return false;
      }

      submitted.value = true;

      if (!isFormValid) {
        return;
      }

      if (id.value === 0) {
        loading.value = true;
        await store
          .dispatch(ProductActions.CREATE_ITEM, {
            name: v$.value.name.$model,
            barcode: v$.value.barcode.$model,
            categoryId: categoryId.value,
            workshopId: workshopId.value,
            img: img.value,
            color: color.value,
            priceIn: priceIn.value,
            priceRetail: priceRetail.value,
            isWeight: isWeight.value,
            isNotStock: isNotStock.value,
            type: ProductTypes.PRODUCT,
          })
          .then(
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
        await store
          .dispatch(ProductActions.UPDATE_ITEM, {
            id: id.value,
            name: v$.value.name.$model,
            barcode: v$.value.barcode.$model,
            categoryId: categoryId.value,
            workshopId: workshopId.value,
            img: img.value,
            color: color.value,
            priceIn: priceIn.value,
            priceRetail: priceRetail.value,
            isWeight: isWeight.value,
            isNotStock: isNotStock.value,
          })
          .then(
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
      priceIn.value = 0;
      markup.value = 0;
      color.value = "";
      img.value = "";
      workshopId.value = null;
      categoryId.value = null;
      isWeight.value = false;
      isNotStock.value = false;
    }

    function uploadFileHandler(event: any) {
      img.value = event.files[0].name;
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
        priceIn.value = model.priceIn;
        markup.value = (model.priceRetail / model.priceIn) * 100 - 100;
        img.value = model.img;
        color.value = model.color;
        workshopId.value = model.workshopId;
        categoryId.value = model.categoryId;
        isWeight.value = model.isWeight;
        isNotStock.value = model.isNotStock;
        loading.value = false;
      }

      await store.dispatch(CategoryActions.FETCH_ALL, {
        type: CategoryTypes.PRODUCT_AND_DISHES,
      });
      categories.value = await store.getters[CategoryGetters.GET_ALL];

      await store.dispatch(WorkshopActions.FETCH_ALL);
      workshops.value = await store.getters[WorkshopGetters.GET_ALL];
    });

    return {
      v$,
      loading,
      submitted,
      handleSubmit,
      uploadFileHandler,
      img,
      color,
      isWeight,
      isNotStock,
      categories,
      categoryId,
      workshops,
      workshopId,
      markup,
      priceIn,
      priceRetail,
      apiAddress,
    };
  },
});
</script>
