/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect } from "react";
import slider1 from "../../images/hero/slider-bg1.jpg";
import slider2 from "../../images/hero/slider-bg2.jpg";
import slider3 from "../../images/hero/slider-bg3.jpg";
import { tns } from "tiny-slider";
import WOW from "wowjs";

const PaginaInicio = () => {
  const banner_info = "Comienza tu proyecto hoy";
  useEffect(() => {
    tns({
      container: ".hero-slider",
      items: 1,
      slideBy: "page",
      autoplay: false,
      mouseDrag: true,
      gutter: 0,
      nav: true,
      controls: false,
      controlsText: [
        '<i class="lni lni-arrow-left"></i>',
        '<i class="lni lni-arrow-right"></i>',
      ],
    });
    new WOW.WOW({
      live: false,
    }).init();
    return () => {
      null;
    };
  }, []);

  return (
    <>
      {/*{<!-- Start Hero Area -->} */}
      <section className="hero-area">
        <div className="hero-slider">
          {/* {<!-- Single Slider -->} */}
          <div
            className="hero-inner overlay"
            style={{ backgroundImage: "url('" + slider1 + "')" }}
          >
            <div className="container">
              <div className="row ">
                <div className="col-lg-8 offset-lg-2 col-md-12 co-12">
                  <div className="home-slider">
                    <div className="hero-text">
                      <h1 className="wow fadeInUp" data-wow-delay=".5s">
                        Misión TIC 2021 <br /> Desarrollo Web
                      </h1>
                      <p className="wow fadeInUp" data-wow-delay=".7s">
                        Sistema de información para la gestión de proyectos de
                        investigación.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PaginaInicio;
