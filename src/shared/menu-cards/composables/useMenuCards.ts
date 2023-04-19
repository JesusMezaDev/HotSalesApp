import { ref } from 'vue';

import router from '@/router';

export const useMenuCards = () => {
    const menus = ref([
        { name: 'Clientes', url: 'customers', icon: 'bi-person-circle' },
        { name: 'Productos', url: 'products', icon: 'bi-basket' },
        { name: 'Categoría de Productos', url: 'product-categories', icon: 'bi-tags' },
    ]);

    return {
        menus,
        redirectToComponent: (url: string) => router.replace({ name: url }),
    }
}