import React from 'react';
import Nav from "./nav";

interface Props {
    children: any
}

function Base({children}: Props) {
    return (
        <>
            <Nav />
            <main>{children}</main>
        </>
    );
}

export default Base;