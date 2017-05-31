export const deparam = function( queryString ) {
	var obj = {},
		parmArray = queryString.replace( /\+/g, ' ' ).split( '&' );

	for (var i=0; i<parmArray.length; ++i) {
		var param = parmArray[i].split( '=' ),
			key = decodeURIComponent( param[0] );
		if (param[0]) {
			obj[key] = param.length === 2 ? decodeURIComponent( param[1] ) : '';
		}
	}
	return obj;
};

export const coerceTypes = function(obj, emptyValue) {
	var types = { 'true': !0, 'false': !1, 'null': null };
	for (var k in obj) {
		if (obj.hasOwnProperty(k)) {
			var val = obj[k];
			val = val && !isNaN(val)                ? +val              // number
				: val === 'undefined'             ? undefined         // undefined
				: val === '' ? emptyValue
				: types[val] !== undefined ? types[val] // true, false, null
				: val;
			obj[k] = val;
		}
	}
	return obj;
};
