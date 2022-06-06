import patch from 'path';
import fs from 'fs';
import AppDataSource from '../database/db';
import User from '../models/User';
import UploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface Request {
    id: string;
    avatarFileName: string;
}

class UpdateUserAvatarService {
    public async execute({ id, avatarFileName }: Request): Promise<User> {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({ where: { id } });

        if (!user) {
            throw new AppError(
                'Only authenticated users can change avatar',
                401,
            );
        }

        if (user.avatar) {
            const userAvatarFilePath = patch.join(
                UploadConfig.directory,
                user.avatar,
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;

        await userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
