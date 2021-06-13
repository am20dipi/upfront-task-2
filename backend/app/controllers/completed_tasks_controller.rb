class CompletedTasksController < ApplicationController
  before_action :set_completed_task, only: [:show, :update, :destroy]

  # GET /completed_tasks
  def index
    @completed_tasks = CompletedTask.all

    render json: @completed_tasks
  end

  # GET /completed_tasks/1
  def show
    render json: @completed_task
  end

  # POST /completed_tasks
  def create
    @completed_task = CompletedTask.new(completed_task_params)

    if @completed_task.save
      render json: @completed_task, status: :created, location: @completed_task
    else
      render json: @completed_task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /completed_tasks/1
  def update
    if @completed_task.update(completed_task_params)
      render json: @completed_task
    else
      render json: @completed_task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /completed_tasks/1
  def destroy
    @completed_task.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_completed_task
      @completed_task = CompletedTask.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def completed_task_params
      params.fetch(:completed_task, {})
    end
end
