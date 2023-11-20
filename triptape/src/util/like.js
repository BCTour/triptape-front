import { ref } from 'vue'
import { connect } from "./access.js";

const isLikeTape = async (tapeKey) => {
	try {
		const result = await connect({
			method: 'GET',
			url: `/user/islike/tape?tapeKey=${tapeKey}&userId=${localStorage.getItem("userId")}`
		})
		return result.data;
	} catch (error) {
		console.log(error);
	}
}

const isLikeAttraction = async (attractionKey) => {
	try {
		const result = await connect({
			method: "GET",
			url: `/user/islike/attraction?attractionKey=${attractionKey}&userId=${localStorage.getItem("userId")}`
		})
		return result.data;
	} catch (error) {
		console.log(error);
	}
}

const isLikeRecord = async (tapeKey, recordKey) => {
	try {
		const result = await connect({
			method: "GET",
			url: `/user/islike/record?recordKey=${recordKey}&tapeKey=${tapeKey}&userId=${localStorage.getItem("userId")}`
		})
		return result.data;
	} catch (error) {
		console.log(error);
	}
}

const checkLikeAttraction = async (attractionKey) => {
	try {
		const result = await connect({
			method: 'POST',
			url: `/attraction/like/${attractionKey}/${localStorage.getItem("userId")}`,
		});

	} catch (error) {
		console.log(error);
	}
}

const uncheckLikeAttraction = async (attractionKey) => {

}

const checkLikeRecord = async (tapeKey, recordKey) => {
	try {
		const result = await connect({
			method: 'POST',
			url: `/record/like/${tapeKey}/${recordKey}/${localStorage.getItem("userId")}`,
		});
		return true;
	} catch (error) {
		console.log(error);
		if (error.request.status === 409) return true; 
		return false;
	}
}

const uncheckLikeRecord = async (tapeKey, recordKey) => {
	try {
		const result = await connect({
			method: 'DELETE',
			url: `/record/dislike/${tapeKey}/${recordKey}/${localStorage.getItem("userId")}`,
		});
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

const checkLikeTape = async (tapeKey) => {
	try {
		const result = await connect({
			method: 'POST',
			url: `/tape/like/${tapeKey}/${localStorage.getItem("userId")}`,
		});
		return true;
	} catch (error) {
		console.log(error);
		if (error.request.status === 409) return true; 
		return false;
	}
}

const uncheckLikeTape = async (tapeKey) => {
	try {
		const result = await connect({
			method: 'DELETE',
			url: `/tape/dislike/${tapeKey}/${localStorage.getItem("userId")}`,
		});
		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
}

export {
	isLikeAttraction,
	isLikeRecord,
	isLikeTape,

	checkLikeAttraction,
	checkLikeRecord,
	checkLikeTape,

	uncheckLikeAttraction,
	uncheckLikeRecord,
	uncheckLikeTape,
}