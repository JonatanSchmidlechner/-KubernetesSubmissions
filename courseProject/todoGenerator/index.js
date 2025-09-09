import fetch from 'node-fetch';
const todoBackendBaseURL = process.env.TODO_BACKEND_URL;
const wikipediaRandomPageApiUrl =
  'https://en.wikipedia.org/api/rest_v1/page/random/summary';

const getHourlyArticle = async () => {
  try {
    const result = await fetch(wikipediaRandomPageApiUrl);
    const data = await result.json();
    const newRandomPageUrl = data.content_urls.desktop.page;
    return newRandomPageUrl;
  } catch (error) {
    console.log('Could not fetch wikipedia article.');
  }
};

const postArticle = async (pageURL) => {
  try {
    const response = await fetch(`${todoBackendBaseURL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todo: pageURL }),
    });
    if (!response.ok) {
      console.log('Could not post pageURL. Response is not ok');
    }
  } catch (error) {
    console.log('Could not post pageURL:', error);
  }
};
const articleURL = await getHourlyArticle();
if (articleURL) {
  postArticle(articleURL);
}
