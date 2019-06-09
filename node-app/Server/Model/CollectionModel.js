const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	icon: {
		type: String,
		default: 'browser'
	},
	tags: [{
		type: String
	}],
	branch: [{
		type: Schema.ObjectId,
		ref: 'branch'
	}],
	isPrivate: {
		type: Boolean,
		default: false
	},
	isDeleted: {
		type: Boolean,
		default: false
	},
	author: {
		type: Schema.ObjectId,
		ref: 'user'
	},
	views: {
		type: Number,
		default: 0
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	},
	deleted_at: {
		type: Date
	}
});

const CollectionModel = mongoose.model('collection', CollectionSchema);

module.exports = CollectionModel;
