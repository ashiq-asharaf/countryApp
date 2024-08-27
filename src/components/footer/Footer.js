import React from 'react'
import style from './Footer.module.scss';
import {
    GoogleIcon,
    FacebookIcon,
    LinkedInIcon,
    TwitterIcon,
  } from "../../assets/Assets";

const Footer = () => {
  return (
    <div className={style.footerWrapper}>
        <div className={style.footerContainer}>
      <div className={style.footerIcons}>
        <GoogleIcon className={style.icons} />
        <FacebookIcon className={style.icons} />
        <LinkedInIcon className={style.icons} />
        <TwitterIcon className={style.icons} />
      </div>
      <div className={style.fotterTxtWrapper}>
      <span className={style.footerTxt}>Example@email.com</span>
      <span className={style.footerTxt}>Copyright © 2020 Name. All rights reserved.</span>
      </div>
      </div>
    </div>
  );
}

export default Footer