<template>
    <table class="table table-dark table-hover">
        <thead>
            <tr>
                <th>Nombre Categoría Producto</th>
                <th>Descripción</th>
                <th></th>
            </tr>
        </thead>
        <tbody class="table-group-divider">
            <tr v-for="productCategory in productCategoryListStore" class="align-middle">
                <td>{{ productCategory.Name }}</td>
                <td>{{ productCategory.Description }}</td>
                <td></td>
                <td class="text-center">
                    <button type="button" class="btn btn-outline-success btn-sm me-2" @click="getProductCategory(productCategory.ProductCategory_Id)">
                        <i class="bi-pencil"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteProductCategory(productCategory.ProductCategory_Id)">
                        <i class="bi-x-lg"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useProductCategoryStore } from '@/modules/product-categories/store/productCategory.store';
    import { useProductCategoryList } from '@/modules/product-categories/composables/useProductCategoryList';
    const { productCategoryListStore } = storeToRefs(useProductCategoryStore());
    const { getProductCategory, deleteProductCategory } = useProductCategoryList();
</script>

<style scoped>

</style>