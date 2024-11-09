import { sequelize }  from '../config/database';

const testConnection = async (): Promise<void>=> {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    }

export { testConnection };