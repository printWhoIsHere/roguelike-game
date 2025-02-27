import '@styles/main.scss'
import { Game } from '@/core/game'
import { StatusBar } from '@ui/status-bar'

document.addEventListener('DOMContentLoaded', () => {
	const appContainer = document.createElement('div')
	appContainer.id = 'app'

	const statusBar = new StatusBar()
	const canvas = document.createElement('canvas')

	appContainer.appendChild(statusBar.getElement())
	appContainer.appendChild(canvas)

	document.body.appendChild(appContainer)

	const game = new Game(canvas)
	game.start()
})
