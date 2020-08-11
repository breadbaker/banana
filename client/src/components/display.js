import React, { Component, PropTypes, useRef, useState } from 'react'


import { css } from 'emotion'

function Display({label, value}) {
    
    return (
        <div
            className={css`
                display: inline-block;
                width: 33%;
            `}
        >
            <label>
                {`${label}:`}
                <span
                    className={css`
                        padding: 12px;
                        padding-right: 20px;
                    `}
                >
                    {value}
                </span>
            </label>
        </div>
    )
}

export default Display
