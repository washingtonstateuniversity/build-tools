const getInlineStyle = ( props, propertyArray ) => {

	let inlineStyle = {};

	let emptyProp = ['default',''];

	propertyArray.forEach( styleObj => {

		let key = ( styleObj.hasOwnProperty( 'key' ) ) ? styleObj.key : false;

		if ( key && props.hasOwnProperty( key ) ) {

			let property = ( styleObj.hasOwnProperty( 'property' ) ) ? styleObj.property : styleObj.key;
			let isBool = ( styleObj.hasOwnProperty( 'isBool' ) ) ? styleObj.isBool : false;
			let value = ( styleObj.hasOwnProperty( 'value' ) ) ? styleObj.value : props[ key ];
			let legacyMap = ( styleObj.hasOwnProperty( 'legacyMap' ) ) ? styleObj.legacyMap : false;

			if ( '' != property ) {

				if ( legacyMap ) {

					value = ( legacyMap.hasOwnProperty( value ) ) ? legacyMap[value] : value;

				}

				if ( ! emptyProp.includes( value ) ) {

					inlineStyle[ property ] = value;

				}
	
			}
		}
		
	});


	return inlineStyle;
}

const setInlineStyleDefaults = ( inlineStyleMap, defaultStyleMap ) => {

	for ( var key in defaultStyleMap) {

		if ( defaultStyleMap.hasOwnProperty( key ) ) {
			
			if ( inlineStyleMap.hasOwnProperty( key ) ) {

				if ( '' == inlineStyleMap[ key ] || 'default' == inlineStyleMap[ key ] ) {

					inlineStyleMap[ key ] = defaultStyleMap[ key ];

				}

			} else {

				inlineStyleMap[ key ] = defaultStyleMap[ key ];

			}

		}

	}

	return inlineStyleMap;
}


export { getInlineStyle, setInlineStyleDefaults };