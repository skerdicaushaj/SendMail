const db = require("../models");
const models = db.sequelize.models;
const axios = require('axios');
const nodemailer = require("nodemailer");

exports.create = async (req, res) => {
    try {
      let postsUrl = "https://jsonplaceholder.typicode.com/posts";
      let dataToCheck = await axios.get(postsUrl);

      // Check if the response data is empty
      if (!dataToCheck.data || dataToCheck.data.length === 0) {
        res.status(404).json({ data: "No data found." });
        return;
      }

      try {
        const existingPosts = await models.posts.findAll({
          where: { id: dataToCheck.data.map((data) => data.id) },
        });
        const exists = existingPosts.length === dataToCheck.data.length;

        if (exists) {
          res.status(200).json({ data: "Data exists." });
        } else {
          const data = await models.posts.bulkCreate(dataToCheck.data);
          res.status(200).json({ data });
        }
      } catch (error) {
        console.error(error);
      }
    } catch (e) {
        res.status(500).send({message: e.message})
    }
};

exports.list = async (req, res) => {
    try {
      //limit data for frontend
        const limit =  req.query.limit || 1000;
        const sortBy = req.query.sort_by || "id"
        const order = req.query.order || "desc"

        const posts = await models.posts.findAll({
            limit, order: [[sortBy, order]]
        });

        res.status(200).send({data: posts})
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

exports.sendWithEmail = async (req, res) => {
    try {
      let postsUrl = "https://jsonplaceholder.typicode.com/posts";
      let usersUrl = "https://jsonplaceholder.typicode.com/users";

      let posts = await axios.get(postsUrl);
      let users = await axios.get(usersUrl);

      // Check if the response data is empty
      if (
        posts.data &&
        posts.data.length > 0 &&
        users.data &&
        users.data.length > 0
      ) {
        const firstThreePostsPerUser = users.data.reduce((result, user) => {
          const userPosts = posts.data
            .filter((post) => post.userId === user.id)
            .slice(0, 3);
          result.push({ user, posts: userPosts });
          return result;
        }, []);

        await sendEmail(firstThreePostsPerUser);
        res.status(200).send({ data: "Email sent!" });
      } else {
        res.status(404).json({ data: "Email not sent because no data found." });
        return;
      }
    } catch (e) {
        res.status(500).send({message: e.message})
    }
}

async function sendEmail(emailContent) {
  //create config for sending mail
  var transport = nodemailer.createTransport({
    host: process.env.NODEMALER_HOST,
    port: process.env.NODEMALER_PORT,
    auth: {
      user: process.env.NODEMALER_USER,
      pass: process.env.NODEMALER_PASS,
    },
  });
  let htmlTemplate = '';
  let mailOptions = {}

  emailContent.forEach((element) => {
    const { user, posts } = element;
    const postTitles = posts.map((post) => post.title);
    htmlTemplate += `
        <h1>${user.name} has written:</h1>
        <ul>
          ${postTitles.map((title) => `<li>${title}</li>`).join("")}
        </ul>
      `;

    //prepare mail options
    mailOptions = {
      to: process.env.EMAIL_RECEIVER,
      // from: test,
      subject: "Some new posts",
      html: htmlTemplate,
    };
  });

    return new Promise((resolve, reject) => {
      transport.sendMail(mailOptions, (err) => {
        if (err) {
          reject(new Error("Error sending mail!"));
        } else {
          resolve();
        }
      });
    });

//   transport.sendMail(mailOptions, function (err) {
//     if (err) {
//         throw new Error("Error sending mail!")
//     } else {
//         return
//     }
// });
}