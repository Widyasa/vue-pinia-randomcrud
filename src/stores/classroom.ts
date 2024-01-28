import {defineStore} from "pinia";
import axios from "axios";
import {ref} from "vue";
import {apiUrl} from "@/global";




export interface classRoom {
    id:number
    name:string
}

export const classroomApiStore = defineStore('classroomApiStore', () => {
    async function postCreate(request:Object, pathUrl:string)  {
        return await axios.post(apiUrl + pathUrl, request)
    }
    async function postUpdate(request:Object, id:string, pathUrl:string) {
        return await axios.put(apiUrl + pathUrl + `/${id}`, request)
    }
    async function postDelete( id:string, pathUrl:string){
        return await axios.delete(apiUrl + pathUrl + `/${id}`)
    }

    async function getById(id:string, pathUrl:string){
        return  await axios.get(apiUrl + pathUrl + `/${id}`)
    }
    
    async function getAll(pathUrl:string){
        return  await axios.get(apiUrl + pathUrl)
    }
    return{
        postCreate,
        postDelete,
        postUpdate,
        getById,
        getAll
    }
})

export const useClassroomStore = defineStore('classroomStore', () => {
    const classroom = ref<classRoom>({} as classRoom)
    const classroomList = ref<classRoom[]>([] as classRoom[])

    const {postCreate, postUpdate, postDelete, getById, getAll} = classroomApiStore()

    async function createClassroom(classroom:classRoom){
        return await  postCreate(classroom, 'classrooms')
    }

    async function updateClassroom(classroom:classRoom, id:string){
        return await postUpdate(classroom, id, 'classrooms')
    }

    async function deleteClassroom(id:string) {
        return await postDelete(id, 'classrooms')
    }

    async function getClassroomById(id:string) {
        return await getById(id, 'classrooms')
    }

    async function getAllClassroom(){
        return await getAll('classrooms')
    }

    return {createClassroom, updateClassroom, getClassroomById, getAllClassroom, deleteClassroom, classroom, classroomList }
})