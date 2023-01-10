// http://exploringjs.com/es6/ch_modules.html#sec_cyclic-dependencies
import * as foobars from './foobar'

function foobarA() {
    return "foobarA"
}


function foobarB() {
    return "foobarB " + foobars.foobarA()
}

export {foobarA, foobarB}