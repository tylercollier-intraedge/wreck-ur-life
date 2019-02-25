import { isFunction } from 'lodash';
import controllers from '../../../controllers/usersController';

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
