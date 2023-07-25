import React from 'react';
import { Link } from "react-router-dom";
import { AiFillYoutube, AiFillInstagram, AiFillTwitterCircle, AiOutlineWhatsApp, AiOutlineMail, AiOutlineFieldTime } from "react-icons/ai";

const COMMON_STYLES = " flex text-white text-lg p-1"; 

function Hero() {
  return (
    <section id="footer">
      <div className="bg-[url('./Images/footerBg.jpg')] m-auto bg-top">
        <div className="grid py-12 md:py-32 md:grid-cols-4 h-1/2 mx-auto xl:max-w-7xl">
          <div className="bg-[url('./Images/logo-footer.svg')] h-12 md:h-20 bg-no-repeat mb-12 mx-12 ml-12 lg:ml-0"></div>
          <div className="md:m-auto px-8 xl:px-4 pb-4">  
            <h2 className="text-white text-2xl pb-4">CATEGORIES</h2>
            <Link to={`/category/formula 1`}><button className={COMMON_STYLES}>F1</button></Link>
            <Link to={`/category/link`}><button className={COMMON_STYLES}>LINK</button></Link>
            <Link to={`/category/calibre`}><button className={COMMON_STYLES}>CALIBRE</button></Link>
          </div>
          <div className="md:m-auto px-8 xl:px-4 pb-4">
            <h2 className="text-white text-2xl pb-4">SOCIAL</h2>
            <a href="https://www.youtube.com/user/TAGHeuerOnline" className={COMMON_STYLES} target="_blank" rel="noreferrer"><AiFillYoutube className="flex w-5 h-auto mr-2"/>Youtube</a>
            <a href="https://www.instagram.com/tagheuer/" className={COMMON_STYLES} target="_blank" rel="noreferrer"><AiFillInstagram className="flex w-5 h-auto mr-2"/>Instagram</a>
            <a href="https://twitter.com/TAGHeuer/" className={COMMON_STYLES} target="_blank" rel="noreferrer"><AiFillTwitterCircle className="flex w-5 h-auto mr-2"/>Twitter</a>
          </div>
          <div className="md:m-auto px-8 xl:px-4 pb-4">
            <h2 className="text-white text-2xl pb-4">CONTACT</h2>
            <a href="mailto:federicodinuzzo98@gmail.com" className={COMMON_STYLES} target="_blank" rel="noreferrer"><AiOutlineMail className="flex w-5 h-auto mr-2"/>Email</a>
            <a href="https://wa.me/+5491136786082" className={COMMON_STYLES} target="_blank" rel="noreferrer"><AiOutlineWhatsApp className="flex w-5 h-auto mr-2"/>Whatsapp</a>
            <a href="https://www.google.com/maps/place/Petrona+Eyle+421,+C1107CJC+CABA/@-34.6149901,-58.363972,17z/data=!3m1!4b1!4m5!3m4!1s0x95a334d7131f9885:0xad4ad09b10396aef!8m2!3d-34.6149901!4d-58.3617833" className={COMMON_STYLES} target="_blank" rel="noreferrer"><AiOutlineFieldTime className="flex w-5 h-auto mr-2"/>Ubication</a>
          </div>
        </div>
      </div>
      <p className="bg-black text-white text-center text-sm p-1">© TAG Heuer | Simulator Proyect - 2022</p>
    </section>
  )
}

export default Hero;