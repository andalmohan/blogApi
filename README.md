<h1>**Comprehensive Blog-API Backend**</h1>

1. Create a Category Post
Endpoint: POST api/Categoryposts
Purpose: Create a new category post.
Expected Parameters:
id   : The ID of the category post. (String, required)
name : The name of the category post. (String, required)
Middleware:
bearerAuth: Authentication middleware.
Validation middleware for id and name fields.
Response Format: JSON object representing the created category post.

2. Create a Post api
Endpoint: POST api/posts
Purpose: Create a new regular post.
Expected Parameters:
id : The ID of the post. (String, required)
title : The title of the post. (String, required)
content : The content of the post. (String, required)
category_id : ID of the category associated with the post. (String, optional)
Middleware:
bearerAuth: Authentication middleware.
Validation middleware for title and content fields.
Response Format: JSON object representing the created regular post.

3. Get All Post
Endpoint: GET api/posts
Purpose: Retrieve a list of all regular posts.
Middleware:
bearerAuth: Authentication middleware.
Response Format: JSON array of all posts.

4. Get a Post by it's ID
Endpoint: GET api/posts/:id
Purpose: Retrieve a regular post by its ID.
Expected Parameters:
id : The ID of the post to retrieve. (String, required)
Middleware:
bearerAuth: Authentication middleware.
Validation middleware to check if the provided ID is valid.
Response Format: JSON object representing the post.

5. Update a Post by it's ID
Endpoint: PUT api/posts/:id
Purpose: Update a regular post by its ID.
Expected Parameters:
id : The ID of the post to update. (String, required)
title : The updated title of the post. (String, required)
content : The updated content of the post. (String, required)
Middleware:
bearerAuth: Authentication middleware.
Validation middleware to check if the provided ID is valid and validate the title and content fields.
Response Format: JSON object representing the updated post.


6. Delete the Post by its ID
Endpoint: DELETE api/posts/:id
Purpose: Delete a regular post by its ID.
Expected Parameters:
id : The ID of the post to delete. (String, required)
Middleware:
bearerAuth: Authentication middleware.
Validation middleware to check if the provided ID is valid.
Response Format: JSON object representing the deleted post.

*to run the testcases: npm run test 
 to run the server: npm start*