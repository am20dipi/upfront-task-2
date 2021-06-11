class TaskNotesController < ApplicationController
  before_action :set_task_note, only: [:show, :update, :destroy]

  # GET /task_notes
  def index
    task_notes = TaskNote.all

    render json: TaskNoteSerializer.new(task_notes)
  end

  # GET /task_notes/1
  def show
    render json: @task_note
  end

  # POST /task_notes
  def create
    @task_note = TaskNote.new(task_note_params)

    if @task_note.save
      render json: @task_note, status: :created, location: @task_note
    else
      render json: @task_note.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /task_notes/1
  def update
    if @task_note.update(task_note_params)
      render json: @task_note
    else
      render json: @task_note.errors, status: :unprocessable_entity
    end
  end

  # DELETE /task_notes/1
  def destroy
    @task_note.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task_note
      @task_note = TaskNote.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def task_note_params
      params.require(:task_note).permit(:content, :task_id)
    end
end
