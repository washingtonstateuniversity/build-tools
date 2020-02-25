import mitt from 'mitt';

if (typeof wsu_wds == 'undefined') {
	window['wsu_wds'] = {};
	wsu_wds = window.wsu_wds;
}

wsu_wds.emitter = mitt();

export default wsu_wds;
