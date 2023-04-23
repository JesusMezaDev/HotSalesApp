import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const usePageNavigationStore = defineStore('pageNavigationStore', () => {
    const currentPage = ref<number>(1);
    const lastPage = ref<number>(1);
    const links = ref<{ page: number, label: string }[]>([]);
    const callBack = ref<() => void>(() => {});
    const showPagination = ref<boolean>(false);
  
    return {
        currentPage,
        lastPage,
        callBack,
        links,
        showPagination,
    }
});