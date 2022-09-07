export function checkUrlForm(strUrl) {
  var expUrl = /^http[s]?\:\/\//i;
  return expUrl.test(strUrl);
}
