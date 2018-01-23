const Post = require('../models/post.model');
const postDb = require('../db/post.db');
const Common = require('./common');

class postController {
    constructor(router) {
        router.route('/post/:id')
            .get(this.getOne)
            .put(this.updateOne)
            .delete(this.deleteOne);
        router.route('/post')
            .get(this.getAll)
            .post(this.insertOne);
    }

    async getOne(req, res, next) {
        try {
            const data = await postDb.getOne(req.params.id);
            if (data) {
                let post = new Post(data);
                return Common.resultOk(res, post);
            } else {
                return Common.resultNotFound(res);
            }
        } catch (e) {
            // handle error
            if (e.code == 0) {
                return Common.resultNotFound(res);
            } else {
                return Common.resultErr(res, e);
            }
        }
    }

    async updateOne(req, res, next) {
        try {
            const data = await postDb.updateOne(req.params.id, req.body);
            if (data) {
                let post = new Post(data);
                return Common.resultOk(res, post);
            } else {
                return Common.resultNotFound(res);
            }
        } catch (e) {
            // handle error
            if (e.code == 0) {
                return Common.resultNotFound(res);
            } else {
                return Common.resultErr(res, e);
            }
        }
    }

    async insertOne(req, res, next) {
        try {
            const data = await postDb.insertOne(req.body);
            if (data) {
                let post = new Post(data);
                return Common.resultOk(res, post);
            } else {
                return Common.resultNotFound(res);
            }
        } catch (e) {
            // handle error
            if (e.code == 0) {
                return Common.resultNotFound(res);
            } else {
                return Common.resultErr(res, e);
            }
        }
    }

    async deleteOne(req, res, next) {
        try {
            const data = await postDb.deleteOne(req.params.id);
            if (data) {
                return Common.resultOk(res, data);
            } else {
                return Common.resultNotFound(res);
            }
        } catch (e) {
            // handle error
            if (e.code == 0) {
                return Common.resultNotFound(res);
            } else {
                return Common.resultErr(res, e);
            }
        }
    }

    async getAll(req, res, next) {
        try {
            const data = await postDb.getAll();
            if (data) {
                let posts = data.map(post => { return new Post(post); });
                return Common.resultOk(res, posts);
            } else {
                return Common.resultNotFound(res);
            }
        } catch (e) {
            return Common.resultErr(res, e);
        }
    }
}

module.exports = postController;
