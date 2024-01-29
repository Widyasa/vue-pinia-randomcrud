<script setup lang="ts">
  import {reactive} from "vue";
  import {Subject, useSubjectStore} from "@/stores/Subject";

  const {createSubject} = useSubjectStore()

  const emit = defineEmits(['list-subject'])

  let subjectState = reactive({
    name: ""
  } as Subject)

  const createSubjectModel = async () => {
    try{
      const response = await createSubject(subjectState);
      const {data, message} = response.data
      if (data.statusCode === '201') {
        emit('list-subject')
      }
      console.log(message)
    } catch (error) {
      console.error(error.message)
    }
  }
</script>

<template>
  <div class="register-form">
    <h2>Register</h2>
    <form @submit.prevent="createSubjectModel">
      <input v-model="subjectState.name" placeholder="Name" />
      <button
          type="submit"
      >
        Save
      </button>
      <button type="button" @click="$emit('list-subject')">Back</button>
    </form>
  </div>
</template>

<style scoped>

</style>