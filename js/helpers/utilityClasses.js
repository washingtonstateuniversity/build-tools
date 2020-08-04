/**
 * 
 * @param {*} propertyKeys [{key:'', classSlug:'', isBool:false, value:'', prefix:'wsu-u-',default:''}]
 * 		
 * @param {*} props 
 */

const getUtilityClasses = ( utilityClasses, props, addClasses = [], asString = true ) => {

	let classes = [];

	for ( const utilityClass of utilityClasses ) {

		if ( utilityClass.hasOwnProperty( 'key' ) ) {

			let key = utilityClass.key;

			// Set base class prefix, accepts an empty string for no value. 
			let prefix = ( utilityClass.hasOwnProperty( 'prefix' )  ) ? utilityClass.prefix : 'wsu-u-';

			// Set the class slug. Not set will result in an empty string
			prefix += ( utilityClass.hasOwnProperty( 'classSlug' )  ) ? utilityClass.classSlug + '--' : '';

			if ( props.hasOwnProperty( key ) ) {

				// Handle boolean properties - uses value prop if true.
				if ( utilityClass.hasOwnProperty( 'isBool' ) && utilityClass.isBool && utilityClass.hasOwnProperty( 'value' ) && props[ key ] ) {

					classes.push( prefix + utilityClass.value );

				} else if ( props[ key ] && 'default' != props[ key ] ) { // Handle text props
					
					classes.push( prefix + props[ key ] );

				}

			}
		}

	}

	classes = classes.concat( addClasses );

	classes.reverse();

	if ( asString ) {

		classes = classes.join( ' ' );

	}

	return classes;

}


export { getUtilityClasses }
