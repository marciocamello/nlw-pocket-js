import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { deleteGoalCompletion } from '../../functions/delete-goal-completion'

export const deleteGoalCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async request => {
      const { goalId } = request.body
      await deleteGoalCompletion({
        goalId,
      })
    }
  )
}
