<template>
    <div class="row m-2 mt-4 align-items-center">
        <div class="col">
            <h3>
                <i class="bi-tags"></i>
                Categorías de Productos
            </h3>
        </div>
    </div>
    <ProductCategoriesSearch />
    <BackToMenuButton />
</template>

<script setup lang="ts">
    import ProductCategoriesSearch from '@/modules/product-categories/components/ProductCategoriesSearchBar.vue';
    import BackToMenuButton from '@/shared/back-to-menu/components/BackToMenuButton.vue';
</script>

<style scoped>

</style>