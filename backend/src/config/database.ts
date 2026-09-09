import mongoose from 'mongoose'

export const connectDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI
    if (!mongoUri) {
      throw new Error('MONGODB_URI não definida nas variáveis de ambiente')
    }

    await mongoose.connect(mongoUri)
    console.log('✅ Conectado ao MongoDB')
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error)
    throw error
  }
}

export const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect()
    console.log('✅ Desconectado do MongoDB')
  } catch (error) {
    console.error('❌ Erro ao desconectar do MongoDB:', error)
    throw error
  }
}
