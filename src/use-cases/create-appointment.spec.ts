import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./create-appointment";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../test/utils/get-future-date"

describe('create appointment', () =>{
  it('should be able to create an appointment', () => {
    const startAt = getFutureDate('2022-08-10')
    const endsAt = getFutureDate('2022-08-11') 
  
    startAt.setDate(startAt.getDate() + 1)
    endsAt.setDate(endsAt.getDate() + 2)

    const creatAppointment = new CreateAppointment()

    expect(creatAppointment.execute({
      customer: 'John Doe',
      startAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  })
})