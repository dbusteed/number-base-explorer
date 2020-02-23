export default class BaseXConverter {
	constructor(alphabet) {
		this.alphabet = [...new Set(alphabet.split(''))].join('')
		this.base = alphabet.length
	}

	// convert a number from base10 to baseX
	convert(val) {

		let bXval

		if (val > 0) {
		
			let out = []

			while (val > 0) {
				let newVal = Math.floor(val / this.base)
				let rem = val % this.base
				val = newVal
				out.push(this.alphabet[rem])
			}

			out.reverse()

			bXval = out.join('')
		
		} else {
			
			bXval = this.alphabet[0]
		
		}

		return bXval
	}
}