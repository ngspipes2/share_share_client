export class Utils {

    public static sort<T>(elements : T[], valueSupplier :  (element : T) => string) : T[] {
        return elements.sort((elementA, elementB) => {
            let aValue = valueSupplier(elementA);
            let bValue = valueSupplier(elementB);

            if (aValue < bValue)
                return -1;
            if (aValue > bValue)
                return 1;

            return 0;
        });
    }

}
