import React, {useState} from 'react';
import {Button, Image} from 'antd';
import {v1} from 'uuid';
import s from './FiveCards.module.scss';

const data: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
    42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
];

export const FiveCards = () => {
    const [deck, setDeck] = useState<number[]>(data)
    const [cards, setCards] = useState<number[]>([]);

    const addCard = (array: number[]) => {
        const min = 0;
        const max = array.length - 1;
        const random = Math.floor(Math.random() * (max - min + 1) + min);

        setCards([...cards, deck[random]])
        setDeck(prev => prev.filter(n => n !== array[random]))
        console.log(cards)
        console.log(deck)
    };

    const shuffleCards = (array: number[]) => {
        let i = 0,
            j = 0,
            temp = null;

        for (i = array.length - 1; i > 0; i -= 1) {
            j = Math.floor(Math.random() * (i + 1));
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        console.log(array)
        setDeck(array)
    };

    const restart = () => {
        setDeck(data)
        setCards([])
    }

    return (
        <div className={s.container}>
            <div className={s.cards}>
                {cards.map((c) => (
                    <div key={v1()}>
                        <Image src={`./img/${c}.jpg`}/>
                    </div>
                ))}
            </div>
            <div className={s.cards}>
                <Button
                    type="primary"
                    size="large"
                    disabled={cards.length >= 5}
                    onClick={() => addCard(deck)}
                >
                    Взять карту
                </Button>
                <Button
                    type="primary"
                    size="large"
                    disabled={cards.length > 0}
                    onClick={() => shuffleCards(deck)}
                >
                    Тасовать карты
                </Button>
                <Button
                    type="primary"
                    size="large"
                    disabled={cards.length < 5}
                    onClick={restart}
                >
                    Заново
                </Button>
            </div>
        </div>
    );
};
