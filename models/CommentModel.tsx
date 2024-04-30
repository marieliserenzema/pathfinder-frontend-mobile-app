import UserModel from "./UserModel";

interface CommentModel {
  _id: string;
  text: string;
  date: Date;
  hikeId: string;
  user: UserModel;
}

export default CommentModel;
