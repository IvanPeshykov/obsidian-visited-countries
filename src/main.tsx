import { ItemView, Plugin, WorkspaceLeaf } from 'obsidian';
import { Root, createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import Map from "./Map";

// unique view type identifier
const VIEW_TYPE_CUSTOM = "my-custom-view";

export default class VisitedCountries extends Plugin {
	async onload() {
		// register the view
		this.registerView(
			VIEW_TYPE_CUSTOM,
			(leaf) => new CustomView(leaf)
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

	async activateView() {
		const leaf = this.app.workspace.getLeaf(true);
		await leaf.setViewState({
			type: VIEW_TYPE_CUSTOM,
			active: true,
		});
	}

	onunload() {
		this.app.workspace.getLeavesOfType(VIEW_TYPE_CUSTOM).forEach((leaf) => leaf.detach());
	}
}

class CustomView extends ItemView {
	root: Root | null = null;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_CUSTOM;
	}

	getDisplayText() {
		return "Visited Countries";
	}

	async onOpen() {
		this.root = createRoot(this.containerEl.children[1]);
		this.root.render(
			<StrictMode>
				<Map />
			</StrictMode>
		);
	}

	async onClose() {
		this.root?.unmount();
	}
}
