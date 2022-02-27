<template>
  <div class="page">
    <div class="page-header justify-content-between d-flex border-bottom">
      <h3 class="page-title">Товары</h3>
    </div>
    <div class="page-body">
      <Toolbar class="p-mb-4">
        <template #start>
          <Button
            label="Добавить"
            icon="pi pi-plus"
            class="p-button-success p-mr-2"
            @click="createButtonHandler"
          />
        </template>
        <template #end>
          <Button
            label="Экпорт"
            icon="pi pi-upload"
            class="p-button-help"
            @click="exportCSV"
          />
        </template>
      </Toolbar>
      <DataTable
        ref="dt"
        :value="dataProvider.records"
        :lazy="true"
        :paginator="true"
        :rows="12"
        filterDisplay="menu"
        :loading="loading"
        v-model:filters="filters"
        @sort="onSort($event)"
        @page="onPage($event)"
        @filter="onFilter($event)"
        :totalRecords="dataProvider.totalItems"
      >
        <Column field="name" header="Название" :sortable="true">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @keydown.enter="filterCallback()"
              class="p-column-filter"
              placeholder="Пойск"
            />
          </template>
        </Column>
        <Column field="categoryId" header="Категория">
          <template #body="{ data }">
            {{ data.Category ? data.Category.name : "Пусто" }}
          </template>
          <template #filter="{ filterModel }">
            <Dropdown
              v-model="filterModel.value"
              :options="categories"
              optionLabel="name"
              optionValue="id"
              placeholder="Выберите категорию"
              class="p-column-filter"
              :showClear="true"
            ></Dropdown>
          </template>
        </Column>
        <Column field="img" header="Фотография">
          <template #body="{ data }">
            <img
              :src="`http://localhost:4040/${data.img}`"
              width="100"
              alt="img"
              v-if="data.img"
            />
            <span v-else> Без рисунка </span>
          </template>
        </Column>
        <Column field="price" header="Цена" :sortable="true">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @keydown.enter="filterCallback()"
              class="p-column-filter"
              placeholder="Пойск"
            />
          </template>
        </Column>
        <Column bodyStyle="text-align: center; overflow: visible">
          <template #body="slotProps">
            <Button
              type="button"
              icon="pi pi-pencil"
              @click="editButtonHandler(slotProps.data.id)"
            ></Button>
            <Button
              class="p-button-danger p-ml-1"
              type="button"
              icon="pi pi-trash"
              @click="deleteItem(slotProps.data.id)"
            ></Button>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toolbar from "primevue/toolbar";
import router from "@/router";
import { useStore } from "vuex";
import { ProductGetters } from "@/store/product/getters";
import { ProductActions } from "@/store/product/actions";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { IDataTableEvent } from "@/store/types";
import { FilterMatchMode } from "primevue/api";
import { CategoryActions } from "@/store/category/actions";
import { CategoryGetters } from "@/store/category/getters";
import { ProductTypes } from "@/store/product/state";

onMounted(async () => {
  lazyParams.value.rows = dt.value.rows;
  await loadLazyData();

  await store.dispatch(CategoryActions.FETCH_ALL);
  categories.value = await store.getters[CategoryGetters.GET_ALL];
});

const loading = ref(false);
const store = useStore();
const toast = useToast();

const categories = ref([]);

const dt = ref();
const confirm = useConfirm();

const filters = ref({
  name: { value: "", matchMode: FilterMatchMode.CONTAINS },
  categoryId: { value: "", matchMode: FilterMatchMode.CONTAINS },
  price: { value: "", matchMode: FilterMatchMode.CONTAINS },
});

const lazyParams = ref<IDataTableEvent>({
  page: 0,
  sortField: null,
  sortOrder: 1,
  first: 0,
  rows: 0,
  filters: filters.value,
});

function createButtonHandler() {
  router.push("/product/form");
}

function editButtonHandler(id: number) {
  router.push({ path: "/product/form", query: { id: id } });
}

const dataProvider = computed(
  () => store.getters[ProductGetters.GET_DATA_PROVIDER]
);

async function loadLazyData() {
  loading.value = true;

  await store
    .dispatch(ProductActions.FETCH_LAZY_DATA, lazyParams.value)
    .then(
      () => {
        loading.value = false;
      },
      (error) => {
        console.error(error);
      }
    );
}

async function onSort(event: IDataTableEvent) {
  lazyParams.value = event;
  await loadLazyData();
}

async function onPage(event: IDataTableEvent) {
  lazyParams.value = event;
  await loadLazyData();
}

async function onFilter() {
  lazyParams.value.filters = filters.value;
  await loadLazyData();
}

function deleteItem(id: number) {
  confirm.require({
    message: "Вы точно хотите это удалить?",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger",
    accept: () => {
      store
        .dispatch(ProductActions.DELETE_ITEM, {
          id,
          lazyParams: lazyParams.value,
        })
        .then(
          () => {
            toast.add({
              severity: "success",
              summary: "Успех!",
              detail: "Товар успешно удален",
              life: 3000,
            });
          },
          (error) => {
            console.error(error);
          }
        );
    },
  });
}

function exportCSV() {
  dt.value.exportCSV();
}
</script>
