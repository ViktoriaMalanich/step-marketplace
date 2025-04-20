import { DBconnection } from "../../dbconnection";
import { User } from "../../entities/User";

export const findUserList = async () => {
    const userRepo = DBconnection.getRepository(User);
    const userList = await userRepo.find();
    return userList;
}