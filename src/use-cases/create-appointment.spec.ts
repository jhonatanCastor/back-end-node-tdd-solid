import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./create-appointment";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../test/utils/get-future-date"
import { InMemoryAppointmentmentsRepository } from "../repositories/in-memory/in-memory-appointment";

describe('create appointment', () =>{

  it('should be able to create an appointment', () => {
    const startAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate('2022-08-11') 
  
    startAt.setDate(startAt.getDate() + 1)
    endsAt.setDate(endsAt.getDate() + 2)

    const appointmenntsRepository = new InMemoryAppointmentmentsRepository()
    const creatAppointment = new CreateAppointment(
      appointmenntsRepository
    )

    expect(creatAppointment.execute({
      customer: 'John Doe',
      startAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  })


  it('should be able to create an appointment  with overlapping dates', async () => {
    const startAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate('2022-08-15') 
  
    startAt.setDate(startAt.getDate() + 1)
    endsAt.setDate(endsAt.getDate() + 2)

    const appointmenntsRepository = new InMemoryAppointmentmentsRepository()
    const creatAppointment = new CreateAppointment(
      appointmenntsRepository
    )

    await creatAppointment.execute({
      customer: 'John Doe',
      startAt,
      endsAt
    })

    expect(creatAppointment.execute({
      customer: 'John Doe',
      startAt: getFutureDate('2022-08-14'),
      endsAt: getFutureDate('2022-08-18')
    })).rejects.toBeInstanceOf(Error)

    expect(creatAppointment.execute({
      customer: 'John Doe',
      startAt: getFutureDate('2022-08-08'),
      endsAt: getFutureDate('2022-08-12')
    })).rejects.toBeInstanceOf(Error)

    expect(creatAppointment.execute({
      customer: 'John Doe',
      startAt: getFutureDate('2022-08-08'),
      endsAt: getFutureDate('2022-08-17')
    })).rejects.toBeInstanceOf(Error)
  })
})