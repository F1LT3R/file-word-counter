const fs = require('fs');
const excludeList = require('./exclude-list.json');

// Get a list of flags (filles) passed
// to this Node.js script.
const files = process.argv.slice(2);

// Setup an object to count the words.
const wordCount = {
	// Example:
	foo: 0,
	bar: 99
};

files.forEach(file => {
	const buffer = fs.readFileSync(file);
	const text = String(buffer);

	const words = text
		// Make sure "Test" and "test" are
		// counted as the same word.
		.toLowerCase()
		// Remove punctuation.
		.replace(/[.,;:]+/g, '')
		// Turn newlines to spaces to make
		// word slitting work between lines.
		.replace(/\n/g, ' ')
		.split(' ');

	words.forEach(word => {
		// Don't add blank words.
		if (word === '') {
			return;
		}

		// Don't add words from the exclude list.
		if (excludeList.includes(word)) {
			return;
		}

		// Create a word property on the
		// wordCount object if it doesn't exist.
		if (!Reflect.has(wordCount, word)) {
			wordCount[word] = 0;
		}

		// Add to the word count for this word.
		wordCount[word] += 1;
	})
})

console.log(wordCount);