import { usePageNavigationStore } from '@/shared/page-navigation/store/pageNavigationStore';
import { storeToRefs } from 'pinia';
import { range } from 'rxjs';
import { computed, watch } from 'vue';

export const usePageNavigation = () => {
    const pageNavigationStore = usePageNavigationStore();
    const { currentPage, lastPage, links, callBack, showPagination } = storeToRefs(pageNavigationStore);
        
    watch(() => [currentPage.value, lastPage.value], () => {
        const linksRange = range(1, lastPage.value);
        links.value = [];
        linksRange.subscribe({
            next: (page) => {
                links.value.push(
                    { page, label: `${ page }` }
                );
            },
        });
        showPagination.value = (links.value.length > 1) ? true : false;
    });

    return {
        disablePreviousButton: computed(() => currentPage.value === 1),//currentPage.value === 1,
        disableNextButton: computed(() => currentPage.value === lastPage.value),//currentPage.value === lastPage.value,
        nextPage: () => { currentPage.value++; callBack.value(); },
        previousPage: () => { currentPage.value--; callBack.value(); },
        goToPage: (page: number) => { currentPage.value = page; callBack.value(); },
        links,
        currentPage,
        lastPage,
        navigationCallBack: callBack,
        showPagination,
    }
}