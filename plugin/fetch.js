import fetch from "node-fetch"

let headers = {
  "Content-Type": `application/json`,
}

export default async function fetchDocs(endpoint, query) {
  const response = await fetch(endpoint, {
    method: `POST`,
    headers,
    body: JSON.stringify({
      query,
    }),
  })

  return await response.json()
}
