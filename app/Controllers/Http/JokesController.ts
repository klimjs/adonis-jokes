import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Joke from 'App/Models/Joke'

export default class JokesController {
  public async index({ view }: HttpContextContract) {
    // const jokes = await Joke.all()
    return view.render('pages/jokes/index', {})
  }

  public async show({ view, params }: HttpContextContract) {
    // const jokes = await Joke.all()
    const joke = await Joke.findOrFail(params.id)
    return view.render('pages/jokes/show', { joke })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('pages/jokes/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const { name, content } = await request.validate({
      schema: schema.create({
        name: schema.string(),
        content: schema.string(),
      }),
      messages: {
        'name.required': 'Hey, we need the joke name',
        'content.required': 'A joke without content is not a joke',
      },
    })

    const joke = await Joke.create({ name, content })

    response.redirect().toRoute('JokesController.show', [joke.id])
  }
}
