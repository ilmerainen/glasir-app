import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import useStyles from './styles';

function TextLink({ href, children, ...props }) {
    const classes = useStyles();

    return (
        <Typography>
            <Link href={href} className={classes.link} {...props}>
                {children}
            </Link>
        </Typography>
    );
}

TextLink.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
};

export default memo(TextLink);
