<template>
    <div class="col-4">
        <div class="card mt-2 mb-2 p-1 h-100 border-secondary">
            <div class="row">
                <div class="col">
                    <img :src="customerProp.ImageUrl || '/src/assets/NoImagePlaceholder.png'" class="img-thumbnail" alt="No Image">
                </div>
                <div class="col">
                    <div class="card-header fs-6">
                        {{ customerProp.CustomerName }} {{ customerProp.LastName || '' }}
                    </div>
                    <div class="card-body">
                        <span>
                            <i :class="(customerProp.Gender === 'F') ? 'bi-balloon-heart' : 'bi-balloon'"></i>
                            {{ (customerProp.BirthDate) ? new Date(customerProp.BirthDate).toLocaleDateString('es-MX') : ''}}
                        </span>
                        <br>
                        <span>
                            <i class="bi-telephone"></i>
                            {{ customerProp.Phone }}
                        </span>
                        <br>
                        <span>
                            <i class="bi-envelope-at"></i>
                            {{ customerProp.Email }}
                        </span>
                        <br>
                        <span>
                            <i class="bi-map"></i>
                            {{ customerProp.StreetAddress }}
                        </span>
                        <br>
                        <span>
                            <i class="bi-card-text"></i><p class="card-text">{{ customerProp.Annotations }}</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { ICustomer } from '../interfaces/customerResponse.interface';

    const props = defineProps<{ customerProp: ICustomer }>();
</script>

<style scoped>

</style>