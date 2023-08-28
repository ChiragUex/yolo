import React from "react";
import {TextField} from "@mui/material";
import {Controller} from "react-hook-form";

const TextFieldControl = (props) => {
  const formInputs = props.formInputs;
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules ? props.rules : ""}
      defaultValue={formInputs[props.findInputIndex(formInputs,props.questionId)].answer ?? null}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <TextField
          id={"textField_"+props.questionId}
          autoComplete="nope"
          type={props.type ?? "text"}
          disabled={props.disabled ?? false}
          data-question-id={props.questionId}
          label={formInputs[props.findInputIndex(formInputs,props.questionId)].question_text}
          variant="outlined"
          margin="none"
          color="secondary"
          value={value}
          error={!!error}
          placeholder={formInputs[props.findInputIndex(formInputs,props.questionId)].place_holder}
          fullWidth
          onKeyDown={(event) => {
            const NUMERIC_PLUS_REGEX = /^[0-9+]+$/;
            if (props.preventAlphabets && !NUMERIC_PLUS_REGEX.test(event.key) && !event.ctrlKey && event.code != "Backspace" && !event.code.includes("Arrow") && !event.code.includes("Delete")) {
              event.preventDefault();
            }
          }}
          onChange={(event) => {
            if (props.maxLength && event.target.value.length > props.maxLength) {
              event.preventDefault();
              return
            }
            if (props.type === "number" && event.target.value < 0) {
              event.target.value = 0;
            }
            if (props.type === "number" && event.target.value > 0 && event.target.value.indexOf(".") > -1) {
              event.target.value = event.target.value.indexOf(".") >= 0 ? event.target.value.slice(0, event.target.value.indexOf(".") + 3) : event.target.value;
            }
            onChange(event)
            formInputs[props.findInputIndex(formInputs,props.questionId)].answer = event.target.value
          }}
          inputProps={{
            classes: {focused: "hello-world", root: "world"},
          }}
          helperText={error ? error.message : null}
        />
      )}
    />
  )
}

export default TextFieldControl;
