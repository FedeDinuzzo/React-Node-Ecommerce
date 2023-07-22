import React, { useState } from 'react';

function Carousel({ product }) {
    const [index, setIndex] = useState(0);
    const [img, setImg] = useState(product.img[0]);
    const [imgPreload, setImgPreload] = useState(product.img[1]);
    const [loaded, setLoaded] = useState(false);
    const [slide, setSlide] = useState(false);

    //Unified logic to use in prev and next buttons
    const newImg = (index, next = true) => {
        setLoaded(false);
        setTimeout(() => {
            const condition = next ? index < product.img.length - 1 : index > 0;
            const nextIndex = next ? (condition ? index + 1 : 0) : (condition ? index - 1 : product.img.length - 1);
            setImg(product.img[nextIndex]);
            setImgPreload(product.img[nextIndex + 1]);
            setIndex(nextIndex);
        }, 300);
    };

    const previous = () => {
        newImg(index, false);
        setSlide(true);
    };   

    const next = () => {
        newImg(index);
        setSlide(false);
    };
    
    //Change the image according to the small one and update the index to keep it when using newImg
    const NewImgThumb = (index) => {
        setImg(product.img[index]);
        setImgPreload(product.img[index + 1]);
        setIndex(index);
    };

  return (
    <>
        <div className="relative flex items-center -mx-4 my-2 lg:my-0 md:py-6">
            <button onClick={previous} className="opacity-40 hover:opacity-100 absolute top-center m-4 text-[fondo] text-3xl p-1 bg-gray-100 rounded-full">{'<'}</button>
            <img src={img} alt="" onLoad={() => setLoaded(true)}
            className={(loaded ? '' : (slide ? 'transition duration-300 opacity-0 translate-x-full' : 'transition duration-300 opacity-0 -translate-x-full')) + " object-cover h-[30rem] md:h-[40rem] w-screen m-auto block"} />
            <img src={imgPreload} alt="" className="hidden" />
            <button onClick={next} className="opacity-40 hover:opacity-100 absolute top-center right-4 fondotext-[fondo] text-3xl p-1 bg-gray-100 rounded-full">{'>'}</button>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 my-2 m-auto w-80 md:w-3/4 lg:w-full xl:max-w-2xl">
            {product.imgMin.map((img, index)=> ( 
            <img src={img} key={index} alt="" height="80" width="80"
            onClick={() => NewImgThumb(index)}
            className="hover:bg-gray-200 mx-auto h-20 md:h-auto my-1 border-2 cursor-pointer rounded-md" />
            ))}
        </div>
    </>
  )
}

export default Carousel