<template>
    <table class="table table-dark table-hover">
        <thead>
            <tr>
                <th>Nombre Producto</th>
                <th>Descripción</th>
                <th>Categoría</th>
                <th>Etiquetas</th>
                <th></th>
            </tr>
        </thead>
        <tbody class="table-group-divider">
            <tr v-for="product in productStoreList" class="align-middle">
                <td>{{ product.Name }}</td>
                <td>{{ product.Description }}</td>
                <td>{{ product.CategoryName }}</td>
                <td></td>
                <td class="text-center">
                    <button type="button" class="btn btn-outline-success btn-sm me-2" @click="getProduct(product.Product_Id)">
                        <i class="bi-pencil"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteProduct(product.Product_Id)">
                        <i class="bi-x-lg"></i>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import { useProductsStore } from '@/modules/products/store/products.store';
    import { useProductList } from '@/modules/products/composables/useProductList';
    const { productStoreList } = storeToRefs(useProductsStore());
    const { deleteProduct, getProduct } = useProductList();
</script>

<style scoped>
    i:hover {
        cursor: pointer;
    }
</style>