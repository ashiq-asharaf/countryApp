import React from 'react';
import style from './Home.module.scss';
import Header from '../../components/header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/footer/Footer';


const Home = () => {
  return (
    <div className={style.container}>
        <div className={style.innerContainer}>

      
        <Header />
        <main className={style.mainContent}>
        <Outlet />
        </main>
        <Footer />
        </div>
    </div>
  )
}

export default Home