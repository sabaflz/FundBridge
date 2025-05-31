const fs = require('fs');
const path = require('path');

// Load current user from sample_user.json in the same folder
const currentUser = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'sample_user.json'), 'utf-8')
);

// Hardcoded list of fake users
const users = [
  { name: "Bob Patel", email: "bob@example.com", interest: "AI / Data Science", skills: ["Data analysis", "Project management"] },
  { name: "Carol Nguyen", email: "carol@example.com", interest: "AI / Data Science", skills: ["Coding", "Fundraising"] },
  { name: "Dave Johnson", email: "dave@example.com", interest: "Education", skills: ["Design", "Writing"] },
  { name: "Eve Smith", email: "eve@example.com", interest: "AI / Data Science", skills: ["Design", "Data analysis"] },
  { name: "Frank Lin", email: "frank@example.com", interest: "Climate", skills: ["Fundraising", "Project management"] },
  { name: "Grace Park", email: "grace@example.com", interest: "AI / Data Science", skills: ["Coding", "Data analysis"] },
  { name: "Hannah Zhou", email: "hannah@example.com", interest: "AI / Data Science", skills: ["Writing", "Project management"] },
  { name: "Ian Brooks", email: "ian@example.com", interest: "Education", skills: ["Design", "Coding"] },
  { name: "Jenny Liu", email: "jenny@example.com", interest: "Climate", skills: ["Coding", "Fundraising"] },
  { name: "Kyle Tran", email: "kyle@example.com", interest: "AI / Data Science", skills: ["Writing", "Fundraising"] },
  { name: "Lara Singh", email: "lara@example.com", interest: "AI / Data Science", skills: ["Design", "Project management"] },
  { name: "Matt Ortega", email: "matt@example.com", interest: "AI / Data Science", skills: ["Coding", "Project management"] },
  { name: "Nina Shah", email: "nina@example.com", interest: "Education", skills: ["Data analysis", "Fundraising"] },
  { name: "Oscar Gomez", email: "oscar@example.com", interest: "Climate", skills: ["Writing", "Design"] },
  { name: "Tina Wang", email: "tina@example.com", interest: "AI / Data Science", skills: ["Coding", "Design"] }
];

// Skill index for bitmasking
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
  const targetMask = encodeSkills([targetUser.primary_skill]);
  const matches = [];

  for (const user of users) {
    if (user.interest !== targetUser.interest_area) continue;

    const userMask = encodeSkills(user.skills);
    const combinedSkills = targetMask | userMask;
    const skillScore = countSetBits(combinedSkills);

    matches.push({
      name: user.name,
      email: user.email,
      skillCoverage: skillScore,
      sharedInterest: targetUser.interest_area
    });
  }

  return matches.sort((a, b) => b.skillCoverage - a.skillCoverage);
}

const results = findMatchesForUser(currentUser, users);

fs.writeFileSync('matched_users.json', JSON.stringify(results, null, 2));
console.log(`✅ Found ${results.length} matches. See matched_users.json`);
