import File from '../models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });
    return res.json(file);
  }
}

export default new FileController();

// criar a tabela file no banco de dados
// yarn sequelize migration:create --name=create-files
