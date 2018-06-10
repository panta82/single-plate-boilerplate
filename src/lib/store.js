export default class Store {
	put(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}
	
	get(key, fallback = null) {
		try {
			return JSON.parse(localStorage.getItem(key)) || fallback;
		}
		catch (err) {
			console.error(err);
			return fallback;
		}
	}
}