<script setup lang="ts">
import {Subject, useSubjectStore} from "@/stores/Subject";
import {storeToRefs} from "pinia";
import {reactive} from "vue";

const  emit = defineEmits(['list-subject'])
  const { updateSubject } = useSubjectStore();
  const { subject } = storeToRefs(useSubjectStore())

  let subjectState = reactive({
    id: subject.value.id,
    name : subject.value.name
  } as Subject)

  const updateSubjectModel = async () => {
    try{
      const response = await updateSubject(subjectState, subjectState.id)
      const {data, message} = response.data
      if (data.statusCode === '201') {
        emit('list-subject')
      }
      console.log(message)
    } catch (error){
      console.error(error.message)
    }
  }

</script>

<template>
  <div class="register-form">
    <h2>Edit</h2>
    <form @submit.prevent="updateSubjectModel()">
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