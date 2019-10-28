import React, {useCallback, useState} from 'react';

type CellProps = {
  color: string;
  x: number;
  y: number;
};

const CELL_SIZE = 50;
const WIDTH = Math.floor(Math.sqrt(3) * CELL_SIZE);
const HEIGHT = CELL_SIZE * 2;

const Cell: React.FC<CellProps> = ({x, y, color}) => {
  const [fill, setFill] = useState('transparent');
  const onClick = useCallback(() => {
    setFill(currentColor => (currentColor === color ? 'transparent' : color));
  }, [color]);
  return (
    <>
      <div
        className={'root'}
        style={{
          top: (y * HEIGHT * 3) / 4,
          left: x * WIDTH + (y % 2 === 1 ? WIDTH / 2 : 0),
        }}
      >
        <svg width={WIDTH} height={HEIGHT} viewBox={`${-WIDTH / 2} ${-HEIGHT / 2} ${WIDTH} ${HEIGHT}`}>
          <polygon
            fill={fill}
            stroke={'black'}
            strokeWidth={1}
            points={`0,${-HEIGHT / 2}
            ${-WIDTH / 2},${-HEIGHT / 4}
            ${-WIDTH / 2},${HEIGHT / 4}
            0,${HEIGHT / 2}
            ${WIDTH / 2},${HEIGHT / 4}
            ${WIDTH / 2},${-HEIGHT / 4}`}
            onClick={onClick}
            pointerEvents={'all'}
          />
        </svg>
      </div>
      <style jsx>{`
        .root {
          position: absolute;
          width: ${WIDTH}px;
          height: ${HEIGHT}px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }
        img {
          width: ${CELL_SIZE}px;
          height: ${CELL_SIZE}px;
        }
      `}</style>
    </>
  );
};

export default Cell;
