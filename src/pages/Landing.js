import React, { useEffect } from "react";
import "./index.css";
import { Container, Grid } from "@mui/material";
import heroImg1 from "../assets/images/hero-img-1.png";
import heroImg2 from "../assets/images/hero-img-2.png";
import heroImg3 from "../assets/images/hero-img-3.png";
import heroImg4 from "../assets/images/hero-img-4.png";
import heroImg5 from "../assets/images/hero-img-5.png";
import heroImg6 from "../assets/images/hero-img-6.png";
import about from "../assets/images/About Us Page.jpg";
import Slider from "react-slick";

import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
const Landing = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser, isLoggedIn } = useAuth();
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    pauseOnHover: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    if (isLoggedIn()) {
      if (JSON.parse(localStorage.hasOwnProperty('authUserValidated'))) {
        if (JSON.parse(localStorage.getItem("authUserValidated") == false)) {
          // navigate("/create-account");
          navigate({
            pathname: '/create-account',
            search: `?cognitoId=${localStorage.getItem('authCognitoId')}&emailId=${JSON.parse(localStorage.getItem('authUser'))?.attributes?.email}`,
          })
        } else {
          navigate("/dashboard");
        }
      }
    }
  }, []);

  return (
    <div className="layout">
      <div className="heroSection">
        <div>
          <Container>
            <Slider {...settings}>
              <div>
                <Grid container className="heroInfo">
                  <Grid sm={12} md={6} item={true} className="heroText">
                    {/* <h5>A Smarter Way of A Safe Life.</h5> */}
                    <h2>
                      Insurance is not an option but an investment into your
                      future.
                    </h2>
                    <h2>
                      Protect you and your loved ones against unforeseen events.
                    </h2>
                    <h2>
                      Get peace of mind and financial security with our
                      affordable insurance quotes.
                    </h2>
                  </Grid>
                  <Grid sm={12} md={6} item={true} className="heroImage">
                    <img width="579px" alt="Angular Logo" src={heroImg1} />
                  </Grid>
                </Grid>
              </div>
              <div>
                <Grid container className="heroInfo">
                  <Grid sm={12} md={6} item={true} className="heroText">
                    <h5>
                      *Homeowners spent an average of $6,000 on maintenance and
                      repair, in 2022
                    </h5>
                    <h2>
                      Save time and money with our fast and easy home insurance
                      quotes.
                    </h2>
                    <button className="button-primary m-unset">
                      CHECK OUR QUOTES
                    </button>
                  </Grid>
                  <Grid sm={12} md={6} item={true} className="heroImage">
                    <img width="360px" alt="Angular Logo" src={heroImg2} />
                  </Grid>
                </Grid>
              </div>
              <div>
                <Grid container className="heroInfo">
                  <Grid sm={12} md={6} item={true} className="heroText">
                    <h5>
                      *In 2022, structural damage expenses with buildings due to
                      flood risk were estimated to be $13.5 billion
                    </h5>
                    <h2>
                      Don’t let a flood leave you stranded. Get insured and stay
                      afloat.
                    </h2>
                    <button className="button-primary m-unset">
                      CHECK OUR QUOTES
                    </button>
                  </Grid>
                  <Grid sm={12} md={6} item={true} className="heroImage">
                    <img width="579px" alt="Angular Logo" src={heroImg3} />
                  </Grid>
                </Grid>
              </div>
              <div>
                <Grid container className="heroInfo">
                  <Grid sm={12} md={6} item={true} className="heroText">
                    <h5>
                      *The average cost of full coverage car insurance for 2023
                      is $ 2,014 per year
                    </h5>
                    <h2>
                      Get peace of mind on the road with comprehensive auto
                      coverage
                    </h2>
                    <button className="button-primary m-unset">
                      CHECK OUR QUOTES
                    </button>
                  </Grid>
                  <Grid sm={12} md={6} item={true} className="heroImage">
                    <img width="360px" alt="Angular Logo" src={heroImg4} />
                  </Grid>
                </Grid>
              </div>
              <div>
                <Grid container className="heroInfo">
                  <Grid sm={12} md={6} item={true} className="heroText">
                    <h5>
                      *106 million adults in 2022 did not have life insurance or
                      adequate coverage
                    </h5>
                    <h2>
                      Secure your family's financial future with life insurance.
                    </h2>
                    <button className="button-primary m-unset">
                      CHECK OUR QUOTES
                    </button>
                  </Grid>
                  <Grid sm={12} md={6} item={true} className="heroImage">
                    <img width="360px" alt="Angular Logo" src={heroImg5} />
                  </Grid>
                </Grid>
              </div>
              <div>
                <Grid container className="heroInfo">
                  <Grid sm={12} md={6} item={true} className="heroText">
                    <h5>
                      *Umbrella insurance costs an average $383 a year for $1
                      million coverage
                    </h5>
                    <h2>
                      An umbrella policy can provide extra coverage when your
                      other insurance policies fall short.
                    </h2>
                    <button className="button-primary m-unset">
                      CHECK OUR QUOTES
                    </button>
                  </Grid>
                  <Grid sm={12} md={6} item={true} className="heroImage">
                    <img width="520px" alt="Angular Logo" src={heroImg6} />
                  </Grid>
                </Grid>
              </div>
            </Slider>
          </Container>
        </div>
      </div>
      <div className="aboutSection" id="about">
        <Container>
          <Grid container className="aboutSectionInner">
            <Grid sm={12} md={6} item={true} className="aboutText">
              <h1>
                About <span className="spanPrimary">US</span>
              </h1>
              <h2>
                We Exist To Ensure People Spend Time Living And Not Managing
                Insurance
              </h2>
              <p>
                Yoloh is a digital platform that offers one-stop insurance
                services. Get insurance at your own convenience through our
                secure platform without having the need of multiple
                interactions.
              </p>
            </Grid>
            <Grid sm={12} md={6} item={true} className="heroImage">
              <img width="520px" alt="Angular Logo" src={about} />
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
};

export default Landing;
