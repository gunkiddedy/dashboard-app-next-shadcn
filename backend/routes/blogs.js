const {
    adminAuthenticate,
    authenticate,
  } = require("../middlewares/authenticate"),
  EXPRESS = require("express"),
  ROUTER = EXPRESS.Router(),
  BLOG_CONTROLLERS = require("../controllers/blogs"),
  { upload } = require("../middlewares/multer.middleware");

ROUTER.get(
  "/get-all-blog-posts",
  authenticate,
  BLOG_CONTROLLERS.getAllBlogPosts,
)
  .get("/get-blog/:blog_id", authenticate, BLOG_CONTROLLERS.getBlogPost)
  .use(adminAuthenticate)
  .post("/create/post", upload.single("image"), BLOG_CONTROLLERS.createBlogPost)
  .put("/update/:id", upload.single("image"), BLOG_CONTROLLERS.updateBlogs)
  .delete("/delete/:id", BLOG_CONTROLLERS.deleteBlogs);

module.exports = ROUTER;
