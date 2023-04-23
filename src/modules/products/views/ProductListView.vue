<template>
    <div class="row m-2 mt-4 align-items-center">
        <div class="col">
            <h3>
                <i class="bi-basket"></i>
                Productos
            </h3>
        </div>
    </div>
    <ProductSearch />
    <ProductList />
    <BackToMenuButton />
    <PageNavigation />
</template>

<script setup lang="ts">
    import ProductSearch from '@/modules/products/components/ProductSearchBar.vue';
    import ProductList from '@/modules/products/components/ProductList.vue';
    import BackToMenuButton from '@/shared/back-to-menu/components/BackToMenuButton.vue';
    import PageNavigation from '@/shared/page-navigation/views/PageNavigationView.vue';
</script>

<style scoped>

</style>