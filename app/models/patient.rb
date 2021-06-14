class Patient < ApplicationRecord
  has_many :appointments, dependent: :destroy
  has_many :doctors, through: :appointments

  # def get_doctors_with_appointments
  #   a = self.doctors.map do |doctor|
  #    appointment = doctor.appointments.find_by(patient_id: self.id)
  #     {doctor: doctor.name, appDate: appointment.date, appId: appointment.id}
  #   end
  #   return {patient: self.name, appointment: a}
  # end

  def get_doctors_with_appointments
    a = self.appointments.map do |app|
      # appointment = app.doctors.find_by(patient_id: self.id)
      {doctor: app.doctor.name, appDate: app.date, id: app.id}
    end
    return {patient: self.name, appointment: a}
  end


end