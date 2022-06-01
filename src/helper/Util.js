import Paper from '../asset/img/paper.png'
import Rock from '../asset/img/rock.png'
import Scissors from '../asset/img/scissors.png'
import React from 'react'

export const mapButtonImage = (value) => {
    if (value === 'ROCK') {
        return <img width={200} src={Rock}/>
    } else if (value === 'PAPER') {
        return <img width={200} src={Paper}/>
    } else if (value === 'SCISSORS') {
        return <img width={200} src={Scissors}/>
    } else {
        return 'Wait For Other Player'
    }
}