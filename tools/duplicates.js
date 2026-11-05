// Two pages are duplicates if both exist and their titles match,
// ignoring differences in capitalization.
function isDuplicate(pageA, pageB) {
  if (!pageA || !pageB) {
    return false;
  }

  return pageA.title.toLowerCase() === pageB.title.toLowerCase();
}

module.exports = {
  isDuplicate
};
