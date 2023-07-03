module.exports = (app) => {
  const posts = require("../controllers/posts.controller");
  const users = require("../controllers/users.controller");

 /**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Get all posts
 *     description: Retrieve a list of all posts.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:                
 *       500:
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Save posts to db
 *     description: Save posts to db.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:                
 *       500:
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

  app.route("/api/posts")
    .get(posts.list)
    .post(posts.create);

  /**
   * @swagger
   * /api/sendEmailPosts:
   *   get:
   *     summary: Send mail for every 3 first post of each user 
   *     description: Send posts with mail.
   *     responses:
   *       200:
   *         description: Successful response
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   name:
   *                     type: string
   *                   email:
   *                     type: string
   *       500:
   *         description: Error response
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   */

  app.route("/api/sendEmailPosts")
    .get(posts.sendWithEmail);

    /**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Save users to db
 *     description: Save users to db.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:                
 *       500:
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */


    /**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get users from db
 *     description: Get users from db.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:                
 *       500:
 *         description: Error response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

  app.route("/api/users")
    .get(users.list)
    .post(users.create);
};
