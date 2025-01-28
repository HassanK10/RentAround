import React from "react";
import "../App.css"

const Page3 = () => {
  return (
    <div className="container-fluid Page-3" style={{ overflowX: "hidden" }}>
      <div className="row">
        <div className="col-lg-12">
          <div className="Page3P-2">
            <div className="col-lg-4.5 left">
              <p>Take a video Tour</p>
              <h4>
                Watch the video & learn how to become an Influencer to earn
                money
              </h4>
            </div>
            <div className="col-lg-7.5 right">
              <video
                src="https://ik.imagekit.io/apxxszpa3h/become-a-rentarround-Influencer-and-rarn.mp4?tr=orig"
                controls
                autoFocus
                className="my-video"
                style={{borderRadius:"20px",}}
              ></video>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-center">
        Rent cars bikes homes <br /> services and much more all in <br /> one
        place.
        <br />
        <br />
      </h1>
    </div>
  );
};

export default Page3;
