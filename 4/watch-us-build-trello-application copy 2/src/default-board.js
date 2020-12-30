import { uuid } from './utils'

export default {
  name: 'workshop',
  columns: [
    {
      name: 'todo',
      tasks: [
        {
          description: 'dfsfds',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: 'sfddssdf',
          name: 'second task',
          id: uuid(),
          userAssigned: null
        },
        {
          description: 'dsffds',
          name: 'and thrid',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'in-progress',
      tasks: [
        {
          description: 'sdffdsfds',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        }
      ]
    },
    {
      name: 'done',
      tasks: [
        {
          description: 'ffsdsdffds',
          name: 'first task',
          id: uuid(),
          userAssigned: null
        }
      ]
    }
  ]
}
