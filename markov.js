class MarkovMachine {

    /** build markov machine; read in text.*/

    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter(c => c !== "");
        this.makeChains();
    }

    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() {
        this.wordObject = {};
        // first create empty object
        for (let i = 0; i < this.words.length; i++) {
            if (!this.wordObject[this.words[i]]) {
                this.wordObject[this.words[i]] = []
            }
        }

        // then loop through again adding in the next values
        for (let i = 0; i < this.words.length; i++) {

            let wordKey = this.words[i]
            let nextWord = this.words[i + 1]

            this.wordObject[wordKey].push(nextWord)
        }
    }


    /** return random text from chains */

    makeText(numWords = 25) {
        console.log(this.wordObject)
        let numKeys = Object.keys(this.wordObject).length;
        const randomIndexChoice = Math.floor(Math.random() * numKeys)
        let randomFirstWord = Object.keys(this.wordObject)[randomIndexChoice];
        let result = randomFirstWord;
        let currentWord = randomFirstWord;
        let numNextWordChoices = 0;
        for (let i = 0; i < numWords -1; i++) {
            // get length of word choices. if it is greater than zero, choose a word
            // otherwise, add a period to end of result and choose a new word
            if (this.wordObject[currentWord][0] != undefined){
                numNextWordChoices = this.wordObject[currentWord].length;
                // choose a random valid word from within the array of valid choices and append it to the result
                let randomNextWordChoice = this.wordObject[currentWord][Math.floor(Math.random() * numNextWordChoices)]
                result += " " + randomNextWordChoice
                // make that word the new currentWord before restarting
                currentWord = randomNextWordChoice
            }
            else{
                result += '. '
                console.log(numKeys)
                let newSentenceStartIndex = Math.floor(Math.random() * numKeys);
                currentWord = Object.keys(this.wordObject)[newSentenceStartIndex];
            }
        }
        console.log(result)
        return(result)
    }
}

let m = new MarkovMachine(`the new one`)
m.makeText()

module.exports = {
    MarkovMachine : MarkovMachine
}