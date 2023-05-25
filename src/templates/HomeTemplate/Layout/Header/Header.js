// import React, { Fragment } from 'react'
// import { NavLink } from 'react-router-dom'
// import { history } from '../../../../App';
// import { Select } from 'antd';

// //Hook đa ngôn ngữ
// import { useTranslation } from 'react-i18next';

// import { useSelector } from 'react-redux';
// import _ from 'lodash';
// import { TOKEN, USER_LOGIN } from '../../../../util/settings/config';
// import { useEffect, useState } from 'react';

// const { Option } = Select;


// export default function Header({ isHomePage }) {

//     const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
//     const [showHeader, setShowHeader] = useState(false);
//     const { t, i18n } = useTranslation();


//     const handleChange = (value) => {
//         i18n.changeLanguage(value)
//     }
// useEffect(() => {
//     if (isHomePage) {
//         const handleScroll = () => {
//             if (window.pageYOffset > 0) {
//                 setShowHeader(true);
//             } else {
//                 setShowHeader(false);
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }
// }, [isHomePage]);

//     const renderLogin = () => {
//         if (_.isEmpty(userLogin)) {
//             return <Fragment>
//                 <button style={{ backgroundColor: '#E71A0F' }} onClick={() => {
//                     history.push('/login')
//                 }} className="self-center px-8 py-3 rounded">{t('signin')}</button>
//                 <button onClick={() => {
//                     history.push('/register')
//                 }} className="self-center px-8 py-3 font-semibold rounded bg-violet-600 text-coolGray-50">{t('signup')}</button>

//             </Fragment>
//         }
//         return <Fragment> <button onClick={() => {
//             history.push('/profile')
//         }} className="self-center px-8 py-3 rounded">{t('hello')} : <span className='font-semibold text-lg text-pink-100'>{userLogin.taiKhoan}</span></button>
//             <button onClick={() => {
//                 localStorage.removeItem(USER_LOGIN);
//                 localStorage.removeItem(TOKEN);
//                 history.push('/home');
//                 window.location.reload();
//             }} className="text-white mr-5">{t('logout')}</button>
//         </Fragment>
//     }

//     if (!isHomePage) {
//         return (
//             <header className={`p-4 bg-coolGray-100 text-coolGray-800 bg-opacity-60 bg-black text-white fixed w-full z-10`}>
//                 <div className="container flex justify-between h-16 mx-auto">
//                     <NavLink to="/" aria-label="Back to homepage" className="flex items-center p-2">
//                         <img src='https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png' alt="cgv" />
//                     </NavLink>
//                     <ul className="items-stretch hidden space-x-3 lg:flex mb-0 font-semibold">
//                         <li className="flex">
//                             <NavLink to="/home" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white" activeClassName="border-b-2 border-white">{t('homepage')}</NavLink>
//                         </li>
//                         <li className="flex">
//                             <NavLink to="/" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white" activeClassName="border-b-2 border-white">{t('showtimes')}</NavLink>
//                         </li>
//                         <li className="flex">
//                             <NavLink to="/contact" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" activeClassName="border-b-2 border-white">{t('theater')}</NavLink>
//                         </li>
//                         <li className="flex">
//                             <NavLink to="/news" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" activeClassName="border-b-2 border-white">{t('news')}</NavLink>
//                         </li>
//                         <li className="flex">
//                             <NavLink to="/news" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" activeClassName="border-b-2 border-white">{t('app')}</NavLink>
//                         </li>
//                     </ul>
//                     <div className="items-center flex-shrink-0 hidden lg:flex">

//                         {renderLogin()}

//                         <Select defaultValue="en" style={{ width: 100 }} onChange={handleChange}>
//                             <Option value="en">ENG</Option>
//                             <Option value="chi">CHI</Option>

//                             <Option value="vi">VNI</Option>
//                         </Select>

//                     </div>
//                     <button className="p-4 lg:hidden">
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-coolGray-800">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                         </svg>
//                     </button>


//                     {/* {t('hello.2')} */}
//                 </div>
//             </header>
//         );
//     }
//     return (
//         <header className={`p-4 bg-coolGray-100 text-coolGray-800 bg-opacity-60 ${showHeader ? 'bg-black' : 'bg-transparent'
//             }  text-white fixed w-full z-10`} >
//             <div className="container flex justify-between h-16 mx-auto">
//                 <NavLink to="/" aria-label="Back to homepage" className="flex items-center p-2">
//                     <img src='https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png' alt="cgv" />
//                 </NavLink>
//                 <ul className="items-stretch hidden space-x-3 lg:flex mb-0 font-semibold">
//                     <li className="flex">
//                         <NavLink to="/home" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white" activeClassName="border-b-2 border-white">{t('homepage')}</NavLink>
//                     </li>
//                     <li className="flex">
//                         <NavLink to="/" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600 text-white" activeClassName="border-b-2 border-white">{t('showtimes')}</NavLink>
//                     </li>
//                     <li className="flex">
//                         <NavLink to="/contact" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" activeClassName="border-b-2 border-white">{t('theater')}</NavLink>
//                     </li>
//                     <li className="flex">
//                         <NavLink to="/news" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" activeClassName="border-b-2 border-white">{t('news')}</NavLink>
//                     </li>
//                     <li className="flex">
//                         <NavLink to="/news" className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-white" activeClassName="border-b-2 border-white">{t('app')}</NavLink>
//                     </li>
//                 </ul>
//                 <div className="items-center flex-shrink-0 hidden lg:flex">

