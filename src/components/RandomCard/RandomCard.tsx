import React, {FC} from 'react';
import Fool from '../../assets/img/1.jpg';
import Magician from '../../assets/img/2.jpg';
import Priestess from '../../assets/img/3.jpg';
import Empress from '../../assets/img/4.jpg';
import Emperor from '../../assets/img/5.jpg';
import Priest from '../../assets/img/6.jpg';
import Lovers from '../../assets/img/7.jpg';
import Сhariot from '../../assets/img/8.jpg';
import Power from '../../assets/img/9.jpg';
import Hermit from '../../assets/img/10.jpg';
import WheelOfFortune from '../../assets/img/11.jpg';
import Justice from '../../assets/img/12.jpg';
import HangedMan from '../../assets/img/13.jpg';
import Death from '../../assets/img/14.jpg';
import Moderation from '../../assets/img/15.jpg';
import Devil from '../../assets/img/16.jpg';
import Tower from '../../assets/img/17.jpg';
import Star from '../../assets/img/18.jpg';
import Moon from '../../assets/img/19.jpg';
import Sun from '../../assets/img/20.jpg';
import Сourt from '../../assets/img/21.jpg';
import {getRandomNumber} from '../../utils/utils';

const data: string[] = [
    Fool,
    Magician,
    Priestess,
    Empress,
    Emperor,
    Priest,
    Lovers,
    Сhariot,
    Power,
    Hermit,
    WheelOfFortune,
    Justice,
    HangedMan,
    Death,
    Moderation,
    Devil,
    Tower,
    Star,
    Moon,
    Sun,
    Сourt,
]


const randomCard = data[getRandomNumber(0,data.length-1)]

export const RandomCard = () => {
    return <img src={randomCard} alt="image"/>;
};
