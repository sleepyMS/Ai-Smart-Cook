import React from 'react'

import Header from './Header'
import Footer from './Footer'
import Nav from './Nav'

const Main = ( props ) => {
    return (
        <>
            <Header />
            <Nav/>
            <main id="main" role="main">
                {props.children}
            </main>
            <Footer />
        </>
    )
}

export default Main;