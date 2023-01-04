import React from 'react';
import s from './AllCards.module.scss'

export const AllCards = () => {
    const cards = new Array(78).map((item,i) => i + 1)

    console.log(cards)
    return (
        <div className={s.AllCards}>
            <ul>
                {/*{cards.map((c, i) => <li>{c}</li>)}*/}
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
        </div>
    );
};

