const Layer = require('express/lib/router/layer');

function isAsyncFunction(value) {
	return value[Symbol.toStringTag] === 'AsyncFunction';
}

function wrapAsync(handle) {
	if (handle.length === 4) {
		return (err, req, res, next) => {
			handle(err, req, res, next).catch(next);
		};
	} else {
		return (req, res, next) => {
			handle(req, res, next).catch(next);
		};
	}
}

Object.defineProperty(Layer.prototype, 'handle', {
	enumerable: true,
	get: function() {
		return this._handle;
	},
	set: function(handle) {
		this._handle = isAsyncFunction(handle) ? wrapAsync(handle) : handle;
	}
});
