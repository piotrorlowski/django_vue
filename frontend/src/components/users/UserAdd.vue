<template>
  <div class="UserAdd">
    <FormComponent formTitle="Add new user" buttonText="Add new user" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import FormComponent from '@/components/users/FormComponent.vue';

export default Vue.extend({
  name: 'UserAdd',
  components: {
    FormComponent,
  },
});
</script>

<style lang="scss" scoped>
.UserAdd {
  width: 50%;
  min-height: 450px;
  background-color: #5284cf;
  border-radius: 5px;
  border: 1px solid #74a1cc;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.33);
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  padding: 50px;
}
</style>
