import {expect, test} from 'vitest'
import { Appointment } from './appointment'
import { getFutureDate } from '../test/utils/get-future-date'


test('create an appointment', () => {
  const startAt = getFutureDate('2022-08-10')
  const endsAt = getFutureDate('2022-08-11') 

  startAt.setDate(startAt.getDate() + 1)
  endsAt.setDate(endsAt.getDate() + 2)

  const appointment = new Appointment({
    customer: 'John Doe',
    startAt,
    endsAt
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.custumer).toEqual('John Doe')
})

test('cannot creat an appointment with end date before start date', () =>{
  const startAt = getFutureDate('2022-08-10')
  const endsAt = getFutureDate('2022-08-09') 

  expect(() => {
    return new Appointment({
      customer: 'John Doe',
      startAt,
      endsAt
    })
  }).toThrow()
})

test('cannot creat an appointment with end date before now', () =>{
  const startAt = new Date()
  const endsAt = new Date()

  startAt.setDate(startAt.getDate() - 1)
  endsAt.setDate(endsAt.getDate() + 3)

  expect(() => {
    return new Appointment({
      customer: 'John Doe',
      startAt,
      endsAt
    })
  }).toThrow()
})