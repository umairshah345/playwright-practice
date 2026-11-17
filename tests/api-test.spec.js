const { test, expect } = require("@playwright/test");
const { getPost } = require("../utils/api-helper");

require("dotenv").config();

const token = process.env.API_TOKEN;

test("Verify GET API", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  expect(response.status()).toBe(200);
  const data = await response.json();

  expect(data.userId).toBe(1);

  expect(data.id).toBe(1);

  expect(data.title).toContain("sunt");
});

test("Verify Invalid API ID", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts/9999"
  );

  expect(response.status()).toBe(404);
});

test("Verify POST API", async ({ request }) => {
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/posts",
    {
      data: {
        title: "My First API Test",
        body: "Learning Playwright API Testing",
        userId: 1,
      },
    }
  );

  expect(response.status()).toBe(201);

  const data = await response.json();

  expect(data.title).toBe("My First API Test");
  expect(data.userId).toBe(1);
});

test("Verify PUT API", async ({ request }) => {
  const response = await request.put(
    "https://jsonplaceholder.typicode.com/posts/1",
    {
      data: {
        id: 1,
        title: "Updated Title",
        body: "Updated Body",
        userId: 1,
      },
    }
  );

  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data.title).toBe("Updated Title");
  expect(data.body).toBe("Updated Body");
});

test("Verify PATCH API", async ({ request }) => {
  const response = await request.patch(
    "https://jsonplaceholder.typicode.com/posts/1",
    {
      data: {
        title: "Only Title Updated",
      },
    }
  );

  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data.title).toBe("Only Title Updated");
});

test("Verify DELETE API", async ({ request }) => {
  const response = await request.delete(
    "https://jsonplaceholder.typicode.com/posts/1"
  );

  expect(response.status()).toBe(200);
});

test("Verify API Headers", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts/1",
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  expect(response.status()).toBe(200);

  const data = await response.json();

  expect(data.id).toBe(1);
});

test("Verify Bearer Token Header", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts/1",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  expect(response.status()).toBe(200);
});

test("Verify Reusable API Helper", async ({ request }) => {
  const response = await getPost(request, 1);
  const response2 = await getPost(request, 2);

  expect(response.status()).toBe(200);
  expect(response2.status()).toBe(200);

  const data = await response.json();
  const data2 = await response2.json();

  expect(data.id).toBe(1);
  expect(data2.id).toBe(2);
});

test("Verify API Helper Error Handling", async ({ request }) => {
  await expect(getPost(request, 9999)).rejects.toThrow("API Failed: 404");
});

test("Verify Multiple Posts using Loop", async ({ request }) => {
  const postIds = [1, 2, 3];

  for (const id of postIds) {
    const response = await getPost(request, id);

    expect(response.status()).toBe(200);

    const data = await response.json();

    expect(data.id).toBe(id);
  }
});
test("Verify Post 15 API", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts/15"
  );
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data.id).toBe(15);
});
test("Verify Post 20 API", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts/20"
  );
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data.id).toBe(20);
});
test("Verify API Data", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data.id).toBe(1);
  expect(data.id).toBe(1);
  expect(data.title).toBeTruthy();
});
test("Verify Invalid Post API", async ({ request }) => {
  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts/9999"
  );
  expect(response.status()).toBe(404);
});
test("Verify Create Post API", async ({ request }) => {
  const response = await request.post(
    "https://jsonplaceholder.typicode.com/posts",
    {
      data: {
        title: "Playwright Practice",
        body: "Learning API Automation",
        userId: 1,
      },
    }
  );
  expect(response.status()).toBe(201);
  const data = await response.json();
  expect(data.title).toBe("Playwright Practice");
  expect(data.body).toBe("Learning API Automation");
  expect(data.userId).toBe(1);
});
test("Verify Update Post API", async ({ request }) => {
  const response = await request.put(
    "https://jsonplaceholder.typicode.com/posts/1",
    {
      data: {
        id: 1,
        title: "Updated Playwright Title",
        body: "Updated API Testing",
        userId: 1,
      },
    }
  );
  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(data.title).toBe("Updated Playwright Title");
  expect(data.body).toBe("Updated API Testing");
});
test("Verify Delete Post API", async ({ request }) => {
  const response = await request.delete(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  expect(response.status()).toBe(200);
});
