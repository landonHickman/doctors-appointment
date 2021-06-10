class Api::DoctorsController < ApplicationController
    before_action :set_doctor, only: [:show, :destroy, :update]
  
    def index
      render json: Doctor.all
    end
  
    def show
      render json: @doctor.get_patient_with_appointments
    end
  
    def create
      @doctor = Doctor.new(doctor_params)
      if @doctor.save
        render json: @doctor
      else
        render json: @doctor.errors, status: :unprocessable_entity
      end
    end
  
    def update
    
      if @doctor.update(doctor_params)
        render json: @doctor
      else
        render json: @doctor.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      render json: @doctor.destroy
    end
  
    private
  
    def set_doctor
      @doctor = Doctor.find(params[:id])
    end
  
    def doctor_params
      params.require(:doctor).permit(:name)
    end
  end