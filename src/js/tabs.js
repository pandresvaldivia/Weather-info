import { $tabs } from './selectors.js';
import { weekdays } from './constants.js';

function formatDay(num) {
	return num % weekdays.length;
}

function printTabs() {
	let weekday = new Date().getDay();

	$tabs.forEach(($tab, index) => {
		$tab.innerText = index === 0 ? 'Today' : weekdays[formatDay(weekday)];
		weekday++;
	});
}

export { printTabs };
