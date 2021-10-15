export const randomNumbers = (cant: number) => {
	const randomArray = Array.from({ length: cant }, () =>
		Math.floor(Math.random() * (1001 - 1) + 1)
	);

	const countRepeated = randomArray.reduce(
		(acc: { [key: number]: number }, value) => ({
			...acc,
			[value]: (acc[value] || 0) + 1,
		}),
		{}
	);

	return countRepeated;
};

process.on('message', (cant: number) => {
	const random = randomNumbers(cant);
	if (process && process.send) {
		process.send(random);
	}
});
