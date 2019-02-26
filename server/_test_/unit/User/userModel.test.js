// const { expect } = require('chai')
const usersModel = require('../../../models/user')
// const mongoose = require('mongoose');

describe('user Model', () => {
    it('check users collection schema types', () => {
        const user = usersModel.schema.obj.name;
        expect(user).toEqual({
            type: String,
            required: true
        });
    })
    it('check date collection schema types', () => {
        const user = usersModel.schema.obj.email;
        expect(user).toEqual({
            type: String,
            required: true
        })
    })
    it('check date collection schema types', () => {
        const user = usersModel.schema.obj.phoneNumber;
        expect(user).toEqual({
            type: Number,
            required: true
        })
    })
})
