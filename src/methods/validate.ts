import { type dataType } from '../types/data.js';

const validate = (data: unknown): data is dataType => {
    return data !== null && typeof data === 'object' && '_key' in data && typeof (data as any)._key === 'string';
}

export default validate;