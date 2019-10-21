import React, { memo } from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function Logo() {
    return (
        <SvgIcon aria-label="logo-icon" viewBox="0 0 64 64" fontSize="large">
            <path d="m23 32h14v2h-14z" />
            <path d="m23 36h14v2h-14z" />
            <path d="m20 45h8v2h-8z" />
            <path d="m30 45h4v2h-4z" />
            <path d="m30.2 27.6a1 1 0 0 0 1.6 0l9-12a1 1 0 0 0 .1-1.047l-3-6a1 1 0 0 0 -.9-.553h-12a1 1 0 0 0 -.895.553l-3 6a1 1 0 0 0 .095 1.047zm4.58-11.6h3.22l-4.83 6.439zm-3.78 6.879-1.72-6.879h3.44zm-1.382-8.879 1.382-2.764 1.382 2.764zm3-4h2.764l-1.382 2.764zm-4.618 2.764-1.382-2.764h2.764zm-1.618 1.236h-2.764l1.382-2.764zm.838 2 1.61 6.439-4.83-6.439zm11.162-2h-2.764l1.382-2.764z" />
            <path d="m59.7 19.688c-.315-.182-.623-.336-.927-.476a12.886 12.886 0 0 0 -8.773-.858v-15.354a1 1 0 0 0 -1-1h-40a5.006 5.006 0 0 0 -5 5v50a5.006 5.006 0 0 0 5 5h40a1 1 0 0 0 1-1v-23.043a.991.991 0 0 0 .562-.447l9.5-16.455a1 1 0 0 0 -.362-1.367zm-11.883 1.674 1.508 2.289c-.459.754-.916 1.556-1.387 2.387l-2.138-3.238a10.835 10.835 0 0 1 2.017-1.438zm-3.4 2.972 2.409 3.649-1.382 2.393-2.464-3.732.691-1.2a10.9 10.9 0 0 1 .745-1.11zm-2.555 4.247 2.464 3.732-1.382 2.394-2.464-3.732zm6.7.4 4.464.269-1.382 2.394-4.464-.269zm1.108-1.936c.477-.841.937-1.647 1.392-2.394l4.464.268-1.382 2.395zm2.693-4.319a5.464 5.464 0 0 1 2.675-2.13 4.134 4.134 0 0 1 2.767.375l-1.162 2.012zm-.178-2.733a11.434 11.434 0 0 0 -1.651 1.85l-.859-1.3c.225-.076.448-.156.68-.218a11.159 11.159 0 0 1 1.825-.331zm-4.185-.948a12.9 12.9 0 0 0 -6.062 5.4l-3.5 6.063a1 1 0 0 0 .031 1.051l3.356 5.082-5.691 9.859 1.732 1 5.691-9.857 4.443.266v14.091h-32v-48h32zm-36 32.955v-48h2v48zm-3-48h1v48h-1a4.948 4.948 0 0 0 -3 1.026v-46.026a3 3 0 0 1 3-3zm0 56a3 3 0 0 1 0-6h39v2h-37v2h37v2zm40.14-24.025-4.465-.268 1.382-2.4 4.465.269z" />
        </SvgIcon>
    );
}

export default memo(Logo);
