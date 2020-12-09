
/**
 * Repeater.
 * Repeats the markup within the repeater.
 * @param {!number} props.numTimes Number of times the inner markup should be repeated.
 */
export default function Repeater(props) {
	let items = [];
	
	for (let i = 0; i < props.numTimes; i++) {
	  items.push(props.children);
	}

	return items;
}