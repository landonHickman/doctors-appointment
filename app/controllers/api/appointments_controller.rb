class Api::AppointmentsController < ApplicationController

  def index
    render json: Appointment.doctor_and_patient
  end
end
