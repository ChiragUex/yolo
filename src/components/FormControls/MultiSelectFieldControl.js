import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel, FormGroup,
  FormHelperText,
  Radio,
  RadioGroup
} from "@mui/material";
import {Controller} from "react-hook-form";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const MultiSelectFieldControl = (props) => {
  const formInputs = props.formInputs;
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      defaultValue={() => {
        if (formInputs[props.findInputIndex(formInputs, props.questionId)].answer) {
          return formInputs[props.findInputIndex(formInputs, props.questionId)].answer.split(",")
        }
        return null
      }}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <>
          <FormControl>
            <FormGroup
              name={props.name}
              sx={{ flexDirection: "row" }}
              className="checkbox-group"
              id={"radioField_" + props.questionId}
              data-question-id={props.questionId}
              value={value}
              defaultChecked={formInputs[props.findInputIndex(formInputs, props.questionId)].answer.split(",")}
              onChange={(event) => {
                const finalChecked = value
                if (event.target.checked) {
                  finalChecked.push(event.target.value)
                } else if (finalChecked.indexOf(event.target.value) > -1 && event.target.checked === false) {
                  finalChecked.splice(finalChecked.indexOf(event.target.value), 1)
                }
                const finalUniqueItems = [...new Set(finalChecked)]
                onChange({target: {value : finalUniqueItems}})
                formInputs[props.findInputIndex(formInputs, props.questionId)].answer = finalUniqueItems.join(",")
              }}
            >
              {
                formInputs[props.findInputIndex(formInputs, props.questionId)].answer_choices.map((type, i)=> (
                  <FormControlLabel
                    sx={{ minWidth: 450 }}
                    value={type}
                    aria-label={type}
                    key={i}
                    name={`muiMultiCheckbox[${i}]`}
                    multiple
                    control={<Checkbox
                      checked={value?.indexOf(type) > -1}
                    /> }
                    label={type}>
                  </FormControlLabel>
                  )
                )
              }
            </FormGroup>
            <FormHelperText error={!!error} variant="outlined"><span>{error?.message}</span></FormHelperText>
          </FormControl>
        </>
      )}
    />
  )
}

export default MultiSelectFieldControl;
