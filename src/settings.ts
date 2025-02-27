export const settings = {
	dungeon: {
		size: {
			small: {
				width: 30,
				height: 30,
				minRoomSize: 4,
				maxRooms: 6,
			},
			medium: {
				width: 50,
				height: 50,
				minRoomSize: 5,
				maxRooms: 10,
			},
			large: {
				width: 80,
				height: 80,
				minRoomSize: 6,
				maxRooms: 15,
			},
		},

		difficulty: {
			easy: {
				enemyCount: 5,
				trapCount: 2,
			},
			normal: {
				enemyCount: 10,
				trapCount: 5,
			},
			hard: {
				enemyCount: 15,
				trapCount: 10,
			},
		},
	},
}
