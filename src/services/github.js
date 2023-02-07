const axios = require("../libs/axios");

const getOrganizationPRs = (orgs, filters, afterCursor) => {
  let queryOrgs = "";
  orgs.forEach((organization) => {
    queryOrgs += `user:${organization} `;
  });
  const query = `query { ${searchQuery(queryOrgs, filters, afterCursor )} }`;
  return axios.instance.post("", { query });
};

const getRepositoryPRs = (orgs, filters, afterCursor, owner, repoName ) => {
  const query = `query { ${searchQuery(`repo:${owner}/${repoName}`, filters, afterCursor )} }`;
  return axios.instance.post("", { query });
};

const searchQuery = (searchEntity, filters, afterCursor,) => {
  return `
  search(first: ${filters.pageSize ?? 100}, type: ISSUE, query: "${searchEntity} is:pr is:merged ${ filters.dateRange ? `created:${filters.dateRange}` : "" } ${filters.label ? `label:${filters.label}` : ""}", ${afterCursor != "" ? `after: "${afterCursor}"` : ""}) {
    issueCount
    edges {
      node {
        ... on PullRequest {
          title
          author {
            login
            avatarUrl
          }
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }`
}
module.exports = { getOrganizationPRs, getRepositoryPRs };
