class TaskSerializer
  include JSONAPI::Serializer
  attributes :id, :name, :completed_task
  #has_many :task_notes, except: [:created_at, :updated_at]
end
