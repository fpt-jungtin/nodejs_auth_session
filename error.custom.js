class MODEL_NOT_FOUND_ERROR_API {
	constructor(modelName, modelId) {
		this.message = `Can't not found ${modelName} with id : ${modelId}`;
	}
}

class MODEL_NOT_FOUND_ERROR {
	constructor(modelName, modelId) {
		this.message = `Can't not found ${modelName} with id : ${modelId}`;
	}
}

class MODEL_ALREADY_EXISTED_ERROR {
	constructor(modelName, attr) {
		this.message = `Model ${modelName} with ${attr} is already existed !`;
	}
}

/* Handler */
const errHandlerMiddleware = async (err, req, res, next) => {
	if (err instanceof MODEL_NOT_FOUND_ERROR) {
		console.error(err);
		res.render("404", { layout: false, error: err });
		return;
	} else if (err instanceof MODEL_NOT_FOUND_ERROR_API) {
		console.error(err);
		res.status(404).json({ error: err });
		return;
	} else if (err instanceof MODEL_ALREADY_EXISTED_ERROR) {
		console.error(err);
		res.render("404", { layout: false, error: err });
		return;
	}

	next(err);
};

module.exports = {
	MODEL_NOT_FOUND_ERROR,
	MODEL_NOT_FOUND_ERROR_API,
	MODEL_ALREADY_EXISTED_ERROR,

	errHandlerMiddleware,
};
