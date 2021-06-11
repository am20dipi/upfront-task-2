class TaskSerializer
  include JSONAPI::Serializer
  attributes :name, :due_date, :completed, :task_notes
  #has_many :task_notes
end
