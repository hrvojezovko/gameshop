import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Checkout from './section/Checkout'

class Log extends Component {
    render(){
        return(
            <section>
                <Route path="/login" component={Login} exact />
                <Route path="/signup" component={Register} exact />
                <Route path="/checkout" component={Checkout} exact />
            </section>
        )
    }
}

export default Log