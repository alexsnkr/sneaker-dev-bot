const selling = require('./selling')
const sellingServices = require('./selling-services')
const buying = require('./buying')
const lookingForDev = require('./looking-for-dev')
const designServices = require('./design-services')
const businessReviews = require('./business-reviews')
const devForHire = require('./dev-for-hire')

module.exports = {
	selling,
	buying,
	'looking-for-dev': lookingForDev,
	'design-services': designServices,
	'selling-services': sellingServices,
	'business-reviews': businessReviews,
	'dev-for-hire': devForHire,
}
