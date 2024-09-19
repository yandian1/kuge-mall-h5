export function deepCopy<T>(value: T): T {
  return JSON.parse(JSON.stringify(value))
}

export function escape2Html(str: string) {
  let res = "";
  if (str.length == 0) return "";
  res = str.replace(/&amp;/g, "&");
  res = res.replace(/&lt;/g, "<");
  res = res.replace(/&gt;/g, ">");
  res = res.replace(/&nbsp;/g, " ");
  res = res.replace(/&#39;/g, "\'");
  res = res.replace(/&quot;/g, "\"");
  return res;
}