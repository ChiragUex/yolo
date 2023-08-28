import React from "react";
import {
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import {Controller} from "react-hook-form";
import FormControl from "@mui/material/FormControl";

const DropDownFieldControl = (props) => {
  const formInputs = props.formInputs;
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      defaultValue={formInputs[props.findInputIndex(formInputs, props.questionId)].answer ?? null}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <>
          <FormControl fullWidth>
            <InputLabel id={"dropDownFieldLabel_" + props.questionId}>
              {formInputs[props.findInputIndex(formInputs,props.questionId)].question_text}
            </InputLabel>
            <Select
              id={"dropDownField_" + props.questionId}
              data-question-id={props.questionId}
              value={value}
              error={!!error}
              label={formInputs[props.findInputIndex(formInputs,props.questionId)].question_text}
              placeholder={formInputs[props.findInputIndex(formInputs,props.questionId)].question_text}
              onChange={(event) => {
                onChange(event)
                formInputs[props.findInputIndex(formInputs,props.questionId)].answer = event.target.value
              }}
              color="secondary"
              inputProps={{
                classes: { focused: "hello-world", root: "world" },
              }}
            >
              {
                formInputs[props.findInputIndex(formInputs, props.questionId)].answer_choices.map((type, i)=> (
                  <MenuItem value={type} key={i}>{type}</MenuItem>
                  )
                )
              }
            </Select>
          </FormControl>
          <FormHelperText error={!!error} variant="outlined"><span>{error?.message}</span></FormHelperText>
        </>
      )}
    />
  )
}

export default DropDownFieldControl;
