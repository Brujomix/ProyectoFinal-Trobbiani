import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {Checkout, Footer, Header,NavBar} from "../components"
import {Categorias, Home, Productos, Cart, ProductoDetalle, NotFound} from "../pages"

export const MainRoutes = () => {



  return (
    <BrowserRouter>
        <Header/>
        <NavBar/>
        <Routes>           
            <Route exact path='/' element={<Home/>}/>           
            <Route exact path='/productos' element={<Productos/>}/>           
            <Route exact path='/producto/:productoId' element={<ProductoDetalle/>}/>           
            <Route exact path='/categoria/:categoriaId' element={<Categorias/>}/>                    
            <Route exact path='/cart' element={<Cart/>}/>                                       
            <Route exact path='*' element={<NotFound/>}/>                                       
        </Routes>
        <Footer/>
    </BrowserRouter>
  )
}
