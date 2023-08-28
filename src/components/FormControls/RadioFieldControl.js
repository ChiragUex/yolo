import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup
} from "@mui/material";
import {Controller} from "react-hook-form";

const RadioFieldControl = (props) => {
  const formInputs = props.formInputs;
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      defaultValue={() => {
        if (formInputs[props.findInputIndex(formInputs, props.questionId)].answer) {
          return formInputs[props.findInputIndex(formInputs, props.questionId)].answer
        }
        return null
      }}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <>
          <FormControl>
            <RadioGroup
              name={props.name}
              className="radio-group"
              id={"radioField_" + props.questionId}
              data-question-id={props.questionId}
              value={value}
              defaultValue={formInputs[props.findInputIndex(formInputs, props.questionId)].answer !== "" ? formInputs[props.findInputIndex(formInputs, props.questionId)].answer : ""}
              onChange={(event) => {
                onChange(event)
                formInputs[props.findInputIndex(formInputs, props.questionId)].answer = event.target.value
              }}
            >
              {
                formInputs[props.findInputIndex(formInputs, props.questionId)].answer_choices.map((type, i)=> (
                  <FormControlLabel
                    value={type}
                    aria-label={type}
                    key={i}
                    control={<Radio/>}
                    label={type}>
                  </FormControlLabel>
                  )
                )
              }
            </RadioGroup>
            <FormHelperText error={!!error} variant="outlined"><span>{error?.message}</span></FormHelperText>
          </FormControl>
        </>
      )}
    />
  )
}

export default RadioFieldControl;
