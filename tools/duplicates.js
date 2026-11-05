//Two pages are duplicates if both exits and their title matches
function isDuplicate(pageA, pageB){
  if(!pageA || !pageB){
	return false;
  }
  return pageA.title === pageB.title;
 
}
module.exports={
   isDuplicate
};
