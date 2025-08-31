import { Request, Response } from 'express'
import { CreateUserService } from '../services/create-user-service.ts'

export class CreateUserController {
  async execute(req: Request, res: Response) {
    try {
      //Receber os dados do usuario
      const { first_name, last_name, email, password } = req.body

      // Validar campos obrigatórios e remover os espacos em branco
      if (
        !first_name.trim() ||
        !last_name.trim() ||
        !email.trim() ||
        !password.trim()
      ) {
        return res.status(400).json({
          message:
            'All fields are required: first_name, last_name, email, password',
        })
      }

      // Validar tamanho da senha (mínimo 8 caracteres)
      if (password.length < 8) {
        return res.status(400).json({
          message: 'password must be at least 8 characters long',
        })
      }

      // Validar se a senha contém pelo menos uma letra e um número
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)/
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message: 'password must contain at least one letter and one number',
        })
      }

      //Instanciar o serviço e chama-lo
      const createUserService = new CreateUserService()
      const createdUser = await createUserService.execute({
        firstName: first_name,
        lastName: last_name,
        email,
        password,
      })
      //retornar a resposta (status code)
      return res.status(201).json(createdUser)
    } catch (error) {
      console.error('Error creating user:', error)
      return res.status(500).json({
        message: 'Internal Server Error',
      })
    }
  }
}
