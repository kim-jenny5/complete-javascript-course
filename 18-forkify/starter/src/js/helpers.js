export const getJSON = async (url) => {
	try {
		const resp = await fetch(url);
		const data = await resp.json();

		if (!resp.ok) throw new Error(`${data.message} (${resp.status})`);
		return data;
	} catch (err) {
		// console.log(err);
		// alert(err);
		throw err;
	}
};
