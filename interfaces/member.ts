type Member = {
  photo?: string
  bio?: string
  username?: string  // 有 username 的話，就會有 url
  template?: string
  personalPage?:boolean;
  pageContent?:any;
}

export default Member;
