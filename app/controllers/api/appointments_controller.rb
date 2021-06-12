class Api::AppointmentsController < ApplicationController

  def index
    render json: Appointment.doctor_and_patient
  end

  def create
    appointment = Appointment.new(appointment_params)
    if(appointment.save)
      render json:
        {id: appointment.id,
          date: appointment.date,
          patientName: appointment.patient.name,
          doctorName: appointment.doctor.name

        }
      else
        render json: appointment, status: 422
      end
  end

  private

  def appointment_params
    params.require(:appointment).permit(:date, :doctor_id, :patient_id)
  end
end
