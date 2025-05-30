const fs = require('fs');
const path = require('path');

// Load users from React app data folder
const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/users.json'), 'utf-8')
);

// The user you want to find matches *for* (e.g., someone who is logged in)
const currentUser = users.find(u => u.email === 'alice@example.com'); // Change email as needed

const skillIndex = [
  "Coding", "Data analysis", "Writing",
  "Design", "Fundraising", "Project management"
];

function encodeSkills(skills) {
  return skills.reduce((bitmask, skill) => {
    const index = skillIndex.indexOf(skill);
    return index !== -1 ? bitmask | (1 << index) : bitmask;
  }, 0);
}

function countSetBits(n) {
  let count = 0;
  while (n) {
    count += n & 1;
    n >>= 1;
  }
  return count;
}

function findMatchesForUser(targetUser, users) {
  const targetMask = encodeSkills(targetUser.skills);
  const matches = [];

  for (const user of users) {
    if (user.email === targetUser.email) continue;
    if (user.interest !== targetUser.interest) continue;

    const userMask = encodeSkills(user.skills);
    const combinedSkills = targetMask | userMask;
    const skillScore = countSetBits(combinedSkills);

    matches.push({
      name: user.name,
      email: user.email,
      skillCoverage: skillScore,
      sharedInterest: targetUser.interest
    });
  }

  return matches.sort((a, b) => b.skillCoverage - a.skillCoverage);
}

const results = findMatchesForUser(currentUser, users);

fs.writeFileSync('matched_users.json', JSON.stringify(results, null, 2));
console.log(`✅ Found ${results.length} matches. See matched_users.json`);
