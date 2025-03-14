const validate = (data) => {
    return data !== null && typeof data == 'object' && '_key' in data && typeof data._key == 'string';
};
export default validate;
