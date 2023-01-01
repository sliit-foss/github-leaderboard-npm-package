const axios = require("./src/libs/axios");
const utils = require("./src/utils");
const githubService = require("./src/services/github");
const leaderboardService = require("./src/services/leaderboard");

const initialize = async (token) => {
  axios.setHeaders({ ...axios.instance.defaults.headers, Authorization: `Bearer ${token}` });
};

const getOrganizationLeaderboard = async ({orgs = [], filters = {}}) => {
 try {
    const contributions = await utils.getPaginatedResults(githubService.getOrganizationPRs, orgs, filters);
    return leaderboardService.generateLeaderboardRecords(contributions);
 } catch (e) {
    return e
 }
};

const getRepositoryLeaderboard = async ({owner, repoName, filters = {}} ) => {
  try {
    const contributions = await utils.getPaginatedResults(githubService.getRepositoryPRs, [], filters, owner, repoName);
    return leaderboardService.generateLeaderboardRecords(contributions);
  } catch (e) {
    return e
  }
};

module.exports = { initialize, getOrganizationLeaderboard, getRepositoryLeaderboard };
