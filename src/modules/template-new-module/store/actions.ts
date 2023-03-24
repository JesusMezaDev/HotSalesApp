import type { ActionTree } from 'vuex';

/* Se importan los Interfaces */
import type { iExampleStateInterface } from '@/interfaces/exampleState.interface';
import type { iGlobalState } from '@/interfaces/globalState.interface';

const actions: ActionTree<iExampleStateInterface, iGlobalState> = {
    someAction( /*{ commit }, payload  */ ) {
        // a line to prevent linter errors
    }
}

export default actions;