const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
	name: {
		type: String
	},
	size: {
		type: Number
	},
	owner: {
		type: Schema.ObjectId,
		ref: "user"
	},
	storage: {
		type: String
	},
	path: {
		type: String
	},
  type: {
    type: String
  },
	isDeleted: {
		type: Boolean,
		default: false
  },
	publishedAt: {
		type: Date,
		default: Date.now
	}
});

const ImageModel = mongoose.model("image", ImageSchema);

module.exports = ImageModel;
