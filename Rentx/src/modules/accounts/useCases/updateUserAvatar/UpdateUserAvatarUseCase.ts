import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../respositories/IUsersRepository";

interface IRequest {
	user_id: string;
	avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
	// Adicionar coluna avatar na tabela de users - ok
	// Refatorar usuário com coluna avatar - ok
	// Configuração upload multer
	// Criar regra de negócio do upload
	// Criar controller

	constructor(
		@inject("UsersRepository")
		private userRepository: IUsersRepository
	) {}

	async execute({ user_id, avatar_file }: IRequest): Promise<void> {
		const user = await this.userRepository.findById(user_id);

		await deleteFile(`./tmp/avatar/${user.avatar}`);

		user.avatar = avatar_file;

		await this.userRepository.create(user);
	}
}

export { UpdateUserAvatarUseCase };
