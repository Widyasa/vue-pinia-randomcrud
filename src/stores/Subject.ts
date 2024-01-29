import {defineStore} from "pinia";
import axios from "axios";
import {ref} from "vue";
import {apiUrl} from "@/global";




export interface Subject {
    id: number
    name:string
}

export const subjectApiStore = defineStore('subjectApiStore', () => {
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

export const useSubjectStore = defineStore('classroomStore', () => {
    const subject = ref<Subject>({} as Subject)
    const subjectList = ref<Subject[]>([] as Subject[])

    const {postCreate, postUpdate, postDelete, getById, getAll} = subjectApiStore()

    async function createSubject(subject:Subject){
        return await  postCreate(subject, 'subjects')
    }

    async function updateSubject(subject:Subject, id:string){
        return await postUpdate(subject, id, 'subjects')
    }

    async function deleteSubject(id:string) {
        return await postDelete(id, 'subjects')
    }

    async function getSubjectById(id:string) {
        return await getById(id, 'subjects')
    }

    async function getAllSubject(){
        return await getAll('subjects')
    }

    return {createSubject, updateSubject, getSubjectById, getAllSubject, deleteSubject, subject, subjectList }
})