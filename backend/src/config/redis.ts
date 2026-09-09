import { createClient } from 'redis'

let redisClient: ReturnType<typeof createClient> | null = null

export const initializeRedis = async () => {
  try {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379'
    redisClient = createClient({ url: redisUrl })

    redisClient.on('error', (err) => {
      console.error('Redis Client Error', err)
    })

    await redisClient.connect()
    console.log('✅ Conectado ao Redis')
  } catch (error) {
    console.error('❌ Erro ao conectar ao Redis:', error)
    throw error
  }
}

export const getRedisClient = () => {
  if (!redisClient) {
    throw new Error('Redis não foi inicializado')
  }
  return redisClient
}

export const closeRedis = async () => {
  if (redisClient) {
    await redisClient.quit()
    console.log('✅ Desconectado do Redis')
  }
}
