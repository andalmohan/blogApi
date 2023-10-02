const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require("mongoose");
const { expect } = chai;
const app = require("../Server.js");
const Category = require("../Models/Category_Schema.js");
const Post = require("../Models/Post_Schema.js");

chai.use(chaiHttp);

describe("Create Category API Test", function () {
  before(function (done) {
    this.timeout(20000);
    setTimeout(done, 10000);
    mongoose.connect(
      `mongodb+srv://abimeeraperumal10:${process.env.PASSWORD}@nishitha.8jv94cv.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        done();
      }
    );
  });

  after(function (done) {
    this.timeout(20000);
    setTimeout(done, 10000);
    // Disconnect from the test database after all tests
    mongoose.connection.close(() => {
      done();
    });
  });

  // beforeEach(async () => {
  //   // Clear the test database before each test
  //   await Category.deleteMany({});
  // });

  it("should create a new category", async () => {
    const categoryData = {
      id: "0987",
      name: "Test category11",
    };

    const authorizationHeader = 'Bearer blogAPI';

    const res = await chai
      .request(app)
      .post("/api/Categoryposts")
      .set('Authorization', authorizationHeader)
      .send(categoryData);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("id", categoryData.id);
    expect(res.body).to.have.property("name", categoryData.name);

    const savedCategory = await Category.findOne({ id: categoryData.id });
    expect(savedCategory).to.exist;
    expect(savedCategory.name).to.equal(categoryData.name);
  });
});

describe("Crete Post API Test", function () {
  before(function (done) {
    this.timeout(20000);
    setTimeout(done, 10000);
    // Connect to a test MongoDB database
    mongoose.connect(
      `mongodb+srv://abimeeraperumal10:${process.env.PASSWORD}@nishitha.8jv94cv.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        done();
      }
    );
  });

  after(function (done) {
    this.timeout(20000);
    setTimeout(done, 10000);
    // Disconnect from the test database after all tests
    mongoose.connection.close(() => {
      done();
    });
  });

  it("should create a new post", async () => {
    const postData = {
      id: "8912",
      title: "Test post10",
      content: "test post10 content10",
    };
    const authorizationHeader = 'Bearer blogAPI';
    const res = await chai.request(app).post("/api/posts").set('Authorization', authorizationHeader).send(postData);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("id", postData.id);
    expect(res.body).to.have.property("title", postData.title);
    expect(res.body).to.have.property("content", postData.content);
    const savedPost = await Post.findOne({ id: postData.id });
    expect(savedPost).to.exist;
    expect(savedPost.title).to.equal(postData.title);
  });
});

describe("Get Post API Test", function () {
  before(function (done) {
    this.timeout(20000);
    setTimeout(done, 10000);
    // Connect to a test MongoDB database
    mongoose.connect(
      `mongodb+srv://abimeeraperumal10:${process.env.PASSWORD}@nishitha.8jv94cv.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        done();
      }
    );
  });

  after(function (done) {
    this.timeout(20000);
    setTimeout(done, 10000);
    mongoose.connection.close(() => {
      done();
    });
  });

  it("should fetch all posts", async () => {
    const authorizationHeader = 'Bearer blogAPI';
    const res = await chai.request(app).get("/api/posts").set('Authorization', authorizationHeader);;

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    const bodyLength = res.body.length;
    console.log("Body Length:", bodyLength);
    expect(bodyLength).to.be.greaterThan(0);
  });
});

describe("Get Post by ID API Test", () => {
  before(function (done) {
    this.timeout(20000);
    setTimeout(done, 10000);
    // Connect to a test MongoDB database
    mongoose.connect(
      `mongodb+srv://abimeeraperumal10:${process.env.PASSWORD}@nishitha.8jv94cv.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        done();
      }
    );
  });

  after(function (done) {
    this.timeout(20000);
    setTimeout(done, 10000);
    mongoose.connection.close(() => {
      done();
    });
  });

  it("should fetch a post by ID", async () => {
    const authorizationHeader = 'Bearer blogAPI';
    const res = await chai.request(app).get("/api/posts/8912").set('Authorization', authorizationHeader);

    expect(res).to.have.status(200);

    const post = res.body;

    const detailedcontent = `ID: ${post.id}, Title: ${post.title}, Content: ${post.content}, Created At: ${post.created_at},Updated At:${post.updated_at}`;
    console.log(detailedcontent);
  });
});

describe("Update Post by ID API Test", () => {
  before(function (done) {
    this.timeout(20000);
    setTimeout(done, 10000);
    // Connect to a test MongoDB database
    mongoose.connect(
      `mongodb+srv://abimeeraperumal10:${process.env.PASSWORD}@nishitha.8jv94cv.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        done();
      }
    );
  });

  after(function (done) {
    this.timeout(20000);
    setTimeout(done, 10000);
    mongoose.connection.close(() => {
      done();
    });
  });

  it("should update a post by ID", async () => {
    // Define the updated post data
    const updatedPostData = {
      title: "Updated Title8",
      content: "Updated Content8",
    };

    const authorizationHeader = 'Bearer blogAPI';

    const res = await chai
      .request(app)
      .put("/api/posts/8912")
      .set('Authorization', authorizationHeader)
      .send(updatedPostData);

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body.title).to.equal(updatedPostData.title);
    expect(res.body.content).to.equal(updatedPostData.content);
  });
});

describe("Delete Post by ID API Test", () => {
  before(function (done) {
    this.timeout(20000);
    setTimeout(done, 10000);
    // Connect to a test MongoDB database
    mongoose.connect(
      `mongodb+srv://abimeeraperumal10:${process.env.PASSWORD}@nishitha.8jv94cv.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
        done();
      }
    );
  });

  after(function (done) {
    this.timeout(20000);
    setTimeout(done, 10000);
    mongoose.connection.close(() => {
      done();
    });
  });

  it("should delete a post by ID", async () => {
    const authorizationHeader = 'Bearer blogAPI';
    const res = await chai.request(app).delete("/api/posts/8912").set('Authorization', authorizationHeader);;

    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body).to.have.property("title");
    expect(res.body).to.have.property("content");
  });
});
