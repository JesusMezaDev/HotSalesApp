<template>
    <div class="row m-2">
        <div class="col-4" v-for="customer in customerStore.customerStoreList">
            <div class="card mt-2 mb-2 p-1 h-100 border-secondary">
                <div class="row">
                    <div class="col">
                        <img :src="customer.ImageUrl || '/src/assets/NoImagePlaceholder.png'" class="img-thumbnail" alt="No Image">
                    </div>
                    <div class="col">
                        <div class="card-header fs-6">
                            {{ customer.CustomerName }} {{ customer.LastName || '' }}
                        </div>
                        <div class="card-body">
                            <span>
                                <i :class="(customer.Gender === 'F') ? 'bi-balloon-heart' : 'bi-balloon'"></i>
                                {{ (customer.BirthDate) ? new Date(customer.BirthDate).toLocaleDateString('es-MX') : ''}}
                            </span>
                            <br>
                            <span>
                                <i class="bi-telephone"></i>
                                {{ customer.Phone }}
                            </span>
                            <br>
                            <span>
                                <i class="bi-envelope-at"></i>
                                {{ customer.Email }}
                            </span>
                            <br>
                            <span>
                                <i class="bi-map"></i>
                                {{ customer.StreetAddress }}
                            </span>
                            <br>
                            <span>
                                <i class="bi-card-text"></i><p class="card-text">{{ customer.Annotations }}</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useCustomersStore } from '@/modules/customers/store/customers.store';
    const customerStore = useCustomersStore();
</script>

<style scoped>

</style>