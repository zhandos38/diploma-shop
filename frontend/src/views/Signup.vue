<template>
  <div class="auth__form">
    <div style="text-align: center">
      <p class="auth-title">Зарегистрироватся</p>
      <p class="auth-text">Для регистрации на платформе IMS заполните форму</p>
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
            placeholder="Логин (ИИН/БИН)"
          />
        </div>
        <div class="mb-3">
          <InputText
            id="fullName"
            v-model="v$.fullName.$model"
            :class="{
              'p-invalid': v$.fullName.$invalid && submitted,
            }"
            type="text"
            placeholder="Полное имя"
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
        <div class="mb-3">
          <InputText
            id="passwordRepeat"
            v-model="v$.passwordRepeat.$model"
            :class="{
              'p-invalid': v$.passwordRepeat.$invalid && submitted,
            }"
            type="password"
            placeholder="Повторите пароль"
          />
        </div>
        <Button label="Зарегистрироватся" type="submit" />
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { minLength, required, email } from "@vuelidate/validators";
import { useStore } from "vuex";
import { UserActions } from "@/store/user/actions";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import InputMask from "primevue/inputmask";
import { IUser, UserRoles, UserStatuses } from "@/store/user/state";
import { AuthActions } from "@/store/auth";

const store = useStore();
const toast = useToast();
const router = useRouter();

interface IUserSignup extends Omit<IUser, "role" | "status"> {
  passwordRepeat: string;
}
const state = reactive<IUserSignup>({
  username: "",
  fullName: "",
  password: "",
  passwordRepeat: "",
});
const rules = {
  username: { required },
  fullName: { required },
  password: { required, minLength: minLength(6) },
  passwordRepeat: { required },
};

const loading = ref(false);
const submitted = ref(false);

const v$ = useVuelidate(rules, state);

const handleSubmit = async (isFormValid: boolean) => {
  submitted.value = true;
  if (!isFormValid) {
    return;
  }

  if (state.password !== state.passwordRepeat) {
    toast.add({
      severity: "warn",
      summary: "Внимание",
      detail: "Пароли не совпадают",
      life: 3000,
    });
    return;
  }

  loading.value = true;
  await store
    .dispatch(
      AuthActions.SIGNUP,
      {
        username: state.username,
        password: state.password,
        fullName: state.fullName,
        role: UserRoles.DIRECTOR,
        status: UserStatuses.ACTIVE,
      },
      {
        root: true,
      }
    )
    .then(
      async (response) => {
        toast.add({
          severity: "success",
          summary: "Успех",
          detail: "Вы успешно зарегистрировались",
          life: 3000,
        });

        await router.push("/login");
      },
      (error) => {
        requestErrorHandler(error.data);

        toast.add({
          severity: "error",
          summary: "Ошибка",
          detail: "Пройзашла какая-то ошибка",
          life: 3000,
        });
        console.error(error);
      }
    );
  loading.value = false;
};

function requestErrorHandler(errorData: string) {
  if (errorData === "user-exists") {
    toast.add({
      severity: "error",
      summary: "Ошибка",
      detail: "Данный имя пользователь уже используется",
      life: 3000,
    });
  }
}
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
