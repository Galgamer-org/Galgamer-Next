type Member = {
  name: string
  photo?: string
  bio?: string
  username?: string  // 有 username 的話，就會有 url
  template?: string
}

export default Member;
