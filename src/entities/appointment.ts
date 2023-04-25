interface AppointmentProps{
 customer: String;
 startAt: Date;
 endsAt: Date;
}


export class Appointment {
 
  private props: AppointmentProps

  get custumer() {
    return this.props.customer
  }

  get staetAt() {
    return this.props.startAt
  }

  get endsAt() {
    return this.props.endsAt
  }

  constructor(props: AppointmentProps) {

    const {startAt, endsAt} = props

    if(startAt <= new Date()){
      throw new Error('Invalid start date')
    }

    if(endsAt <= startAt){
      throw new Error('Invalid end date')
    }


    this.props = props
  }
}