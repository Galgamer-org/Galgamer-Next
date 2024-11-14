
export default function slugify(str: string): string {
    str = ensureAscii(str); // remove accents
    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
             .replace(/\s+/g, '-') // replace spaces with hyphens
             .replace(/-+/g, '-'); // remove consecutive hyphens
    return str;
  }

function ensureAscii(str: string): string {
    const data = {
      data: Array.from(new TextEncoder().encode(str)) }
    return JSON.stringify(data);
}