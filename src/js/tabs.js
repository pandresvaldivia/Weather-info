import { $tabs } from './selectors.js';
import { weekdays } from './constants.js';

function formatDay(num) {
	return num % weekdays.length;
}

function printTabs() {
	let weekday = new Date().getDay();

	$tabs.forEach(($tab, index) => {
		$tab.addEventListener('click', handleSelectTab);
		$tab.innerText = index === 0 ? 'Today' : weekdays[formatDay(weekday)];
		weekday++;
	});
}

function handleSelectTab(e) {
	const $tab = e.target;
	const tabId = $tab.id;
	const $activeTab = document.querySelector('.tab[aria-selected="true"]');

	$activeTab.ariaSelected = false;
	$tab.ariaSelected = true;

	handleSelectPanel(tabId);
}

function handleSelectPanel(id) {
	const $panel = document.querySelector(`[aria-labelledby="${id}"]`);
	const $activePanel = document.querySelector('.tabPanel:not([hidden])');

	$activePanel.hidden = true;
	$panel.hidden = false;
}

export { printTabs };
