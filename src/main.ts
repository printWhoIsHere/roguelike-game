import '@styles/main.scss'
import { Game } from '@/core/game'
import { StatusBar } from '@ui/status-bar'

const link = document.createElement('link')
link.href =
	'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap'
link.rel = 'stylesheet'
document.head.appendChild(link)

document.addEventListener('DOMContentLoaded', () => {
	const appContainer = document.createElement('div')
	appContainer.id = 'app'

	const statusBar = new StatusBar()
	const canvas = document.createElement('canvas')

	appContainer.appendChild(statusBar.getElement())
	appContainer.appendChild(canvas)

	document.body.appendChild(appContainer)

	new Game(canvas)
})
