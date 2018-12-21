const validate = (product) => {
    const errors = {};
    if (!product.name) {
        errors.name = 'Required';
    }
    return errors;
};
module.exports = validate;