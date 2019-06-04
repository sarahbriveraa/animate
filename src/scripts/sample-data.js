//samples
var Samples = global.Samples || (global.Samples = {});

function fallback( /* values ... */ ) {
	var ilen = arguments.length;
	var i = 0;
	var v;

	for (; i < ilen; ++i) {
		v = arguments[i];
		if (v !== undefined) {
			return v;
		}
	}
}


// Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
Samples.srand = function (seed) {
	this._seed = seed;
};

Samples.rand = function (min, max) {
	var seed = this._seed;
	min = min === undefined ? 0 : min;
	max = max === undefined ? 1 : max;
	this._seed = (seed * 9301 + 49297) % 233280;
	return min + (this._seed / 233280) * (max - min);
};

Samples.numbers = function (config) {
	var cfg = config || {};
	var min = fallback(cfg.min, 0);
	var max = fallback(cfg.max, 1);
	var from = fallback(cfg.from, []);
	var count = fallback(cfg.count, 8);
	var decimals = fallback(cfg.decimals, 8);
	var continuity = fallback(cfg.continuity, 1);
	var dfactor = Math.pow(10, decimals) || 0;
	var data = [];
	var i, value;

	for (i = 0; i < count; ++i) {
		value = (from[i] || 0) + this.rand(min, max);
		if (this.rand() <= continuity) {
			data.push(Math.round(dfactor * value) / dfactor);
		} else {
			data.push(null);
		}
	}

	return data;
};

// init
Samples.srand(Date.now());
