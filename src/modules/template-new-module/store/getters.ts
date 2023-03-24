import type { GetterTree } from 'vuex';

/* Se importan los Interfaces */
import type { iExampleStateInterface } from '@/interfaces/exampleState.interface';
import type { iGlobalState } from '@/interfaces/globalState.interface';

const getters: GetterTree<iExampleStateInterface, iGlobalState> = {
    someGetter( /* state */ ) {
        // return true;
    }
}

export default getters;