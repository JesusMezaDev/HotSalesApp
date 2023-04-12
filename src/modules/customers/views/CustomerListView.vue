<template>
    <div class="row m-2 mt-4 align-items-center">
        <div class="col">
            <h3>
                <i class="bi-person-circle"></i>
                Clientes
            </h3>
        </div>
    </div>
    <CustomerSearch />
    <CustomerCard/>
    <BackToMenuButton />
</template>

<script setup lang="ts">
    import CustomerCard from '@/modules/customers/components/CustomerCard.vue';
    import CustomerSearch from '@/modules/customers/components/CustomerSearchBar.vue';
    import BackToMenuButton from '@/shared/components/BackToMenuButton.vue';
</script>

<style scoped>

</style>