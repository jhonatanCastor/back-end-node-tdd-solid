import { Appointment } from "../entities/appointment";
import { AppointmenntsRepository } from "../repositories/appointments-repositorio";

interface CreateAppointmentRequest{
  customer: String;
  startAt: Date;
  endsAt: Date;
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment {
  constructor(
    private appointmenntsRepository: AppointmenntsRepository
 ){}

  async execute ({
    customer, 
    startAt, 
    endsAt
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment = await this.appointmenntsRepository.findOverlappingAppointment(
      startAt,
      endsAt
    )

    if(overlappingAppointment){
      throw new Error('Another appointment overlaps this appointment dates')
    }

     const appointment = new Appointment({
      customer, 
      startAt, 
      endsAt
    })

     await this.appointmenntsRepository.create(appointment)
     return appointment
  }
}