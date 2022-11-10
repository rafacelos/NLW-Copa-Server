import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      avatarUrl: 'https://github.com/rafacelos.png',
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      ownerId: user.id,

      participants: {
        create: {
          userId : user.id
        }
      }
    }
  })
  
    // const participant = await prisma.participant.create({
    //   data: {
    //     poolId: pool.id,
    //     userId: user.id
    //   }
    // }) Insted of doing this, we just gonna use Prisma to create the participant with UserId : user.id

  await prisma.game.create({
    data: {
      date: '2022-11-07T22:00:00.476Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    }
  })
  await prisma.game.create({
    data: {
      date: '2022-11-08T21:00:00.476Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })

}

main()