const { MarkovMachine } = require('./markov')

let newMarkov;

beforeAll(function(){
    newMarkov = new MarkovMachine('this is the input for a test');
})

test('makeChain should generate an array of length equal to the number of words without duplicates ',
function(){
    let lengthOfWordObject = Object.keys(newMarkov.wordObject).length
    expect(lengthOfWordObject).toEqual([...new Set(newMarkov.words)].length)
})

test('makeText should return a string with unmber of words specified in arg',
 function(){
    let resultString = newMarkov.makeText(20)
    expect.any(String)
    expect(resultString.split(' ').length).toEqual(20)
})