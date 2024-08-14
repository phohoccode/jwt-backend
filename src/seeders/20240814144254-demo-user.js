'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
        */

        await queryInterface.bulkInsert('User', [
            {
                email: 'John 1',
                username: 'phohoccode1',
                password: '123'
            },
            {
                email: 'John 2',
                username: 'phohoccode2',
                password: '123'
            },
            {
                email: 'John 3',
                username: 'phohoccode3',
                password: '123'
            },
            {
                email: 'John 4',
                username: 'phohoccode4',
                password: '123'
            },
        ], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
