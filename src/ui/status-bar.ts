export class StatusBar {
	private element: HTMLElement

	constructor() {
		this.element = document.createElement('div')
		this.element.className = 'status-bar'
		this.render()
	}

	private render(): void {
		this.element.innerHTML = `
			<div class="status-bar__stats">
				<div class="stat stat--health">
					<span class="stat__label">HP:</span>
					<div class="stat__bar">
						<div class="stat__bar-fill" style="width: 100%;"></div>
					</div>
					<span class="stat__value">100/100</span>
				</div>
				<div class="stat stat--mana">
					<span class="stat__label">MP:</span>
					<div class="stat__bar">
						<div class="stat__bar-fill" style="width: 75%;"></div>
					</div>
					<span class="stat__value">75/100</span>
				</div>
			</div>
			<button class="status-bar__menu-button">Menu</button>
		`
	}

	public getElement(): HTMLElement {
		return this.element
	}
}
