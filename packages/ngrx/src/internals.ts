export const NGRA_META = '__ngra__meta__';

export function ensureStateMetadata(target: any): StoreMetadata {
    if (!target.hasOwnProperty(NGRA_META)) {
        const defaultMetadata: StoreMetadata = { actions: {}, effects: {} };
        Object.defineProperty(target, NGRA_META, { value: defaultMetadata });
    }
    return target[NGRA_META];
}