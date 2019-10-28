import React, {useCallback, useMemo, useState} from 'react';
import {ChromePicker, ColorResult} from 'react-color';
import Draggable from 'react-draggable';
import Cell from './atoms/Cell';

const App: React.FC<{}> = () => {
  const onStop = useCallback((_, {x, y}) => {
    localStorage.setItem('DIALOG_POSITION', JSON.stringify({x, y}));
  }, []);
  const defaultPosition = useMemo(() => {
    const value = localStorage.getItem('DIALOG_POSITION');
    if (!value) {
      return undefined;
    }
    try {
      const position = JSON.parse(value);
      return {x: position.x || 0, y: position.y || 0};
    } catch (e) {
      return undefined;
    }
  }, []);
  const defaultColor = useMemo(() => {
    const value = localStorage.getItem('COLOR');
    if (!value) {
      return '#000';
    }
    return value;
  }, []);
  const [color, setColor] = useState(defaultColor);
  const _setColor = useCallback((color: string) => {
    setColor(color);
    localStorage.setItem('COLOR', color);
  }, []);
  const onChangeColor = useCallback((color: ColorResult) => {
    _setColor(color.hex);
  }, []);
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const array = useMemo(() => {
    return Array(width * height).fill('');
  }, [width, height]);
  return (
    <>
      <div className={'root'}>
        <div className={'map-container'}>
          {array.map((_, index) => {
            const x = index % width;
            const y = Math.floor(index / width);
            return <Cell color={color} key={index} x={x} y={y} />;
          })}
        </div>
        <Draggable defaultPosition={defaultPosition} handle={'.dialog-header'} bounds={'parent'} onStop={onStop}>
          <div className={'dialog'}>
            <div className={'dialog-header'} />
            <div className={'dialog-content'}>
              <div style={{marginBottom: 8}}>
                <div>
                  <label>
                    width:
                    <input type={'number'} value={width} onChange={e => setWidth(Number.parseInt(e.target.value))} />
                  </label>
                </div>
                <div>
                  <label>
                    height:
                    <input type={'number'} value={height} onChange={e => setHeight(Number.parseInt(e.target.value))} />
                  </label>
                </div>
              </div>
              <ChromePicker onChange={onChangeColor} onChangeComplete={onChangeColor} color={color} />
            </div>
          </div>
        </Draggable>
      </div>
      <style jsx>{`
        .root {
          font-size: 200%;
          position: relative;
          display: flex;
          width: 100%;
          height: 100%;
          background-color: #fff;
        }
        .map-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: scroll;
        }
        .dialog-header {
          height: 1.5em;
          padding: 0.25em;
          box-sizing: border-box;
          border-bottom: solid 1px #ccc;
          cursor: move;
          background-color: #ccc;
        }
        .dialog {
          border-radius: 4px;
          position: absolute;
          background-color: #fff;
          box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14),
            0px 9px 46px 8px rgba(0, 0, 0, 0.12);
        }
        .dialog-content {
          padding: 0.25em;
        }
      `}</style>
    </>
  );
};

export default App;
