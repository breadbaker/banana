import React, { Component, PropTypes, useRef, useState } from 'react'
import TextField from '@material-ui/core/TextField'

function Input({label, value, update, type = 'text', disabled = false}) {
    function inputChange(event) {
        update(event.target.value)
    }

    if (type === 'date') {
        return (
            <TextField
                id="standard-basic"
                disabled={disabled}
                onChange={inputChange}
                defaultValue={value}
                type={type}
                InputLabelProps={{
                    shrink: true,
                  }}
                label={label} 
            />
        )
    }

    return (
        <TextField
            id="standard-basic"
            disabled={disabled}
            onChange={inputChange}
            type={type}
            value={value}
            label={label} 
        />
    )
}

export default Input
