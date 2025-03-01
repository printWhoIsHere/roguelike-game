import '@styles/main.scss'
import { Game } from '@/core/game'
import { StatusBar } from '@ui/status-bar'

document.addEventListener('DOMContentLoaded', async () => {
	const loadingElement = document.createElement('div')
	loadingElement.id = 'loading'
	loadingElement.innerText = 'Loading...'
	document.body.appendChild(loadingElement)

	try {
		const appContainer = document.createElement('div')
		appContainer.id = 'app'

		const statusBar = new StatusBar()
		const canvas = document.createElement('canvas')

		appContainer.appendChild(statusBar.getElement())
		appContainer.appendChild(canvas)

		const game = new Game(canvas)
		await game.init()
		game.start()

		document.body.appendChild(appContainer)
	} catch (error) {
		console.error('Ошибка инициализации игры', error)
		loadingElement.innerText = 'Error loading game'
	} finally {
		document.body.removeChild(loadingElement)
	}
})
