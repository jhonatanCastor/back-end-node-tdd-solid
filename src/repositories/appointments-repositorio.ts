import {Appointment} from '../entities/appointment'

export interface AppointmenntsRepository {
  
  create(appointment: Appointment): Promise<void>;
 
  findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null>
}