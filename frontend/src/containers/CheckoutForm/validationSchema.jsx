import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string()
        .max(100, 'Must be maximum 100 characters length')
        .required('Required'),
    surname: Yup.string()
        .max(100, 'Must be maximum 100 characters length')
        .required('Required'),
    country: Yup.string()
        .max(100, 'Must be maximum 100 characters length')
        .required('Required'),
    city: Yup.string()
        .max(100, 'Must be maximum 100 characters length')
        .required('Required'),
    street: Yup.string()
        .max(100, 'Must be maximum 100 characters length')
        .required('Required'),
});

export default validationSchema;
