import { settings } from '@/settings'

type DungeonSize = keyof typeof settings.dungeon.size
type Difficulty = keyof typeof settings.dungeon.difficulty

export class Modal {
	private modalElement: HTMLElement
	private modalContent: HTMLElement
	private onSettingsChange: (size: DungeonSize, difficulty: Difficulty) => void

	constructor(
		onSettingsChange: (size: DungeonSize, difficulty: Difficulty) => void
	) {
		this.onSettingsChange = onSettingsChange

		this.modalElement = document.createElement('div')
		this.modalElement.classList.add('modal')

		this.modalContent = document.createElement('div')
		this.modalContent.classList.add('modal-content')
		this.modalContent.innerHTML = `
      <h2>Menu</h2>
      <p>Choose your game settings:</p>
      <div class="settings-container">
        <div class="size-selection">
          <h3>Map Size</h3>
          ${this.generateSizeButtons()}
        </div>
        <div class="difficulty-selection">
          <h3>Difficulty</h3>
          ${this.generateDifficultyButtons()}
        </div>
      </div>
      <button class="close-button">Resume</button>
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

		this.setupButtonListeners()
	}

	private generateSizeButtons(): string {
		const sizes = Object.keys(settings.dungeon.size) as DungeonSize[]
		return sizes
			.map(
				(size) => `
        <button class="size-button ${
					size === 'medium' ? 'active' : ''
				}" data-size="${size}">${size}</button>
      `
			)
			.join('')
	}

	private generateDifficultyButtons(): string {
		const difficulties = Object.keys(
			settings.dungeon.difficulty
		) as Difficulty[]
		return difficulties
			.map(
				(difficulty) => `
        <button class="difficulty-button ${
					difficulty === 'normal' ? 'active' : ''
				}" data-difficulty="${difficulty}">${difficulty}</button>
      `
			)
			.join('')
	}

	private setupButtonListeners(): void {
		const sizeButtons = this.modalContent.querySelectorAll('.size-button')
		const difficultyButtons =
			this.modalContent.querySelectorAll('.difficulty-button')

		let selectedSize: DungeonSize = 'medium'
		let selectedDifficulty: Difficulty = 'normal'

		sizeButtons.forEach((button) => {
			button.addEventListener('click', () => {
				selectedSize = button.getAttribute('data-size') as DungeonSize

				sizeButtons.forEach((btn) => btn.classList.remove('active'))
				button.classList.add('active')

				this.onSettingsChange(selectedSize, selectedDifficulty)
			})
		})

		difficultyButtons.forEach((button) => {
			button.addEventListener('click', () => {
				selectedDifficulty = button.getAttribute(
					'data-difficulty'
				) as Difficulty

				difficultyButtons.forEach((btn) => btn.classList.remove('active'))
				button.classList.add('active')

				this.onSettingsChange(selectedSize, selectedDifficulty)
			})
		})
	}

	show() {
		this.modalElement.style.display = 'flex'
	}

	hide() {
		this.modalElement.style.display = 'none'
	}
}
