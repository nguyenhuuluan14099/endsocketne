import { Button } from "components/button";
import React from "react";
import styled from "styled-components";

const HomeBannerStyle = styled.div`
  height: 520px;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  .banner {
    width: 100%;
    height: 100%;
    padding: 60px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .banner-info {
      width: 450px;

      .title {
        display: block;
        margin: 20px 0px;
        color: #fff;
        font-size: 40px;
        font-weight: bold;
      }
      .button-started {
        margin-top: 20px;
        display: inline-block;
      }
      .desc {
        width: 100%;
        max-width: 500px;
        font-size: 14px;
        color: ${(props) => props.theme.grayLight};
      }
    }
  }
`;
const HomeBanner = () => {
  return (
    <HomeBannerStyle>
      <div className="container">
        <div className="banner">
          <div className="banner-info">
            <h2 className="title">Monkey Blogging</h2>
            <p className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              alias accusamus voluptas velit tempore repellat porro numquam
              natus, voluptatibus perferendis eum, nam, omnis consequatur!
              Nesciunt dolor nemo fugiat! Quas, tempore.
            </p>
            <Button
              to="/sign-up"
              kind="secondary"
              type="button"
              className="button-started"
            >
              Get Started
            </Button>
          </div>

          <div className="banner-logo">
            <img src="/logobanner.png" alt="" className="banner-logo-img" />
          </div>
        </div>
      </div>
    </HomeBannerStyle>
  );
};

export default HomeBanner;
