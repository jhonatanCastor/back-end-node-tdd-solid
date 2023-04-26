import { Appointment } from "../../entities/appointment";
import { AppointmenntsRepository } from "../appointments-repositorio";
import { areIntervalsOverlapping } from "date-fns";

 export class InMemoryAppointmentmentsRepository implements AppointmenntsRepository{
  
  public items: Appointment[] = []

  async create (appointment: Appointment): Promise<void>{
    this.items.push(appointment)
  }

  async findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null> {
      const overlappingAppointment = this.items.find(appointment => {
       return areIntervalsOverlapping(
        {start: startsAt, end: endsAt},
        {start: appointment.staetAt, end: appointment.endsAt},
        {inclusive: true}
       )
      })

      if(!overlappingAppointment) {
        return null
      }

      return overlappingAppointment
  }
 }