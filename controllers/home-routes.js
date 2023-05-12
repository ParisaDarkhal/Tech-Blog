const router = require("express").Router();
const { User, BlogPost, Comment } = require("../models");

// GET all blogPosts for homepage
// router.get('/', async (req, res) => {
//   try {
//     const dbName = await tableName.findAll({
//       include: [
//         {
//           model: tableName,
//           attributes: ['filename', 'description'],
//         },
//       ],
//     });

//     const galleries = dbGalleryData.map((gallery) =>
//       gallery.get({ plain: true })
//     );

//     res.render('homepage', {
//       galleries,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

module.exports = router;
