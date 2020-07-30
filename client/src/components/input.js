import React, { Component, PropTypes, useRef, useState } from 'react'


import { css } from 'emotion'

const color = 'grey'

function Input({label, value, update, type = 'text'}) {
    function inputChange(event) {
        update(event.target.value)
    }

    function defaultDate() {
        var local = new Date();
        local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
        return local.toJSON().slice(0,10);
    }
    
    return (
        <div
            className={css`
                display: inline-block;
                width: ${type=== 'number' ? '25%': '33%'}
            `}
        >
            <label>
                {`${label}:`}
                <div
                    className={css`
                        padding: 12px;
                        padding-right: 30px;
                    `}
                >
                    <input 
                        className={css`
                            padding: 5px;
                            width: 100%;
                        `}
                        type={type}
                        onChange={inputChange}
                        value={type === 'date' && !value ? defaultDate() : value} 
                    />
                </div>
            </label>
        </div>
    )
}

export default Input
