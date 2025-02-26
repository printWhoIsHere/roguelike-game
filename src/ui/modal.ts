export class Modal {
	private modalElement: HTMLElement
	private modalContent: HTMLElement

	constructor() {
		this.modalElement = document.createElement('div')
		this.modalElement.classList.add('modal')

		this.modalContent = document.createElement('div')
		this.modalContent.classList.add('modal-content')
		this.modalContent.innerHTML = `
			<h2>Menu</h2>
			<p>This is the game menu.</p>
			<button class="close-button">Close</button>
		`

		this.modalElement.appendChild(this.modalContent)

		document.body.appendChild(this.modalElement)

		const closeButton = this.modalContent.querySelector('.close-button')
		closeButton?.addEventListener('click', () => this.hide())

		this.modalElement.addEventListener('click', (event) => {
			if (event.target === this.modalElement) {
				this.hide()
			}
		})
	}

	show() {
		this.modalElement.style.display = 'flex'
	}

	hide() {
		this.modalElement.style.display = 'none'
	}
}
