import { isFunction } from 'lodash';
import controllers from '../../../controllers/usersController';
import regeneratorRuntime from 'regenerator-runtime'
// Below line added based on https://github.com/facebook/jest/issues/5698
// require('regenerator-runtime/runtime')

describe('item controllers', () => {
  test('has crud controllers', () => {
    const crudMethods = [
      'findAll',
      'findById',
      'create',
      'update',
      'remove'
    ]

    crudMethods.forEach(name =>
      expect(isFunction(controllers[name])).toBe(true)
    )
  })

  
})
