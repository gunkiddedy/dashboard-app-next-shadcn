const { ObjectId } = require("mongodb"),
  {
    uploadBytes,
    getDownloadURL,
    storage,
    ref,
  } = require("../config/firebaseConfigure.js"),
  { setCache, getCache, deleteCache } = require("../config/cache.js"),
  Blog = require("../models/blog.js");

// Create a blog post
const createBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) throw new Error("Title or Content not found");
    const IMAGE = req.file,
      CREATE_AT = new Date();
    let imageUrl = ""; // Initialize imageUrl here

    // Firebase upload
    try {
      if (IMAGE) {
        const IMAGE_REF = ref(storage, `blog-media/${IMAGE.originalname}`),
          SNAPSHOT = await uploadBytes(IMAGE_REF, IMAGE.buffer, {
            contentType: IMAGE.mimetype,
          });
        imageUrl = await getDownloadURL(SNAPSHOT.ref);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Error uploading image");
    }
    const SLUG = title.toLowerCase().replace(/ /g, "-"),
      BLOG_URL = SLUG.substring(0, 60)?.replace(/-$/, ""),
      BLOG = await Blog.create({
        title,
        content,
        imageUrl,
        blogUrl: BLOG_URL,
        createdAt: CREATE_AT,
      }),
      BLOG_DATA = await Blog.findById({ _id: BLOG._id });

    if (!BLOG_DATA) {
      throw new Error("Error creating blog");
    }
    deleteCache("blogs");
    res
      .status(200)
      .json({
        message: "Blog created successfully",
        id: BLOG._id,
        blogUrl: BLOG_DATA.blogUrl,
        blogData: BLOG_DATA,
      });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(400).json({ message: "Contact to admin for this issue" });
  }
};

const getBlogPost = async (req, res) => {
  try {
    const BLOG_URL = req.params.blog_id;
    if (!BLOG_URL) throw new Error("Blog URL not found.");

    const CACHED_DATA = getCache("blogs");
    let blog;
    if (CACHED_DATA) blog = CACHED_DATA.find((i) => i.blogUrl === BLOG_URL);
    if (!CACHED_DATA) blog = await Blog.findOne({ blogUrl: BLOG_URL });

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(400).json({ message: "Contact to admin for this issue" });
  }
};

const getAllBlogPosts = async (req, res) => {
  try {
    let blogs;
    const PAGE = parseInt(req.query.page) || 1,
      LIMIT = parseInt(req.query.limit) || 12,
      SKIP = (PAGE - 1) * LIMIT,
      BLOG_COUNT = await Blog.countDocuments();
    // Fetch the blogs with pagination
    const CACHED_DATA = getCache("blogs");

    if (!CACHED_DATA) {
      blogs = await Blog.find({})
        .sort({ createdAt: -1 })
        .skip(SKIP)
        .limit(LIMIT);
      setCache("blogs", blogs);
    } else {
      blogs = CACHED_DATA;
    }
    res.status(200).json({ blogs, total: BLOG_COUNT });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(400).json({ message: "Contact admin for this issue" });
  }
};

const updateBlogs = async (req, res) => {
  try {
    const ID = new ObjectId(req.params.id),
      PAYLOAD = req.body,
      IMAGE = req.file;

    if (!PAYLOAD.title || !PAYLOAD.content) throw new Error("Data not found");

    let imageUrl = ""; // Initialize imageUrl here
    // Firebase upload
    try {
      if (IMAGE == undefined) {
        imageUrl = "";
      } else if (IMAGE) {
        const IMAGE_REF = ref(storage, `blog-media/${IMAGE.originalname}`),
          SNAPSHOT = await uploadBytes(IMAGE_REF, IMAGE.buffer, {
            contentType: IMAGE.mimetype,
          });
        imageUrl = await getDownloadURL(SNAPSHOT.ref);
      } else {
        return res
          .status(500)
          .json({ status: "Failed", error: "No file received" });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    if (IMAGE !== undefined) {
      const UPDATED_RECORDS = await Blog.updateOne(
        { _id: ID },
        {
          $set: {
            title: PAYLOAD.title,
            content: PAYLOAD.content,
            imageUrl: imageUrl,
          },
        },
      );
      deleteCache("blogs");
      res.status(200).json(UPDATED_RECORDS);
    } else {
      const UPDATED_RECORDS = await Blog.updateOne(
        { _id: ID },
        {
          $set: {
            title: PAYLOAD.title,
            content: PAYLOAD.content,
            imageUrl: PAYLOAD.imageUrl,
          },
        },
      );
      deleteCache("blogs");
      res.status(200).json(UPDATED_RECORDS);
    }
  } catch (error) {
    console.error("Error updating blogs:", error);
    res.status(400).json({ message: "Contact to admin for this issue" });
  }
};

const deleteBlogs = async (req, res) => {
  try {
    const ID = new ObjectId(req.params.id);
    if (!ID) throw new Error("ID not found");
    await Blog.deleteOne({ _id: ID });
    deleteCache("blogs");
    res.status(200).json({ message: "Blog Deleted Succsessfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(400).json({ message: "Contact to admin for this issue" });
  }
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  updateBlogs,
  getBlogPost,
  deleteBlogs,
};
