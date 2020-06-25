const getVerticalSpacingClasses = ( props ) => {

	return getUtilityClasses(
		{
			verticalSpacing: 'space-vertical',
		},
		props
	)

}

const getMarginSpacingClasses = ( props ) => {

	return getUtilityClasses(
		{
			marginBefore: 'margin-before',
			marginAfter: 'margin-after',
			marginLeft: 'margin-left',
			marginRight: 'margin-right',
		},
		props
	)

}

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

export { 
	getVerticalSpacingClasses,
	getMarginSpacingClasses
}
