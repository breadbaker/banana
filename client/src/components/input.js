import React, { Component, PropTypes, useRef, useState } from 'react'
import TextField from '@material-ui/core/TextField'

function Input({
    label,
    value,
    update,
    type = 'text',
    disabled = false,
    multiline,
    error,
    required
}) {
    function inputChange(event) {
        update(event.target.value)
    }

    if (type === 'date') {
        return (
            <TextField
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
            disabled={disabled}
            onChange={inputChange}
            type={type}
            multiline={multiline}
            rows={2}
            required={required}
            error={!!error}
            helperText={error}
            value={value}
            label={label} 
        />
    )
}

export default Input
