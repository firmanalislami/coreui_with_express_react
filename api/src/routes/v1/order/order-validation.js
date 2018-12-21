const validate = (order) => {
    const errors = {};
    if (!order.customer_name) {
        errors.customer_name = 'Required';
    }
    return errors;
};
module.exports = validate;