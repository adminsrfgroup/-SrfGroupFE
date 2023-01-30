import * as Yup from 'yup';

export const initialValuesSearchAppBar = {
    title: '',
    typeOffer: '',
    category: null,
};

export const validationSchemSearchAppBar = Yup.object({
    title: Yup.string().nullable().notRequired().default(''),
    typeOffer: Yup.string().nullable().notRequired(),
    category: Yup.object().nullable().notRequired().default(null),
});
