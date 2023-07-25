import React, { useRef, useEffect } from 'react'
import watch from '../Images/watch.png';
import { Link } from "react-scroll";
import gsap from "gsap";

function Hero() {
  let tl = gsap.timeline();
  let cursor = useRef(null);
  let mouseX = 0;
  let mouseY = 0;
  let posX = 0;
  let posY = 0;
  const onMouseMove = (e) => {mouseX = e.pageX; mouseY = e.pageY;}
  
  //Remove warnings on console
  gsap.config({ nullTargetWarn: false });
  
  //GSAP animation
  useEffect(() => {
    tl.to({},0.016,{
      repeat: -1,
      onRepeat: function() {
        posX += (mouseX - posX) / 10 ;
        posY += (mouseY - posY) / 10 ;
        tl.set(cursor, {
          css: {
          left: posX / 12,
          top: posY / 12,
          }
        })
      }
    })
  }, [onMouseMove]);

  return (
    <section onMouseMove={onMouseMove}  id="top" className=" fondo -mt-16 min-h-screen pb-20">
      <div className="grid items-center pt-32 lg:pt-0 lg:grid-cols-2 h-screen m-auto xl:max-w-7xl">
        <div className='grid lg:my-32  px-8 lg:pt-0 xl:px-4 '>
          <p className=" text-white mb-2">TAG HEUER QUALITY EVERYWHERE</p>
          <h1 className="font-bold text-5xl md:text-8xl text-white">The watch you need</h1>
          <Link to="shop" smooth={true}><button className="py-2 px-6 rounded my-8 text-xl fondo text-white shadow-inner transition ease-in hover:translate-y-1 hover:scale-105 shadow-white/20  duration-300">GO SHOPPING</button></Link>
        </div>
        <div className="m-auto max-w-2xl px-8 xl:px-4 lg:pt-32">
          <img ref={el => cursor = el} className="m-auto h-auto w-4/5 lg:w-auto relative cover" src={watch} alt=""/>
        </div>
      </div>
    </section>
  )
}

export default Hero;