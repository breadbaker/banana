import React from 'react';
import Loader from 'react-loader-spinner'
import { css } from 'emotion'
import randomColor from 'randomcolor'

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

function Load({type}) {
  return (
    <div
      className={css(`
        display: inline-block;
      `)}>
      <Loader
        type={type}
        color={randomColor({
          luminosity: 'light',
          hue: 'blue'
        })}
        height={Math.random()* 80 + 120}
        width={Math.random()* 80 + 180}
        timeout={3000} //3 secs
      />
    </div>
  )
}
function LoaderScreen() {
  return (
    <div
    className={css(`
      position: fixed;
      width: 100%;
      height: 100%;
      background: #80808094;
      left: 0;
      top: 0;
      text-align: center;
      z-index: 100000000;
      padding-top: 80px;
    `)}>
      <div
        className={css(`
          width: 400px;
          position: absolute;
          left: 50%;
          margin-left: -200px;
        `)}>
        {
          shuffle([
            'Puff',
            'Audio',
            'BallTriangle',
            'Bars',
            'Circles',
            'Grid',
            'Oval',
            'Rings',
            'TailSpin',
            'ThreeDots'
          ]).slice(0,4).map( (type,idx) => {
            return (
              <Load key={idx} type={type} />
            )
          })
        }
      </div>
    </div>
  )
}
export default LoaderScreen