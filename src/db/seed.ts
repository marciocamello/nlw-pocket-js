import { client, db } from '.'
import { goalCompletions, goals } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const returnGoals = await db
    .insert(goals)
    .values([
      {
        title: 'Learn to play the guitar',
        desiredWeeklyFrequency: 3,
      },
      {
        title: 'Learn to cook',
        desiredWeeklyFrequency: 2,
      },
      {
        title: 'Learn to dance',
        desiredWeeklyFrequency: 1,
      },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    {
      goalId: returnGoals[0].id,
      createdAt: startOfWeek.toDate(),
    },
    {
      goalId: returnGoals[1].id,
      createdAt: startOfWeek.add(1, 'day').toDate(),
    },
  ])
}

seed().finally(() => {
  client.end()
})
