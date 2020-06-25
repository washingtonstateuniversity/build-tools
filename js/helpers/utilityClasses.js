const getUtilityClasses = ( propertyKeys, props ) => {

	let utilityClasses = [];

	for ( const [key, classSlug ] of Object.entries( propertyKeys ) ) {

		if ( props.hasOwnProperty( key ) ) {

			if ( props[ key ] && 'default' != props[ key ] ) {

				utilityClasses.push( 'wsu-u-' + classSlug + '--' + props[ key ] );

			}

		}

	}

	return utilityClasses;

}

export { getUtilityClasses }
