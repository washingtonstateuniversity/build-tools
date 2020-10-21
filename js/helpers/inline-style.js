const getInlineStyle = ( props, propertyArray, doLegacyCheck = false ) => {

	let inlineStyle = {};

	let emptyProp = ['default',''];

	propertyArray.forEach( styleObj => {

		let key = ( styleObj.hasOwnProperty( 'key' ) ) ? styleObj.key : false;

		if ( key && props.hasOwnProperty( key ) ) {

			let property = ( styleObj.hasOwnProperty( 'property' ) ) ? styleObj.property : '';
			let isBool = ( styleObj.hasOwnProperty( 'isBool' ) ) ? styleObj.isBool : false;
			let value = ( styleObj.hasOwnProperty( 'value' ) ) ? styleObj.value : props[ key ];
			let legacyMap = ( styleObj.hasOwnProperty( 'legacyMap' ) ) ? styleObj.legacyMap : false;

			if ( '' != property ) {

				if ( legacyMap ) {

					value = ( legacyMap.hasOwnProperty( value ) ) ? legacyMap[value] : value;

				}
				
				inlineStyle[ property ] = value;
	
			}
		}
		
	});


	return inlineStyle;
}


export { getInlineStyle };