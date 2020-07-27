import React, { Component, PropTypes, useRef, useState } from 'react'


import { css } from 'emotion'

function Display({label, value}) {
    
    return (
        <div
            className={css`
                display: inline-block;
                width: 50%;
            `}
        >
            <label>
                {`${label}:`}
                <div
                    className={css`
                        padding: 12px;
                        padding-right: 20px;
                    `}
                >
                    <p>
                        {value}
                    </p>
                </div>
            </label>
        </div>
    )
}

export default Display
