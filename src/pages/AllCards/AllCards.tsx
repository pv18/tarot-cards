import React from 'react';
import { Image } from 'antd';
import { v1 } from 'uuid';
import s from './AllCards.module.scss';

export const AllCards = () => {
  let data = [];

  for (let i = 1; i <= 78; i++) {
    data.push(`${i}`);
  }

  return (
    <div className={s.AllCards}>
      {data.map((c) => (
        <div key={v1()} className={s.AllCards__Item}>
          <Image width={85} src={`./img/${c}.jpg`} />
        </div>
      ))}
    </div>
  );
};
