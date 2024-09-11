import { db } from '../db'
import { goalCompletions } from '../db/schema'

interface CreateGoalCompletionRequest {
  goalId: string
}

export async function createGoalCompletion({
  goalId,
}: CreateGoalCompletionRequest) {
  const result = await db
    .insert(goalCompletions)
    .values({
      goalId,
    })
    .returning()

  const goalCompletion = result[0]

  return {
    goalCompletion,
  }
}
