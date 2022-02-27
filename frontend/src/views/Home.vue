<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <Listbox v-model="selectedCountries" :options="countries" optionLabel="name" />
        </div>
        <div class="col-md-9">
          <div class="row">
            <div class="col-md-4">
              <Card class="w-100">
                <template #header>
                  <img src="../assets/iphone.jpg" style="height: 15rem" />
                </template>
                <template #title> Advanced Card </template>
                <template #subtitle> Card subtitle </template>
                <template #content>
                  <div class="d-flex justify-content-between">
                    <div>Цена</div>
                    <div>469 000 тг.</div>
                  </div>
                </template>
                <template #footer>
                  <Button icon="pi pi-shopping-cart" label="Купить" />
                </template>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Listbox from "primevue/listbox";
const selectedCountries = ref();
const countries = ref([
  {name: 'Australia', code: 'AU'},
  {name: 'Brazil', code: 'BR'},
  {name: 'China', code: 'CN'},
  {name: 'Egypt', code: 'EG'},
  {name: 'France', code: 'FR'},
  {name: 'Germany', code: 'DE'},
  {name: 'India', code: 'IN'},
  {name: 'Japan', code: 'JP'},
  {name: 'Spain', code: 'ES'},
  {name: 'United States', code: 'US'}
]);
</script>