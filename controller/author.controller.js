const getAuthor = (req, res) => {
	res.send("GET /author");
};

const createAuthor = (req, res) => {
	res.send("POST /author");
};

const updateAuthor = (req, res) => {
	res.send("PATCH /author");
};

const deleteAuthor = (req, res) => {
	res.send("DELETE /author");
};

module.exports = { getAuthor, updateAuthor, deleteAuthor, createAuthor };
