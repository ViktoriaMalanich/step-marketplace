import { ErrorHendler } from "../../classes/ErrorHandler";
import { DBconnection } from "../../dbconnection";
import { User } from "../../entities/User";

export const findUserList = async () => {
    const userRepo = DBconnection.getRepository(User);
    const userList = await userRepo.find();
    return userList;
}


export const getOneUser = async (userId: number): Promise<User | null> => {
    const userRepo = DBconnection.getRepository(User);
    const user = await userRepo
        .createQueryBuilder('user')
        .where('user.id = :userId', { userId })
        .getOne();
    return user;
}

export const getUserByEmail = async (email: string): Promise<Partial<User> | null> => {
    console.log("my email", email);


    const userRepo = DBconnection.getRepository(User);
    const user = await userRepo
        .createQueryBuilder('user')
        .select(["user.id", "user.firstName", "user.lastName", "user.email", "user.password", "user.phone", "user.role"])
        .where('user.email = :email', { email })
        .getOne();
    return user;
}

export const updateUser = async (userId: number, data: any): Promise<User> => {
    console.log("userId", userId);
    const userRepo = DBconnection.getRepository(User);
    await userRepo
        .save({
            id: userId,
            ...data
        })
    const user = await userRepo.findOne({ where: { id: userId } });

    if (!user) {
        throw new ErrorHendler(404, "User not found");
    }

    return user;
}


export const createUser = async (data: any): Promise<User> => {

    const userRepo = DBconnection.getRepository(User);
    const user = await userRepo.save(data);

    if (!user) {
        throw new ErrorHendler(404, "User not found");
    }

    return user;
}

// export const getUserByCredentials = async (login: string, password: string): Promise<User> => {
//     const userRepo = DBconnection.getRepository(User);
//     const query = userRepo.createQueryBuilder('user');
//     query.where('(user.email = :login or user.phoneNumber = :login) and user.password = :password', { login, password });
//     const user = await query.getOne();

//     if (!user) {
//         throw new Error('User not found');
//     }

//     return user;
// }