import type { Module } from 'vuex';

/* Se importan los Interfaces  */
import type { iExampleStateInterface } from '@/interfaces/exampleState.interface';
import type { iGlobalState } from '@/interfaces/globalState.interface';

/* Se importan los archivos necesarios para controlar el State */
import state from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const exampleModule: Module<iExampleStateInterface, iGlobalState> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
}

export default exampleModule;