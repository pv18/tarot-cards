import React from 'react';
import s from './FiveCards.module.scss'
import {Image} from 'antd';

export const FiveCards = () => {
  return (
      <div className={s.container}>
          <div className={s.first}>
              <Image src={`./img/${1}.jpg`} />
          </div>
          <div className={s.second}>
              <Image src={`./img/${1}.jpg`} />
          </div>
          <div className={s.third}>
              <Image src={`./img/${1}.jpg`} />
          </div>
          <div className={s.fourth}>
              <Image src={`./img/${1}.jpg`} />
          </div>
          <div className={s.fifth}>
              <Image src={`./img/${1}.jpg`} />
          </div>
      </div>
  );
};
