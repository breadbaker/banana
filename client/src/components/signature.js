
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
                        overflow-x: hidden;
                        margin-right: 20px;
                    `}
                >
                    <CanvasDraw
                        hideGrid={true}
                        canvasWidth={480}
                        canvasHeight={160}
                        brushRadius={2}
                        lazyRadius={2}
                        ref={canvas} 
                        onChange={saveSignature} />

                </div>
            </label>
            { setSignature &&
                <button onClick={() => {
                    setSignature('')
                    canvas.current.clear()
                }}>
                    Reset Signature
                </button>
            }
      </div>
    )
}

export default Input

