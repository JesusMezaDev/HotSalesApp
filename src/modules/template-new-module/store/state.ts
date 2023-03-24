/* Se importan los Interfaces  */
import type { iExampleStateInterface } from '@/interfaces/exampleState.interface';

function state(): iExampleStateInterface {
    return {
        prop: true,
    }
}

export default state;