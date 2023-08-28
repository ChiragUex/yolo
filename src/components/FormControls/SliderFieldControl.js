import React from "react";
import {Controller} from "react-hook-form";
import Slider from "@mui/material/Slider";

const SliderFieldControl = (props) => {
  const formInputs = props.formInputs;
  return (
    <Controller
      name={props.name}
      control={props.control}
      // rules={props.rules}
      // defaultValue={formInputs[props.findInputIndex(formInputs, props.questionId)].answer}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <>
          <div className="customer-information-input">
            <h5 className="form-label-fild prifix">Limits</h5>
            <h4 className="slider-label">$300,000 - $500,000</h4>
            <Slider
              id="testing1"
              name="testing1"
              aria-label="Volume"
              // defaultValue={20}
              marks={props.marks}
              step={null}
              // value={value}
              // onChange={(event) => value = event.target.value}
            />
          </div>
        </>
        )}
    />
  )
}

export default SliderFieldControl;
