import { Modal } from '@ui/modal'

export class StatusBar {
	private element: HTMLElement
	private modal: Modal
	private healthValue: HTMLElement
	private healthBar: HTMLElement

	constructor() {
		this.element = document.createElement('div')
		this.element.className = 'status-bar'
		this.modal = new Modal()
		this.render()

		this.healthValue = this.element.querySelector(
			'.stat--health .stat__value'
		) as HTMLElement
		this.healthBar = this.element.querySelector(
			'.stat--health .stat__bar-fill'
		) as HTMLElement
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
			<div>
				<button class="menu-button">Menu</button>
				<button class="menu-button">P</button>
			</div>
		`

		const menuButton = this.element.querySelector('.menu-button')
		menuButton?.addEventListener('click', () => this.modal.show())
	}

	public getElement(): HTMLElement {
		return this.element
	}

	public updateHealth(health: number): void {
		this.healthValue.textContent = `${health}/100`
		this.healthBar.style.width = `${health}%`
	}
}
