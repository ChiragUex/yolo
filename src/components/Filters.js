import { Button, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import InputFieldController from "./FormControls/InputFieldController";
import { Controller, useForm } from "react-hook-form";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Filters = (props) => {

    const form = useForm();
    const { control, handleSubmit } = form;
    // const [startDate, setStartDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(null);

  const handleTimeline = (dates) => {
    const [start, end] = dates;
    props.setStartDate(start);
    props.setEndDate(end);
  };

    const location = useLocation();
    const pathname = location.pathname;

    // const handleFormSubmit = (data) => {
    //     data.timeline =  moment(data.timeline).format("yyyy-MM-DD hh:mm:ss")
    //     console.log("search : ", data);
    // }

    const insuranceType = [
        { title: 'Home', value: 'homeinsurance' },
        { title: 'Auto', value: 'autoinsurance' },
        { title: 'Umbrella', value: 'umbrellainsurance' },
        { title: 'Health', value: 'healthinsurance' },
        { title: 'Flood', value: 'floodinsurance' },
    ]


    const leadPriorityFilter = [
        { title: 'Interested', value: '0' },
        { title: 'Not Interested', value: '1' },
        { title: 'Comeback later', value: '2' },
    ]

    console.log("pathname : ", pathname);

    return (
        <>
            <form style={{ width: '100%' }} onSubmit={handleSubmit(props.handleSearchFilter)}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    spacing={2}
                >
                    <Grid item xs={2}>
                        <Controller
                            name="insurance_type"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel id="state-label">Insurance Type</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="state-label"
                                        label="Insurance Type"
                                    >
                                        {insuranceType?.map((item, index) => {
                                            return (
                                                <MenuItem value={item?.value} key={index}>
                                                    {item?.title}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Controller
                                name="timeline"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <FormControl fullWidth>
                                        <DatePicker
                                            label="Timeline"
                                            value={value}
                                            onChange={onChange}
                                            className='datePicker'
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    helperText={<FormHelperText>Timeline</FormHelperText>}
                                                />
                                            )}
                                        />
                                    </FormControl>
                                )}
                            />
                        </LocalizationProvider> */}

                        <Controller
                            name="timeline"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    selected={field.value}
                                    onChange={(date) => handleTimeline(date)}
                                    startDate={props.startDate}
                                    endDate={props.endDate}
                                    selectsRange
                                    startDatePlaceholderText="Start Date"
                                    endDatePlaceholderText="End Date"
                                    placeholderText="Timeline"
                                    className="dateRangePickerFilter"
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <Controller
                            name="lead_priority"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <FormControl fullWidth>
                                    <InputLabel id="state-label">Category</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="state-label"
                                        label="Category"
                                    >
                                        {leadPriorityFilter?.map((item, index) => {
                                            return (
                                                <MenuItem value={item?.value} key={index}>
                                                    {item?.title}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>

                    {pathname == "/lead-management" &&
                        <Grid item xs={2}>
                            <InputFieldController
                                control={control}
                                fullWidth
                                name="location"
                                label="Location"
                                placeholder="Enter Location"
                            />
                        </Grid>
                    }

                    <Grid item xs={2}>
                        <InputFieldController
                            control={control}
                            fullWidth
                            name="search"
                            label="Search"
                            placeholder="Search"
                        />
                    </Grid>

                    <Grid item xs={2}>
                        <Button className='nextBtn' type='submit'>
                            <span>Filter</span>
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}
export default Filters