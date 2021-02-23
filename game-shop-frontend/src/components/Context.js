import React, { Component } from 'react'
import {pcc} from '../data'

const DataContext = React.createContext();

class DataProvider extends Component {
    state = {
        pcc: pcc,
        theme: false,
        headerMargin: false,
        searchTerm: '',
        view: "flexrow",
        cart: [],
        favorite: []
    }

    changeTheme = () => {
        this.setState({theme: !this.state.theme})
    }

    changeHeaderMargin = () => {
        this.setState({headerMargin: !this.state.headerMargin})
    }

    editSearchTerm = (e) => {
        this.setState({searchTerm: e.target.value})
    }

    dynamicSearch = () => {
        return this.state.gameNames.filter(gameName => gameName.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    }

    addCart = (id) => {
        console.log("adding to cart");
        const {pcc, cart} = this.state;
        const check = cart.every(item =>{
            return item._id !== id
        })
        if(check){
            const data = pcc.filter(pc =>{
                return pc._id === id
            })
            this.setState({cart: [...cart,...data]})
        }else{
            alert("The game has been added to cart.")
        }
    }

    reduction = id => {
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count === 1 ? item.count = 1 : item.count -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    }

    increase = id => {
        const { cart } =this.state;
        cart.forEach(item =>{
            if(item._id === id){
                item.count +=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    }

    removeProduct = id => {
        if(window.confirm("Do you want to delete this game?")){
            const { cart } = this.state;
            cart.forEach((item, index) =>{
                if(item._id === id){
                    cart.splice(index, 1)
                }
            })
            this.setState({cart: cart});
            this.getTotal();
        }
    }

    getTotal = () => {
        const{cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        },0)
        this.setState({total: res})
    }

    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    }

    componentDidUpdate(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }
    }

    addFavorite = (id) => {
        const {pcc, favorite} = this.state;
        const check = favorite.every(item =>{
            return item._id !== id
        })
        if(check){
            const data = pcc.filter(pc =>{
                return pc._id === id
            })
            this.setState({favorite: [...favorite,...data]})
        }else{
            alert("The game has been added to favorite.")
        }
    }

    removeFavorite = id => {
        if(window.confirm("Do you want to delete this game?")){
            const { favorite } = this.state;
            favorite.forEach((item, index) =>{
                if(item._id === id){
                    favorite.splice(index, 1)
                }
            })
            this.setState({favorite: favorite});
        }
    }

    componentDidUpdate(){
        localStorage.setItem('dataFavorite', JSON.stringify(this.state.favorite))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    }

    componentDidUpdate(){
        const dataFavorite = JSON.parse(localStorage.getItem('dataFavorite'));
        if(dataFavorite !== null){
            this.setState({favorite: dataFavorite});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }
    }

    componentDidMount(){
        this.setGames()
    }

    setGames = () => {
        let tempGames = []
        pcc.forEach(game => {
            let pcGame = {...game}
            pcGame.discount = pcGame.onsale ? Math.floor(100 - (pcGame.price/pcGame.onsale)*100) : 0;
            return (tempGames = [...tempGames, pcGame])
        })
        this.setState({
            pcc: tempGames,
            
        })
        console.log(tempGames)
    }
    

    render(){
        const {cart, theme, headerMargin, total, favorite} = this.state;
        const {addCart, changeTheme, changeHeaderMargin, reduction, increase, removeProduct, getTotal, addFavorite, removeFavorite} = this;
        return(
            <DataContext.Provider value={{...this.state, addCart, cart, theme, changeTheme, headerMargin, changeHeaderMargin, reduction, increase, removeProduct, total, getTotal, addFavorite, favorite, removeFavorite}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}
const ProductConsumer = DataContext.Consumer

export {DataProvider, ProductConsumer, DataContext}