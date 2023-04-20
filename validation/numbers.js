import {divide, round, sum, multiply} from 'mathjs'

function adjustRounding(total, parts) {
    const calculatePartToAdjust = () => parts.length - 1
    const partToAdjust = calculatePartToAdjust()

    const balanceAdjustment = round(total - sum(parts), 4);
    parts[partToAdjust] += balanceAdjustment
    
    return round(parts, 4)
}

function split(number, numberOfParts) {
    const singlePart = divide(number, numberOfParts);
    const parts = Array(numberOfParts).fill(singlePart)
    const roundedParts = round(parts, 4)

    return adjustRounding(number, roundedParts)
}

function weightedSplit(number, weights) {
    const totalWeight = sum(weights)
    const weightParts = weights.map(w => divide(w,totalWeight))
    const parts = weightParts.map(w => multiply(w ,number))
    const roundedParts = round(parts, 4)

    return adjustRounding(number, roundedParts)
}

export default split
export {weightedSplit}
