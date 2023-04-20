import {divide, round, sum} from 'mathjs'

function roundAll(parts, decimalPlaces) {
    return parts.map(part => round(part, decimalPlaces));
}

function adjust(total, parts) {
    parts[parts.length - 1] += round(total - sum(parts), 4);
    return roundAll(parts, 4)
}

function split(number, numberOfParts) {
    const singlePart = divide(number, numberOfParts);
    const parts = Array(numberOfParts).fill(singlePart)
    const roundedParts = roundAll(parts, 4)

    return adjust(number, roundedParts)
}

export default split
