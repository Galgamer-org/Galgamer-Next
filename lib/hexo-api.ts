import Hexo from 'hexo';
import path from 'path';

let __HEXO: Hexo | null = null;
const HEXO_PATH = "/Users/misaki/Repo/galgamer";//path.join(process.cwd(), '../galgamer');

async function getHexo() {
  // 复用已初始化的 Hexo 实例
  if (__HEXO) {
    console.log('复用 Hexo 实例');
    return __HEXO;
  }
  // 使用指定参数实例化一个 Hexo 实例
  const hexo = new Hexo(HEXO_PATH, {
    // silent: true,
  });
  console.log('初始化 Hexo 实例');
  // 初始化 Hexo 实例（加载插件、加载配置文件）
  await hexo.init();
  console.log('初始化 Hexo 实例完成');
  // 载入 Hexo 目录（文章、草稿、站点数据、主题）
  await hexo.load();

  console.log('载入 Hexo 目录完成');

  __HEXO = hexo;
  return hexo;
};

async function getAllTags(): Promise<string[]> {
  console.log('获取所有标签');
  const hexo = await getHexo();
  const result = hexo.locals.get('tags').data;
  for (const key in result) {
    console.log(result[key]["name"]);
  }
  // console.log(result);
  return Object.values(result);
}

export {
  getAllTags,
};