export const pad = (n: number, width: number, z: string = '0') => {
	z = z
	const str: string = n + ''
	return str.length >= width
		? str
		: new Array(width - str.length + 1).join(z) + n
}
