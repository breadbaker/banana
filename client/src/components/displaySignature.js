
import React, { Component, PropTypes, useRef, useState } from 'react'
import CanvasDraw from "react-canvas-draw"


import { css } from 'emotion'

const color = 'grey'

function DisplaySignature({signature}) {
    const canvas = useRef(null);
    return (
            <div
                className={css`
                    padding: 12px;
                `}
            >
                <CanvasDraw
                    hideGrid={true}
                    canvasWidth={240}
                    canvasHeight={50}
                    brushRadius={2}
                    ref={canvas} 
                    disabled={true}
                    saveData={signature} />





            </div>
    )
}

export default DisplaySignature

