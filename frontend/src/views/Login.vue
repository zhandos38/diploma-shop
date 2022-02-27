<template>
  <div class="auth__form">
    <div style="text-align: center">
      <p class="auth-title">Авторизация</p>
      <p class="auth-text">Войдите чтобы начать сессию</p>
    </div>
    <form @submit.prevent="handleSubmit(!v$.$invalid)">
      <div class="p-fluid">
        <div class="mb-3">
          <InputText
            id="username"
            v-model="v$.username.$model"
            :class="{
              'p-invalid': v$.username.$invalid && submitted,
            }"
            type="text"
            placeholder="Логин"
          />
        </div>
        <div class="mb-3">
          <InputText
            id="password"
            v-model="v$.password.$model"
            :class="{
              'p-invalid': v$.password.$invalid && submitted,
            }"
            type="password"
            placeholder="Пароль"
          />
        </div>
        <Button label="Войти" type="submit" />
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useStore } from "vuex";
import { UserActions } from "@/store/user/actions";
import { UserGetters } from "@/store/user/getters";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { AuthActions, AuthGetters } from "@/store/auth";

const store = useStore();
const toast = useToast();
const router = useRouter();

const state = reactive({
  username: "",
  password: "",
});
const rules = {
  username: { required },
  password: { required },
};

const loading = ref(false);
const submitted = ref(false);

const v$ = useVuelidate(rules, state);

const handleSubmit = async (isFormValid: boolean) => {
  submitted.value = true;

  if (!isFormValid) {
    return;
  }

  loading.value = true;
  await store
    .dispatch(
      AuthActions.LOGIN,
      {
        username: v$.value.username.$model,
        password: v$.value.password.$model,
      },
      {
        root: true,
      }
    )
    .then(
      async () => {
        toast.add({
          severity: "success",
          summary: "Успех",
          detail: "Вы успешно авторизовались",
          life: 3000,
        });

        await router.push("/");
      },
      (error) => {
        toast.add({
          severity: "error",
          summary: "Ошибка идентификации",
          detail: "Введенный логин или пароль не верный",
          life: 3000,
        });
        console.error(error);
      }
    );
  loading.value = false;
};

onMounted(async () => {
  if (store.getters[AuthGetters.GET_IS_AUTHENTICATED]) {
    await router.push("/");
  }
});
</script>

<style scoped>
.auth__form {
  width: 25%;
  position: absolute;
  z-index: 2;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.auth-title {
  font-size: 28px;
  text-transform: uppercase;
  color: #fff;
  font-family: "Roboto", sans-serif;
}
.auth-text {
  font-family: "Roboto", sans-serif;
  color: #fff;
  margin-bottom: 20px;
}
</style>
