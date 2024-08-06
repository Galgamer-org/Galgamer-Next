import PostType from "./post";

type CategoryLeaf = string; //PostType.slug;

type CategoryTree = Record<string, {
  posts?: CategoryLeaf[],
  children?: CategoryTree
}>;
/*

{
  "遊戲公司": {
    "children": {
      "Moonstone": {
        "posts": [
          "hatsukoi"
        ]
      }
    }
  },
  "R-18": {
    "posts": [
      "hatsukoi"
    ]
  }
}





*/
export default CategoryTree;