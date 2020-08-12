
import React, { Component, PropTypes, useRef, useState } from 'react'
import CanvasDraw from "react-canvas-draw"

import Paper from '@material-ui/core/Paper'
import { css } from 'emotion'


import Button from '@material-ui/core/Button';

const color = 'grey'

function Input({setSignature, signature}) {
    const canvas = useRef(null);

    function saveSignature() {
      setSignature(canvas.current.getSaveData())
    }
    return (
        <div>
            <div>
                <div
                    className={css`
                            display: inline-block;
                            text-align: left;
                            width: 50%;
                            
                        `}
                    >  
                Signature:
                </div>
            { setSignature &&
                    <div
                    className={css`
                            display: inline-block;
                            text-align: right;
                            width: 50%;
                            
                        `}
                    >
                        <Button
                            onClick={() => {
                                setSignature('')
                                canvas.current.clear()
                            }}
                            color="primary">
                                Reset Signature
                            </Button>
                    </div>
                }
            </div>

            <div
                className={css`
                    padding: 12px;
                    overflow-x: hidden;
                    margin-right: 20px;
                `}
            >
                
                <Paper elevation={3}>
                    
                <CanvasDraw
                    hideGrid={true}
                    canvasWidth={480}
                    canvasHeight={160}
                    brushRadius={2}
                    lazyRadius={2}
                    ref={canvas} 
                    onChange={saveSignature} />
                    </Paper>
            </div>
      </div>
    )
}

export default Input

