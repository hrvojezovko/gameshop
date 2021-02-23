import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import Pcc from './section/Pcc'
import Details from './section/Details'
import About from './section/About'
import Users from './section/Users'
import Favorite from './section/Favorite'
import Cart from './section/Cart'
import AddGame from './section/AddGame'
import Checkout from './section/Checkout'

export class Section extends Component{
  render(){
    return(
      <section style={sectionn}>
      <Route path="/pc" component={Pcc} exact />
      <Route path="/pc/:id" component={Details} />
      <Route path="/cart" component={Cart} />
      <Route path="/favorite" component={Favorite} />
      <Route path="/addgame" component={AddGame} />
      <Route path="/about-us" component={About} exact />
      <Route path="/users" component={Users} exact />
      <Route path="/checkout" component={Checkout} />
      </section>
    )
  }
}

const sectionn = {
    'width': '76%',
    'maxWidth': '1200px',
    'minHeight': '54vh',
    'margin': 'auto',
    'textAlign': 'center'
}

export default Section