const getPaginatedResults = async (
  queryFunction,
  organizations,
  filters,
  owner,
  repoName
) => {
  const finalResults = [];

  const results = await queryFunction(
    organizations,
    filters,
    "",
    owner,
    repoName
  );

  finalResults.push(...results.data.data.search.edges);

  let lastPage = !results.data.data.search.pageInfo.hasNextPage;
  let cursor = results.data.data.search.pageInfo.endCursor;
  let pages = 0;

  while (!lastPage && pages <= filters.pageCount) {
    const nextPageResults = await queryFunction(
      organizations,
      filters,
      cursor,
      owner,
      repoName
    );

    finalResults.push(...nextPageResults.data.data.search.edges);

    lastPage = !nextPageResults.data.data.search.pageInfo.hasNextPage;
    cursor = nextPageResults.data.data.search.pageInfo.endCursor;
    pages++;
  }

  return finalResults;
};

const getNonPaginatedResults = async (
  queryFunction,
  organizations,
  filters,
  owner,
  repoName
) => {
  const finalResults = [];

  const results = await queryFunction(
    organizations,
    filters,
    "",
    owner,
    repoName
  );

  finalResults.push(...results.data.data.search.edges);

  let lastPage = !results.data.data.search.pageInfo.hasNextPage;
  let cursor = results.data.data.search.pageInfo.endCursor;
  let pages = 0;

  while (!lastPage && pages < 1) {
    const nextPageResults = await queryFunction(
      organizations,
      filters,
      cursor,
      owner,
      repoName
    );

    finalResults.push(...nextPageResults.data.data.search.edges);

    lastPage = !nextPageResults.data.data.search.pageInfo.hasNextPage;
    cursor = nextPageResults.data.data.search.pageInfo.endCursor;
    pages++;
  }

  return finalResults;
};

export default { getPaginatedResults, getNonPaginatedResults };
