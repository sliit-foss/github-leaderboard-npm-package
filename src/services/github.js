import { instance } from "../libs/axios";

const getOrganizationPRs = (orgs, filters, afterCursor) => {
  let queryOrgs = "";

  orgs.forEach((organization) => {
    queryOrgs += `user:${organization} `;
  });

  let query = "";

  if (filters.pagination) {
    query = `query { ${paginatedSearchQuery(
      queryOrgs,
      filters,
      afterCursor
    )} }`;
  } else {
    query = `query { ${nonPaginatedSearchQuery(
      queryOrgs,
      filters,
      afterCursor
    )} }`;
  }

  return instance.post("", { query });
};

const getRepositoryPRs = (orgs, filters, afterCursor, owner, repoName) => {
  const query = `query { ${paginatedSearchQuery(
    `repo:${owner}/${repoName}`,
    filters,
    afterCursor
  )} }`;

  return instance.post("", { query });
};

const nonPaginatedSearchQuery = (searchEntity, filters, afterCursor) => {

  return `
  search( type: ISSUE, query: "${searchEntity} is:pr is:merged ${
    filters.dateRange ? `created:${filters.dateRange}` : ""
  } ${filters.label ? `label:${filters.label}` : ""}", ${
    afterCursor != "" ? `after: "${afterCursor}"` : ""
  }) {
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
  }`;
};

const paginatedSearchQuery = (searchEntity, filters, afterCursor) => {
  if (filters.pageSize) {
    var pageSizeStr = `first: ${filters.pageSize},`;

    var pageInfo = `
    pageInfo {
      endCursor
      hasNextPage
    }
    `;
  } else {
    pageSizeStr = "";
    pageInfo = "";
  }

  return `
  search(first: ${filters.pageSize} type: ISSUE, query: "${searchEntity} is:pr is:merged ${
    filters.dateRange ? `created:${filters.dateRange}` : ""
  } ${filters.label ? `label:${filters.label}` : ""}", ${
    afterCursor != "" ? `after: "${afterCursor}"` : ""
  }) {
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
  }`;
};


export default {
  getOrganizationPRs,
  getRepositoryPRs,
};
