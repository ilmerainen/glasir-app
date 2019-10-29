import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import appContext from 'context/AppContext';
import validationSchema from './validationSchema';
import useStyles from './styles';

function CheckoutForm({ submitData }) {
    const classes = useStyles();
    const { authData } = useContext(appContext);
    const { userData } = authData;
    const { id } = userData;
    const { name } = userData;
    let { surname } = userData;
    const initialValues = {
        id,
        name,
        surname: surname || '',
        country: '',
        city: '',
        street: '',
    };

    surname = surname || '';

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                submitData(values);
                setSubmitting(false);
            }}
        >
            <Form>
                <Grid container spacing={2} className={classes.userForm}>
                    <Grid item xs={6}>
                        <Field
                            name="name"
                            component={TextField}
                            label="Name"
                            variant="outlined"
                        >
                            {name}
                        </Field>
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            name="surname"
                            component={TextField}
                            label="Surname"
                            variant="outlined"
                        >
                            {surname}
                        </Field>
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            name="country"
                            component={TextField}
                            label="Country"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            name="city"
                            component={TextField}
                            label="City"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Field
                            name="street"
                            component={TextField}
                            label="Street"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                    >
                        Check Out
                    </Button>
                </Grid>
            </Form>
        </Formik>
    );
}

CheckoutForm.propTypes = {
    submitData: PropTypes.func.isRequired,
};

export default memo(CheckoutForm);
