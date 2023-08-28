import React from "react";
import {FormHelperText} from "@mui/material";
import {Controller} from "react-hook-form";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ToggleFieldControl = (props) => {
  const formInputs = props.formInputs;
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      defaultValue={formInputs[props.findInputIndex(formInputs, props.questionId)].answer ?? null}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <>
          <ToggleButtonGroup
            id={"radioField_" + props.questionId}
            data-question-id={props.questionId}
            value={value}
            exclusive
            onChange={(event) => {
              onChange(event)
              formInputs[props.findInputIndex(formInputs, props.questionId)].answer = event.target.value
            }}
            className="toggle-button-main"
          >
            {
              formInputs[props.findInputIndex(formInputs, props.questionId)].answer_choices.map((type, i)=> (
                  <ToggleButton value={type} aria-label={type} key={i} className="toggle-button">
                    {type}
                  </ToggleButton>
                )
              )
            }
          </ToggleButtonGroup>
          <FormHelperText error={!!error} variant="outlined"><span>{error?.message}</span></FormHelperText>
        </>
      )}
    />
  )
}

export default ToggleFieldControl;
