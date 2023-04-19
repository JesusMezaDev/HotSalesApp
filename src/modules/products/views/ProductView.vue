<template>
    <form @submit.prevent="save">
        <div class="row">
            <div class="col">
                <div class="card m-3">
                    <h5 class="card-title m-2">Producto</h5>
                    <div class="row">
                        <div class="col">
                            <div class="row m-2">
                                <div class="col">
                                    <div class="input-group">
                                        <span class="input-group-text w-150">Nombre</span>
                                        <input type="text" class="form-control" placeholder="Nombre" v-model="product.name" @keydown.enter.prevent required>
                                    </div>
                                </div>
                                <div class="col">
                                    <div class="input-group">
                                        <span class="input-group-text w-150">Categoría</span>
                                        <select class="form-select" v-model="product.productCategory_Id">
                                            <option value="0">- Seleccione un elemento -</option>
                                            <option v-for="productCategory in productCategories" :value="productCategory.ProductCategory_Id">{{ productCategory.Name }}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row m-2">
                                <div class="col">
                                    <div class="input-group">
                                        <span class="input-group-text w-150">Descripción</span>
                                        <textarea class="form-control" placeholder="Descripción" v-model="product.description" rows="4"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row m-2">
            <div class="col">
                <button type="button" class="btn btn-danger float-firts" @click="() => router.replace({ name: 'products' })">
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
    import { useProduct } from '@/modules/products/composables';
    const { product, productCategories, save } = useProduct();
</script>

<style scoped>

</style>