<template>
    <div v-if="showPagination" class="col d-flex justify-content-center">
        <div class="row">
            <nav aria-label="Page Navigation">
                <ul class="pagination primary">
                    <li class="page-item" :class="{ disabled: disablePreviousButton }">
                        <a class="page-link" href="#" @click.prevent="previousPage()">Previous</a>
                    </li>
                    <li class="page-item" v-for="link in links" :class="{ active: link.page === currentPage }">
                        <a class="page-link" href="#" @click.prevent="goToPage(link.page)">{{ link.label }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: disableNextButton }">
                        <a class="page-link" href="#" @click.prevent="nextPage()">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { usePageNavigation } from '@/shared/page-navigation/composables/usePageNavigation';
    const { disableNextButton, disablePreviousButton, nextPage, previousPage, goToPage, links, currentPage , showPagination} = usePageNavigation();
</script>

<style scoped>
    
</style>