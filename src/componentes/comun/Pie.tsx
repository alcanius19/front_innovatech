import React from "react";
import "../../js/main";
import "../../css/LineIcons20.css";
import logo from "../../images/logo/logo.svg";
import footer1 from "../../images/blog/footer-news1.jpg";
import footer2 from "../../images/blog/footer-news2.jpg";

const Pie = () => {
  const descripcion =
    "Somos un equipo que busca innovación en gestión de proyectos.";
  return (
    <>
      {/* {<!-- Start Footer Area -->} */}
      <footer className="footer">
        {/* {<!-- Start Middle Top -->} */}
        <div className="footer-middle">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-12">
                {/* {<!-- Single Widget -->} */}
                <div className="f-about single-footer">
                  <div className="logo">
                    <a href="index.html">
                      <img src={logo} alt="Logo" />
                    </a>
                  </div>
                  <p>{descripcion}</p>
                  <div className="footer-social">
                    <ul>
                      <li>
                        <a href="*">
                          <i className="lni lni-facebook-original"></i>
                        </a>
                      </li>
                      <li>
                        <a href="*">
                          <i className="lni lni-twitter-original"></i>
                        </a>
                      </li>
                      <li>
                        <a href="*">
                          <i className="lni lni-linkedin-original"></i>
                        </a>
                      </li>
                      <li>
                        <a href="*">
                          <i className="lni lni-google"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* {<!-- End Single Widget -->} */}
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                {/* {<!-- Single Widget -->} */}
                <div className="single-footer sm-custom-border recent-blog">
                  <h3>Últimas Noticias</h3>
                  <ul>
                    <li>
                      <a href="blog-single-sidebar.html">
                        <img src={footer1} alt="#" />
                        Top 10 books you Must read in 2023
                      </a>
                      <span className="date">
                        <i className="lni lni-calendar"></i>July 15, 2023
                      </span>
                    </li>
                    <li>
                      <a href="blog-single-sidebar.html">
                        <img src={footer2} alt="#" />
                        How to Improve Your Communication Skill
                      </a>
                      <span className="date">
                        <i className="lni lni-calendar"></i>July 1, 2023
                      </span>
                    </li>
                  </ul>
                </div>
                {/* {<!-- End Single Widget -->} */}
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                {/* {<!-- Single Widget -->} */}
                <div className="single-footer sm-custom-border f-link">
                  <h3>Últimos Proyectos</h3>
                  <ul>
                    <li>
                      <a href="*">Advance Javascript – ES6</a>
                    </li>
                    <li>
                      <a href="*">WordPress for Intermediate</a>
                    </li>
                    <li>
                      <a href="*">iOS App Development</a>
                    </li>
                    <li>
                      <a href="*">Wbsite Development</a>
                    </li>
                    <li>
                      <a href="*">Android App Development</a>
                    </li>
                  </ul>
                </div>
                {/* {<!-- End Single Widget -->} */}
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                {/* {<!-- Single Widget -->} */}
                <div className="single-footer footer-newsletter">
                  <h3>Boletin</h3>
                  <p>¡Suscríbete para que estamos en contacto!</p>
                  <form
                    action="mail/mail.php"
                    method="get"
                    target="_blank"
                    className="newsletter-form"
                  >
                    <input
                      name="EMAIL"
                      placeholder="Tu dirección de correo"
                      className="common-input"
                      onFocus={(e) => (e.currentTarget.placeholder = "")}
                      onBlur={(e) =>
                        (e.currentTarget.placeholder = "Tu dirección de correo")
                      }
                      required
                      type="email"
                    />
                    <div className="button">
                      <button className="btn">¡Suscríbete ahora!</button>
                    </div>
                  </form>
                </div>
                {/* {<!-- End Single Widget -->} */}
              </div>
            </div>
          </div>
        </div>
        {/* {<!--/ End Footer Middle -->} */}
        {/* {<!-- Start Footer Bottom -->} */}
        <div className="footer-bottom">
          <div className="container">
            <div className="inner">
              <div className="row">
                <div className="col-12">
                  <div className="left">
                    <p>
                      Integrado a React por InnovaTech. Diseñado por
                      <a
                        href="https://graygrids.com/"
                        rel="noreferrer"
                        target="_blank"
                      >
                        GrayGrids
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* {<!-- End Footer Middle -->} */}
      </footer>
      {/* {<!--/ End Footer Area -->} */}
    </>
  );
};

export default Pie;
