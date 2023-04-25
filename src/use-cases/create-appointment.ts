import { Appointment } from "../entities/appointment";

interface CreateAppointmentRequest{
  customer: String;
  startAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment {
  async execute ({customer, startAt, endsAt}: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
     const appointment = new Appointment({customer, startAt, endsAt})

     return appointment
  }
}