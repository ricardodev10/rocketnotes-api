const knex = require("../database/knex"); //fornece uma interface para interagir com o banco de dados.
const AppError = require("../utils/AppError"); //é uma classe personalizada para lidar com erros personalizados na aplicação.
const DiskStorage = require("../providers/DiskStorage"); //é uma classe personalizada que lida com armazenamento de arquivos em disco.

class UserAvatarController {
  async update(request, response) { //esta classe é responsável pelo controle das ações relacionadas à atualização do avatar do usuário.
    const user_id = request.user.id; //extraem o id do usuário do objeto user dentro do objeto request
    const avatarFilename = request.file.filename; //o nome do arquivo do avatar é extraído do objeto file dentro do objeto request

    const diskStorage = new DiskStorage(); //essa instância será usada para lidar com o armazenamento em disco de arquivos.
    const user = await knex("users").where({ id: user_id }).first(); //esta consulta busca o usuário com o id especificado.

    if(!user) {
        throw new AppError("Somente usuários autenticados podem mudar o avatar", 401);
    } //esta condição verifica se o usuário existe

    if(user.avatar){
        await diskStorage.deleteFile(user.avatar);
    } //esta condição verifica se o usuário já possui um avatar definido

    const filename = await diskStorage.saveFile(avatarFilename);
    user.avatar = filename; //Essas linhas chamam o método saveFile da instância diskStorage para salvar o novo arquivo de avatar. O método retorna o nome do arquivo salvo, que é atribuído à constante filename. Em seguida, o user.avatar é atualizado com o novo nome do arquivo.

    await knex("users").update(user).where({ id: user_id }); //atualiza a coluna "avatar" na tabela "users" com o novo valor.

    return response.json(user); //retorna uma resposta JSON contendo o objeto user atualizado 
  }
}

module.exports = UserAvatarController; //exporta a classe UserAvatarController para que ela possa ser usada em outros arquivos que a importem.
