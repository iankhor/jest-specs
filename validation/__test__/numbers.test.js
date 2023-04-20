import split,{weightedSplit} from '../numbers'
import {sum} from 'mathjs'


describe('split()', () => {
    describe('even splits', () => {
        test.each`
            number      | numberOfParts     | expected
            ${100}      | ${2}              | ${[50, 50]}
            ${50}       | ${4}              | ${[12.5, 12.5, 12.5, 12.5]}
            ${500}      | ${2}              | ${[250, 250]}
        `('returns $expected when $number is split to $numberOfParts parts, total sum of parts balances', ({number, numberOfParts, expected}) => {
            expect(split(number, numberOfParts)).toEqual(expected)
            expect(sum(expected)).toEqual(number)
        });
    })

    describe('odd splits', () => {
        test.each`
            number      | numberOfParts     | expected
            ${100}      | ${3}              | ${[33.3333, 33.3333, 33.3334]}
            ${500}      | ${6}              | ${[83.3333, 83.3333,83.3333,83.3333,83.3333,83.3335]}
        `('returns $expected when $number is split to $numberOfParts parts, total sum of parts balances', ({number, numberOfParts, expected}) => {
            expect(split(number, numberOfParts)).toEqual(expected)
            expect(sum(expected)).toEqual(number)
        });
    })
})

describe('weightedSplit()', () => {
    describe('trivial weights', () => {
        test.each`
            number      | weights              | expected
            ${100}      | ${[50, 50]}          | ${[50, 50]}
            ${100}      | ${[120, 40]}         | ${[75, 25]}
        `('returns $expected when $number is split to weighted parts $weights, total sum of parts balances', ({number, weights, expected}) => {
            expect(weightedSplit(number, weights)).toEqual(expected)
            expect(sum(expected)).toEqual(number)
        });
    })

    describe('complex weights', () => {
        test.each`
            number      | weights               | expected
            ${100}      | ${[123, 56]}          | ${[68.7151, 31.2849]}
            ${500}      | ${[99, 13]}            | ${[441.9643, 58.0357]}
        `('returns $expected when $number is split to weighted parts $weights, total sum of parts balances', ({number, weights, expected}) => {
            expect(weightedSplit(number, weights)).toEqual(expected)
            expect(sum(expected)).toEqual(number)
        });
    })

    
})