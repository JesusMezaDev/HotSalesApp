import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { onMounted, ref } from 'vue';

export const useDebouncer = (callback: Function) => {
    const searchTerm = ref<string>('');
    const debouncer: Subject<string> = new Subject();

    onMounted(() => {
        debouncer
        .pipe(
            debounceTime(300)
        )
        .subscribe(value => callback(value));
    });

    const searchKeyUp = () => {
        debouncer.next(searchTerm.value);
    }

    return {
        searchKeyUp,
        searchTerm,
    }
}