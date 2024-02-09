import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state:()=> ({
        userINfo:JSON.parse(localStorage.getItem('userInfo') as string || '{}')
    }),
    actions: {
       
    }
})
