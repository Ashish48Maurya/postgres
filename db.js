import { Sequelize } from 'sequelize';
async function Connection() {
    try {
        const sequelize = new Sequelize('postgres://practiceUser:practicePassword@localhost:5432/practice')
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
export default Connection;