//                     {renderLogin()}

//                     <Select defaultValue="en" style={{ width: 100 }} onChange={handleChange}>
//                         <Option value="en">ENG</Option>
//                         <Option value="chi">CHI</Option>

//                         <Option value="vi">VNI</Option>
//                     </Select>

//                 </div>
//                 <button className="p-4 lg:hidden">
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-coolGray-800">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                     </svg>
//                 </button>


//                 {/* {t('hello.2')} */}
//             </div>
//         </header>

//     )
// }


import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App';
import { Select } from 'antd';
//Hook đa ngôn ngữ
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';
import _ from 'lodash';
import { TOKEN, USER_LOGIN } from '../../../../util/settings/config';
import { useState, useEffect } from 'react';
import './Header.css'

const { Option } = Select;
export default function Header({ isHomePage }) {
  const [Clicked, setClicked] = useState(false);
  const [showHeader, setShowHeader] = useState(false);

  const handleClick = () => {
    setClicked(!Clicked)
  }

  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
  const { t, i18n } = useTranslation();
  const handleChange = (value) => {
    i18n.changeLanguage(value)
  }

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return <Fragment>
        <button style={{ backgroundColor: '#E71A0F' }} onClick={() => {
          history.push('/login')
        }} className="self-center px-8 py-3 rounded">{t('signin')}</button>
        <button onClick={() => {
          history.push('/register')
        }} className="self-center px-8 py-3 font-semibold rounded bg-violet-600 text-coolGray-50">{t('signup')}</button>

      </Fragment>
    }
    return <Fragment> <button onClick={() => {
      history.push('/profile')
    }} className="self-center px-5 py-2 userLog rounded">{t('hello')} :<span className='font-semibold text-lg text-pink-100'>{userLogin.taiKhoan}</span></button>
      <button onClick={() => {
        localStorage.removeItem(USER_LOGIN);
        localStorage.removeItem(TOKEN);
        history.push('/home');
        window.location.reload();
      }} className="mr-5 userLog">{t('logout')}</button>
    </Fragment>
  }
  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => {
        if (window.pageYOffset > 0) {
          setShowHeader(true);
        } else {
          setShowHeader(false);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomePage]);


  if(!isHomePage){
    return (
      <div>
        <>
          <nav >
            <NavLink to="/home">
              <img src='https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png' alt="cgv" />
            </NavLink>
            <div>
              <ul id='navbar' className={Clicked ? "#navbar active" : "#navbar"}>
                <li><NavLink className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to="/home">{t('homepage')}</NavLink></li>
                <li><NavLink className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to="/contact">{t('showtimes')}</NavLink></li>
                <li><NavLink className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to="/news">{t('theater')}</NavLink></li>
                <li><NavLink className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to="/news">{t('news')}</NavLink></li>
                <li><NavLink className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to="/news">{t('app')}</NavLink></li>
                <li>{renderLogin()}</li>
                <li><Select defaultValue="en" style={{ width: 100 }} onChange={handleChange}>
                  <Option value="en">ENG</Option>
                  <Option value="chi">CHI</Option>
                  <Option value="vi">VNI</Option>
                </Select></li>
              </ul>
            </div>
  
            <div id='mobile' onClick={handleClick}>
              <i id='bar' className={Clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>
          </nav>
        </>
      </div>
    )
  }
  return (
    <div>
      <>
        <nav style={{
          background: showHeader ? '#000' : 'transparent',
          boxShadow: showHeader ? '0px 15px 10px -15px #111' : 'none'
        }}>
          <NavLink to="/home">
            <img src='https://www.cgv.vn/skin/frontend/cgv/default/images/cgvlogo.png' alt="cgv" />
          </NavLink>
          <div>
            <ul id='navbar' className={Clicked ? "#navbar active" : "#navbar"}>
              <li><NavLink className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to="/home">{t('homepage')}</NavLink></li>
              <li><NavLink className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to="/contact">{t('showtimes')}</NavLink></li>
              <li><NavLink className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to="/news">{t('theater')}</NavLink></li>
              <li><NavLink className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to="/news">{t('news')}</NavLink></li>
              <li><NavLink className='active text-success-50 text-lg' activeClassName="border-b-2 border-white text-success-50 font-bold" to="/news">{t('app')}</NavLink></li>
              <li>{renderLogin()}</li>
              <li><Select defaultValue="en" style={{ width: 100 }} onChange={handleChange}>
                <Option value="en">ENG</Option>
                <Option value="chi">CHI</Option>
                <Option value="vi">VNI</Option>
              </Select></li>
            </ul>
          </div>

          <div id='mobile' onClick={handleClick}>
            <i id='bar' className={Clicked ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </nav>
      </>
    </div>
  )
}