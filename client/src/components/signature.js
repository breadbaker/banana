
import React, { Component, PropTypes, useRef, useState } from 'react'
import CanvasDraw from "react-canvas-draw"


import { css } from 'emotion'

const color = 'grey'

function Input({setSignature, signature}) {
    const canvas = useRef(null);

    function saveSignature() {
      setSignature(canvas.current.getSaveData())
    }
    return (
        <div>
            <label>
                Signature:
                <div
                    className={css`
                        padding: 12px;
                    `}
                >
                    <CanvasDraw
                        hideGrid={true}
                        canvasWidth={480}
                        canvasHeight={160}
                        brushRadius={2}
                        ref={canvas} 
                        onChange={saveSignature} />

                </div>

            </label>
      </div>
    )
}

export default Input

