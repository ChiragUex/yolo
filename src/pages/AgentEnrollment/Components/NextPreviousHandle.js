import React from "react";
import nextIcon from "../../../assets/images/arrow-right.png";

const NextPreviousHandle = (props) => {
  return (
    <>
      {props.activeStep >= 1 && (
        <div className="d-flex justify-between align-items-center">
          {props.activeStep > 1 && (<button
            className="button-primary full-rounded previous-button dark-button"
            disabled={props.activeStep < 1}
            onClick={props.back}
          >
            <img src={nextIcon} alt="next" className="next-img" />
            <span>Previous</span>
          </button>)}
          <button
            className="button-primary full-rounded start-button"
            disabled={props.activeStep >= 5}
            onClick={props.next}
          >
            <span>{props?.activeStep === 4 ? "Preview" : 'Next'}</span>
            <img src={nextIcon} alt="next" className="next-img" />
          </button>
        </div>
      )}
    </>
  )
}

export default NextPreviousHandle;
