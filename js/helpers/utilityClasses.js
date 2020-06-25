const getVerticalSpacingClasses = ( props ) => {

	let componentClasses = [];

	console.log( props.verticalSpacing );

	if ( 'undefined' != props.verticalSpacing && 'default' != props.verticalSpacing && props.verticalSpacing ) {
		componentClasses.push( 'wsu-u-space-vertical--' + props.verticalSpacing );
	}

	console.log( componentClasses );

	return componentClasses;

}

export { getVerticalSpacingClasses }
