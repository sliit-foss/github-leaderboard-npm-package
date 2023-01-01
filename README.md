# github-leaderboard-npm-package

A node module for fetching a list of highest contributors to a certain Github organization or repository with contribution scores

## Installation

```js
# using npm
npm install github-leaderboard-npm-package

# using yarn
yarn add github-leaderboard-npm-package
```

## Usage

```js
# using require
const leaderboard = require('github-leaderboard-npm-package');

# using import
import leaderboard from 'github-leaderboard-npm-package';
```

## Example

### Using promises:

```js
leaderboard.initialize('GITHUB_ACCESS_TOKEN')

//fetch organization leaderboard
leaderboard.getOrganizationLeaderboard({
  orgs: 'sliit-foss',
  filters: {
      dateRange: '2021-10-14..2021-10-31',
      label: 'hacktoberfest-accepted'
  },
}).then((results) => console.log(results));

//fetch repository leaderboard
leaderboard.getRepositoryLeaderboard({
  owner: 'sliit-foss',
  repoName: 'sliitfoss',
  filters: {
      dateRange: '2021-10-14..2021-10-31',
      label: 'hacktoberfest-accepted'
  },
}).then((results) => console.log(results));
```

### Using async/await:

```js
leaderboard.initialize('GITHUB_ACCESS_TOKEN')
const getOrganizationLeaderboard = async function () {
    const results = await leaderboard.getOrganizationLeaderboard({
        orgs: ['sliit-foss'],
        filters: {
            dateRange: '2021-10-14..2021-10-31',
            label: 'hacktoberfest-accepted'
        },
    });
    console.log(results);
};

const getRepositoryLeaderboard = async function () {
    const results = await leaderboard.getRepositoryLeaderboard({
        owner: 'sliit-foss',
        repoName: 'sliitfoss',
        filters: {
            dateRange: '2021-10-14..2021-10-31',
            label: 'hacktoberfest-accepted'
        },
    });
    console.log(results);
};

getOrganizationLeaderboard();
getRepositoryLeaderboard();
```
