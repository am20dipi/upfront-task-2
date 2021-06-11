class TaskSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :due_date, :completed, :task_notes
  #has_many :task_notes, except: [:created_at, :updated_at]
end
