async function getPost(request, postId) {
  const response = await request.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );

  if (response.status() !== 200) {
    throw new Error(`API Failed: ${response.status()}`);
  }

  return response;
}

module.exports = { getPost };
