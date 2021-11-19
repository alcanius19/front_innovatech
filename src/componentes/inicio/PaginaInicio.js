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
                      <h5 className="wow fadeInUp" data-wow-delay=".3s">
                        {banner_info}
                      </h5>
                      <h1 className="wow fadeInUp" data-wow-delay=".5s">
                        Excellent And Friendly <br /> Faculty Members
                      </h1>
                      <p className="wow fadeInUp" data-wow-delay=".7s">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting <br /> industry. Lorem Ipsum has been the
                        industry&apos;s standard
                        <br />
                        dummy text ever since an to impression.
                      </p>
                      <div className="button wow fadeInUp" data-wow-delay=".9s">
                        <a href="about-us.html" className="btn">
                          Learn More
                        </a>
                        <a href="courses-grid.html" className="btn alt-btn">
                          Our Courses
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* {<!--/ End Single Slider -->} */}
          {/* {<!-- Single Slider -->} */}
          <div
            className="hero-inner overlay"
            style={{ backgroundImage: "url('" + slider2 + "')" }}
          >
            <div className="container">
              <div className="row ">
                <div className="col-lg-8 offset-lg-2 col-md-12 co-12">
                  <div className="home-slider">
                    <div className="hero-text">
                      <h5 className="wow fadeInUp" data-wow-delay=".3s">
                        {banner_info}
                      </h5>
                      <h1 className="wow fadeInUp" data-wow-delay=".5s">
                        Innovation Paradise
                        <br /> For Students{" "}
                      </h1>
                      <p className="wow fadeInUp" data-wow-delay=".7s">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting <br /> industry. Lorem Ipsum has been the
                        industry&apos;s standard
                        <br />
                        dummy text ever since an to impression.
                      </p>
                      <div className="button wow fadeInUp" data-wow-delay=".9s">
                        <a href="about-us.html" className="btn">
                          Learn More
                        </a>
                        <a href="events-grid.html" className="btn alt-btn">
                          Our Events
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* {<!--/ End Single Slider -->} */}
          {/* {<!-- Single Slider -->} */}
          <div
            className="hero-inner overlay"
            style={{ backgroundImage: "url('" + slider3 + "')" }}
          >
            <div className="container">
              <div className="row ">
                <div className="col-lg-8 offset-lg-2 col-md-12 co-12">
                  <div className="home-slider">
                    <div className="hero-text">
                      <h5 className="wow fadeInUp" data-wow-delay=".3s">
                        {banner_info}
                      </h5>
                      <h1 className="wow fadeInUp" data-wow-delay=".5s">
                        Your Ideas Will Be <br /> Heard & Supported
                      </h1>
                      <p className="wow fadeInUp" data-wow-delay=".7s">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting <br /> industry. Lorem Ipsum has been the
                        industry&apos;s standard
                        <br />
                        dummy text ever since an to impression.
                      </p>
                      <div className="button wow fadeInUp" data-wow-delay=".9s">
                        <a href="about-us.html" className="btn">
                          Learn More
                        </a>
                        <a href="#" className="btn alt-btn">
                          Our Courses
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* {<!--/ End Single Slider -->} */}
        </div>
      </section>
    </>
  );
};

export default PaginaInicio;
