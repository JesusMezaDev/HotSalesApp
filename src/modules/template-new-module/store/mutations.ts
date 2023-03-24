import type { MutationTree } from 'vuex';
import type { iExampleStateInterface } from '@/interfaces/exampleState.interface';

const mutation: MutationTree<iExampleStateInterface> = {
    someMutation( /* state: ExampleStateInterface */) {
        // a line to prevent linter errors
    }
}

export default mutation;