interface UserModel {
    _id: string;
    username: string;
    email: string;
    password: string;
    role: string;
    favorites: string[];
}
  
export default UserModel;