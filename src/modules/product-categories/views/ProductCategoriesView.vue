<template>
    <form @submit.prevent="save">
        <div class="row m-2">
            <div class="col">
                <div class="input-group">
                    <span class="input-group-text w-150">Nombre</span>
                    <input type="text" class="form-control" placeholder="Nombre" v-model="productCategory.Name" @keydown.enter.prevent required>
                </div>
            </div>
        </div>
        <div class="row m-2">
            <div class="col">
                <div class="input-group">
                    <span class="input-group-text w-150">Descripción</span>
                    <textarea class="form-control" placeholder="Descripción" v-model="productCategory.Description" rows="4"></textarea>
                </div>
            </div>
        </div>
        <div class="row m-2">
            <div class="col">
                <button type="button" class="btn btn-danger float-firts" @click="() => router.replace({ name: 'product-categories' })">
                    <i class="bi-x-circle"></i>
                    Cancelar
                </button>
            </div>
            <div class="col">
                <button type="submit" class="btn btn-success float-end">
                    <i class="bi-plus-circle"></i>
                    Guardar
                </button>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
    import router from '@/router';
    import { useProductCategory } from '@/modules/product-categories/composables/useProductCategory';
    const { productCategory, save } = useProductCategory();
</script>

<style scoped>

</style>