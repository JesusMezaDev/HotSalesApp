<template>
    <div class="row">
        <div class="col-sm-3 m-3" v-for="menu in menus">
            <div class="card border-primary text-center" @click="redirectToComponent(menu.url)">
                <div class="card-header">
                    {{ menu.name }}
                </div>
                <i :class="menu.icon"></i>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useMenuCards } from '@/shared/menu-cards/composables/useMenuCards';
    const { menus, redirectToComponent } = useMenuCards();
</script>

<style scoped>
    i {
        font-size: 150px;
    }

    .card {
        transition: background-color 0.3s;
    }

    .card:hover {
        background-color: #30414D;
        cursor: pointer;
    }

    .card:active {
        background-color: #3E6987;
    }
</style>