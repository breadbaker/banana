import React, { Component, PropTypes, useRef, useState } from 'react'

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function NumberRange({label, value, update, disabled = false, min, max}) {

    const handleChange = (event) => {
      update(event.target.value);
    };

    const options = []
    for( var i = min; i <= max; i++) {
        options.push(i)
    }

    return (
        <FormControl>
            <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
            <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={value}
            onChange={handleChange}
            >
                {options.map((i,idx) => {
                    return (
                    <MenuItem key={idx} value={i}>{i}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}