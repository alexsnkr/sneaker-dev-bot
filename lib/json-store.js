const fs = require('fs').promises

module.exports = {
	data: {},
	async hydrate() {
		const content = await fs.readFile('store.json', 'utf8')
		this.data = JSON.parse(content)
		console.log('Store hydrated')
	},
	all() {
		return this.data
	},
	get(key) {
		return this.data[key]
	},
	set(key, value) {
		this.data[key] = value
		fs.writeFile('store.json', JSON.stringify(this.data))
	},
}
