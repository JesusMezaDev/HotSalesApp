<template>
    <div class="row m-2 align-items-center">
        <div class="col">
            <div class="form-floating">
                <input type="text" class="form-control m-1" id="txtSearch" placeholder="Buscar" v-model="searchTerm" @keyup="searchKeyUp" maxlength="50">
                <label for="txtSearch">Buscar Categoría de Producto</label>
            </div>
        </div>
        <div class="col">
            <button class="btn btn-primary" @click="addNewProductCategory">
                <i class="bi-plus-circle"></i>
                Agregar
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useProductCategorySearch } from '../composables/useProductCategorySearch';
    const { addNewProductCategory, searchKeyUp, searchTerm } = useProductCategorySearch()
</script>

<style scoped>

</style>