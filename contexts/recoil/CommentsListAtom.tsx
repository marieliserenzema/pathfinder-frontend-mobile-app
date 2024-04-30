import { atom, type RecoilState } from "recoil";

import CommentModel from "../../models/CommentModel";

// @ts-ignore
const commentsListAtom: RecoilState<CommentModel[]> = atom({
  key: "comments",
  default: [],
});

export default commentsListAtom;
