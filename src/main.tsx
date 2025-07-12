import {IconName, ItemView, Plugin, WorkspaceLeaf} from 'obsidian';
import { Root, createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import Map from "./Map";

// unique view type identifier
const VIEW_TYPE_CUSTOM = "my-custom-view";

interface VisitedCountriesData {
	visitedCountries: string[];
}

export default class VisitedCountries extends Plugin {

	public data: VisitedCountriesData = {visitedCountries: []};

	async onload() {
		// register the view
		this.registerView(
			VIEW_TYPE_CUSTOM,
			(leaf) => new CustomView(leaf, this)
		);

		this.addRibbonIcon('map', 'Visited Countries', () => {
			this.activateView();
		});

		// add a command to open the view
		this.addCommand({
			id: 'Visited Countries',
			name: 'Open Visited Countries',
			icon: 'map',
			callback: () => {
				this.activateView();
			}
		});
	}

	async loadPluginData() {
		const loaded = await this.loadData();
		if (loaded) {
			this.data = loaded;
		}
	}

	async savePluginData() {
		await this.saveData(this.data);
	}

	async activateView() {
		const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_CUSTOM);
		if (leaves.length > 0) {
			await this.app.workspace.revealLeaf(leaves[0]);
		} else {
			const leaf = this.app.workspace.getLeaf(true);
			await leaf.setViewState({
				type: VIEW_TYPE_CUSTOM,
				active: true,
			});
		}
	}

	async onunload() {
		this.app.workspace.getLeavesOfType(VIEW_TYPE_CUSTOM).forEach((leaf) => leaf.detach());
	}
}

class CustomView extends ItemView {
	root: Root | null = null;
	plugin: VisitedCountries;

	constructor(leaf: WorkspaceLeaf, plugin: VisitedCountries) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType() {
		return VIEW_TYPE_CUSTOM;
	}

	getDisplayText() {
		return "Visited Countries";
	}

	getIcon(): IconName {
		return 'map';
	}

	async onOpen() {
		await this.plugin.loadPluginData()
		this.root = createRoot(this.containerEl.children[1]);
		this.root.render(
			<StrictMode>
				<Map plugin={this.plugin} />
			</StrictMode>
		);
	}

	async onClose() {
		this.root?.unmount();
	}
}
