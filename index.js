const axios = require("./src/libs/axios");
const utils = require("./src/utils");
const githubService = require("./src/services/github");
const leaderboardService = require("./src/services/leaderboard");

const initialize = async (token) => {
  axios.setHeaders({ ...axios.instance.defaults.headers, Authorization: `Bearer ${token}` });
};

const getOrganizationLeaderboard = async (orgs, filters) => {
 const contributions = await utils.getPaginatedResults(githubService.getOrganizationPRs, orgs, filters);
 return leaderboardService.generateLeaderboardRecords(contributions);
};

const getRepositoryLeaderboard = async (owner, repoName, filters) => {
  const contributions = await utils.getPaginatedResults(githubService.getRepositoryPRs, [], filters, owner, repoName);
  return leaderboardService.generateLeaderboardRecords(contributions);
};


initialize("token_goes_here");
getOrganizationLeaderboard(['sliit-foss'], {dateRange: '2021-10-14..2021-10-30'}).then((ans) => console.log(ans));
// getRepositoryLeaderboard('Akalanka47000', 'portfolio', {dateRange: '2021-10-14..2021-10-30'}).then((ans) => console.log(ans));

module.exports = { getOrganizationLeaderboard, getRepositoryLeaderboard };
